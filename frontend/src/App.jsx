/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import "./App.css";
import Navdoctor from "./components/Navbar/Navdoctor";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login-page/Login";
import Register from "./components/Register-page/Register";
import ViewRecord from "./components/ViewRecord/ViewRecord";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Dashboard from "./components/User-Dashboard/userDashboard";
import Profile from "./components/Profile Page/profile";
import ViewPatients from "./components/Doctor/Doctor";
import ViewDoctors from "./components/Patients/patient";
import Try from "./components/FolderDash/dash"; // Correct path to Dash component
import PatientRecords from "./components/PatientRecord/PatientRecords";

function App() {
  const location = useLocation();
  const path = location.pathname;
  const isHome = path === "/";
  const showNavdoctor = !(
    path === "/" ||
    path === "/login" ||
    path === "/register"
  );

  const [showFooter, setShowFooter] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector(".footer");
      if (!footer) return;

      const scrollPosition = window.innerHeight + window.scrollY;
      const footerOffset = footer.offsetTop;

      if (scrollPosition >= footerOffset) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="App">
      {showNavdoctor && <Navdoctor />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<Dashboard />} />
        <Route path="/dashboard" element={<Try />} />
        <Route path="/viewrecord" element={<ViewRecord />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/doctors" element={<ViewPatients />} />
        <Route path="/patients" element={<ViewDoctors />} />
        <Route path="/patient/:username" element={<PatientRecords />} />
      </Routes>
      {!isHome && <Footer />}
    </div>
  );
}

export default App;
