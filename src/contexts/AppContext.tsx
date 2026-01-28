import React, { createContext, useContext, useState, useCallback } from 'react'

// Types
export interface Dashboard {
  id: number
  title: string
  status: 'draft' | 'published'
  thumbnail: string
  description?: string
  createdAt: string
  updatedAt: string
  createdBy: string
  views: number
  comments: number
  prompt?: string
  dataSource?: string
  kpis?: KPI[]
  charts?: ChartConfig[]
}

export interface KPI {
  label: string
  value: string
  change: string
  changeType: 'positive' | 'negative'
  icon: string
  context: string
}

export interface ChartConfig {
  id: string
  type: 'bar' | 'line' | 'pie' | 'area'
  title: string
  subtitle?: string
  data: any[]
}

export interface DataSource {
  id: number
  name: string
  fileName: string
  status: 'connected' | 'pending'
  rows: number
  columns: string[]
  uploadedAt: string
}

export interface Notification {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  duration?: number
}

interface AppContextType {
  // Dashboards
  dashboards: Dashboard[]
  addDashboard: (dashboard: Omit<Dashboard, 'id' | 'createdAt' | 'updatedAt'>) => Dashboard
  updateDashboard: (id: number, updates: Partial<Dashboard>) => void
  getDashboard: (id: number) => Dashboard | undefined
  publishDashboard: (id: number) => void
  deleteDashboard: (id: number) => void
  
  // Data Sources
  dataSources: DataSource[]
  addDataSource: (dataSource: Omit<DataSource, 'id'>) => void
  
  // Current Session
  currentUser: { name: string; role: string; avatar?: string }
  currentDataSource: DataSource | null
  setCurrentDataSource: (ds: DataSource | null) => void
  
  // Notifications
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
  
  // Loading State
  isLoading: boolean
  loadingMessage: string
  startLoading: (message?: string) => void
  stopLoading: () => void
}

