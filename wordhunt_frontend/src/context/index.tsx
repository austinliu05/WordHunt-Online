import React from 'react';
import { GameProvider } from './gameContext';
import { WordProvider } from './wordContext';
import { MultiplayerGameProvider } from './multiplayerGameContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <MultiplayerGameProvider>
      <GameProvider>
        <WordProvider>
          {children}
        </WordProvider>
      </GameProvider>
    </MultiplayerGameProvider>
  );
};

export default AppProviders;
