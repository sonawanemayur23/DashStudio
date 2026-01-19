import React, { useState } from 'react'
import { Download, Share2, LogIn, Sparkles, ArrowUp, TrendingUp, TrendingDown, Users, DollarSign } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Button from '../components/Button'
import Card from '../components/Card'
import './DashboardWithAssistant.css'

const DashboardWithAssistant: React.FC = () => {
  const [messages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: "Hi! I'm ready to answer questions about the Q3 Marketing Performance dashboard. Try asking: Why did revenue peak in June? Compare ROI for top 3 campaigns. Summarize the churn trend.",
    },
    {
      id: 2,
      type: 'user',
      content: 'What caused the dip in churn rate in August?',
    },
    {
      id: 3,
      type: 'assistant',
      content: 'Churn rate decreased by 0.5% in August primarily due to the launch of the "Welcome Series A" email campaign, which improved early user onboarding retention by 15%.',
      highlight: true,
    },
  ])

  const [inputValue, setInputValue] = useState('')

  const revenueData = [
    { month: 'Jan', revenue: 85000 },
    { month: 'Feb', revenue: 92000 },
    { month: 'Mar', revenue: 88000 },
    { month: 'Apr', revenue: 95000 },
    { month: 'May', revenue: 102000 },
    { month: 'Jun', revenue: 112000 },
    { month: 'Jul', revenue: 105000 },
    { month: 'Aug', revenue: 98400 },
    { month: 'Sep', revenue: 101000 },
    { month: 'Oct', revenue: 107000 },
    { month: 'Nov', revenue: 115000 },
    { month: 'Dec', revenue: 120000 },
  ]

  const kpiData = [
    { label: 'Total Revenue', value: '$1.2M', change: '+12%', changeType: 'positive', icon: <DollarSign size={20} />, context: 'vs. previous period' },
    { label: 'Active Users', value: '45.2k', change: '+5%', changeType: 'positive', icon: <Users size={20} />, context: 'vs. previous period' },
    { label: 'Churn Rate', value: '2.1%', change: '-0.5%', changeType: 'positive', icon: <TrendingDown size={20} />, context: 'vs. last month' },
  ]

  const regions = [
    { name: 'North America', percentage: 45 },
    { name: 'Europe', percentage: 32 },
    { name: 'Asia Pacific', percentage: 18 },
  ]

  const campaigns = [
    { name: 'Summer_Promo_23', conversion: '4.2%', roi: '240%' },
    { name: 'Black_Friday_Early', conversion: '5.8%', roi: '310%' },
    { name: 'Welcome_Series_A', conversion: '3.1%', roi: '180%' },
  ]

  return (
    <div className="dashboard-assistant-page">
      <div className="top-nav">
        <div className="nav-logo">Dataviz Studio</div>
        <div className="nav-actions">
          <Button variant="outline" size="sm" icon={<Download size={16} />}>
            Export PDF
          </Button>
          <button className="icon-nav-btn">
            <Share2 size={18} />
          </button>
          <Button variant="outline" size="sm" icon={<LogIn size={16} />}>
            Sign In / Join
          </Button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="main-dashboard">
          <div className="dashboard-header-section">
            <div>
              <h1 className="dashboard-title">Q3 Marketing Performance</h1>
              <div className="dashboard-meta-info">
                <span className="live-badge">Live</span>
                <span className="meta-text">Last updated 2 hours ago</span>
              </div>
              <p className="dashboard-description">Comprehensive overview of Q3 marketing channels.</p>
            </div>
          </div>

          <div className="filters-bar">
            <select className="filter-select">
              <option>Q3 2023</option>
            </select>
            <select className="filter-select">
              <option>Global</option>
            </select>
            <select className="filter-select">
              <option>All</option>
            </select>
            <Button variant="ghost" size="sm">
              Reset Filters
            </Button>
          </div>

          <div className="kpi-row">
            {kpiData.map((kpi, index) => (
              <Card key={index} className="kpi-card-assistant">
                <div className="kpi-header-assistant">
                  <div className="kpi-icon-assistant">{kpi.icon}</div>
                  <div className="kpi-label-assistant">{kpi.label}</div>
                </div>
                <div className="kpi-value-assistant">{kpi.value}</div>
                <div className={`kpi-change-assistant ${kpi.changeType}`}>
                  {kpi.changeType === 'positive' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {kpi.change}
                </div>
                <div className="kpi-context-assistant">{kpi.context}</div>
              </Card>
            ))}
          </div>

          <div className="charts-section">
            <Card className="chart-card-assistant">
              <h3 className="chart-title-assistant">Revenue Growth</h3>
              <p className="chart-subtitle-assistant">Monthly recurring revenue (MRR) over time</p>
              <div className="chart-container-assistant">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis 
                      dataKey="month" 
                      stroke="var(--text-secondary)"
                      tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="var(--text-secondary)"
                      tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--bg-card)', 
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        color: 'var(--text-primary)'
                      }}
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

            <Card className="chart-card-assistant">
              <h3 className="chart-title-assistant">Users by Region</h3>
              <div className="regions-list">
                {regions.map((region, index) => (
                  <div key={index} className="region-item">
                    <div className="region-header">
                      <span className="region-name">{region.name}</span>
                      <span className="region-percentage">{region.percentage}%</span>
                    </div>
                    <div className="progress-bar-assistant">
                      <div 
                        className="progress-fill-assistant" 
                        style={{ width: `${region.percentage}%`, backgroundColor: 'var(--blue-500)' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="chart-card-assistant">
              <h3 className="chart-title-assistant">Top Campaigns</h3>
              <table className="campaigns-table">
                <thead>
                  <tr>
                    <th>Campaign</th>
                    <th>Conv.</th>
                    <th>ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign, index) => (
                    <tr key={index}>
                      <td>{campaign.name}</td>
                      <td>{campaign.conversion}</td>
                      <td className="roi-positive">{campaign.roi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </div>

        <div className="assistant-sidebar">
          <div className="assistant-header">
            <Sparkles size={20} className="assistant-icon" />
            <span className="assistant-title">Data Assistant</span>
          </div>
          <div className="assistant-prompt">
            Ask questions about this dashboard.
          </div>

          <div className="messages-container">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.type}`}>
                {message.type === 'assistant' ? (
                  <div className="message-content">
                    {message.content}
                    {message.highlight && (
                      <a href="#" className="highlight-link">Highlight related data</a>
                    )}
                  </div>
                ) : (
                  <div className="message-content user-message">
                    {message.content}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="usage-info">
            <span className="usage-text">2 free questions remaining</span>
            <div className="usage-bar">
              <div className="usage-fill" style={{ width: '60%' }}></div>
            </div>
            <span className="usage-label">3/5 Free Uses</span>
            <a href="#" className="upgrade-link">Upgrade for unlimited queries</a>
          </div>

          <div className="assistant-input-container">
            <input
              type="text"
              className="assistant-input"
              placeholder="Ask a question about this data..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="assistant-send-btn">
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardWithAssistant
