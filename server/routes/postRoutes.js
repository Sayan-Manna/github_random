const express = require("express");
const router = express.Router();
const { Post, User } = require("../models");

// Create post
router.post("/", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all posts with user info
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [User],
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
