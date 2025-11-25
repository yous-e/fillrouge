import apiClient from "./apiClient";

export const getStats = () => apiClient.get("/admin/stats");
export const listUsers = () => apiClient.get("/admin/users");
export const deleteUser = (id) => apiClient.delete(`/admin/users/${id}`);
export const promoteUser = (id) => apiClient.post(`/admin/users/${id}/promote`);
