const User = require("../models/user.model");
const Post = require("../models/post.model");

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No User found.",
      });
    }
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No User found.",
      });
    }

    const posts = await Post.find({ author: userId });

    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    const { name, email, bio } = req.body;

    user.name = name || user.name;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    await user.save();

    return res.status(200).json({
      success: true,
      data:user,
      message: "User profile updated.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
