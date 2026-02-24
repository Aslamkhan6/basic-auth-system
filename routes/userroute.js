const express = require("express")
const home = require("../controller/authcontroller");
const register = require("../controller/registercontroller")
const router = express.Router();
const login = require("../controller/logincontroller")

const authmiddlewars = require("../middlewars/authmiddlewars");
const allowRoles = require("../middlewars/rolemiddlewars");
const profile = require("../controller/profilecontroller")
const upload = require("../middlewars/upload");
const updateProfile= require("../controller/updatecontroller")



router.route("/").get(home)
router.route("/register").post(upload.single("profileImage"),register)
router.route("/login").post(login)
router.route("/profile").get(authmiddlewars,profile)
router.route("/updateprofile").put(authmiddlewars,upload.single("profileImage"),updateProfile)
router.post(
  "/admin-only",
authmiddlewars,
  allowRoles("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin!" });
  }
);

module.exports  = router