import React, { useMemo, useState } from "react";
import "./FinanceAll.css";
import {
  FiCalendar,
  FiDownload,
  FiChevronRight,
  FiFilter,
  FiLayers,
  FiUser,
  FiPhone,
  FiDollarSign,
} from "react-icons/fi";

const initialPayments = [
  {
    id: 1,
    date: "2025-08-09",
    student: "Mirazam",
    amount: 300000,
    method: "Naqd pul",
    teacher: "Mirazam",
    note: "",
    staff: "Mirazam",
  },
  // Yana misollar qo‘shishingiz mumkin
];

export default function FinanceAll() {
  const [filters, setFilters] = useState({
    from: "2025-08-01",
    to: "2025-08-31",
    nameOrPhone: "",
    group: "",
    course: "",
    teacher: "",
    method: "",
    amount: "",
    staff: "",
    createdFrom: "",
    createdTo: "",
  });

  const payments = useMemo(() => {
    // Demo filtresi (faqat ism/telefon va sana bo‘yicha)
    return initialPayments.filter((p) => {
      const inRange =
        (!filters.from || p.date >= filters.from) &&
        (!filters.to || p.date <= filters.to);
      const q = filters.nameOrPhone.trim().toLowerCase();
      const matchQuery =
        !q ||
        p.student.toLowerCase().includes(q) ||
        (p.phone || "").toLowerCase().includes(q);
      return inRange && matchQuery;
    });
  }, [filters]);

  const totalAmount = useMemo(
    () => payments.reduce((s, p) => s + Number(p.amount || 0), 0),
    [payments]
  );

  const onChange = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const uzs = (n) =>
    (Number(n) || 0).toLocaleString("uz-UZ", { maximumFractionDigits: 0 }) +
    " UZS";

  return (
    <div className="finance-all">
      <h1 className="page-title">Barcha to‘lovlar</h1>

      <div className="top-grid">
        {/* Stat cards (chap) */}
        <div className="stats-col">
          <div className="stat-card">
            <div className="stat-bar" />
            <div className="stat-body">
              <div className="stat-title">To‘lovlar miqdori:</div>
              <div className="stat-amount">{uzs(totalAmount)}</div>
              <div className="stat-period">
                <FiCalendar />
                <span>
                  {filters.from || "—"} — {filters.to || "—"}
                </span>
              </div>
            </div>
            <div className="stat-icon">
              <FiLayers />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-bar" />
            <div className="stat-body">
              <div className="stat-title">Sof foyda miqdori:</div>
              <div className="stat-amount">{uzs(totalAmount)}</div>
              <div className="stat-period">
                <FiCalendar />
                <span>
                  {filters.from || "—"} — {filters.to || "—"}
                </span>
              </div>
              <button className="details-btn">
                Details <FiChevronRight />
              </button>
            </div>
            <div className="stat-icon">
              <FiLayers />
            </div>
          </div>
        </div>

        {/* Chart box (o‘ng) */}
        <div className="chart-card">
          <div className="chart-header">
            <span>To‘lovlar grafigi</span>
          </div>
          <div className="chart-placeholder">
            <div className="spinner" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-grid">
        <div className="f-field">
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

        <div className="f-field">
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

        <div className="f-field">
          <label>Ism yoki Telefon</label>
          <div className="input ic">
            <FiUser />
            <input
              type="text"
              placeholder="Ism yoki telefon"
              value={filters.nameOrPhone}
              onChange={(e) => onChange("nameOrPhone", e.target.value)}
            />
          </div>
        </div>

        <div className="f-field">
          <label>Guruhni tanlash</label>
          <div className="select">
            <select
              value={filters.group}
              onChange={(e) => onChange("group", e.target.value)}
            >
              <option value="">Tanlang</option>
              <option>Frontend A-1</option>
              <option>React Night</option>
            </select>
          </div>
        </div>

        <div className="f-field">
          <label>Kurs</label>
          <div className="select">
            <select
              value={filters.course}
              onChange={(e) => onChange("course", e.target.value)}
            >
              <option value="">Tanlang</option>
              <option>Frontend Bootcamp</option>
              <option>React Advanced</option>
            </select>
          </div>
        </div>

        <div className="f-field">
          <label>O‘qituvchi</label>
          <div className="select">
            <select
              value={filters.teacher}
              onChange={(e) => onChange("teacher", e.target.value)}
            >
              <option value="">Tanlang</option>
              <option>Javlon Bek</option>
              <option>Dilnoza Karimova</option>
            </select>
          </div>
        </div>

        <div className="f-field">
          <label>To‘lov turi</label>
          <div className="select">
            <select
              value={filters.method}
              onChange={(e) => onChange("method", e.target.value)}
            >
              <option value="">Tanlang</option>
              <option>Naqd pul</option>
              <option>Plastik</option>
              <option>Click/Payme</option>
            </select>
          </div>
        </div>

        <div className="f-field">
          <label>Sum</label>
          <div className="input ic">
            <FiDollarSign />
            <input
              type="number"
              min="0"
              placeholder="Sum"
              value={filters.amount}
              onChange={(e) => onChange("amount", e.target.value)}
            />
          </div>
        </div>

        <div className="f-field">
          <label>Xodimni ismi</label>
          <div className="select">
            <select
              value={filters.staff}
              onChange={(e) => onChange("staff", e.target.value)}
            >
              <option value="">Tanlang</option>
              <option>Mirazam</option>
              <option>Javlon</option>
            </select>
          </div>
        </div>

        <div className="f-field">
          <label>Yaratilgan sanadan</label>
          <div className="input ic">
            <FiCalendar />
            <input
              type="date"
              value={filters.createdFrom}
              onChange={(e) => onChange("createdFrom", e.target.value)}
            />
          </div>
        </div>

        <div className="f-field">
          <label>Yaratilgan sanagacha</label>
          <div className="input ic">
            <FiCalendar />
            <input
              type="date"
              value={filters.createdTo}
              onChange={(e) => onChange("createdTo", e.target.value)}
            />
          </div>
        </div>

        <div className="f-actions">
          <button className="filter-btn">
            <FiFilter />
            Filtr
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrap">
        <table className="payments-table">
          <thead>
            <tr>
              <th>Sana</th>
              <th>Talaba ismi</th>
              <th>Sum</th>
              <th>To‘lov turi</th>
              <th>O‘qituvchi</th>
              <th>Izoh</th>
              <th>Xodim</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <tr key={p.id} className="t-row">
                <td>{p.date.split("-").reverse().join(".")}</td>
                <td>{p.student}</td>
                <td>{uzs(p.amount)}</td>
                <td>{p.method}</td>
                <td>{p.teacher || "-"}</td>
                <td>{p.note || "-"}</td>
                <td>{p.staff || "-"}</td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan={7} className="empty">
                  Ko‘rsatiladigan ma’lumotlar yo‘q
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Floating Export */}
      <button className="floating-export" title="Export (Excel/PDF)">
        <FiDownload />
      </button>
    </div>
  );
}
