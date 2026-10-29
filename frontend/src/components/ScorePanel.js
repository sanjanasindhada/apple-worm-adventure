import React from 'react'

export default function ScorePanel({ level, score, moveLeft }) {
    return (
        <div className='score-panel'>
            <h3>Level {level}| score: {score}</h3>
        </div>
    )
}
