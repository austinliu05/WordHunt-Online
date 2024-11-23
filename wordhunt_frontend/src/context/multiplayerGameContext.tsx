import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { generateBoard } from '../utils/letterGenerator';
import { BOARD_SIZE } from '../utils/constants';

interface MultiplayerGameContextType {
    tick: number;
    incrementTick: () => void;
}

const defaultMultiplayerGameContext: MultiplayerGameContextType = {
    tick: 0,
    incrementTick: () => {}
};

const MultiplayerGameContext = createContext<MultiplayerGameContextType>(defaultMultiplayerGameContext);

interface MultiplayerGameProviderProps {
    children: ReactNode;
}

export const MultiplayerGameProvider: React.FC<MultiplayerGameProviderProps> = ({ children }) => {
    const [tick, setTick] = useState<number>(0);

    const incrementTick = () => {
        setTick((prevTick) => prevTick + 1);
    }
    return (
        <MultiplayerGameContext.Provider
            value={{ tick, incrementTick }}
        >
            {children}
        </MultiplayerGameContext.Provider>
    );
};

export const useMultiplayerGameContext = () => useContext(MultiplayerGameContext);
