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

  return (
    <div>          
      {isGameStarted ? (
        <>
          <Scoreboard score={score} />
          <GameBoard />
        </>
      ) : (
        <StartScreen onStart={startGame} />
      )}
    </div>
  );
}

export default App;
