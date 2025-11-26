import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNotification } from '../../context/NotificationContext'
import { useForm } from '../../hooks/useForm'
import LoadingSpinner from '../common/LoadingSpinner'
import './Profile.css'

const Profile = () => {
  const { user, updateProfile } = useAuth()
  const { success, error: notifyError } = useNotification()
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const { values, errors, touched, handleChange, handleBlur, validateForm, reset } = useForm(
    {
      name: user?.name || '',
      email: user?.email || '',
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
      
      return errors
    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      // In a real app, you would call an API to update the profile
      // For now, we'll just update the local state
      updateProfile(values)
      success('Profile updated successfully!')
      setIsEditing(false)
    } catch (err) {
      notifyError('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    reset()
    setIsEditing(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  if (!user) {
    return <LoadingSpinner text="Loading profile..." />
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile Settings</h2>
        <p>Manage your account information</p>
      </div>

      <div className="profile-content">
        <div className="profile-info-card">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          </div>

          {!isEditing ? (
            <div className="profile-details">
              <div className="detail-group">
                <label className="detail-label">Name</label>
                <div className="detail-value">{user.name}</div>
              </div>
              
              <div className="detail-group">
                <label className="detail-label">Email</label>
                <div className="detail-value">{user.email}</div>
              </div>
              
              <div className="detail-group">
                <label className="detail-label">Role</label>
                <div className="detail-value">
                  <span className={`role-badge role-${user.role}`}>
                    {user.role}
                  </span>
                </div>
              </div>
              
              <div className="detail-group">
                <label className="detail-label">Member Since</label>
                <div className="detail-value">
                  {new Date(user.created_at).toLocaleDateString()}
                </div>
              </div>

              <button
                onClick={handleEdit}
                className="edit-button"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${errors.name && touched.name ? 'error' : ''}`}
                  placeholder="Enter your name"
                  disabled={isLoading}
                />
                {errors.name && touched.name && (
                  <div className="form-error">{errors.name}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
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

              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="cancel-button"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="save-button"
                  disabled={isLoading}
                >
                  {isLoading ? <LoadingSpinner size="small" text="" /> : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="profile-stats">
          <h3>Account Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">0</div>
              <div className="stat-label">Transactions</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">0</div>
              <div className="stat-label">Reports</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">0</div>
              <div className="stat-label">Current Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile