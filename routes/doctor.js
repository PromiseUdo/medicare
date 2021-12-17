const express = require("express");
const Doctor = require("../models/Doctor");
const advancedResults = require('../middleware/advancedResultMiddleware')
const router = express.Router();
const {
  register,
  login,
  getMe,
  getDoctors,
  logout
} = require("../controller/doctor");
const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/",protect(), authorize("doctor", "admin","patient"),advancedResults(Doctor), getDoctors);
router.get("/me", protect(), authorize("doctor", "admin"), getMe);
module.exports = router;
