const express =
  require("express");

const {
  createSubmission,
  getMySubmissions,
} = require(
  "../controllers/submissionController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const router =
  express.Router();

router.post(
  "/",
  protect,
  createSubmission
);

router.get(
  "/my",
  protect,
  getMySubmissions
);

module.exports =
  router;