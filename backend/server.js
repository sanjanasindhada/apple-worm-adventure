
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
console.log("ADMIN KEY LOADED:", !!process.env.ADMIN_API_KEY);
const connectDB = require("./config/db");

// Import Routes
const gameOverviewRoutes = require("./routes/gameOverviewRoutes");
const levelStatisticsRoutes = require("./routes/levelStatisticsRoutes");
const dailyActivityRoutes = require("./routes/dailyActivityRoutes");
const exportRoutes = require("./routes/exportRoutes");

const playerRoutes = require("./routes/playerRoutes");
const progressRoutes = require("./routes/progressRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const statisticsRoutes = require("./routes/statisticsRoutes");
const historyRoutes = require("./routes/historyRoutes");

// Import Error Middleware
const {
    notFound,
    errorHandler
} = require("./middleware/errorMiddleware");

const app = express();

// CORS Configuration
const allowedOrigins = [
    "http://localhost:3000",
    "https://apple-worm-adventure-frontend.vercel.app"
];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-admin-key"]
}));

app.options("*", cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-admin-key"]
}));

app.use(express.json({ limit: "10kb" }));

app.use(express.urlencoded({ extended: true }));
// Connect MongoDB before handling requests
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
});
// Home Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Apple Worm Adventure Backend is Running!"
    });
});

// Health Check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        server: "Running",
        database: mongoose.connection.readyState === 1
            ? "Connected"
            : "Disconnected",
        timestamp: new Date()
    });
});

// API Routes
app.use("/api/players", playerRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/statistics", statisticsRoutes);
app.use("/api/overview", gameOverviewRoutes);
app.use("/api/level-statistics", levelStatisticsRoutes);
app.use("/api/daily-activity", dailyActivityRoutes);
app.use("/api/export", exportRoutes);
app.use("/api/history", historyRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);
module.exports = app;

// app.listen(process.env.PORT || 5000, () => {
//     console.log("Server running on port " + (process.env.PORT || 5000));
// });