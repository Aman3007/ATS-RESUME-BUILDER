// backend/controllers/pdfController.js
const puppeteer = require("puppeteer");
const { generateResumeHTML } = require("../utils/pdfTemplates");


const generatePDF = async (req, res) => {
  try {
    const {
      personalInfo,
      skills,
      experience,
      education,
      template
    } = req.body;

    const html = generateResumeHTML(
      personalInfo,
      skills,
      experience,
      education,
      template
    );

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" }
    });

    await browser.close();

    res.contentType("application/pdf");
    res.send(pdf);
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ message: "Error generating PDF" });
  }
};

module.exports = { generatePDF };
