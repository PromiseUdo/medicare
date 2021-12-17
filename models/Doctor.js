const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const DoctorSchema = new mongoose.Schema({
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
  cadre: {
    type: String,
    required: [true, "Please add cadre"]
  },
  department: {
    type: String,
    required: [true, "Please add department"]
  },
  gender: {
    type: String,
    required: [true, "Please add gender type"],
    enum: ["male", "female","other"]
  },
  role: {
    type: String,
    enum: ["doctor", "patient","admin"],
    default: "doctor"
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false
  },
  encounters: [{ type: mongoose.Schema.ObjectId, ref: 'Encounter' }],
  receivedEncounters: [{ type: mongoose.Schema.ObjectId, ref: 'Encounter' }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password using bcrypt
DoctorSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
DoctorSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Match user entered password to hashed password in database

DoctorSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};



module.exports = mongoose.model("Doctor", DoctorSchema);
