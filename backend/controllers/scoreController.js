
const Player = require("../models/Player");
const LevelResult = require("../models/LevelResult");

const { completeLevel } = require("./progressController");

// GET PLAYER SCORE HISTORY
const getScores = async (req, res) => {
    try {
        const player = await Player.findOne({
            playerId: req.params.playerId
        });

        if (!player) {
            return res.status(404).json({
                success: false,
                message: "Player not found"
            });
        }

        const scores = await LevelResult.find({
            player: player._id
        }).sort({ level: 1 });

        res.status(200).json({
            success: true,
            totalLevels: scores.length,
            scores
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// SAVE SCORE
// Uses the same completion logic to avoid duplicate rewards.
const saveScore = async (req, res) => {
    return completeLevel(req, res);
};


module.exports = {
    getScores,
    saveScore
};
