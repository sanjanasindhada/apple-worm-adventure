
const Player = require("../models/Player");
const GameProgress = require("../models/GameProgress");
const LevelResult = require("../models/LevelResult");

const TOTAL_LEVELS = Number(process.env.TOTAL_LEVELS) || 40;


// GET PLAYER PROGRESS
const getProgress = async (req, res) => {
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

        const progress = await GameProgress.findOne({
            player: player._id
        });

        const results = await LevelResult.find({
            player: player._id
        }).sort({ level: 1 });

        res.status(200).json({
            success: true,
            progress,
            results
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// UPDATE CURRENT LEVEL
const updateProgress = async (req, res) => {
    try {
        const { currentLevel } = req.body || {};

        if (
            !Number.isInteger(currentLevel) ||
            currentLevel < 1 ||
            currentLevel > TOTAL_LEVELS
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid level number"
            });
        }

        const player = await Player.findOne({
            playerId: req.params.playerId
        });

        if (!player) {
            return res.status(404).json({
                success: false,
                message: "Player not found"
            });
        }

        const progress = await GameProgress.findOne({
            player: player._id
        });

        if (!progress) {
            return res.status(404).json({
                success: false,
                message: "Game progress not found"
            });
        }

        if (currentLevel > progress.highestUnlockedLevel) {
            return res.status(403).json({
                success: false,
                message: "This level is locked"
            });
        }

        progress.currentLevel = currentLevel;
        progress.lastPlayed = new Date();

        await progress.save();

        await Player.findByIdAndUpdate(player._id, {
            lastPlayed: new Date()
        });

        res.status(200).json({
            success: true,
            message: "Progress updated successfully",
            progress
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// COMPLETE LEVEL
const completeLevel = async (req, res) => {
    try {
        const { level, score, applesCollected, stars } = req.body;

        // VALIDATION
        if (
            !Number.isInteger(level) ||
            level < 1 ||
            level > TOTAL_LEVELS
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid level number"
            });
        }

        if (
            !Number.isFinite(score) ||
            score < 0 ||
            !Number.isInteger(applesCollected) ||
            applesCollected < 0 ||
            !Number.isInteger(stars) ||
            stars < 1 ||
            stars > 3
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid score, apples or stars"
            });
        }

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

        // FIND PROGRESS
        const progress = await GameProgress.findOne({
            player: player._id
        });

        if (!progress) {
            return res.status(404).json({
                success: false,
                message: "Game progress not found"
            });
        }

        // CHECK LEVEL UNLOCK
        if (level > progress.highestUnlockedLevel) {
            return res.status(403).json({
                success: false,
                message: "Complete previous levels first"
            });
        }

        // SAVE OR UPDATE LEVEL RESULT
        const result = await LevelResult.findOneAndUpdate(
            {
                player: player._id,
                level: level
            },
            {
                $max: {
                    score: score,
                    applesCollected: applesCollected,
                    stars: stars
                },
                $set: {
                    completedAt: new Date()
                },
                $setOnInsert: {
                    player: player._id,
                    level: level
                }
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true
            }
        );

        // GET ALL COMPLETED LEVEL RESULTS
        const results = await LevelResult.find({
            player: player._id
        });

        const completedLevels = results.map(
            item => item.level
        ).sort((a, b) => a - b);

        // CALCULATE TOTALS
        const totalScore = results.reduce(
            (total, item) => total + item.score,
            0
        );

        const bestScore = Math.max(
            0,
            ...results.map(item => item.score)
        );

        const totalApplesCollected = results.reduce(
            (total, item) => total + item.applesCollected,
            0
        );

        const totalStars = results.reduce(
            (total, item) => total + item.stars,
            0
        );

        // UNLOCK NEXT LEVEL
        const nextLevel = Math.min(
            level + 1,
            TOTAL_LEVELS
        );

        progress.completedLevels = completedLevels;

        progress.highestUnlockedLevel = Math.max(
            progress.highestUnlockedLevel,
            nextLevel
        );

        progress.currentLevel = Math.max(
            progress.currentLevel,
            Math.min(nextLevel, progress.highestUnlockedLevel)
        );

        progress.totalScore = totalScore;
        progress.bestScore = bestScore;
        progress.totalApplesCollected = totalApplesCollected;
        progress.totalStars = totalStars;
        progress.totalGamesPlayed = completedLevels.length;
        progress.lastPlayed = new Date();

        await progress.save();

        await Player.findByIdAndUpdate(player._id, {
            lastPlayed: new Date()
        });

        res.status(200).json({
            success: true,
            message: "Level completed successfully",
            result,
            progress
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    getProgress,
    updateProgress,
    completeLevel
};
