const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

const router = express.Router();

// Login with username and password
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Received login request:", { username, password });

    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ error: "Invalid username or password" });
    }

    if (user.password !== password) {
      console.log("Password mismatch");
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Generate JWT with userID and role
    const token = jwt.sign({ userID: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("Login successful:", { userID: user.id, role: user.role });
    res.status(200).json({ message: `Logged in as ${user.role}`, token, role: user.role });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;