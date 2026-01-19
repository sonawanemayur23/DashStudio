import React from 'react'
import { Loader2, Sparkles, Zap, Rocket, CheckCircle } from 'lucide-react'
import './Loading.css'

interface LoadingProps {
  message?: string
  variant?: 'default' | 'sparkles' | 'zap' | 'rocket'
  size?: 'sm' | 'md' | 'lg'
}

const loadingMessages = [
  'Crafting magic... ✨',
  'Almost there! 🚀',
  'Working on it... ⚡',
  'Brewing insights... ☕',
  'Connecting the dots... 🔗',
  'Preparing something amazing... 🎯',
  'Just a moment... ⏳',
  'Making it happen... 💫',
]

const Loading: React.FC<LoadingProps> = ({ 
  message, 
  variant = 'default',
  size = 'md'
}) => {
  const displayMessage = message || loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
  
  const getIcon = () => {
    switch (variant) {
      case 'sparkles':
        return <Sparkles size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} className="spinning" />
      case 'zap':
        return <Zap size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} className="pulsing" />
      case 'rocket':
        return <Rocket size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} className="bouncing" />
      default:
        return <Loader2 size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} className="spinning" />
    }
  }

  return (
    <div className={`loading-container loading-${size}`}>
      {getIcon()}
      <span className="loading-message">{displayMessage}</span>
    </div>
  )
}

export default Loading


