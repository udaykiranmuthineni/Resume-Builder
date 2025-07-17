// ======= Section Switcher =======
function showSection(id) {
  document.querySelectorAll('.panel').forEach(panel => {
    panel.classList.add('hidden');
  });
  document.getElementById(id).classList.remove('hidden');
}

// ======= Projects =======
let projectData = JSON.parse(localStorage.getItem("resumeProjects") || "[]");

function createProjectBlock(p = {}) {
  const container = document.createElement("div");
  container.className = "entry-block project-entry";
  container.style.position = "relative"; // Make sure the container is relative

  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-icon-btn";
  deleteBtn.title = "Delete";
  deleteBtn.innerHTML = "❌";
  deleteBtn.onclick = () => container.remove();
  container.appendChild(deleteBtn); // Add button directly to container

  // Create content div
  const content = document.createElement("div");
  content.innerHTML = `
    <div class="grid-3">
      <div class="form-group"><label>Project Title</label><input type="text" value="${p.title || ''}" /></div>
      <div class="form-group"><label>Tech Used</label><input type="text" value="${p.tech || ''}" /></div>
      <div class="form-group"><label>Project Link</label><input type="text" value="${p.link || ''}" /></div>
    </div>
    <div class="form-group">
      <label>Description</label>
      <textarea class="textarea">${p.desc || ''}</textarea>
    </div>
  `;
  container.appendChild(content); // Add content *after* button

  return container;
}

function addProject() {
  document.getElementById("projects-section").appendChild(createProjectBlock());
}

function saveProjects() {
  projectData = [];
  document.querySelectorAll(".project-entry").forEach(entry => {
    const inputs = entry.querySelectorAll("input");
    const textarea = entry.querySelector("textarea");
    if (inputs[0].value && textarea.value) {
      projectData.push({
        title: inputs[0].value,
        tech: inputs[1].value,
        link: inputs[2].value,
        desc: textarea.value
      });
    }
  });
  localStorage.setItem("resumeProjects", JSON.stringify(projectData));
}

function loadProjects() {
  const section = document.getElementById("projects-section");
  section.innerHTML = "";
  (projectData.length ? projectData : [{}]).forEach(p => {
    section.appendChild(createProjectBlock(p));
  });
}

// ======= Education =======
let educationData = [];

function createEducationBlock(e = {}) {
  const container = document.createElement("div");
  container.className = "entry-block edu-entry";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-icon-btn";
  deleteBtn.title = "Delete";
  deleteBtn.textContent = "❌";
  deleteBtn.onclick = () => container.remove();
  container.appendChild(deleteBtn);

  const content = document.createElement("div");
  content.innerHTML = `
    <div class="grid-3">
      <div class="form-group">
        <label>Education Type</label>
        <select>
  <option value="High School"${e.type === "High School" ? " selected" : ""}>High School</option>
  <option value="Intermediate"${e.type === "Intermediate" ? " selected" : ""}>Intermediate</option>
  <option value="Diploma"${e.type === "Diploma" ? " selected" : ""}>Diploma</option>
  <option value="B.Tech"${e.type === "B.Tech" ? " selected" : ""}>B.Tech</option>
  <option value="B.E"${e.type === "B.E" ? " selected" : ""}>B.E</option>
  <option value="B.Sc"${e.type === "B.Sc" ? " selected" : ""}>B.Sc</option>
  <option value="B.Com"${e.type === "B.Com" ? " selected" : ""}>B.Com</option>
  <option value="B.A"${e.type === "B.A" ? " selected" : ""}>B.A</option>
  <option value="Bachelor's"${e.type === "Bachelor's" ? " selected" : ""}>Other Bachelor's</option>
  <option value="M.Tech"${e.type === "M.Tech" ? " selected" : ""}>M.Tech</option>
  <option value="M.E"${e.type === "M.E" ? " selected" : ""}>M.E</option>
  <option value="M.Sc"${e.type === "M.Sc" ? " selected" : ""}>M.Sc</option>
  <option value="M.Com"${e.type === "M.Com" ? " selected" : ""}>M.Com</option>
  <option value="M.A"${e.type === "M.A" ? " selected" : ""}>M.A</option>
  <option value="Master's"${e.type === "Master's" ? " selected" : ""}>Other Master's</option>
  <option value="PhD"${e.type === "PhD" ? " selected" : ""}>Ph.D / Doctorate</option>
  <option value="Other"${e.type === "Other" ? " selected" : ""}>Other</option>
</select>

      </div>
      <div class="form-group">
        <label>School / College</label>
        <input type="text" placeholder="Enter name" value="${e.school || ''}" />
      </div>
      <div class="form-group">
        <label>Degree / Stream</label>
        <input type="text" placeholder="Enter degree" value="${e.degree || ''}" />
      </div>
    </div>
    <div class="grid-3">
      <div class="form-group">
        <label>Place / City</label>
        <input type="text" placeholder="Enter place" value="${e.place || ''}" />
      </div>
      <div class="form-group">
        <label>Year of Completion</label>
        <input type="text" placeholder="YYYY" value="${e.year || ''}" />
      </div>
      <div class="form-group">
        <label>GPA / Percentage</label>
        <input type="text" placeholder="Enter GPA/%" value="${e.gpa || ''}" />
      </div>
    </div>
  `;
  container.appendChild(content);
  return container;
}

