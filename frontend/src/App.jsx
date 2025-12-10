
import React, { useEffect, useState } from "react";
import axios from "axios";
import Auth from "./components/Auth";
import Builder from "./components/Builder";

//  Global Axios Config (IMPORTANT)
axios.defaults.baseURL = "https://ats-resume-builder-stic.onrender.com";
axios.defaults.withCredentials = true;

const App = () => {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login"); // login | register | builder | saved
  const [savedResumes, setSavedResumes] = useState([]);

  //  Check login status on first load
  useEffect(() => {
    checkAuth();
   
  }, []);

  //  Verify JWT session using cookies
  const checkAuth = async () => {
    try {
      const res = await axios.get("/auth/me");
      setUser(res.data.user);
      setView("builder");
      fetchResumes();
    } catch (err) {
      setUser(null);
      setView("login");
    }
  };

  // Fetch all resumes of logged-in user
  const fetchResumes = async () => {
    try {
      const res = await axios.get("/resumes");
      setSavedResumes(res.data);
    } catch (err) {
      console.error("Error fetching resumes:", err);
    }
  };

  //  AUTH SCREENS
  if (view === "login" || view === "register") {
    return (
      <Auth
        view={view}
        setView={setView}
        setUser={setUser}
        fetchResumes={fetchResumes}
      />
    );
  }

  // BUILDER / SAVED SCREEN
  return (
    <Builder
      user={user}
      view={view}
      setView={setView}
      savedResumes={savedResumes}
      fetchResumes={fetchResumes}
    />
  );
};

export default App;
