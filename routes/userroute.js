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
const product = require("../controller/productcontroller")
const getallproductcontroller = require("../controller/getallproductcontroller")
const getsingleproduct = require("../controller/getoneproduct")
const updateproduct = require("../controller/updateproduct")
const deleteproduct = require("../controller/deleteproductcontroller")
const  addtocart = require("../controller/addtocartcontroller")
const  removefromcart = require("../controller/removeitemcartcontroller")
const  getcart = require("../controller/getcartcontroller")


router.route("/").get(home)
router.route("/register").post(upload.single("profileImage"),register)
router.route("/login").post(login)
router.route("/profile").get(authmiddlewars,profile)
router.route("/product").post(authmiddlewars,allowRoles("admin"),upload.single("productImage"),product)
router.route("/updateprofile").put(authmiddlewars,upload.single("profileImage"),updateProfile)
router.route("/getproduct").get(getallproductcontroller)
router.route("/getsingleproduct/:id").get(getsingleproduct);
router.route("/updateproduct/:id").put(
 authmiddlewars,
  allowRoles("admin"),
  upload.single("productImage"),
  updateproduct
);

router.route("/deleteproduct").delete(
  authmiddlewars,
  allowRoles("admin"),
  deleteproduct
);
router.route("/addtocart").post(authmiddlewars,addtocart)
router.route("/removecartitem/:ProductId").delete(authmiddlewars,removefromcart)
router.route("/getcart").get(authmiddlewars,getcart)

// router.post(
//   "/admin-only",
// authmiddlewars,
//   allowRoles("admin"),
//   (req, res) => {
//     res.json({ message: "Welcome Admin!" });
//   }
// );

module.exports  = router