// Initial Mock Data
const initialDashboards: Dashboard[] = [
  {
    id: 1,
    title: 'Q3 Sales Performance',
    status: 'published',
    thumbnail: 'bar-chart',
    description: 'Comprehensive analysis of Q3 sales metrics across all regions',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T12:30:00Z',
    createdBy: 'AI',
    views: 124,
    comments: 12,
    prompt: 'Analyze Q3 revenue trends by region with a focus on underperforming stores',
    dataSource: 'Global_Sales_2023.parquet',
    kpis: [
      { label: 'Total Revenue', value: '$1.2M', change: '+12%', changeType: 'positive', icon: '💰', context: 'vs. previous period' },
      { label: 'Active Users', value: '4,302', change: '+5.2%', changeType: 'positive', icon: '👥', context: 'vs. previous period' },
      { label: 'Avg. Deal Size', value: '$8.4k', change: '-2.1%', changeType: 'negative', icon: '🛍️', context: 'vs. previous period' },
      { label: 'Churn Rate', value: '2.1%', change: '-0.5%', changeType: 'positive', icon: '📉', context: 'Improvement from last Q' },
    ],
  },
  {
    id: 2,
    title: 'Customer Churn Analysis',
    status: 'draft',
    thumbnail: 'map',
    description: 'Deep dive into customer churn patterns and retention strategies',
    createdAt: '2024-01-14T09:00:00Z',
    updatedAt: '2024-01-14T09:00:00Z',
    createdBy: 'Me',
    views: 45,
    comments: 0,
    prompt: 'Show customer churn analysis with risk segmentation',
    dataSource: 'Customer_Data_2023.csv',
    kpis: [
      { label: 'Churn Rate', value: '3.2%', change: '-0.8%', changeType: 'positive', icon: '📉', context: 'vs. last quarter' },
      { label: 'At Risk Customers', value: '234', change: '+12', changeType: 'negative', icon: '⚠️', context: 'needs attention' },
      { label: 'Retention Rate', value: '96.8%', change: '+0.8%', changeType: 'positive', icon: '🎯', context: 'vs. last quarter' },
      { label: 'Avg. Customer LTV', value: '$12.4k', change: '+5%', changeType: 'positive', icon: '💎', context: 'increasing' },
    ],
  },
  {
    id: 3,
    title: 'Website Traffic Overview',
    status: 'published',
    thumbnail: 'bar-chart-up',
    description: 'Real-time website analytics and user behavior insights',
    createdAt: '2024-01-10T14:00:00Z',
    updatedAt: '2024-01-12T16:00:00Z',
    createdBy: 'Team',
    views: 890,
    comments: 42,
    prompt: 'Create a comprehensive website traffic dashboard with conversion funnels',
    dataSource: 'Web_Analytics_2023.csv',
    kpis: [
      { label: 'Page Views', value: '2.4M', change: '+18%', changeType: 'positive', icon: '👁️', context: 'this month' },
      { label: 'Unique Visitors', value: '456k', change: '+12%', changeType: 'positive', icon: '👤', context: 'this month' },
      { label: 'Bounce Rate', value: '34%', change: '-5%', changeType: 'positive', icon: '↩️', context: 'improvement' },
      { label: 'Avg. Session', value: '4:32', change: '+0:45', changeType: 'positive', icon: '⏱️', context: 'per user' },
    ],
  },
  {
    id: 4,
    title: 'Marketing ROI',
    status: 'published',
    thumbnail: 'bar-chart',
    description: 'Marketing campaign performance and ROI analysis',
    createdAt: '2024-01-08T11:00:00Z',
    updatedAt: '2024-01-13T09:00:00Z',
    createdBy: 'Marketing',
    views: 2100,
    comments: 89,
    prompt: 'Show marketing ROI by channel with attribution modeling',
    dataSource: 'Marketing_Spend_2023.csv',
    kpis: [
      { label: 'Total Spend', value: '$458k', change: '+8%', changeType: 'negative', icon: '💵', context: 'this quarter' },
      { label: 'Total Revenue', value: '$1.8M', change: '+22%', changeType: 'positive', icon: '💰', context: 'attributed' },
      { label: 'ROAS', value: '3.9x', change: '+0.4x', changeType: 'positive', icon: '📈', context: 'return on ad spend' },
      { label: 'CAC', value: '$42', change: '-$8', changeType: 'positive', icon: '🎯', context: 'cost per acquisition' },
    ],
  },
  {
    id: 5,
    title: 'Employee Performance',
    status: 'draft',
    thumbnail: 'gauge',
    description: 'Team productivity and performance metrics',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z',
    createdBy: 'AI',
    views: 0,
    comments: 0,
    prompt: 'Analyze employee performance metrics with team comparisons',
    dataSource: 'HR_Data_2023.csv',
    kpis: [
      { label: 'Productivity Score', value: '87%', change: '+3%', changeType: 'positive', icon: '🚀', context: 'team average' },
      { label: 'Goals Completed', value: '156', change: '+23', changeType: 'positive', icon: '✅', context: 'this month' },
      { label: 'Avg. Response Time', value: '2.4h', change: '-0.6h', changeType: 'positive', icon: '⚡', context: 'improvement' },
      { label: 'Team Satisfaction', value: '4.2/5', change: '+0.3', changeType: 'positive', icon: '😊', context: 'survey score' },
    ],
  },
  {
    id: 6,
    title: 'Inventory Status',
    status: 'draft',
    thumbnail: 'pie-chart',
    description: 'Real-time inventory levels and supply chain status',
    createdAt: '2024-01-15T07:00:00Z',
    updatedAt: '2024-01-15T07:00:00Z',
    createdBy: 'AI',
    views: 2,
    comments: 0,
    prompt: 'Create inventory dashboard with stock alerts and reorder recommendations',
    dataSource: 'Inventory_2023.csv',
    kpis: [
      { label: 'Total SKUs', value: '12,456', change: '+234', changeType: 'positive', icon: '📦', context: 'active products' },
      { label: 'Low Stock Items', value: '89', change: '+12', changeType: 'negative', icon: '⚠️', context: 'needs reorder' },
      { label: 'Turnover Rate', value: '4.2x', change: '+0.3x', changeType: 'positive', icon: '🔄', context: 'this quarter' },
      { label: 'Stock Value', value: '$2.8M', change: '+$120k', changeType: 'positive', icon: '💎', context: 'total value' },
    ],
  },
]

