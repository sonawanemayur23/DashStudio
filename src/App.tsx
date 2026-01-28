import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AppProvider } from './contexts/AppContext'
import { ROUTES } from './constants/routes'
import LoginPage from './pages/LoginPage'
import DashboardList from './pages/DashboardList'
import DashboardDetail from './pages/DashboardDetail'
import DataSourceUpload from './pages/DataSourceUpload'
import SemanticModel from './pages/SemanticModel'
import PromptStudio from './pages/PromptStudio'
import VisualizationEditor from './pages/VisualizationEditor'
import DashboardWithAssistant from './pages/DashboardWithAssistant'
import PublishedDashboard from './pages/PublishedDashboard'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'
import Toast from './components/Toast'

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.HOME} element={<LoginPage />} />
            <Route path={ROUTES.DASHBOARDS} element={<DashboardList />} />
            <Route path="/dashboard/:id" element={<DashboardDetail />} />
            <Route path="/dashboard/:id/preview" element={<DashboardDetail />} />
            <Route path="/view/:id" element={<PublishedDashboard />} />
            <Route path={ROUTES.DATA_SOURCES_UPLOAD} element={<DataSourceUpload />} />
            <Route path={ROUTES.SEMANTIC_MODEL} element={<SemanticModel />} />
            <Route path={ROUTES.STUDIO} element={<PromptStudio />} />
            <Route path={ROUTES.STUDIO_NEW} element={<PromptStudio />} />
            <Route path={ROUTES.VISUALIZATION_EDIT} element={<VisualizationEditor />} />
            <Route path="/visualization/edit/:dashboardId" element={<VisualizationEditor />} />
            <Route path="/visualization/edit/:dashboardId/:chartId" element={<VisualizationEditor />} />
            <Route path={ROUTES.DASHBOARD_WITH_ASSISTANT} element={<DashboardWithAssistant />} />
            <Route path={ROUTES.SETTINGS} element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toast />
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  )
}

export default App
