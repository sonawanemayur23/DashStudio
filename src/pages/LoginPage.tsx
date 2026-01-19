import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Settings, LayoutGrid, BarChart3, Check } from 'lucide-react'
import Button from '../components/Button'
import { useTheme } from '../contexts/ThemeContext'
import { ROUTES } from '../constants/routes'
import './LoginPage.css'

type Role = 'owner' | 'admin' | 'editor' | 'viewer'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [selectedRole, setSelectedRole] = useState<Role>('owner')

  const roles = [
    {
      id: 'owner' as Role,
      icon: <User size={24} />,
      title: 'Owner',
      description: 'Full workspace control, billing & settings.',
    },
    {
      id: 'admin' as Role,
      icon: <Settings size={24} />,
      title: 'Admin',
      description: 'Manage users, teams & data connections.',
    },
    {
      id: 'editor' as Role,
      icon: <LayoutGrid size={24} />,
      title: 'Editor',
      description: 'Create, edit & publish analytics dashboards.',
    },
    {
      id: 'viewer' as Role,
      icon: <BarChart3 size={24} />,
      title: 'Viewer',
      description: 'Explore data, filter views & ask questions.',
    },
  ]

  const handleContinue = () => {
    navigate(ROUTES.DASHBOARDS)
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-logo">
          <div className="logo-square">
            <div className="square-grid">
              <div className="square"></div>
              <div className="square"></div>
              <div className="square"></div>
              <div className="square"></div>
            </div>
          </div>
          <span className="logo-text">DashStudio</span>
        </div>
        
        <div className="login-hero">
          <h1 className="hero-title">
            Turn complex data into <span className="highlight">decisions</span> instantly.
          </h1>
        </div>

        <div className="login-testimonial">
          <div className="stars">★★★★★</div>
          <p className="testimonial-text">
            "The semantic modeling capability is a game changer. We went from raw SQL to executive dashboards in minutes."
          </p>
          <div className="testimonial-author">
            <div className="author-avatar"></div>
            <div>
              <div className="author-name">Sarah Jenkins</div>
              <div className="author-title">Head of Data at FinCorp</div>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <h1 className="welcome-title">Welcome back</h1>
        <p className="welcome-subtitle">
          Select a role below to simulate the platform experience with specific permissions.
        </p>

        <div className="role-grid">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`role-card ${selectedRole === role.id ? 'selected' : ''}`}
              onClick={() => setSelectedRole(role.id)}
            >
              {selectedRole === role.id && (
                <div className="role-check">
                  <Check size={20} />
                </div>
              )}
              <div className="role-icon">{role.icon}</div>
              <div className="role-title">{role.title}</div>
              <div className="role-description">{role.description}</div>
            </div>
          ))}
        </div>

        <Button
          variant="primary"
          size="lg"
          className="continue-button"
          onClick={handleContinue}
        >
          Continue as {roles.find(r => r.id === selectedRole)?.title}
          <span>→</span>
        </Button>

        <div className="divider">
          <span>OR SIGN IN WITH</span>
        </div>

        <div className="social-buttons">
          <button className="social-button">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button className="social-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#0078d4">
              <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
            </svg>
            Microsoft
          </button>
        </div>

        <div className="login-footer">
          <a href="#privacy">Privacy Policy</a>
          <span>•</span>
          <a href="#terms">Terms of Service</a>
          <span>•</span>
          <a href="#help">Help Center</a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
