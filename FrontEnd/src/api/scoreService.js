import apiClient from "./apiClient";

export const getScore = () => apiClient.get("/score");
export const getScoreHistory = () => apiClient.get("/score/history");
