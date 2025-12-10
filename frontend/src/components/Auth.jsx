import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FileText, Eye, EyeOff } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 8 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.35 } }
};

const buttonTap = { scale: 0.98 };

const Auth = ({ view, setView, setUser, fetchResumes }) => {
  const [authData, setAuthData] = useState({ email: "", password: "", name: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", authData);
      setUser(res.data.user);
      setView("builder");
      fetchResumes();
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/auth/register", authData);
      setUser(res.data.user);
      setView("builder");
      fetchResumes();
    } catch (err) {
      setMessage(err.response?.data?.message || "Register failed");
    }
    setLoading(false);
  };

  return (
    <motion.div className="min-h-screen bg-green-50 flex items-center justify-center p-6"
      variants={containerVariants} initial="hidden" animate="enter">

      <motion.div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-green-100">

        <div className="flex items-center justify-center mb-6">
          <div className="p-3 rounded-full bg-green-100 mr-3">
            <FileText className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold">Resume Builder</h1>
        </div>

        <div className="flex mb-6 bg-gray-50 rounded-lg p-1">
          <button onClick={() => setView("login")} className={`flex-1 py-2 ${view === "login" && "bg-white shadow"}`}>
            Login
          </button>
          <button onClick={() => setView("register")} className={`flex-1 py-2 ${view === "register" && "bg-white shadow"}`}>
            Register
          </button>
        </div>

        {view === "register" && (
          <input className="w-full mb-4 p-3 border rounded"
            placeholder="Full Name"
            onChange={e => setAuthData({ ...authData, name: e.target.value })} />
        )}

        <input className="w-full mb-4 p-3 border rounded"
          placeholder="Email"
          onChange={e => setAuthData({ ...authData, email: e.target.value })} />

        <div className="relative mb-6">
          <input className="w-full p-3 border rounded"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={e => setAuthData({ ...authData, password: e.target.value })} />
          <button className="absolute right-3 top-3" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        <motion.button
          whileTap={buttonTap}
          onClick={view === "login" ? handleLogin : handleRegister}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded">
          {loading ? "Processing..." : view === "login" ? "Login" : "Register"}
        </motion.button>

        {message && <p className="text-center mt-4 text-red-600">{message}</p>}

      </motion.div>
    </motion.div>
  );
};

export default Auth;
