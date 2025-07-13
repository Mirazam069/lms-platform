import React from "react";
import { Routes, Route } from "react-router-dom";
import Aside from "../components/Aside";
import Navbar from "../components/Navbar";
import StudentHome from "./student/StudentHome";
import StudentModules from "./student/StudentModules";
import StudentTopics from "./student/StudentTopics";

const StudentDashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <Aside role="student" />
      <div style={{ width: "100%" }}>
        <Navbar />
        <main style={{ margin: "70px 50px 0 300px" }}>
          <Routes>
            <Route path="/dashboard" element={<StudentHome />} />
            <Route path="/modules/:courseId" element={<StudentModules />} />
            <Route path="/topics/:moduleId" element={<StudentTopics />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
