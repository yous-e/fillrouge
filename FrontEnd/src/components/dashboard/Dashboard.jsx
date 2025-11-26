import React from 'react'
import { useAuth } from '../../context/AuthContext'
import StatsCards from './StatsCards'
import RecentTransactions from './RecentTransactions'
import ScoreChart from './ScoreChart'
import LoadingSpinner from '../common/LoadingSpinner'
import './Dashboard.css'

const Dashboard = () => {
  const { user } = useAuth()

  // Mock data - in real app, this would come from API
  const dashboardData = {
    stats: {
      totalTransactions: 24,
      totalIncome: 12500,
      totalExpenses: 8400,
      currentScore: 76
    },
    recentTransactions: [
      { id: 1, type: 'income', amount: 2500, category: 'Salary', date: '2024-01-15' },
      { id: 2, type: 'expense', amount: 150, category: 'Food', date: '2024-01-14' },
      { id: 3, type: 'expense', amount: 300, category: 'Shopping', date: '2024-01-13' },
      { id: 4, type: 'income', amount: 500, category: 'Freelance', date: '2024-01-12' }
    ],
    scoreHistory: [65, 68, 72, 70, 74, 76]
  }

  if (!user) {
    return <LoadingSpinner text="Loading dashboard..." />
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user.name}!</h1>
        <p>Here's your financial overview</p>
      </div>

      <StatsCards stats={dashboardData.stats} />
      
      <div className="dashboard-grid">
        <div className="dashboard-column">
          <RecentTransactions transactions={dashboardData.recentTransactions} />
        </div>
        <div className="dashboard-column">
          <ScoreChart scores={dashboardData.scoreHistory} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard