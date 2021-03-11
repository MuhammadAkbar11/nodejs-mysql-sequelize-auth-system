const express = require("express");

const router = express.Router();

const pageController = require("../controllers/pages");
const isAuth = require("../middleware/isAuth");

router.get("/", pageController.getIndex);
router.get("/dashboard", isAuth, pageController.getDashboard);

module.exports = router;
