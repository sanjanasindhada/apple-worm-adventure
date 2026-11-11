
const LevelResult = require("../models/LevelResult");

// GET DAILY GAME ACTIVITY
const getDailyActivity = async (req, res) => {
    try {
        const activity = await LevelResult.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$completedAt"
                        }
                    },

                    totalLevelsCompleted: {
                        $sum: 1
                    },

                    totalScore: {
                        $sum: "$score"
                    },

                    totalApplesCollected: {
                        $sum: "$applesCollected"
                    },

                    totalStars: {
                        $sum: "$stars"
                    },

                    activePlayers: {
                        $addToSet: "$player"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    totalLevelsCompleted: 1,
                    totalScore: 1,
                    totalApplesCollected: 1,
                    totalStars: 1,
                    activePlayers: {
                        $size: "$activePlayers"
                    }
                }
            },
            {
                $sort: {
                    date: -1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            totalDays: activity.length,
            activity
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getDailyActivity
};
