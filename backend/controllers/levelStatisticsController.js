
const LevelResult = require("../models/LevelResult");

// GET LEVEL-WISE STATISTICS
const getLevelStatistics = async (req, res) => {
    try {
        const statistics = await LevelResult.aggregate([
            {
                $group: {
                    _id: "$level",

                    totalPlayers: {
                        $sum: 1
                    },

                    averageScore: {
                        $avg: "$score"
                    },

                    highestScore: {
                        $max: "$score"
                    },

                    totalApplesCollected: {
                        $sum: "$applesCollected"
                    },

                    totalStars: {
                        $sum: "$stars"
                    }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            },
            {
                $project: {
                    _id: 0,
                    level: "$_id",
                    totalPlayers: 1,
                    averageScore: {
                        $round: ["$averageScore", 2]
                    },
                    highestScore: 1,
                    totalApplesCollected: 1,
                    totalStars: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            totalLevels: statistics.length,
            statistics
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getLevelStatistics
};
