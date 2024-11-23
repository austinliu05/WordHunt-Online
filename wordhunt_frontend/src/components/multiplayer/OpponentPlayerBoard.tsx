import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { EASY_DELAY, MEDIUM_DELAY, HARD_DELAY, SCORING, TIMER_LENGTH } from '../../utils/constants';
import { validateWord } from '../../utils/validateWord';
import { delay, getTileCoordinates, randomizeMoves, isTileSelected,  } from '../../utils/boardHelpers';
import GameBoard from '../gameBoard/GameBoard';
import { useGameContext } from '../../context/gameContext';
import { useWordContext } from '../../context/wordContext';
import '../gameBoard/GameBoard.css'

interface Tile {
  row: number;
  col: number;
  letter: string;
  x: number;
  y: number;
}

const OpponentPlayerBoard: React.FC = () => {
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const [words, setWords] = useState<{ [key: string]: any }>({});
  const [currentWord, setCurrentWord] = useState<string>('');
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [isValidWord, setIsValidWord] = useState(false);
  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>();
  const location = useLocation();
  const requestInProgress = useRef(false);
  const isComponentActive = useRef(true);
  const playerType = 'p2';
  let cpuDelay = HARD_DELAY;

  const {
    board,
    difficulty,
    isGameOver,
    isGameStarted,
    updateOpponentScore,

  } = useGameContext();
  const { trackCPUWords } = useWordContext();

  useEffect(() => {
    isComponentActive.current = location.pathname === '/game';
    return () => {
      isComponentActive.current = false;
    };
  }, [location]);

  useEffect(() => {
    if (board && difficulty) {
      requestMoves({ board, difficulty });
    }
  }, [board, difficulty]);

  useEffect(() => {
    if (words && Object.keys(words).length > 0 && isGameStarted && !isGameOver) {
      if (difficulty === 'easy') {
        cpuDelay = EASY_DELAY;
      } else if (difficulty === 'medium'){
        cpuDelay = MEDIUM_DELAY;
      }
      simulatePlayerMoves();
    }
  }, [words]);

  const requestMoves = async (payload: { board: string[][]; difficulty: string }) => {
    if (requestInProgress.current) return;
    requestInProgress.current = true;
    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${apiUrl}api/data`, {
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
      setWords(data.paths);
    } catch (error) {
      console.error('Error making request: ', error);
    }
  };

  const randomDelay = () => Math.floor(Math.random() * ((cpuDelay + 300) - cpuDelay + 1)) + cpuDelay;

  const simulatePlayerMoves = async () => {
    let usedWords: string[] = [];
    let isTimeExpired = false;

    const timer = setTimeout(() => {
      isTimeExpired = true;
    }, TIMER_LENGTH * 1000);

    for (const [word, indices] of randomizeMoves(Object.entries(words), difficulty)) {
      if (isTimeExpired || !isComponentActive.current) {
        return;
      }
      if (difficulty === 'hard') {
        const isValid = await validateWord(word);
        if (!isValid) {
            continue;
        }
      }
      let localCurrentWord = '';
      let isValid = false;
      setCurrentWord('');
      setSelectedTiles([]);
      setSelectedColor('');

      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        localCurrentWord += char;
        setCurrentWord(localCurrentWord);

        const [row, col] = indices[i];
        const tileElement = document.getElementById(`${playerType}-tile-${row}-${col}`);
        if (tileElement) {
          const { x, y } = getTileCoordinates(tileElement, boardContainerRef.current);
          const newTile = { row, col, letter: board[row][col], x, y };
          setSelectedTiles((prev) => [...prev, newTile]);
        }

        isValid = await validateWord(localCurrentWord);
        setIsValidWord(isValid);
        const isUsed = usedWords.includes(localCurrentWord);

        if (isValid && localCurrentWord.length > 2) {
          const color = isUsed ? 'yellow' : 'green';
          setSelectedColor(color);
          await delay(500);
        } else {
          setSelectedColor(null);
        }
        await delay(randomDelay());
        if (isTimeExpired || !isComponentActive.current) {
          return;
        }
      }
      usedWords.push(localCurrentWord);
      setUsedWords(usedWords);
      trackCPUWords(usedWords);
      setSelectedTiles([]);
      setSelectedColor('');
      await checkWordValue(localCurrentWord, isTimeExpired, isValid);
    }
    console.log("Used up all the words!")
  };

  const checkWordValue = async (word: string, isTimeExpired: boolean, isValid: boolean) => {
    if (word.length > 2 && !usedWords.includes(word) && !isTimeExpired && isValid) {
      const points = SCORING[word.length] || 0;
      // console.log(`Adding ${points} points for word: ${word}`);
      updateOpponentScore(points);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center mt-4 m-3">
      <GameBoard
        ref={boardContainerRef}
        board={board}
        selectedTiles={selectedTiles}
        selectedColor={selectedColor || null}
        isTileSelected={isTileSelected}
        playerType={playerType}
      />
      <div className="d-flex justify-content-center m-4">
        <h1>Opponent</h1>
      </div>
    </div>
  );
};

export default OpponentPlayerBoard;
