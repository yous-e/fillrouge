import apiClient from "./apiClient";

export const listUsers = () => apiClient.get("/admin/users");
export const deleteUser = (id) => apiClient.delete(`/admin/users/${id}`);
export const setUserRole = (id, role) => apiClient.post(`/admin/users/${id}/role`, { role });
export const getStats = () => apiClient.get("/admin/stats");
