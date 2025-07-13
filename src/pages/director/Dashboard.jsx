// Dashboard.jsx
import React from "react";
import "./Dashboard.css";
import {
  FaBook,
  FaUsers,
  FaChalkboardTeacher,
  FaCubes,
  FaLayerGroup,
  FaListUl,
} from "react-icons/fa";
import { useTranslation } from "../../context/TranslationContext";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">{t("dashboard")}</h1>

      <div className="stats-grid">
        <StatCard icon={<FaBook />} label={t("courses")} value="12 ta" />
        <StatCard icon={<FaUsers />} label={t("students")} value="245 nafar" />
        <StatCard icon={<FaChalkboardTeacher />} label={t("teachers")} value="14 nafar" />
        <StatCard icon={<FaCubes />} label={t("modules")} value="48 ta" />
        <StatCard icon={<FaLayerGroup />} label={t("groups")} value="6 ta" />
        <StatCard icon={<FaListUl />} label={t("topics")} value="76 ta" />
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

const StatCard = ({ icon, label, value }) => (
  <div className="stat-card">
    <div className="stat-icon">{icon}</div>
    <div>
      <p className="stat-label">{label}</p>
      <h3>{value}</h3>
    </div>
  </div>
);

export default Dashboard;
