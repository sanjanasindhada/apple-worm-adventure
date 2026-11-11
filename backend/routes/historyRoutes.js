
const express = require("express");
const router = express.Router();

const {
    getPlayerHistory
} = require("../controllers/historyController");

router.get("/:playerId", getPlayerHistory);

module.exports = router;
