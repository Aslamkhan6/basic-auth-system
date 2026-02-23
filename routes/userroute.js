const express = require("express")
const home = require("../controller/authcontroller");
const register = require("../controller/registercontroller")
const router = express.Router();
const login = require("../controller/logincontroller")
const rolemiddlewars = require("../middlewars/rolemiddlewars")
const authmiddlewars = require("../middlewars/authmiddlewars")
const profile = require("../controller/profilecontroller")

router.route("/").get(home)
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/profile").get(authmiddlewars,profile)
router.post(
  "/admin-only",
authmiddlewars,
  allowRoles("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin!" });
  }
);

module.exports  = router