import React, { useMemo, useState } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiFilter,
  FiDownload,
  FiPhone,
  FiMail,
  FiCheck,
  FiArchive,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import "./Debtors.css";

/* ======= Demo ma'lumotlar ======= */
const GROUPS = ["A1", "A2", "B1", "Kids-A", "SAT-Prep"];
const COURSES = ["Ingliz tili", "Matematika", "React", "Backend", "IELTS"];
const INITIAL = [
  { id: 1,  name: "Asadbek Qodirov",   phone: "+998 90 111 22 33", course: "Ingliz tili", group: "A1",      status: "active",   lastInvoice: "2025-08-05", debt: 250000 },
  { id: 2,  name: "Malika Isroilova",  phone: "+998 93 555 66 77", course: "Matematika", group: "B1",      status: "active",   lastInvoice: "2025-08-12", debt: 0 },
  { id: 3,  name: "Sirojiddin",        phone: "+998 97 700 80 90", course: "React",       group: "SAT-Prep",status: "archived", lastInvoice: "2025-07-25", debt: 180000 },
  { id: 4,  name: "Ziyoda",            phone: "+998 91 222 33 44", course: "Ingliz tili", group: "Kids-A",  status: "active",   lastInvoice: "2025-08-20", debt: 75000 },
  { id: 5,  name: "Javlon",            phone: "+998 88 123 45 67", course: "IELTS",       group: "A2",      status: "active",   lastInvoice: "2025-08-10", debt: 320000 },
  { id: 6,  name: "Muhriddin",         phone: "+998 90 444 55 66", course: "Backend",     group: "A2",      status: "active",   lastInvoice: "2025-08-18", debt: 120000 },
  { id: 7,  name: "Aziza",             phone: "+998 95 700 11 22", course: "React",       group: "B1",      status: "active",   lastInvoice: "2025-08-22", debt: 0 },
  { id: 8,  name: "Kamola",            phone: "+998 99 777 88 99", course: "IELTS",       group: "A1",      status: "active",   lastInvoice: "2025-08-02", debt: 210000 },
  { id: 9,  name: "Sardor",            phone: "+998 33 333 44 55", course: "Matematika",  group: "B1",      status: "archived", lastInvoice: "2025-07-28", debt: 40000 },
  { id: 10, name: "Dildora",           phone: "+998 94 101 02 03", course: "Ingliz tili", group: "Kids-A",  status: "active",   lastInvoice: "2025-08-11", debt: 95000 },
];

/* ======= Helpers ======= */
const money = (n) =>
  (n || 0).toLocaleString("uz-UZ", { maximumFractionDigits: 0 }) + " UZS";

const phoneTel = (s) => (s || "").replace(/[^\d+]/g, "");

const DEBT_STEPS = [0, 50000, 100000, 200000, 300000, 500000, 1000000];

