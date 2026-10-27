import levels from "../data/Levels";
import './GameBoard.css';
function GameBoard({ worm, apple, portal = { x: 6, y: 6 }, obstacles = [], appleCollected = false }) {
    // const bodyPoints = worm
    //     .map((part) => `${part.x + 0.5},${part.y + 0.5}`)
    //     .join(" ");
    return (
        <div className="game-board">
            {/* <svg
                className="worm-body"
                viewBox="0 0 8 8"
                preserveAspectRatio="none"
            >
                <polyline
                    points={bodyPoints}
                    fill="none"
                    stroke="#286d27"
                    strokeWidth="0.95"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {worm.map((part, index) => (
                    <circle
                        key={index}
                        cx={part.x + 0.5}
                        cy={part.y + 0.5}
                        r="0.38"
                        fill="#72cf45"
                        stroke="#286d27"
                        strokeWidth="0.06"
                    />
                ))}
            </svg> */}

            {Array.from({ length: 64 }, (_, index) => {
                const x = index % 8;
                const y = Math.floor(index / 8);

                const isWorm = worm.some(
                    (part) => part.x === x && part.y === y
                );

                const isHead =
                    worm[0].x === x && worm[0].y === y;

                const isApple =
                    apple.x === x && apple.y === y;

                const isPortal =
                    portal.x === x && portal.y === y;
                const isObstacle = obstacles.some(
                    (obstacle) => obstacle.x === x && obstacle.y === y
                );
                return (
                    <div
                        className={`cell ${isObstacle ? "wall-cell" : "empty-cell"}`}
                    >
                        {isHead
                            ? "🐛"
                            : isWorm
                                ? <span className="worm-circle"></span>
                                : isApple
                                    ? "🍎"
                                    : isObstacle
                                        ? ""
                                        : isPortal
                                            ? (
                                                <div className={`${appleCollected ? "portal-active" : ""}`}>
                                                    🌀
                                                </div>
                                            )
                                            : ""
                        }
                    </div>
                );
            })}
        </div>
    );
}

export default GameBoard;
