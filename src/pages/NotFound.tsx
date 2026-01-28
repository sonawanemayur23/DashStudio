import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft, AlertCircle } from 'lucide-react'
import Button from '../components/Button'
import { ROUTES } from '../constants/routes'
import './NotFound.css'

const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon">
          <AlertCircle size={80} />
        </div>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-description">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="not-found-actions">
          <Button 
            variant="primary" 
            icon={<Home size={18} />}
            onClick={() => navigate(ROUTES.HOME)}
          >
            Go to Home
          </Button>
          <Button 
            variant="outline" 
            icon={<ArrowLeft size={18} />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound




