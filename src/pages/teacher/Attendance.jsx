// src/pages/teacher/Attendance.jsx
import React from "react";
import "./Attendance.css";

const Attendance = () => {
  return (
    <div className="attendance-container">
      <h1 className="attendance-title">Davomat</h1>

      <div className="attendance-filters">
        <select>
          <option>Frontend 101</option>
          <option>Backend 202</option>
          <option>Design 303</option>
        </select>
        <input type="date" />
        <button>Ko‘rish</button>
      </div>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>F.I.Sh</th>
            <th>Guruh</th>
            <th>Holati</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Aliyev Jasur</td>
            <td>Frontend 101</td>
            <td><span className="status present">Keldi</span></td>
          </tr>
          <tr>
            <td>Karimova Laylo</td>
            <td>Frontend 101</td>
            <td><span className="status absent">Kelmagan</span></td>
          </tr>
          <tr>
            <td>Shodmonov Ilhom</td>
            <td>Frontend 101</td>
            <td><span className="status late">Kechikdi</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