const initialDataSources: DataSource[] = [
  {
    id: 1,
    name: 'Global Sales 2023',
    fileName: 'Global_Sales_2023.parquet',
    status: 'connected',
    rows: 125402,
    columns: ['Transaction_ID', 'Purchase_Date', 'Revenue_Amount', 'Customer_Region', 'Product_SKU', 'Quantity'],
    uploadedAt: '2024-01-10T10:00:00Z',
  },
  {
    id: 2,
    name: 'Customer Data',
    fileName: 'Customer_Data_2023.csv',
    status: 'connected',
    rows: 45678,
    columns: ['Customer_ID', 'Name', 'Segment', 'Region', 'Join_Date', 'Last_Purchase'],
    uploadedAt: '2024-01-08T14:30:00Z',
  },
  {
    id: 3,
    name: 'Sales Data Q3',
    fileName: 'sales_data_q3_2023.csv',
    status: 'connected',
    rows: 15402,
    columns: ['Transaction_ID', 'Purchase_Date', 'Revenue_Amount', 'Customer_Region', 'Internal_Code_Legacy'],
    uploadedAt: '2024-01-15T09:00:00Z',
  },
]

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dashboards, setDashboards] = useState<Dashboard[]>(initialDashboards)
  const [dataSources, setDataSources] = useState<DataSource[]>(initialDataSources)
  const [currentDataSource, setCurrentDataSource] = useState<DataSource | null>(initialDataSources[0])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  
  const currentUser = { name: 'Alex Morgan', role: 'Owner' }

  const addDashboard = useCallback((dashboard: Omit<Dashboard, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newId = Math.max(...dashboards.map(d => d.id), 0) + 1
    const now = new Date().toISOString()
    const newDashboard: Dashboard = {
      ...dashboard,
      id: newId,
      createdAt: now,
      updatedAt: now,
    }
    setDashboards(prev => [newDashboard, ...prev])
    return newDashboard
  }, [dashboards])

  const updateDashboard = useCallback((id: number, updates: Partial<Dashboard>) => {
    setDashboards(prev => prev.map(d => 
      d.id === id 
        ? { ...d, ...updates, updatedAt: new Date().toISOString() }
        : d
    ))
  }, [])

  const getDashboard = useCallback((id: number) => {
    return dashboards.find(d => d.id === id)
  }, [dashboards])

  const publishDashboard = useCallback((id: number) => {
    updateDashboard(id, { status: 'published' })
  }, [updateDashboard])

  const deleteDashboard = useCallback((id: number) => {
    setDashboards(prev => prev.filter(d => d.id !== id))
  }, [])

  const addDataSource = useCallback((dataSource: Omit<DataSource, 'id'>) => {
    const newId = Math.max(...dataSources.map(d => d.id), 0) + 1
    setDataSources(prev => [...prev, { ...dataSource, id: newId }])
  }, [dataSources])

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newNotification = { ...notification, id }
    setNotifications(prev => [...prev, newNotification])
    
    // Auto-remove after duration
    const duration = notification.duration || 4000
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, duration)
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const startLoading = useCallback((message = 'Loading...') => {
    setLoadingMessage(message)
    setIsLoading(true)
  }, [])

  const stopLoading = useCallback(() => {
    setIsLoading(false)
    setLoadingMessage('')
  }, [])

  return (
    <AppContext.Provider value={{
      dashboards,
      addDashboard,
      updateDashboard,
      getDashboard,
      publishDashboard,
      deleteDashboard,
      dataSources,
      addDataSource,
      currentUser,
      currentDataSource,
      setCurrentDataSource,
      notifications,
      addNotification,
      removeNotification,
      isLoading,
      loadingMessage,
      startLoading,
      stopLoading,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
