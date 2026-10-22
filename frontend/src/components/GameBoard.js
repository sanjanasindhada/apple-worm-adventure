import levels from "../data/Levels";
import './GameBoard.css';
function GameBoard({ worm, apple, portal = { x: 6, y: 6 }, obstacles = [], appleCollected = false }) {
    return (
        <div className="game-board">
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

                // //hit the obstacles
                // if (isObstacle) {
                //     return;
                // }

                return (
                    <div
                        className={`cell ${isObstacle ? "wall-cell" : ""}`}
                        key={index}
                    >
                        {isHead
                            ? "🐛"
                            : isWorm
                                ? "🟢"
                                : isApple
                                    ? "🍎"
                                    : isObstacle
                                        ? ""
                                        : isPortal
                                            ? appleCollected
                                                ? "✨" :
                                                "🌀"
                                            : ""
                        }
                    </div>
                );
            })}
        </div>
    );
}

export default GameBoard;
