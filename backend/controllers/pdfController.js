const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const { generateResumeHTML } = require("../utils/pdfTemplates");

const generatePDF = async (req, res) => {
  try {
    const { personalInfo, skills, experience, education, template } = req.body;

    const html = generateResumeHTML(
      personalInfo,
      skills,
      experience,
      education,
      template
    );

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless
    });

    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" }
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf"
    });

    return res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF GENERATION ERROR:", error);
    res.status(500).json({ message: "PDF generation failed on server" });
  }
};

module.exports = { generatePDF };
