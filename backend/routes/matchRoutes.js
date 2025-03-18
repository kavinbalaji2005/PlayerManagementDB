const express = require("express");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");
const { Match } = require("../models");

const router = express.Router();

// Create a match (Admin only)
router.post("/", authenticateUser, authorizeRole(["Admin"]), async (req, res) => {
    try {
        const match = await Match.create(req.body);
        res.status(201).json(match);
    } catch (error) {
        res.status(500).json({ error: "Error creating match" });
    }
});

// Get all matches (Everyone)
router.get("/", authenticateUser, async (req, res) => {
    try {
        const matches = await Match.findAll();
        res.json(matches);
    } catch (error) {
        res.status(500).json({ error: "Error fetching matches" });
    }
});

module.exports = router;
