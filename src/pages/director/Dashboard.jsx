import React from "react";
import "./Dashboard.css";
import { FaBook, FaUsers, FaChalkboardTeacher, FaCubes, FaLayerGroup, FaListUl } from "react-icons/fa";
import { useTranslation } from "../../context/TranslationContext"; // 🔄 tarjima konteksti

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">{t("dashboard")}</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <FaBook className="stat-icon" />
          <div>
            <p className="stat-label">{t("courses")}</p>
            <h3>12 ta</h3>
          </div>
        </div>
        <div className="stat-card">
          <FaUsers className="stat-icon" />
          <div>
            <p className="stat-label">{t("students")}</p>
            <h3>245 nafar</h3>
          </div>
        </div>
        <div className="stat-card">
          <FaChalkboardTeacher className="stat-icon" />
          <div>
            <p className="stat-label">{t("teachers")}</p>
            <h3>14 nafar</h3>
          </div>
        </div>
        <div className="stat-card">
          <FaCubes className="stat-icon" />
          <div>
            <p className="stat-label">{t("modules")}</p>
            <h3>48 ta</h3>
          </div>
        </div>
        <div className="stat-card">
          <FaLayerGroup className="stat-icon" />
          <div>
            <p className="stat-label">{t("groups")}</p>
            <h3>6 ta</h3>
          </div>
        </div>
        <div className="stat-card">
          <FaListUl className="stat-icon" />
          <div>
            <p className="stat-label">{t("topics")}</p>
            <h3>76 ta</h3>
          </div>
        </div>
      </div>

      <div className="recent-students">
        <h2>{t("recentStudents")}</h2>
        <table>
          <thead>
            <tr>
              <th>{t("name")}</th>
              <th>{t("course")}</th>
              <th>{t("date")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Islom Karimov</td>
              <td>Frontend</td>
              <td>2025-06-20</td>
            </tr>
            <tr>
              <td>Maftuna Xasanova</td>
              <td>Backend</td>
              <td>2025-06-21</td>
            </tr>
            <tr>
              <td>Behruz Rajabov</td>
              <td>English</td>
              <td>2025-06-22</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
