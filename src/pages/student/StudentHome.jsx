// src/pages/student/StudentHome.jsx

import React from "react";
import "./StudentHome.css";
import { FaBookOpen, FaLayerGroup, FaListUl } from "react-icons/fa";

const StudentHome = () => {
  return (
    <div className="student-dashboard">
      <h1 className="dashboard-title">Bosh sahifa</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <FaBookOpen className="stat-icon" />
          <div>
            <p className="stat-label">Kurslar</p>
            <h3>3 ta</h3>
          </div>
        </div>
        <div className="stat-card">
          <FaLayerGroup className="stat-icon" />
          <div>
            <p className="stat-label">Modullar</p>
            <h3>12 ta</h3>
          </div>
        </div>
        <div className="stat-card">
          <FaListUl className="stat-icon" />
          <div>
            <p className="stat-label">Mavzular</p>
            <h3>65 ta</h3>
          </div>
        </div>
      </div>

      <div className="recent-section">
        <h2>Yaqinda o‘tilgan mavzular</h2>
        <table>
          <thead>
            <tr>
              <th>Mavzu</th>
              <th>Modul</th>
              <th>Sana</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>React Hooklar</td>
              <td>Frontend 3</td>
              <td>2025-06-29</td>
            </tr>
            <tr>
              <td>Flex va Grid</td>
              <td>Frontend 2</td>
              <td>2025-06-28</td>
            </tr>
            <tr>
              <td>Git va GitHub</td>
              <td>Tools</td>
              <td>2025-06-27</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentHome;
