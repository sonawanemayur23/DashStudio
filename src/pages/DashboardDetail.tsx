import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Search, Bell, Edit2, Share2, Send, Sparkles, ArrowLeft, Eye, Copy, Check, X, ArrowUp } from 'lucide-react'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Sidebar from '../components/Sidebar'
import Button from '../components/Button'
import Card from '../components/Card'
import FullPageLoading from '../components/FullPageLoading'
import { useApp } from '../contexts/AppContext'
import { ROUTES } from '../constants/routes'
import './DashboardDetail.css'

const DashboardDetail: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getDashboard, publishDashboard, addNotification, currentUser } = useApp()
  
  const [isLoading, setIsLoading] = useState(true)
  const [isPublishing, setIsPublishing] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const [dashboard, setDashboard] = useState<any>(null)
  const [aiQuestion, setAiQuestion] = useState('')
  const [showAiChat, setShowAiChat] = useState(false)
  const [aiMessages, setAiMessages] = useState<any[]>([])
  const [isAiTyping, setIsAiTyping] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const dashboardData = getDashboard(Number(id))
      if (dashboardData) {
        setDashboard(dashboardData)
      }
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [id, getDashboard])

  const handlePublish = () => {
    setIsPublishing(true)
  }

  const handlePublishComplete = () => {
    publishDashboard(Number(id))
    addNotification({ type: 'success', message: 'Dashboard published successfully!' })
    navigate(ROUTES.DASHBOARD_PUBLISHED(id!))
  }

  const handleEditLayout = () => {
    navigate(`/visualization/edit/${id}`)
  }

  const handleCopyLink = () => {
    const publishedUrl = `${window.location.origin}/view/${id}`
    navigator.clipboard.writeText(publishedUrl)
    setLinkCopied(true)
    addNotification({ type: 'success', message: 'Link copied to clipboard!' })
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const handleAskAi = () => {
    if (!aiQuestion.trim()) return
    
    setAiMessages(prev => [...prev, { type: 'user', content: aiQuestion }])
    setAiQuestion('')
    setIsAiTyping(true)
    setShowAiChat(true)

    setTimeout(() => {
      const responses = [
        'Based on the data, revenue increased by 12% primarily due to strong performance in the North America region. The Q3 marketing campaign contributed significantly.',
        'The churn rate improvement of 0.5% can be attributed to the enhanced onboarding process implemented in July. Customer satisfaction scores also improved.',
        'Looking at the trends, I recommend focusing on the Enterprise segment which shows 25% higher deal sizes compared to the average.',
      ]
      setAiMessages(prev => [...prev, { type: 'assistant', content: responses[Math.floor(Math.random() * responses.length)] }])
      setIsAiTyping(false)
    }, 1500)
  }

  const defaultKpiData = [
    { label: 'Total Revenue', value: '$1.2M', change: '+12%', changeType: 'positive', icon: '💰', context: 'vs. previous period' },
    { label: 'Active Users', value: '4,302', change: '+5.2%', changeType: 'positive', icon: '👥', context: 'vs. previous period' },
    { label: 'Avg. Deal Size', value: '$8.4k', change: '-2.1%', changeType: 'negative', icon: '🛍️', context: 'vs. previous period' },
    { label: 'Churn Rate', value: '2.1%', change: '-0.5%', changeType: 'positive', icon: '📉', context: 'Improvement from last Q' },
  ]

  const kpiData = dashboard?.kpis || defaultKpiData

  const revenueData = [
    { month: 'Jan', revenue: 85000 },
    { month: 'Feb', revenue: 92000 },
    { month: 'Mar', revenue: 78000 },
    { month: 'Apr', revenue: 105000 },
    { month: 'May', revenue: 118000 },
    { month: 'Jun', revenue: 125000 },
    { month: 'Jul', revenue: 132000 },
  ]

  const trafficData = [
    { name: 'Direct', value: 45, color: '#3b82f6' },
    { name: 'Organic Search', value: 25, color: '#8b5cf6' },
    { name: 'Social', value: 30, color: '#7c3aed' },
  ]

  const transactions = [
    { customer: 'Acme Corp', date: 'Oct 2023', amount: '$12,450', status: 'Paid' },
    { customer: 'Tech Solutions', date: 'Oct 2023', amount: '$8,920', status: 'Paid' },
    { customer: 'Global Inc', date: 'Sep 2023', amount: '$15,680', status: 'Pending' },
  ]

  if (isLoading) {
    return (
      <FullPageLoading
        message="Loading Dashboard"
        subMessage="Preparing your analytics..."
      />
    )
  }

  if (isPublishing) {
    return (
      <FullPageLoading
        message="Publishing Dashboard"
        subMessage="Making your dashboard live..."
        steps={[
          'Validating dashboard...',
          'Generating public URL...',
          'Configuring permissions...',
          'Publishing...',
        ]}
        duration={2500}
        onComplete={handlePublishComplete}
      />
    )
  }

  if (!dashboard) {
    return (
      <div className="dashboard-detail-page">
        <Sidebar title="Olive" user={currentUser} />
        <div className="main-content">
          <div className="not-found-state">
            <h2>Dashboard Not Found</h2>
            <p>The dashboard you're looking for doesn't exist.</p>
            <Button variant="primary" onClick={() => navigate(ROUTES.DASHBOARDS)}>
              Back to Dashboards
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-detail-page">
      <Sidebar 
        title="Olive"
        user={currentUser}
        projects={[
          { name: 'Marketing Q3', color: '#3b82f6' },
          { name: 'Sales Forecast', color: '#10b981' },
          { name: 'Product Usage', color: '#f59e0b' },
        ]}
      />

      {/* Share Modal */}
      {showShareModal && (
        <div className="modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="share-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Share Dashboard</h3>
              <button className="close-modal-btn" onClick={() => setShowShareModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-content">
              <div className="share-info">
                <p>Share this dashboard with your team or make it public.</p>
              </div>
              <div className="share-link-section">
                <label>Dashboard Link</label>
                <div className="link-input-wrapper">
                  <input 
                    type="text" 
                    value={`${window.location.origin}/view/${id}`} 
                    readOnly 
                    className="share-link-input"
                  />
                  <button className="copy-btn" onClick={handleCopyLink}>
                    {linkCopied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
              {dashboard.status === 'published' && (
                <Button 
                  variant="primary" 
                  className="view-published-btn"
                  onClick={() => navigate(ROUTES.DASHBOARD_PUBLISHED(id!))}
                  icon={<Eye size={16} />}
                >
                  View Published Dashboard
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="main-content">
        <div className="top-header">
          <div className="breadcrumbs">
            <button className="back-btn" onClick={() => navigate(ROUTES.DASHBOARDS)}>
              <ArrowLeft size={16} />
            </button>
            <span>Dashboards</span>
            <span>/</span>
            <span>{dashboard.title}</span>
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

        <div className="dashboard-header">
          <div>
            <div className="dashboard-title-row">
              <h1 className="dashboard-title-main">{dashboard.title}</h1>
              <span className={`status-badge-detail ${dashboard.status === 'draft' ? 'draft' : 'published'}`}>
                {dashboard.status === 'draft' ? 'Preview Mode' : 'Published'}
              </span>
            </div>
            <p className="dashboard-meta">
              Generated by {dashboard.createdBy} • Last updated {new Date(dashboard.updatedAt).toLocaleDateString()}
            </p>
          </div>
          
          <div className="dashboard-actions">
            <Button variant="outline" icon={<Edit2 size={16} />} onClick={handleEditLayout}>
              Edit Layout
            </Button>
            <Button variant="outline" icon={<Share2 size={16} />} onClick={() => setShowShareModal(true)}>
              Share
            </Button>
            {dashboard.status === 'draft' ? (
              <Button variant="primary" icon={<Send size={16} />} onClick={handlePublish}>
                Publish
              </Button>
            ) : (
              <Button variant="primary" icon={<Eye size={16} />} onClick={() => navigate(ROUTES.DASHBOARD_PUBLISHED(id!))}>
                View Live
              </Button>
            )}
          </div>
        </div>

        <div className="filters-section">
          <span className="filters-label">FILTERS:</span>
          <select className="filter-dropdown">
            <option>Last 90 Days</option>
          </select>
          <select className="filter-dropdown">
            <option>Region: All Regions</option>
          </select>
          <select className="filter-dropdown">
            <option>Product: Enterprise</option>
          </select>
          <Button variant="ghost" size="sm">
            Reset All
          </Button>
        </div>

        <div className="kpi-grid">
          {kpiData.map((kpi: { label: string; value: string; change: string; changeType: string; icon: string; context: string }, index: number) => (
            <Card key={index} className="kpi-card">
              <div className="kpi-header">
                <div className="kpi-icon">{kpi.icon}</div>
                <div className="kpi-label">{kpi.label}</div>
              </div>
              <div className="kpi-value">{kpi.value}</div>
              <div className={`kpi-change kpi-change-${kpi.changeType}`}>
                {kpi.change}
              </div>
              <div className="kpi-context">{kpi.context}</div>
            </Card>
          ))}
        </div>

        <div className="charts-grid">
          <Card className="chart-card">
            <div className="chart-header">
              <div>
                <h3 className="chart-title">Revenue Overview</h3>
                <p className="chart-subtitle">Monthly recurring revenue over time</p>
              </div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="month" stroke="var(--text-secondary)" />
                  <YAxis stroke="var(--text-secondary)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--bg-card)', 
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-primary)'
                    }}
                  />
                  <Bar dataKey="revenue" fill="var(--blue-500)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Traffic Source</h3>
            </div>
            <div className="pie-chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={trafficData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {trafficData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-center-text">
                <div className="pie-center-value">45%</div>
                <div className="pie-center-label">DIRECT</div>
              </div>
            </div>
            <div className="pie-legend">
              {trafficData.map((item, index) => (
                <div key={index} className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="chart-card">
            <div className="chart-header">
              <div>
                <h3 className="chart-title">Recent Transactions</h3>
              </div>
              <a href="#" className="view-all-link">View All</a>
            </div>
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>CUSTOMER</th>
                  <th>DATE</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <tr key={index}>
                    <td>{tx.customer}</td>
                    <td>{tx.date}</td>
                    <td>{tx.amount}</td>
                    <td><span className="status-badge-small">{tx.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Geographic Distribution</h3>
            </div>
            <div className="geo-placeholder">
              <div className="placeholder-text">300x300</div>
            </div>
          </Card>
        </div>

        {/* AI Chat Panel */}
        {showAiChat && (
          <div className="ai-chat-panel">
            <div className="ai-chat-header">
              <Sparkles size={18} />
              <span>AI Assistant</span>
              <button className="close-chat-btn" onClick={() => setShowAiChat(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="ai-chat-messages">
              {aiMessages.map((msg, idx) => (
                <div key={idx} className={`ai-message ${msg.type}`}>
                  {msg.content}
                </div>
              ))}
              {isAiTyping && (
                <div className="ai-message assistant typing">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="ai-overlay" onClick={() => !showAiChat && setShowAiChat(true)}>
          <Sparkles size={20} />
          <input
            type="text"
            placeholder="Ask AI a question about this dashboard..."
            className="ai-input"
            value={aiQuestion}
            onChange={(e) => setAiQuestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAskAi()}
            onClick={(e) => e.stopPropagation()}
          />
          <button className="ai-send-btn" onClick={handleAskAi}>
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardDetail
