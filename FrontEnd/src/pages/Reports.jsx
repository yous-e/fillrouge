import React from 'react'
import { useAuth } from '../context/AuthContext'
import Header from '../components/common/Header'
import Sidebar from '../components/common/Sidebar'
import Footer from '../components/common/Footer'
import Notification from '../components/common/Notification'
import ReportList from '../components/reports/ReportList'
import './Reports.css'

const ReportsPage = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    window.location.href = '/login'
    return null
  }

  return (
    <div className="reports-page">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <main className="main-content">
          <div className="page-container">
            <ReportList />
          </div>
        </main>
      </div>
      <Footer />
      <Notification />
    </div>
  )
}

export default ReportsPage