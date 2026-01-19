import React, { useState } from 'react'
import { Search, Settings, Eye, Sparkles, Plus, Trash2, Save } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Button from '../components/Button'
import Card from '../components/Card'
import './SemanticModel.css'

const SemanticModel: React.FC = () => {
  const [selectedField, setSelectedField] = useState<string | null>('Total Revenue')

  const dimensions = [
    { name: 'Order Date', source: 'public.orders.created_at', type: 'DATE' },
    { name: 'Customer Segment', source: 'public.customers.segment', type: 'STRING' },
    { name: 'Region', source: 'public.customers.region', type: 'STRING' },
  ]

  const measures = [
    { name: 'Total Revenue', aggregation: 'SUM (orders.total)', format: '$ CURRENCY', source: 'public.orders.total_amount' },
    { name: 'Average Order Value', aggregation: 'AVG (orders.total)', format: '$ CURRENCY', source: '' },
  ]

  const tables = [
    { name: 'public.orders', columns: ['order_id (INT)', 'created_at (DATE)', 'total_amount (DEC)'], expanded: true },
    { name: 'public.customers', columns: ['customer_id (INT)', 'segment (STRING)', 'region (STRING)'], expanded: false },
    { name: 'public.products', columns: ['product_id (INT)', 'name (STRING)', 'price (DEC)'], expanded: false },
  ]

  return (
    <div className="semantic-model-page">
      <Sidebar 
        title="Olive"
        user={{ name: 'Alex Morgan', role: 'Admin' }}
      />
      
      <div className="model-sidebar">
        <div className="sidebar-header">
          <h3>Data Sources</h3>
         
        </div>
        <div className="tables-list">
        <div className="search-container">
            <Search size={16} />
            <input type="text" placeholder="Search columns..." />
          </div>
          {tables.map((table, index) => (
            <div key={index} className="table-item">
              <div className="table-header">
                <span className="table-name">{table.name}</span>
              </div>
              {table.expanded && (
                <div className="table-columns">
                  {table.columns.map((col, colIndex) => (
                    <div key={colIndex} className="column-item">{col}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Button variant="outline" size="sm" className="connect-table-btn" icon={<Plus size={16} />}>
            Connect New Table
          </Button>
        </div>
      </div>

      <div className="model-main">
        <div className="top-header">
          <div className="breadcrumbs">
            <span>Home</span>
            <span>/</span>
            <span>Sales Analytics Project</span>
            <span>/</span>
            <span>Semantic Model</span>
          </div>
        </div>

        <div className="model-header">
          <div>
            <div className="title-row">
              <h1 className="page-title">Sales Data Model</h1>
              <button className="edit-icon-btn">
                <Settings size={18} />
              </button>
            </div>
            <p className="page-description">Map raw data to business metrics for AI analysis.</p>
          </div>
          <div className="header-actions">
            <Button variant="outline" icon={<Eye size={16} />}>
              Preview Data
            </Button>
            <Button variant="primary" icon={<Sparkles size={16} />}>
              Auto-Generate Model
            </Button>
          </div>
        </div>

        <div className="dimensions-section">
          <div className="section-header">
            <h2 className="section-title">
              Dimensions
              <span className="badge">3 items</span>
            </h2>
            <Button variant="outline" size="sm" icon={<Plus size={16} />}>
              Add Dimension
            </Button>
          </div>
          <div className="fields-table">
            <table>
              <thead>
                <tr>
                  <th>FRIENDLY NAME</th>
                  <th>SOURCE COLUMN</th>
                  <th>TYPE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {dimensions.map((dim, index) => (
                  <tr key={index}>
                    <td>{dim.name}</td>
                    <td className="source-column">{dim.source}</td>
                    <td><span className="type-badge">{dim.type}</span></td>
                    <td>
                      <button className="icon-btn">
                        <Settings size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="measures-section">
          <div className="section-header">
            <h2 className="section-title">
              Measures
              <span className="badge">2 items</span>
            </h2>
            <Button variant="outline" size="sm" icon={<Plus size={16} />}>
              Add Measure
            </Button>
          </div>
          <div className="fields-table">
            <table>
              <thead>
                <tr>
                  <th>FRIENDLY NAME</th>
                  <th>AGGREGATION</th>
                  <th>FORMAT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {measures.map((measure, index) => (
                  <tr 
                    key={index}
                    className={selectedField === measure.name ? 'selected' : ''}
                    onClick={() => setSelectedField(measure.name)}
                  >
                    <td className="field-name-highlight">{measure.name}</td>
                    <td className="source-column">{measure.aggregation}</td>
                    <td><span className="type-badge">{measure.format}</span></td>
                    <td>
                      <button className="icon-btn">
                        <Settings size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Card className="calculated-field-card">
          <div className="calculated-field-content">
            <Plus size={24} className="plus-icon" />
            <div>
              <div className="calculated-field-title">Add Calculated Field</div>
              <div className="calculated-field-subtitle">Combine multiple columns using SQL expressions.</div>
            </div>
          </div>
        </Card>
      </div>

      {selectedField && (
        <div className="properties-sidebar">
          <div className="properties-header">
            <h3>Field Properties</h3>
            <button className="close-btn">×</button>
          </div>
          <div className="properties-content">
            <div className="editing-label">EDITING MEASURE {selectedField}</div>
            
            <div className="property-group">
              <label className="property-label">Display Name</label>
              <input type="text" className="property-input" defaultValue={selectedField} />
            </div>

            <div className="property-group">
              <label className="property-label">
                DESCRIPTION
                <span className="ai-badge-small">AI Context</span>
              </label>
              <textarea 
                className="property-textarea"
                defaultValue="The sum of the price of all completed orders. Used to calculate quarterly performance."
              />
            </div>

            <div className="property-group">
              <label className="property-label">Aggregation</label>
              <select className="property-select">
                <option>SUM</option>
                <option>AVG</option>
                <option>COUNT</option>
                <option>MIN</option>
                <option>MAX</option>
              </select>
            </div>

            <div className="property-group">
              <label className="property-label">Format</label>
              <select className="property-select">
                <option>Currency ($)</option>
                <option>Number</option>
                <option>Percentage</option>
              </select>
            </div>

            <div className="property-group">
              <label className="property-label">Source Column</label>
              <div className="source-display">
                <span>public.orders.total_amount</span>
                <a href="#" className="change-link">Change</a>
              </div>
            </div>

            <div className="property-group">
              <label className="property-label">Synonyms (Comma Separated)</label>
              <input type="text" className="property-input" defaultValue="sales, income, gross revenue" />
            </div>

            <div className="property-group">
              <div className="toggle-row">
                <label className="property-label">Visible to AI</label>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="property-group">
              <div className="toggle-row">
                <label className="property-label">Verified Metric</label>
                <label className="toggle-switch">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="properties-footer">
              <Button variant="ghost" size="sm" icon={<Trash2 size={16} />}>
                Delete
              </Button>
              <Button variant="primary" size="sm" icon={<Save size={16} />}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SemanticModel
