import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Grid, List, Sparkles, Eye, MessageCircle, MoreVertical } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Button from '../components/Button'
import Card from '../components/Card'
import { useTheme } from '../contexts/ThemeContext'
import { ROUTES } from '../constants/routes'
import './DashboardList.css'

const DashboardList: React.FC = () => {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const dashboards = [
    {
      id: 1,
      title: 'Q3 Sales Performance',
      status: 'published',
      thumbnail: 'bar-chart',
      metadata: { time: '2h ago', by: 'AI', views: 124, comments: 12 },
    },
    {
      id: 2,
      title: 'Customer Churn Analysis',
      status: 'draft',
      thumbnail: 'map',
      metadata: { time: 'yesterday', by: 'Me', views: 45, comments: 0 },
    },
    {
      id: 3,
      title: 'Website Traffic Overview',
      status: 'published',
      thumbnail: 'bar-chart-up',
      metadata: { time: '3 days ago', by: 'Team', views: 890, comments: 42 },
    },
    {
      id: 4,
      title: 'Marketing ROI',
      status: 'published',
      thumbnail: 'bar-chart',
      metadata: { time: '5d ago', by: 'Marketing', views: 2100, comments: 89 },
    },
    {
      id: 5,
      title: 'Employee Performance',
      status: 'draft',
      thumbnail: 'gauge',
      metadata: { time: 'Just now', by: 'AI', views: 0, comments: 0 },
    },
    {
      id: 6,
      title: 'Inventory Status',
      status: 'draft',
      thumbnail: 'pie-chart',
      metadata: { time: '1h ago', by: 'AI', views: 2, comments: 0 },
    },
  ]

  const renderThumbnail = (type: string) => {
    const thumbnails: Record<string, React.ReactNode> = {
      'bar-chart': <div className="thumbnail-bar-chart"><div className="bar" style={{height: '40%'}}></div><div className="bar" style={{height: '60%'}}></div><div className="bar" style={{height: '80%'}}></div><div className="bar" style={{height: '100%'}}></div></div>,
      'bar-chart-up': <div className="thumbnail-bar-chart gold"><div className="bar" style={{height: '30%'}}></div><div className="bar" style={{height: '50%'}}></div><div className="bar" style={{height: '70%'}}></div><div className="bar" style={{height: '90%'}}></div><div className="trend-up">↗</div></div>,
      'map': <div className="thumbnail-map"></div>,
      'gauge': <div className="thumbnail-gauge"></div>,
      'pie-chart': <div className="thumbnail-pie"></div>,
    }
    return thumbnails[type] || <div className="thumbnail-default"></div>
  }

  return (
    <div className="dashboard-list-page">
      <Sidebar 
        title="Olive"
        user={{ name: 'Alex Morgan', role: 'Owner' }}
        showUpgrade={true}
      />

      <div className="main-content">
        <div className="page-header">
          <div>
            <h1 className="page-title">Dashboards</h1>
            <p className="page-subtitle">Manage and view your AI-generated analytics.</p>
          </div>
        </div>

        <div className="toolbar">
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search dashboards by name or tag..." 
              className="search-input"
            />
          </div>

          <div className="filters">
            <select className="filter-select">
              <option>Status: All</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
            <select className="filter-select">
              <option>Owner: Me</option>
              <option>Team</option>
              <option>All</option>
            </select>
          </div>

          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={18} />
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
            </button>
          </div>

          <Button variant="primary" icon={<Sparkles size={18} />}>
            New Dashboard
          </Button>

          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        <div className={`dashboards-grid ${viewMode}`}>
          {dashboards.map((dashboard) => (
            <Card 
              key={dashboard.id} 
              className="dashboard-card"
              onClick={() => navigate(ROUTES.DASHBOARD_DETAIL(dashboard.id))}
            >
              <div className="dashboard-thumbnail">
                {renderThumbnail(dashboard.thumbnail)}
              </div>
              
              <div className="dashboard-content">
                <div className="dashboard-header">
                  <div className="dashboard-title-wrapper">
                    <h3 className="dashboard-title">{dashboard.title}</h3>
                    <div className={`status-badge status-${dashboard.status}`}>
                      {dashboard.status.charAt(0).toUpperCase() + dashboard.status.slice(1)}
                    </div>
                  </div>
                  <button className="dashboard-menu" onClick={(e) => e.stopPropagation()}>
                    <MoreVertical size={18} />
                  </button>
                </div>

                <div className="dashboard-metadata">
                  <span className="metadata-text">
                    {dashboard.metadata.time.includes('ago') || dashboard.metadata.time === 'yesterday' || dashboard.metadata.time === 'Just now'
                      ? `Generated ${dashboard.metadata.time}`
                      : dashboard.metadata.time === 'yesterday'
                      ? `Edited ${dashboard.metadata.time}`
                      : `Updated ${dashboard.metadata.time}`}
                    {' • '}
                    by {dashboard.metadata.by}
                  </span>
                  
                  <div className="dashboard-stats">
                    <span className="stat-item">
                      <Eye size={14} />
                      {dashboard.metadata.views >= 1000 
                        ? `${(dashboard.metadata.views / 1000).toFixed(1)}k`
                        : dashboard.metadata.views}
                    </span>
                    <span className="stat-item">
                      <MessageCircle size={14} />
                      {dashboard.metadata.comments}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardList
