import apiClient from "./apiClient";

export const listScores = () => apiClient.get("/scores");
