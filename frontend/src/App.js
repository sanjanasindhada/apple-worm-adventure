
import React, { useState } from 'react';
import './App.css';

const initialWorm = [{ x: 1, y: 1 }];

function App() {
  const [worm, setWorm] = useState(initialWorm);
  const [apple, setApple] = useState({ x: 4, y: 4 });
  const [score, setScore] = useState(0);

  const moveWorm = (dx, dy) => {
    const head = worm[0];

    const newHead = {
      x: head.x + dx,
      y: head.y + dy,
    };

    if (
      newHead.x < 0 || newHead.x >= 8 ||
      newHead.y < 0 || newHead.y >= 8
    ) {
      return;
    }

    const ateApple =
      newHead.x === apple.x && newHead.y === apple.y;

    const newWorm = [newHead, ...worm];

    if (!ateApple) {
      newWorm.pop();
    } else {
      setScore(score + 1);

      setApple({
        x: (apple.x + 3) % 8,
        y: (apple.y + 2) % 8,
      });
    }

    setWorm(newWorm);
  };

  const restartGame = () => {
    setWorm(initialWorm);
    setApple({ x: 4, y: 4 });
    setScore(0);
  };

  return (
    <div className="game-container">
      <h1>🍎 Apple Worm Adventure</h1>
      <p>Collect apples and grow your worm!</p>

      <h3>Level 1 | Score: {score}</h3>

      <div className="game-board">
        {Array.from({ length: 64 }, (_, index) => {
          const x = index % 8;
          const y = Math.floor(index / 8);

          const isWorm = worm.some(
            (part) => part.x === x && part.y === y
          );

          const isHead =
            worm[0].x === x && worm[0].y === y;

          const isApple = apple.x === x && apple.y === y;

          return (
            <div className="cell" key={index}>
              {isHead ? '🐛' : isWorm ? '🟢' : isApple ? '🍎' : ''}
            </div>
          );
        })}
      </div>

      <div className="controls">
        <button onClick={() => moveWorm(0, -1)}>⬆️</button>

        <div>
          <button onClick={() => moveWorm(-1, 0)}>⬅️</button>
          <button onClick={() => moveWorm(0, 1)}>⬇️</button>
          <button onClick={() => moveWorm(1, 0)}>➡️</button>
        </div>
      </div>

      <button className="restart" onClick={restartGame}>
        Restart Game
      </button>
    </div>
  );
}

export default App;
