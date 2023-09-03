const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { login, signup } = require("../controllers/user");
const { userdetail } = require("../controllers/userdetail");
const authMiddleware = require("../authMiddleware");

router.post("/login", login);
router.post("/signup", signup);
router.get("/userdetails", authMiddleware, userdetail);

module.exports = router;
