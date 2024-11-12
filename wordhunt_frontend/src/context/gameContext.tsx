import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { generateBoard } from '../utils/letterGenerator';
import { BOARD_SIZE } from '../utils/constants';

interface GameContextType {
    board: string[][];
    currentPlayerScore: number;
    opponentPlayerScore: number;
    isGameStarted: boolean;
    isGameOver: boolean;
    startGame: () => void;
    updateCurrentScore: (points: number) => void;
    updateOpponentScore: (points: number) => void;
    timeIsUp: () => void;
    goToStartScreen: () => void;
}

const defaultGameContext: GameContextType = {
    board: [[]],
    currentPlayerScore: 0,
    opponentPlayerScore: 0,
    isGameStarted: false,
    isGameOver: false,
    startGame: () => { },
    updateCurrentScore: () => { },
    updateOpponentScore: () => { },
    timeIsUp: () => { },
    goToStartScreen: () => { },
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

    // Generating and setting the 4x4 WordHunt board
    useEffect(() => {
        setBoard(generateBoard(BOARD_SIZE, BOARD_SIZE));
    }, []);

    return (
        <GameContext.Provider
            value={{ currentPlayerScore, board, opponentPlayerScore, isGameStarted, isGameOver, startGame, updateCurrentScore, updateOpponentScore, timeIsUp, goToStartScreen }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => useContext(GameContext);
