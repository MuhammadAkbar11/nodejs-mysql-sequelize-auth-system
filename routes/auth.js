const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");
const signupSchema = require("../middleware/schema/signupSchema");
const loginSchema = require("../middleware/schema/loginShema");
const checkIsLogin = require("../middleware/checkIsLogin");

router.get("/signup", [checkIsLogin], authController.getSignup);
router.post("/signup", [signupSchema], authController.postSingUp);
router.get("/login", [checkIsLogin], authController.getLogin);
router.post("/login", [loginSchema], authController.postLogin);
router.post("/logout", authController.logout);

module.exports = router;
