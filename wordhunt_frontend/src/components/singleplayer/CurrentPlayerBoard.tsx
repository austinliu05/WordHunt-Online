import React, { useEffect, useState, useRef } from 'react';
import { SCORING } from '../../utils/constants';
import { validateWord } from '../../utils/validateWord';
import { getTileCoordinates, isTileSelected } from '../../utils/boardHelpers';
import { useGameContext } from '../../context/gameContext';
import { useWordContext } from '../../context/wordContext';
import GameBoard from '../gameBoard/GameBoard';
import '../gameBoard/GameBoard.css'

interface Tile {
  row: number;
  col: number;
  letter: string;
  x: number;
  y: number;
}

const CurrentPlayerBoard: React.FC = () => {
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [isValidWord, setIsValidWord] = useState(false);
  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const playerType = 'p1';
  const { board, updateCurrentScore } = useGameContext();
  const { trackWords } = useWordContext();

  useEffect(() => {
    const preventTouchMove = (e: TouchEvent) => {
      if (isDragging) e.preventDefault();
    };
    document.addEventListener('touchmove', preventTouchMove, { passive: false });
    return () => document.removeEventListener('touchmove', preventTouchMove);
  }, [isDragging]);

  const handleStart = (row: number, col: number) => {
    setIsDragging(true);
    const tileElement = document.getElementById(`${playerType}-tile-${row}-${col}`);
    if (tileElement) {
      const { x, y } = getTileCoordinates(tileElement, boardContainerRef.current);
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
        updateCurrentScore(points);
        const newWords = [...usedWords, currentWord];
        trackWords(newWords);
      }
    }

    setSelectedTiles([]);
    setCurrentWord("");
    setSelectedColor(null);
  };

  const handleMove = async (row: number, col: number) => {
    if (isDragging && !isTileSelected(row, col, selectedTiles)) {
      const tileElement = document.getElementById(`${playerType}-tile-${row}-${col}`);
      if (tileElement) {
        const { x, y } = getTileCoordinates(tileElement, boardContainerRef.current);
        const newTile = { row, col, letter: board[row][col], x, y };
        setSelectedTiles((prev) => [...prev, newTile]);
        const newWord = currentWord + board[row][col];
        setCurrentWord(newWord);

        const isValid = await validateWord(newWord);
        setIsValidWord(isValid);
        const isUsed = usedWords.includes(newWord);

        setSelectedColor(isValid && newWord.length > 2 ? (isUsed ? "yellow" : "green") : null);
      }
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center mt-4 m-3"
      onMouseUp={handleEnd}
      onTouchEnd={handleEnd}
    >
      <GameBoard
        ref={boardContainerRef}
        board={board}
        selectedTiles={selectedTiles}
        selectedColor={selectedColor || null}
        onTileMouseDown={handleStart}
        onTileMouseEnter={handleMove}
        onTileTouchStart={handleStart}
        onTileTouchMove={(e) => {
          const touch = e.touches[0];
          const target = document.elementFromPoint(touch.clientX, touch.clientY);
          if (target && target.id.startsWith(`${playerType}-tile-`)) {
            const [ , , row, col] = target.id.split('-');
            handleMove(parseInt(row), parseInt(col));
          }
        }}
        isTileSelected={isTileSelected}
        playerType={playerType}
      />
      <div className="d-flex justify-content-center m-4">
        <h1>You</h1>
      </div>
    </div>
  );
};

export default CurrentPlayerBoard;
