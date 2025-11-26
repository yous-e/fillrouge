import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNotification } from '../../context/NotificationContext'
import { useForm } from '../../hooks/useForm'
import LoadingSpinner from '../common/LoadingSpinner'
import './RegisterForm.css'

const RegisterForm = () => {
  const { register } = useAuth()
  const { success, error: notifyError } = useNotification()
  const [isLoading, setIsLoading] = useState(false)

  const { values, errors, touched, handleChange, handleBlur, validateForm } = useForm(
    {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    (values) => {
      const errors = {}
      
      if (!values.name) {
        errors.name = 'Name is required'
      } else if (values.name.length < 2) {
        errors.name = 'Name must be at least 2 characters'
      }
      
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
      
      if (!values.password_confirmation) {
        errors.password_confirmation = 'Please confirm your password'
      } else if (values.password !== values.password_confirmation) {
        errors.password_confirmation = 'Passwords do not match'
      }
      
      return errors
    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      const result = await register(values)
      
      if (result.success) {
        success('Registration successful! Welcome to Finance Score!')
      } else {
        notifyError(result.error || 'Registration failed')
      }
    } catch (err) {
      notifyError('An error occurred during registration')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="register-form-container">
      <div className="register-form-header">
        <h2>Create Account</h2>
        <p>Join Finance Score to manage your finances</p>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input ${errors.name && touched.name ? 'error' : ''}`}
            placeholder="Enter your full name"
            disabled={isLoading}
          />
          {errors.name && touched.name && (
            <div className="form-error">{errors.name}</div>
          )}
        </div>

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
            placeholder="Create a password"
            disabled={isLoading}
          />
          {errors.password && touched.password && (
            <div className="form-error">{errors.password}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password_confirmation" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={values.password_confirmation}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input ${errors.password_confirmation && touched.password_confirmation ? 'error' : ''}`}
            placeholder="Confirm your password"
            disabled={isLoading}
          />
          {errors.password_confirmation && touched.password_confirmation && (
            <div className="form-error">{errors.password_confirmation}</div>
          )}
        </div>

        <button
          type="submit"
          className="register-button"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner size="small" text="" /> : 'Create Account'}
        </button>
      </form>

      <div className="register-form-footer">
        <p>
          Already have an account?{' '}
          <a href="/login" className="auth-link">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  )
}

export default RegisterForm