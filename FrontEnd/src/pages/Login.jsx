import React from 'react'
import { useAuth } from '../context/AuthContext'
import LoginForm from '../components/auth/LoginForm'
import Notification from '../components/common/Notification'
import { useNotification } from '../context/NotificationContext' // Fixed path
import './Login.css'

const Login = () => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    window.location.href = '/dashboard'
    return null
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-hero">
          <div className="hero-content">
            <h1>Finance Score</h1>
            <p className="hero-subtitle">
              Take control of your financial health with our intelligent scoring system. 
              Track transactions, monitor your score, and make better financial decisions.
            </p>
            <div className="hero-features">
              <div className="feature">
                <span className="feature-icon">💰</span>
                <span>Track Income & Expenses</span>
              </div>
              <div className="feature">
                <span className="feature-icon">⭐</span>
                <span>Real-time Financial Score</span>
              </div>
              <div className="feature">
                <span className="feature-icon">📊</span>
                <span>Detailed Reports & Analytics</span>
              </div>
            </div>
          </div>
        </div>

        <div className="login-section">
          <LoginForm />
        </div>
      </div>
      <Notification />
    </div>
  )
}

export default Login