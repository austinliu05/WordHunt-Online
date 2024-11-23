import React, { forwardRef } from 'react';
import { Row, Col } from 'react-bootstrap';

interface Tile {
    row: number;
    col: number;
    letter: string;
    x: number;
    y: number;
}

interface GameBoardProps {
    board: string[][];
    selectedTiles: Tile[];
    selectedColor: string | null;
    onTileMouseDown?: (row: number, col: number) => void;
    onTileMouseEnter?: (row: number, col: number) => void;
    onTileTouchStart?: (row: number, col: number) => void;
    onTileTouchMove?: (event: React.TouchEvent) => void;
    isTileSelected: (row: number, col: number, selectedTiles: Tile[]) => boolean;
    playerType: string;
}

const GameBoard = forwardRef<HTMLDivElement, GameBoardProps>(({
    board,
    selectedTiles,
    selectedColor,
    onTileMouseDown,
    onTileMouseEnter,
    onTileTouchStart,
    onTileTouchMove,
    isTileSelected,
    playerType,
}, ref) => (
    <div className="board-container position-relative" ref={ref}>
        {/* SVG for drawing lines between selected tiles */}
        <svg className="line-layer position-absolute w-100 h-100">
            {selectedTiles.map((tile, index) => {
                if (index === 0) return null; // Skip the first tile
                const prevTile = selectedTiles[index - 1];
                const lineColor =
                    selectedColor === "green" || selectedColor === "yellow"
                        ? "rgba(255, 255, 255, 0.6)"
                        : "rgba(255, 0, 0, 0.4)";

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

        {/* Game Board Grid */}
        {board.map((row, rowIndex) => (
            <Row key={rowIndex} className="mx-0 mb-2">
                {row.map((letter, colIndex) => {
                    const isSelected = isTileSelected(rowIndex, colIndex, selectedTiles);
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
                            id={`${playerType}-tile-${rowIndex}-${colIndex}`}
                            className={`border p-3 text-center mx-1 ${tileColorClass}`}
                            onMouseDown={() => onTileMouseDown?.(rowIndex, colIndex)}
                            onMouseEnter={() => onTileMouseEnter?.(rowIndex, colIndex)}
                            onTouchStart={() => onTileTouchStart?.(rowIndex, colIndex)}
                            onTouchMove={onTileTouchMove}
                        >
                            <h3>{letter}</h3>
                        </Col>
                    );
                })}
            </Row>
        ))}
    </div>
));

export default GameBoard;
