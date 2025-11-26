import React from 'react'
import { useAuth } from '../context/AuthContext'
import RegisterForm from '../components/auth/RegisterForm'
import Notification from '../components/common/Notification'
import { useNotification } from '../context/NotificationContext' // Fixed path
import './Register.css'

const Register = () => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    window.location.href = '/dashboard'
    return null
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-hero">
          <div className="hero-content">
            <h1>Join Finance Score</h1>
            <p className="hero-subtitle">
              Start your journey to better financial health. 
              Get insights, track progress, and achieve your financial goals.
            </p>
            <div className="hero-benefits">
              <div className="benefit">
                <span className="benefit-icon">🔒</span>
                <span>Secure & Private</span>
              </div>
              <div className="benefit">
                <span className="benefit-icon">📈</span>
                <span>Track Financial Growth</span>
              </div>
              <div className="benefit">
                <span className="benefit-icon">🎯</span>
                <span>Personalized Insights</span>
              </div>
            </div>
          </div>
        </div>

        <div className="register-section">
          <RegisterForm />
        </div>
      </div>
      <Notification />
    </div>
  )
}

export default Register