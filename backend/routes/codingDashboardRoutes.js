const express =
  require("express");

const {
  getCodingStats,
} = require(
  "../controllers/codingDashboardController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const router =
  express.Router();

router.get(
  "/",
  protect,
  getCodingStats
);

module.exports =
  router;