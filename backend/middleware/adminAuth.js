
const adminAuth = (req, res, next) => {
    const adminKey = req.headers["x-admin-key"];

    if (!process.env.ADMIN_API_KEY) {
        return res.status(500).json({
            success: false,
            message: "Admin API key is not configured"
        });
    }

    if (adminKey !== process.env.ADMIN_API_KEY) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid admin key"
        });
    }

    next();
};

module.exports = adminAuth;
