import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
});

// Always get CSRF before POST login, register, logout
export const loginApi = async (data) => {
  await api.get("/sanctum/csrf-cookie");
  return api.post("/api/login", data);
};

export const registerApi = async (data) => {
  await api.get("/sanctum/csrf-cookie");
  return api.post("/api/register", data);
};

export const logoutApi = async () => {
  await api.get("/sanctum/csrf-cookie");
  return api.post("/api/logout");
};

export const getProfile = () => api.get("/api/profile");

export const getTransactionsApi = () => api.get("/api/transactions");

export default api;
