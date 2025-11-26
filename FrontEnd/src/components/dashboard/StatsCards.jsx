import React from 'react'
import './StatsCards.css'

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Transactions',
      value: stats.totalTransactions,
      icon: '💰',
      color: 'primary',
      trend: '+12%'
    },
    {
      title: 'Total Income',
      value: `$${stats.totalIncome.toLocaleString()}`,
      icon: '📈',
      color: 'success',
      trend: '+8%'
    },
    {
      title: 'Total Expenses',
      value: `$${stats.totalExpenses.toLocaleString()}`,
      icon: '📉',
      color: 'warning',
      trend: '-5%'
    },
    {
      title: 'Current Score',
      value: `${stats.currentScore}/100`,
      icon: '⭐',
      color: 'info',
      trend: '+4'
    }
  ]

  const getColorClass = (color) => {
    const colorMap = {
      primary: 'stats-card-primary',
      success: 'stats-card-success',
      warning: 'stats-card-warning',
      info: 'stats-card-info'
    }
    return colorMap[color] || 'stats-card-primary'
  }

  return (
    <div className="stats-cards">
      {cards.map((card, index) => (
        <div key={index} className={`stats-card ${getColorClass(card.color)}`}>
          <div className="stats-card-content">
            <div className="stats-card-header">
              <div className="stats-icon">{card.icon}</div>
              <div className="stats-trend">{card.trend}</div>
            </div>
            <div className="stats-value">{card.value}</div>
            <div className="stats-title">{card.title}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards