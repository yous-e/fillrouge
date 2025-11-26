import api from './api'

export const transactionsService = {
  // Get all transactions
  async getAll() {
    const response = await api.get('/transactions')
    return response.data
  },

  // Get single transaction
  async getById(id) {
    const response = await api.get(`/transactions/${id}`)
    return response.data
  },

  // Create new transaction
  async create(transactionData) {
    const response = await api.post('/transactions', transactionData)
    return response.data
  },

  // Update transaction
  async update(id, transactionData) {
    const response = await api.put(`/transactions/${id}`, transactionData)
    return response.data
  },

  // Delete transaction
  async delete(id) {
    const response = await api.delete(`/transactions/${id}`)
    return response.data
  }
}