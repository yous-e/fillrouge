import React, { createContext, useState, useContext } from 'react'

// Create and export the context
export const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modal, setModal] = useState({ isOpen: false, content: null })
  const [loading, setLoading] = useState(false)

  const openSidebar = () => setSidebarOpen(true)
  const closeSidebar = () => setSidebarOpen(false)
  const toggleSidebar = () => setSidebarOpen(prev => !prev)

  const openModal = (content) => setModal({ isOpen: true, content })
  const closeModal = () => setModal({ isOpen: false, content: null })

  const startLoading = () => setLoading(true)
  const stopLoading = () => setLoading(false)

  const value = {
    // Sidebar
    sidebarOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar,
    
    // Modal
    modal,
    openModal,
    closeModal,
    
    // Loading
    loading,
    startLoading,
    stopLoading
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}