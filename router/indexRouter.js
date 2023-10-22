
const express = require("express");
const router = express.Router();

const porkemonRoutes = require("./pkm")
const usersRoutes = require("./user")

router.use("/user", usersRoutes)
router.use("/pkm", pokemonRoutes);

module.exports = router;