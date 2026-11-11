
const express = require("express");

const router = express.Router();

const {
    getLevelStatistics
} = require("../controllers/levelStatisticsController");

const adminAuth = require("../middleware/adminAuth");

// ADMIN ONLY
router.get("/", adminAuth, getLevelStatistics);

module.exports = router;
