const express = require("express");

const {
  getExperiences,
  createExperience,
} = require(
  "../controllers/experienceController"
);

const router = express.Router();

router.get(
  "/",
  getExperiences
);

router.post(
  "/",
  createExperience
);

module.exports = router;