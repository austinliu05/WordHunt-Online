import React, { useEffect, useState, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { generateBoard } from '../../utils/letterGenerator';
import { validateWord } from '../../utils/validateWord';
import { SCORING, BOARD_SIZE } from '../../utils/constants';

import './gameBoard.css'

interface Tile {
  row: number;
  col: number;
  letter: string;
  x: number;
  y: number;
}
interface GameBoardProps {
  updateScore: (points: number) => void;
  trackWords: (words: string[]) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ updateScore, trackWords}) => {
  const [board, setBoard] = useState<string[][]>([]);
  const boardContainerRef = useRef<HTMLDivElement>(null);

  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([]);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string | null>();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [usedWords, setUsedWords] = useState<string[]>([]);

  // Generating and setting the 4x4 WordHunt board
  useEffect(() => {
    setBoard(generateBoard(BOARD_SIZE, BOARD_SIZE));
  }, []);

  // Prevent scrolling on mobile when dragging is active
  useEffect(() => {
    const preventTouchMove = (e: TouchEvent) => {
      if (isDragging) e.preventDefault();
    };

    document.addEventListener('touchmove', preventTouchMove, { passive: false });
    return () => document.removeEventListener('touchmove', preventTouchMove);
  }, [isDragging]);

  const getTileCoordinates = (tileElement: HTMLElement) => {
    const containerRect = boardContainerRef.current?.getBoundingClientRect();
    const tileRect = tileElement.getBoundingClientRect();

    return {
      x: tileRect.left - (containerRect?.left || 0) + tileRect.width / 2,
      y: tileRect.top - (containerRect?.top || 0) + tileRect.height / 2,
    };
  };

  const handleStart = (row: number, col: number) => {
    setIsDragging(true);
    const tileElement = document.getElementById(`tile-${row}-${col}`);
    if (tileElement) {
      const { x, y } = getTileCoordinates(tileElement);
      const newTile = { row, col, letter: board[row][col], x, y };
      setSelectedTiles([newTile]);
      setCurrentWord(board[row][col]);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);

    if (currentWord.length > 2 && selectedColor === "green") {
      const points = SCORING[currentWord.length] || 0;

      if (!usedWords.includes(currentWord)) {
        setUsedWords((prevWords) => [...prevWords, currentWord]);
        updateScore(points);
        const newWords = [...usedWords, currentWord];
        trackWords(newWords);
      }
    }

    setSelectedTiles([]);
    setCurrentWord("");
    setSelectedColor(null);
  };

  const handleMove = async (row: number, col: number) => {
    if (isDragging && !isTileSelected(row, col)) {
      const tileElement = document.getElementById(`tile-${row}-${col}`);
      if (tileElement) {
        const { x, y } = getTileCoordinates(tileElement);
        const newTile = { row, col, letter: board[row][col], x, y };
        setSelectedTiles((prev) => [...prev, newTile]);
        const newWord = currentWord + board[row][col];
        setCurrentWord(newWord);

        const isValid = await validateWord(newWord);
        const isUsed = usedWords.includes(newWord);

        setSelectedColor(isValid && newWord.length > 2 ? (isUsed ? "yellow" : "green") : null);
      }
    }
  };

  const isTileSelected = (row: number, col: number): boolean =>
    selectedTiles.some((tile) => tile.row === row && tile.col === col);

  return (
    <div
      className="d-flex justify-content-center mt-4 m-3"
      onMouseUp={handleEnd}
      onTouchEnd={handleEnd}
    >
      <div
        className="board-container position-relative"
        ref={boardContainerRef}
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
                  onMouseDown={() => handleStart(rowIndex, colIndex)}
                  onMouseEnter={() => handleMove(rowIndex, colIndex)}
                  onTouchStart={() => handleStart(rowIndex, colIndex)}
                  onTouchMove={(e) => {
                    e.preventDefault();
                    const touch = e.touches[0];
                    const target = document.elementFromPoint(touch.clientX, touch.clientY);
                    if (target && target.id.startsWith('tile-')) {
                      const [_, r, c] = target.id.split('-');
                      handleMove(parseInt(r), parseInt(c));
                    }
                  }}
                >
                  <h3>{letter}</h3>
                </Col>
              );
            })}
          </Row>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
