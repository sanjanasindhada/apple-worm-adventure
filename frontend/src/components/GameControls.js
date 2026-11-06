
import { useEffect, useCallback } from "react";
import {
    playSound,
    playClickSound,
    playMoveSound
} from "../utils/playSounds";
import "./gamecontrol.css";

function GameControls({
    setWorm,
    setScore,
    setApple,
    apple,
    worm,
    initialWorm,
    gameOver,
    setGameOver,
    setAppleCollected,
    appleCollected,
    setLevelComplete,
    obstacles = [],
    setWormSize,
    goToNextLevel,
    initialApple,
    setPortalEntering,
    portal = { x: 6, y: 6 },
    setMoves
}) {
    // Restart game
    const restartGame = () => {
        setWorm(initialWorm);
        setApple(initialApple);
        setScore(0);
        setMoves(0);
        setGameOver(false);
        setAppleCollected(false);
        setLevelComplete(false);
        setPortalEntering(false);
        setWormSize(1);
    };

    // Generate apple in an empty cell
    const generateApple = useCallback(
        (currentWorm) => {
            const emptyCells = [];

            for (let y = 0; y < 8; y++) {
                for (let x = 0; x < 8; x++) {
                    const occupied = currentWorm.some(
                        part => part.x === x && part.y === y
                    );

                    const occupiedObstacle = obstacles.some(
                        obstacle => obstacle.x === x && obstacle.y === y
                    );

                    const occupiedPortal =
                        x === portal.x && y === portal.y;

                    if (!occupied && !occupiedObstacle && !occupiedPortal) {
                        emptyCells.push({ x, y });
                    }
                }
            }

            if (emptyCells.length === 0) return null;

            const randomIndex = Math.floor(
                Math.random() * emptyCells.length
            );

            return emptyCells[randomIndex];
        },
        [obstacles, portal]
    );

    // Move worm
    const moveWorm = useCallback(
        (dx, dy) => {
            if (gameOver || !worm || worm.length === 0) return;

            const head = worm[0];

            const newHead = {
                x: head.x + dx,
                y: head.y + dy
            };

            // Board boundary
            if (
                newHead.x < 0 || newHead.x >= 8 ||
                newHead.y < 0 || newHead.y >= 8
            ) {
                return;
            }

            // Obstacle collision
            const hitObstacle = obstacles.some(
                obstacle =>
                    obstacle.x === newHead.x &&
                    obstacle.y === newHead.y
            );

            if (hitObstacle) {
                playSound("hitobs");
                return;
            }

            // Apple check
            const ateApple =
                apple &&
                newHead.x === apple.x &&
                newHead.y === apple.y;

            // Ignore last tail cell when not growing
            const bodyToCheck = ateApple
                ? worm
                : worm.slice(0, -1);

            // Self collision
            const hitSelf = bodyToCheck.some(
                part =>
                    part.x === newHead.x &&
                    part.y === newHead.y
            );

            if (hitSelf) {
                playSound("hitself");
                setGameOver(true);
                return;
            }

            // Create new worm position
            const newWorm = [newHead, ...worm];

            // Normal movement: remove last segment
            if (!ateApple) {
                newWorm.pop();
            } else {
                // Apple collected: keep old tail
                setScore(prev => prev + 1);
                setWormSize(prev => Math.min(prev + 0.1, 2));
                setAppleCollected(true);

                playSound("pop");

                const nextApple = generateApple(newWorm);

                if (nextApple === null) {
                    setGameOver(true);
                } else {
                    setApple(nextApple);
                }
            }

            // Portal check
            const reachedPortal =
                newHead.x === portal.x &&
                newHead.y === portal.y;

            if (reachedPortal && (appleCollected || ateApple)) {
                setMoves(prev => prev + 1);
                setWorm(newWorm);
                setPortalEntering(true);
                playSound("portal");

                setTimeout(() => {
                    goToNextLevel();
                    setPortalEntering(false);
                }, 1000);

                return;
            }

            // Update worm
            playMoveSound();
            setMoves(prev => prev + 1);
            setWorm(newWorm);
        },
        [
            gameOver,
            worm,
            apple,
            obstacles,
            portal,
            appleCollected,
            generateApple,
            goToNextLevel,
            setGameOver,
            setScore,
            setWorm,
            setApple,
            setAppleCollected,
            setWormSize,
            setPortalEntering,
            setMoves
        ]
    );

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (
                ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
                    .includes(event.key)
            ) {
                event.preventDefault();
            }

            if (event.key === "ArrowUp") moveWorm(0, -1);
            else if (event.key === "ArrowDown") moveWorm(0, 1);
            else if (event.key === "ArrowLeft") moveWorm(-1, 0);
            else if (event.key === "ArrowRight") moveWorm(1, 0);
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [moveWorm]);

    return (
        <>
            <div className="controls">
                <button className="up" onClick={() => moveWorm(0, -1)}>⬆️</button>
                <button className="left" onClick={() => moveWorm(-1, 0)}>⬅️</button>
                <button className="right" onClick={() => moveWorm(1, 0)}>➡️</button>
                <button className="down" onClick={() => moveWorm(0, 1)}>⬇️</button>
            </div>

            <button
                className="restart"
                onClick={() => {
                    restartGame();
                    playClickSound();
                }}
            >
                Restart Game
            </button>
        </>
    );
}

export default GameControls;
