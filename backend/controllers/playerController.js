
const { randomUUID } = require("crypto");

const Player = require("../models/Player");
const GameProgress = require("../models/GameProgress");

// CREATE PLAYER
const createPlayer = async (req, res) => {
    try {
        const { playerName } = req.body;

        if (
            playerName !== undefined &&
            (
                typeof playerName !== "string" ||
                !playerName.trim() ||
                playerName.trim().length > 30
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid player name (1-30 characters)"
            });
        }

        const player = await Player.create({
            playerId: randomUUID(),
            playerName: playerName?.trim() || "Player"
        });

        const progress = await GameProgress.create({
            player: player._id
        });

        return res.status(201).json({
            success: true,
            message: "Player created successfully",
            player,
            progress
        });

    } catch (error) {
        console.error("Create player error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to create player"
        });
    }
};

// GET PLAYER
const getPlayer = async (req, res) => {
    try {
        const { playerId } = req.params;

        if (!/^[0-9a-f-]{36}$/i.test(playerId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid player ID"
            });
        }

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

        return res.status(200).json({
            success: true,
            player,
            progress
        });

    } catch (error) {
        console.error("Get player error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch player"
        });
    }
};

// UPDATE PLAYER
const updatePlayer = async (req, res) => {
    try {
        console.log("BODY:", req.body);

        if (!req.body || typeof req.body !== "object") {
            return res.status(400).json({
                success: false,
                message: "Request body is missing"
            });
        }
        const { playerId } = req.params;
        const { playerName } = req.body;

        if (!/^[0-9a-f-]{36}$/i.test(playerId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid player ID"
            });
        }

        if (
            typeof playerName !== "string" ||
            !playerName.trim() ||
            playerName.trim().length > 30
        ) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid player name (1-30 characters)"
            });
        }

        const player = await Player.findOneAndUpdate(
            { playerId },
            {
                playerName: playerName.trim(),
                lastPlayed: new Date()
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!player) {
            return res.status(404).json({
                success: false,
                message: "Player not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Player updated successfully",
            player
        });

    } catch (error) {
        console.error("Update player error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to update player"
        });
    }
};

// GET RECENT PLAYERS
const getRecentPlayers = async (req, res) => {
    try {
        const players = await Player.find()
            .sort({ lastPlayed: -1 })
            .limit(10)
            .select("playerId playerName lastPlayed");

        return res.status(200).json({
            success: true,
            totalPlayers: players.length,
            players
        });

    } catch (error) {
        console.error("Recent players error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch recent players"
        });
    }
};

module.exports = {
    createPlayer,
    getPlayer,
    updatePlayer,
    getRecentPlayers
};
