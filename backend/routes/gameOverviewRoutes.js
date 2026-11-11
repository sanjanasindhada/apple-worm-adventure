
const express = require("express");

const router = express.Router();

const {
    getGameOverview
} = require("../controllers/gameOverviewController");

const adminAuth = require("../middleware/adminAuth");

// ADMIN ONLY - GAME OVERVIEW
router.get("/", adminAuth, getGameOverview);

module.exports = router;
