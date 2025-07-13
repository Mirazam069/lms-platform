import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Sahifa qayta yuklanganda localStorage'dan ma'lumotlarni tiklaymiz
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (accessToken && role) {
      setUser({ role });
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        "https://timeschoolapi.pythonanywhere.com/login/",
        {
          username, 
          password,
        }
      );

      const {
        access_token,
        refresh_token,
        redirect,
        user_id,
        role,
      } = response.data;

      if (!access_token || !refresh_token || !role) {
        console.error("Token yoki rol yo‘q:", response.data);
        return null;
      }

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      localStorage.setItem("role", role);

      // 🔥 USER obyektini context'ga saqlaymiz
      setUser({ role });

      return redirect || `/${role}/dashboard`;
    } catch (error) {
      console.error("Login muvaffaqiyatsiz:", error.response?.data || error.message);
      return null;
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
