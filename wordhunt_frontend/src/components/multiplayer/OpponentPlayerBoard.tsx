import React, { useEffect, useState, useRef } from 'react';
import { getSocket } from '../../utils/websocket';
import { getTileCoordinates, isTileSelected } from '../../utils/boardHelpers';
import GameBoard from '../gameBoard/GameBoard';
import TrackingSelectedTiles from '../gameBoard/TrackingSelectedTiles';
import { useMultiplayerGameContext } from '../../context/multiplayerGameContext';
import '../gameBoard/GameBoard.css';

interface Tile {
  row: number;
  col: number;
  letter: string;
  x: number;
  y: number;
}

interface OpponentPlayerBoardProps {
  room: string;
  playerId: string;
  board: string[][];
}

const OpponentPlayerBoard: React.FC<OpponentPlayerBoardProps> = ({ room, playerId, board }) => {
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>('');
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [isValidWord, setIsValidWord] = useState(false);
  const playerType = 'p2';

  const { incrementTick } = useMultiplayerGameContext();

  useEffect(() => {
    const socket = getSocket();

    const handleTileUpdate = ({ playerId: movePlayerId, tile, isFirstTile, isLastTile, selectedColor }: any) => {
      if (movePlayerId !== playerId) {
        incrementTick();

        const { row, col, letter } = tile;

        const tileElement = document.getElementById(`${playerType}-tile-${row}-${col}`);
        if (tileElement) {
          const { x, y } = getTileCoordinates(tileElement, boardContainerRef.current);
          const newTile: Tile = { row, col, letter, x, y };

          setSelectedTiles((prev) => {
            if (isFirstTile) return [newTile];
            return [...prev, newTile];
          });
          setSelectedColor(selectedColor);
          
          if (isLastTile) {
            setTimeout(() => {
              setSelectedTiles([]);
              setSelectedColor('');
            }, 300);
          }
        }
      }
    };

    socket.on('tileUpdate', handleTileUpdate);

    return () => {
      socket.off('tileUpdate', handleTileUpdate);
    };
  }, [playerId, incrementTick]);

  return (
    <div className="d-flex flex-column justify-content-center mt-4 m-3">
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
        selectedColor={selectedColor}
        isTileSelected={isTileSelected}
        playerType={playerType}
      />
      <div className="d-flex justify-content-center m-4">
        <h1>Opponent</h1>
      </div>
    </div>
  );
};

export default OpponentPlayerBoard;
