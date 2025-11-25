import apiClient from "./apiClient";

export const listTransactions = () => apiClient.get("/transactions");
export const createTransaction = (payload) => apiClient.post("/transactions", payload);
export const deleteTransaction = (id) => apiClient.delete(`/transactions/${id}`);
