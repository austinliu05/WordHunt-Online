import React, { useEffect, useState, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGameContext } from '../../context/gameContext';
import { validateWord } from '../../utils/validateWord';
import { SCORING } from '../../utils/constants';
import './gameBoard.css';
import { increment } from 'firebase/database';

interface Tile {
  row: number;
  col: number;
  letter: string;
  x: number;
  y: number;
}

const CPUOpponentPlayerBoard: React.FC = () => {
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [words, setWords] = useState<{ [key: string]: any }>({});
  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([]);
  let selectedColor = "";

  const { board, difficulty, isGameOver, isGameStarted } = useGameContext();

  useEffect(() => {
    if (board && difficulty) {
      requestMoves({ board, difficulty });
    }
  }, [board, difficulty]);

  useEffect(() => {
    if (words && Object.keys(words).length > 0 && isGameStarted) {
      simulatePlayerMoves();
    }
  }, [words])

  useEffect(() => {
    console.log("Updated selectedColor:", selectedColor);
  }, [selectedColor]);

  const requestMoves = async (payload: { board: string[][], difficulty: string }) => {
    try {
      const response = await fetch('http://localhost:3000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      console.log("Response from backend:", data.paths);
      setWords(data.paths);
    } catch (error) {
      console.error("Error making request: ", error);
    }
  };
  const getTileCoordinates = (tileElement: HTMLElement) => {
    const containerRect = boardContainerRef.current?.getBoundingClientRect();
    const tileRect = tileElement.getBoundingClientRect();

    return {
      x: tileRect.left - (containerRect?.left || 0) + tileRect.width / 2,
      y: tileRect.top - (containerRect?.top || 0) + tileRect.height / 2,
    };
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const simulatePlayerMoves = async () => {
    while (!isGameOver) {

      for (const [word, indices] of Object.entries(words)) {
        let currentWord = "";
        setSelectedTiles([]);
        selectedColor = "";
        for (let i = 0; i < word.length; i++) {
          const char = word[i];
          currentWord += char;

          const [row, col] = indices[i];
          const tileElement = document.getElementById(`tile-${row}-${col}`);
          if (tileElement) {
            const { x, y } = getTileCoordinates(tileElement);
            const newTile = { row, col, letter: board[row][col], x, y };
            setSelectedTiles((prev) => [...prev, newTile]);
          }

          console.log(currentWord, selectedTiles);

          await delay(2000);
        }
        const isValid = await validateWord(currentWord);
        const isUsed = usedWords.includes(currentWord);

        if (isValid && currentWord.length > 2) {
          const color = isUsed ? "yellow" : "green";
          selectedColor = color;
          console.log(`Setting color to ${color}`);
        } else {
          selectedColor = '';
          console.log("Setting color to null");
        }
        
        setUsedWords((prevWords) => [...prevWords, currentWord]);
      }
    }
  };

  const isTileSelected = (row: number, col: number): boolean =>
    selectedTiles.some((tile) => tile.row === row && tile.col === col);

  return (
    <div
      className="d-flex flex-column justify-content-center mt-4 m-3"
      ref={boardContainerRef}
    >
      {/* <TrackingSelectedTiles selectedTiles={selectedTiles} usedWords={usedWords} selectedColor={selectedColor || 'white'} isValidWord={isValidWord}/> */}
      <div
        className="board-container position-relative"
      >
        <svg className="line-layer position-absolute w-100 h-100">
          {selectedTiles.map((tile, index) => {
            if (index === 0) return null;
            const prevTile = selectedTiles[index - 1];
            const lineColor = selectedColor === "green" || selectedColor === "yellow" ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 0, 0, 0.4)";

            return (
              <line
                key={index}
                x1={prevTile.x}
                y1={prevTile.y}
                x2={tile.x}
                y2={tile.y}
                stroke={lineColor}
                strokeWidth="6"
                strokeLinecap="round"
              />
            );
          })}
        </svg>
        {board.map((row, rowIndex) => (
          <Row key={rowIndex} className="mx-0 mb-2">
            {row.map((letter, colIndex) => {
              const isSelected = isTileSelected(rowIndex, colIndex);
              const tileColorClass = isSelected
                ? selectedColor === "green"
                  ? "selected-green"
                  : selectedColor === "yellow"
                    ? "selected-yellow"
                    : "selected"
                : "";

              return (
                <Col
                  key={colIndex}
                  id={`tile-${rowIndex}-${colIndex}`}
                  className={`border p-3 text-center mx-1 ${tileColorClass}`}
                >
                  <h3>{letter}</h3>
                </Col>
              );
            })}
          </Row>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-2">
        <h1>Opponent</h1>
      </div>
    </div>
  );
};

export default CPUOpponentPlayerBoard;
