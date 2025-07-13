import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExpand, FaQuestionCircle, FaRegClock, FaBell, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';
import logo from '../assets/logo.png';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from "../context/TranslationContext"; // ✅ MUHIM

const icons = [
  { icon: <FaExpand />, label: 'Fullscreen' },
  { icon: <FaQuestionCircle />, label: 'Help' },
  { icon: <FaRegClock />, label: 'History' },
  { icon: <FaBell />, label: 'Notifications' },
];

export default function Navbar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  
  const { language, setLanguage } = useTranslation(); // ✅ MUHIM

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar__left">
          <img src={logo} alt="Logo" className="navbar__logo" />
        </div>

        <div className="navbar__center">
          {icons.map((item, idx) => (
            <div key={idx} className="navbar__icon-wrapper" title={item.label}>
              {item.icon}
            </div>
          ))}
        </div>

        <div className="navbar__right">
          {/* ✅ Lokal lang o‘rniga contextdagi tilni yuboramiz */}
          <LanguageSelector currentLang={language} onChange={setLanguage} />
          <span className="navbar__user">G'iyosov Mirazam</span>
          <button className="logout-icon" onClick={() => setShowLogoutModal(true)}>
            <FaSignOutAlt />
          </button>
        </div>
      </header>

      {showLogoutModal && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <h3>Haqiqatan ham tizimdan chiqmoqchimisiz?</h3>
            <div className="logout-modal-actions">
              <button className="confirm-btn" onClick={handleLogout}>Ha, chiqish</button>
              <button className="cancel-btn" onClick={() => setShowLogoutModal(false)}>Bekor qilish</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
