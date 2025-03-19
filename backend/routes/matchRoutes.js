const express = require("express");
const { Match } = require("../models");

const router = express.Router();

// Create a match
router.post("/", async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ error: "Error creating match" });
  }
});

// Get all matches
router.get("/", async (req, res) => {
  try {
    const matches = await Match.findAll();
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: "Error fetching matches" });
  }
});

// Update a match
router.put("/:id", async (req, res) => {
  try {
    const updated = await Match.update(req.body, { where: { MatchID: req.params.id } });
    res.json({ message: "Match updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating match" });
  }
});

// Delete a match
router.delete("/:id", async (req, res) => {
  try {
    await Match.destroy({ where: { MatchID: req.params.id } });
    res.json({ message: "Match deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting match" });
  }
});

module.exports = router;