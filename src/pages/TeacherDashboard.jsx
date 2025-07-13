// src/pages/TeacherDashboard.jsx
import React from "react";
import Aside from "../components/Aside";
import Navbar from "../components/Navbar";
import { Routes, Route } from "react-router-dom";
import TeacherHome from "../pages/teacher/TeacherHome";
import Attendance from "../pages/teacher/Attendance";
import Topics from "./teacher/Topics";

const TeacherDashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <Aside role="teacher" />
      <div style={{ width: "100%" }}>
        <Navbar />
        <main style={{ margin: "70px 50px 0 300px" }}>
          <Routes>
            {/* Kirganda avtomatik ochiladigan sahifa */}
            <Route index element={<TeacherHome />} />
            <Route path="/dashboard" element={<TeacherHome />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="topics" element={<Topics />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
