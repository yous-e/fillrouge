import apiClient from "./apiClient";

export const login = (payload) => apiClient.post("/login", payload);
export const register = (payload) => apiClient.post("/register", payload);
export const getProfile = () => apiClient.get("/profile");
export const logout = () => apiClient.post("/logout");
