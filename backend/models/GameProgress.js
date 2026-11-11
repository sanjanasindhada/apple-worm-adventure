
const mongoose = require("mongoose");

const gameProgressSchema = new mongoose.Schema(
    {
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
            required: true,
            unique: true
        },

        currentLevel: {
            type: Number,
            default: 1,
            min: 1
        },

        highestUnlockedLevel: {
            type: Number,
            default: 1,
            min: 1
        },

        completedLevels: {
            type: [Number],
            default: []
        },

        totalScore: {
            type: Number,
            default: 0,
            min: 0
        },

        bestScore: {
            type: Number,
            default: 0,
            min: 0
        },

        totalApplesCollected: {
            type: Number,
            default: 0,
            min: 0
        },

        totalStars: {
            type: Number,
            default: 0,
            min: 0
        },

        totalGamesPlayed: {
            type: Number,
            default: 0,
            min: 0
        },

        lastPlayed: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

const GameProgress = mongoose.model(
    "GameProgress",
    gameProgressSchema
);

module.exports = GameProgress;
