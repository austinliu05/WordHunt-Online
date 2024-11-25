import React, { useEffect, useState, useRef } from 'react';
import { validateWord } from '../../utils/validateWord';
import { getSocket } from '../../utils/websocket';
import { getTileCoordinates, isTileSelected } from '../../utils/boardHelpers';
import GameBoard from '../gameBoard/GameBoard';
import TrackingSelectedTiles from '../gameBoard/TrackingSelectedTiles';
import { useMultiplayerGameContext } from '../../context/multiplayerGameContext';
import '../gameBoard/GameBoard.css'

interface Tile {
  row: number;
  col: number;
  letter: string;
  x: number;
  y: number;
}

interface CurrentPlayerBoardProps {
  room: string;
  playerId: string;
  board: string[][];
}

const CurrentPlayerBoard: React.FC<CurrentPlayerBoardProps> = ({ room, playerId, board }) => {
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [isValidWord, setIsValidWord] = useState(false);
  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const playerType = 'p1';

  const { incrementTick } = useMultiplayerGameContext();

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
      sendTileUpdate(newTile, "start", false, null);
    }
  };

  const handleEnd = async () => {
    setIsDragging(false);

    if (currentWord.length > 2 && selectedColor === "green") {
      if (!usedWords.includes(currentWord)) {
        setUsedWords((prevWords) => [...prevWords, currentWord]);
        const isValid = await validateWord(currentWord);
        sendTileUpdate(
          selectedTiles[selectedTiles.length - 1],
          "end",
          isValid,
          selectedColor
        );
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
        const isUsed = usedWords.includes(newWord);

        const newColor = isValid && newWord.length > 2 ? (isUsed ? "yellow" : "green") : null;
        setSelectedColor(newColor);

        sendTileUpdate(newTile, "update", isValid, newColor); // Pass the calculated color
      }
    }
  };

  const sendTileUpdate = (
    tile: Tile,
    action: "start" | "update" | "end",
    valid: boolean,
    color: string | null
  ) => {
    const socket = getSocket();

    socket.emit("tileUpdate", {
      room,
      playerId,
      word: currentWord,
      tile: { row: tile.row, col: tile.col, letter: tile.letter },
      isFirstTile: action === "start",
      isLastTile: action === "end",
      isValid: valid,
      selectedColor: color, // Use the passed color
    });

    incrementTick();
  };

  return (
    <div
      className="d-flex flex-column justify-content-center mt-4 m-3"
      onMouseUp={handleEnd}
      onTouchEnd={handleEnd}
    >
      <TrackingSelectedTiles
        selectedTiles={selectedTiles}
        usedWords={usedWords}
        selectedColor={selectedColor || ""}
        isValidWord={isValidWord}
      />
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
            const [, , row, col] = target.id.split('-');
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
