
const mongoose = require("mongoose");

let connectionPromise = null;

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (connectionPromise) {
        return connectionPromise;
    }

    connectionPromise = mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000
    });

    try {
        await connectionPromise;
        console.log("MongoDB Connected:", mongoose.connection.host);
        return mongoose.connection;
    } catch (error) {
        console.error("MongoDB Error:", error.message);
        throw error;
    } finally {
        connectionPromise = null;
    }
};

module.exports = connectDB;