export default function Debtors() {
  /* ---- Data ---- */
  const [rows, setRows] = useState(INITIAL);

  /* ---- Sort ---- */
  const [sort, setSort] = useState({ key: "debt", dir: "desc" }); // asc | desc
  const toggleSort = (key) =>
    setSort((p) => (p.key === key ? { key, dir: p.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));

  /* ---- Filter draft (form) & applied ---- */
  const [draft, setDraft] = useState({
    searchBy: "name", // name | phone | course | group
    q: "",
    status: "active", // active | archived | all
    group: "",
    course: "",
    minDebt: "",
    maxDebt: "",
    from: "",
    to: "",
    onlyWithDebt: true,
  });
  const [applied, setApplied] = useState(draft);
  const [formError, setFormError] = useState("");

  const onApply = () => {
    // simple validation
    if (draft.minDebt !== "" && draft.maxDebt !== "" && Number(draft.minDebt) > Number(draft.maxDebt)) {
      setFormError("Pastdan yuqori qiymat kichik bo‘lishi mumkin emas.");
      return;
    }
    setFormError("");
    setApplied(draft);
  };
  const onReset = () => {
    const empty = {
      searchBy: "name",
      q: "",
      status: "active",
      group: "",
      course: "",
      minDebt: "",
      maxDebt: "",
      from: "",
      to: "",
      onlyWithDebt: true,
    };
    setDraft(empty);
    setApplied(empty);
    setFormError("");
  };

  /* ---- Derived: filtered + sorted ---- */
  const filtered = useMemo(() => {
    const d = rows.filter((r) => {
      if (applied.onlyWithDebt && r.debt <= 0) return false;
      if (applied.status !== "all" && r.status !== applied.status) return false;
      if (applied.group && r.group !== applied.group) return false;
      if (applied.course && r.course !== applied.course) return false;
      if (applied.minDebt !== "" && r.debt < Number(applied.minDebt)) return false;
      if (applied.maxDebt !== "" && r.debt > Number(applied.maxDebt)) return false;
      if (applied.from && r.lastInvoice < applied.from) return false;
      if (applied.to && r.lastInvoice > applied.to) return false;
      const q = (applied.q || "").toLowerCase().trim();
      if (q) {
        const field = String(r[applied.searchBy] || "").toLowerCase();
        if (!field.includes(q)) return false;
      }
      return true;
    });

    const arr = [...d].sort((a, b) => {
      const { key, dir } = sort;
      const va = a[key];
      const vb = b[key];
      if (va < vb) return dir === "asc" ? -1 : 1;
      if (va > vb) return dir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [rows, applied, sort]);

  const totalDebt = useMemo(
    () => filtered.reduce((s, r) => s + (r.debt || 0), 0),
    [filtered]
  );

  /* ---- Select / Bulk ---- */
  const [selectedIds, setSelectedIds] = useState([]);
  const allOnPageSelected = (pageItems) =>
    pageItems.length > 0 && pageItems.every((r) => selectedIds.includes(r.id));
  const toggleSelectRow = (id) =>
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const clearSelection = () => setSelectedIds([]);

  /* ---- Row/Bulk actions ---- */
  const markPaid = (ids) =>
    setRows((p) => p.map((r) => (ids.includes(r.id) ? { ...r, debt: 0 } : r)));
  const toggleArchive = (ids) =>
    setRows((p) =>
      p.map((r) =>
        ids.includes(r.id) ? { ...r, status: r.status === "active" ? "archived" : "active" } : r
      )
    );
  const remind = (ids) => {
    const list = rows.filter((r) => ids.includes(r.id));
    alert(
      "SMS yuborildi:\n" +
        list.map((r) => `${r.name} — ${money(r.debt)} (${r.phone})`).join("\n")
    );
  };

  /* ---- Export CSV (filtered or selected) ---- */
  const exportCsv = (onlySelected = false) => {
    const src = onlySelected ? filtered.filter((r) => selectedIds.includes(r.id)) : filtered;
    const headers = ["Name", "Phone", "Course", "Group", "Status", "Last invoice", "Debt (UZS)"];
    const lines = src.map((r) =>
      [r.name, r.phone, r.course, r.group, r.status, r.lastInvoice, r.debt]
        .map((x) => `"${String(x).replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [headers.join(","), ...lines].join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" }); // BOM utf-8
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = onlySelected ? "debtors_selected.csv" : "debtors.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ---- Pagination ---- */
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);
  const go = (p) => setPage(Math.min(pageCount, Math.max(1, p)));
  React.useEffect(() => { setPage(1); clearSelection(); }, [applied, sort]);

  /* ---- UI helpers ---- */
  const SortIcon = ({ col }) => (
    <span className={`sort-ico ${sort.key === col ? sort.dir : ""}`} aria-hidden />
  );

  const toggleSelectAllOnPage = () => {
    const ids = pageItems.map((r) => r.id);
    setSelectedIds((prev) => (allOnPageSelected(pageItems) ? prev.filter((id) => !ids.includes(id)) : [...new Set([...prev, ...ids])]));
  };

  return (
    <div className="debtors">
      {/* Title */}
      <div className="db-head">
        <h1>Debtors</h1>
        <span className="qty">Quantity — {filtered.length}</span>
      </div>

      {/* Total card */}
      <div className="db-total">
        <div className="bar" />
        <div className="sum">Total: {money(totalDebt)}</div>
        <div className="coins" aria-hidden>💰</div>
      </div>

      {/* Filters */}
      <div className="db-filters">
        <label className="db-label">Search</label>
        <div className="search-wrap">
          <div className="search-by">
            <select
              value={draft.searchBy}
              onChange={(e) => setDraft((p) => ({ ...p, searchBy: e.target.value }))}
              aria-label="Search by"
            >
              <option value="name">Name</option>
              <option value="phone">Phone</option>
              <option value="course">Course</option>
              <option value="group">Group</option>
            </select>
            <FiChevronDown />
          </div>
          <div className="search-input">
            <FiSearch />
            <input
              value={draft.q}
              onChange={(e) => setDraft((p) => ({ ...p, q: e.target.value }))}
              placeholder="Search…"
            />
          </div>
        </div>

        <label className="db-label">Status</label>
        <div className="select like">
          <select
            value={draft.status}
            onChange={(e) => setDraft((p) => ({ ...p, status: e.target.value }))}
          >
            <option value="active">Active (Not archived)</option>
            <option value="archived">Archived</option>
            <option value="all">All</option>
          </select>
          <FiChevronDown />
        </div>

        <label className="db-label">Group</label>
        <div className="select like">
          <select
            value={draft.group}
            onChange={(e) => setDraft((p) => ({ ...p, group: e.target.value }))}
          >
            <option value="">Select</option>
            {GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
          <FiChevronDown />
        </div>

        <label className="db-label">Course</label>
        <div className="select like">
          <select
            value={draft.course}
            onChange={(e) => setDraft((p) => ({ ...p, course: e.target.value }))}
          >
            <option value="">Select</option>
            {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <FiChevronDown />
        </div>

        <label className="db-label">Debt (from)</label>
        <div className="select like">
          <select
            value={draft.minDebt}
            onChange={(e) => setDraft((p) => ({ ...p, minDebt: e.target.value }))}
          >
            <option value="">Select</option>
            {DEBT_STEPS.map((n) => <option key={n} value={n}>{money(n)}</option>)}
          </select>
          <FiChevronDown />
        </div>

        <label className="db-label">Debt (to)</label>
        <div className="select like">
          <select
            value={draft.maxDebt}
            onChange={(e) => setDraft((p) => ({ ...p, maxDebt: e.target.value }))}
          >
            <option value="">Select</option>
            {DEBT_STEPS.map((n) => <option key={n} value={n}>{money(n)}</option>)}
          </select>
          <FiChevronDown />
        </div>

        <label className="db-label">Date from</label>
        <div className="date like">
          <input
            type="date"
            value={draft.from}
            onChange={(e) => setDraft((p) => ({ ...p, from: e.target.value }))}
          />
        </div>

        <label className="db-label">Date to</label>
        <div className="date like">
          <input
            type="date"
            value={draft.to}
            onChange={(e) => setDraft((p) => ({ ...p, to: e.target.value }))}
          />
        </div>

        <div className="toggle-wrap">
          <label className="toggle">
            <input
              type="checkbox"
              checked={draft.onlyWithDebt}
              onChange={(e) => setDraft((p) => ({ ...p, onlyWithDebt: e.target.checked }))}
            />
            <span>Only with debt</span>
          </label>
        </div>

        <div className="filter-actions">
          <button className="btn-primary" onClick={onApply}><FiFilter /> Filter</button>
          <button className="btn-ghost" onClick={onReset}><FiRefreshCw /> Reset</button>
          <button className="btn-ghost" onClick={() => exportCsv(false)}><FiDownload /> Export</button>
        </div>

        {formError && <div className="form-error">{formError}</div>}
      </div>

      {/* Bulk toolbar */}
      {selectedIds.length > 0 && (
        <div className="db-bulk">
          <div className="left">
            Selected: <b>{selectedIds.length}</b>
          </div>
          <div className="right">
            <button className="btn-ghost" onClick={() => remind(selectedIds)}>Remind (SMS)</button>
            <button className="btn-ghost" onClick={() => markPaid(selectedIds)}><FiCheck /> Mark paid</button>
            <button className="btn-ghost" onClick={() => toggleArchive(selectedIds)}><FiArchive /> Toggle archive</button>
            <button className="btn-ghost" onClick={() => exportCsv(true)}><FiDownload /> Export selected</button>
            <button className="btn-ghost" onClick={clearSelection}>Clear</button>
          </div>
        </div>
      )}

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="db-empty">No data to display</div>
      ) : (
        <>
          <div className="db-table-wrap">
            <table className="db-table">
              <thead>
                <tr>
                  <th className="check">
                    <input
                      type="checkbox"
                      checked={allOnPageSelected(pageItems)}
                      onChange={toggleSelectAllOnPage}
                    />
                  </th>
                  <th onClick={() => toggleSort("name")}>Student <SortIcon col="name" /></th>
                  <th onClick={() => toggleSort("course")}>Course <SortIcon col="course" /></th>
                  <th onClick={() => toggleSort("group")}>Group <SortIcon col="group" /></th>
                  <th onClick={() => toggleSort("lastInvoice")}>Last invoice <SortIcon col="lastInvoice" /></th>
                  <th onClick={() => toggleSort("debt")} className="right">
                    Debt <SortIcon col="debt" />
                  </th>
                  <th>Status</th>
                  <th className="right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((r) => (
                  <tr key={r.id} className={selectedIds.includes(r.id) ? "row-selected" : ""}>
                    <td className="check">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(r.id)}
                        onChange={() => toggleSelectRow(r.id)}
                      />
                    </td>
                    <td>
                      <div className="cell-main">
                        <div className="avatar">{r.name.charAt(0).toUpperCase()}</div>
                        <div className="info">
                          <div className="nm">{r.name}</div>
                          <div className="sub"><a href={`tel:${phoneTel(r.phone)}`}>{r.phone}</a></div>
                        </div>
                      </div>
                    </td>
                    <td>{r.course}</td>
                    <td>{r.group}</td>
                    <td>{r.lastInvoice}</td>
                    <td className="right strong">{money(r.debt)}</td>
                    <td>
                      <span className={`badge ${r.status}`}>{r.status}</span>
                    </td>
                    <td className="right">
                      <div className="row-actions">
                        <button className="ico" title="Call" onClick={() => (window.location.href = `tel:${phoneTel(r.phone)}`)}><FiPhone/></button>
                        <button className="ico" title="Mail" onClick={() => alert("Mail!") }><FiMail/></button>
                        <button className="ico" title="Remind (SMS)" onClick={() => remind([r.id])}><FiCheck/></button>
                        <button className="ico" title={r.debt ? "Mark as paid" : "Already 0"} onClick={() => markPaid([r.id])} disabled={!r.debt}><FiCheck/></button>
                        <button className="ico" title={r.status === "active" ? "Archive" : "Unarchive"} onClick={() => toggleArchive([r.id])}><FiArchive/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={5} className="right strong">Total on page:</td>
                  <td className="right strong">
                    {money(pageItems.reduce((s, r) => s + (r.debt || 0), 0))}
                  </td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Pagination */}
          <div className="db-pagi">
            <button className="pbtn" onClick={() => go(page - 1)} disabled={page === 1}>
              <FiChevronLeft /> Prev
            </button>
            <div className="pcnt">
              Page <b>{page}</b> / {pageCount}
            </div>
            <button className="pbtn" onClick={() => go(page + 1)} disabled={page === pageCount}>
              Next <FiChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
