
const Resume = require("../models/Resume");

// Get all resumes
const getResumes = async (req, res) => {
  try {
    const resumes = await Resume
      .find({ userId: req.userId })
      .sort({ updatedAt: -1 });

    res.json(resumes);
  } catch (err) {
    console.error("Get resumes error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create resume
const createResume = async (req, res) => {
  try {
    const resume = new Resume({
      userId: req.userId,
      ...req.body
    });

    await resume.save();
    res.status(201).json(resume);
  } catch (err) {
    console.error("Create resume error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update resume
const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    Object.assign(resume, req.body);
    resume.updatedAt = Date.now();

    await resume.save();
    res.json(resume);
  } catch (err) {
    console.error("Update resume error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete resume
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json({ message: "Resume deleted" });
  } catch (err) {
    console.error("Delete resume error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getResumes,
  createResume,
  updateResume,
  deleteResume
};
