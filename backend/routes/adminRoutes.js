const express = require("express");

const {
  getDashboard,
} = require("../controllers/adminController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  admin,
} = require("../middleware/adminMiddleware");

const router =
  express.Router();

router.get(
  "/dashboard",
  protect,
  admin,
  getDashboard
);

module.exports =
  router;