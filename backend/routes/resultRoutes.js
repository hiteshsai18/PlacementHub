const express = require("express");

const {
  createResult,
  getResults,
} = require(
  "../controllers/resultController"
);

const router = express.Router();

router.post(
  "/",
  createResult
);

router.get(
  "/",
  getResults
);

module.exports = router;