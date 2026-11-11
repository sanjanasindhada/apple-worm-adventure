
const mongoose = require("mongoose");

const levelResultSchema = new mongoose.Schema(
    {
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
            required: true
        },

        level: {
            type: Number,
            required: true,
            min: 1
        },

        score: {
            type: Number,
            required: true,
            min: 0
        },

        applesCollected: {
            type: Number,
            default: 0,
            min: 0
        },

        stars: {
            type: Number,
            required: true,
            min: 1,
            max: 3
        },

        completedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

// One result per player per level
levelResultSchema.index(
    { player: 1, level: 1 },
    { unique: true }
);

const LevelResult = mongoose.model(
    "LevelResult",
    levelResultSchema
);

module.exports = LevelResult;
