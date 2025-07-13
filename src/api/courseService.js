// src/api/axiosInstance.js
import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

const axiosInstance = axios.create({
  baseURL: "https://timeschoolapi.pythonanywhere.com",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;


