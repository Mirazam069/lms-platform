import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaMoneyBill,
  FaArrowCircleDown,
  FaShoppingCart,
  FaCalculator,
  FaExclamationTriangle,
  FaTimes,
} from "react-icons/fa";
import "./FinancePanel.css";

const financeLinks = [
  { label: "Barcha to‘lovlar", path: "/director/finance/all", icon: FaMoneyBill },
  { label: "Yechib olish", path: "/director/finance/withdraw", icon: FaArrowCircleDown },
  { label: "Xarajatlar", path: "/director/finance/expenses", icon: FaShoppingCart },
  { label: "Ish haqi kalkulyatori", path: "/director/finance/salary", icon: FaCalculator },
  { label: "Qarzdorlar", path: "/director/finance/debtors", icon: FaExclamationTriangle },
];

const FinancePanel = ({ onClose }) => {
  const panelRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className={`finance-panel show`} ref={panelRef}>
      <div className="finance-header">
        <h3>Moliya</h3>
        <button onClick={onClose} className="close-btn">
          <FaTimes />
        </button>
      </div>
      {financeLinks.map((item, index) => (
        <Link to={item.path} key={index} className="finance-link">
          <item.icon className="finance-icon" />
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default FinancePanel;
