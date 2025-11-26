import React, { useState } from 'react'
import './UserList.css'

const UserList = ({ users, onEdit, onDelete, onAssignRole }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const handleRoleChange = (userId, newRole) => {
    onAssignRole(userId, newRole)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusBadge = (user) => {
    // Mock status - in real app this would come from user data
    const status = Math.random() > 0.2 ? 'active' : 'inactive'
    return (
      <span className={`status-badge status-${status}`}>
        {status}
      </span>
    )
  }

  return (
    <div className="user-list">
      <div className="list-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-controls">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="role-filter"
          >
            <option value="all">All Roles</option>
            <option value="admin">Administrators</option>
            <option value="user">Users</option>
          </select>
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-users">
                  No users found matching your criteria
                </td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.id} className="user-row">
                  <td className="user-info">
                    <div className="user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-details">
                      <div className="user-name">{user.name}</div>
                      <div className="user-email">{user.email}</div>
                    </div>
                  </td>
                  <td className="user-role">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="role-select"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="user-status">
                    {getStatusBadge(user)}
                  </td>
                  <td className="user-joined">
                    {formatDate(user.created_at)}
                  </td>
                  <td className="user-actions">
                    <button
                      onClick={() => onEdit(user)}
                      className="action-button edit-button"
                      title="Edit User"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="action-button delete-button"
                      title="Delete User"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="list-footer">
        <div className="results-count">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>
    </div>
  )
}

export default UserList