const express = require("express");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");
const { Player } = require("../models");

const router = express.Router();

// Create a player (Admin, Coach)
router.post("/", authenticateUser, authorizeRole(["Admin", "Coach"]), async (req, res) => {
    try {
        const player = await Player.create(req.body);
        res.status(201).json(player);
    } catch (error) {
        res.status(500).json({ error: "Error creating player" });
    }
});

// Get all players (Everyone)
router.get("/", authenticateUser, async (req, res) => {
    try {
        const players = await Player.findAll();
        res.json(players);
    } catch (error) {
        res.status(500).json({ error: "Error fetching players" });
    }
});

// Update player (Admin, Coach)
router.put("/:id", authenticateUser, authorizeRole(["Admin", "Coach"]), async (req, res) => {
    try {
        const updated = await Player.update(req.body, { where: { PlayerID: req.params.id } });
        res.json({ message: "Player updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating player" });
    }
});

// Delete player (Admin only)
router.delete("/:id", authenticateUser, authorizeRole(["Admin"]), async (req, res) => {
    try {
        await Player.destroy({ where: { PlayerID: req.params.id } });
        res.json({ message: "Player deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting player" });
    }
});

module.exports = router;
