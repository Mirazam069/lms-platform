import React, { createContext, useContext, useState } from "react";

export const translations = {
  uz: {
    dashboard: "Boshqaruv paneli",
    courses: "Kurslar",
    students: "O‘quvchilar",
    teachers: "O‘qituvchilar",
    modules: "Modullar",
    groups: "Guruhlar",
    topics: "Mavzular",
    recentStudents: "Yaqinda qo‘shilgan talabalar",
    name: "Ism",
    course: "Kurs",
    date: "Sana",
  },
  ru: {
    dashboard: "Панель управления",
    courses: "Курсы",
    students: "Ученики",
    teachers: "Учителя",
    modules: "Модули",
    groups: "Группы",
    topics: "Темы",
    recentStudents: "Недавно добавленные студенты",
    name: "Имя",
    course: "Курс",
    date: "Дата",
  }
};


const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("uz");

  const t = (key) => translations[language][key] || key;

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
