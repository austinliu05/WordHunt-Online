import React, { useState, useEffect } from 'react';
import GameBoard from './components/gameBoard/gameBoard';
import StartScreen from './components/startScreen';
import Scoreboard from './components/scoreBoard';
import Timer from './components/timer';
import EndScreen from './components/endScreen';

function App() {
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [words, setWords] = useState<string[]>([]);

  const startGame = () => {
    setIsGameStarted(true);
    setIsGameOver(false);
    setScore(0);
    setWords([]);
  };
  const updateScore = (points: number) => {
    setScore((prevScore) => prevScore + points);
  };
  const timeIsUp = () => {
    setIsGameOver(true);
  }
  const trackWords = (newWords: string[]) => {
    setWords(newWords);
  };
  return (
    <div>
      {isGameStarted ? (
        !isGameOver ? (
          <>
            <Scoreboard score={score} />
            <Timer onTimeUp={timeIsUp} />
            <GameBoard updateScore={updateScore} trackWords={trackWords} />
          </>
        ) : (
          <>
          <EndScreen words={words} totalScore={score}/>
          </>
        )
      ) : (
        <StartScreen onStart={startGame} />
      )
      }
    </div>
  );
}

export default App;
