// backend/routes/resumeRoutes.js

const express = require("express");
const router = express.Router();

const {
  getResumes,
  createResume,
  updateResume,
  deleteResume
} = require("../controllers/resumeController");

const { generatePDF } = require("../controllers/pdfController");
const { protect } = require("../middleware/authMiddleware");


router.get("/", protect, getResumes);


router.post("/", protect, createResume);


router.put("/:id", protect, updateResume);


router.delete("/:id", protect, deleteResume);

router.post("/generate-pdf", protect, generatePDF);

module.exports = router;
