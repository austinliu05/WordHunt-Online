// src/context/index.tsx
import React from 'react';
import { GameProvider } from './gameContext';
import { WordProvider } from './wordContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <GameProvider>
      <WordProvider>
        {children}
      </WordProvider>
    </GameProvider>
  );
};

export default AppProviders;
