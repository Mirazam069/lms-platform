import React, { useState } from "react";
import "./Modules.css";

const Modules = () => {
  const [modules, setModules] = useState([
    {
      id: 1,
      course: "Frontend — HTML & CSS",
      lessons: "13 ~ / - / -",
      settingAmount: "300 000",
      estimatedAmount: "0",
      calcSetting: "Fixed per module",
      moduleType: "Practical",
    },
    {
      id: 2,
      course: "Frontend — JavaScript",
      lessons: "16 ~ / - / -",
      settingAmount: "300 000",
      estimatedAmount: "0",
      calcSetting: "Fixed per module",
      moduleType: "Theory",
    },
  ]);

  const [newModule, setNewModule] = useState({
    course: "",
    lessons: "",
    settingAmount: "",
    estimatedAmount: "0",
    calcSetting: "",
    moduleType: "",
  });

  const handleAdd = (e) => {
    e.preventDefault();
    const newId = modules.length + 1;
    setModules([...modules, { id: newId, ...newModule }]);
    setNewModule({
      course: "",
      lessons: "",
      settingAmount: "",
      estimatedAmount: "0",
      calcSetting: "",
      moduleType: "",
    });
  };

  return (
    <div className="modules-table-wrapper">
      <h1 className="modules-heading">Modullar ro‘yxati</h1>

      <form className="add-module-form" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Modul nomi"
          value={newModule.course}
          onChange={(e) => setNewModule({ ...newModule, course: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Darslar"
          value={newModule.lessons}
          onChange={(e) => setNewModule({ ...newModule, lessons: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Sozlangan summa"
          value={newModule.settingAmount}
          onChange={(e) => setNewModule({ ...newModule, settingAmount: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Hisoblash usuli"
          value={newModule.calcSetting}
          onChange={(e) => setNewModule({ ...newModule, calcSetting: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Modul turi"
          value={newModule.moduleType}
          onChange={(e) => setNewModule({ ...newModule, moduleType: e.target.value })}
          required
        />
        <button type="submit">Qo‘shish</button>
      </form>

      <table className="modules-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Kurs / Modul</th>
            <th>Darslar</th>
            <th>Sozlangan summa</th>
            <th>Taxminiy summa</th>
            <th>Hisoblash usuli</th>
            <th>Modul turi</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((mod, index) => (
            <tr key={mod.id}>
              <td>{index + 1}</td>
              <td>{mod.course}</td>
              <td>{mod.lessons}</td>
              <td>{mod.settingAmount}</td>
              <td>{mod.estimatedAmount}</td>
              <td>{mod.calcSetting}</td>
              <td>{mod.moduleType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Modules;
