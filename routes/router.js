const express = require("express")
const home = require("../controller/authcontroller");
const register = require("../controller/registercontroller")
const router = express.Router();
const login = require("../controller/logincontroller")

router.route("/").get(home)
router.route("/register").post(register)
router.route("/login").post(login)

module.exports  = router