function addEducation() {
  document.getElementById("edu-section").appendChild(createEducationBlock());
}

// ======= Experience =======
let experienceData = [];

function createExperienceBlock(e = {}) {
  const container = document.createElement("div");
  container.className = "entry-block experience-entry";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-icon-btn";
  deleteBtn.title = "Delete";
  deleteBtn.textContent = "❌";
  deleteBtn.onclick = () => container.remove();
  container.appendChild(deleteBtn);

  const content = document.createElement("div");
  content.innerHTML = `
    <div class="grid-3">
      <div class="form-group">
        <label>Company</label>
        <input type="text" placeholder="Company Name" value="${e.company || ''}" />
      </div>
      <div class="form-group">
        <label>Role / Position</label>
        <input type="text" placeholder="Job Title" value="${e.role || ''}" />
      </div>
      <div class="form-group">
        <label>Duration</label>
        <input type="text" placeholder="e.g. Jan 2022 – Present" value="${e.duration || ''}" />
      </div>
    </div>
    <div class="form-group">
      <label>Responsibilities / Description</label>
      <textarea class="textarea" placeholder="Describe your work...">${e.description || ''}</textarea>
    </div>
  `;
  container.appendChild(content);
  return container;
}

function addExperience() {
  document.getElementById("experience-section").appendChild(createExperienceBlock());
}

// ======= Resume Save & Load =======
function saveResume() {
  saveProjects();

  const resume = {
    name: document.getElementById("name").value,
    role: document.getElementById("role").value,
    location: document.getElementById("location").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    portfolio: document.getElementById("portfolio").value,
    linkedin: document.getElementById("linkedin").value,
    github: document.getElementById("github").value,
    twitter: document.getElementById("twitter").value,
    website: document.getElementById("website").value,
    skills: document.getElementById("skills").value.split(',').map(s => s.trim()),
    projects: projectData,
    education: [],
    experience: []
  };

  document.querySelectorAll(".edu-entry").forEach(entry => {
    const inputs = entry.querySelectorAll("input");
    const selects = entry.querySelectorAll("select");
    resume.education.push({
      type: selects[0].value,
      school: inputs[0].value,
      degree: inputs[1].value,
      place: inputs[2].value,
      year: inputs[3].value,
      gpa: inputs[4].value
    });
  });

  document.querySelectorAll(".experience-entry").forEach(entry => {
    const inputs = entry.querySelectorAll("input");
    const desc = entry.querySelector("textarea").value;
    resume.experience.push({
      company: inputs[0].value,
      role: inputs[1].value,
      duration: inputs[2].value,
      description: desc
    });
  });

  localStorage.setItem("resumeData", JSON.stringify(resume));
  showResume();
}

function showResume() {
  const r = JSON.parse(localStorage.getItem("resumeData") || "{}");
  if (!r.name) return;

  const output = `
Name: ${r.name}
Role: ${r.role}
Location: ${r.location}
Email: ${r.email}
Phone: ${r.phone}
Portfolio: ${r.portfolio}

Social:
LinkedIn: ${r.linkedin}
GitHub: ${r.github}
Twitter: ${r.twitter}
Website: ${r.website}

Skills: ${r.skills?.join(', ')}

Education:
${(r.education || []).map(e => `- ${e.degree} at ${e.school} (${e.year})`).join('\n')}

Projects:
${(r.projects || []).map(p => `- ${p.title} (${p.tech}): ${p.link || ''}`).join('\n')}

Experience:
${(r.experience || []).map(e => `- ${e.role} at ${e.company} (${e.duration})\n  ${e.description}`).join('\n')}
  `;

  document.getElementById("resume-output").textContent = output;
}

// =============Templates===============
function selectTemplate(templateName) {
  alert(`Template "${templateName}" selected! You can now edit it in the Resume section.`);
}

