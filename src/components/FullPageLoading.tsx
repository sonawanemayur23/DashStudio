import React, { useState, useEffect } from 'react'
import { Sparkles, Loader2, CheckCircle } from 'lucide-react'
import './FullPageLoading.css'

interface FullPageLoadingProps {
  message?: string
  subMessage?: string
  steps?: string[]
  onComplete?: () => void
  duration?: number
}

const FullPageLoading: React.FC<FullPageLoadingProps> = ({ 
  message = 'Loading...', 
  subMessage,
  steps = [],
  onComplete,
  duration = 1200 
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const stepDuration = steps.length > 0 ? duration / steps.length : duration
    
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + (100 / (duration / 50))
      })
    }, 50)

    // Step animation (if steps provided)
    let stepInterval: ReturnType<typeof setInterval> | null = null
    if (steps.length > 0) {
      stepInterval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            if (stepInterval) clearInterval(stepInterval)
            return prev
          }
          return prev + 1
        })
      }, stepDuration)
    }

    // Completion callback - always runs after duration
    const completeTimeout = setTimeout(() => {
      setIsComplete(true)
      if (onComplete) {
        setTimeout(onComplete, 300)
      }
    }, duration)

    return () => {
      clearInterval(progressInterval)
      if (stepInterval) clearInterval(stepInterval)
      clearTimeout(completeTimeout)
    }
  }, [duration, steps.length, onComplete])

  return (
    <div className="full-page-loading">
      <div className="loading-content">
        <div className="loading-icon-wrapper">
          {isComplete ? (
            <CheckCircle size={48} className="success-icon" />
          ) : (
            <>
              <Sparkles size={48} className="sparkle-icon" />
              <div className="icon-ring"></div>
            </>
          )}
        </div>
        
        <h2 className="loading-title">{isComplete ? 'Complete!' : message}</h2>
        
        {subMessage && !isComplete && (
          <p className="loading-subtitle">{subMessage}</p>
        )}

        {steps.length > 0 && !isComplete && (
          <div className="loading-steps">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`loading-step ${index < currentStep ? 'completed' : index === currentStep ? 'active' : ''}`}
              >
                <div className="step-indicator">
                  {index < currentStep ? (
                    <CheckCircle size={16} />
                  ) : index === currentStep ? (
                    <Loader2 size={16} className="spinning" />
                  ) : (
                    <div className="step-dot"></div>
                  )}
                </div>
                <span className="step-text">{step}</span>
              </div>
            ))}
          </div>
        )}

        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <span className="progress-text">{Math.round(Math.min(progress, 100))}%</span>
        </div>
      </div>
    </div>
  )
}

export default FullPageLoading
