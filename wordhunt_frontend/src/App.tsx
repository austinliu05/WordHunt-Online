import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import DifficultySelect from './components/singleplayer/DifficultySelect';
import EndScreen from './components/singleplayer/endScreen/EndScreen';
import Footer from './components/Footer';
import SplitScreen from './components/singleplayer/SplitScreen';
import GameScreen from './components/multiplayer/GameScreen';
import GameLobby from './components/multiplayer/GameLobby';
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
            <Route path="/game/:room" element={<GameScreen />} />
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
