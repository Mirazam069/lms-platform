// src/pages/student/StudentTopics.jsx
import React from "react";
import "./StudentTopics.css";

const topics = [
  { name: "React Hooklar", module: "Frontend 3", date: "2025-06-29" },
  { name: "Flex va Grid", module: "Frontend 2", date: "2025-06-28" },
  { name: "Git va GitHub", module: "Tools", date: "2025-06-27" }
];

const StudentTopics = () => {
  return (
    <div className="student-topics-container">
      <h1 className="title">Mavzular</h1>
      <div className="topics-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Mavzu</th>
              <th>Modul</th>
              <th>Sana</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.module}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTopics;
