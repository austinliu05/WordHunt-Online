import React, { useState, useEffect } from 'react';
import GameBoard from './components/gameBoard';
import StartScreen from './components/startScreen';
import Scoreboard from './components/scoreBoard';

function App() {
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const startGame = () => {
    setIsGameStarted(true);
  };
  const updateScore = (points: number) => {
    setScore((prevScore) => prevScore + points);
  };

  return (
    <div>          
      {isGameStarted ? (
        <>
          <Scoreboard score={score} />
          <GameBoard updateScore={updateScore} />
        </>
      ) : (
        <StartScreen onStart={startGame} />
      )}
    </div>
  );
}

export default App;
