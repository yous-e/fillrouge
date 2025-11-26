import React from 'react'
import { useForm } from '../../hooks/useForm'
import LoadingSpinner from '../common/LoadingSpinner'
import './UserForm.css'

const UserForm = ({ user, onSave, onCancel }) => {
  const isEditing = !!user

  const { values, errors, touched, handleChange, handleBlur, validateForm } = useForm(
    {
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || 'user',
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
      
      if (!isEditing) {
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
      }
      
      return errors
    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const userData = {
      name: values.name,
      email: values.email,
      role: values.role,
      ...(!isEditing && { 
        password: values.password,
        password_confirmation: values.password_confirmation
      })
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onSave({
      id: user?.id || Date.now(),
      ...userData,
      created_at: user?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
  }

  return (
    <div className="user-form-overlay">
      <div className="user-form-container">
        <div className="form-header">
          <h3>{isEditing ? 'Edit User' : 'Add New User'}</h3>
          <button 
            onClick={onCancel}
            className="close-button"
            aria-label="Close form"
          >
            ✕
          </button>
        </div>

        <form className="user-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.name && touched.name ? 'error' : ''}`}
                placeholder="Enter user's full name"
              />
              {errors.name && touched.name && (
                <div className="form-error">{errors.name}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
                placeholder="Enter email address"
              />
              {errors.email && touched.email && (
                <div className="form-error">{errors.email}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="role" className="form-label">
                Role *
              </label>
              <select
                id="role"
                name="role"
                value={values.role}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-select"
              >
                <option value="user">User</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            {!isEditing && (
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password *
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
                />
                {errors.password && touched.password && (
                  <div className="form-error">{errors.password}</div>
                )}
              </div>
            )}
          </div>

          {!isEditing && (
            <div className="form-group">
              <label htmlFor="password_confirmation" className="form-label">
                Confirm Password *
              </label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={values.password_confirmation}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.password_confirmation && touched.password_confirmation ? 'error' : ''}`}
                placeholder="Confirm the password"
              />
              {errors.password_confirmation && touched.password_confirmation && (
                <div className="form-error">{errors.password_confirmation}</div>
              )}
            </div>
          )}

          {isEditing && (
            <div className="form-info">
              <div className="info-item">
                <strong>User ID:</strong> {user.id}
              </div>
              <div className="info-item">
                <strong>Created:</strong> {new Date(user.created_at).toLocaleDateString()}
              </div>
              <div className="info-item">
                <strong>Last Updated:</strong> {new Date(user.updated_at).toLocaleDateString()}
              </div>
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="save-button"
            >
              {isEditing ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserForm