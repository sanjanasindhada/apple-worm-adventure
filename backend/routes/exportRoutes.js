
const express = require("express");

const router = express.Router();

const {
    exportPlayersData
} = require("../controllers/exportController");

const verifyAdmin = require("../middleware/authMiddleware");

// EXPORT ALL PLAYERS DATA (ADMIN ONLY)
router.get("/players", verifyAdmin, exportPlayersData);

module.exports = router;
