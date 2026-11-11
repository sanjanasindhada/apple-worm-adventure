
const GameProgress = require("../models/GameProgress");
const LevelResult = require("../models/LevelResult");
const Player = require("../models/Player");

const getPlayerHistory = async (req, res) => {
    try {
        const { playerId } = req.params;

        const player = await Player.findOne({ playerId });

        if (!player) {
            return res.status(404).json({
                success: false,
                message: "Player not found"
            });
        }

        const progress = await GameProgress.findOne({
            player: player._id
        });

        const history = await LevelResult.find({
            player: player._id
        }).sort({ level: 1 });

        return res.status(200).json({
            success: true,
            playerName: player.playerName,
            progress,
            totalCompleted: history.length,
            history
        });

    } catch (error) {
        console.error("Player history error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch player history"
        });
    }
};

module.exports = { getPlayerHistory };
