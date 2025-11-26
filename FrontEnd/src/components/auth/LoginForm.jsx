import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNotification } from '../../context/NotificationContext'
import { useForm } from '../../hooks/useForm'
import LoadingSpinner from '../common/LoadingSpinner'
import './LoginForm.css'
const LoginForm = () => {
  const { login } = useAuth()
  const { success, error: notifyError } = useNotification()
  const [isLoading, setIsLoading] = useState(false)

  const { values, errors, touched, handleChange, handleBlur, validateForm } = useForm(
    {
      email: '',
      password: '',
    },
    (values) => {
      const errors = {}
      
      if (!values.email) {
        errors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is invalid'
      }
      
      if (!values.password) {
        errors.password = 'Password is required'
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters'
      }
      
      return errors
    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      const result = await login(values.email, values.password)
      
      if (result.success) {
        success('Login successful!')
      } else {
        notifyError(result.error || 'Login failed')
      }
    } catch (err) {
      notifyError('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-form-container">
      <div className="login-form-header">
        <h2>Welcome Back</h2>
        <p>Please sign in to your account</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
            placeholder="Enter your email"
            disabled={isLoading}
          />
          {errors.email && touched.email && (
            <div className="form-error">{errors.email}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input ${errors.password && touched.password ? 'error' : ''}`}
            placeholder="Enter your password"
            disabled={isLoading}
          />
          {errors.password && touched.password && (
            <div className="form-error">{errors.password}</div>
          )}
        </div>

        <button
          type="submit"
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner size="small" text="" /> : 'Sign In'}
        </button>
      </form>

      <div className="login-form-footer">
        <p>
          Don't have an account?{' '}
          <a href="/register" className="auth-link">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginForm