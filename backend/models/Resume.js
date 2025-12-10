const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personalInfo: {
    name: String,
    email: String,
    phone: String,
    address: String,
    summary: String
  },
  skills: [String],
  experience: [{
    company: String,
    position: String,
    duration: String,
    description: String
  }],
  education: [{
    institution: String,
    degree: String,
    year: String
  }],
  template: { type: String, default: 'modern' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Resume", resumeSchema);
