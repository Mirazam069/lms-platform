import React, { useMemo, useState } from "react";
import "./Salary.css";
import {
  FiChevronDown,
  FiSettings,
  FiCalendar,
  FiEdit2,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";

const METHODS = [
  { value: "fixed", label: "O‘zgarmas (so‘m)" },
  { value: "percent_course", label: "Kursdan %" },
  { value: "percent_group", label: "Guruhdan %" },
  { value: "percent_student", label: "Talabadan %" },
];

export default function Salary() {
  const [panelOpen, setPanelOpen] = useState(true);

  // 1) Global parametr
  const [global, setGlobal] = useState({ amount: "", type: "fixed" });

  // 2) Individual qoidalar
  const [form, setForm] = useState({ method: "", amount: "", type: "fixed" });
  const [rules, setRules] = useState([]);

  const currentMonth = useMemo(
    () => new Date().toISOString().slice(0, 7),
    []
  );

  const addRule = () => {
    if (!form.method) return alert("Hisoblash usuli tanlanmagan.");
    if (!form.amount) return alert("Miqdor kiritilmagan.");
    const id = rules.length ? Math.max(...rules.map((r) => r.id)) + 1 : 1;
    setRules((p) => [
      ...p,
      {
        id,
        method: form.method,
        amount: Number(form.amount),
        type: form.type, // fixed | percent
        createdAt: new Date().toISOString().slice(0, 10),
        updatedAt: "-",
      },
    ]);
    setForm({ method: "", amount: "", type: "fixed" });
  };

  const removeRule = (id) => setRules((p) => p.filter((r) => r.id !== id));

  const totalPreview = useMemo(() => 0, [rules, global]);

  return (
    <div className="salaryx-page">
      <h1 className="sx-title">Ish haqi</h1>

      <section className="sx-card">
        <button
          className="sx-accordion"
          onClick={() => setPanelOpen((v) => !v)}
          aria-expanded={panelOpen}
        >
          <div className="sx-acc-left">
            <span className="sx-badge-gear">
              <FiSettings />
            </span>
            <span className="sx-acc-title">Ish haqi kalkulyatorini sozlash</span>
          </div>
          <FiChevronDown className={`sx-acc-chev ${panelOpen ? "open" : ""}`} />
        </button>

        <div className={`sx-acc-body ${panelOpen ? "show" : ""}`}>
          {/* STEP 1 */}
          <div className="sx-step">
            <div className="sx-step-num">1</div>
            <div className="sx-step-body">
              <div className="sx-step-title">
                Barcha o‘qituvchilar uchun standart xarajat parametrlarini belgilang
              </div>

              <div className="sx-row">
                <div className="sx-col grow">
                  <label className="sx-label">Xarajat qiymati</label>
                  <input
                    className="sx-input"
                    type="number"
                    min="0"
                    placeholder="Masalan: 100000"
                    value={global.amount}
                    onChange={(e) =>
                      setGlobal((p) => ({ ...p, amount: e.target.value }))
                    }
                  />
                </div>

                <div className="sx-col">
                  <label className="sx-label">&nbsp;</label>
                  <div className="sx-select">
                    <select
                      value={global.type}
                      onChange={(e) =>
                        setGlobal((p) => ({ ...p, type: e.target.value }))
                      }
                    >
                      <option value="fixed">O‘zgarmas</option>
                      <option value="percent">Foiz (%)</option>
                    </select>
                    <FiChevronDown className="sx-select-chev" />
                  </div>
                </div>

                <div className="sx-col">
                  <label className="sx-label">&nbsp;</label>
                  <button className="sx-btn ghost">
                    <FiPlus /> Qo‘shish
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="sx-step">
            <div className="sx-step-num two">2</div>
            <div className="sx-step-body">
              <div className="sx-step-title">
                O‘qituvchi / Kurs / Guruh / Talaba uchun individual hisob-kitob qoidalari
              </div>

              <div className="sx-row">
                <div className="sx-col">
                  <label className="sx-label">Hisoblash usuli</label>
                  <div className="sx-select">
                    <select
                      value={form.method}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, method: e.target.value }))
                      }
                    >
                      <option value="">Select option</option>
                      {METHODS.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="sx-select-chev" />
                  </div>
                </div>

                <div className="sx-col grow">
                  <label className="sx-label">Xarajat qiymati</label>
                  <input
                    className="sx-input"
                    type="number"
                    min="0"
                    value={form.amount}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, amount: e.target.value }))
                    }
                  />
                </div>

                <div className="sx-col">
                  <label className="sx-label">&nbsp;</label>
                  <div className="sx-select">
                    <select
                      value={form.type}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, type: e.target.value }))
                      }
                    >
                      <option value="fixed">O‘zgarmas</option>
                      <option value="percent">Foiz (%)</option>
                    </select>
                    <FiChevronDown className="sx-select-chev" />
                  </div>
                </div>

                <div className="sx-col">
                  <label className="sx-label">&nbsp;</label>
                  <button className="sx-btn ghost" onClick={addRule}>
                    <FiPlus /> Qo‘shish
                  </button>
                </div>
              </div>

              {/* Jadval */}
              <div className="sx-table-wrap">
                <table className="sx-table">
                  <thead>
                    <tr>
                      <th>Hisoblash usuli</th>
                      <th>Maosh turi</th>
                      <th>Miqdori</th>
                      <th>Kurs</th>
                      <th>Guruh</th>
                      <th>O‘qituvchi</th>
                      <th>Talaba</th>
                      <th>Yaratilgan</th>
                      <th>Yangilangan</th>
                      <th>Amallar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rules.length === 0 ? (
                      <tr>
                        <td className="sx-empty" colSpan={10}>
                          Bo‘sh
                        </td>
                      </tr>
                    ) : (
                      rules.map((r) => (
                        <tr key={r.id}>
                          <td>
                            {METHODS.find((m) => m.value === r.method)?.label}
                          </td>
                          <td>{r.type === "fixed" ? "O‘zgarmas" : "Foiz"}</td>
                          <td>
                            {Number(r.amount).toLocaleString("uz-UZ", {
                              maximumFractionDigits: 0,
                            })}
                          </td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>{r.createdAt}</td>
                          <td>{r.updatedAt}</td>
                          <td className="sx-actions">
                            <button className="sx-iconbtn" title="Tahrirlash">
                              <FiEdit2 />
                            </button>
                            <button
                              className="sx-iconbtn danger"
                              title="O‘chirish"
                              onClick={() => removeRule(r.id)}
                            >
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Oy va tugmalar */}
          <div className="sx-footer">
            <div className="sx-month">
              <FiCalendar />
              <input type="month" defaultValue={currentMonth} />
            </div>
            <div className="sx-right">
              <button className="sx-btn pill purple">Hisoblang</button>
              <button className="sx-btn pill green">E’lon qilish</button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo preview */}
      <div className="sx-preview">
        Jami: <strong>{totalPreview.toLocaleString("uz-UZ")} UZS</strong>
      </div>
    </div>
  );
}
