import React, { useState, useEffect } from 'react'
import { useApi } from '../../hooks/useApi'
import { adminService } from '../../services/admin'
import { useNotification } from '../../context/NotificationContext'
import UserList from './UserList'
import UserForm from './UserForm'
import LoadingSpinner from '../common/LoadingSpinner'
import './UserManagement.css'
import { useAuth } from '../../context/AuthContext'

const UserManagement = () => {
  const { data: usersData, loading, error, execute: fetchUsers } = useApi(adminService.getUsers)
  const { success, error: notifyError } = useNotification()
  
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [showUserForm, setShowUserForm] = useState(false)

  useEffect(() => {
    if (usersData) {
      setUsers(usersData)
    }
  }, [usersData])

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return
    }

    try {
      await adminService.deleteUser(userId)
      setUsers(prev => prev.filter(user => user.id !== userId))
      success('User deleted successfully!')
    } catch (err) {
      notifyError('Failed to delete user')
    }
  }

  const handleAssignRole = async (userId, newRole) => {
    try {
      const result = await adminService.assignRole(userId, newRole)
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ))
      success(`Role updated to ${newRole} for user ${result.user.name}`)
    } catch (err) {
      notifyError('Failed to update user role')
    }
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setShowUserForm(true)
  }

  const handleCreateUser = () => {
    setSelectedUser(null)
    setShowUserForm(true)
  }

  const handleCloseForm = () => {
    setShowUserForm(false)
    setSelectedUser(null)
  }

  const handleUserUpdate = (updatedUser) => {
    if (selectedUser) {
      // Update existing user
      setUsers(prev => prev.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      ))
    } else {
      // Add new user
      setUsers(prev => [updatedUser, ...prev])
    }
    setShowUserForm(false)
    setSelectedUser(null)
  }

  const userStats = {
    total: users.length,
    admins: users.filter(user => user.role === 'admin').length,
    active: users.filter(user => user.status === 'active').length,
    newThisMonth: users.filter(user => {
      const userDate = new Date(user.created_at)
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      return userDate > monthAgo
    }).length
  }

  if (loading) {
    return (
      <div className="user-management-loading">
        <LoadingSpinner text="Loading users..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="user-management-error">
        <p>Error loading users: {error}</p>
        <button onClick={fetchUsers} className="retry-button">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="user-management">
      <div className="management-header">
        <div className="header-content">
          <h3>User Management</h3>
          <p>Manage system users and their permissions</p>
        </div>
        <button
          onClick={handleCreateUser}
          className="add-user-button"
        >
          👤 Add New User
        </button>
      </div>

      <div className="user-stats">
        <div className="stat-card">
          <div className="stat-value">{userStats.total}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{userStats.admins}</div>
          <div className="stat-label">Administrators</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{userStats.active}</div>
          <div className="stat-label">Active Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{userStats.newThisMonth}</div>
          <div className="stat-label">New This Month</div>
        </div>
      </div>

      {showUserForm && (
        <UserForm
          user={selectedUser}
          onSave={handleUserUpdate}
          onCancel={handleCloseForm}
        />
      )}

      <UserList
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onAssignRole={handleAssignRole}
      />
    </div>
  )
}

export default UserManagement