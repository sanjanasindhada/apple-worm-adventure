
const express = require("express");

const router = express.Router();

const {
    getProgress,
    updateProgress,
    completeLevel
} = require("../controllers/progressController");

// GET PLAYER PROGRESS
router.get("/:playerId", getProgress);

// UPDATE CURRENT LEVEL
router.put("/:playerId", updateProgress);

// COMPLETE LEVEL
router.post("/:playerId/complete-level", completeLevel);

module.exports = router;
