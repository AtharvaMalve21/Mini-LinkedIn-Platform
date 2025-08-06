const Post = require("../models/post.model");
const User = require("../models/user.model");

exports.createPost = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No User found.",
      });
    }

    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Post content is required.",
      });
    }

    const newPost = await Post.create({
      content,
      author: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: newPost,
      message: "Post created successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create post. Try again later.",
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author");

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts.",
    });
  }
};
