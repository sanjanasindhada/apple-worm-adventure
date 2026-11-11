
const express = require("express");

const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const {
    createPlayer,
    getPlayer,
    updatePlayer,
    getRecentPlayers
} = require("../controllers/playerController");

// CREATE PLAYER
router.post("/", createPlayer);

// GET RECENT PLAYERS
router.get("/recent", adminAuth, getRecentPlayers);

// GET PLAYER
router.get("/:playerId", getPlayer);

// UPDATE PLAYER
router.put("/:playerId", updatePlayer);

module.exports = router;
