import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutGrid, Database, Settings, LogOut, Zap, Network, Sparkles } from 'lucide-react'
import { ROUTES, isRouteActive } from '../constants/routes'
import './Sidebar.css'

interface SidebarItem {
  label: string
  icon: React.ReactNode
  path: string
}

interface SidebarProps {
  title?: string
  subtitle?: string
  items?: SidebarItem[]
  projects?: { name: string; color: string }[]
  user?: { name: string; role: string; avatar?: string }
  showUpgrade?: boolean
}

const Sidebar: React.FC<SidebarProps> = ({
  title = 'Olive',
  subtitle,
  items = [],
  projects = [],
  user,
  showUpgrade = false,
}) => {
  const location = useLocation()

  // Always use consistent default items - pages should not override navigation
  const defaultItems: SidebarItem[] = [
    { label: 'Dashboards', icon: <LayoutGrid size={20} />, path: ROUTES.DASHBOARDS },
    { label: 'Data Sources', icon: <Database size={20} />, path: ROUTES.DATA_SOURCES_UPLOAD },
    { label: 'Semantic Models', icon: <Network size={20} />, path: ROUTES.SEMANTIC_MODEL },
    { label: 'Studio', icon: <Sparkles size={20} />, path: ROUTES.STUDIO },
    { label: 'Settings', icon: <Settings size={20} />, path: ROUTES.SETTINGS },
  ]

  // Only use custom items if explicitly provided, otherwise use defaults
  // This ensures consistent navigation across all pages
  const navItems = items.length > 0 ? items : defaultItems

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">A</div>
        </div>
        <div className="sidebar-title">
          <div className="title-text">{title}</div>
          {subtitle && <div className="subtitle-text">{subtitle}</div>}
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = isRouteActive(location.pathname, item.path)
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {projects.length > 0 && (
        <div className="sidebar-projects">
          <div className="projects-label">PROJECTS</div>
          {projects.map((project, index) => (
            <div key={index} className="project-item">
              <div className="project-dot" style={{ backgroundColor: project.color }} />
              <span>{project.name}</span>
            </div>
          ))}
        </div>
      )}

      <div className="sidebar-footer">
        {showUpgrade && (
          <button className="upgrade-button">
            <Zap size={16} />
            Upgrade Plan
          </button>
        )}
        {user && (
          <div className="user-profile">
            <div className="user-avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <span>{user.name.split(' ').map(n => n[0]).join('')}</span>
              )}
            </div>
            <div className="user-info">
              <div className="user-name">{user.name}</div>
              <div className="user-role">{user.role}</div>
            </div>
          </div>
        )}
        <Link to={ROUTES.LOGIN} className="logout-link">
          <LogOut size={16} />
          <span>Log out</span>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
