import React from 'react'
import { useAuth } from '../context/AuthContext'
import Header from '../components/common/Header'
import Sidebar from '../components/common/Sidebar'
import Footer from '../components/common/Footer'
import Notification from '../components/common/Notification'
import Dashboard from '../components/dashboard/Dashboard'
import './Dashboard.css'

const DashboardPage = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    window.location.href = '/login'
    return null
  }

  return (
    <div className="dashboard-page">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <main className="main-content">
          <div className="page-container">
            <Dashboard />
          </div>
        </main>
      </div>
      <Footer />
      <Notification />
    </div>
  )
}

export default DashboardPage