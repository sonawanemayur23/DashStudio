import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, Grid, List, Sparkles, Eye, MessageCircle, MoreVertical, 
  Trash2, Copy, ExternalLink, TrendingUp, TrendingDown,
  Database, Clock, Users, BarChart3, PieChart, Activity, Zap
} from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Button from '../components/Button'
import FullPageLoading from '../components/FullPageLoading'
import { useTheme } from '../contexts/ThemeContext'
import { useApp } from '../contexts/AppContext'
import { ROUTES } from '../constants/routes'
import './DashboardList.css'

const DashboardList: React.FC = () => {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { dashboards, deleteDashboard, addNotification, currentUser } = useApp()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeMenu, setActiveMenu] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const filteredDashboards = dashboards.filter(dashboard => {
    const matchesSearch = dashboard.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || dashboard.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleNewDashboard = () => {
    navigate(ROUTES.STUDIO)
  }

  const handleDeleteDashboard = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    deleteDashboard(id)
    addNotification({ type: 'success', message: 'Dashboard deleted successfully' })
    setActiveMenu(null)
  }

  const handleDuplicateDashboard = (_id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    addNotification({ type: 'info', message: 'Dashboard duplicated' })
    setActiveMenu(null)
  }

  const handleViewPublished = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(ROUTES.DASHBOARD_PUBLISHED(id))
    setActiveMenu(null)
  }

  // Get gradient based on dashboard type
  const getCardGradient = (_thumbnail: string, index: number) => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    ]
    return gradients[index % gradients.length]
  }

  // Get chart icon based on thumbnail type
  const getChartIcon = (thumbnail: string) => {
    const icons: Record<string, React.ReactNode> = {
      'bar-chart': <BarChart3 size={20} />,
      'bar-chart-up': <TrendingUp size={20} />,
      'pie-chart': <PieChart size={20} />,
      'map': <Activity size={20} />,
      'gauge': <Zap size={20} />,
    }
    return icons[thumbnail] || <BarChart3 size={20} />
  }

  if (isLoading) {
    return (
      <FullPageLoading 
        message="Loading Dashboards"
        subMessage="Fetching your analytics..."
      />
    )
  }

  return (
    <div className="dashboard-list-page">
      <Sidebar 
        title="Olive"
        user={currentUser}
        showUpgrade={true}
      />

      <div className="main-content">
        {/* Hero Header */}
        <div className="page-hero">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={14} />
              <span>AI-Powered Analytics</span>
            </div>
            <h1 >Your Dashboards</h1>
            <p >
              Create, manage, and share intelligent dashboards powered by AI
            </p>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-value">{dashboards.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="hero-stat">
              <span className="stat-value">{dashboards.filter(d => d.status === 'published').length}</span>
              <span className="stat-label">Published</span>
            </div>
            <div className="hero-stat">
              <span className="stat-value">{dashboards.filter(d => d.status === 'draft').length}</span>
              <span className="stat-label">Drafts</span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search dashboards..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="toolbar-right">
            <div className="filter-pills">
              <button 
                className={`filter-pill ${statusFilter === 'all' ? 'active' : ''}`}
                onClick={() => setStatusFilter('all')}
              >
                All
              </button>
              <button 
                className={`filter-pill ${statusFilter === 'published' ? 'active' : ''}`}
                onClick={() => setStatusFilter('published')}
              >
                Published
              </button>
              <button 
                className={`filter-pill ${statusFilter === 'draft' ? 'active' : ''}`}
                onClick={() => setStatusFilter('draft')}
              >
                Drafts
              </button>
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

            <Button variant="primary" icon={<Sparkles size={18} />} onClick={handleNewDashboard}>
              New Dashboard
            </Button>

            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        {filteredDashboards.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon-wrapper">
              <Sparkles size={32} />
            </div>
            <h3>No dashboards found</h3>
            <p>Create your first AI-powered dashboard to get started</p>
            <Button variant="primary" icon={<Sparkles size={18} />} onClick={handleNewDashboard}>
              Create Dashboard
            </Button>
          </div>
        ) : (
          <div className={`dashboards-grid ${viewMode}`}>
            {filteredDashboards.map((dashboard, index) => (
              <div 
                key={dashboard.id} 
                className="dashboard-card"
                onClick={() => navigate(ROUTES.DASHBOARD_DETAIL(dashboard.id))}
              >
                {/* Card Header with Gradient */}
                <div 
                  className="card-header-gradient"
                  style={{ background: getCardGradient(dashboard.thumbnail, index) }}
                >
                  <div className="card-header-content">
                    <div className="card-icon">
                      {getChartIcon(dashboard.thumbnail)}
                    </div>
                    <div className={`card-status ${dashboard.status}`}>
                      <span className="status-dot"></span>
                      {dashboard.status === 'published' ? 'Live' : 'Draft'}
                    </div>
                  </div>
                  
                  {/* Mini Chart Preview */}
                  <div className="mini-chart">
                    <svg viewBox="0 0 100 40" className="chart-line">
                      <polyline
                        fill="none"
                        stroke="rgba(255,255,255,0.5)"
                        strokeWidth="2"
                        points="0,35 15,28 30,32 45,20 60,25 75,15 90,18 100,10"
                      />
                      <polyline
                        fill="none"
                        stroke="rgba(255,255,255,0.9)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        points="0,35 15,28 30,32 45,20 60,25 75,15 90,18 100,10"
                        className="chart-line-animated"
                      />
                    </svg>
                  </div>
                </div>

                {/* Card Body */}
                <div className="card-body">
                  <div className="card-title-row">
                    <h3 className="card-title">{dashboard.title}</h3>
                    <div className="card-menu-wrapper">
                      <button 
                        className="card-menu-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveMenu(activeMenu === dashboard.id ? null : dashboard.id)
                        }}
                      >
                        <MoreVertical size={18} />
                      </button>
                      {activeMenu === dashboard.id && (
                        <div className="dropdown-menu">
                          {dashboard.status === 'published' && (
                            <button onClick={(e) => handleViewPublished(dashboard.id, e)}>
                              <ExternalLink size={16} />
                              View Live
                            </button>
                          )}
                          <button onClick={(e) => handleDuplicateDashboard(dashboard.id, e)}>
                            <Copy size={16} />
                            Duplicate
                          </button>
                          <button className="danger" onClick={(e) => handleDeleteDashboard(dashboard.id, e)}>
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {dashboard.description && (
                    <p className="card-description">{dashboard.description}</p>
                  )}

                  {/* KPI Preview */}
                  {dashboard.kpis && dashboard.kpis.length > 0 && (
                    <div className="card-kpis">
                      {dashboard.kpis.slice(0, 2).map((kpi: { label: string; value: string; change: string; changeType: string }, kpiIndex: number) => (
                        <div key={kpiIndex} className="kpi-mini">
                          <span className="kpi-mini-label">{kpi.label}</span>
                          <div className="kpi-mini-value-row">
                            <span className="kpi-mini-value">{kpi.value}</span>
                            <span className={`kpi-mini-change ${kpi.changeType}`}>
                              {kpi.changeType === 'positive' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                              {kpi.change}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Card Footer */}
                  <div className="card-footer">
                    <div className="card-meta">
                      <div className="meta-item">
                        <Clock size={14} />
                        <span>{formatTimeAgo(dashboard.updatedAt)}</span>
                      </div>
                      {dashboard.dataSource && (
                        <div className="meta-item">
                          <Database size={14} />
                          <span>{dashboard.dataSource.split('.')[0]}</span>
                        </div>
                      )}
                    </div>
                    <div className="card-stats">
                      <div className="stat-item">
                        <Eye size={14} />
                        <span>{dashboard.views >= 1000 ? `${(dashboard.views / 1000).toFixed(1)}k` : dashboard.views}</span>
                      </div>
                      <div className="stat-item">
                        <MessageCircle size={14} />
                        <span>{dashboard.comments}</span>
                      </div>
                    </div>
                  </div>

                  {/* Creator Badge */}
                  <div className="card-creator">
                    <div className="creator-avatar">
                      {dashboard.createdBy === 'AI' ? (
                        <Sparkles size={12} />
                      ) : (
                        <Users size={12} />
                      )}
                    </div>
                    <span>by {dashboard.createdBy}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Create New Card */}
            <div className="dashboard-card create-new-card" onClick={handleNewDashboard}>
              <div className="create-new-content">
                <div className="create-icon">
                  <Sparkles size={28} />
                </div>
                <h3>Create New Dashboard</h3>
                <p>Use AI to generate insights from your data</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardList
