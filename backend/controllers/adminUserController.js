const User = require("../models/User");

// GET ALL USERS
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE ROLE
const updateRole = async (req, res) => {
  try {
    const user =
      await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.role = req.body.role;

    await user.save();

    res.json({
      message: "Role Updated",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const user =
      await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.json({
      message: "User Deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
  updateRole,
  deleteUser,
};