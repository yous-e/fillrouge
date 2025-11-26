import api from './api'

export const reportsService = {
  // Generate new report
  async generate() {
    const response = await api.post('/reports/generate')
    return response.data
  },

  // Get all reports
  async getAll() {
    const response = await api.get('/reports')
    return response.data
  },

  // Download report
  async download(id) {
    const response = await api.get(`/reports/${id}/download`)
    return response.data
  }
}