const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"]
  },
  surname: {
    type: String,
    required: [true, "Please add a surname"]
  },
  age: {
    type: String,
    required: [true, "Please add age"]
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
  ward: {
    type: String,
    required: [true, "Please add ward"],
  },
  lga: {
    type: String,
    required: [true, "Please add LGA"],
  },
  state: {
    type: String,
    required: [true, "Please add state"],
  },
  gender: {
    type: String,
    required: [true, "Please add gender type"],
    enum: ["male", "female","other"]
  },
  role: {
    type: String,
    enum: ["doctor", "patient","admin"],
    default: "patient"
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false
  },
  image: {
    type: String,
    required: [true, "Please add a Photo"],
    
  },
  createdBy: {
    type: String,
    required: [true, "Please add who created this"],
    
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password using bcrypt
PatientSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
PatientSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Match user entered password to hashed password in database

PatientSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};



module.exports = mongoose.model("Patient", PatientSchema);
