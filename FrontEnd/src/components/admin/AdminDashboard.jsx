import React from 'react'
import { useAuth } from '../../context/AuthContext'
import UserManagement from './UserManagement'
import AdminStats from './AdminStats'
import LoadingSpinner from '../common/LoadingSpinner'
import './AdminDashboard.css'

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth()

  if (!isAdmin) {
    return (
      <div className="admin-access-denied">
        <h2>Access Denied</h2>
        <p>You need administrator privileges to access this page.</p>
      </div>
    )
  }

  if (!user) {
    return <LoadingSpinner text="Loading admin dashboard..." />
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <p>Manage your Finance Score application</p>
        </div>
        <div className="admin-welcome">
          Welcome, <strong>{user.name}</strong>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-section">
          <AdminStats />
        </div>
        
        <div className="admin-section">
          <UserManagement />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard