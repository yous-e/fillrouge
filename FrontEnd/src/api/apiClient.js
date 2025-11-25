import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api", // غيّر حسب السيرفر
});

// إضافة الـ token تلقائيًا
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
