// src/context/WordContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WordContextType {
    words: string[];
    trackWords: (newWords: string[]) => void;
}

const defaultWordContext: WordContextType = {
    words: [],
    trackWords: () => { },
};

const WordContext = createContext<WordContextType>(defaultWordContext);

interface WordProviderProps {
    children: ReactNode;
}

export const WordProvider: React.FC<WordProviderProps> = ({ children }) => {
    const [words, setWords] = useState<string[]>([]);

    const trackWords = (newWords: string[]) => {
        setWords(newWords);
    };

    return (
        <WordContext.Provider value={{ words, trackWords }}>
            {children}
        </WordContext.Provider>
    );
};

export const useWordContext = () => useContext(WordContext);
