import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGameContext } from '../../context/gameContext';
import './gameBoard.css';

interface GameBoardProps {
  isCPU: boolean;
}

const OpponentPlayerBoard: React.FC<GameBoardProps> = ({ isCPU }) => {
  const { board } = useGameContext();

  return (
    <div className="d-flex flex-column justify-content-center mt-4 m-3">
      {/* <TrackingSelectedTiles selectedTiles={selectedTiles}/> */}
      <div className="board-container position-relative">
        {board.map((row, rowIndex) => (
          <Row key={rowIndex} className="mx-0 mb-2">
            {row.map((letter, colIndex) => (
              <Col
                key={colIndex}
                id={`tile-${rowIndex}-${colIndex}`}
                className="border p-3 text-center mx-1 opponent-tile"
              >
                <h3>{letter}</h3>
              </Col>
            ))}
          </Row>
        ))}
      </div>
      
      <div className="d-flex justify-content-center mt-2">
        <h1>Opponent</h1>
      </div>
    </div>
  );
};

export default OpponentPlayerBoard;
