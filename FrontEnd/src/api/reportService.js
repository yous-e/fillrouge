import apiClient from "./apiClient";

export const exportReport = (data) => apiClient.post("/report/export", data);
export const listReports = () => apiClient.get("/report/list");
export const downloadReport = (id) =>
  apiClient.get(`/report/download/${id}`, { responseType: "blob" });
