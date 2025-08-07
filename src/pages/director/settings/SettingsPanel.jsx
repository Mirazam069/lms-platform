import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaCog,
  FaUserCog,
  FaMoneyBill,
  FaRoute,
  FaGem,
  FaThLarge,
  FaCalendarAlt,
  FaFolderOpen,
  FaUserSlash,
  FaWpforms,
  FaNewspaper,
  FaTags,
  FaCommentDots,
  FaPhoneAlt,
  FaTimes,
} from "react-icons/fa";
import "./Settings.css";

const settingsLinks = [
  { label: "Sms sozlamalari", path: "/director/settings/sms", icon: FaCommentDots },
  { label: "Onlayn telefoniya", path: "/director/settings/telephony", icon: FaPhoneAlt },
  { label: "Umumiy sozlamalari", path: "/director/settings/general", icon: FaCog },
  { label: "Xodimlar", path: "/director/settings/staff", icon: FaUserCog },
  { label: "Billing", path: "/director/settings/billing", icon: FaMoneyBill },
  { label: "Roadmap", path: "/director/settings/roadmap", icon: FaRoute },
  { label: "Kurslar", path: "/director/settings/courses", icon: FaGem },
  { label: "Xonalar", path: "/director/settings/rooms", icon: FaThLarge },
  { label: "Dam olish kunlari", path: "/director/settings/holidays", icon: FaCalendarAlt },
  { label: "Arxiv", path: "/director/settings/archive", icon: FaFolderOpen },
  { label: "Guruhni tark etgan o‘quvchilar", path: "/director/settings/left-students", icon: FaUserSlash },
  { label: "Shakllar", path: "/director/settings/forms", icon: FaWpforms },
  { label: "Nima yangilik", path: "/director/settings/whats-new", icon: FaNewspaper },
  { label: "Teglar", path: "/director/settings/tags", icon: FaTags },
];

const SettingsPanel = ({ onClose }) => {
  const panelRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        !e.target.closest(".settings-btn") && // Sozlamalar tugmasi bosilsa — yopilmasin
        !e.target.closest(".aside-link")      // Aside linklar bosilsa — yopilmasin
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      className="settings-panel show"
      ref={panelRef}
      onMouseLeave={onClose} // 👈 aynan shu yerda bo‘lishi kerak
    >
      <div className="settings-header">
        <h3>Sozlamalar</h3>
        <button onClick={onClose} className="close-btn">
          <FaTimes />
        </button>
      </div>

      {settingsLinks.map((item, i) => (
        <Link to={item.path} key={i} className="settings-link">
          <item.icon className="settings-icon" />
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default SettingsPanel;
