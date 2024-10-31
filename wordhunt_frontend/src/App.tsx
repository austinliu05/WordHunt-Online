import React, { useState, useEffect } from 'react';
import GameBoard from './components/gameBoard';
import StartScreen from './components/startScreen';
import Scoreboard from './components/scoreBoard';

function App() {
  const [score, setScore] = useState(0);
  return (
    <div>          
      <Scoreboard score={score} />
      <GameBoard />
    </div>
  );
}

export default App;
