import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGameContext } from '../../context/gameContext';
import './gameBoard.css';

const cpuOpponentPlayerBoard: React.FC = () => {
  const { board, difficulty } = useGameContext();

  const requestMove = async (payload: { board: string[][], difficulty: string }) => {
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
      console.log("Response from backend:", data);
    } catch (error) {
      console.error("Error making request: ", error);
    }
  };

  useEffect(() => {
    if (board && difficulty) {
      requestMove({board, difficulty});
    }
  }, [board, difficulty]);

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

export default cpuOpponentPlayerBoard;
