import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom"; 
import {
  FaUser,
  FaUserGraduate,
  FaLayerGroup,
  FaExclamationTriangle,
  FaChalkboardTeacher,
  FaHandshake,
  FaUserSlash,
  FaUsers,
  FaMoneyBillWave,
  FaWallet,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "mart 24", value: 90000000 },
  { name: "apr. 24", value: 30000000 },
  { name: "may 24", value: 60000000 },
  { name: "iyun 24", value: 75000000 },
  { name: "iyul 24", value: 87000000 },
  { name: "avg. 24", value: 92000000 },
  { name: "sen. 24", value: 88000000 },
  { name: "okt. 24", value: 95000000 },
  { name: "noy. 24", value: 97000000 },
  { name: "dek. 24", value: 94000000 },
  { name: "yan. 25", value: 91000000 },
  { name: "fev. 25", value: 108000000 },
  { name: "mart 25", value: 112000000 },
  { name: "apr. 25", value: 109000000 },
  { name: "may 25", value: 95000000 },
  { name: "iyun 25", value: 98000000 },
  { name: "iyul 25", value: 85000000 },
  { name: "avg. 25", value: 20000000 },
];

const statItems = [
  { id: 1, icon: <FaUser />, label: "Faol lidlar", value: 23 },
  { id: 2, icon: <FaUserGraduate />, label: "Talabalar", value: 208 },
  { id: 3, icon: <FaLayerGroup />, label: "Guruhlar", value: 52 },
  { id: 4, icon: <FaExclamationTriangle />, label: "Qarzdorlar", value: 164 },
  { id: 5, icon: <FaChalkboardTeacher />, label: "Sinov darsida", value: 5 },
  { id: 6, icon: <FaHandshake />, label: "Shu oyda to'langan", value: 9 },
  { id: 7, icon: <FaUserSlash />, label: "Faol guruhni tark etdi", value: 2 },
  { id: 8, icon: <FaUsers />, label: "Sinovdan so'ng qolganlar", value: 0 },
];

const paymentStats = [
  {
    id: 1,
    Icon: FaMoneyBillWave,
    label: "Jami tushum",
    value: "$1,200",
  },
  {
    id: 2,
    Icon: FaWallet,
    label: "O‘tgan oy tushumi",
    value: "$850",
  },
  {
    id: 3,
    Icon: FaCheckCircle,
    label: "Shu oy to‘langan",
    value: "$430",
  },
  {
    id: 4,
    Icon: FaExclamationCircle,
    label: "Qarzlar",
    value: "$770",
  },
];

// const Dashboard = () => {
//   const navigate = useNavigate();


const Dashboard = () => {
  const [remainingTime, setRemainingTime] = useState(3 * 24 * 60 * 60); // 3 kun = sekundlarda
    const navigate = useNavigate();

  const handleBoxClick = (id) => {
    if (id === 1) {
      navigate("/director/active-leads");
    }else if(id === 2){
      navigate("/director/students")
    }else if(id === 3){
      navigate("/director/groups")
    }else if(id === 4){
      navigate("/director/finance/debtors");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${d} kun ${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div className="payment-alert">
        <span>
          💸 To‘lov uchun muddat tugashiga:{" "}
          <strong>{formatTime(remainingTime)}</strong>
        </span>
        <button className="pay-btn">To‘lov qilish</button>
      </div>

       <div className="dashboard-box-wrapper">
      {statItems.map((item) => (
        <div
          key={item.id}
          className="dashboard-box"
          onClick={() => handleBoxClick(item.id)} // click ishlovchi
          style={{ cursor: "pointer" }} // UX uchun
        >
          <div className="icon">{item.icon}</div>
          <div className="label">{item.label}</div>
          <div className="value">{item.value}</div>
        </div>
      ))}
    </div>


      <div style={{ width: "1100px", height: "300px", margin: "30px 50px 0 300px" }} className="lineChart-container">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(val) => `${val / 1000000} mln`} />
          <Tooltip formatter={(val) => `${val.toLocaleString()} UZS`} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#f58634"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>

          <div className="payment-stats-wrapper">
        {paymentStats.map(({ id, Icon, label, value }) => (
          <div key={id} className="payment-stat-box">
            <div className="stat-icon">
              <Icon />
            </div>
            <div className="stat-info">
              <p className="stat-label">{label}</p>
              <h3 className="stat-value">{value}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
