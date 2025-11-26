import api from './api'

export const adminService = {
  // Get all users
  async getUsers() {
    const response = await api.get('/admin/users')
    return response.data
  },

  // Delete user
  async deleteUser(id) {
    const response = await api.delete(`/admin/users/${id}`)
    return response.data
  },

  // Assign role to user
  async assignRole(userId, role) {
    const response = await api.post(`/admin/users/${userId}/role`, { role })
    return response.data
  },

  // Get statistics
  async getStats() {
    const response = await api.get('/admin/stats')
    return response.data
  }
}