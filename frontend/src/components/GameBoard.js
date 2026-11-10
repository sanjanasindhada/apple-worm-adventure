
import "./GameBoard.css";

function GameBoard({
    worm,
    apple,
    portal = { x: 6, y: 6 },
    obstacles = [],
    appleCollected = false,
    portalEntering = false,
    falling = false,
    fallDistance = 0,
    fallingWorm = null,
}) {
    const isWall = (x, y) =>
        obstacles.some(
            (obstacle) => obstacle.x === x && obstacle.y === y
        );

    return (
        <div className="game-board">
            {Array.from({ length: 64 }, (_, index) => {
                const x = index % 8;
                const y = Math.floor(index / 8);

                const displayWorm = worm;

                const isHead =
                    displayWorm.length > 0 &&
                    displayWorm[0].x === x &&
                    displayWorm[0].y === y;

                const isSingleWorm = displayWorm.length === 1;

                const isWorm = displayWorm.some(
                    part => part.x === x && part.y === y
                );
                if (isWorm) {
                    console.log("Worm rendered at:", x, y);
                }
                const isFallingWorm = falling && isWorm;

                const isApple =
                    apple?.x === x && apple?.y === y;

                const isPortal =
                    portal.x === x && portal.y === y;

                const isObstacle = isWall(x, y);

                const wallClasses = isObstacle
                    ? [
                        !isWall(x, y - 1) && "wall-top",
                        !isWall(x, y + 1) && "wall-bottom",
                        !isWall(x - 1, y) && "wall-left",
                        !isWall(x + 1, y) && "wall-right",
                    ]
                        .filter(Boolean)
                        .join(" ")
                    : "";

                const isTail =
                    displayWorm.length > 1 &&
                    displayWorm[displayWorm.length - 1].x === x &&
                    displayWorm[displayWorm.length - 1].y === y;

                const tailIndex = displayWorm.length - 1;

                const tailAngle =
                    displayWorm.length > 1
                        ? Math.atan2(
                            displayWorm[tailIndex].y - displayWorm[tailIndex - 1].y,
                            displayWorm[tailIndex].x - displayWorm[tailIndex - 1].x
                        ) * (180 / Math.PI)
                        : 0;
                return (
                    <div
                        key={index}
                        className={`cell ${isObstacle
                            ? `wall-cell ${wallClasses}`
                            : "empty-cell"
                            } ${isFallingWorm
                                ? "worm-falling-cell"
                                : ""
                            }`}
                        style={
                            isFallingWorm
                                ? { transform: `translateY(${fallDistance * 100}%)` }
                                : {}
                        }
                    >
                        {isHead ? (
                            <>
                                <span
                                    className={`worm-head ${portalEntering ? "portal-entering" : ""
                                        }`}
                                >
                                    <span className="worm-antenna left-antenna" />
                                    <span className="worm-antenna right-antenna" />
                                    <span className="worm-brow left-brow" />
                                    <span className="worm-brow right-brow" />
                                    <span className="worm-eye left-eye" />
                                    <span className="worm-eye right-eye" />

                                    <span className="worm-smile" />
                                    <span className="worm-cheek left-cheek" />
                                    <span className="worm-cheek right-cheek" />
                                </span>
                            </>
                        ) : isWorm ? (
                            <span
                                className={`worm-circle ${portalEntering
                                    ? "portal-entering"
                                    : ""
                                    } ${isTail
                                        ? "worm-tail"
                                        : "worm-body-segment"
                                    }`}
                                style={
                                    isTail
                                        ? {
                                            "--tail-angle": `${tailAngle}deg`,
                                        }
                                        : {}
                                }
                            >
                                {!isTail && (
                                    <span className="worm-feet">
                                        <i />
                                        <i />
                                    </span>
                                )}
                            </span>
                        ) : isApple ? (
                            <span className="apple-item">🍎</span>
                        ) : isPortal ? (
                            <span
                                className={`portal ${appleCollected
                                    ? "portal-active"
                                    : ""
                                    }`}
                            >
                                🌀
                            </span>
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
}

export default GameBoard;
