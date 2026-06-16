const express = require("express");

const {
  createResult,
  getResults,
  getAnalytics,
} = require(
  "../controllers/resultController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.get(
  "/analytics",
  protect,
  getAnalytics
);

router.get(
  "/",
  protect,
  getResults
);

router.post(
  "/",
  protect,
  createResult
);

module.exports = router;