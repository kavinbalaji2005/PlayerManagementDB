const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to check JWT token
const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data (ID & Role) to request
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token" });
    }
};

// Updated Role-based Access Middleware (Supports Multiple Roles)
const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Access denied. Insufficient permissions." });
        }
        next();
    };
};

module.exports = { authenticateUser, authorizeRole };
