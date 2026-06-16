const express = require("express");

const {
  getExperiences,
  createExperience,
} = require(
  "../controllers/experienceController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.get(
  "/",
  protect,
  getExperiences
);

router.post(
  "/",
  protect,
  createExperience
);

module.exports = router;