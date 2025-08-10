import React, { useMemo, useState } from "react";
import "./Expenses.css";
import { FiCalendar, FiLayers, FiChevronDown, FiDownload } from "react-icons/fi";

const initialExpenses = [
  // Demo ma'lumotlar (xohlasangiz bo'sh qoldiring)
  // { id:1, date:"2025-08-05", name:"Kantselyariya", category:"Materiallar", receiver:"Office Market", method:"Naqd pul", amount:250000, staff:"Mirazam" },
];

const categories = ["Materiallar", "Kommunal", "Marketing", "Ijaralar", "Transport"];

export default function Expenses() {
  // Stats/filters
  const [filters, setFilters] = useState({
    from: "2025-08-01",
    to: "2025-08-31",
    name: "",
    category: "",
    receiver: "",
    method: "",
    staff: "",
  });

  // Right form state
  const [form, setForm] = useState({
    name: "",
    date: "2025-08-09",
    category: "",
    receiver: "",
    amount: "",
    method: "", // "Naqd pul" | "Plastik karta" | "Click" | "Bank hisobi" | "Payme" | "Uzum" | "Humo"
  });

  const exp = useMemo(() => {
    const f = filters;
    return initialExpenses.filter((r) => {
      const inRange =
        (!f.from || r.date >= f.from) && (!f.to || r.date <= f.to);
      return (
        inRange &&
        (f.name ? r.name.toLowerCase().includes(f.name.toLowerCase()) : true) &&
        (f.category ? r.category === f.category : true) &&
        (f.receiver ? (r.receiver || "").toLowerCase().includes(f.receiver.toLowerCase()) : true) &&
        (f.method ? r.method === f.method : true) &&
        (f.staff ? (r.staff || "").toLowerCase().includes(f.staff.toLowerCase()) : true)
      );
    });
  }, [filters]);

  const total = useMemo(
    () => exp.reduce((s, r) => s + Number(r.amount || 0), 0),
    [exp]
  );

  const uzs = (n) =>
    (Number(n) || 0).toLocaleString("uz-UZ", { maximumFractionDigits: 0 }) +
    " UZS";

  const onFilter = (k, v) => setFilters((p) => ({ ...p, [k]: v }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name?.trim()) return alert("Nomi majburiy.");
    if (!form.date) return alert("Sana majburiy.");
    if (!form.method) return alert("To‘lov turi majburiy.");
    // Bu yerda haqiqiy API chaqiruvi bo‘ladi (POST /expenses)
    alert("Xarajat saqlandi ✅ (demo)");
    setForm({
      name: "",
      date: filters.to || "2025-08-09",
      category: "",
      receiver: "",
      amount: "",
      method: "",
    });
  };

  return (
    <div className="expenses-page">
      <h1 className="page-title">Xarajatlar</h1>

      <div className="top-area">
        {/* Stat bar + chart */}
        <div className="left-col">
          <div className="stat-card">
            <div className="left-bar" />
            <div className="stat-body">
              <div className="stat-title">Jami xarajatlar miqdori:</div>
              <div className="stat-amount">{uzs(total)}</div>
            </div>
            <div className="stat-icon">
              <FiLayers />
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-legend">
              <span className="dot red" />
              <span>Xarajatlar</span>
            </div>
            <div className="chart-placeholder">
              <div className="spinner" />
            </div>
          </div>
        </div>

        {/* Right form */}
        <aside className="expense-form">
          <div className="form-head">Yangi xarajatlar</div>

          <form onSubmit={onSubmit}>
            <label>Nomi <span className="req">*</span></label>
            <input
              className="inp"
              type="text"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Masalan: Kantselyariya"
            />

            <label>Sana <span className="req">*</span></label>
            <div className="inp ic">
              <FiCalendar />
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
              />
            </div>

            <label>Turkum</label>
            <div className="select">
              <select
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              >
                <option value="">Tanlang</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <FiChevronDown className="chev" />
            </div>

            <label>Oluvchi</label>
            <input
              className="inp"
              type="text"
              value={form.receiver}
              onChange={(e) => setForm((p) => ({ ...p, receiver: e.target.value }))}
              placeholder="Masalan: Office Market"
            />

            <label>Sum <span className="req">*</span></label>
            <input
              className="inp"
              type="number"
              min="0"
              value={form.amount}
              onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))}
              placeholder="250000"
            />

            <label>To‘lov turi <span className="req">*</span></label>
            <div className="radios">
              {["Naqd pul","Plastik karta","Click","Bank hisobi","Payme","Uzum","Humo"].map((m) => (
                <label key={m} className="radio">
                  <input
                    type="radio"
                    name="method"
                    value={m}
                    checked={form.method === m}
                    onChange={(e) => setForm((p) => ({ ...p, method: e.target.value }))}
                  />
                  <span>{m}</span>
                </label>
              ))}
            </div>

            <button type="submit" className="save-btn">Saqlash</button>
          </form>
        </aside>
      </div>

      {/* Filters row */}
      <div className="filters-row">
        <div className="f-item">
          <label>Sanadan boshlab <span className="req">*</span></label>
          <div className="inp ic">
            <FiCalendar />
            <input
              type="date"
              value={filters.from}
              onChange={(e) => onFilter("from", e.target.value)}
            />
          </div>
        </div>

        <div className="f-item">
          <label>Sana bo‘yicha <span className="req">*</span></label>
          <div className="inp ic">
            <FiCalendar />
            <input
              type="date"
              value={filters.to}
              onChange={(e) => onFilter("to", e.target.value)}
            />
          </div>
        </div>

        <div className="f-item grow">
          <label>Nomi</label>
          <input
            className="inp"
            type="text"
            value={filters.name}
            onChange={(e) => onFilter("name", e.target.value)}
          />
        </div>

        <div className="f-item">
          <label>Kategoriyani tanlang</label>
          <div className="select">
            <select
              value={filters.category}
              onChange={(e) => onFilter("category", e.target.value)}
            >
              <option value="">Tanlang</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <FiChevronDown className="chev" />
          </div>
        </div>

        <div className="f-item">
          <label>Oluvchi</label>
          <input
            className="inp"
            type="text"
            value={filters.receiver}
            onChange={(e) => onFilter("receiver", e.target.value)}
          />
        </div>

        <div className="f-item">
          <label>To‘lov turi</label>
          <div className="select">
            <select
              value={filters.method}
              onChange={(e) => onFilter("method", e.target.value)}
            >
              <option value="">Tanlang</option>
              {["Naqd pul","Plastik karta","Click","Bank hisobi","Payme","Uzum","Humo"].map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <FiChevronDown className="chev" />
          </div>
        </div>

        <div className="f-item">
          <label>Xodimni ismi</label>
          <div className="select">
            <select
              value={filters.staff}
              onChange={(e) => onFilter("staff", e.target.value)}
            >
              <option value="">Tanlang</option>
              <option>Mirazam</option>
              <option>Javlon</option>
            </select>
            <FiChevronDown className="chev" />
          </div>
        </div>

        <div className="f-item">
          <button className="filter-btn">Filtr</button>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrap">
        <table className="expenses-table">
          <thead>
            <tr>
              <th>Sana</th>
              <th>Turkum</th>
              <th>Nomi</th>
              <th>Oluvchi</th>
              <th>To‘lov turi</th>
              <th>Sum</th>
              <th>Xodim</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {exp.length === 0 ? (
              <tr>
                <td className="empty" colSpan={8}>Ko‘rsatiladigan ma’lumotlar yo‘q</td>
              </tr>
            ) : (
              exp.map((r) => (
                <tr key={r.id} className="t-row">
                  <td>{r.date.split("-").reverse().join(".")}</td>
                  <td>{r.category || "-"}</td>
                  <td>{r.name}</td>
                  <td>{r.receiver || "-"}</td>
                  <td>{r.method}</td>
                  <td>{uzs(r.amount)}</td>
                  <td>{r.staff || "-"}</td>
                  <td className="actions">
                    <button className="round">
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
