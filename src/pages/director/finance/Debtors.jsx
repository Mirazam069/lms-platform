import React from "react";
import "./Debtors.css";

const dummyDebtors = [
  {
    id: 1,
    name: "Azizbek Mamatqulov",
    phone: "+998991112233",
    group: "Frontend 01",
    status: "Faol",
    debtAmount: 250000,
    from: "Reklama",
    date: "2025-07-01",
  },
  {
    id: 2,
    name: "Malika Soliyeva",
    phone: "+998990003322",
    group: "Backend 02",
    status: "Arxivlangan",
    debtAmount: 180000,
    from: "Do‘st tavsiyasi",
    date: "2025-06-20",
  },
  {
    id: 3,
    name: "Diyorbek Rahimov",
    phone: "+998930004400",
    group: "UI/UX 03",
    status: "Faol",
    debtAmount: 300000,
    from: "Instagram",
    date: "2025-07-15",
  },
  {
    id: 4,
    name: "Maftuna Qodirova",
    phone: "+998940006600",
    group: "English B1",
    status: "Faol",
    debtAmount: 120000,
    from: "Telegram",
    date: "2025-07-10",
  },
  {
    id: 5,
    name: "Jasur Tursunov",
    phone: "+998977788899",
    group: "React Native",
    status: "Faol",
    debtAmount: 50000,
    from: "Banner",
    date: "2025-07-12",
  },
  {
    id: 6,
    name: "Shaxzoda Komilova",
    phone: "+998901234567",
    group: "Python Basic",
    status: "Faol",
    debtAmount: 200000,
    from: "Google Search",
    date: "2025-07-14",
  },
  {
    id: 7,
    name: "Xurshid Ismoilov",
    phone: "+998998877665",
    group: "Node.js",
    status: "Faol",
    debtAmount: 350000,
    from: "Banner",
    date: "2025-07-03",
  },
  {
    id: 8,
    name: "Gulchehra Nurullaeva",
    phone: "+998931112244",
    group: "Java Advance",
    status: "Faol",
    debtAmount: 270000,
    from: "Yandex reklama",
    date: "2025-06-28",
  },
  {
    id: 9,
    name: "Umarbek Karimov",
    phone: "+998907654321",
    group: "DevOps",
    status: "Arxivlangan",
    debtAmount: 410000,
    from: "YouTube",
    date: "2025-07-09",
  },
  {
    id: 10,
    name: "Zilola Yusupova",
    phone: "+998939393939",
    group: "Laravel",
    status: "Faol",
    debtAmount: 90000,
    from: "Instagram",
    date: "2025-07-18",
  },
  {
    id: 11,
    name: "Bekzod Rasulov",
    phone: "+998933456789",
    group: "Vue.js",
    status: "Faol",
    debtAmount: 150000,
    from: "Reklama",
    date: "2025-07-07",
  },
  {
    id: 12,
    name: "Mohira Erkinova",
    phone: "+998934444444",
    group: "Graphic Design",
    status: "Faol",
    debtAmount: 230000,
    from: "Telegram",
    date: "2025-07-16",
  },
];

const Debtors = () => {
  return (
    <div className="debtors-wrapper">
      <div className="debtors-header">
        <h2>Qarzdorlar</h2>
        <span className="debtors-count">
          Miqdor — <strong>0</strong>
        </span>
      </div>

      <div className="debtors-summary">
        <span>Jami: 0 UZS</span>
        <i className="icon-stack">💰</i>
      </div>

      <div className="debtors-filters">
        <input type="text" placeholder="Ism yoki tel" />
        <select>
          <option>Faol (Arxivlanganlar yo‘q)</option>
          <option>Barcha talabalar</option>
        </select>
        <select>
          <option>Guruh tanlang</option>
        </select>
        <select>
          <option>Qarz miqdori (oldin)</option>
        </select>
        <select>
          <option>Qarz miqdori (gacha)</option>
        </select>
        <input type="date" />
        <input type="date" />
        <button>Filtr</button>
      </div>

      <div className="debtors-empty">Ko‘rsatiladigan ma’lumotlar yo‘q</div>
      <div className="debtors-all">
        {dummyDebtors.map((debtor) => (
          <div key={debtor.id} className="debtor-card">
            <h4>{debtor.name}</h4>
            <p>📞 {debtor.phone}</p>
            <p>👨‍🏫 Guruh: {debtor.group}</p>
            <p>💰 Qarz: {debtor.debtAmount.toLocaleString()} so'm</p>
            <p>📅 Sana: {debtor.date}</p>
            <p>📌 Manba: {debtor.from}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Debtors;
