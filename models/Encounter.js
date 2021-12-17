const mongoose = require("mongoose");

const EncounterSchema = new mongoose.Schema(
  {
    date: {
        type: Date,
        required: [true, "Please add a date"],
      },
    time: {
      type: String,
      required: [true, "Please add a time"],
    },
   
    visits: {
      type: String,
      required: [true, "Please add Number of visits"],
      enum: ["firstTime", "repeat"]
    },
    diagnosis: {
      type: String,
      required: [true, "Please add Diagnosis"],
      enum: ["hypertension", "pneumonia","malaria", "diabetes"]
    },
    
    weight: {
      type: String,
      required: [true, "Please add weight"],
    },
    height: {
      type: String,
      required: [true, "Please add height"],
    },
    bmi: {
      type: String,
      required: [true, "Please add BMI"],
    },
   
    bloodPressure: {
      type: String,
      required: [true, "Please add Blood pressure"]
    },
    temperature: {
      type: String,
      required: [true, "Please add Temperature"]
    },
    respiratoryRate: {
      type: String,
      required: [true, "Please add Respiratory Rate"]
    },
    complaints: {
      type: String,
      required: [true, "Please add complaints"]
    },
    treatmentPlan: {
      type: String,
      required: [true, "Please add Treatment Plan"]
    },
   
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "Doctor",
      required: true
    }
  },
 
);



module.exports = mongoose.model("Encounter", EncounterSchema);
