const express = require("express");

const {
  body,
} = require(
  "express-validator"
);

const validate =
  require(
    "../middleware/validationMiddleware"
  );

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} = require(
  "../controllers/authController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.post(
  "/register",
  [
    body("name")
      .notEmpty()
      .withMessage(
        "Name is required"
      ),

    body("email")
      .isEmail()
      .withMessage(
        "Valid email required"
      ),

    body("password")
      .isLength({
        min: 6,
      })
      .withMessage(
        "Password must be at least 6 characters"
      ),

    validate,
  ],
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.get(
  "/profile",
  protect,
  getProfile
);

router.put(
  "/profile",
  protect,
  updateProfile
);

module.exports = router;