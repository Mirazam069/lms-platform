// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://timeschoolapi.pythonanywhere.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 Har bir requestdan oldin accessToken ni dinamik olib qo‘shamiz
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
