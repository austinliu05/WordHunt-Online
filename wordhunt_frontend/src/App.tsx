import StartScreen from './components/startScreen';
import EndScreen from './components/endScreen/endScreen';
import Footer from './components/footer';
import { useGameContext } from './context/gameContext';
import SplitScreen from './components/splitScreen';

function App() {
  const {isGameStarted, isGameOver} = useGameContext();

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        {isGameStarted ? (
          !isGameOver ? (
            <>
              <SplitScreen/>
            </>
          ) : (
            <EndScreen/>
          )
        ) : (
          <StartScreen/>
        )}
        
      </div>
      <Footer />
    </div>
  );
}

export default App;
