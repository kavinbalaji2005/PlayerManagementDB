const express = require("express");
const { Achievements } = require("../models");

const router = express.Router();

// Add an achievement (Admin only)
router.post("/", async (req, res) => {
    try {
        const achievement = await Achievements.create(req.body);
        res.status(201).json(achievement);
    } catch (error) {
        res.status(500).json({ error: "Error adding achievement" });
    }
});

// Get all achievements (Everyone)
router.get("/", async (req, res) => {
    try {
        const achievements = await Achievements.findAll();
        res.json(achievements);
    } catch (error) {
        res.status(500).json({ error: "Error fetching achievements" });
    }
});

module.exports = router;