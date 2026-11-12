
import "./GameBoard.css";

function GameBoard({
    rows = 8,
    columns = 8,
    worm,
    apple,
    portal = { x: 6, y: 6 },
    obstacles = [],
    stones = [],
    thorns = [],
    appleCollected = false,
    portalEntering = false,
    falling = false,
    fallDistance = 0,
    fallingWorm = null,
}) {
    const isWall = (x, y) =>
        obstacles.some(o => o.x === x && o.y === y);

    const isStone = (x, y) =>
        stones.some(s => s.x === x && s.y === y);

    const isThorn = (x, y) =>
        thorns.some(t => t.x === x && t.y === y);

    return (
        <div
            className="game-board"
            style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
            }}
        >
            {Array.from({ length: rows * columns }, (_, index) => {
                const x = index % columns;
                const y = Math.floor(index / columns);

                const displayWorm = portalEntering ? [] : (worm || []);

                const isHead =
                    displayWorm.length > 0 &&
                    displayWorm[0].x === x &&
                    displayWorm[0].y === y;

                const isWorm = displayWorm.some(
                    part => part.x === x && part.y === y
                );

                const isFallingWorm = falling && isWorm;

                const isApple =
                    apple?.x === x && apple?.y === y;

                const isObstacle = isWall(x, y);
                const isPortal =
                    portal?.x === x &&
                    portal?.y === y &&
                    !isObstacle &&
                    !isStone(x, y);

                const wallClasses = isObstacle
                    ? [
                        !isWall(x, y - 1) && "wall-top",
                        !isWall(x, y + 1) && "wall-bottom",
                        !isWall(x - 1, y) && "wall-left",
                        !isWall(x + 1, y) && "wall-right",
                    ].filter(Boolean).join(" ")
                    : "";

                const isTail =
                    displayWorm.length > 1 &&
                    displayWorm[displayWorm.length - 1].x === x &&
                    displayWorm[displayWorm.length - 1].y === y;

                const tailIndex = displayWorm.length - 1;

                const tailAngle =
                    displayWorm.length > 1
                        ? Math.atan2(
                            displayWorm[tailIndex].y -
                                displayWorm[tailIndex - 1].y,
                            displayWorm[tailIndex].x -
                                displayWorm[tailIndex - 1].x
                        ) * (180 / Math.PI)
                        : 0;

                return (
                    <div
                        key={index}
                        className={`cell ${
                            isObstacle
                                ? `wall-cell ${wallClasses}`
                                : isStone(x, y)
                                    ? "stone-cell"
                                    : isThorn(x, y)
                                        ? "thorn-cell"
                                        : "empty-cell"
                        } ${isFallingWorm ? "worm-falling-cell" : ""}`}
                        style={
                            isFallingWorm
                                ? {
                                    transform: `translateY(${fallDistance * 100}%)`,
                                }
                                : {}
                        }
                    >
                        {isHead ? (
                            <span
                                className={`worm-head ${
                                    portalEntering ? "portal-entering" : ""
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
                        ) : isWorm ? (
                            <span
                                className={`worm-circle ${
                                    portalEntering ? "portal-entering" : ""
                                } ${
                                    isTail
                                        ? "worm-tail"
                                        : "worm-body-segment"
                                }`}
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
                        ) : isPortal ? (
                            <span
                                className={`portal ${
                                    appleCollected ? "portal-active" : ""
                                }`}
                            >
                                🌀
                            </span>
                        ) : isThorn(x, y) ? (
                            <span className="thorn-item">▲</span>
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
}

export default GameBoard;
