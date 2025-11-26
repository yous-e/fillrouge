import React, { useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import './Modal.css'

const Modal = () => {
  const { modal, closeModal } = useApp()

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    if (modal.isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [modal.isOpen, closeModal])

  if (!modal.isOpen) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button 
          className="modal-close" 
          onClick={closeModal}
          aria-label="Close modal"
        >
          ✕
        </button>
        {modal.content}
      </div>
    </div>
  )
}

export default Modal