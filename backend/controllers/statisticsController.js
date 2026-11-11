
const Player = require("../models/Player");
const GameProgress = require("../models/GameProgress");
const LevelResult = require("../models/LevelResult");

// GET PLAYER STATISTICS
const getStatistics = async (req, res) => {
    try {
        // FIND PLAYER
        const player = await Player.findOne({
            playerId: req.params.playerId
        });

        if (!player) {
            return res.status(404).json({
                success: false,
                message: "Player not found"
            });
        }

        // FIND GAME PROGRESS
        const progress = await GameProgress.findOne({
            player: player._id
        });

        if (!progress) {
            return res.status(404).json({
                success: false,
                message: "Game progress not found"
            });
        }

        // FIND LEVEL RESULTS
        const results = await LevelResult.find({
            player: player._id
        });

        // CALCULATE STATISTICS
        const statistics = {
            playerName: player.playerName,

            currentLevel: progress.currentLevel,

            highestUnlockedLevel:
                progress.highestUnlockedLevel,

            totalGamesPlayed:
                progress.totalGamesPlayed,

            totalLevelsCompleted:
                progress.completedLevels.length,

            totalApplesCollected:
                progress.totalApplesCollected,

            totalScore:
                progress.totalScore,

            highestScore:
                progress.bestScore,

            totalStars:
                progress.totalStars,

            averageScore:
                results.length > 0
                    ? Math.round(
                        progress.totalScore / results.length
                    )
                    : 0,

            lastPlayed:
                progress.lastPlayed
        };

        res.status(200).json({
            success: true,
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
    getStatistics
};
