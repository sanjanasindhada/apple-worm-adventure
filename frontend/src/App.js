
import './App.css';

import { useState, useEffect, useRef } from 'react';

import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import HomeScreen from './components/HomeScreen/HomeScreen';
import LevelSelection from './components/LevelSelection/LevelSelection';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import levels from './data/Levels';

import {
    playSound,
    playClickSound
} from "./utils/playSounds";

const API_BASE_URL = "http://localhost:5000/api";

function App() {

    const bgMusicRef = useRef(null);
    const playerInitRef = useRef(false);

    const [playerId, setPlayerId] = useState(
        localStorage.getItem("appleWormPlayerId")
    );

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

    // CREATE PLAYER OR LOAD EXISTING PLAYER
    useEffect(() => {

        if (playerInitRef.current) return;

        playerInitRef.current = true;

        const initializePlayer = async () => {

            try {

                let savedPlayerId = localStorage.getItem(
                    "appleWormPlayerId"
                );

                if (savedPlayerId) {

                    try {

                        const response = await fetch(
                            `${API_BASE_URL}/progress/${savedPlayerId}`
                        );

                        const data = await response.json();

                        if (!response.ok || !data.success) {
                            throw new Error("Existing player not found");
                        }

                        setPlayerId(savedPlayerId);

                        const highestUnlocked =
                            data.progress?.highestUnlockedLevel || 1;

                        setUnlockedLevels(
                            Math.max(
                                1,
                                Math.min(highestUnlocked, levels.length)
                            )
                        );

                        console.log("Player progress loaded:", data);

                        return;

                    } catch (error) {

                        console.log("Creating a new player...");

                        localStorage.removeItem("appleWormPlayerId");
                        savedPlayerId = null;
                    }
                }

                if (!savedPlayerId) {

                    const response = await fetch(
                        `${API_BASE_URL}/players`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                playerName: "Player"
                            })
                        }
                    );

                    const data = await response.json();

                    if (!response.ok || !data.success) {
                        throw new Error(
                            data.message || "Player creation failed"
                        );
                    }

                    const newPlayerId = data.player.playerId;

                    localStorage.setItem(
                        "appleWormPlayerId",
                        newPlayerId
                    );

                    setPlayerId(newPlayerId);

                    setUnlockedLevels(
                        Math.max(
                            1,
                            Math.min(
                                data.progress?.highestUnlockedLevel || 1,
                                levels.length
                            )
                        )
                    );

                    console.log("New player created:", data);
                }

            } catch (error) {

                console.error("Player initialization error:", error);

                alert(
                    "Backend connection failed. Please start the backend server and refresh the game."
                );
            }
        };

        initializePlayer();

    }, []);

    // BACKGROUND MUSIC CLEANUP
    useEffect(() => {

        return () => {

            if (bgMusicRef.current) {
                bgMusicRef.current.pause();
                bgMusicRef.current = null;
            }

        };

    }, []);

    const [currentLevel, setCurrentLevel] = useState(0);

    const safeLevelIndex = Math.min(
        Math.max(currentLevel, 0),
        levels.length - 1
    );

    const levelData = levels[safeLevelIndex];

    const rows = levelData?.rows || 8;
    const columns = levelData?.columns || 8;

    const initialWorm = [
        levelData.start,
        {
            x: levelData.start.x + 1,
            y: levelData.start.y
        }
    ];

    const [worm, setWorm] = useState(initialWorm);
    const [stones, setStones] = useState(levelData.stones || []);
    const [apple, setApple] = useState(levelData.apple);

    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const [appleCollected, setAppleCollected] = useState(false);

    const [wormSize, setWormSize] = useState(1);

    const [showNextLevelPrompt, setShowNextLevelPrompt] = useState(false);

    const [screen, setScreen] = useState("home");


    const [portalEntering, setPortalEntering] = useState(false);

    const [moves, setMoves] = useState(0);

    const [earnedStars, setEarnedStars] = useState(0);

    const [unlockedLevels, setUnlockedLevels] = useState(1);

    // FALLING STATE
    const [falling, setFalling] = useState(false);
    const [fallDistance, setFallDistance] = useState(0);
    const [fallingWorm, setFallingWorm] = useState(null);
    const [showGameOver, setShowGameOver] = useState(false);

    // RESET LEVEL
    const resetLevel = (selectedLevel) => {

        setWorm([
            selectedLevel.start,
            {
                x: selectedLevel.start.x + 1,
                y: selectedLevel.start.y
            }
        ]);

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

        setStones(selectedLevel.stones || []);
    };

    // GAME OVER ANIMATION
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

    // SELECT LEVEL
    const selectLevel = async (index) => {

        const selectedLevel = levels[index];

        if (index >= unlockedLevels) {
            return;
        }

        setCurrentLevel(index);

        resetLevel(selectedLevel);

        setScreen("game");

        if (playerId) {

            try {

                const response = await fetch(
                    `${API_BASE_URL}/progress/${playerId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            currentLevel: selectedLevel.level
                        })
                    }
                );

                const data = await response.json();

                if (!response.ok || !data.success) {
                    console.log("Progress update:", data.message);
                }

            } catch (error) {

                console.error("Progress update failed:", error);
            }
        }
    };

    // COMPLETE LEVEL AND SAVE IN BACKEND
    const goToNextLevel = async () => {

        const target = levelData.starTarget;

        let stars = 1;

        if (moves <= target.threeStars) {
            stars = 3;
        } else if (moves <= target.twoStars) {
            stars = 2;
        }

        if (!playerId) {

            alert("Player data is not ready. Please refresh the game.");
            return;
        }

        try {

            const response = await fetch(
                `${API_BASE_URL}/progress/${playerId}/complete-level`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({

                        level: levelData.level,

                        score: score,

                        applesCollected: score,

                        stars: stars

                    })
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {

                throw new Error(
                    data.message || "Level progress could not be saved"
                );
            }

            const highestUnlocked =
                data.progress.highestUnlockedLevel || 1;

            setUnlockedLevels(
                Math.max(
                    1,
                    Math.min(highestUnlocked, levels.length)
                )
            );

            setEarnedStars(stars);

            setShowNextLevelPrompt(true);

            setLevelComplete(true);

            playSound("win");

            console.log("Level completed and saved:", data);

        } catch (error) {

            console.error("Level completion error:", error);

            alert(
                "Level progress save nahi hua: " + error.message
            );
        }
    };

    // PLAY NEXT LEVEL
    const playNextLevel = () => {

        const nextLevel = currentLevel + 1;

        if (nextLevel >= levels.length) {
            return;
        }

        const nextLevelData = levels[nextLevel];

        setCurrentLevel(nextLevel);

        resetLevel(nextLevelData);
    };

    return (

        <div className={screen === "admin" ? "admin-mode" : "App"}>

            {/* ADMIN DASHBOARD */}
            {screen === "admin" && (
                <AdminDashboard
                    onBack={() => setScreen("home")}
                />
            )}

            {/* HOME SCREEN */}
            {screen === "home" && (
                <HomeScreen
                    onPlay={() => {
                        startBgMusic();
                        setScreen("levels");
                    }}
                    onAdmin={() => setScreen("admin")}
                />
            )}

            {/* LEVEL SELECTION */}
            {screen === "levels" && (
                <LevelSelection
                    levels={levels}
                    onBack={() => setScreen("home")}
                    onSelectLevel={selectLevel}
                    unlockedLevels={unlockedLevels}
                />
            )}

            {/* GAME SCREEN */}
            {screen === "game" && (
                <div className="game-container">

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

                                    {currentLevel < levels.length - 1 ? (
                                        <>
                                            <p>Ready for the next challenge?</p>

                                            <button
                                                className="big-play-btn"
                                                onClick={() => {
                                                    playNextLevel();
                                                    playClickSound();
                                                }}
                                            >
                                                ▶ PLAY LEVEL {levelData.level + 1}
                                            </button>
                                        </>
                                    ) : (
                                        <h2>🏆 All Levels Completed!</h2>
                                    )}

                                </div>
                            )}

                            {!showNextLevelPrompt && (
                                <div className="game-layout">

                                    <GameBoard
                                        rows={rows}
                                        columns={columns}
                                        worm={worm}
                                        apple={apple}
                                        portal={levelData.portal}
                                        obstacles={levelData.obstacles || []}
                                        stones={stones}
                                        thorns={levelData.thorns || []}
                                        appleCollected={appleCollected}
                                        wormSize={wormSize}
                                        portalEntering={portalEntering}
                                        falling={falling}
                                        fallDistance={fallDistance}
                                        fallingWorm={fallingWorm}
                                    />

                                    <div className="side-controls">

                                        <GameControls
                                            rows={rows}
                                            columns={columns}
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
                                            obstacles={levelData.obstacles || []}
                                            thorns={levelData.thorns || []}
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
                                            stones={stones}
                                            setStones={setStones}
                                            initialStones={levelData.stones || []}
                                        />

                                    </div>
                                </div>
                            )}

                        </>
                    )}

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

        </div>
    );
}

export default App;