function downloadTemplate(templateName) {
  const user = JSON.parse(localStorage.getItem("resumeData") || "{}");

  fetch(`templates/${templateName}.html`)
    .then(res => res.text())
    .then(template => {
      const skills = Array.isArray(user.skills) ? user.skills.join(", ") : (user.skills || "");

      const educationHTML = (user.education || []).map(ed => `
        <div>
          <strong>${ed.degree}</strong><br/>
          ${ed.school} - ${ed.year}
        </div>
      `).join("");

      const experienceHTML = (user.experience || []).map(ex => `
        <div>
          <strong>${ex.role}</strong> at ${ex.company}<br/>
          <small>${ex.duration}</small><br/>
          ${ex.description}
        </div>
      `).join("");

      const projectsHTML = (user.projects || []).map(p => `
        <div>
          <strong>${p.title}</strong><br/>
          ${p.tech}<br/>
          <a href="${p.link}" target="_blank">${p.link}</a><br/>
          ${p.desc}
        </div>
      `).join("");

      const filledTemplate = template
        .replaceAll('{{name}}', data.name || '')
        .replaceAll('{{role}}', data.role || '')
        .replaceAll('{{location}}', data.location || '')
        .replaceAll('{{phone}}', data.phone || '')
        .replaceAll('{{email}}', data.email || '')
        .replaceAll('{{skills}}', data.skills || '')
        .replaceAll('{{portfolio}}', data.portfolio || '') // not socialLinks
        .replaceAll('{{experience}}', renderSection(data.experience))
        .replaceAll('{{education}}', renderSection(data.education))
        .replaceAll('{{projects}}', renderSection(data.projects));

      const temp = document.createElement("div");
      temp.innerHTML = filled;
      document.body.appendChild(temp);

      html2pdf()
        .set({
          margin: 0,
          filename: `${user.name || 'resume'}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff'
          },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .from(temp)
        .save()
        .then(() => temp.remove());
    })
    .catch(err => {
      console.error("Error loading template:", err);
      alert("Could not load template. Please check file name or console.");
    });
}

// ========== Resume Data (Dummy for Demo) ==========
const demoData = {
  name: "Jane London",
  role: "UI/UX Designer",
  email: "jane.london@example.com",
  phone: "+1 234 567 890",
  address: "123 Design Street, San Francisco, CA",
  summary: "Creative and detail-oriented UI/UX designer with 5+ years of experience in designing responsive web and mobile applications. Passionate about user-centered design.",
  skills: ["Figma", "Sketch", "Photoshop", "Adobe XD", "User Research", "Prototyping"],
  projects: [
    {
      title: "E-Commerce Redesign",
      description: "Led the UI redesign of a major e-commerce site, increasing conversions by 25%.",
      link: "https://example.com/project1"
    },
    {
      title: "Mobile Banking App",
      description: "Designed UX flows and wireframes for a mobile banking app used by over 1M users.",
      link: "https://example.com/project2"
    }
  ],
  education: [
    {
      degree: "B.A. in Graphic Design",
      institution: "University of California, Berkeley",
      year: "2017"
    }
  ],
  experience: [
    {
      position: "Senior UX Designer",
      company: "DesignHub Inc.",
      duration: "2021 - Present",
      description: "Leading a team of 4 designers on fintech products."
    },
    {
      position: "UI Designer",
      company: "PixelPerfect",
      duration: "2018 - 2021",
      description: "Worked on responsive design systems and branding."
    }
  ],
  socialLinks: {
    linkedin: "https://linkedin.com/in/janelondon",
    github: "https://github.com/janelondon",
    portfolio: "https://janelondon.com"
  }
};

// Load demo data
localStorage.setItem("resumeData", JSON.stringify(demoData));

// ========== Template Fill ==========
function fillTemplate(templateHTML, data) {
  let filled = templateHTML;

  filled = filled.replace(/{{name}}/g, data.name || "");
  filled = filled.replace(/{{role}}/g, data.role || "");
  filled = filled.replace(/{{email}}/g, data.email || "");
  filled = filled.replace(/{{phone}}/g, data.phone || "");
  filled = filled.replace(/{{address}}/g, data.address || "");
  filled = filled.replace(/{{summary}}/g, data.summary || "");

  // Skills
  const skillsHTML = (data.skills || []).map(skill => `<li>${skill}</li>`).join("");
  filled = filled.replace(/{{skills}}/g, skillsHTML);

  // Projects
  const projectsHTML = (data.projects || []).map(p => `
    <div class="entry-block">
      <h4>${p.title}</h4>
      <p>${p.description}</p>
      <a href="${p.link}" target="_blank">${p.link}</a>
    </div>`).join("");
  filled = filled.replace(/{{projects}}/g, projectsHTML);

  // Education
  const educationHTML = (data.education || []).map(e => `
    <div class="entry-block">
      <h4>${e.degree}</h4>
      <p>${e.institution} - ${e.year}</p>
    </div>`).join("");
  filled = filled.replace(/{{education}}/g, educationHTML);

  // Experience
  const experienceHTML = (data.experience || []).map(exp => `
    <div class="entry-block">
      <h4>${exp.position} at ${exp.company}</h4>
      <p>${exp.duration}</p>
      <p>${exp.description}</p>
    </div>`).join("");
  filled = filled.replace(/{{experience}}/g, experienceHTML);

  // Social Links
  filled = filled.replace(/{{linkedin}}/g, data.socialLinks?.linkedin || "");
  filled = filled.replace(/{{github}}/g, data.socialLinks?.github || "");
  filled = filled.replace(/{{portfolio}}/g, data.socialLinks?.portfolio || "");

  return filled;
}

// ========== Template Select ==========
function selectTemplate(templateName) {
  fetch(`templates/${templateName}.html`)
    .then(res => res.text())
    .then(templateHTML => {
      const user = JSON.parse(localStorage.getItem("resumeData") || "{}");
      const filled = fillTemplate(templateHTML, user);
      document.querySelector("#templatePreview").innerHTML = filled;
    });
}

// ========== PDF Download ==========
function downloadTemplate(templateName) {
  fetch(`templates/${templateName}.html`)
    .then(res => res.text())
    .then(templateHTML => {
      const user = JSON.parse(localStorage.getItem("resumeData") || "{}");
      const filled = fillTemplate(templateHTML, user);

      const temp = document.createElement("div");
      temp.innerHTML = filled;
      temp.style.width = "794px"; // A4 width in px
      temp.style.padding = "40px";
      document.body.appendChild(temp);

      html2pdf()
        .set({
          margin: 0,
          filename: `${user.name || 'resume'}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
        })
        .from(temp)
        .save()
        .then(() => temp.remove());
    });
}

