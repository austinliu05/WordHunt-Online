import React, { useEffect, useState, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { generateBoard } from '../utils/letterGenerator';
import { validateWord } from '../utils/validateWord';

interface Tile {
  row: number;
  col: number;
  letter: string;
  x: number;
  y: number;
}
interface GameBoardProps {
  updateScore: (points: number) => void;
}
/**
 * GameBoard Component
 * 
 * Renders a dynamic 4x4 board of tiles with letters. Users can click and drag
 * across tiles to select a sequence, and the selected tiles are connected with
 * lines via an SVG overlay. The component also tracks mouse interactions to 
 * determine which tiles are selected.
 */
const GameBoard: React.FC<GameBoardProps> = ({ updateScore }) => {
  const [board, setBoard] = useState<string[][]>([]);
  const boardContainerRef = useRef<HTMLDivElement>(null); // Reference to the board container

  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([]);
  const [currentWord, setCurrentWord] = useState<string>(""); // Track current word
  const [selectedColor, setSelectedColor] = useState<string | null>();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [usedWords, setUsedWords] = useState<string[]>([]);

  /**
   * useEffect to initialize the board state.
   * 
   * Runs only once when the component mounts to generate a 4x4 letter board.
   */
  useEffect(() => {
    setBoard(generateBoard(4, 4));
  }, []);

  /**
   * Retrieves the coordinates of a tile relative to the board container.
   *
   * @param {HTMLElement} tileElement - The tile DOM element.
   * @returns {{ x: number, y: number }} - The x and y coordinates of the tile center.
   */
  const getTileCoordinates = (tileElement: HTMLElement) => {
    const containerRect = boardContainerRef.current?.getBoundingClientRect();
    const tileRect = tileElement.getBoundingClientRect();

    return {
      x: tileRect.left - (containerRect?.left || 0) + tileRect.width / 2,
      y: tileRect.top - (containerRect?.top || 0) + tileRect.height / 2,
    };
  };

  /**
   * Handles the start of a drag event by selecting the initial tile.
   *
   * @param {number} row - The row index of the tile.
   * @param {number} col - The column index of the tile.
   */
  const handleMouseDown = (row: number, col: number) => {
    setIsDragging(true);
    const tileElement = document.getElementById(`tile-${row}-${col}`);
    if (tileElement) {
      const { x, y } = getTileCoordinates(tileElement);
      const newTile = { row, col, letter: board[row][col], x, y }
      setSelectedTiles([newTile]);
      setCurrentWord(board[row][col]);
    }
  };
  /**
   * Handles the end of a drag event by logging the selected letters and resetting the state.
   */
  const handleMouseUp = () => {
    setIsDragging(false);

    if (currentWord.length > 2 && selectedColor === "green") {
      const scoring: { [key: number]: number } = { 3: 100, 4: 400, 5: 800, 6: 1400, 7: 1800, 8: 2200 };
      const points = scoring[currentWord.length] || 0;

      if (!usedWords.includes(currentWord)) {
        setUsedWords((prevWords) => [...prevWords, currentWord]);
        updateScore(points);
      }
    }

    setSelectedTiles([]);
    setCurrentWord("");
    setSelectedColor(null);
  };

  /**
   * Adds a tile to the selected path during a drag event.
   *
   * @param {number} row - The row index of the tile.
   * @param {number} col - The column index of the tile.
   */
  const handleMouseEnter = async (row: number, col: number) => {
    if (isDragging && !isTileSelected(row, col)) {
      const tileElement = document.getElementById(`tile-${row}-${col}`);
      if (tileElement) {
        const { x, y } = getTileCoordinates(tileElement);
        const newTile = { row, col, letter: board[row][col], x, y };
        setSelectedTiles((prev) => [
          ...prev,
          newTile,
        ]);
        const newWord = currentWord + board[row][col];
        setCurrentWord(newWord);

        const isValid = await validateWord(newWord);
        const isUsed = usedWords.includes(newWord);

        if (isValid && newWord.length > 2) {
          setSelectedColor(isUsed ? "yellow" : "green"); // Set color based on usage
        } else {
          setSelectedColor(null); // Reset color if invalid or too short
        }
      }
    }
  };

  /**
   * Checks if a specific tile has already been selected.
   *
   * @param {number} row - The row index of the tile.
   * @param {number} col - The column index of the tile.
   * @returns {boolean} - True if the tile is already selected, otherwise false.
   */
  const isTileSelected = (row: number, col: number): boolean =>
    selectedTiles.some((tile) => tile.row === row && tile.col === col);

  return (
    <div className="d-flex justify-content-center mt-4" onMouseUp={handleMouseUp}>
      <div
        className="board-container position-relative"
        ref={boardContainerRef} // Attach ref to the board container
      >
        <svg className="line-layer position-absolute w-100 h-100">
          {selectedTiles.map((tile, index) => {
            if (index === 0) return null; // Skip the first tile (no previous tile to connect)
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
              console.log(tileColorClass);
              return (
                <Col
                  key={colIndex}
                  id={`tile-${rowIndex}-${colIndex}`}
                  className={`border p-3 text-center mx-1 ${tileColorClass}`}
                  onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
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
