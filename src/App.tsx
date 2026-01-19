import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { ROUTES } from './constants/routes'
import LoginPage from './pages/LoginPage'
import DashboardList from './pages/DashboardList'
import DashboardDetail from './pages/DashboardDetail'
import DataSourceUpload from './pages/DataSourceUpload'
import SemanticModel from './pages/SemanticModel'
import PromptStudio from './pages/PromptStudio'
import VisualizationEditor from './pages/VisualizationEditor'
import DashboardWithAssistant from './pages/DashboardWithAssistant'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<LoginPage />} />
          <Route path={ROUTES.DASHBOARDS} element={<DashboardList />} />
          <Route path="/dashboard/:id" element={<DashboardDetail />} />
          <Route path={ROUTES.DATA_SOURCES_UPLOAD} element={<DataSourceUpload />} />
          <Route path={ROUTES.SEMANTIC_MODEL} element={<SemanticModel />} />
          <Route path={ROUTES.STUDIO} element={<PromptStudio />} />
          <Route path={ROUTES.VISUALIZATION_EDIT} element={<VisualizationEditor />} />
          <Route path={ROUTES.DASHBOARD_WITH_ASSISTANT} element={<DashboardWithAssistant />} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
