import { useEffect, useCallback } from "react";
import { playSound } from "../utils/playSounds";
import { playClickSound } from "../utils/playSounds";
import { playMoveSound } from "../utils/playSounds";
function GameControls({
    setWorm,
    setScore,
    setApple,
    apple,
    worm,
    score,
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
}) {
    // Restart game
    const restartGame = () => {
        setWorm(initialWorm);
        setApple(initialApple);
        setScore(0);
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
                        (part) => part.x === x && part.y === y
                    );

                    const occupiedObstacles = obstacles.some(
                        (obstacle) =>
                            obstacle.x === x && obstacle.y === y
                    );

                    const occupiedPortal =
                        x === portal.x && y === portal.y;

                    if (
                        !occupied &&
                        !occupiedObstacles &&
                        !occupiedPortal
                    ) {
                        emptyCells.push({ x, y });
                    }
                }
            }

            if (emptyCells.length === 0) {
                return null;
            }

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
            if (gameOver || !worm || worm.length === 0) {
                return;
            }

            const head = worm[0];

            const newHead = {
                x: head.x + dx,
                y: head.y + dy,
            };

            // Stop at board boundaries
            if (
                newHead.x < 0 ||
                newHead.x >= 8 ||
                newHead.y < 0 ||
                newHead.y >= 8
            ) {
                return;
            }

            // Stop at obstacles
            const hitObstacles = obstacles.some(
                (obstacle) =>
                    obstacle.x === newHead.x &&
                    obstacle.y === newHead.y
            );

            if (hitObstacles) {
                playSound("hitobs");
                return;
            }

            // Check collision with worm itself
            const hitSelf = worm.some(
                (part) =>
                    part.x === newHead.x &&
                    part.y === newHead.y
            );

            if (hitSelf) {
                playSound("hitself")
                setGameOver(true);
                return;
            }

            // Check whether apple is collected
            const ateApple =
                apple &&
                newHead.x === apple.x &&
                newHead.y === apple.y;

            const newWorm = [newHead, ...worm];

            if (!ateApple) {
                newWorm.pop();
            } else {
                setScore(score + 1);
                playSound("pop");
                setWormSize((size) => Math.min(size + 0.1, 2));
                setAppleCollected(true);

                const nextApple = generateApple(newWorm);

                if (nextApple === null) {
                    setGameOver(true);
                } else {
                    setApple(nextApple);
                }
            }

            // Check portal
            const reachedPortal =
                newHead.x === portal.x &&
                newHead.y === portal.y;

            if (reachedPortal && appleCollected) {
                setWorm(newWorm);
                setPortalEntering(true);
                playSound("portal");

                setTimeout(() => {
                    goToNextLevel();
                    setPortalEntering(false);
                }, 1000);

                return;
            }
            playMoveSound();
            setWorm(newWorm);
        },
        [
            gameOver,
            worm,
            apple,
            score,
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
        ]
    );

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (
                [
                    "ArrowUp",
                    "ArrowDown",
                    "ArrowLeft",
                    "ArrowRight",
                ].includes(event.key)
            ) {
                event.preventDefault();
            }

            if (event.key === "ArrowUp") {
                moveWorm(0, -1);
            } else if (event.key === "ArrowDown") {
                moveWorm(0, 1);
            } else if (event.key === "ArrowLeft") {
                moveWorm(-1, 0);
            } else if (event.key === "ArrowRight") {
                moveWorm(1, 0);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [moveWorm]);

    return (
        <>
            <div className="controls">
                <button onClick={() => moveWorm(0, -1)}>
                    ⬆️
                </button>

                <div>
                    <button onClick={() => moveWorm(-1, 0)}>
                        ⬅️
                    </button>

                    <button onClick={() => moveWorm(0, 1)}>
                        ⬇️
                    </button>

                    <button onClick={() => moveWorm(1, 0)}>
                        ➡️
                    </button>
                </div>
            </div>

            <button className="restart" onClick={() => {
                restartGame();
                playClickSound();
            }}>
                Restart Game
            </button>
        </>
    );
}

export default GameControls;