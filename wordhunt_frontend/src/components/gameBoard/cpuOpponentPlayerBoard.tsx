import React, { useEffect, useState, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGameContext } from '../../context/gameContext';
import { validateWord } from '../../utils/validateWord';
import TrackingSelectedTiles from '../trackingSelectedTiles';
import { SCORING } from '../../utils/constants';
import './gameBoard.css';

interface Tile {
  row: number;
  col: number;
  letter: string;
  x: number;
  y: number;
}

const CPUOpponentPlayerBoard: React.FC = () => {
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const [words, setWords] = useState<{ [key: string]: any }>({});
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [isValidWord, setIsValidWord] = useState(false);
  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>();
  const requestInProgress = useRef(false);

  const { board, difficulty, isGameOver, isGameStarted, updateOpponentScore } = useGameContext();

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

  // useEffect(() => {
  //   console.log("Updated selectedTiles:", selectedTiles);
  // }, [selectedTiles]);

  const requestMoves = async (payload: { board: string[][], difficulty: string }) => {
    if (requestInProgress.current) return;
    requestInProgress.current = true;
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
  const randomDelay = () => Math.floor(Math.random() * (3000 - 1500 + 1)) + 1500;

  const handleStart = (row: number, col: number) => {
    const tileElement = document.getElementById(`tile-${row}-${col}`);
    if (tileElement) {
      const { x, y } = getTileCoordinates(tileElement);
      const newTile = { row, col, letter: board[row][col], x, y };
      setSelectedTiles((prev) => [...prev, newTile]);
    }
  };
  const handleMove = async (row: number, col: number, currentWord: string) => {
    if (isTileSelected(row, col)) {
      const tileElement = document.getElementById(`tile-${row}-${col}`);
      if (tileElement) {
        const { x, y } = getTileCoordinates(tileElement);
        const newTile = { row, col, letter: board[row][col], x, y};
        setSelectedTiles((prev) => [...prev, newTile]);
        const newWord = currentWord + board[row][col];

        const isValid = await validateWord(newWord);
        setIsValidWord(isValid);
        const isUsed = usedWords.includes(newWord);

        setSelectedColor(isValid && newWord.length > 2 ? (isUsed ? "yellow" : "green") : null);
      }
    }
  };
  const simulatePlayerMoves = async () => {
    while (!isGameOver) {
      let currentWord: string;
      for (const [word, indices] of Object.entries(words)) {
        currentWord = "";
        setSelectedTiles([]);
        setSelectedColor("");
        for (let i = 0; i < word.length; i++) {
          const char = word[i];
          currentWord += char;
          const [row, col] = indices[i];
          if (i == 0){
            handleStart(row, col);
          }
          handleMove(row, col, currentWord);
          if (i === word.length - 1){
            await delay(500);
          }
          await delay(randomDelay());
        }
        setUsedWords((prevWords) => [...prevWords, currentWord]);
        await checkWordValue(currentWord);
      }
    }
  };

  const checkWordValue = async (currentWord: string) => {
    if (currentWord.length > 2) {
      const points = SCORING[currentWord.length] || 0;
      console.log(`Adding ${points} points for word: ${currentWord}`);

      if (!usedWords.includes(currentWord)) {
        updateOpponentScore(points);
        const newWords = [...usedWords, currentWord];
      }
    }
  }

  const isTileSelected = (row: number, col: number): boolean =>
    selectedTiles.some((tile) => tile.row === row && tile.col === col);

  return (
    <div
      className="d-flex flex-column justify-content-center mt-4 m-3"
      ref={boardContainerRef}
    >
      <TrackingSelectedTiles selectedTiles={selectedTiles} usedWords={usedWords} selectedColor={selectedColor || 'white'} isValidWord={isValidWord}/>
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
