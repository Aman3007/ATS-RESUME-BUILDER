// ./components/Builder.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  Save,
  LogOut,
  Plus,
  Trash2,
  Eye,
  EyeOff
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 8 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: "easeIn" } }
};

const buttonTap = { scale: 0.98 };
const cardHover = { scale: 1.02, boxShadow: "0px 12px 30px rgba(2, 48, 32, 0.08)" };

const Builder = ({ user, view, setView, savedResumes = [], fetchResumes }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedResume, setSelectedResume] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // not strictly needed here but kept for parity if used

  const [resume, setResume] = useState({
    personalInfo: { name: "", email: "", phone: "", address: "", summary: "" },
    skills: [""],
    experience: [{ company: "", position: "", duration: "", description: "" }],
    education: [{ institution: "", degree: "", year: "" }],
    template: "modern"
  });

  // sync saved resume selection if selectedResume is deleted outside
  useEffect(() => {
    // nothing specific now - fetchResumes provided by parent manages list
  }, [savedResumes]);

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      setView("login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleSaveResume = async () => {
    setLoading(true);
    setMessage("");

    try {
      if (selectedResume) {
        await axios.put(`/resumes/${selectedResume._id}`, resume);
        setMessage("Resume updated successfully!");
      } else {
        await axios.post("/resumes", resume);
        setMessage("Resume saved successfully!");
      }
      fetchResumes();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error saving resume");
    }

    setLoading(false);
  };

  const handleDownloadPDF = async () => {
    setLoading(true);

    try {
      const res = await axios.post("/resumes/generate-pdf", resume, {
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume-${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setMessage("PDF downloaded successfully!");
    } catch (err) {
      setMessage("Error generating PDF");
    }

    setLoading(false);
  };

  const loadResume = (resumeData) => {
    setResume(resumeData);
    setSelectedResume(resumeData);
    setView("builder");
  };

  const deleteResume = async (id) => {
    if (!window.confirm("Delete this resume?")) return;

    try {
      await axios.delete(`/resumes/${id}`);
      fetchResumes();

      if (selectedResume?._id === id) {
        setSelectedResume(null);
        setResume({
          personalInfo: { name: "", email: "", phone: "", address: "", summary: "" },
          skills: [""],
          experience: [{ company: "", position: "", duration: "", description: "" }],
          education: [{ institution: "", degree: "", year: "" }],
          template: "modern"
        });
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const addSkill = () => setResume({ ...resume, skills: [...resume.skills, ""] });
  const removeSkill = (idx) =>
    setResume({ ...resume, skills: resume.skills.filter((_, i) => i !== idx) });

  const addExperience = () =>
    setResume({
      ...resume,
      experience: [...resume.experience, { company: "", position: "", duration: "", description: "" }]
    });

  const removeExperience = (idx) =>
    setResume({
      ...resume,
      experience: resume.experience.filter((_, i) => i !== idx)
    });

  const addEducation = () =>
    setResume({
      ...resume,
      education: [...resume.education, { institution: "", degree: "", year: "" }]
    });

  const removeEducation = (idx) =>
    setResume({
      ...resume,
      education: resume.education.filter((_, i) => i !== idx)
    });

  // Reset form for a new resume
  const newResume = () => {
    setSelectedResume(null);
    setResume({
      personalInfo: { name: "", email: "", phone: "", address: "", summary: "" },
      skills: [""],
      experience: [{ company: "", position: "", duration: "", description: "" }],
      education: [{ institution: "", degree: "", year: "" }],
      template: "modern"
    });
    setView("builder");
  };

  return (
    <div className="min-h-screen bg-green-50">
      <nav className="bg-white shadow sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-green-100 mr-2">
              <FileText className="w-7 h-7 text-green-700" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, {user?.name}</span>
            <motion.button
              onClick={() => setView("saved")}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center gap-2"
              whileTap={buttonTap}
            >
              <FileText className="w-4 h-4" />
              My Resumes
            </motion.button>
            <motion.button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"
              whileTap={buttonTap}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <AnimatePresence mode="wait">
          {view === "saved" ? (
            <motion.section key="saved" variants={containerVariants} initial="hidden" animate="enter" exit="exit">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">My Resumes</h2>
                <motion.button
                  onClick={newResume}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                  whileTap={buttonTap}
                >
                  <Plus className="w-4 h-4" />
                  New Resume
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedResumes.length === 0 && (
                  <div className="col-span-full text-gray-700">No saved resumes yet — create one!</div>
                )}

                {savedResumes.map((r) => (
                  <motion.div key={r._id} className="bg-white rounded-xl p-6 border border-green-50" whileHover={cardHover} whileTap={{ scale: 0.995 }}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{r.personalInfo?.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{r.personalInfo?.email}</p>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => loadResume(r)}
                        className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                        whileTap={buttonTap}
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        onClick={() => deleteResume(r._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        whileTap={buttonTap}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ) : (
            <motion.section key="builder" variants={containerVariants} initial="hidden" animate="enter" exit="exit">
              {message && (
                <motion.div className={`mb-4 p-4 rounded-lg ${message.toLowerCase().includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {message}
                </motion.div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* LEFT: Form */}
                <motion.div className="bg-white rounded-xl p-6 max-h-[calc(100vh-200px)] overflow-y-auto border border-green-50" whileHover={{ y: -3 }}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Resume Details</h2>

                  {/* Personal Info */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={resume.personalInfo.name}
                      onChange={(e) => setResume({ ...resume, personalInfo: { ...resume.personalInfo, name: e.target.value } })}
                      className="w-full mb-3 px-4 py-2 border border-green-100 rounded-lg focus:ring-2 focus:ring-green-200 outline-none text-gray-900"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={resume.personalInfo.email}
                      onChange={(e) => setResume({ ...resume, personalInfo: { ...resume.personalInfo, email: e.target.value } })}
                      className="w-full mb-3 px-4 py-2 border border-green-100 rounded-lg focus:ring-2 focus:ring-green-200 outline-none text-gray-900"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={resume.personalInfo.phone}
                      onChange={(e) => setResume({ ...resume, personalInfo: { ...resume.personalInfo, phone: e.target.value } })}
                      className="w-full mb-3 px-4 py-2 border border-green-100 rounded-lg focus:ring-2 focus:ring-green-200 outline-none text-gray-900"
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      value={resume.personalInfo.address}
                      onChange={(e) => setResume({ ...resume, personalInfo: { ...resume.personalInfo, address: e.target.value } })}
                      className="w-full mb-3 px-4 py-2 border border-green-100 rounded-lg focus:ring-2 focus:ring-green-200 outline-none text-gray-900"
                    />
                    <textarea
                      placeholder="Professional Summary"
                      value={resume.personalInfo.summary}
                      onChange={(e) => setResume({ ...resume, personalInfo: { ...resume.personalInfo, summary: e.target.value } })}
                      className="w-full px-4 py-2 border border-green-100 rounded-lg focus:ring-2 focus:ring-green-200 outline-none h-24 text-gray-900"
                    />
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
                      <motion.button onClick={addSkill} className="text-green-700 hover:text-green-800" whileTap={buttonTap}><Plus className="w-5 h-5" /></motion.button>
                    </div>
                    {resume.skills.map((skill, idx) => (
                      <div key={idx} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Skill"
                          value={skill}
                          onChange={(e) => {
                            const newSkills = [...resume.skills];
                            newSkills[idx] = e.target.value;
                            setResume({ ...resume, skills: newSkills });
                          }}
                          className="flex-1 px-4 py-2 border border-green-100 rounded-lg focus:ring-2 focus:ring-green-200 outline-none text-gray-900"
                        />
                        <motion.button onClick={() => removeSkill(idx)} className="text-red-500 hover:text-red-600" whileTap={buttonTap}><Trash2 className="w-5 h-5" /></motion.button>
                      </div>
                    ))}
                  </div>

                  {/* Experience */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Experience</h3>
                      <motion.button onClick={addExperience} className="text-green-700 hover:text-green-800" whileTap={buttonTap}><Plus className="w-5 h-5" /></motion.button>
                    </div>
                    {resume.experience.map((exp, idx) => (
                      <div key={idx} className="mb-4 p-4 border border-green-50 rounded-lg bg-white">
                        <div className="flex justify-end mb-2">
                          <motion.button onClick={() => removeExperience(idx)} className="text-red-500 hover:text-red-600" whileTap={buttonTap}><Trash2 className="w-5 h-5" /></motion.button>
                        </div>
                        <input
                          type="text"
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => {
                            const newExp = [...resume.experience];
                            newExp[idx].company = e.target.value;
                            setResume({ ...resume, experience: newExp });
                          }}
                          className="w-full mb-2 px-4 py-2 border border-green-100 rounded-lg focus:ring-2 focus:ring-green-200 outline-none text-gray-900"
                        />
                        <input
                          type="text"
                          placeholder="Position"
                          value={exp.position}
                          onChange={(e) => {
                            const newExp = [...resume.experience];
                            newExp[idx].position = e.target.value;
                            setResume({ ...resume, experience: newExp });
                          }}
                          className="w-full mb-2 px-4 py-2 border border-green-100 rounded-lg focus:ring-2 focus:ring-green-200 outline-none text-gray-900"
                        />
                        <input
                          type="text"
                          placeholder="Duration (e.g., 2020-2022)"
                          value={exp.duration}
                          onChange={(e) => {
                            const newExp = [...resume.experience];
                            newExp[idx].duration = e.target.value;
                            setResume({ ...resume, experience: newExp });
                          }}
                          className="w-full mb-2 px-4 py-2 border border-green-100 rounded-lg focus:ring-2 focus:ring-green-200 outline-none text-gray-900"
                        />
                        <textarea
                          placeholder="Description"
                          value={exp.description}
                          onChange={(e) => {
                            const newExp = [...resume.experience];
                            newExp[idx].description = e.target.value;
                            setResume({ ...resume, experience: newExp });
                          }}
                          className="w-full px-4 py-2 border border-green-100 rounded-lg focus:ring-2 focus:ring-green-200 outline-none h-20 text-gray-900"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Education */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Education</h3>
                      <motion.button onClick={addEducation} className="text-green-700 hover:text-green-800" whileTap={buttonTap}><Plus className="w-5 h-5" /></motion.button>
                    </div>
                    {resume.education.map((edu, idx) => (
                      <div key={idx} className="mb-4 p-4 border border-green-50 rounded-lg bg-white">
                        <div className="flex justify-end mb-2">
                          <motion.button onClick={() => removeEducation(idx)} className="text-red-500 hover:text-red-600" whileTap={buttonTap}><Trash2 className="w-5 h-5" /></motion.button>
                        </div>
                        <input
                          type="text"
                          placeholder="Institution"
                          value={edu.institution}
                          onChange={(e) => {
                            const newEdu = [...resume.education];
                            newEdu[idx].institution = e.target.value;
                            setResume({ ...resume, education: newEdu });
                          }}
                          className="w-full mb-2 px-4 py-2 border border-green-100 rounded-lg focus:ring-2 focus:ring-green-200 outline-none text-gray-900"
                        />
                        <input
                          type="text"
                          placeholder="Degree"
                          value={edu.degree}
                          onChange={(e) => {
                            const newEdu = [...resume.education];
                            newEdu[idx].degree = e.target.value;
                            setResume({ ...resume, education: newEdu });
                          }}
                          className="w-full mb-2 px-4 py-2 border border-green-100 rounded-lg focus:ring-2 focus:ring-green-200 outline-none text-gray-900"
                        />
                        <input
                          type="text"
                          placeholder="Year"
                          value={edu.year}
                          onChange={(e) => {
                            const newEdu = [...resume.education];
                            newEdu[idx].year = e.target.value;
                            setResume({ ...resume, education: newEdu });
                          }}
                          className="w-full px-4 py-2 border border-green-100 rounded-lg focus:ring-2 focus:ring-green-200 outline-none text-gray-900"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* RIGHT: Templates + Actions */}
                <motion.aside className="bg-white rounded-xl p-6 border border-green-50" whileHover={{ y: -3 }}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Template & Actions</h2>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Template</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {["modern", "classic", "minimal"].map((template) => (
                        <motion.button
                          key={template}
                          onClick={() => setResume({ ...resume, template })}
                          className={`p-4 rounded-lg border-2 transition ${resume.template === template ? "border-green-600 bg-green-50" : "border-green-100 hover:border-green-300"}`}
                          whileTap={buttonTap}
                        >
                          <div className="font-semibold capitalize text-gray-900">{template}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <motion.button
                      onClick={handleSaveResume}
                      disabled={loading}
                      className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                      whileTap={buttonTap}
                    >
                      <Save className="w-5 h-5" />
                      {loading ? "Saving..." : selectedResume ? "Update Resume" : "Save Resume"}
                    </motion.button>

                    <motion.button
                      onClick={handleDownloadPDF}
                      disabled={loading}
                      className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                      whileTap={buttonTap}
                    >
                      <Download className="w-5 h-5" />
                      {loading ? "Generating..." : "Download PDF"}
                    </motion.button>
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-white rounded-lg border border-green-50">
                    <h3 className="font-semibold text-gray-900 mb-2">Preview</h3>
                    <p className="text-sm text-gray-700">Fill in the details and choose a template. Click "Download PDF" to generate your professional resume!</p>

                    <div className="mt-4 text-sm text-gray-700">
                      <div><strong>Name:</strong> {resume.personalInfo.name || "—"}</div>
                      <div><strong>Email:</strong> {resume.personalInfo.email || "—"}</div>
                      <div><strong>Template:</strong> {resume.template}</div>
                    </div>
                  </div>
                </motion.aside>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Builder;
