const express = require("express");
const router = express.Router();
// midle ware
const userController = require('../controllers/user.controller');
//const verifyToken = require("../middleware/verifyToken");


router.route("/signup")
.post(userController.signup);
// router.get("/signup/confirmation/:token", userController.confirmEmail);

router.post("/login", userController.login);

// router.get("/me", verifyToken, userController.getMe);


module.exports = router;