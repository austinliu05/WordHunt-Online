import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import StartScreen from './components/startScreens/startScreen';
import DifficultySelect from './components/startScreens/difficultySelect';
import EndScreen from './components/endScreen/endScreen';
import Footer from './components/footer';
import SplitScreen from './components/splitScreen';
import GameLobby from './components/multiplayer/gameLobby';
import { useGameContext } from './context/gameContext';

const App = () => {
  const { isGameStarted, isGameOver } = useGameContext();

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-1">
          <Routes>
            {!isGameStarted && <Route path="/" element={<StartScreen />} />}
            {isGameStarted && !isGameOver && (
              <Route path="/game" element={<SplitScreen />} />
            )}
            <Route path="/lobby" element={<GameLobby />}/>
            <Route path="/difficulty" element={<DifficultySelect/>}/>
            {isGameOver && <Route path="/end" element={<EndScreen />} />}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
