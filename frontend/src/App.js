import './App.css';
import { playSound } from "./utils/playSounds";
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import levels from './data/Levels';
import HomeScreen from './components/HomeScreen/HomeScreen';
import LevelSelection from './components/LevelSelection/LevelSelection';
import { useState, useEffect, useRef } from 'react';
import { playClickSound } from './utils/playSounds';
function App() {
  const bgMusicRef = useRef(null);

  const startBgMusic = () => {
    if (!bgMusicRef.current) {
      bgMusicRef.current = new Audio("/sounds/bg.mp3");
      bgMusicRef.current.loop = true;
      bgMusicRef.current.volume = 0.2;
    }

    bgMusicRef.current.play().catch((error) => {
      console.log("Background music start nahi hua:", error);
    });
  };

  useEffect(() => {
    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
    };
  }, []);

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
  const [screen, setScreen] = useState("home");
  const [movesLeft, setMovesLeft] = useState(null);
  const [portalEntering, setPortalEntering] = useState(false);
  const [moves, setMoves] = useState(0);
  const [earnedStars, setEarnedStars] = useState(0);
  const [unlockedLevels, setUnlockedLevels] = useState(1);

  const selectLevel = (index) => {
    const selectedLevel = levels[index];
    setMoves(0);
    setEarnedStars(0);
    setCurrentLevel(index);
    setWorm([selectedLevel.start]);
    setApple(selectedLevel.apple);
    setScore(0);
    setGameOver(false);
    setAppleCollected(false);
    setLevelComplete(false);
    setShowNextLevelPrompt(false);
    setWormSize(1);
    setMovesLeft(null);
    setPortalEntering(false);
    setEarnedStars(0);
    setScreen("game");
  };

  const goToNextLevel = () => {
    setUnlockedLevels((prev) =>
      Math.max(prev, currentLevel + 2)
    );
    const target = levelData.starTarget;
    let stars = 1;
    if (moves <= target.threeStars) {
      stars = 3;
    }
    else if (moves <= target.twoStars) {
      stars = 2;
    }
    setEarnedStars(stars);
    if (currentLevel < levels.length - 1) {
      playSound("win");
      setShowNextLevelPrompt(true);
      setLevelComplete(true);
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
    setMovesLeft(null);
    setPortalEntering(false);
    setMoves(0);
    setEarnedStars(0);
  };

  return (
    <>
      {screen === "home" && (
        <HomeScreen
          onPlay={() => {
            startBgMusic();
            setScreen("levels");
          }}
        />
      )}

      {screen === "levels" && (
        <LevelSelection
          levels={levels}
          onBack={() => setScreen("home")}
          onSelectLevel={selectLevel}
          unlockedLevels={unlockedLevels}
        />
      )}

      {screen === "game" && (
        <div className="game-container">
          <button
            className="back-button"
            onClick={() => {
              setScreen("levels");
              playClickSound();
            }}
          >
            ← Back to Levels
          </button>
          <h1>🍎 Apple Worm Adventure</h1>

          <p>Collect apples and grow your worm!</p>

          <h3>Level {levelData.level} | Score: {score}</h3>

          {gameOver && !levelComplete && (
            <h2>Game Over! Try Again 🎮</h2>
          )}

          {showNextLevelPrompt && (
            <div className="level-prompt">
              <div className="celebration">🎉 🎊 🎉</div>

              <h2>Level Complete!</h2>

              {/* Earned Stars */}
              <div className="earned-stars">
                {"⭐".repeat(earnedStars)}
              </div>

              <p>You completed the level in {moves} moves!</p>
              <p>Ready for the next challenge?</p>

              {currentLevel < levels.length - 1 ? (
                <button
                  className="big-play-btn"
                  onClick={() => {
                    playNextLevel();
                    playClickSound();
                  }}
                >
                  ▶ PLAY LEVEL {levelData.level + 1}
                </button>
              ) : (
                <h2>🏆 All Levels Completed!</h2>
              )}
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
                portalEntering={portalEntering}
                setPortalEntering={setPortalEntering}
              />

              <div className="side-controls">
                <GameControls
                  moves={moves}
                  setMoves={setMoves}
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
                  movesLeft={movesLeft}
                  setMovesLeft={setMovesLeft}
                  setPortalEntering={setPortalEntering}
                  portal={levelData.portal}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;