const express = require("express");
const { Team, Player } = require("../models");

const router = express.Router();

// Create a new team
router.post("/", async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: "Error creating team" });
  }
});

// Get all teams
router.get("/", async (req, res) => {
  try {
    const teams = await Team.findAll({
      include: [
        { model: Player, as: "Captain", attributes: ["Name"] } // Include captain's name
      ]
    });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: "Error fetching teams" });
  }
});

// Update a team
router.put("/:id", async (req, res) => {
  try {
    const updated = await Team.update(req.body, { where: { TeamID: req.params.id } });
    res.json({ message: "Team updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating team" });
  }
});

// Delete a team
router.delete("/:id", async (req, res) => {
  try {
    await Team.destroy({ where: { TeamID: req.params.id } });
    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error); // Log the error
    res.status(500).json({ error: "Error deleting team" });
  }
});

module.exports = router;