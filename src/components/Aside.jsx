import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBookOpen,
  FaLayerGroup,
  FaCubes,
  FaUserTie,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaListUl,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import FinancePanel from "./FinancePanel"; // 🔹 Yangi komponent
import "./Aside.css";

const directorMenu = [
  { label: "Dashboard", path: "/director/dashboard", icon: FaTachometerAlt },
  { label: "Faol lidlar", path: "/director/active-leads", icon: FaUserTie },
  { label: "Kurslar", path: "/director/courses", icon: FaBookOpen },
  { label: "Guruhlar", path: "/director/groups", icon: FaLayerGroup },
  { label: "Modullar", path: "/director/modules", icon: FaCubes },
  { label: "Talabalar", path: "/director/students", icon: FaUserGraduate },
  { label: "O‘qituvchilar", path: "/director/teachers", icon: FaChalkboardTeacher },
  { label: "Mavzular", path: "/director/topics", icon: FaListUl }
];

const Aside = () => {
  const role = localStorage.getItem("role");
  const [isFinanceOpen, setIsFinanceOpen] = useState(false);

  let menu = [];
  if (role === "teacher") menu = []; // teacher menyusi kiritilmagan
  else if (role === "student") menu = []; // student menyusi kiritilmagan
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

          {/* 🔺 Moliya menyusi Link emas, tugma */}
          <button className="aside-link moliya-btn" onClick={() => setIsFinanceOpen(!isFinanceOpen)}>
            <FaMoneyCheckAlt className="icon" />
            <span>Moliya</span>
          </button>
        </nav>
      </aside>

      {/* 🔹 Moliya paneli */}
      {isFinanceOpen && <FinancePanel onClose={() => setIsFinanceOpen(false)} />}
    </>
  );
};

export default Aside;
