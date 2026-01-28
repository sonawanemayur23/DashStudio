import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Settings, LayoutGrid, BarChart3, Check, Zap, Shield, Globe, TrendingUp, Database, Sparkles, ArrowRight, Sun, Moon } from 'lucide-react'
import Button from '../components/Button'
import FullPageLoading from '../components/FullPageLoading'
import { useTheme } from '../contexts/ThemeContext'
import { ROUTES } from '../constants/routes'
import './LoginPage.css'

type Role = 'owner' | 'admin' | 'editor' | 'viewer'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [selectedRole, setSelectedRole] = useState<Role>('owner')
  const [isLoading, setIsLoading] = useState(false)

  const roles = [
    {
      id: 'owner' as Role,
      icon: <User size={22} />,
      title: 'Owner',
      description: 'Full workspace control, billing & settings.',
    },
    {
      id: 'admin' as Role,
      icon: <Settings size={22} />,
      title: 'Admin',
      description: 'Manage users, teams & data connections.',
    },
    {
      id: 'editor' as Role,
      icon: <LayoutGrid size={22} />,
      title: 'Editor',
      description: 'Create, edit & publish analytics dashboards.',
    },
    {
      id: 'viewer' as Role,
      icon: <BarChart3 size={22} />,
      title: 'Viewer',
      description: 'Explore data, filter views & ask questions.',
    },
  ]

  const features = [
    {
      icon: <Sparkles size={24} />,
      title: 'AI-Powered Analytics',
      description: 'Ask questions in plain English and get instant insights from your data.',
    },
    {
      icon: <Database size={24} />,
      title: 'Semantic Modeling',
      description: 'Define business logic once, use everywhere. No more repetitive SQL.',
    },
    {
      icon: <Zap size={24} />,
      title: 'Real-time Dashboards',
      description: 'Build interactive dashboards that update automatically.',
    },
    {
      icon: <Shield size={24} />,
      title: 'Enterprise Security',
      description: 'SOC 2 compliant with role-based access control.',
    },
  ]

  const stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '50M+', label: 'Queries Processed' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '4.9/5', label: 'User Rating' },
  ]

  const testimonials = [
    {
      text: "Olive transformed how we approach data. What used to take days now takes minutes.",
      author: 'Sarah Chen',
      role: 'Head of Analytics',
      company: 'TechFlow Inc.',
    },
    {
      text: "The AI assistant is incredible. Our team can now explore data without writing SQL.",
      author: 'Marcus Johnson',
      role: 'Data Lead',
      company: 'FinanceHub',
    },
  ]

  const handleContinue = () => {
    setIsLoading(true)
  }

  const handleLoadingComplete = () => {
    navigate(ROUTES.DASHBOARDS)
  }

  if (isLoading) {
    return (
      <FullPageLoading
        message="Welcome to Olive"
        subMessage={`Setting up your ${roles.find(r => r.id === selectedRole)?.title} workspace...`}
        steps={[
          'Authenticating...',
          'Loading workspace...',
          'Preparing dashboards...',
          'Almost ready...',
        ]}
        duration={2500}
        onComplete={handleLoadingComplete}
      />
    )
  }

  return (
    <div className="login-page">
      {/* Left Panel - Hero & Features */}
      <div className="login-left">
        <div className="login-left-content">
          {/* Logo */}
          <div className="login-logo">
            <div className="logo-icon">
              <span>O</span>
            </div>
            <span className="logo-text">Olive</span>
          </div>

          {/* Hero Section */}
          <div className="login-hero">
            <h1 className="hero-title">
              Transform your data into
              <span className="highlight"> actionable insights</span>
            </h1>
            <p className="hero-subtitle">
              The modern analytics platform that combines AI, semantic modeling, 
              and beautiful visualizations to help teams make data-driven decisions.
            </p>
          </div>

          {/* Stats */}
          <div className="stats-row">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="testimonials-section">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.author}</div>
                    <div className="author-role">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trusted By */}
          <div className="trusted-section">
            <span className="trusted-label">Trusted by teams at</span>
            <div className="trusted-logos">
              <span className="company-logo">Acme Corp</span>
              <span className="company-logo">TechFlow</span>
              <span className="company-logo">DataSync</span>
              <span className="company-logo">CloudBase</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="login-right">
        <div className="login-right-content">
          {/* Theme Toggle */}
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="login-form-header">
            <h1 className="welcome-title">Get Started</h1>
            <p className="welcome-subtitle">
              Select a role to explore the platform with specific permissions and features.
            </p>
          </div>

          {/* Role Selection */}
          <div className="role-grid">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`role-card ${selectedRole === role.id ? 'selected' : ''}`}
                onClick={() => setSelectedRole(role.id)}
              >
                {selectedRole === role.id && (
                  <div className="role-check">
                    <Check size={16} />
                  </div>
                )}
                <div className="role-icon">{role.icon}</div>
                <div className="role-info">
                  <div className="role-title">{role.title}</div>
                  <div className="role-description">{role.description}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Button */}
          <Button
            variant="primary"
            size="lg"
            className="continue-button"
            onClick={handleContinue}
          >
            Continue as {roles.find(r => r.id === selectedRole)?.title}
            <ArrowRight size={18} />
          </Button>

          {/* Divider */}
          <div className="divider">
            <span>Or continue with</span>
          </div>

          {/* Social Login */}
          <div className="social-buttons">
            <button className="social-button">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="social-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </button>
            <button className="social-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#0078d4">
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
              </svg>
              Microsoft
            </button>
          </div>

          {/* Benefits */}
          <div className="benefits-list">
            <div className="benefit-item">
              <Check size={16} className="benefit-check" />
              <span>Free 14-day trial, no credit card required</span>
            </div>
            <div className="benefit-item">
              <Check size={16} className="benefit-check" />
              <span>Connect to any database in minutes</span>
            </div>
            <div className="benefit-item">
              <Check size={16} className="benefit-check" />
              <span>Cancel anytime, no questions asked</span>
            </div>
          </div>

          {/* Footer */}
          <div className="login-footer">
            <a href="#privacy">Privacy Policy</a>
            <span className="footer-dot">•</span>
            <a href="#terms">Terms of Service</a>
            <span className="footer-dot">•</span>
            <a href="#help">Help Center</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
