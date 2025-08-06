const express = require("express");
const router = express.Router();

const { createPost, getAllPosts } = require("../controllers/post.controller");
const { isAuthenticated } = require("../middleware/auth.middleware");

router.post("/", isAuthenticated, createPost);
router.get("/", getAllPosts);

module.exports = router;