function analyzeJD() {
  document.getElementById("skills").value = localStorage.skills || "";
  const jdText = document.getElementById("jd-input").value.toLowerCase();
  const keywords = extractKeywords(jdText);

  // Display keywords
  const keywordList = document.getElementById("jd-keywords");
  keywordList.innerHTML = "";
  keywords.forEach(word => {
    const li = document.createElement("li");
    li.textContent = word;
    keywordList.appendChild(li);
  });

  // Compare with user's skills
  const userSkills = (document.getElementById("skills").value || "").toLowerCase().split(",").map(s => s.trim());
  const matchReport = document.getElementById("skill-match-report");
  matchReport.innerHTML = "";

  keywords.forEach(skill => {
    const li = document.createElement("li");
    if (userSkills.includes(skill)) {
      li.innerHTML = `✅ <strong>${skill}</strong> — You have this skill`;
    } else {
      li.innerHTML = `⚠️ <strong>${skill}</strong> — Missing from your skills`;
    }
    matchReport.appendChild(li);
  });
}

// Basic keyword extractor
function extractKeywords(text) {
  const knownSkills = [
    "javascript", "python", "java", "c++", "c#", "react", "nodejs", "express", "mongodb", "sql",
    "mysql", "postgresql", "firebase", "html", "css", "typescript", "angular", "vue", "jquery",
    "git", "github", "docker", "kubernetes", "aws", "azure", "gcp", "linux", "bash", "flutter",
    "react native", "android", "ios", "tensorflow", "pytorch", "nlp", "machine learning", "ai",
    "data science", "data analysis", "pandas", "numpy", "matplotlib", "django", "flask", "spring",
    "hibernate", "rest", "api", "graphql", "devops", "agile", "scrum", "testing", "jest", "mocha",
    "cypress", "selenium", "jira", "jenkins", "ci", "cd", "webpack", "babel"
  ];

  const words = text.toLowerCase().split(/[\s,.;:()\/\n]+/).map(w => w.trim());
  const foundSkills = new Set();

  knownSkills.forEach(skill => {
    if (text.includes(skill)) {
      foundSkills.add(skill);
    }
  });

  return Array.from(foundSkills);
}
window.addEventListener("load", () => {
  const formFields = document.querySelectorAll("input, textarea");
  formFields.forEach(field => field.value = "");
});

// ======= Load on Startup (if needed) =======
window.addEventListener("DOMContentLoaded", () => {
  if (typeof addEducation === "function") addEducation();
  if (typeof addProject === "function") addProject();
  if (typeof addExperience === "function") addExperience();
  if (typeof loadProjects === "function") loadProjects();
  if (typeof showResume === "function") showResume();
});
