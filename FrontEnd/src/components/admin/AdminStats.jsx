import React, { useState, useEffect } from 'react'
import { useApi } from '../../hooks/useApi'
import { adminService } from '../../services/admin'
import LoadingSpinner from '../common/LoadingSpinner'
import './AdminStats.css'

const AdminStats = () => {
  const { data: statsData, loading, error, execute: fetchStats } = useApi(adminService.getStats)
  
  const [stats, setStats] = useState({
    total_users: 0,
    total_transactions: 0,
    average_score: 0
  })

  useEffect(() => {
    if (statsData) {
      setStats(statsData)
    }
  }, [statsData])

  if (loading) {
    return (
      <div className="admin-stats-loading">
        <LoadingSpinner text="Loading statistics..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="admin-stats-error">
        <p>Error loading statistics: {error}</p>
        <button onClick={fetchStats} className="retry-button">
          Try Again
        </button>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.total_users,
      icon: '👥',
      color: 'primary',
      description: 'Registered users in the system'
    },
    {
      title: 'Total Transactions',
      value: stats.total_transactions,
      icon: '💰',
      color: 'success',
      description: 'All financial transactions recorded'
    },
    {
      title: 'Average Score',
      value: `${stats.average_score}/100`,
      icon: '⭐',
      color: 'warning',
      description: 'Average financial score across all users'
    },
    {
      title: 'Active Sessions',
      value: '12',
      icon: '🔐',
      color: 'info',
      description: 'Currently active user sessions'
    }
  ]

  const getColorClass = (color) => {
    const colorMap = {
      primary: 'stat-card-primary',
      success: 'stat-card-success',
      warning: 'stat-card-warning',
      info: 'stat-card-info'
    }
    return colorMap[color] || 'stat-card-primary'
  }

  return (
    <div className="admin-stats">
      <div className="stats-header">
        <h3>System Overview</h3>
        <button 
          onClick={fetchStats}
          className="refresh-stats-button"
          disabled={loading}
        >
          🔄 Refresh
        </button>
      </div>

      <div className="stats-grid">
        {statCards.map((card, index) => (
          <div key={index} className={`stat-card ${getColorClass(card.color)}`}>
            <div className="stat-card-content">
              <div className="stat-icon">{card.icon}</div>
              <div className="stat-info">
                <div className="stat-value">{card.value}</div>
                <div className="stat-title">{card.title}</div>
                <div className="stat-description">{card.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="stats-charts">
        <div className="chart-placeholder">
          <div className="chart-icon">📈</div>
          <h4>User Growth</h4>
          <p>User registration trends over time</p>
          <div className="chart-bars">
            {[30, 45, 60, 80, 95, 112, 128].map((height, index) => (
              <div 
                key={index} 
                className="chart-bar"
                style={{ height: `${height}px` }}
              ></div>
            ))}
          </div>
        </div>

        <div className="chart-placeholder">
          <div className="chart-icon">📊</div>
          <h4>Score Distribution</h4>
          <p>Financial score ranges across users</p>
          <div className="score-distribution">
            <div className="distribution-item">
              <span className="range">0-39</span>
              <div className="distribution-bar">
                <div className="distribution-fill poor" style={{ width: '15%' }}></div>
              </div>
              <span className="percentage">15%</span>
            </div>
            <div className="distribution-item">
              <span className="range">40-59</span>
              <div className="distribution-bar">
                <div className="distribution-fill fair" style={{ width: '25%' }}></div>
              </div>
              <span className="percentage">25%</span>
            </div>
            <div className="distribution-item">
              <span className="range">60-79</span>
              <div className="distribution-bar">
                <div className="distribution-fill good" style={{ width: '45%' }}></div>
              </div>
              <span className="percentage">45%</span>
            </div>
            <div className="distribution-item">
              <span className="range">80-100</span>
              <div className="distribution-bar">
                <div className="distribution-fill excellent" style={{ width: '15%' }}></div>
              </div>
              <span className="percentage">15%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminStats