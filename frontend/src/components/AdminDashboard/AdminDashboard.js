
import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

// const API_BASE_URL = process.env.REACT_APP_API_URL;
const API_BASE_URL = "/api";
export default function AdminDashboard({ onBack }) {
    const [overview, setOverview] = useState(null);
    const [levelStatistics, setLevelStatistics] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [levelError, setLevelError] = useState("");

    useEffect(() => {
        const fetchDashboardData = async () => {
            const headers = {
                "x-admin-key": process.env.REACT_APP_ADMIN_API_KEY
            };

            try {
                // GAME OVERVIEW API
                const overviewResponse = await fetch(
                    `${API_BASE_URL}/overview`,
                    { headers }
                );

                const overviewData = await overviewResponse.json();

                if (!overviewResponse.ok || !overviewData.success) {
                    throw new Error(
                        overviewData.message || "Failed to load overview"
                    );
                }

                setOverview(overviewData.gameOverview);

                // LEVEL STATISTICS API
                try {
                    const statisticsResponse = await fetch(
                        `${API_BASE_URL}/level-statistics`,
                        { headers }
                    );

                    const statisticsData = await statisticsResponse.json();

                    if (
                        !statisticsResponse.ok ||
                        !statisticsData.success
                    ) {
                        throw new Error(
                            statisticsData.message ||
                            "Failed to load level statistics"
                        );
                    }

                    setLevelStatistics(
                        statisticsData.statistics || []
                    );

                } catch (err) {
                    setLevelError(err.message);
                }

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <h2 className="dashboard-message">
                Loading Dashboard...
            </h2>
        );
    }

    if (error) {
        return (
            <h2 className="dashboard-error">
                Error: {error}
            </h2>
        );
    }

    const cards = [
        {
            title: "Total Players",
            value: overview.totalPlayers,
            icon: "👥",
            color: "blue"
        },
        {
            title: "Total Score",
            value: overview.totalScore,
            icon: "🏆",
            color: "purple"
        },
        {
            title: "Apples Collected",
            value: overview.totalApplesCollected,
            icon: "🍎",
            color: "red"
        },
        {
            title: "Total Stars",
            value: overview.totalStars,
            icon: "⭐",
            color: "yellow"
        },
        {
            title: "Levels Completed",
            value: overview.totalLevelsCompleted,
            icon: "🎮",
            color: "green"
        },
        {
            title: "Games Played",
            value: overview.totalGamesPlayed,
            icon: "🕹️",
            color: "orange"
        }
    ];

    return (
        <div className="admin-dashboard">
            <button className="admin-back-button" onClick={onBack}>
                ← Back to Home
            </button>
            {/* DASHBOARD HEADER */}
            <div className="dashboard-header">
                <div>
                    <p className="dashboard-subtitle">
                        APPLE WORM ADVENTURE
                    </p>

                    <h1>Admin Dashboard</h1>

                    <p className="dashboard-description">
                        Monitor your game performance and player activity.
                    </p>
                </div>

                <div className="admin-status">
                    <span></span> System Active
                </div>
            </div>

            {/* GAME OVERVIEW */}
            <div className="dashboard-section">
                <h2>Game Overview</h2>
                <p>Overall game statistics</p>
            </div>

            <div className="dashboard-cards">
                {cards.map((card, index) => (
                    <div
                        className={`dashboard-card ${card.color}`}
                        key={index}
                    >
                        <div className="card-top">
                            <span className="card-icon">
                                {card.icon}
                            </span>

                            <span className="card-label">
                                {card.title}
                            </span>
                        </div>

                        <h2>
                            {Number(card.value || 0).toLocaleString("en-IN")}
                        </h2>

                        <p>
                            Overall {card.title.toLowerCase()}
                        </p>
                    </div>
                ))}
            </div>

            {/* LEVEL STATISTICS */}
            <div className="dashboard-section level-section">
                <h2>Level Statistics</h2>
                <p>Level-wise player performance and game statistics</p>
            </div>

            {levelError ? (
                <div className="statistics-error">
                    Unable to load level statistics: {levelError}
                </div>
            ) : (
                <div className="statistics-table-wrapper">

                    <table className="statistics-table">

                        <thead>
                            <tr>
                                <th>Level</th>
                                <th>Total Players</th>
                                <th>Highest Score</th>
                                <th>Average Score</th>
                                <th>Apples Collected</th>
                                <th>Total Stars</th>
                            </tr>
                        </thead>

                        <tbody>
                            {levelStatistics.length > 0 ? (
                                levelStatistics.map((item, index) => (
                                    <tr key={item.level || index}>
                                        <td>
                                            <strong>
                                                Level {item.level}
                                            </strong>
                                        </td>

                                        <td>{item.totalPlayers}</td>

                                        <td>
                                            🏆 {item.highestScore}
                                        </td>

                                        <td>
                                            {Number(
                                                item.averageScore || 0
                                            ).toFixed(2)}
                                        </td>

                                        <td>
                                            🍎 {item.totalApplesCollected}
                                        </td>

                                        <td>
                                            ⭐ {item.totalStars}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="no-data">
                                        No level statistics available yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>

                    <p className="statistics-total">
                        Total Levels: {levelStatistics.length}
                    </p>

                </div>
            )}

        </div>
    );
}
