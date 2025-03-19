const express = require("express");
const { User } = require("../models");

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

    console.log("Login successful:", { userID: user.id, role: user.role });
    res.status(200).json({ message: `Logged in as ${user.role}`, role: user.role });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;