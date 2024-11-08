import React, { useState } from 'react';
import GameBoard from './components/gameBoard/gameBoard';
import StartScreen from './components/startScreen';
import Scoreboard from './components/scoreBoard';
import Timer from './components/timer';
import EndScreen from './components/endScreen';
import Footer from './components/footer';
import { useGameContext } from './context/gameContext';
import SplitScreen from './components/splitScreen';

function App() {
  const {isGameStarted, isGameOver, isSinglePlayer} = useGameContext();
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        {isGameStarted ? (
          !isGameOver ? (
            <>
              <Scoreboard />
              <Timer/>
              <SplitScreen/>
            </>
          ) : (
            <EndScreen/>
          )
        ) : (
          <StartScreen/>
        )}
        
      </div>
      <Footer />
    </div>
  );
}

export default App;
