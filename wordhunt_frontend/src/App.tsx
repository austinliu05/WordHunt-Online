import React, { useState } from 'react';
import GameBoard from './components/gameBoard/gameBoard';
import StartScreen from './components/startScreen';
import Scoreboard from './components/scoreBoard';
import Timer from './components/timer';
import EndScreen from './components/endScreen';
import Footer from './components/footer';

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
  };

  const trackWords = (newWords: string[]) => {
    setWords(newWords);
  };

  const goToStartScreen = () => {
    setIsGameStarted(false);
    setIsGameOver(true);
  };

  const goToLeaderboard = () => {
    // Future leaderboard navigation
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        {isGameStarted ? (
          !isGameOver ? (
            <>
              <Scoreboard score={score} />
              <Timer onTimeUp={timeIsUp} />
              <GameBoard updateScore={updateScore} trackWords={trackWords} />
            </>
          ) : (
            <EndScreen words={words} totalScore={score} goToStartScreen={goToStartScreen} goToLeaderboard={goToLeaderboard} />
          )
        ) : (
          <StartScreen onStart={startGame} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
