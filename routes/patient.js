const express = require("express");
const Patient = require("../models/Patient");
const advancedResults = require('../middleware/advancedResultMiddleware')
const router = express.Router();
const {
 
  login,
  logout,
  register,
  getMe,
  getPatients

} = require("../controller/patient");
const { protect, authorize } = require("../middleware/authMiddleware");


router.get("/",protect(), authorize("doctor", "admin"),advancedResults(Patient), getPatients);
router.post("/register",protect(), authorize("doctor", "admin"), register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/me", protect(), authorize("patient", "admin"), getMe);
  
module.exports = router;
