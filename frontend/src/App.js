import './App.css';
import { useState } from 'react';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import levels from './data/Levels';
function App() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const levelData = levels[currentLevel];
  const initialWorm = [levelData.start];
  const [worm, setWorm] = useState(initialWorm);
  const [apple, setApple] = useState(levelData.apple);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [appleCollected, setAppleCollected] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);
  const [wormSize, setWormSize] = useState(1);
  const [showNextLevelPrompt, setShowNextLevelPrompt] = useState(false);

  const goToNextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setShowNextLevelPrompt(true);
      setLevelComplete(true);
      setGameOver(true);
    }
  };
  const playNextLevel = () => {
    const nextLevel = currentLevel + 1;
    const nextLevelData = levels[nextLevel];

    setCurrentLevel(nextLevel);
    setWorm([nextLevelData.start]);
    setApple(nextLevelData.apple);
    setScore(0);
    setAppleCollected(false);
    setLevelComplete(false);
    setShowNextLevelPrompt(false);
    setGameOver(false);
    setWormSize(1);
  };
  return (
    <div className="game-container">
      <h1>🍎 Apple Worm Adventure</h1>

      <p>Collect apples and grow your worm!</p>

      <h3>Level {levelData.level} | Score: {score}</h3>
      {gameOver && (
        <h2>Game Over! Try Again 🎮</h2>
      )}
      {/* {levelComplete && <h2>🎉 Level Complete!</h2>} */}
      {showNextLevelPrompt && (
        <div className="level-prompt">
          <h2>🎉 Level Complete!</h2>
          <p>Ready for the next challenge?</p>

          <button
            className="big-play-btn"
            onClick={playNextLevel}
          >
            ▶ PLAY LEVEL {levelData.level + 1}
          </button>
        </div>
      )}
      {!showNextLevelPrompt && (
        <div className="game-layout">
          <GameBoard
            worm={worm}
            apple={apple}
            portal={levelData.portal}
            obstacles={levelData.obstacles}
            appleCollected={appleCollected}
            wormSize={wormSize}
          />

          <div className="side-controls">
            <GameControls
              setLevelComplete={setLevelComplete}
              levelComplete={levelComplete}
              setScore={setScore}
              setWorm={setWorm}
              setApple={setApple}
              apple={apple}
              worm={worm}
              score={score}
              initialWorm={initialWorm}
              gameOver={gameOver}
              setGameOver={setGameOver}
              appleCollected={appleCollected}
              setAppleCollected={setAppleCollected}
              obstacles={levelData.obstacles}
              setWormSize={setWormSize}
              goToNextLevel={goToNextLevel}
              initialApple={levelData.apple}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
