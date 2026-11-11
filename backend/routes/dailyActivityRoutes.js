
const express = require("express");

const router = express.Router();

const {
    getDailyActivity
} = require("../controllers/dailyActivityController");

const adminAuth = require("../middleware/adminAuth");

// ADMIN ONLY
router.get("/", adminAuth, getDailyActivity);

module.exports = router;
