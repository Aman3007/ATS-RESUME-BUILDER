function generateResumeHTML(personalInfo, skills, experience, education, template) {
  const templates = {
    modern: generateModernTemplate,
    classic: generateClassicTemplate,
    minimal: generateMinimalTemplate
  };

  const generator = templates[template] || templates.modern;
  return generator(personalInfo, skills, experience, education);
}

// ================= MODERN =================
function generateModernTemplate(info, skills, exp, edu) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Arial', sans-serif; color: #333; line-height: 1.6; }
.container { max-width: 800px; margin: 0 auto; padding: 40px; }
.header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; border-radius: 10px; margin-bottom: 30px; }
.header h1 { font-size: 36px; margin-bottom: 10px; }
.header p { font-size: 14px; opacity: 0.9; }
.section { margin-bottom: 30px; }
.section-title { font-size: 22px; color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 5px; margin-bottom: 15px; }
.summary { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
.skills { display: flex; flex-wrap: wrap; gap: 10px; }
.skill { background: #667eea; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; }
.exp-item, .edu-item { margin-bottom: 20px; padding-left: 20px; border-left: 3px solid #667eea; }
.exp-item h3, .edu-item h3 { color: #333; margin-bottom: 5px; }
.exp-item .meta, .edu-item .meta { color: #666; font-size: 14px; margin-bottom: 8px; }
.exp-item p { color: #555; }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>${info.name}</h1>
    <p>${info.email} | ${info.phone} | ${info.address}</p>
  </div>

  ${info.summary ? `
  <div class="summary">
    <p>${info.summary}</p>
  </div>` : ""}

  ${skills.filter(s => s).length > 0 ? `
  <div class="section">
    <h2 class="section-title">Skills</h2>
    <div class="skills">
      ${skills.filter(s => s).map(skill => `<span class="skill">${skill}</span>`).join("")}
    </div>
  </div>` : ""}

  ${exp.filter(e => e.company).length > 0 ? `
  <div class="section">
    <h2 class="section-title">Experience</h2>
    ${exp.filter(e => e.company).map(e => `
      <div class="exp-item">
        <h3>${e.position}</h3>
        <div class="meta">${e.company} | ${e.duration}</div>
        <p>${e.description}</p>
      </div>`).join("")}
  </div>` : ""}

  ${edu.filter(e => e.institution).length > 0 ? `
  <div class="section">
    <h2 class="section-title">Education</h2>
    ${edu.filter(e => e.institution).map(e => `
      <div class="edu-item">
        <h3>${e.degree}</h3>
        <div class="meta">${e.institution} | ${e.year}</div>
      </div>`).join("")}
  </div>` : ""}

</div>
</body>
</html>`;
}

// ================= CLASSIC =================
function generateClassicTemplate(info, skills, exp, edu) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Times New Roman', serif; color: #000; line-height: 1.8; }
.container { max-width: 800px; margin: 0 auto; padding: 40px; }
.header { text-align: center; border-bottom: 3px double #000; padding-bottom: 20px; margin-bottom: 30px; }
.header h1 { font-size: 32px; margin-bottom: 10px; letter-spacing: 2px; }
.header p { font-size: 14px; }
.section { margin-bottom: 25px; }
.section-title { font-size: 18px; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 5px; margin-bottom: 15px; letter-spacing: 1px; }
.summary { text-align: justify; margin-bottom: 20px; }
.skills { list-style: none; columns: 2; }
.skills li { margin-bottom: 5px; }
.skills li:before { content: "• "; font-weight: bold; }
.exp-item, .edu-item { margin-bottom: 18px; }
.exp-item h3, .edu-item h3 { font-size: 16px; margin-bottom: 3px; }
.exp-item .meta, .edu-item .meta { font-style: italic; font-size: 14px; margin-bottom: 5px; }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>${info.name}</h1>
    <p>${info.email} | ${info.phone}</p>
    <p>${info.address}</p>
  </div>

  ${info.summary ? `
  <div class="section">
    <h2 class="section-title">Professional Summary</h2>
    <p class="summary">${info.summary}</p>
  </div>` : ""}

  ${skills.filter(s => s).length > 0 ? `
  <div class="section">
    <h2 class="section-title">Skills</h2>
    <ul class="skills">
      ${skills.filter(s => s).map(skill => `<li>${skill}</li>`).join("")}
    </ul>
  </div>` : ""}

  ${exp.filter(e => e.company).length > 0 ? `
  <div class="section">
    <h2 class="section-title">Professional Experience</h2>
    ${exp.filter(e => e.company).map(e => `
      <div class="exp-item">
        <h3>${e.position}</h3>
        <div class="meta">${e.company}, ${e.duration}</div>
        <p>${e.description}</p>
      </div>`).join("")}
  </div>` : ""}

  ${edu.filter(e => e.institution).length > 0 ? `
  <div class="section">
    <h2 class="section-title">Education</h2>
    ${edu.filter(e => e.institution).map(e => `
      <div class="edu-item">
        <h3>${e.degree}</h3>
        <div class="meta">${e.institution}, ${e.year}</div>
      </div>`).join("")}
  </div>` : ""}

</div>
</body>
</html>`;
}

// ================= MINIMAL =================
function generateMinimalTemplate(info, skills, exp, edu) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Helvetica', 'Arial', sans-serif; color: #2c3e50; line-height: 1.7; }
.container { max-width: 800px; margin: 0 auto; padding: 40px; }
.header { margin-bottom: 40px; }
.header h1 { font-size: 38px; font-weight: 300; margin-bottom: 8px; }
.header p { color: #7f8c8d; font-size: 14px; }
.section { margin-bottom: 35px; }
.section-title { font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: #34495e; margin-bottom: 15px; }
.summary { color: #555; margin-bottom: 20px; }
.skills { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.skill { color: #555; font-size: 14px; }
.exp-item, .edu-item { margin-bottom: 20px; }
.exp-item h3, .edu-item h3 { font-size: 16px; font-weight: 500; margin-bottom: 3px; }
.exp-item .meta, .edu-item .meta { color: #7f8c8d; font-size: 13px; margin-bottom: 8px; }
.exp-item p { color: #555; font-size: 14px; }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>${info.name}</h1>
    <p>${info.email} • ${info.phone} • ${info.address}</p>
  </div>

  ${info.summary ? `
  <div class="section">
    <h2 class="section-title">About</h2>
    <p class="summary">${info.summary}</p>
  </div>` : ""}

  ${skills.filter(s => s).length > 0 ? `
  <div class="section">
    <h2 class="section-title">Skills</h2>
    <div class="skills">
      ${skills.filter(s => s).map(skill => `<div class="skill">${skill}</div>`).join("")}
    </div>
  </div>` : ""}

  ${exp.filter(e => e.company).length > 0 ? `
  <div class="section">
    <h2 class="section-title">Experience</h2>
    ${exp.filter(e => e.company).map(e => `
      <div class="exp-item">
        <h3>${e.position}</h3>
        <div class="meta">${e.company} • ${e.duration}</div>
        <p>${e.description}</p>
      </div>`).join("")}
  </div>` : ""}

  ${edu.filter(e => e.institution).length > 0 ? `
  <div class="section">
    <h2 class="section-title">Education</h2>
    ${edu.filter(e => e.institution).map(e => `
      <div class="edu-item">
        <h3>${e.degree}</h3>
        <div class="meta">${e.institution} • ${e.year}</div>
      </div>`).join("")}
  </div>` : ""}

</div>
</body>
</html>`;
}


module.exports = {
  generateResumeHTML
};
