
const Player = require("../models/Player");
const GameProgress = require("../models/GameProgress");

// GET OVERALL GAME OVERVIEW
const getGameOverview = async (req, res) => {
    try {
        const totalPlayers = await Player.countDocuments();

        const overview = await GameProgress.aggregate([
            {
                $group: {
                    _id: null,

                    totalScore: {
                        $sum: "$totalScore"
                    },

                    totalApplesCollected: {
                        $sum: "$totalApplesCollected"
                    },

                    totalStars: {
                        $sum: "$totalStars"
                    },

                    totalLevelsCompleted: {
                        $sum: {
                            $size: {
                                $ifNull: ["$completedLevels", []]
                            }
                        }
                    },

                    totalGamesPlayed: {
                        $sum: "$totalGamesPlayed"
                    }
                }
            }
        ]);

        const data = overview[0] || {};

        res.status(200).json({
            success: true,
            gameOverview: {
                totalPlayers,
                totalScore: data.totalScore || 0,
                totalApplesCollected:
                    data.totalApplesCollected || 0,
                totalStars: data.totalStars || 0,
                totalLevelsCompleted:
                    data.totalLevelsCompleted || 0,
                totalGamesPlayed:
                    data.totalGamesPlayed || 0
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getGameOverview
};
