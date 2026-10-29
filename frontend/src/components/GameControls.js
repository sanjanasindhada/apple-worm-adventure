import { useEffect } from "react";
import { playSound } from "../utils/playSounds";
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
    // movesLeft,
    // setMovesLeft
}) {
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

    const generateApple = (currentWorm) => {
        const emptyCells = [];
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const occupied = currentWorm.some((part) =>
                    part.x === x && part.y === y
                );
                const occupiedObstacles = obstacles.some((obstacle) =>
                    obstacle.x === x && obstacle.y === y);
                const occupiedPortal =
                    x === portal.x && y === portal.y;
                if (!occupied && !occupiedObstacles && !occupiedPortal) {
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
    };

    const moveWorm = (dx, dy) => {
        if (gameOver) {
            return;
        }
        const head = worm[0];

        const newHead = {
            x: head.x + dx,
            y: head.y + dy,
        };

        if (
            newHead.x < 0 ||
            newHead.x >= 8 ||
            newHead.y < 0 ||
            newHead.y >= 8
        ) {
            return;
        }
        //hit the obstacles
        const hitobstacles = obstacles.some((obstacle) =>
            obstacle.x === newHead.x && obstacle.y === newHead.y
        );
        if (hitobstacles) {
            return;
        }

        //hit self
        const himself = worm.some(
            (part) =>
                part.x === newHead.x &&
                part.y === newHead.y
        )

        if (himself) {
            setGameOver(true);
            return;
        }
        const ateApple =
            newHead.x === apple.x &&
            newHead.y === apple.y;

        const newWorm = [newHead, ...worm];

        if (!ateApple) {
            newWorm.pop();
        } else {
            setScore(score + 1);
            playSound("pop");
            setWormSize((size) => Math.min(size + 0.1, 2));
            setAppleCollected(true)
            const nextApple = generateApple(newWorm);
            if (nextApple === null) {
                setGameOver(true)
            }
            else {
                setApple(nextApple);
            }
        }
        const reachedPortal =
            newHead.x === portal.x && newHead.y === portal.y;
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
        setWorm(newWorm);
        console.log("Worm length:", newWorm.length);
    };
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowUp") {
                moveWorm(0, -1);
            }
            else if (event.key === "ArrowDown") {
                moveWorm(0, 1);
            }
            else if (event.key === "ArrowLeft") {
                moveWorm(-1, 0);
            }
            else if (event.key === "ArrowRight") {
                moveWorm(1, 0);
            }
        }
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [worm, apple, gameOver, appleCollected, portal]);
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

            <button className="restart" onClick={restartGame}>
                Restart Game
            </button>
        </>
    );
}

export default GameControls;
