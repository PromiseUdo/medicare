const express = require("express");
const Encounter = require("../models/Encounter");
const advancedResults = require('../middleware/advancedResultMiddleware')

const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");
const { getEncounters,createEncounter, sendEncounter } = require("../controller/encounter");

router.use(protect("doctor"));
router.use(authorize("doctor"));


router
  .route("/")
  .get(advancedResults(Encounter),getEncounters)
  .post(createEncounter)

router
  .route("/send")
  .post(sendEncounter)
  
module.exports = router;
