import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  // FaBookOpen,
  FaLayerGroup,
  FaUserTie,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaMoneyCheckAlt,
  FaCog,
} from "react-icons/fa";
import FinancePanel from "./FinancePanel";
import SettingsPanel from "../pages/director/settings/SettingsPanel";
import "./Aside.css";

const directorMenu = [
  { label: "Dashboard", path: "/director/dashboard", icon: FaTachometerAlt },
  { label: "Faol lidlar", path: "/director/active-leads", icon: FaUserTie },
  // { label: "Kurslar", path: "/director/courses", icon: FaBookOpen },
  { label: "Guruhlar", path: "/director/groups", icon: FaLayerGroup },
  { label: "Talabalar", path: "/director/students", icon: FaUserGraduate },
  { label: "O‘qituvchilar", path: "/director/teachers", icon: FaChalkboardTeacher },
];

const Aside = () => {
  const role = localStorage.getItem("role");
  const [isFinanceOpen, setIsFinanceOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const financeRef = useRef(null);
  const settingsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        financeRef.current &&
        !financeRef.current.contains(e.target) &&
        !e.target.closest(".moliya-btn")
      ) {
        setIsFinanceOpen(false);
      }
      if (
        settingsRef.current &&
        !settingsRef.current.contains(e.target) &&
        !e.target.closest(".settings-btn")
      ) {
        setShowSettings(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  let menu = [];
  if (role === "teacher") menu = [];
  else if (role === "student") menu = [];
  else menu = directorMenu;

  return (
    <>
      <aside className="aside-wrapper">
        <div className="aside-logo">
          <h2>
            {role === "teacher"
              ? "Teacher Dashboard"
              : role === "student"
              ? "Student Dashboard"
              : "Director Dashboard"}
          </h2>
        </div>

        <nav className="aside-nav">
          {menu.map((item, index) => (
            <Link key={index} to={item.path} className="aside-link">
              <item.icon className="icon" />
              <span>{item.label}</span>
            </Link>
          ))}

          {/* 🔴 Faqat bosganda ochiladi */}
          <button
            className="aside-link moliya-btn"
            aria-expanded={isFinanceOpen}
            onClick={() => {
              setIsFinanceOpen((v) => !v);
              setShowSettings(false); // bir-birini yopsin
            }}
          >
            <FaMoneyCheckAlt className="icon" />
            <span>Moliya</span>
          </button>

          {/* 🔴 Faqat bosganda ochiladi */}
          <button
            className="aside-link settings-btn"
            aria-expanded={showSettings}
            onClick={() => {
              setShowSettings((v) => !v);
              setIsFinanceOpen(false);
            }}
          >
            <FaCog className="icon" />
            <span>Sozlamalar</span>
          </button>
        </nav>
      </aside>

      {isFinanceOpen && (
        <div ref={financeRef}>
          <FinancePanel onClose={() => setIsFinanceOpen(false)} />
        </div>
      )}

      {showSettings && (
        <div ref={settingsRef}>
          <SettingsPanel onClose={() => setShowSettings(false)} />
        </div>
      )}
    </>
  );
};

export default Aside;
