// src/context/WordContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WordContextType {
    words: string[];
    cpuWords: string[],
    trackWords: (newWords: string[]) => void,
    trackCPUWords: (newWords: string[]) => void
}

const defaultWordContext: WordContextType = {
    words: [],
    cpuWords: [],
    trackWords: () => { },
    trackCPUWords: () => { },
};

const WordContext = createContext<WordContextType>(defaultWordContext);

interface WordProviderProps {
    children: ReactNode;
}

export const WordProvider: React.FC<WordProviderProps> = ({ children }) => {
    const [words, setWords] = useState<string[]>([]);
    const [cpuWords, setCPUWords] = useState<string[]>([]);

    const trackWords = (newWords: string[]) => {
        setWords(newWords);
    };

    const trackCPUWords = (newWords: string[]) => {
        setCPUWords(newWords);
    };

    return (
        <WordContext.Provider value={{ words, cpuWords, trackWords, trackCPUWords}}>
            {children}
        </WordContext.Provider>
    );
};

export const useWordContext = () => useContext(WordContext);
