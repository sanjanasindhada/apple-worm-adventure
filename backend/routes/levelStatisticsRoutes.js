
const express = require("express");

const router = express.Router();

const {
    getLevelStatistics
} = require("../controllers/levelStatisticsController");

const verifyAdmin = require("../middleware/authMiddleware");

// ADMIN ONLY
router.get("/", verifyAdmin, getLevelStatistics);

module.exports = router;
