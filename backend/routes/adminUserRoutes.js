const express = require("express");

const {
  getUsers,
  updateRole,
  deleteUser,
} = require("../controllers/adminUserController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  admin,
} = require("../middleware/adminMiddleware");

const router = express.Router();

router.get(
  "/",
  protect,
  admin,
  getUsers
);

router.put(
  "/:id",
  protect,
  admin,
  updateRole
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteUser
);

module.exports = router;