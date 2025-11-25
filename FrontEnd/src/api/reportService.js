import apiClient from "./apiClient";

export const listReports = () => apiClient.get("/reports");
export const downloadReport = (id) =>
  apiClient.get(`/reports/${id}/download`, { responseType: "blob" });
