// src/pages/student/StudentModules.jsx
import React from "react";
import "./StudentModules.css";

const modules = [
  { name: "Frontend 1", description: "HTML va CSS asoslari" },
  { name: "Frontend 2", description: "JavaScript va DOM" },
  { name: "Frontend 3", description: "React.js boshlang‘ich" },
  { name: "Tools", description: "Git, GitHub, Figma" }
];

const StudentModules = () => {
  return (
    <div className="student-modules-container">
      <h1 className="title">Modullar</h1>
      <div className="modules-grid">
        {modules.map((mod, index) => (
          <div className="module-card" key={index}>
            <h2>{mod.name}</h2>
            <p>{mod.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentModules;
