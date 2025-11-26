import React from 'react'
import { useAuth } from '../context/AuthContext'
import Header from '../components/common/Header'
import Sidebar from '../components/common/Sidebar'
import Footer from '../components/common/Footer'
import Notification from '../components/common/Notification'
import Profile from '../components/auth/Profile'
import './Profile.css'

const ProfilePage = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    window.location.href = '/login'
    return null
  }

  return (
    <div className="profile-page">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <main className="main-content">
          <div className="page-container">
            <Profile />
          </div>
        </main>
      </div>
      <Footer />
      <Notification />
    </div>
  )
}

export default ProfilePage