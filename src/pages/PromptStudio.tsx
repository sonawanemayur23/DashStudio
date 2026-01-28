import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RefreshCw, Database, Image, Mic, Plus, Sparkles, TrendingUp, Users, DollarSign, Package, ArrowLeft } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Button from '../components/Button'
import Card from '../components/Card'
import FullPageLoading from '../components/FullPageLoading'
import { useApp } from '../contexts/AppContext'
import { ROUTES } from '../constants/routes'
import './PromptStudio.css'

const PromptStudio: React.FC = () => {
  const navigate = useNavigate()
  const { addDashboard, currentDataSource, dataSources, addNotification, currentUser } = useApp()
  const [selectedPrompt, setSelectedPrompt] = useState('Sales Overview')
  const [analysisDepth, setAnalysisDepth] = useState('Detailed')
  const [promptText, setPromptText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedDataSource, setSelectedDataSource] = useState(currentDataSource?.fileName || 'Global_Sales_2023.parquet')

  const recentPrompts = [
    { id: 1, title: 'Q3 Revenue Analysis', description: 'Last 90 days, breakdown by reg...', icon: <TrendingUp size={18} />, prompt: 'Analyze Q3 revenue trends by region with a focus on underperforming stores' },
    { id: 2, title: 'Customer Churn Risks', description: 'High value accounts, EMEA', icon: <Users size={18} />, prompt: 'Show customer churn analysis with risk segmentation for high value accounts in EMEA' },
    { id: 3, title: 'Inventory Health', description: 'Low stock alerts, supply chain', icon: <Package size={18} />, prompt: 'Create inventory dashboard with stock alerts and reorder recommendations' },
  ]

  const promptTemplates = [
    { id: 'sales', label: 'Sales Overview', icon: <TrendingUp size={18} />, prompt: 'Create a comprehensive sales dashboard showing revenue trends, top products, and regional performance' },
    { id: 'churn', label: 'Churn Analysis', icon: <Users size={18} />, prompt: 'Analyze customer churn patterns with risk scores and retention recommendations' },
    { id: 'marketing', label: '$ Marketing ROI', icon: <DollarSign size={18} />, prompt: 'Show marketing ROI by channel with attribution modeling and campaign performance' },
    { id: 'inventory', label: 'Inventory Health', icon: <Package size={18} />, prompt: 'Display inventory levels with low stock alerts and turnover analysis' },
  ]

  const generateDashboardKPIs = (type: string) => {
    const kpiSets: Record<string, any[]> = {
      'Sales Overview': [
        { label: 'Total Revenue', value: '$1.2M', change: '+12%', changeType: 'positive', icon: '💰', context: 'vs. previous period' },
        { label: 'Units Sold', value: '24,302', change: '+8.5%', changeType: 'positive', icon: '📦', context: 'vs. previous period' },
        { label: 'Avg. Order Value', value: '$49.50', change: '+3.2%', changeType: 'positive', icon: '🛒', context: 'vs. previous period' },
        { label: 'Conversion Rate', value: '3.8%', change: '+0.4%', changeType: 'positive', icon: '🎯', context: 'improvement' },
      ],
      'Churn Analysis': [
        { label: 'Churn Rate', value: '2.8%', change: '-0.6%', changeType: 'positive', icon: '📉', context: 'improvement' },
        { label: 'At Risk', value: '156', change: '-23', changeType: 'positive', icon: '⚠️', context: 'customers' },
        { label: 'Retention Rate', value: '97.2%', change: '+0.6%', changeType: 'positive', icon: '🔄', context: 'vs. last month' },
        { label: 'NPS Score', value: '72', change: '+5', changeType: 'positive', icon: '⭐', context: 'promoter score' },
      ],
      '$ Marketing ROI': [
        { label: 'ROAS', value: '4.2x', change: '+0.5x', changeType: 'positive', icon: '📈', context: 'return on ad spend' },
        { label: 'CAC', value: '$38', change: '-$7', changeType: 'positive', icon: '💵', context: 'cost per acquisition' },
        { label: 'Leads Generated', value: '8,450', change: '+22%', changeType: 'positive', icon: '🎯', context: 'this month' },
        { label: 'Conversion', value: '4.8%', change: '+0.8%', changeType: 'positive', icon: '✅', context: 'lead to customer' },
      ],
      'Inventory Health': [
        { label: 'Total SKUs', value: '12,456', change: '+234', changeType: 'positive', icon: '📦', context: 'active products' },
        { label: 'Low Stock', value: '89', change: '-12', changeType: 'positive', icon: '⚠️', context: 'items' },
        { label: 'Turnover Rate', value: '4.5x', change: '+0.3x', changeType: 'positive', icon: '🔄', context: 'this quarter' },
        { label: 'Dead Stock', value: '2.1%', change: '-0.4%', changeType: 'positive', icon: '📉', context: 'improvement' },
      ],
    }
    return kpiSets[type] || kpiSets['Sales Overview']
  }

  const handleGenerate = async () => {
    if (!promptText.trim()) {
      addNotification({ type: 'warning', message: 'Please enter a prompt to generate a dashboard' })
      return
    }

    setIsGenerating(true)
  }

  const handleGenerationComplete = () => {
    // Create the new dashboard
    const thumbnails = ['bar-chart', 'bar-chart-up', 'pie-chart', 'gauge', 'map']
    const randomThumbnail = thumbnails[Math.floor(Math.random() * thumbnails.length)]
    
    const newDashboard = addDashboard({
      title: promptText.length > 50 ? promptText.substring(0, 50) + '...' : promptText,
      status: 'draft',
      thumbnail: randomThumbnail,
      description: promptText,
      createdBy: 'AI',
      views: 0,
      comments: 0,
      prompt: promptText,
      dataSource: selectedDataSource,
      kpis: generateDashboardKPIs(selectedPrompt),
    })

    addNotification({ type: 'success', message: 'Dashboard generated successfully!' })
    
    // Navigate to the dashboard detail page
    navigate(ROUTES.DASHBOARD_DETAIL(newDashboard.id))
  }

  const handleTemplateSelect = (template: typeof promptTemplates[0]) => {
    setSelectedPrompt(template.label)
    setPromptText(template.prompt)
  }

  const handleRecentPromptSelect = (prompt: typeof recentPrompts[0]) => {
    setPromptText(prompt.prompt)
  }

  if (isGenerating) {
    return (
      <FullPageLoading
        message="Generating Dashboard"
        subMessage="AI is analyzing your data and creating visualizations..."
        steps={[
          'Analyzing data schema...',
          'Identifying key metrics...',
          'Generating visualizations...',
          'Applying layout preferences...',
          'Finalizing dashboard...',
        ]}
        duration={3000}
        onComplete={handleGenerationComplete}
      />
    )
  }

  return (
    <div className="prompt-studio-page">
      <Sidebar 
        title="Olive"
        user={currentUser}
      />

      <div className="studio-layout">
        <div className="recent-prompts-sidebar">
          <div className="sidebar-header">
            <h3>RECENT PROMPTS</h3>
            <button className="refresh-btn">
              <RefreshCw size={16} />
            </button>
          </div>
          <div className="prompts-list">
            {recentPrompts.map((prompt) => (
              <div 
                key={prompt.id} 
                className="prompt-item"
                onClick={() => handleRecentPromptSelect(prompt)}
              >
                <div className="prompt-icon">{prompt.icon}</div>
                <div className="prompt-info">
                  <div className="prompt-title">{prompt.title}</div>
                  <div className="prompt-description">{prompt.description}</div>
                </div>
              </div>
            ))}
          </div>
          <Button 
            variant="primary" 
            size="sm" 
            className="new-session-btn"
            onClick={() => setPromptText('')}
          >
            + New Session
          </Button>
        </div>

        <div className="studio-main">
          <div className="breadcrumbs">
            <button className="back-btn" onClick={() => navigate(ROUTES.DASHBOARDS)}>
              <ArrowLeft size={16} />
            </button>
            <span>Home</span>
            <span>/</span>
            <span>Studio</span>
          </div>

          <div className="studio-content">
            <h1 className="page-title">New Dashboard Generation</h1>
            <p className="page-subtitle">
              Describe your intent and configure parameters to generate a comprehensive BI dashboard.
            </p>

            <div className="prompt-templates">
              {promptTemplates.map((template) => (
                <button
                  key={template.id}
                  className={`template-button ${selectedPrompt === template.label ? 'selected' : ''}`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  {template.icon}
                  <span>{template.label}</span>
                </button>
              ))}
            </div>

            <Card className="prompt-input-card">
              <div className="data-source-badge">
                <Database size={16} />
                <span>Connected: {selectedDataSource}</span>
                <a href="#" className="refine-link" onClick={(e) => { e.preventDefault(); navigate(ROUTES.DATA_SOURCES_UPLOAD) }}>
                  Refine Context
                </a>
              </div>
              <textarea
                className="prompt-textarea"
                placeholder="Describe the dashboard you want to build (e.g., 'Analyze Q3 revenue trends by region with a focus on underperforming stores')..."
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
              />
              <div className="prompt-actions">
                <button className="icon-action-btn" title="Add image reference">
                  <Image size={18} />
                </button>
                <button className="icon-action-btn" title="Voice input">
                  <Mic size={18} />
                </button>
                <Button variant="outline" size="sm" icon={<Plus size={16} />}>
                  Add Metric
                </Button>
                <Button 
                  variant="primary" 
                  icon={<Sparkles size={18} />} 
                  className="generate-btn"
                  onClick={handleGenerate}
                  disabled={!promptText.trim()}
                >
                  Generate
                </Button>
              </div>
            </Card>

            <Card className="preview-card">
              <div className="preview-header">
                <span className="preview-label">LIVE PROMPT PREVIEW</span>
                <span className={`status-badge ${promptText.trim() ? 'ready' : 'waiting'}`}>
                  {promptText.trim() ? 'Ready' : 'Waiting'}
                </span>
              </div>
              <div className="preview-content">
                <div className="preview-line">
                  <span className="preview-comment"># System Instruction initialized...</span>
                </div>
                <div className="preview-line">
                  <span className="preview-key">ROLE:</span>
                  <span className="preview-value">BI_Architect_Expert_v2</span>
                </div>
                <div className="preview-line">
                  <span className="preview-key">CONTEXT:</span>
                  <span className="preview-value">{selectedDataSource} (columns: region, date, sku, amount, customer_id)</span>
                </div>
                <div className="preview-line">
                  <span className="preview-key">CONSTRAINTS:</span>
                  <span className="preview-value">Max 6 KPIs, Dark Theme, Grid Layout, {analysisDepth} Analysis</span>
                </div>
                <div className="preview-line">
                  <span className="preview-key">USER_INTENT:</span>
                  <span className={`preview-value ${!promptText.trim() ? 'muted' : ''}`}>
                    {promptText.trim() || 'Waiting for input...'}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="config-sidebar">
          <div className="config-header">
            <h3>Configuration</h3>
            <p className="config-subtitle">Fine-tune generation parameters.</p>
          </div>

          <div className="config-section">
            <label className="config-label">DATA SOURCE</label>
            <select 
              className="config-select"
              value={selectedDataSource}
              onChange={(e) => setSelectedDataSource(e.target.value)}
            >
              {dataSources.map(ds => (
                <option key={ds.id} value={ds.fileName}>{ds.fileName}</option>
              ))}
            </select>
          </div>

          <div className="config-section">
            <label className="config-label">TIME PERIOD</label>
            <div className="date-inputs">
              <input type="date" className="date-input" defaultValue="2023-01-01" />
              <input type="date" className="date-input" defaultValue="2023-12-31" />
            </div>
          </div>

          <div className="config-section">
            <label className="config-label">OUTPUT TYPE</label>
            <div className="radio-group">
              <label className="radio-option selected">
                <input type="radio" name="output-type" defaultChecked />
                <span>Dashboard</span>
              </label>
              <label className="radio-option">
                <input type="radio" name="output-type" />
                <span>Report</span>
              </label>
            </div>
          </div>

          <div className="config-section">
            <label className="config-label">ANALYSIS DEPTH</label>
            <div className="slider-container">
              <div className="slider-labels">
                <span>Summary</span>
                <span>Deep Dive</span>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                defaultValue="1"
                className="slider"
                onChange={(e) => {
                  const depths = ['Summary', 'Detailed', 'Deep Dive']
                  setAnalysisDepth(depths[parseInt(e.target.value)])
                }}
              />
              <div className="slider-value">{analysisDepth}</div>
            </div>
          </div>

          <div className="config-section">
            <div className="toggle-row">
              <label className="toggle-label">Include Forecast</label>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="config-section">
            <div className="toggle-row">
              <label className="toggle-label">Show Anomalies</label>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="config-section">
            <div className="toggle-row">
              <label className="toggle-label">Global Filters</label>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="config-section">
            <label className="config-label">KPI STYLE</label>
            <div className="radio-group">
              <label className="radio-option selected">
                <input type="radio" name="kpi-style" defaultChecked />
                <span>Minimal</span>
              </label>
              <label className="radio-option">
                <input type="radio" name="kpi-style" />
                <span>Card</span>
              </label>
              <label className="radio-option">
                <input type="radio" name="kpi-style" />
                <span>List</span>
              </label>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="save-template-btn"
            onClick={() => addNotification({ type: 'success', message: 'Template saved!' })}
          >
            Save as Template
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PromptStudio
