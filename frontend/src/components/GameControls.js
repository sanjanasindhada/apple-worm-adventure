
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
    obstacles = [],
    stones = [],
    thorns = [],
    setStones,
    initialStones = [],
    setWormSize,
    goToNextLevel,
    initialApple,
    setPortalEntering,
    portal = { x: 6, y: 6 },
    setMoves,
    falling,
    setFalling,
    setFallDistance,
    rows = 8,
    columns = 8,
}) {

    // Restart game
    const restartGame = () => {
        setWorm(initialWorm);
        setApple(initialApple);
        setScore(0);
        setMoves(0);
        setGameOver(false);
        setAppleCollected(false);
        setPortalEntering(false);
        setWormSize(1);
        setFalling(false);
        setFallDistance(0);
        setStones(initialStones);
    };

    // Generate apple
    const generateApple = useCallback(
        (currentWorm, currentStones = stones) => {

            const emptyCells = [];

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < columns; x++) {

                    const occupied = currentWorm.some(
                        part => part.x === x && part.y === y
                    );

                    const occupiedObstacle = obstacles.some(
                        item => item.x === x && item.y === y
                    );

                    const occupiedStone = currentStones.some(
                        item => item.x === x && item.y === y
                    );

                    const occupiedThorn = thorns.some(
                        item => item.x === x && item.y === y
                    );

                    const occupiedPortal =
                        portal &&
                        portal.x === x &&
                        portal.y === y;

                    const hasPlatformBelow =
                        y === rows - 1 ||
                        obstacles.some(
                            item => item.x === x && item.y === y + 1
                        ) ||
                        currentStones.some(
                            item => item.x === x && item.y === y + 1
                        );

                    if (
                        !occupied &&
                        !occupiedObstacle &&
                        !occupiedStone &&
                        !occupiedThorn &&
                        !occupiedPortal &&
                        hasPlatformBelow
                    ) {
                        emptyCells.push({ x, y });
                    }
                }
            }

            if (emptyCells.length === 0) return null;

            const head = currentWorm[0];

            emptyCells.sort((a, b) => {
                const distanceA =
                    Math.abs(a.x - head.x) +
                    Math.abs(a.y - head.y);

                const distanceB =
                    Math.abs(b.x - head.x) +
                    Math.abs(b.y - head.y);

                return distanceA - distanceB;
            });

            const nearbyCells = emptyCells.slice(0, 4);

            return nearbyCells[
                Math.floor(Math.random() * nearbyCells.length)
            ];
        },
        [rows, columns, obstacles, stones, thorns, portal]
    );

    // Worm support check
    const isWormSupported = useCallback(
        (currentWorm, currentStones = stones) => {

            return currentWorm.some(part => {

                if (part.y === rows - 1) return true;

                const supportedByObstacle = obstacles.some(
                    item =>
                        item.x === part.x &&
                        item.y === part.y + 1
                );

                const supportedByStone = currentStones.some(
                    item =>
                        item.x === part.x &&
                        item.y === part.y + 1
                );

                return supportedByObstacle || supportedByStone;
            });
        },
        [rows, obstacles, stones]
    );

    // Stone gravity
    const applyStoneGravity = useCallback(
        (currentStones, currentWorm) => {

            return currentStones.map((stone, index) => {

                let newY = stone.y;

                while (newY < rows - 1) {

                    const nextY = newY + 1;

                    const blockedByObstacle = obstacles.some(
                        item =>
                            item.x === stone.x &&
                            item.y === nextY
                    );

                    const blockedByOtherStone = currentStones.some(
                        (item, otherIndex) =>
                            otherIndex !== index &&
                            item.x === stone.x &&
                            item.y === nextY
                    );

                    const blockedByWorm = currentWorm.some(
                        part =>
                            part.x === stone.x &&
                            part.y >= stone.y &&
                            part.y <= nextY
                    );

                    const blockedByApple =
                        apple &&
                        apple.x === stone.x &&
                        apple.y === nextY;

                    if (
                        blockedByObstacle ||
                        blockedByOtherStone ||
                        blockedByWorm ||
                        blockedByApple
                    ) {
                        break;
                    }

                    newY++;
                }

                return {
                    ...stone,
                    y: newY
                };
            });
        },
        [rows, obstacles, apple]
    );

    // Move worm
    const moveWorm = useCallback(
        (dx, dy) => {

            if (gameOver || falling || !worm || worm.length === 0) {
                return;
            }

            const head = worm[0];

            let newHead = {
                x: head.x + dx,
                y: head.y + dy
            };

            let nextStones = stones;

            // Board boundary
            if (
                newHead.x < 0 ||
                newHead.x >= columns ||
                newHead.y < 0 ||
                newHead.y >= rows
            ) {
                return;
            }

            // Stone pushing and climbing
            const hitStoneIndex = stones.findIndex(
                stone =>
                    stone.x === newHead.x &&
                    stone.y === newHead.y
            );

            if (hitStoneIndex !== -1) {

                const stone = stones[hitStoneIndex];

                const newStonePosition = {
                    x: stone.x + dx,
                    y: stone.y + dy
                };

                const pushBlocked =
                    newStonePosition.x < 0 ||
                    newStonePosition.x >= columns ||
                    newStonePosition.y < 0 ||
                    newStonePosition.y >= rows ||

                    obstacles.some(item =>
                        item.x === newStonePosition.x &&
                        item.y === newStonePosition.y
                    ) ||

                    stones.some((item, index) =>
                        index !== hitStoneIndex &&
                        item.x === newStonePosition.x &&
                        item.y === newStonePosition.y
                    ) ||

                    worm.some(part =>
                        part.x === newStonePosition.x &&
                        part.y === newStonePosition.y
                    ) ||

                    thorns.some(item =>
                        item.x === newStonePosition.x &&
                        item.y === newStonePosition.y
                    ) ||

                    (apple &&
                        apple.x === newStonePosition.x &&
                        apple.y === newStonePosition.y);

                if (!pushBlocked) {

                    const updatedStones = stones.map(
                        (item, index) =>
                            index === hitStoneIndex
                                ? newStonePosition
                                : item
                    );

                    const finalStones = applyStoneGravity(
                        updatedStones,
                        worm
                    );

                    setStones(finalStones);
                    nextStones = finalStones;

                } else {

                    // If stone cannot move, try climbing
                    const climbPosition = {
                        x: stone.x,
                        y: stone.y - 1
                    };

                    const canClimb =
                        dx !== 0 &&
                        climbPosition.y >= 0 &&

                        !obstacles.some(item =>
                            item.x === climbPosition.x &&
                            item.y === climbPosition.y
                        ) &&

                        !stones.some((item, index) =>
                            index !== hitStoneIndex &&
                            item.x === climbPosition.x &&
                            item.y === climbPosition.y
                        ) &&

                        !worm.some(part =>
                            part.x === climbPosition.x &&
                            part.y === climbPosition.y
                        ) &&

                        !thorns.some(item =>
                            item.x === climbPosition.x &&
                            item.y === climbPosition.y
                        ) &&

                        !(apple &&
                            apple.x === climbPosition.x &&
                            apple.y === climbPosition.y);

                    if (canClimb) {
                        newHead = climbPosition;
                    } else {
                        playSound("hitobs");
                        return;
                    }
                }
            }

            // Obstacle collision
            const hitObstacle = obstacles.some(
                item =>
                    item.x === newHead.x &&
                    item.y === newHead.y
            );

            if (hitObstacle) {
                playSound("hitobs");
                return;
            }

            // Thorn collision
            const hitThorn = thorns.some(
                item =>
                    item.x === newHead.x &&
                    item.y === newHead.y
            );

            if (hitThorn) {
                playSound("hitobs");
                setGameOver(true);
                return;
            }

            // Apple check
            const ateApple =
                apple &&
                newHead.x === apple.x &&
                newHead.y === apple.y;

            // Worm movement
            let newWorm = ateApple
                ? [newHead, ...worm]
                : [newHead, ...worm.slice(0, -1)];

            // Stone collision
            const hitStoneAfterMove = newWorm.some(part =>
                nextStones.some(
                    stone =>
                        stone.x === part.x &&
                        stone.y === part.y
                )
            );

            if (hitStoneAfterMove) {
                playSound("hitobs");
                return;
            }

            // Self collision
            const hitSelf = newWorm.slice(1).some(
                part =>
                    part.x === newHead.x &&
                    part.y === newHead.y
            );

            if (hitSelf) {
                playSound("hitself");
                setGameOver(true);
                return;
            }

            // Worm gravity
            let hasFallen = false;

            while (!isWormSupported(newWorm, nextStones)) {

                const canFall = newWorm.every(
                    part => part.y < rows - 1
                );

                if (!canFall) break;

                const nextWorm = newWorm.map(part => ({
                    x: part.x,
                    y: part.y + 1
                }));

                const hitsStone = nextWorm.some(part =>
                    nextStones.some(
                        stone =>
                            stone.x === part.x &&
                            stone.y === part.y
                    )
                );

                const hitsObstacle = nextWorm.some(part =>
                    obstacles.some(
                        item =>
                            item.x === part.x &&
                            item.y === part.y
                    )
                );

                if (hitsStone || hitsObstacle) break;

                newWorm = nextWorm;
                hasFallen = true;
            }

            // Thorn collision after gravity
            const touchedThorn = newWorm.some(part =>
                thorns.some(
                    item =>
                        item.x === part.x &&
                        item.y === part.y
                )
            );

            if (touchedThorn) {
                playSound("hitobs");
                setGameOver(true);
                return;
            }

            // Falling game over
            if (
                hasFallen &&
                newWorm.some(part => part.y === rows - 1)
            ) {

                const startWorm = [
                    newHead,
                    ...(ateApple ? worm : worm.slice(0, -1))
                ];

                const distance =
                    newWorm[0].y - startWorm[0].y;

                setWorm(startWorm);
                setFalling(true);
                setFallDistance(distance);

                setTimeout(() => {
                    setWorm(newWorm);
                    setFalling(false);
                    setFallDistance(0);
                    setGameOver(true);
                }, 500);

                return;
            }

            const finalHead = newWorm[0];

            // Apple collection
            if (ateApple) {

                setScore(prev => prev + 1);
                setWormSize(prev => Math.min(prev + 0.1, 2));
                setAppleCollected(true);

                playSound("pop");

                const nextApple = generateApple(
                    newWorm,
                    nextStones
                );

                if (nextApple === null) {
                    setWorm(newWorm);
                    setGameOver(true);
                    return;
                }

                setApple(nextApple);
            }

            // Portal check
            const reachedPortal =
                finalHead.x === portal.x &&
                finalHead.y === portal.y;

            if (reachedPortal && (appleCollected || ateApple)) {

                setMoves(prev => prev + 1);
                setWorm(newWorm);
                setPortalEntering(true);

                playSound("portal");

                setTimeout(() => {
                    goToNextLevel();
                }, 1000);

                return;
            }

            // Normal movement
            playMoveSound();

            setMoves(prev => prev + 1);
            setWorm(newWorm);
        },
        [
            gameOver,
            falling,
            worm,
            apple,
            obstacles,
            thorns,
            portal,
            appleCollected,
            generateApple,
            isWormSupported,
            applyStoneGravity,
            goToNextLevel,
            setGameOver,
            setScore,
            setWorm,
            setApple,
            setAppleCollected,
            setWormSize,
            setPortalEntering,
            setMoves,
            setFallDistance,
            setFalling,
            stones,
            setStones,
            rows,
            columns,
        ]
    );

    // Keyboard controls
    useEffect(() => {

        const handleKeyDown = event => {

            if (
                ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
                    .includes(event.key)
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

                <button
                    className="up"
                    onClick={() => moveWorm(0, -1)}
                >
                    ⬆️
                </button>

                <button
                    className="left"
                    onClick={() => moveWorm(-1, 0)}
                >
                    ⬅️
                </button>

                <button
                    className="right"
                    onClick={() => moveWorm(1, 0)}
                >
                    ➡️
                </button>

                <button
                    className="down"
                    onClick={() => moveWorm(0, 1)}
                >
                    ⬇️
                </button>

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
