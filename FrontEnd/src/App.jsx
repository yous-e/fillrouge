import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import { AppProvider } from './context/AppContext'
import AppRouter from './router'
import './App.css'

function App() {
  return (
    <Router>
      <NotificationProvider>
        <AuthProvider>
          <AppProvider>
            <div className="App">
              <AppRouter />
            </div>
          </AppProvider>
        </AuthProvider>
      </NotificationProvider>
    </Router>
  )
}

export default App