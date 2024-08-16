const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const authmiddleware = require("../middleware/AuthMiddleware")

router.post("/user",UserController.adduser);
router.get("/user",authmiddleware.validateuser,UserController.getAlluser)
router.post("/login",UserController.loginuser)

module.exports = router;