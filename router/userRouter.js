const express = require("express");
const verifyToken = require("../middlewares/auth.middleware");
const usersController = require("../controllers/users");

const router = express.Router();

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.post("/logout", verifyToken, usersController.logout);

module.exports = router;