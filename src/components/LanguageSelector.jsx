// src/components/LanguageSelector.jsx
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./LanguageSelector.css";

const languages = [
  { code: "uz", label: "O'zbekcha" },
  { code: "ru", label: "Русский" },
];

export default function LanguageSelector({ currentLang, onChange }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (langCode) => {
    onChange(langCode);
    setOpen(false);
  };

  return (
    <div className="lang-dropdown">
      <button className="lang-btn" onClick={() => setOpen(!open)}>
        {languages.find((l) => l.code === currentLang)?.label || "Til"}
        <FaChevronDown className="dropdown-icon" />
      </button>

      {open && (
        <div className="lang-options">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className={`lang-option ${lang.code === currentLang ? "active" : ""}`}
              onClick={() => handleSelect(lang.code)}
            >
              {lang.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
