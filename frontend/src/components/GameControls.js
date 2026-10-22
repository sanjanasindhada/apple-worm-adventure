import { useEffect } from "react";
import levels from "../data/Levels";
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
    obstacles = []
}) {
    const restartGame = () => {
        setWorm(initialWorm);
        setApple({ x: 4, y: 4 });
        setScore(0);
        setGameOver(false);
        setAppleCollected(false);
        setLevelComplete(false);
    };

    const generateApple = (currentWorm) => {
        const emptyCells = [];
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const occupied = currentWorm.some((part) =>
                    part.x === x && part.y === y
                );
                if (!occupied) {
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
            newHead.x === 6 && newHead.y === 6;
        if (reachedPortal && appleCollected) {
            setLevelComplete(true);
            setGameOver(true);
            return
        }
        setWorm(newWorm);
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
    }, [worm, apple, gameOver])
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
