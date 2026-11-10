
import './App.css';

import { useState, useEffect, useRef } from 'react';

import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import HomeScreen from './components/HomeScreen/HomeScreen';
import LevelSelection from './components/LevelSelection/LevelSelection';

import levels from './data/Levels';

import {
    playSound,
    playClickSound
} from "./utils/playSounds";

function App() {

    const bgMusicRef = useRef(null);

    const startBgMusic = () => {
        if (!bgMusicRef.current) {
            bgMusicRef.current = new Audio("/sounds/bg.mp3");
            bgMusicRef.current.loop = true;
            bgMusicRef.current.volume = 0.2;
        }

        bgMusicRef.current.play().catch(error => {
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
    const [, setLevelComplete] = useState(false); 

    const [wormSize, setWormSize] = useState(1);

    const [showNextLevelPrompt, setShowNextLevelPrompt] = useState(false);

    const [screen, setScreen] = useState("home");

    const [, setMovesLeft] = useState(null);

    const [portalEntering, setPortalEntering] = useState(false);

    const [moves, setMoves] = useState(0);

    const [earnedStars, setEarnedStars] = useState(0);

    const [unlockedLevels, setUnlockedLevels] = useState(1);

    // Falling state
    const [falling, setFalling] = useState(false);
    const [fallDistance, setFallDistance] = useState(0);
    const [fallingWorm, setFallingWorm] = useState(null);
    const [showGameOver, setShowGameOver] = useState(false);
    const resetLevel = (selectedLevel) => {
        setWorm([selectedLevel.start]);
        setApple(selectedLevel.apple);

        setScore(0);
        setMoves(0);

        setGameOver(false);
        setAppleCollected(false);
        setLevelComplete(false);

        setShowNextLevelPrompt(false);
        setWormSize(1);

        setMovesLeft(null);
        setPortalEntering(false);

        setFalling(false);
        setFallDistance(0);
        setFallingWorm(null);

        setEarnedStars(0);
    };
    useEffect(() => {
        if (gameOver) {
            setShowGameOver(false);

            const timer = setTimeout(() => {
                setShowGameOver(true);
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            setShowGameOver(false);
        }
    }, [gameOver]);
    const selectLevel = (index) => {
        const selectedLevel = levels[index];

        setCurrentLevel(index);
        resetLevel(selectedLevel);

        setScreen("game");
    };

    const goToNextLevel = () => {

        setUnlockedLevels(prev =>
            Math.max(prev, currentLevel + 2)
        );

        const target = levelData.starTarget;

        let stars = 1;

        if (moves <= target.threeStars) {
            stars = 3;
        } else if (moves <= target.twoStars) {
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
        resetLevel(nextLevelData);
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

                    {/* GAME CONTENT - Hide when game over */}

                    {!gameOver && (
                        <>

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

                            <h3>
                                Level {levelData.level} | Score: {score}
                            </h3>

                            {showNextLevelPrompt && (
                                <div className="level-prompt">

                                    <div className="celebration">
                                        🎉 🎊 🎉
                                    </div>

                                    <h2>Level Complete!</h2>

                                    <div className="earned-stars">
                                        {"⭐".repeat(earnedStars)}
                                    </div>

                                    <p>
                                        You completed the level in {moves} moves!
                                    </p>

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
                                        falling={falling}
                                        fallDistance={fallDistance}
                                        fallingWorm={fallingWorm}
                                    />

                                    <div className="side-controls">

                                        <GameControls
                                            setMoves={setMoves}
                                            setLevelComplete={setLevelComplete}
                                            setScore={setScore}
                                            setWorm={setWorm}
                                            setApple={setApple}
                                            apple={apple}
                                            worm={worm}
                                            score={score}
                                            initialWorm={initialWorm}
                                            initialApple={levelData.apple}
                                            gameOver={gameOver}
                                            setGameOver={setGameOver}
                                            appleCollected={appleCollected}
                                            setAppleCollected={setAppleCollected}
                                            obstacles={levelData.obstacles}
                                            setWormSize={setWormSize}
                                            goToNextLevel={goToNextLevel}
                                            setPortalEntering={setPortalEntering}
                                            portal={levelData.portal}
                                            falling={falling}
                                            setFalling={setFalling}
                                            fallDistance={fallDistance}
                                            setFallDistance={setFallDistance}
                                            fallingWorm={fallingWorm}
                                            setFallingWorm={setFallingWorm}
                                        />

                                    </div>
                                </div>
                            )}

                        </>
                    )}

                    {/* GAME OVER SCREEN */}

                    {showGameOver && (
                        <div className="game-over-overlay">

                            <div className="game-over-box">

                                <div className="game-over-icon">
                                    🥺
                                </div>

                                <h2>GAME OVER!</h2>

                                <p>Your worm needs another chance!</p>

                                <h3>🍎 Score: {score}</h3>

                                <button
                                    className="big-play-btn"
                                    onClick={() => {
                                        resetLevel(levelData);
                                        playClickSound();
                                    }}
                                >
                                    🔄 RESTART
                                </button>

                            </div>

                        </div>
                    )}

                </div>
            )}
        </>
    );
}

export default App;
