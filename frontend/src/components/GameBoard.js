
import "./GameBoard.css";
function GameBoard({
    worm,
    apple,
    portal = { x: 6, y: 6 },
    obstacles = [],
    appleCollected = false,
    portalEntering = false,
}) {
    return (
        <div className="game-board">
            {Array.from({ length: 64 }, (_, index) => {
                const x = index % 8;
                const y = Math.floor(index / 8);

                const isHead =
                    worm.length > 0 &&
                    worm[0].x === x &&
                    worm[0].y === y;

                const isWorm = worm.some(
                    (part) => part.x === x && part.y === y
                );

                const isApple = apple.x === x && apple.y === y;

                const isPortal =
                    portal.x === x && portal.y === y;

                const isObstacle = obstacles.some(
                    (obstacle) =>
                        obstacle.x === x && obstacle.y === y
                );

                return (
                    <div
                        key={index}
                        className={`cell ${isObstacle ? "wall-cell" : "empty-cell"
                            }`}
                    >
                        {isHead ? (
                            <span className={`worm-head ${portalEntering ? "portal-entering" : ""}`}>🐛</span>
                        ) : isWorm ? (
                            <span className={`worm-circle ${portalEntering ? "portal-entering" : ""}`} />
                        ) : isApple ? (
                            <span className="apple-item">🍎</span>
                        ) : isObstacle ? (
                            ""
                        ) : isPortal ? (
                            <span
                                className={`portal ${appleCollected ? "portal-active" : ""
                                    }`}
                            >
                                🌀
                            </span>
                        ) : (
                            ""
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default GameBoard;
