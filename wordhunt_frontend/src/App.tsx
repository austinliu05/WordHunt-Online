import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import StartScreen from './components/startScreens/StartScreen';
import DifficultySelect from './components/startScreens/DifficultySelect';
import EndScreen from './components/endScreen/EndScreen';
import Footer from './components/Footer';
import SplitScreen from './components/SplitScreen';
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
