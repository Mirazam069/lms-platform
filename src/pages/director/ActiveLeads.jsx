import React, { useState } from "react";
import "./ActiveLeads.css";




const ActiveLeads = () => {
  const [columnBoxes, setColumnBoxes] = useState({
  lead: [],
  expectation: [],
  rejected: [],
  joined: [],
});
const [activeColumn, setActiveColumn] = useState(null);
const [boxName, setBoxName] = useState("");
const [showColumnPanel, setShowColumnPanel] = useState(false);

    const [leads, setLeads] = useState([
  { id: 1, name: "Ali Valiyev", phone: "+998901234567", group: "Frontend A", time: "10:00", source: "Instagram", status: "lead" },
  { id: 2, name: "Shahnoza Karimova", phone: "+998911112233", group: "Backend B", time: "14:00", source: "Google", status: "expectation" },
  { id: 3, name: "Jasur Yusupov", phone: "+998935554433", group: "SMM", time: "09:30", source: "Telegram", status: "joined" },
  { id: 4, name: "Dilnoza Mahmudova", phone: "+998937776655", group: "UI/UX", time: "15:00", source: "YouTube", status: "rejected" },
  { id: 5, name: "Bekzod Juraev", phone: "+998900098877", group: "Frontend A", time: "11:30", source: "Instagram", status: "lead" },
  { id: 6, name: "Malika Islomova", phone: "+998934446688", group: "English", time: "16:00", source: "Google", status: "joined" },
  { id: 7, name: "Azizbek Hamdamov", phone: "+998909090909", group: "Python", time: "12:00", source: "Telegram", status: "expectation" },
  { id: 8, name: "Mohira Usmonova", phone: "+998933332211", group: "Marketing", time: "17:00", source: "Instagram", status: "rejected" },
  { id: 9, name: "Sardor Saidov", phone: "+998935678910", group: "Backend A", time: "08:30", source: "Telegram", status: "lead" },
  { id: 10, name: "Umida Tursunova", phone: "+998901234000", group: "English", time: "13:00", source: "Facebook", status: "joined" },
  { id: 11, name: "Otabek Qodirov", phone: "+998940112233", group: "Frontend C", time: "09:00", source: "Instagram", status: "expectation" },
  { id: 12, name: "Gulbahor Raxmatova", phone: "+998935551122", group: "Design", time: "14:30", source: "Google", status: "lead" },
  { id: 13, name: "Javohir Komilov", phone: "+998998877665", group: "React", time: "11:00", source: "Telegram", status: "joined" },
  { id: 14, name: "Nigora Saidova", phone: "+998936363636", group: "SMM", time: "16:30", source: "Instagram", status: "rejected" },
  { id: 15, name: "Rustam Jalilov", phone: "+998939393939", group: "Backend C", time: "10:45", source: "Telegram", status: "lead" },
  { id: 16, name: "Gulsanam Rasulova", phone: "+998937737373", group: "UI/UX", time: "13:45", source: "Facebook", status: "expectation" },
  { id: 17, name: "Sherzod Xudoyberdiyev", phone: "+998901112255", group: "Python", time: "17:30", source: "Instagram", status: "lead" },
  { id: 18, name: "Madina Murodova", phone: "+998935556677", group: "Frontend D", time: "15:30", source: "Google", status: "joined" },
  { id: 19, name: "Ilhom Karimov", phone: "+998909876543", group: "English", time: "10:15", source: "Telegram", status: "rejected" },
  { id: 20, name: "Kamola Rustamova", phone: "+998939999999", group: "Backend D", time: "12:30", source: "Instagram", status: "expectation" },
]);
  const [newLead, setNewLead] = useState({
    name: "",
    phone: "",
    group: "",
    time: "",
    source: "",
  });

  const handleInputChange = (e) => {
    setNewLead({ ...newLead, [e.target.name]: e.target.value });
  };

  const handleAddLead = () => {
    if (!newLead.name || !newLead.phone) return;
    setLeads([
      ...leads,
      {
        ...newLead,
        id: Date.now(),
        status: "lead",
      },
    ]);
    setNewLead({
      name: "",
      phone: "",
      group: "",
      time: "",
      source: "",
    });
  };

  const moveLead = (id, newStatus) => {
    setLeads(
      leads.map((lead) =>
        lead.id === id ? { ...lead, status: newStatus } : lead
      )
    );
  };

  const renderColumn = (title, status) => (
    <div className="column">
      <h3>{title}</h3>
      <ul className="lead-list">
        {leads
          .filter((lead) => lead.status === status)
          .map((lead) => (
            <li key={lead.id} className="lead-card">
              <strong>{lead.name}</strong>
              <div className="lead-card-info">
                📞 {lead.phone} <br />
                🏷 {lead.group} - 🕒 {lead.time} <br />
                📌 {lead.source}
              </div>
              <div className="lead-card-buttons">
                {status !== "lead" && (
                  <button
                    className="to-lead"
                    onClick={() => moveLead(lead.id, "lead")}
                  >
                    ← Asosiy
                  </button>
                )}
                {status !== "expectation" && (
                  <button
                    className="to-expectation"
                    onClick={() => moveLead(lead.id, "expectation")}
                  >
                    → Kutilmoqda
                  </button>
                )}
                {status !== "rejected" && (
                  <button
                    className="to-rejected"
                    onClick={() => moveLead(lead.id, "rejected")}
                  >
                    ✖ Rad
                  </button>
                )}
                {status !== "joined" && (
                  <button
                    className="to-joined"
                    onClick={() => moveLead(lead.id, "joined")}
                  >
                    ✅ Qabul
                  </button>
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );

  return (
    <div className="active-leads-layout">
      <div className="content">
        <div className="lead-form">
          <input
            type="text"
            name="name"
            placeholder="Ismi"
            value={newLead.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Telefon"
            value={newLead.phone}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="group"
            placeholder="Guruhi"
            value={newLead.group}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="time"
            placeholder="Vaqti"
            value={newLead.time}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="source"
            placeholder="Qayerdan bildi?"
            value={newLead.source}
            onChange={handleInputChange}
          />
          <button onClick={handleAddLead}>+ Qo‘shish</button>
        </div>

        <div className="columns">
          {renderColumn("Leads", "lead")}
          {renderColumn("Kutilayotganlar", "expectation")}
          {renderColumn("Rad etilganlar", "rejected")}
          {renderColumn("Qo‘shilganlar", "joined")}
        </div>
      </div>
    </div>
  );
};

export default ActiveLeads;
