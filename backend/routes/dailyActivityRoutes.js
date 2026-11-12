
const express = require("express");

const router = express.Router();

const {
    getDailyActivity
} = require("../controllers/dailyActivityController");

const verifyAdmin = require("../middleware/authMiddleware");

// ADMIN ONLY
router.get("/", verifyAdmin, getDailyActivity);

module.exports = router;
