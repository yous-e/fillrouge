import api from './api'

export const scoresService = {
  // Get current score
  async getCurrent() {
    const response = await api.get('/score')
    return response.data
  },

  // Get score history
  async getHistory() {
    const response = await api.get('/score/history')
    return response.data
  },

  // Get latest score
  async getLatest() {
    const response = await api.get('/score/latest')
    return response.data
  }
}