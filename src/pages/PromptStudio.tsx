import React, { useState } from 'react'
import { RefreshCw, Database, Image, Mic, Plus, Sparkles, TrendingUp, Users, DollarSign, Package } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Button from '../components/Button'
import Card from '../components/Card'
import './PromptStudio.css'

const PromptStudio: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState('Sales Overview')
  const [analysisDepth, setAnalysisDepth] = useState('Detailed')

  const recentPrompts = [
    { id: 1, title: 'Q3 Revenue Analysis', description: 'Last 90 days, breakdown by reg...', icon: <TrendingUp size={18} /> },
    { id: 2, title: 'Customer Churn Risks', description: 'High value accounts, EMEA', icon: <Users size={18} /> },
    { id: 3, title: 'Inventory Health', description: 'Low stock alerts, supply chain', icon: <Package size={18} /> },
  ]

  const promptTemplates = [
    { id: 'sales', label: 'Sales Overview', icon: <TrendingUp size={18} /> },
    { id: 'churn', label: 'Churn Analysis', icon: <Users size={18} /> },
    { id: 'marketing', label: '$ Marketing ROI', icon: <DollarSign size={18} /> },
    { id: 'inventory', label: 'Inventory Health', icon: <Package size={18} /> },
  ]

  return (
    <div className="prompt-studio-page">
      <Sidebar 
        title="Olive"
        user={{ name: 'Alex Morgan', role: 'Admin' }}
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
              <div key={prompt.id} className="prompt-item">
                <div className="prompt-icon">{prompt.icon}</div>
                <div className="prompt-info">
                  <div className="prompt-title">{prompt.title}</div>
                  <div className="prompt-description">{prompt.description}</div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="primary" size="sm" className="new-session-btn">
            + New Session
          </Button>
        </div>

        <div className="studio-main">
          <div className="breadcrumbs">
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
                  onClick={() => setSelectedPrompt(template.label)}
                >
                  {template.icon}
                  <span>{template.label}</span>
                </button>
              ))}
            </div>

            <Card className="prompt-input-card">
              <div className="data-source-badge">
                <Database size={16} />
                <span>Connected: Global_Sales_2023.parquet</span>
                <a href="#" className="refine-link">Refine Context</a>
              </div>
              <textarea
                className="prompt-textarea"
                placeholder="Describe the dashboard you want to build (e.g., 'Analyze Q3 revenue trends by region with a focus on underperforming stores')..."
              />
              <div className="prompt-actions">
                <button className="icon-action-btn">
                  <Image size={18} />
                </button>
                <button className="icon-action-btn">
                  <Mic size={18} />
                </button>
                <Button variant="outline" size="sm" icon={<Plus size={16} />}>
                  Add Metric
                </Button>
                <Button variant="primary" icon={<Sparkles size={18} />} className="generate-btn">
                  Generate
                </Button>
              </div>
            </Card>

            <Card className="preview-card">
              <div className="preview-header">
                <span className="preview-label">LIVE PROMPT PREVIEW</span>
                <span className="status-badge ready">Ready</span>
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
                  <span className="preview-value">Sales_Data_2023 (columns: region, date, sku, amount, customer_id)</span>
                </div>
                <div className="preview-line">
                  <span className="preview-key">CONSTRAINTS:</span>
                  <span className="preview-value">Max 6 KPIs, Dark Theme, Grid Layout</span>
                </div>
                <div className="preview-line">
                  <span className="preview-key">USER_INTENT:</span>
                  <span className="preview-value muted">Waiting for input...</span>
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
            <select className="config-select">
              <option>Global_Sales_2023.parquet</option>
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
                value="1"
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

          <Button variant="outline" className="save-template-btn">
            Save as Template
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PromptStudio
