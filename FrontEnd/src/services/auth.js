import api from './api'

export const authService = {
  // Login user
  async login(email, password) {
    const response = await api.post('/login', { email, password })
    return response.data
  },

  // Register new user
  async register(userData) {
    const response = await api.post('/register', userData)
    return response.data
  },

  // Logout user
  async logout() {
    const response = await api.post('/logout')
    return response.data
  },

  // Get user profile
  async getProfile() {
    const response = await api.get('/profile')
    return response.data
  },

  // Update user profile
  async updateProfile(userData) {
    const response = await api.put('/profile', userData)
    return response.data
  }
}