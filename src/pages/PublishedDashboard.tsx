import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Download, Share2, LogIn, Sparkles, ArrowUp, TrendingUp, TrendingDown, ExternalLink, Copy, Check, X } from 'lucide-react'
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useApp } from '../contexts/AppContext'
import Button from '../components/Button'
import Card from '../components/Card'
import FullPageLoading from '../components/FullPageLoading'
import './PublishedDashboard.css'

const PublishedDashboard: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getDashboard, addNotification } = useApp()
  const [isLoading, setIsLoading] = useState(true)
  const [dashboard, setDashboard] = useState<any>(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: "Hi! I'm ready to answer questions about this dashboard. Try asking about trends, comparisons, or specific metrics.",
    },
  ])
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const dashboardData = getDashboard(Number(id))
      if (dashboardData) {
        setDashboard(dashboardData)
      }
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [id, getDashboard])

  const revenueData = [
    { month: 'Jan', revenue: 85000 },
    { month: 'Feb', revenue: 92000 },
    { month: 'Mar', revenue: 88000 },
    { month: 'Apr', revenue: 95000 },
    { month: 'May', revenue: 102000 },
    { month: 'Jun', revenue: 112000 },
    { month: 'Jul', revenue: 105000 },
    { month: 'Aug', revenue: 118000 },
    { month: 'Sep', revenue: 125000 },
    { month: 'Oct', revenue: 132000 },
    { month: 'Nov', revenue: 128000 },
    { month: 'Dec', revenue: 145000 },
  ]

  const trafficData = [
    { name: 'Direct', value: 45, color: '#3b82f6' },
    { name: 'Organic', value: 30, color: '#8b5cf6' },
    { name: 'Referral', value: 15, color: '#06b6d4' },
    { name: 'Social', value: 10, color: '#10b981' },
  ]

  const regions = [
    { name: 'North America', percentage: 45 },
    { name: 'Europe', percentage: 32 },
    { name: 'Asia Pacific', percentage: 18 },
    { name: 'Latin America', percentage: 5 },
  ]

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        {
          content: `Based on the data, ${dashboard?.title || 'this dashboard'} shows a positive trend. Revenue increased by 12% compared to the previous period, with the strongest growth in North America.`,
          highlight: true,
        },
        {
          content: "The metrics indicate strong performance across all key areas. I'd recommend focusing on the European market which shows potential for growth.",
          highlight: false,
        },
        {
          content: "Looking at the historical data, there's a clear seasonal pattern. Q4 typically shows the highest revenue, while Q1 tends to be slower.",
          highlight: true,
        },
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'assistant',
        ...randomResponse,
      }])
      setIsTyping(false)
    }, 1500)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setLinkCopied(true)
    addNotification({ type: 'success', message: 'Link copied to clipboard!' })
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const handleExport = () => {
    addNotification({ type: 'info', message: 'Preparing PDF export...' })
    setTimeout(() => {
      addNotification({ type: 'success', message: 'Dashboard exported successfully!' })
    }, 1500)
  }

  if (isLoading) {
    return (
      <FullPageLoading 
        message="Loading Dashboard" 
        subMessage="Preparing your analytics view..."
      />
    )
  }

  if (!dashboard) {
    return (
      <div className="published-dashboard-page">
        <div className="not-found-content">
          <h1>Dashboard Not Found</h1>
          <p>This dashboard may have been removed or you don't have access.</p>
          <Button variant="primary" onClick={() => navigate('/dashboards')}>
            Back to Dashboards
          </Button>
        </div>
      </div>
    )
  }

  const kpis = dashboard.kpis || [
    { label: 'Total Revenue', value: '$1.2M', change: '+12%', changeType: 'positive', icon: '💰', context: 'vs. previous period' },
    { label: 'Active Users', value: '45.2k', change: '+5%', changeType: 'positive', icon: '👥', context: 'vs. previous period' },
    { label: 'Conversion Rate', value: '3.8%', change: '+0.4%', changeType: 'positive', icon: '🎯', context: 'vs. last month' },
    { label: 'Churn Rate', value: '2.1%', change: '-0.5%', changeType: 'positive', icon: '📉', context: 'improvement' },
  ]

  return (
    <div className="published-dashboard-page">
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
              <div className="share-link-section">
                <label>Share Link</label>
                <div className="link-input-wrapper">
                  <input 
                    type="text" 
                    value={window.location.href} 
                    readOnly 
                    className="share-link-input"
                  />
                  <button className="copy-btn" onClick={handleCopyLink}>
                    {linkCopied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
              <div className="share-options">
                <button className="share-option-btn">
                  <ExternalLink size={18} />
                  Open in new tab
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <div className="published-top-nav">
        <div className="nav-logo">
          <div className="logo-icon">O</div>
          <span>Olive</span>
        </div>
        <div className="nav-center">
          <span className="dashboard-name">{dashboard.title}</span>
          <span className="live-indicator">
            <span className="live-dot"></span>
            Live
          </span>
        </div>
        <div className="nav-actions">
          <Button variant="outline" size="sm" icon={<Download size={16} />} onClick={handleExport}>
            Export
          </Button>
          <Button variant="outline" size="sm" icon={<Share2 size={16} />} onClick={() => setShowShareModal(true)}>
            Share
          </Button>
          <Button variant="primary" size="sm" icon={<LogIn size={16} />}>
            Sign In
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="published-content">
        <div className="published-main">
          {/* Dashboard Header */}
          <div className="published-header">
            <div>
              <h1 className="published-title">{dashboard.title}</h1>
              <p className="published-description">
                {dashboard.description || 'AI-generated analytics dashboard'}
              </p>
              <div className="published-meta">
                <span>Last updated: {new Date(dashboard.updatedAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>{dashboard.views} views</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="published-filters">
            <select className="filter-select">
              <option>Last 12 Months</option>
              <option>Last 6 Months</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
            <select className="filter-select">
              <option>All Regions</option>
              <option>North America</option>
              <option>Europe</option>
              <option>Asia Pacific</option>
            </select>
            <select className="filter-select">
              <option>All Products</option>
              <option>Enterprise</option>
              <option>Professional</option>
              <option>Starter</option>
            </select>
            <Button variant="ghost" size="sm">
              Reset Filters
            </Button>
          </div>

          {/* KPI Cards */}
          <div className="published-kpi-row">
            {kpis.map((kpi: { label: string; value: string; change: string; changeType: string; icon: string; context: string }, index: number) => (
              <Card key={index} className="published-kpi-card">
                <div className="kpi-header">
                  <span className="kpi-icon">{kpi.icon}</span>
                  <span className="kpi-label">{kpi.label}</span>
                </div>
                <div className="kpi-value">{kpi.value}</div>
                <div className={`kpi-change ${kpi.changeType}`}>
                  {kpi.changeType === 'positive' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {kpi.change}
                </div>
                <div className="kpi-context">{kpi.context}</div>
              </Card>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="published-charts-grid">
            <Card className="chart-card wide">
              <div className="chart-header">
                <div>
                  <h3 className="chart-title">Revenue Trend</h3>
                  <p className="chart-subtitle">Monthly revenue over the past year</p>
                </div>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis dataKey="month" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                    <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--bg-card)', 
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        color: 'var(--text-primary)'
                      }}
                      formatter={(value: number) => [`$${(value / 1000).toFixed(0)}k`, 'Revenue']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="var(--blue-500)" 
                      strokeWidth={2}
                      dot={{ fill: 'var(--blue-500)', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">Traffic Sources</h3>
              </div>
              <div className="pie-chart-wrapper">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={trafficData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {trafficData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
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
                <h3 className="chart-title">Regional Distribution</h3>
              </div>
              <div className="regions-list">
                {regions.map((region, index) => (
                  <div key={index} className="region-item">
                    <div className="region-header">
                      <span className="region-name">{region.name}</span>
                      <span className="region-percentage">{region.percentage}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: `${region.percentage}%`,
                          backgroundColor: `hsl(${210 + index * 30}, 70%, 50%)`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* AI Assistant Sidebar */}
        <div className="published-assistant">
          <div className="assistant-header">
            <Sparkles size={20} className="assistant-icon" />
            <span className="assistant-title">Data Assistant</span>
          </div>
          <p className="assistant-prompt">Ask questions about this dashboard</p>

          <div className="messages-container">
            {messages.map((message: any) => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-content">
                  {message.content}
                  {message.highlight && message.type === 'assistant' && (
                    <a href="#" className="highlight-link">View related data</a>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message assistant">
                <div className="message-content typing">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
          </div>

          <div className="suggested-questions">
            <button className="question-chip" onClick={() => setInputValue('What are the top performing regions?')}>
              Top regions?
            </button>
            <button className="question-chip" onClick={() => setInputValue('Why did revenue increase?')}>
              Revenue trends?
            </button>
            <button className="question-chip" onClick={() => setInputValue('Summarize key insights')}>
              Key insights
            </button>
          </div>

          <div className="assistant-input-container">
            <input
              type="text"
              className="assistant-input"
              placeholder="Ask a question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="assistant-send-btn" onClick={handleSendMessage}>
              <ArrowUp size={18} />
            </button>
          </div>

          <div className="usage-info">
            <span className="usage-text">Free tier: 5 questions/day</span>
            <a href="#" className="upgrade-link">Upgrade for unlimited</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublishedDashboard
