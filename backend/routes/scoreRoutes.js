
const express = require("express");

const router = express.Router();

const {
    getScores,
    saveScore
} = require("../controllers/scoreController");

// GET PLAYER SCORE HISTORY
router.get("/:playerId", getScores);

// SAVE PLAYER SCORE
router.post("/:playerId", saveScore);

module.exports = router;
