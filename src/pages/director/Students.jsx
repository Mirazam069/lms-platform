import React, { useMemo, useState } from "react";
import "./Students.css";
import {
  FiSearch,
  FiChevronDown,
  FiSettings,
  FiTrash2,
  FiMail,
  FiMessageCircle,
  FiMoreVertical,
  FiX,
  FiEdit2,
  FiCreditCard,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiFolder,
} from "react-icons/fi";

/* ------ Demo ma'lumotlar ------ */
const COURSES = ["Ingliz tili", "Matematika", "React", "Backend", "IELTS"];
const TAGS = ["Hot", "Warm", "Cold"];
const STATUSES = ["active", "archived"];
const FIN = ["ok", "debtor"];

function iso(d) {
  // 2025-08-06
  return d.toISOString().slice(0, 10);
}

const seed = [
  { id: 1,  name: "Nodir",    phone: "90 900 12 12",  course: "Ingliz tili",  groups: ["A1"], teachers: ["Abbos"], start: "2025-08-04", end:"2026-08-04", balance: 0,    tags:["Hot"],    status:"active", fin:"ok",    photo:null, comment:"" },
  { id: 2,  name: "Nodir",    phone: "90 777 12 12",  course: "Ingliz tili",  groups: ["A2"], teachers: ["Abbos"], start: "2025-08-06", end:"2026-08-06", balance: 0,    tags:["Warm"],  status:"active", fin:"ok",    photo:null, comment:"" },
  { id: 3,  name: "Tahmina",  phone: "77 900 07 07",  course: "React",        groups: ["B1"], teachers: ["Aziza"], start: "2025-08-06", end:"2026-04-06", balance: 300000, tags:["Hot"],    status:"active", fin:"debtor", photo:null, comment:"" },
  { id: 4,  name: "Komila",   phone: "95 455 55 55",  course: "IELTS",        groups: ["KIDS"],teachers: ["Aziza"], start: "2025-08-11", end:"2026-02-01", balance: 0,    tags:["Cold"],  status:"archived",fin:"ok",    photo:null, comment:"" },
];

// ko‘rsatish uchun 22 ta qilib ko‘paytiramiz
while (seed.length < 22) {
  const i = seed.length + 1;
  const base = seed[(i % 4)];
  seed.push({
    ...base,
    id: i,
    name: base.name + " " + i,
  });
}

/* ------ Helpers ------ */
const telHref = (s) => "tel:" + (s || "").replace(/[^\d+]/g, "");
const money = (n) =>
  (n || 0).toLocaleString("uz-UZ", { maximumFractionDigits: 0 });

/* ------ Ustunlar ro‘yxati ------ */
const DEFAULT_COLS = [
  { key: "photo", label: "Photo", show: true },
  { key: "name", label: "Name", show: true },
  { key: "phone", label: "Phone", show: true },
  { key: "groups", label: "Groups", show: true },
  { key: "teachers", label: "Teachers", show: true },
  { key: "dates", label: "Training dates", show: true },
  { key: "balance", label: "Balance", show: true },
  { key: "comment", label: "Comment", show: true },
];

