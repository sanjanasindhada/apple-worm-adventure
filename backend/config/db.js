
const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
    if (isConnected && mongoose.connection.readyState === 1) {
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        isConnected = conn.connection.readyState === 1;

        console.log("MongoDB Connected:", conn.connection.host);

    } catch (error) {
        isConnected = false;
        console.error("MongoDB Error:", error.message);
        throw error;
    }
};

module.exports = connectDB;
