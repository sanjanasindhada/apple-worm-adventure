
const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
    {
        playerId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        playerName: {
            type: String,
            default: "Player",
            trim: true,
            maxlength: 30
        },

        registrationDate: {
            type: Date,
            default: Date.now
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

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
