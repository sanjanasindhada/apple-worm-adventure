
const express = require("express");

const router = express.Router();

const {
    exportPlayersData
} = require("../controllers/exportController");

const adminAuth = require("../middleware/adminAuth");

// EXPORT ALL PLAYERS DATA (ADMIN ONLY)
router.get("/players", adminAuth, exportPlayersData);

module.exports = router;
