import apiClient from "./apiClient";

export const listTransactions = () => apiClient.get("/transactions");
export const createTransaction = (data) => apiClient.post("/transactions", data);
export const deleteTransaction = (id) => apiClient.delete(`/transactions/${id}`);
