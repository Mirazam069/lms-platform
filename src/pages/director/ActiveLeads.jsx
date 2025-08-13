import React, { useMemo, useState } from "react";
import "./ActiveLeads.css";
import {
  FaPlus, FaTimes, FaEllipsisV, FaEdit, FaSms, FaTrash
} from "react-icons/fa";

const STATUS = {
  NEW: "new",
  PENDING: "pending",
  REJECTED: "rejected",
  JOINED: "joined",
};

const STATUS_LABEL = {
  [STATUS.NEW]: "Yangi lidlar",
  [STATUS.PENDING]: "Kutilayotganlar",
  [STATUS.REJECTED]: "Rad etilganlar",
  [STATUS.JOINED]: "Qo‘shilganlar",
};

const COURSES = ["Frontend", "React", "Backend", "UI/UX", "IELTS"];
const SOURCES = ["Instagram", "Telegram", "Reklama", "Do‘stdan eshitgan", "Boshqa"];

// Demo ma'lumotlar
const initialLeads = [
  { id: 1, name: "Asadbek Qodirov", phone: "+998 90 111 22 33", course: "Frontend", source: "Instagram", comment: "Frontend kursiga qiziqdi", status: STATUS.NEW,      createdAt: "2025-08-01", group: "" },
  { id: 2, name: "Malika Isroilova", phone: "+998 93 555 66 77", course: "React",    source: "Do‘stdan eshitgan", comment: "Sana moslash kerak",      status: STATUS.PENDING,  createdAt: "2025-08-02", group: "" },
  { id: 3, name: "Sirojiddin",       phone: "+998 97 700 80 90", course: "Backend",  source: "Telegram",          comment: "To‘lov bo‘yicha savollar", status: STATUS.REJECTED, createdAt: "2025-08-03", group: "" },
  { id: 4, name: "Ziyoda",           phone: "+998 91 222 33 44", course: "React",    source: "Reklama",           comment: "React guruhiga qo‘shildi", status: STATUS.JOINED,   createdAt: "2025-08-04", group: "" },
];

