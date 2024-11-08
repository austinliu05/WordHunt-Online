// src/context/GameContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GameContextType {
    score: number;
    isGameStarted: boolean;
    isGameOver: boolean;
    isSinglePlayer: boolean;
    startGame: () => void;
    updateScore: (points: number) => void;
    timeIsUp: () => void;
    goToStartScreen: () => void;
}

const defaultGameContext: GameContextType = {
    score: 0,
    isGameStarted: false,
    isGameOver: false,
    isSinglePlayer: true,
    startGame: () => { },
    updateScore: () => { },
    timeIsUp: () => { },
    goToStartScreen: () => { },
};

const GameContext = createContext<GameContextType>(defaultGameContext);

interface GameProviderProps {
    children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [score, setScore] = useState<number>(0);
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isSinglePlayer, setIsSinglePlayer] = useState<boolean>(false);

    const startGame = () => {
        setIsGameStarted(true);
        setIsGameOver(false);
        setScore(0);
    };

    const updateScore = (points: number) => {
        setScore((prevScore) => prevScore + points);
    };

    const timeIsUp = () => {
        setIsGameOver(true);
    };

    const goToStartScreen = () => {
        setIsGameStarted(false);
        setIsGameOver(true);
    };

    return (
        <GameContext.Provider
            value={{ score, isGameStarted, isGameOver, isSinglePlayer, startGame, updateScore, timeIsUp, goToStartScreen }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => useContext(GameContext);
