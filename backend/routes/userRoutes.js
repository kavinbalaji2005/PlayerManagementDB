const express = require("express");
const router = express.Router();
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");
const { User } = require("../models");

// Create a user (Admin only)
router.post("/", authenticateUser, authorizeRole("Admin"), async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all users (Admin only)
router.get("/", authenticateUser, authorizeRole("Admin"), async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single user (Admins can access all, others can only access themselves)
router.get("/:id", authenticateUser, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        if (req.user.role !== "Admin" && req.user.id !== user.id) {
            return res.status(403).json({ error: "Access denied" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a user (Admin only)
router.put("/:id", authenticateUser, authorizeRole("Admin"), async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        await user.update(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a user (Admin only)
router.delete("/:id", authenticateUser, authorizeRole("Admin"), async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
