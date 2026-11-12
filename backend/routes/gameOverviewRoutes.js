
const express = require("express");

const router = express.Router();

const {
    getGameOverview
} = require("../controllers/gameOverviewController");

const verifyAdmin = require("../middleware/authMiddleware");

// ADMIN ONLY - GAME OVERVIEW
router.get("/", verifyAdmin, getGameOverview);

module.exports = router;
