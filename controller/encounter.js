const path = require("path");
const Encounter = require("../models/Encounter");
const Doctor = require("../models/Doctor");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncMiddleware");

// desc     get all Encounters
//route     get /api/v1/encounter
//access    public

exports.getEncounters = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});



// desc     post encounter
//route     post /api/v1/encounter
//access    private
exports.createEncounter = asyncHandler(async (req, res, next) => {
  req.body.createdBy = req.user.id;
  

  const encounter = await Encounter.create(req.body);
  // update the doctor model with an encounter Id
 const doctor = await Doctor.findByIdAndUpdate(req.user.id, {$push : {encounters: encounter._id}}, {
    new: true,
    runValidators: true
  });


  res.status(201).json({ success: true, data: encounter });
});

// desc     send encounter
//route     post /api/v1/encounter/send
//access    private
exports.sendEncounter = asyncHandler(async (req, res, next) => {
  req.body.createdBy = req.user.id;
  
// first create the encounter
  const encounter = await Encounter.create(req.body);

 
  // update the receiving doctor model with an encounter Id
 const doctor = await Doctor.findByIdAndUpdate(req.body.sendTo, {$push : {receivedEncounters: encounter._id}}, {
    new: true,
    runValidators: true
  });


  res.status(201).json({ success: true, data: encounter });
});



