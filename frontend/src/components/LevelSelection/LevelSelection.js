import { playClickSound } from '../../utils/playSounds';
import './LevelSelection.css';
export default function LevelSelection({ levels, onSelectLevel, onBack }) {
    return (
        <div className="level-screen">
            <button className="back-button" onClick={() => {
                onBack();
                playClickSound();
            }}>
                ← Back
            </button>
            <h1>Select Level</h1>
            <p>Choose your adventure!</p>
            <div className="level-grid">
                {levels.map((level, index) => {
                    const unlocked = index === 0;
                    return (
                        <button key={level.level} className={`level-button ${unlocked ? "unlocked" : "locked"}`}
                            disabled={!unlocked}
                            onClick={() => {
                                onSelectLevel(index);
                                playClickSound();
                            }}
                        >
                            {unlocked ? level.level : "🔒"}
                        </button>
                    )
                })}
            </div>
        </div >
    )
}
