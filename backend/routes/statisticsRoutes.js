
const express = require("express");

const router = express.Router();

const {
    getStatistics
} = require("../controllers/statisticsController");

// GET PLAYER STATISTICS
router.get("/:playerId", getStatistics);

module.exports = router;
