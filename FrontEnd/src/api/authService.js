import apiClient from "./apiClient";

export const register = (data) => apiClient.post("/api/register", data);
export const login = async(data) =>await apiClient.post("/api/login", data);
export const logout = () => apiClient.post("/api/logout");
export const getProfile = async() =>  await apiClient.get("/api/profile");

export default { register, login, getProfile, logout };