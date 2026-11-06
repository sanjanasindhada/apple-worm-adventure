
import "./GameBoard.css";

function GameBoard({
    worm,
    apple,
    portal = { x: 6, y: 6 },
    obstacles = [],
    appleCollected = false,
    portalEntering = false,
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

                const isHead =
                    worm.length > 0 &&
                    worm[0].x === x &&
                    worm[0].y === y;
                const isSingleWorm = worm.length === 1;
                const isWorm = worm.some(
                    (part) => part.x === x && part.y === y
                );

                const isApple = apple.x === x && apple.y === y;
                const isPortal = portal.x === x && portal.y === y;
                const isObstacle = isWall(x, y);

                const wallClasses = isObstacle
                    ? [
                        !isWall(x, y - 1) && "wall-top",
                        !isWall(x, y + 1) && "wall-bottom",
                        !isWall(x - 1, y) && "wall-left",
                        !isWall(x + 1, y) && "wall-right",
                    ].filter(Boolean).join(" ")
                    : "";
                const isTail =
                    worm.length > 1 &&
                    worm[worm.length - 1].x === x &&
                    worm[worm.length - 1].y === y;
                const tailIndex = worm.length - 1;

                const tailAngle =
                    worm.length > 1
                        ? Math.atan2(
                            worm[tailIndex].y - worm[tailIndex - 1].y,
                            worm[tailIndex].x - worm[tailIndex - 1].x
                        ) * (180 / Math.PI)
                        : 0;
                return (
                    <div
                        key={index}
                        className={`cell ${isObstacle
                            ? `wall-cell ${wallClasses}`
                            : "empty-cell"
                            }`}
                    >
                        {isHead ? (
                            <span className={`worm-head ${portalEntering ? "portal-entering" : ""}`}>
                                <span className="worm-antenna left-antenna" />
                                <span className="worm-antenna right-antenna" />
                                <span className="worm-eye left-eye"></span>
                                <span className="worm-eye right-eye"></span>
                                <span className="worm-smile"></span>
                                {isSingleWorm && <span className="worm-tail single-tail" />}
                            </span>
                        ) : isWorm ? (
                            <span
                                className={`worm-circle ${portalEntering ? "portal-entering" : ""
                                    } ${isTail ? "worm-tail" : ""}`}
                                style={
                                    isTail
                                        ? { "--tail-angle": `${tailAngle}deg` }
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
                        ) : isObstacle ? (
                            ""
                        ) : isPortal ? (
                            <span className={`portal ${appleCollected ? "portal-active" : ""}`}>
                                🌀
                            </span>
                        ) : ""}
                    </div>
                );
            })}
        </div>
    );
}

export default GameBoard;
