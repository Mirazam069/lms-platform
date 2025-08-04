import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Aside from "../components/Aside";
import Navbar from "../components/Navbar";

// Sahifalar
import Dashboard from "./director/Dashboard";
import Courses from "./director/Courses";
import Groups from "./director/Groups";
import Modules from "./director/Modules";
import Students from "./director/Students";
import Teachers from "./director/Teachers";
import Topics from "./director/Topics";
import ActiveLeads from "./director/ActiveLeads";
import Debtors from "./director/finance/Debtors"; // TO‘G‘RI yo‘l

const DirectorDashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <Aside />
      <div style={{ width: "100%" }}>
        <Navbar />
        <main style={{ padding: "30px" }}>
          <Routes>
            <Route index element={<Dashboard />} /> {/* default sahifa */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="active-leads" element={<ActiveLeads />} />{" "}
            {/* ✅ pathdan "/" olib tashlandi */}
            <Route path="courses" element={<Courses />} />
            <Route path="groups" element={<Groups />} />
            <Route path="modules" element={<Modules />} />
            <Route path="students" element={<Students />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="topics" element={<Topics />} />
            <Route path="finance/debtors" element={<Debtors />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DirectorDashboard;
