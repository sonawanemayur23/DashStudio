import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, HelpCircle, Check, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Button from '../components/Button'
import Card from '../components/Card'
import FullPageLoading from '../components/FullPageLoading'
import { useApp } from '../contexts/AppContext'
import { ROUTES } from '../constants/routes'
import './DataSourceUpload.css'

const DataSourceUpload: React.FC = () => {
  const navigate = useNavigate()
  const { addDataSource, addNotification, currentUser } = useApp()
  const [activeTab, setActiveTab] = useState<'schema' | 'preview'>('schema')
  const [isLoading, setIsLoading] = useState(true)
  const [isConnecting, setIsConnecting] = useState(false)
  const [fileName] = useState('sales_data_q3_2023.csv')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleConnect = () => {
    setIsConnecting(true)
  }

  const handleConnectionComplete = () => {
    addDataSource({
      name: fileName.replace('.csv', '').replace(/_/g, ' '),
      fileName: fileName,
      status: 'connected',
      rows: 15402,
      columns: columns.filter(c => c.include).map(c => c.name),
      uploadedAt: new Date().toISOString(),
    })
    addNotification({ type: 'success', message: 'Data source connected successfully!' })
    navigate(ROUTES.SEMANTIC_MODEL)
  }

  const handleGenerateChart = () => {
    addNotification({ type: 'info', message: 'Generating chart...' })
    setTimeout(() => {
      addNotification({ type: 'success', message: 'Chart generated! Redirecting to studio...' })
      navigate(ROUTES.STUDIO)
    }, 1500)
  }

  const columns = [
    { name: 'Transaction_ID', type: 'String', sample: 'TXN-9821-A', include: true, aiDetected: false },
    { name: 'Purchase_Date', type: 'Date', sample: '2023-09-15', include: true, aiDetected: true },
    { name: 'Revenue_Amount', type: 'Currency', sample: '$1,240.50', include: true, aiDetected: true },
    { name: 'Customer_Region', type: 'String', sample: 'North America', include: true, aiDetected: false },
    { name: 'Internal_Code_Legacy', type: 'String', sample: 'LEG-001', include: false, aiDetected: false },
  ]

  if (isLoading) {
    return (
      <FullPageLoading
        message="Analyzing Data"
        subMessage="AI is detecting schema and data types..."
        steps={[
          'Reading file structure...',
          'Detecting column types...',
          'Analyzing data quality...',
          'Ready for configuration',
        ]}
        duration={2500}
      />
    )
  }

  if (isConnecting) {
    return (
      <FullPageLoading
        message="Connecting Dataset"
        subMessage="Setting up your data source..."
        steps={[
          'Validating schema...',
          'Creating data connections...',
          'Indexing for queries...',
          'Finalizing setup...',
        ]}
        duration={2500}
        onComplete={handleConnectionComplete}
      />
    )
  }

  return (
    <div className="data-source-upload-page">
      <Sidebar 
        title="Olive"
        user={currentUser}
      />

      <div className="main-content">
        <div className="top-header">
          <div className="page-title-section">
            <h1>Data Sources</h1>
          </div>
          <div className="header-actions">
            <div className="search-bar">
              <Search size={18} />
              <input type="text" placeholder="Search..." />
            </div>
            <button className="icon-button">
              <Bell size={20} />
            </button>
            <button className="icon-button">
              <HelpCircle size={20} />
            </button>
          </div>
        </div>

        <div className="breadcrumbs">
          <span>Data Sources</span>
          <span>/</span>
          <span>Add New</span>
          <span>/</span>
          <span>Upload CSV</span>
        </div>

        <div className="page-header">
          <div>
            <h1 className="page-title">Upload CSV Data</h1>
            <p className="page-description">
              Import your flat files to define a semantic model. AI will automatically infer schema types and detect relationships.
            </p>
          </div>
        </div>

        <Card className="uploaded-file-card">
          <div className="file-header">
            <div>
              <div className="file-name">sales_data_q3_2023.csv</div>
              <div className="file-status">
                <Check size={16} className="status-icon" />
                <span>Ready</span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Replace File
            </Button>
          </div>
          <div className="file-details">
            <div className="file-detail-item">
              <span className="detail-label">Size:</span>
              <span className="detail-value">14.2 MB</span>
            </div>
            <div className="file-detail-item">
              <span className="detail-label">Rows Detected:</span>
              <span className="detail-value">15,402 Rows detected</span>
            </div>
            <div className="file-detail-item">
              <span className="detail-label">Upload Time:</span>
              <span className="detail-value">Uploaded just now</span>
            </div>
          </div>
        </Card>

        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'schema' ? 'active' : ''}`}
            onClick={() => setActiveTab('schema')}
          >
            Schema Configuration
          </button>
          <button 
            className={`tab ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            Data Preview
          </button>
        </div>

        <div className="content-grid">
          <div className="main-panel">
            <div className="field-settings-header">
              <h2 className="section-title">Field Settings</h2>
              <button className="reset-link" onClick={(e) => e.preventDefault()}>Reset all to default</button>
            </div>

            <div className="fields-table">
              <table>
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" defaultChecked />
                    </th>
                    <th>COLUMN NAME</th>
                    <th>DATA TYPE</th>
                    <th>SAMPLE VALUE</th>
                  </tr>
                </thead>
                <tbody>
                  {columns.map((col, index) => (
                    <tr key={index}>
                      <td>
                        <input 
                          type="checkbox" 
                          defaultChecked={col.include}
                        />
                      </td>
                      <td>
                        <div className="column-name-cell">
                          {col.name}
                          {col.aiDetected && (
                            <span className="ai-badge">AI</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <select className="type-select" defaultValue={col.type}>
                          <option>String</option>
                          <option>Number</option>
                          <option>Date</option>
                          <option>Currency</option>
                        </select>
                      </td>
                      <td className="sample-value">{col.sample}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="sidebar-panel">
            <div className="ai-analysis-banner">
              <Check size={16} />
              <span>AI Analysis Complete: 6 Columns Detected</span>
            </div>

            <Card className="suggestion-card">
              <div className="suggestion-header">
                <Sparkles size={20} className="suggestion-icon" />
                <span className="suggestion-title">AI Suggestion</span>
              </div>
              <p className="suggestion-text">
                I've detected <strong>Purchase_Date</strong> as a timeline and <strong>Revenue_Amount</strong> as a key metric.
              </p>
              <Button 
                variant="primary" 
                size="sm" 
                className="suggestion-button"
                onClick={handleGenerateChart}
                icon={<Sparkles size={14} />}
              >
                Generate 'Revenue over Time' Chart
              </Button>
            </Card>

            <Card className="quality-card">
              <h3 className="quality-title">Data Quality Check</h3>
              <div className="quality-item">
                <div className="quality-label">Missing Values</div>
                <div className="quality-value">0%</div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '100%', backgroundColor: 'var(--green-500)' }}></div>
                </div>
              </div>
              <div className="quality-item">
                <div className="quality-label">Distinct Regions</div>
                <div className="quality-value">4 Regions</div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '80%', backgroundColor: 'var(--blue-500)' }}></div>
                </div>
              </div>
              <div className="quality-item">
                <div className="quality-label">Date Range</div>
                <div className="quality-value">Jan 2023 - Dec 2023</div>
              </div>
            </Card>
          </div>
        </div>

        <div className="footer-actions">
          <button className="cancel-link" onClick={() => navigate(ROUTES.DASHBOARDS)}>
            Cancel
          </button>
          <div className="footer-buttons">
            <Button variant="outline" icon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button 
              variant="primary" 
              icon={<ArrowRight size={16} />} 
              iconPosition="right"
              onClick={handleConnect}
            >
              Connect Dataset
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataSourceUpload
