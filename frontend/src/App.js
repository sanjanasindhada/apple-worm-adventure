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
  return (
    <div className="game-container">
      <h1>🍎 Apple Worm Adventure</h1>

      <p>Collect apples and grow your worm!</p>

      <h3>Level 1 | Score: {score}</h3>
      {gameOver && (
        <h2>Game Over! Try Again 🎮</h2>
      )}
      {levelComplete && <h2>🎉 Level Complete!</h2>}
      <GameBoard
        worm={worm}
        apple={apple}
        portal={levelData.portal}
        obstacles={levelData.obstacles}
        appleCollected={appleCollected}
      />

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
      />
    </div>
  );
}

export default App;
