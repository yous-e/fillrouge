import React from 'react'
import { useNotification } from '../../context/NotificationContext'
import './Notification.css'
const Notification = () => {
  const { notifications, removeNotification } = useNotification()

  if (notifications.length === 0) return null

  return (
    <div className="notifications-container">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
          onClick={() => removeNotification(notification.id)}
        >
          <div className="notification-content">
            <div className="notification-message">
              {notification.message}
            </div>
            <button
              className="notification-close"
              onClick={(e) => {
                e.stopPropagation()
                removeNotification(notification.id)
              }}
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>
          <div 
            className="notification-progress" 
            style={{ 
              animationDuration: `${notification.duration}ms` 
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default Notification