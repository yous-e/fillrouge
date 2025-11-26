import React from 'react'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'
import './Header.css'
const Header = () => {
  const { user, logout } = useAuth()
  const { toggleSidebar } = useApp()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            <button 
              className="menu-toggle" 
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              <span className="menu-icon">☰</span>
            </button>
            <div className="logo">
              <h1>Finance Score</h1>
            </div>
          </div>

          <div className="header-right">
            <nav className="nav-links">
              {user && (
                <>
                  <span className="user-greeting">
                    Welcome, {user.name}
                  </span>
                  {user.role === 'admin' && (
                    <a href="/admin" className="nav-link admin-link">
                      Admin
                    </a>
                  )}
                  <a href="/profile" className="nav-link">
                    Profile
                  </a>
                  <button 
                    onClick={handleLogout}
                    className="logout-btn"
                  >
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header