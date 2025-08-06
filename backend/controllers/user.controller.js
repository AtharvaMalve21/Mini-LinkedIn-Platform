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

    //find user posts
    const posts = await Post.find({ author: userId }).populate("author");

    return res.status(200).json({
      success: true,
      data: {
        profile: user,
        posts: posts,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateBio = async (req, res) => {
  try {
    
    const userId = req.user._id;
    const { bio } = req.body;

    if (!bio || bio.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Bio cannot be empty.",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { bio },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      success: true,
      data: updatedUser,
      message: "Bio updated successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update bio. Please try again.",
    });
  }
};
