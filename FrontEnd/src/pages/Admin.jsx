import React from 'react'
import { useAuth } from '../context/AuthContext'
import Header from '../components/common/Header'
import Sidebar from '../components/common/Sidebar'
import Footer from '../components/common/Footer'
import Notification from '../components/common/Notification'
import AdminDashboard from '../components/admin/AdminDashboard'
import './Admin.css'

const AdminPage = () => {
  const { isAuthenticated, isAdmin } = useAuth()

  if (!isAuthenticated) {
    window.location.href = '/login'
    return null
  }

  if (!isAdmin) {
    window.location.href = '/dashboard'
    return null
  }

  return (
    <div className="admin-page">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <main className="main-content">
          <div className="page-container">
            <AdminDashboard />
          </div>
        </main>
      </div>
      <Footer />
      <Notification />
    </div>
  )
}

export default AdminPage