export default function ActiveLeads() {
  const [leads, setLeads] = useState(initialLeads);

  // Lead Drawer: qo'shish / tahrirlash
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mode, setMode] = useState("add"); // add | edit
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", course: "", source: "", comment: "" });

  // Search (4 xil)
  const [search, setSearch] = useState({ name: "", phone: "", course: "", source: "" });

  // Kebab menyu (3 nuqta)
  const [menuOpenId, setMenuOpenId] = useState(null);

  // SMS modal
  const [smsOpen, setSmsOpen] = useState(false);
  const [smsTo, setSmsTo] = useState(null);
  const [smsText, setSmsText] = useState("");

  // Group (box) yaratish paneli
  const [groupPanel, setGroupPanel] = useState({ open: false, status: STATUS.NEW, name: "" });

  // Har bir ustun uchun guruh nomlari ro'yxati
  const [groups, setGroups] = useState({
    [STATUS.NEW]: [],
    [STATUS.PENDING]: [],
    [STATUS.REJECTED]: [],
    [STATUS.JOINED]: [],
  });

  // Drag & Drop holati
  const [draggingId, setDraggingId] = useState(null);

  // --- Drag handlers ---
  const onDragStart = (e, id) => {
    setDraggingId(id);
    e.dataTransfer.setData("text/plain", String(id));
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  // Ustun bo'sh joyiga tashlash: status o'zgaradi, group tozalanadi
  const onDropToColumn = (e, targetStatus) => {
    e.preventDefault();
    const id = Number(e.dataTransfer.getData("text/plain"));
    if (!id) return;
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: targetStatus, group: "" } : l))
    );
    setDraggingId(null);
  };

  // Muayyan group(box) ichiga tashlash
  const onDropToGroup = (e, targetStatus, targetGroup) => {
    e.preventDefault();
    e.stopPropagation(); // parent column drop ishga tushmasin (MUHIM)
    const id = Number(e.dataTransfer.getData("text/plain"));
    if (!id) return;
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: targetStatus, group: targetGroup } : l))
    );
    setDraggingId(null);
  };

  const onDragOverGroup = (e) => {
    e.preventDefault();
    e.stopPropagation(); // parentga bubblanish yo‘q (MUHIM)
  };

  // --- Drawer lead ---
  const openDrawerAdd = () => {
    setMode("add");
    setEditingId(null);
    setForm({ name: "", phone: "", course: "", source: "", comment: "" });
    setDrawerOpen(true);
  };
  const openDrawerEdit = (lead) => {
    setMode("edit");
    setEditingId(lead.id);
    setForm({
      name: lead.name || "",
      phone: lead.phone || "",
      course: lead.course || "",
      source: lead.source || "",
      comment: lead.comment || "",
    });
    setDrawerOpen(true);
    setMenuOpenId(null);
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
    setMode("add");
    setEditingId(null);
    setForm({ name: "", phone: "", course: "", source: "", comment: "" });
  };

  const onSaveLead = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      alert("Ism va telefon majburiy.");
      return;
    }
    if (mode === "add") {
      const newId = leads.length ? Math.max(...leads.map((l) => l.id)) + 1 : 1;
      const newLead = {
        id: newId,
        name: form.name.trim(),
        phone: form.phone.trim(),
        course: form.course.trim(),
        source: form.source.trim(),
        comment: form.comment.trim(),
        status: STATUS.NEW,
        createdAt: new Date().toISOString().slice(0, 10),
        group: "",
      };
      setLeads((prev) => [newLead, ...prev]);
    } else {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === editingId
            ? {
                ...l,
                name: form.name.trim(),
                phone: form.phone.trim(),
                course: form.course.trim(),
                source: form.source.trim(),
                comment: form.comment.trim(),
              }
            : l
        )
      );
    }
    closeDrawer();
  };

  // --- Search filter ---
  const filteredLeads = useMemo(() => {
    const n = search.name.trim().toLowerCase();
    const p = search.phone.trim().toLowerCase();
    const c = search.course;
    const s = search.source;
    return leads.filter((l) => {
      const m1 = !n || (l.name || "").toLowerCase().includes(n);
      const m2 = !p || (l.phone || "").toLowerCase().includes(p);
      const m3 = !c || l.course === c;
      const m4 = !s || l.source === s;
      return m1 && m2 && m3 && m4;
    });
  }, [leads, search]);

  // Ustunlar bo'yicha bo'lish
  const columns = useMemo(() => {
    return {
      [STATUS.NEW]: filteredLeads.filter((l) => l.status === STATUS.NEW),
      [STATUS.PENDING]: filteredLeads.filter((l) => l.status === STATUS.PENDING),
      [STATUS.REJECTED]: filteredLeads.filter((l) => l.status === STATUS.REJECTED),
      [STATUS.JOINED]: filteredLeads.filter((l) => l.status === STATUS.JOINED),
    };
  }, [filteredLeads]);

  // Kebab actions
  const onOpenMenu = (id) => setMenuOpenId((cur) => (cur === id ? null : id));
  const onDelete = (id) => {
    const item = leads.find((x) => x.id === id);
    if (!item) return;
    if (window.confirm(`"${item.name}" lidingizni o‘chirishni tasdiqlaysizmi?`)) {
      setLeads((prev) => prev.filter((x) => x.id !== id));
      setMenuOpenId(null);
    }
  };
  const onOpenSms = (lead) => {
    setSmsTo(lead);
    setSmsText("");
    setSmsOpen(true);
    setMenuOpenId(null);
  };
  const onSendSms = () => {
    alert(`SMS yuborildi:\n${smsTo?.name} (${smsTo?.phone})\n\n${smsText}`);
    setSmsOpen(false);
    setSmsTo(null);
    setSmsText("");
  };

  // --- Group panel ---
  const openGroupPanelFor = (statusKey) =>
    setGroupPanel({ open: true, status: statusKey, name: "" });

  const closeGroupPanel = () =>
    setGroupPanel({ open: false, status: STATUS.NEW, name: "" });

  const saveGroup = (e) => {
    e.preventDefault();
    const raw = groupPanel.name.trim();
    if (!raw) return;
    // dublikatga tekshiruv (case-insensitive)
    const exists = (groups[groupPanel.status] || []).some(
      (g) => g.toLowerCase() === raw.toLowerCase()
    );
    if (exists) {
      alert("Bu nomli box allaqachon mavjud.");
      return;
    }
    setGroups((prev) => ({
      ...prev,
      [groupPanel.status]: [...prev[groupPanel.status], raw],
    }));
    closeGroupPanel();
  };

  // Group bo'yicha renderer
  const renderGroupBox = (statusKey, groupName) => {
    const list = columns[statusKey].filter((l) => (l.group || "") === groupName);
    return (
      <div
        key={groupName || "_ungrouped"}
        className={`al-group ${groupName ? "" : "ungrouped"}`}
        onDragOver={groupName ? onDragOverGroup : onDragOver}
        onDrop={(e) =>
          groupName
            ? onDropToGroup(e, statusKey, groupName) // stopPropagation bor
            : onDropToColumn(e, statusKey)
        }
      >
        <div className={`al-group-head ${groupName ? "" : "subtle"}`}>
          <span className="al-group-title">{groupName || "Boshqa"}</span>
          <span className="al-group-count">{list.length}</span>
        </div>

        <div className="al-group-body">
          {list.length === 0 ? (
            <div className="al-empty small">Bu yerga tashlang</div>
          ) : (
            list.map((l) => (
              <div
                key={l.id}
                className={`al-card ${draggingId === l.id ? "dragging" : ""}`}
                draggable
                onDragStart={(e) => onDragStart(e, l.id)}
                onDragEnd={() => setDraggingId(null)}
                title="Kartani ushlab turib box yoki boshqa ustunga olib boring"
              >
                {/* Kebab menu */}
                <button className="al-kebab" onClick={() => onOpenMenu(l.id)}>
                  <FaEllipsisV />
                </button>
                {menuOpenId === l.id && (
                  <div className="al-menu" onMouseLeave={() => setMenuOpenId(null)}>
                    <button onClick={() => openDrawerEdit(l)}>
                      <FaEdit /> Tahrirlash
                    </button>
                    <button onClick={() => onOpenSms(l)}>
                      <FaSms /> SMS yuborish
                    </button>
                    <button className="danger" onClick={() => onDelete(l.id)}>
                      <FaTrash /> O‘chirish
                    </button>
                  </div>
                )}

                <div className="al-card-name">{l.name}</div>
                <div className="al-card-phone">{l.phone}</div>
                <div className="al-meta">
                  <span className="al-chip">{l.course || "—"}</span>
                  <span className="al-chip">{l.source || "—"}</span>
                  <span className="al-date">{l.createdAt}</span>
                </div>
                {l.comment ? <div className="al-comment">{l.comment}</div> : null}
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="active-leads">
      {/* Header */}
      <div className="al-head">
        <h1 className="al-title">Faol lidlar</h1>
        <button className="al-add-btn" onClick={openDrawerAdd}>
          <FaPlus />
          <span>Lid qo‘shish</span>
        </button>
      </div>

      {/* Search bar (4 xil) */}
      <div className="al-search">
        <input
          type="text"
          placeholder="Ism bo‘yicha qidirish"
          value={search.name}
          onChange={(e) => setSearch((p) => ({ ...p, name: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Raqam bo‘yicha qidirish"
          value={search.phone}
          onChange={(e) => setSearch((p) => ({ ...p, phone: e.target.value }))}
        />
        <div className="select-wrap">
          <select
            value={search.course}
            onChange={(e) => setSearch((p) => ({ ...p, course: e.target.value }))}
          >
            <option value="">Kurslar</option>
            {COURSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="select-wrap">
          <select
            value={search.source}
            onChange={(e) => setSearch((p) => ({ ...p, source: e.target.value }))}
          >
            <option value="">Manba</option>
            {SOURCES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Columns (har birida + tugma bilan group qo'shish) */}
      <div className="al-columns">
        {Object.entries(STATUS_LABEL).map(([key, label]) => {
          const colGroups = groups[key] || [];
          return (
            <div
              key={key}
              className="al-col"
              onDragOver={onDragOver}
              onDrop={(e) => onDropToColumn(e, key)}
            >
              <div className="al-col-head">
                <div className="left">
                  <span className="al-col-title">{label}</span>
                  <span className="al-col-count">{columns[key].length}</span>
                </div>
                <button
                  className="al-col-plus"
                  title="Guruh (box) qo‘shish"
                  onClick={() => openGroupPanelFor(key)}
                >
                  <FaPlus />
                </button>
              </div>

              <div className="al-col-body">
                {/* Avval nomli box'lar */}
                {colGroups.map((g) => renderGroupBox(key, g))}
                {/* Oxirida "Boshqa" (ungrouped) */}
                {renderGroupBox(key, "")}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lead Drawer */}
      {drawerOpen && <div className="al-overlay" onClick={closeDrawer} />}
      <aside className={`al-drawer ${drawerOpen ? "show" : ""}`} role="dialog" aria-modal="true">
        <div className="al-drawer-head">
          <h2>{mode === "add" ? "Yangi lid qo‘shish" : "Lidni tahrirlash"}</h2>
          <button className="al-close" onClick={closeDrawer}><FaTimes /></button>
        </div>
        <form className="al-form" onSubmit={onSaveLead} onClick={(e) => e.stopPropagation()}>
          <label>Ism <span className="req">*</span></label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="Masalan: Akmal Qodirov"
          />

          <label>Raqam <span className="req">*</span></label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            placeholder="+998 9X XXX XX XX"
          />

          <label>Kurs</label>
          <select
            value={form.course}
            onChange={(e) => setForm((p) => ({ ...p, course: e.target.value }))}
          >
            <option value="">Tanlang</option>
            {COURSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <label>Qayerdan bilib kelgani</label>
          <select
            value={form.source}
            onChange={(e) => setForm((p) => ({ ...p, source: e.target.value }))}
          >
            <option value="">Tanlang</option>
            {SOURCES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <label>Comment</label>
          <textarea
            rows={4}
            value={form.comment}
            onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
            placeholder="Qisqacha izoh..."
          />
          <button type="submit" className="al-save">
            {mode === "add" ? "Saqlash" : "O‘zgartirishni saqlash"}
          </button>
        </form>
      </aside>

      {/* Group Drawer */}
      {groupPanel.open && <div className="al-overlay" onClick={closeGroupPanel} />}
      <aside className={`al-drawer ${groupPanel.open ? "show" : ""}`} role="dialog" aria-modal="true">
        <div className="al-drawer-head">
          <h2>Guruh (box) qo‘shish</h2>
          <button className="al-close" onClick={closeGroupPanel}><FaTimes /></button>
        </div>
        <form className="al-form" onSubmit={saveGroup} onClick={(e) => e.stopPropagation()}>
          <label>Nom <span className="req">*</span></label>
          <input
            type="text"
            value={groupPanel.name}
            onChange={(e) => setGroupPanel((p) => ({ ...p, name: e.target.value }))}
            placeholder="Masalan: Sentabr"
          />
          <button type="submit" className="al-save">Saqlash</button>
        </form>
      </aside>

      {/* SMS modal */}
      {smsOpen && (
        <div className="al-overlay" onClick={() => setSmsOpen(false)}>
          <div className="al-sms-modal" onClick={(e) => e.stopPropagation()}>
            <div className="al-sms-head">
              <h3>SMS yuborish</h3>
              <button className="al-close" onClick={() => setSmsOpen(false)}><FaTimes /></button>
            </div>
            <div className="al-sms-body">
              <div className="al-sms-to">
                Qabul qiluvchi: <strong>{smsTo?.name}</strong> — {smsTo?.phone}
              </div>
              <textarea
                rows={5}
                maxLength={400}
                value={smsText}
                onChange={(e) => setSmsText(e.target.value)}
                placeholder="Matn..."
              />
              <div className="al-sms-meta">Belgilar: {smsText.length} / 400</div>
            </div>
            <div className="al-sms-foot">
              <button className="al-btn-ghost" onClick={() => setSmsOpen(false)}>Bekor qilish</button>
              <button className="al-add-btn" disabled={!smsText.trim()} onClick={onSendSms}>Yuborish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
