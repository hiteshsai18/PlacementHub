const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } =
      req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message:
          "Please fill all fields",
      });
    }

    const userExists =
      await User.findOne({
        email,
      });

    if (userExists) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
        role: "student",
      });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token:
        generateToken(
          user._id
        ),
    });

  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const user =
      await User.findOne({
        email,
      });

    if (
      user &&
      (await bcrypt.compare(
        password,
        user.password
      ))
    ) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token:
          generateToken(
            user._id
          ),
      });
    }

    res.status(401).json({
      message:
        "Invalid credentials",
    });

  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

// GET PROFILE
const getProfile = async (
  req,
  res
) => {
  try {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      createdAt:
        req.user.createdAt,
    });

  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

// UPDATE PROFILE
const updateProfile = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.user._id
      );

    if (!user) {
      return res.status(404).json({
        message:
          "User not found",
      });
    }

    user.name =
      req.body.name ||
      user.name;

    if (req.body.password) {
      const salt =
        await bcrypt.genSalt(
          10
        );

      user.password =
        await bcrypt.hash(
          req.body.password,
          salt
        );
    }

    const updatedUser =
      await user.save();

    res.json({
      _id:
        updatedUser._id,
      name:
        updatedUser.name,
      email:
        updatedUser.email,
      role:
        updatedUser.role,
      token:
        generateToken(
          updatedUser._id
        ),
    });

  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
};