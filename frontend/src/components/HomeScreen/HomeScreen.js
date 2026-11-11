import { playClickSound } from "../../utils/playSounds";
import "./HomeScreen.css";

function HomeScreen({ onPlay, onAdmin }) {
    return (
        <div className="home-screen">
            <button
                className="play-button"
                onClick={() => {
                    onPlay();
                    playClickSound();
                }}
                aria-label="Play game"
            >
                ▶ Play
            </button>
            <button
                className="admin-button"
                onClick={() => {
                    onAdmin();
                    playClickSound();
                }}
            >
                ⚙ Admin Dashboard
            </button>
        </div>
    );
}

export default HomeScreen;