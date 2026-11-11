
const GameProgress = require("../models/GameProgress");

const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await GameProgress.find()
            .populate("player", "playerName")
            .sort({
                totalScore: -1,
                bestScore: -1,
                totalStars: -1
            })
            .limit(10)
            .lean();

        const rankings = leaderboard.map((item, index) => ({
            rank: index + 1,
            playerName: item.player?.playerName || "Unknown Player",
            totalScore: item.totalScore,
            bestScore: item.bestScore,
            completedLevels: item.completedLevels.length,
            totalStars: item.totalStars,
            totalApplesCollected: item.totalApplesCollected
        }));

        return res.status(200).json({
            success: true,
            totalPlayers: rankings.length,
            leaderboard: rankings
        });

    } catch (error) {
        console.error("Leaderboard error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch leaderboard"
        });
    }
};

module.exports = { getLeaderboard };
