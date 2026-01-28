import React, { useState, useEffect } from 'react'
import { Search, Bell, User, Moon, Sun, Globe, Shield, CreditCard } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Card from '../components/Card'
import Button from '../components/Button'
import FullPageLoading from '../components/FullPageLoading'
import { useTheme } from '../contexts/ThemeContext'
import { useApp } from '../contexts/AppContext'
import './Settings.css'

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const { currentUser, addNotification } = useApp()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const handleAction = (action: string) => {
    addNotification({ type: 'info', message: `${action} - Feature coming soon!` })
  }

  if (isLoading) {
    return (
      <FullPageLoading
        message="Loading Settings"
        subMessage="Preparing your preferences..."
      />
    )
  }

  return (
    <div className="settings-page">
      <Sidebar 
        title="Olive"
        user={currentUser}
      />

      <div className="main-content">
        <div className="top-header">
          <div className="page-title-section">
            <h1>Settings</h1>
          </div>
          <div className="header-actions">
            <div className="search-bar">
              <Search size={18} />
              <input type="text" placeholder="Search..." />
            </div>
            <button className="icon-button">
              <Bell size={20} />
            </button>
            <div className="user-avatar-small">
              <span>{currentUser.name.split(' ').map(n => n[0]).join('')}</span>
            </div>
          </div>
        </div>

        <div className="settings-content">
          <div className="settings-section">
            <h2 className="section-title">Appearance</h2>
            <Card className="settings-card">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-icon">
                    {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                  </div>
                  <div>
                    <h3 className="setting-label">Theme</h3>
                    <p className="setting-description">Choose between dark and light mode</p>
                  </div>
                </div>
                <button className="theme-toggle-setting" onClick={toggleTheme}>
                  {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
                </button>
              </div>
            </Card>
          </div>

          <div className="settings-section">
            <h2 className="section-title">Account</h2>
            <Card className="settings-card">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-icon">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="setting-label">Profile Information</h3>
                    <p className="setting-description">Update your personal information</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleAction('Edit Profile')}>
                  Edit Profile
                </Button>
              </div>
            </Card>
          </div>

          <div className="settings-section">
            <h2 className="section-title">Workspace</h2>
            <Card className="settings-card">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-icon">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h3 className="setting-label">Workspace Name</h3>
                    <p className="setting-description">Olive</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleAction('Change Workspace')}>
                  Change
                </Button>
              </div>
            </Card>
          </div>

          <div className="settings-section">
            <h2 className="section-title">Security</h2>
            <Card className="settings-card">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-icon">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h3 className="setting-label">Password</h3>
                    <p className="setting-description">Last changed 30 days ago</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleAction('Change Password')}>
                  Change Password
                </Button>
              </div>
            </Card>
          </div>

          <div className="settings-section">
            <h2 className="section-title">Billing</h2>
            <Card className="settings-card">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-icon">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <h3 className="setting-label">Subscription</h3>
                    <p className="setting-description">Enterprise Plan • $99/month</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleAction('Manage Billing')}>
                  Manage Billing
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings




