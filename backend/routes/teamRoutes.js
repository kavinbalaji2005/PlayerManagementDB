const express = require("express");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");
const { Team } = require("../models");

const router = express.Router();

// Create a new team (Admin only)
router.post("/", authenticateUser, authorizeRole(["Admin"]), async (req, res) => {
    try {
        const team = await Team.create(req.body);
        res.status(201).json(team);
    } catch (error) {
        res.status(500).json({ error: "Error creating team" });
    }
});

// Get all teams (Everyone)
router.get("/", authenticateUser, async (req, res) => {
    try {
        const teams = await Team.findAll();
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: "Error fetching teams" });
    }
});

// Update team (Admin only)
router.put("/:id", authenticateUser, authorizeRole(["Admin"]), async (req, res) => {
    try {
        const updated = await Team.update(req.body, { where: { TeamID: req.params.id } });
        res.json({ message: "Team updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating team" });
    }
});

// Delete team (Admin only)
router.delete("/:id", authenticateUser, authorizeRole(["Admin"]), async (req, res) => {
    try {
        await Team.destroy({ where: { TeamID: req.params.id } });
        res.json({ message: "Team deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting team" });
    }
});

module.exports = router;
