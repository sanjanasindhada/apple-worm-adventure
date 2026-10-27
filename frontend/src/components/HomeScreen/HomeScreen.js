import "./HomeScreen.css";

function HomeScreen({ onPlay }) {
    return (
        <div className="home-screen">
            <button
                className="play-button"
                onClick={onPlay}
                aria-label="Play game"
            >
                ▶ Play 
            </button>
        </div>
    );
}

export default HomeScreen;