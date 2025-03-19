const express = require("express");
const { BattingPerformance, BowlingPerformance, FieldingPerformance } = require("../models");

const router = express.Router();

// Get all performance records
router.get("/", async (req, res) => {
  try {
    const batting = await BattingPerformance.findAll();
    const bowling = await BowlingPerformance.findAll();
    const fielding = await FieldingPerformance.findAll();
    res.json({ batting, bowling, fielding });
  } catch (error) {
    res.status(500).json({ error: "Error fetching performance data" });
  }
});

// Update performance
router.put("/:id", async (req, res) => {
  try {
    const { type } = req.body;
    let updated;

    if (type === "batting") {
      updated = await BattingPerformance.update(req.body, { where: { PlayerID: req.params.id } });
    } else if (type === "bowling") {
      updated = await BowlingPerformance.update(req.body, { where: { PlayerID: req.params.id } });
    } else if (type === "fielding") {
      updated = await FieldingPerformance.update(req.body, { where: { PlayerID: req.params.id } });
    } else {
      return res.status(400).json({ error: "Invalid performance type" });
    }

    res.json({ message: "Performance updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating performance" });
  }
});

module.exports = router;