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
const createorder = require("../controller/createorder")
const myorder = require("../controller/myorder")
const allorder = require("../controller/getallorder")
const updateorderstatus = require("../controller/updateorderstatus")
const createbanner = require("../controller/createbannercontroller")
const getactivebanner = require("../controller/getactivebannercontroller")

router.route("/").get(home)
router.route("/banner").get(getactivebanner)
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

router.route("/deleteproduct/:id").delete(
  authmiddlewars,
  allowRoles("admin"),
  deleteproduct
);
router.route("/addtocart").post(
  authmiddlewars,addtocart);
router.route("/removecartitem/:productId").delete(
  authmiddlewars,removefromcart);
router.route("/getcart").get(
  authmiddlewars,getcart);

  router.route("/createorder").post(
    authmiddlewars,createorder
  )

  router.route("/myorder").get(
    authmiddlewars,myorder
  )

  router.route("/allorder").get(
    authmiddlewars,allowRoles("admin"),allorder
  )

  router.route("/updateorderstatus/:id").put(
    authmiddlewars,allowRoles("admin"),updateorderstatus
  )

  router.route("/banner").post(
    authmiddlewars,
    allowRoles("admin"),
    upload.single("bannerImage"),
    createbanner
  )



module.exports  = router
