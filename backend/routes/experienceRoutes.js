const express = require("express");

const {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
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

router.put(
  "/:id",
  protect,
  updateExperience
);

router.delete(
  "/:id",
  protect,
  deleteExperience
);

module.exports = router;