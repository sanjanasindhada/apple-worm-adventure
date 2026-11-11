
const Player = require("../models/Player");
const GameProgress = require("../models/GameProgress");

// EXPORT ALL PLAYERS DATA
const exportPlayersData = async (req, res) => {
    try {
        const players = await Player.find()
            .select("-__v")
            .lean();

        const progress = await GameProgress.find()
            .select("-__v")
            .populate("player", "playerId playerName")
            .lean();

        const exportData = players.map((player) => {
            const playerProgress = progress.find(
                (item) =>
                    item.player &&
                    item.player.playerId === player.playerId
            );

            return {
                playerId: player.playerId,
                playerName: player.playerName,
                registrationDate: player.registrationDate,
                lastPlayed: player.lastPlayed,

                currentLevel:
                    playerProgress?.currentLevel || 1,

                highestUnlockedLevel:
                    playerProgress?.highestUnlockedLevel || 1,

                completedLevels:
                    playerProgress?.completedLevels || [],

                totalScore:
                    playerProgress?.totalScore || 0,

                bestScore:
                    playerProgress?.bestScore || 0,

                totalApplesCollected:
                    playerProgress?.totalApplesCollected || 0,

                totalStars:
                    playerProgress?.totalStars || 0
            };
        });

        res.status(200).json({
            success: true,
            totalPlayers: exportData.length,
            exportData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    exportPlayersData
};
