import React from 'react'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import './Sidebar.css'
const Sidebar = () => {
  const { user } = useAuth()
  const { sidebarOpen, closeSidebar } = useApp()
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/transactions', label: 'Transactions', icon: '💰' },
    { path: '/scores', label: 'Scores', icon: '⭐' },
    { path: '/reports', label: 'Reports', icon: '📋' },
  ]

  const adminItems = [
    { path: '/admin', label: 'Admin Panel', icon: '👑' },
  ]

  const handleNavigation = (path) => {
    navigate(path)
    closeSidebar()
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="close-btn" onClick={closeSidebar}>
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <h3 className="section-title">Main</h3>
            <ul className="nav-list">
              {menuItems.map(item => (
                <li key={item.path}>
                  <button
                    className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {user?.role === 'admin' && (
            <div className="nav-section">
              <h3 className="section-title">Administration</h3>
              <ul className="nav-list">
                {adminItems.map(item => (
                  <li key={item.path}>
                    <button
                      className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                      onClick={() => handleNavigation(item.path)}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      <span className="nav-label">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <div className="user-name">{user?.name}</div>
              <div className="user-role">{user?.role}</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar