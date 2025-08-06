const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  getUserPosts,
  updateProfile,
} = require("../controllers/user.controller.js");

const { isAuthenticated } = require("../middleware/auth.middleware.js");

router.get("/profile", isAuthenticated, getUserProfile);
router.get("/posts", isAuthenticated, getUserPosts);
router.put("/update-profile", isAuthenticated, updateProfile);

module.exports = router;
