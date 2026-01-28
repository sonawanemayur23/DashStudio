import React from 'react'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'
import { useApp, Notification } from '../contexts/AppContext'
import './Toast.css'

const Toast: React.FC = () => {
  const { notifications, removeNotification } = useApp()

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />
      case 'error':
        return <XCircle size={20} />
      case 'warning':
        return <AlertCircle size={20} />
      case 'info':
      default:
        return <Info size={20} />
    }
  }

  if (notifications.length === 0) return null

  return (
    <div className="toast-container">
      {notifications.map((notification) => (
        <div 
          key={notification.id} 
          className={`toast toast-${notification.type}`}
        >
          <div className="toast-icon">
            {getIcon(notification.type)}
          </div>
          <span className="toast-message">{notification.message}</span>
          <button 
            className="toast-close"
            onClick={() => removeNotification(notification.id)}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Toast
