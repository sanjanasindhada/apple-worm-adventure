
import { playClickSound } from '../../utils/playSounds';
import './LevelSelection.css';

export default function LevelSelection({
    levels,
    onSelectLevel,
    onBack,
    unlockedLevels
}) {
    return (
        <div className="level-screen">

            <button
                className="back-button"
                onClick={() => {
                    onBack();
                    playClickSound();
                }}
            >
                ← Back
            </button>

            <h1>Select Level</h1>
            <p>Choose your adventure!</p>

            <div className="level-grid">
                {levels.map((level, index) => {
                    const isUnlocked = level.level <= unlockedLevels;

                    return (
                        <button
                            key={level.level}
                            className={`level-button ${isUnlocked ? "unlocked" : "locked"}`}
                            disabled={!isUnlocked}
                            onClick={() => {
                                if (isUnlocked) {
                                    onSelectLevel(index);
                                    playClickSound();
                                }
                            }}
                        >
                            {isUnlocked ? level.level : "🔒"}
                        </button>
                    );
                })}
            </div>

        </div>
    );
}
