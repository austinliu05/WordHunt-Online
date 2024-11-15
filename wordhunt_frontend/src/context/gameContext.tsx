import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { generateBoard } from '../utils/letterGenerator';
import { BOARD_SIZE } from '../utils/constants';

interface GameContextType {
    board: string[][];
    currentPlayerScore: number;
    opponentPlayerScore: number;
    isGameStarted: boolean;
    isGameOver: boolean;
    difficulty: string;
    startGame: () => void;
    updateCurrentScore: (points: number) => void;
    updateOpponentScore: (points: number) => void;
    timeIsUp: () => void;
    goToStartScreen: () => void;
    setDifficultyLevel: (level: string) => void;
}

const defaultGameContext: GameContextType = {
    board: [[]],
    currentPlayerScore: 0,
    opponentPlayerScore: 0,
    isGameStarted: false,
    isGameOver: false,
    difficulty: 'easy',
    startGame: () => { },
    updateCurrentScore: () => { },
    updateOpponentScore: () => { },
    timeIsUp: () => { },
    goToStartScreen: () => { },
    setDifficultyLevel: () => { }
};

const GameContext = createContext<GameContextType>(defaultGameContext);

interface GameProviderProps {
    children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [board, setBoard] = useState<string[][]>([]);
    const [currentPlayerScore, setCurrentPlayerScore] = useState<number>(0);
    const [opponentPlayerScore, setOpponentPlayerScore] = useState<number>(0);
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [difficulty, setDifficulty] = useState<string>("easy");
    const [isSinglePlayer, setisSinglePlayer] = useState<boolean>(false);

    const startGame = () => {
        setIsGameStarted(true);
        setIsGameOver(false);
        setCurrentPlayerScore(0);
        setOpponentPlayerScore(0);
    };

    const updateCurrentScore = (points: number) => {
        setCurrentPlayerScore((prevScore) => prevScore + points);
    };

    const updateOpponentScore = (points: number) => {
        setOpponentPlayerScore((prevScore) => prevScore + points);
    };

    const timeIsUp = () => {
        setIsGameOver(true);
    };

    const goToStartScreen = () => {
        setIsGameStarted(false);
        setIsGameOver(true);
        setBoard(generateBoard(BOARD_SIZE, BOARD_SIZE));
    };
    const setDifficultyLevel = (level: string) =>{
        setDifficulty(level);
    }
    // Generating and setting the 4x4 WordHunt board
    useEffect(() => {
        setBoard(generateBoard(BOARD_SIZE, BOARD_SIZE));
    }, []);

    return (
        <GameContext.Provider
            value={{ currentPlayerScore, board, difficulty, opponentPlayerScore, isGameStarted, isGameOver, startGame, updateCurrentScore, updateOpponentScore, timeIsUp, goToStartScreen, setDifficultyLevel }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => useContext(GameContext);