export default function Students() {
  /* ===== Data ===== */
  const [rows, setRows] = useState(seed);
  const [cols, setCols] = useState(DEFAULT_COLS);

  /* ===== Filters ===== */
  const [filters, setFilters] = useState({
    q: "",
    course: "",
    status: "",
    fin: "",
    tag: "",
    externalId: "",
    start: "",
    end: "",
  });

  const resetFilters = () =>
    setFilters({
      q: "",
      course: "",
      status: "",
      fin: "",
      tag: "",
      externalId: "",
      start: "",
      end: "",
    });

  /* ===== Sorting ===== */
  const [sort, setSort] = useState({ key: "name", dir: "asc" });
  const toggleSortByName = () =>
    setSort((p) => ({
      key: "name",
      dir: p.dir === "asc" ? "desc" : "asc",
    }));

  /* ===== Selection (bulk) ===== */
  const [selected, setSelected] = useState([]); // id[]
  const allOnPageChecked = (pageItems) =>
    pageItems.length > 0 && pageItems.every((r) => selected.includes(r.id));
  const toggleRow = (id) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const toggleAllOnPage = (pageItems) => {
    const ids = pageItems.map((r) => r.id);
    setSelected((prev) =>
      allOnPageChecked(pageItems)
        ? prev.filter((id) => !ids.includes(id))
        : Array.from(new Set([...prev, ...ids]))
    );
  };
  const clearSelection = () => setSelected([]);

  /* ===== Filtered & Sorted ===== */
  const filtered = useMemo(() => {
    const f = rows.filter((r) => {
      const q = filters.q.trim().toLowerCase();
      if (q) {
        if (
          !(r.name || "").toLowerCase().includes(q) &&
          !(r.phone || "").toLowerCase().includes(q)
        )
          return false;
      }
      if (filters.course && r.course !== filters.course) return false;
      if (filters.status && r.status !== filters.status) return false;
      if (filters.fin && r.fin !== filters.fin) return false;
      if (filters.tag && !(r.tags || []).includes(filters.tag)) return false;
      if (filters.start && r.start < filters.start) return false;
      if (filters.end && r.end > filters.end) return false;
      return true;
    });
    const arr = [...f].sort((a, b) => {
      const A = (a[sort.key] || "").toString().toLowerCase();
      const B = (b[sort.key] || "").toString().toLowerCase();
      if (A < B) return sort.dir === "asc" ? -1 : 1;
      if (A > B) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [rows, filters, sort]);

  /* ===== Pagination ===== */
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);
  const go = (p) => setPage(Math.min(pageCount, Math.max(1, p)));
  React.useEffect(() => {
    setPage(1);
    clearSelection();
  }, [filters, sort]);

  /* ===== Modals / Drawers ===== */
  const [showCols, setShowCols] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);

  const [showSMS, setShowSMS] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [smsText, setSmsText] = useState("");
  const [emailText, setEmailText] = useState("");

  const [showPay, setShowPay] = useState(false);
  const [payRow, setPayRow] = useState(null);
  const [payForm, setPayForm] = useState({
    method: "cash",
    group: "",
    amount: "",
    date: iso(new Date()),
    comment: "",
  });

  /* ===== Add / Edit form ===== */
  const [form, setForm] = useState({
    phone: "+998",
    name: "",
    dob: "",
    gender: "",
    comment: "",
    course: "",
  });

  const openAdd = () => {
    setForm({ phone: "+998", name: "", dob: "", gender: "", comment: "", course: "" });
    setEditId(null);
    setShowAdd(true);
  };
  const openEdit = (row) => {
    setEditId(row.id);
    setForm({
      phone: "+998 " + row.phone,
      name: row.name,
      dob: "",
      gender: "",
      comment: row.comment || "",
      course: row.course || "",
    });
    setShowAdd(true);
  };
  const saveStudent = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const phone = form.phone.trim().replace(/^\+998\s?/, "");
    if (!name || !phone) return alert("Name va telefon shart.");
    if (editId == null) {
      const id = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
      setRows((prev) => [
        {
          id,
          name,
          phone,
          course: form.course || "",
          groups: [],
          teachers: [],
          start: iso(new Date()),
          end: iso(new Date(new Date().getFullYear() + 1, 0, 1)),
          balance: 0,
          tags: [],
          status: "active",
          fin: "ok",
          photo: null,
          comment: form.comment || "",
        },
        ...prev,
      ]);
    } else {
      setRows((prev) =>
        prev.map((r) =>
          r.id === editId ? { ...r, name, phone, course: form.course, comment: form.comment } : r
        )
      );
    }
    setShowAdd(false);
  };

  /* ===== Row actions ===== */
  const removeRows = (ids) => {
    if (!ids.length) return;
    if (!window.confirm("Tanlangan talabalarni o‘chirasizmi?")) return;
    setRows((prev) => prev.filter((r) => !ids.includes(r.id)));
    clearSelection();
  };

  const openPayment = (row) => {
    setPayRow(row);
    setPayForm({
      method: "cash",
      group: (row.groups && row.groups[0]) || "",
      amount: "",
      date: iso(new Date()),
      comment: "",
    });
    setShowPay(true);
  };
  const submitPayment = (e) => {
    e.preventDefault();
    const amt = Number(payForm.amount || 0);
    if (!amt) return;
    setRows((prev) =>
      prev.map((r) =>
        r.id === payRow.id ? { ...r, balance: Math.max(0, (r.balance || 0) - amt), fin: ((r.balance || 0) - amt) > 0 ? "debtor" : "ok" } : r
      )
    );
    setShowPay(false);
  };

  /* ===== Columns ===== */
  const toggleCol = (key) =>
    setCols((prev) => prev.map((c) => (c.key === key ? { ...c, show: !c.show } : c)));
  const isShown = (key) => !!cols.find((c) => c.key === key && c.show);

  /* ===== Bulk helpers ===== */
  const openSmsBulk = () => {
    if (!selected.length) return;
    setSmsText("");
    setShowSMS(true);
  };
  const openEmailBulk = () => {
    if (!selected.length) return;
    setEmailText("");
    setShowEmail(true);
  };

  return (
    <div className="students">
      {/* ==== Header ==== */}
      <div className="st-head">
        <h1>Students</h1>
        <span className="qty">Quantity — {filtered.length}</span>

        <button className="columns-btn" onClick={() => setShowCols(true)}>
          <FiSettings /> Columns
        </button>

        <button className="add-btn" onClick={openAdd}>
          ADD NEW
        </button>
      </div>

      {/* ==== Filters ==== */}
      <div className="st-filters">
        <div className="search">
          <FiSearch />
          <input
            value={filters.q}
            onChange={(e) => setFilters((p) => ({ ...p, q: e.target.value }))}
            placeholder="Search by name or phone"
          />
        </div>

        <div className="select like">
          <select
            value={filters.course}
            onChange={(e) => setFilters((p) => ({ ...p, course: e.target.value }))}
          >
            <option value="">By Courses</option>
            {COURSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <FiChevronDown />
        </div>

        <div className="select like">
          <select
            value={filters.status}
            onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))}
          >
            <option value="">Status</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <FiChevronDown />
        </div>

        <div className="select like">
          <select
            value={filters.fin}
            onChange={(e) => setFilters((p) => ({ ...p, fin: e.target.value }))}
          >
            <option value="">Financial situation</option>
            {FIN.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <FiChevronDown />
        </div>

        <div className="select like">
          <select
            value={filters.tag}
            onChange={(e) => setFilters((p) => ({ ...p, tag: e.target.value }))}
          >
            <option value="">By Tags</option>
            {TAGS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <FiChevronDown />
        </div>

        <input
          className="ext"
          value={filters.externalId}
          onChange={(e) => setFilters((p) => ({ ...p, externalId: e.target.value }))}
          placeholder="External ID"
        />

        <input
          className="date"
          type="date"
          value={filters.start}
          onChange={(e) => setFilters((p) => ({ ...p, start: e.target.value }))}
          placeholder="Start date"
        />
        <input
          className="date"
          type="date"
          value={filters.end}
          onChange={(e) => setFilters((p) => ({ ...p, end: e.target.value }))}
          placeholder="End date"
        />

        <button className="ghost" onClick={resetFilters}>
          Reset
        </button>
      </div>

      {/* ==== Bulk selected banner ==== */}
      {selected.length > 0 && (
        <div className="st-selected">
          <div className="lbl">
            {selected.length} students selected
          </div>
          <label className="select-all">
            <input
              type="checkbox"
              checked={selected.length === pageItems.length}
              onChange={() => toggleAllOnPage(pageItems)}
            />
            <span>Select all {pageItems.length} students</span>
          </label>
        </div>
      )}

      {/* ==== Header row (columns) ==== */}
      <div className="st-table">
        <div className="st-row st-header">
          <div className="col check">
            <input
              type="checkbox"
              checked={allOnPageChecked(pageItems)}
              onChange={() => toggleAllOnPage(pageItems)}
            />
          </div>
          {isShown("photo") && <div className="col photo">Photo</div>}
          {isShown("name") && (
            <div className="col name clickable" onClick={toggleSortByName}>
              Name
              <span className={`sort ${sort.dir}`} />
            </div>
          )}
          {isShown("phone") && <div className="col phone">Phone</div>}
          {isShown("groups") && <div className="col groups">Groups</div>}
          {isShown("teachers") && <div className="col teachers">Teachers</div>}
          {isShown("dates") && <div className="col dates">Training dates</div>}
          {isShown("balance") && <div className="col balance">Balance</div>}
          {isShown("comment") && <div className="col comment">Comment</div>}

          <div className="col actions">
            <button
              className={`circle ${selected.length ? "" : "disabled"}`}
              onClick={() => alert("Open folder")}
              disabled={!selected.length}
              title="Folder"
            >
              <FiFolder />
            </button>
            <button
              className={`circle ${selected.length ? "" : "disabled"}`}
              onClick={openEmailBulk}
              disabled={!selected.length}
              title="Send email"
            >
              <FiMail />
            </button>
            <button
              className={`circle ${selected.length ? "" : "disabled"}`}
              onClick={openSmsBulk}
              disabled={!selected.length}
              title="Send SMS"
            >
              <FiMessageCircle />
            </button>
            <button
              className={`circle danger ${selected.length ? "" : "disabled"}`}
              onClick={() => removeRows(selected)}
              disabled={!selected.length}
              title="Delete selected"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>

        {/* ==== Data rows ==== */}
        {pageItems.map((r, i) => (
          <Row
            key={r.id}
            row={r}
            idx={(page - 1) * pageSize + i + 1}
            shown={cols}
            checked={selected.includes(r.id)}
            onCheck={() => toggleRow(r.id)}
            onEdit={() => openEdit(r)}
            onPay={() => openPayment(r)}
            onDelete={() => removeRows([r.id])}
          />
        ))}
      </div>

      {/* ==== Pagination ==== */}
      <div className="st-pagi">
        <button className="pbtn" onClick={() => go(1)} disabled={page === 1}>
          <FiChevronsLeft />
        </button>
        <button className="pbtn" onClick={() => go(page - 1)} disabled={page === 1}>
          <FiChevronLeft />
        </button>
        <div className="pcurr">{page}</div>
        <button className="pbtn" onClick={() => go(page + 1)} disabled={page === pageCount}>
          <FiChevronRight />
        </button>
        <button className="pbtn" onClick={() => go(pageCount)} disabled={page === pageCount}>
          <FiChevronsRight />
        </button>
      </div>

      {/* ==== Columns modal ==== */}
      {showCols && <div className="overlay" onClick={() => setShowCols(false)} />}
      <div className={`cols-modal ${showCols ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
        <div className="cols-head">
          <h3>Columns</h3>
          <button className="icon" onClick={() => setShowCols(false)}><FiX/></button>
        </div>
        <div className="cols-body">
          {cols.map((c) => (
            <label key={c.key} className="col-item">
              <input type="checkbox" checked={c.show} onChange={() => toggleCol(c.key)} />
              <span>{c.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ==== Add / Edit drawer ==== */}
      {showAdd && <div className="overlay" onClick={() => setShowAdd(false)} />}
      <aside className={`drawer ${showAdd ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <h3>{editId == null ? "Add New User" : "Edit student"}</h3>
          <button className="icon" onClick={() => setShowAdd(false)}><FiX/></button>
        </div>
        <form className="drawer-body" onSubmit={saveStudent}>
          <label>Phone</label>
          <input value={form.phone} onChange={(e) => setForm((p)=>({...p,phone:e.target.value}))} />

          <label>Name</label>
          <input value={form.name} onChange={(e)=>setForm((p)=>({...p,name:e.target.value}))} />

          <label>Date of birth</label>
          <input type="date" value={form.dob} onChange={(e)=>setForm((p)=>({...p,dob:e.target.value}))} />

          <label>Gender</label>
          <div className="radio-row">
            <label><input type="radio" name="g" checked={form.gender==="male"} onChange={()=>setForm((p)=>({...p,gender:"male"}))}/> Male</label>
            <label><input type="radio" name="g" checked={form.gender==="female"} onChange={()=>setForm((p)=>({...p,gender:"female"}))}/> Female</label>
          </div>

          <label>Course</label>
          <select value={form.course} onChange={(e)=>setForm((p)=>({...p,course:e.target.value}))}>
            <option value="">Select course</option>
            {COURSES.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>

          <label>Comment</label>
          <textarea rows={4} value={form.comment} onChange={(e)=>setForm((p)=>({...p,comment:e.target.value}))} />

          <button type="submit" className="save">{editId==null?"Submit":"Save changes"}</button>
        </form>
      </aside>

      {/* ==== Payment modal ==== */}
      {showPay && <div className="overlay" onClick={()=>setShowPay(false)} />}
      <div className={`pay-modal ${showPay ? "show" : ""}`} onClick={(e)=>e.stopPropagation()}>
        <div className="pay-head">
          <h3>Add payment</h3>
          <button className="icon" onClick={()=>setShowPay(false)}><FiX/></button>
        </div>
        <form className="pay-body" onSubmit={submitPayment}>
          <label>Student</label>
          <input disabled value={payRow?.name || ""} />

          <div className="badge"> {money(payRow?.balance || 0)} UZS </div>

          <label>Group</label>
          <select value={payForm.group} onChange={(e)=>setPayForm((p)=>({...p,group:e.target.value}))}>
            <option value="">Select group</option>
            {(payRow?.groups||[]).map(g => <option key={g} value={g}>{g}</option>)}
          </select>

          <label>Method pay</label>
          <div className="grid2">
            {["cash","card","bank","payme","click","uzum","humo"].map(m=>(
              <label key={m}><input type="radio" name="pm" checked={payForm.method===m} onChange={()=>setPayForm((p)=>({...p,method:m}))}/> {m[0].toUpperCase()+m.slice(1)}</label>
            ))}
          </div>

          <label>Amount</label>
          <input type="number" value={payForm.amount} onChange={(e)=>setPayForm((p)=>({...p,amount:e.target.value}))} />

          <label>Date</label>
          <input type="date" value={payForm.date} onChange={(e)=>setPayForm((p)=>({...p,date:e.target.value}))} />

          <label>Comment</label>
          <textarea rows={3} value={payForm.comment} onChange={(e)=>setPayForm((p)=>({...p,comment:e.target.value}))} />

          <button className="save" type="submit"><FiCreditCard/> Add payment</button>
        </form>
      </div>

      {/* ==== SMS modal ==== */}
      {showSMS && <div className="overlay" onClick={()=>setShowSMS(false)} />}
      <div className={`msg-modal ${showSMS ? "show" : ""}`} onClick={(e)=>e.stopPropagation()}>
        <div className="msg-head">
          <h3>Send SMS to student</h3>
          <button className="icon" onClick={()=>setShowSMS(false)}><FiX/></button>
        </div>
        <div className="msg-body">
          <div className="sender">Sender: MODME</div>
          <textarea rows={6} value={smsText} onChange={(e)=>setSmsText(e.target.value)} placeholder="Enter a message" />
          <div className="msg-meta">
            <span>{smsText.length} symbols (~ 1 SMS)</span>
            <span>{selected.length} selected stud.</span>
          </div>
          <button className="save" onClick={()=>{ alert("SMS yuborildi"); setShowSMS(false);}}>Send SMS</button>
        </div>
      </div>

      {/* ==== Email modal ==== */}
      {showEmail && <div className="overlay" onClick={()=>setShowEmail(false)} />}
      <div className={`msg-modal ${showEmail ? "show" : ""}`} onClick={(e)=>e.stopPropagation()}>
        <div className="msg-head">
          <h3>Send Email to student</h3>
          <button className="icon" onClick={()=>setShowEmail(false)}><FiX/></button>
        </div>
        <div className="msg-body">
          <div className="sender">From: admin@school.uz</div>
          <textarea rows={6} value={emailText} onChange={(e)=>setEmailText(e.target.value)} placeholder="Message..." />
          <div className="msg-meta">
            <span>{emailText.length} symbols</span>
            <span>{selected.length} selected stud.</span>
          </div>
          <button className="save" onClick={()=>{ alert("Email yuborildi"); setShowEmail(false);}}>Send Email</button>
        </div>
      </div>
    </div>
  );
}

/* ===== Row component ===== */
function Row({ row, idx, shown, checked, onCheck, onEdit, onPay, onDelete }) {
  const [menu, setMenu] = useState(false);
  const show = (key) => !!shown.find((c) => c.key === key && c.show);

  return (
    <div className="st-row">
      {/* idx & checkbox */}
      <div className="col idx">{idx}.</div>
      <div className="col check">
        <input type="checkbox" checked={checked} onChange={onCheck} />
      </div>

      {show("photo") && (
        <div className="col photo">
          {row.photo ? (
            <img src={row.photo} alt="" />
          ) : (
            <div className="avatar">{(row.name || "?").charAt(0).toUpperCase()}</div>
          )}
        </div>
      )}

      {show("name") && (
        <div className="col name">
          <div className="nm">{row.name}</div>
          <div className="sub">{row.start.split("-").reverse().join(".")}</div>
        </div>
      )}

      {show("phone") && (
        <div className="col phone">
          <a href={telHref(row.phone)}>{row.phone}</a>
        </div>
      )}

      {show("groups") && <div className="col groups">{(row.groups || []).join(", ")}</div>}
      {show("teachers") && <div className="col teachers">{(row.teachers || []).join(", ")}</div>}
      {show("dates") && (
        <div className="col dates">
          {row.start.split("-").reverse().join(".")} — {row.end.split("-").reverse().join(".")}
        </div>
      )}
      {show("balance") && <div className="col balance">{money(row.balance)}</div>}
      {show("comment") && <div className="col comment">{row.comment || ""}</div>}

      {/* actions */}
      <div className="col acts">
        <div className="kebab">
          <button className="ico" onClick={() => setMenu((v) => !v)} title="More">
            <FiMoreVertical />
          </button>
          {menu && (
            <div className="menu" onMouseLeave={() => setMenu(false)}>
              <button onClick={onEdit}><FiEdit2/> Edit</button>
              <button onClick={onPay}><FiCreditCard/> Add payment</button>
              <button className="danger" onClick={onDelete}><FiTrash2/> Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
