import React, { createContext, useState, useContext, useEffect } from 'react'
import { authService } from '../services/auth'

// Create and export the context
export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      authService.getProfile()
        .then(userData => {
          setUser(userData)
        })
        .catch((error) => {
          console.error('Failed to get profile:', error)
          localStorage.removeItem('token')
          setToken(null)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [token])

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password)
      const { user: userData, token: authToken } = response
      
      localStorage.setItem('token', authToken)
      setToken(authToken)
      setUser(userData)
      
      return { success: true, user: userData }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await authService.register(userData)
      const { user: newUser, token: authToken } = response
      
      localStorage.setItem('token', authToken)
      setToken(authToken)
      setUser(newUser)
      
      return { success: true, user: newUser }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      }
    }
  }

  const logout = () => {
    authService.logout()
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  const updateProfile = (userData) => {
    setUser(prevUser => ({ ...prevUser, ...userData }))
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}