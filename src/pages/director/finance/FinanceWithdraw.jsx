import React, { useMemo, useState } from "react";
import "./FinanceWithdraw.css";
import { FiCalendar, FiLayers, FiDownload } from "react-icons/fi";

const mockData = [
  // Demo uchun bo‘sh yoki xohlasangiz misol qo‘shasiz
  // { id: 1, date: "2025-08-09", student: "Mirazam", amount: 300000, note: "Naqd", staff: "Mirazam" },
];

export default function FinanceWithdraw() {
  const [filters, setFilters] = useState({
    from: "2025-08-01",
    to: "2025-08-31",
    nameOrPhone: "",
    amount: "",
    course: "",
  });

  const list = useMemo(() => {
    const q = filters.nameOrPhone.trim().toLowerCase();
    return mockData.filter((r) => {
      const inRange =
        (!filters.from || r.date >= filters.from) &&
        (!filters.to || r.date <= filters.to);
      const matchQ =
        !q ||
        (r.student || "").toLowerCase().includes(q) ||
        (r.phone || "").toLowerCase().includes(q);
      const matchAmt =
        !filters.amount || String(r.amount).includes(filters.amount);
      return inRange && matchQ && matchAmt;
    });
  }, [filters]);

  const total = useMemo(
    () => list.reduce((s, r) => s + Number(r.amount || 0), 0),
    [list]
  );

  const uzs = (n) =>
    (Number(n) || 0).toLocaleString("uz-UZ", { maximumFractionDigits: 0 }) +
    " UZS";

  const onChange = (k, v) => setFilters((p) => ({ ...p, [k]: v }));

  return (
    <div className="withdraw-page">
      <h1 className="page-title">Yechib olish</h1>

      <div className="top-grid">
        {/* Card (chap) */}
        <div className="stat-card one">
          <div className="left-bar" />
          <div className="card-body">
            <div className="headline">
              Jami yechib olishlar: <b>{uzs(total)}</b>{" "}
              <span className="period">
                ({filters.from || "—"} — {filters.to || "—"})
              </span>
            </div>
            <div className="sub">
              <FiCalendar /> <span>Hisob-kitob davri</span>
            </div>
          </div>
          <div className="card-icon">
            <FiLayers />
          </div>
        </div>

        {/* Chart placeholder (o‘ng) */}
        <div className="chart-card">
          <div className="chart-body">
            <div className="spinner" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-row">
        <div className="f-item">
          <label>Sanadan boshlab</label>
          <div className="input ic">
            <FiCalendar />
            <input
              type="date"
              value={filters.from}
              onChange={(e) => onChange("from", e.target.value)}
            />
          </div>
        </div>

        <div className="f-item">
          <label>Sana bo‘yicha</label>
          <div className="input ic">
            <FiCalendar />
            <input
              type="date"
              value={filters.to}
              onChange={(e) => onChange("to", e.target.value)}
            />
          </div>
        </div>

        <div className="f-item grow">
          <label>Ism yoki Telefon</label>
          <input
            className="input"
            type="text"
            placeholder="Talaba yoki telefon"
            value={filters.nameOrPhone}
            onChange={(e) => onChange("nameOrPhone", e.target.value)}
          />
        </div>

        <div className="f-item">
          <label>Sum</label>
          <input
            className="input"
            type="number"
            placeholder="Sum"
            value={filters.amount}
            onChange={(e) => onChange("amount", e.target.value)}
          />
        </div>

        <div className="f-item">
          <label>Kurs</label>
          <select
            className="input"
            value={filters.course}
            onChange={(e) => onChange("course", e.target.value)}
          >
            <option>Tanlang</option>
            <option>Frontend Bootcamp</option>
            <option>React Advanced</option>
          </select>
        </div>

        <div className="f-item">
          <button className="filter-btn">Filtr</button>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrap">
        <table className="withdraw-table">
          <thead>
            <tr>
              <th>Sana</th>
              <th>Talaba ismi</th>
              <th>Sum</th>
              <th>Izoh</th>
              <th>Xodim</th>
              <th>Harakatlar</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty">
                  Ko‘rsatiladigan ma’lumotlar yo‘q
                </td>
              </tr>
            ) : (
              list.map((r) => (
                <tr key={r.id} className="t-row">
                  <td>{r.date.split("-").reverse().join(".")}</td>
                  <td>{r.student}</td>
                  <td>{uzs(r.amount)}</td>
                  <td>{r.note || "-"}</td>
                  <td>{r.staff || "-"}</td>
                  <td className="actions">
                    <button className="round download" title="Yuklab olish">
                      <FiDownload />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
