import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Monitor, Smartphone, RefreshCw, X, BarChart3, LineChart, PieChart, TrendingUp, Info, ArrowUp, Sparkles, ArrowLeft } from 'lucide-react'
import { BarChart, Bar, LineChart as RechartsLineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import Button from '../components/Button'
import Card from '../components/Card'
import FullPageLoading from '../components/FullPageLoading'
import { useApp } from '../contexts/AppContext'
import { ROUTES } from '../constants/routes'
import './VisualizationEditor.css'

const VisualizationEditor: React.FC = () => {
  const { dashboardId } = useParams()
  const navigate = useNavigate()
  const { getDashboard, addNotification } = useApp()
  const [vizType, setVizType] = useState('bar')
  const [sortBy, setSortBy] = useState('Value (Desc)')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [dashboard, setDashboard] = useState<any>(null)
  const [aiInput, setAiInput] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      if (dashboardId) {
        const dashboardData = getDashboard(Number(dashboardId))
        setDashboard(dashboardData)
      }
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [dashboardId, getDashboard])

  const handleSave = () => {
    setIsSaving(true)
  }

  const handleSaveComplete = () => {
    addNotification({ type: 'success', message: 'Visualization updated successfully!' })
    if (dashboardId) {
      navigate(ROUTES.DASHBOARD_DETAIL(dashboardId))
    } else {
      navigate(ROUTES.DASHBOARDS)
    }
  }

  const handleCancel = () => {
    if (dashboardId) {
      navigate(ROUTES.DASHBOARD_DETAIL(dashboardId))
    } else {
      navigate(ROUTES.DASHBOARDS)
    }
  }

  const handleAiSuggestion = (suggestion: string) => {
    addNotification({ type: 'info', message: `Applying: ${suggestion}` })
    // Simulate applying the suggestion
    if (suggestion.includes('Region')) {
      addNotification({ type: 'success', message: 'Data grouped by region' })
    } else if (suggestion.includes('Top 5')) {
      addNotification({ type: 'success', message: 'Showing top 5 items' })
    }
  }

  if (isLoading) {
    return (
      <FullPageLoading
        message="Loading Editor"
        subMessage="Preparing visualization tools..."
      />
    )
  }

  if (isSaving) {
    return (
      <FullPageLoading
        message="Saving Changes"
        subMessage="Updating your visualization..."
        duration={1500}
        onComplete={handleSaveComplete}
      />
    )
  }

  const chartData = [
    { month: 'Jan', value: 85000 },
    { month: 'Feb', value: 92000 },
    { month: 'Mar', value: 78000 },
    { month: 'Apr', value: 105000 },
    { month: 'May', value: 118000 },
    { month: 'Jun', value: 125000 },
  ]

  const vizTypes = [
    { id: 'bar', label: 'Bar', icon: <BarChart3 size={20} /> },
    { id: 'line', label: 'Line', icon: <LineChart size={20} /> },
    { id: 'area', label: 'Area', icon: <TrendingUp size={20} /> },
    { id: 'pie', label: 'Pie', icon: <PieChart size={20} /> },
  ]

  const renderChart = () => {
    const commonProps = {
      data: chartData,
    }

    switch (vizType) {
      case 'line':
        return (
          <RechartsLineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
            <XAxis dataKey="month" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
            <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }} />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
          </RechartsLineChart>
        )
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
            <XAxis dataKey="month" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
            <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }} />
            <Area type="monotone" dataKey="value" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth={2} />
          </AreaChart>
        )
      default:
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
            <XAxis dataKey="month" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
            <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#3b82f6' : '#60a5fa'} />
              ))}
            </Bar>
          </BarChart>
        )
    }
  }

  return (
    <div className="viz-editor-page">
      <div className="editor-layout">
        <div className="preview-panel">
          <div className="preview-header">
            <div className="preview-left">
              <button className="back-btn" onClick={handleCancel}>
                <ArrowLeft size={18} />
              </button>
              <div className="preview-status">
                <div className="status-dot"></div>
                <span>LIVE PREVIEW</span>
              </div>
            </div>
            <h2 className="preview-title">
              {dashboard?.title || 'Revenue Overview Card'}
            </h2>
            <div className="preview-actions">
              <button className="device-btn active">
                <Monitor size={18} />
              </button>
              <button className="device-btn">
                <Smartphone size={18} />
              </button>
              <button className="device-btn">
                <RefreshCw size={18} />
              </button>
            </div>
          </div>

          <Card className="preview-card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Monthly Revenue</h3>
                <p className="card-subtitle">Net revenue aggregated by month</p>
              </div>
              <div className="card-total">
                <div className="total-value">$1.2M</div>
                <div className="total-change positive">+12.5%</div>
              </div>
            </div>
            <div className="chart-preview">
              <ResponsiveContainer width="100%" height={200}>
                {renderChart()}
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="editor-panel">
          <div className="editor-header">
            <div>
              <h2 className="editor-title">Edit Visualization</h2>
              <p className="editor-subtitle">Configure data, type, and styles</p>
            </div>
            <button className="close-btn">
              <X size={20} />
            </button>
          </div>

          <div className="editor-sections">
            <div className="editor-section">
              <div className="section-header">
                <h3 className="section-title">VISUALIZATION TYPE</h3>
                <a href="#" className="view-all-link">View All</a>
              </div>
              <div className="viz-type-grid">
                {vizTypes.map((type) => (
                  <button
                    key={type.id}
                    className={`viz-type-button ${vizType === type.id ? 'selected' : ''}`}
                    onClick={() => setVizType(type.id)}
                  >
                    <div className="viz-type-icon">{type.icon}</div>
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="editor-section">
              <div className="section-header">
                <h3 className="section-title">
                  DATA CONFIGURATION
                  <Info size={14} className="info-icon" />
                </h3>
              </div>
              <div className="config-inputs">
                <div className="config-input-group">
                  <label className="config-label">X-Axis (Dimension)</label>
                  <div className="dropdown-input">
                    <span className="dropdown-icon">📅</span>
                    <select className="config-select">
                      <option>Transaction Date (Month)</option>
                    </select>
                  </div>
                </div>
                <div className="config-input-group">
                  <label className="config-label">Y-Axis (Measure)</label>
                  <div className="dropdown-input">
                    <span className="dropdown-icon">$</span>
                    <select className="config-select">
                      <option>$ Total Revenue</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="editor-section">
              <div className="section-header">
                <h3 className="section-title">CONSTRAINTS & SORT</h3>
              </div>
              <div className="config-inputs">
                <div className="config-input-group">
                  <label className="config-label">LIMIT</label>
                  <input type="number" className="config-input" defaultValue={12} />
                </div>
                <div className="config-input-group">
                  <label className="config-label">SORT BY</label>
                  <select className="config-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option>Value (Desc)</option>
                    <option>Value (Asc)</option>
                    <option>Date (Desc)</option>
                    <option>Date (Asc)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="editor-section ai-assistant-section">
              <div className="section-header">
                <div className="ai-header">
                  <Sparkles size={20} className="ai-icon" />
                  <h3 className="section-title">AI ASSISTANT</h3>
                </div>
              </div>
              <div className="ai-input-container">
                <input
                  type="text"
                  className="ai-input"
                  placeholder="Describe how you want to change this chart..."
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && aiInput.trim()) {
                      handleAiSuggestion(aiInput)
                      setAiInput('')
                    }
                  }}
                />
                <button className="ai-send-btn" onClick={() => {
                  if (aiInput.trim()) {
                    handleAiSuggestion(aiInput)
                    setAiInput('')
                  }
                }}>
                  <ArrowUp size={18} />
                </button>
              </div>
              <div className="ai-suggestions">
                <button className="suggestion-chip" onClick={() => handleAiSuggestion('Group by Region')}>
                  Group by Region
                </button>
                <button className="suggestion-chip" onClick={() => handleAiSuggestion('Show Top 5')}>
                  Show Top 5
                </button>
              </div>
            </div>
          </div>

          <div className="editor-footer">
            <Button variant="ghost" onClick={() => {
              setVizType('bar')
              addNotification({ type: 'info', message: 'Reset to default' })
            }}>
              Reset to Default
            </Button>
            <div className="footer-actions">
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button variant="primary" onClick={handleSave}>Update Card</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisualizationEditor
