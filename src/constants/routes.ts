/**
 * Centralized route configuration
 * All routes should be defined here and imported where needed
 */

export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/',
  
  // Dashboard routes
  DASHBOARDS: '/dashboards',
  DASHBOARD_DETAIL: (id: string | number) => `/dashboard/${id}`,
  DASHBOARD_PREVIEW: (id: string | number) => `/dashboard/${id}/preview`,
  DASHBOARD_PUBLISHED: (id: string | number) => `/view/${id}`,
  
  // Data Source routes
  DATA_SOURCES: '/data-sources',
  DATA_SOURCES_UPLOAD: '/data-sources/upload',
  
  // Semantic Model routes
  SEMANTIC_MODEL: '/semantic-model',
  SEMANTIC_MODELS: '/semantic-model',
  
  // Studio routes
  STUDIO: '/studio',
  PROMPT_STUDIO: '/studio',
  STUDIO_NEW: '/studio/new',
  
  // Visualization routes
  VISUALIZATION_EDIT: '/visualization/edit',
  VISUALIZATION_EDIT_WITH_ID: (dashboardId: string | number, chartId?: string) => 
    `/visualization/edit/${dashboardId}${chartId ? `/${chartId}` : ''}`,
  
  // Dashboard with Assistant (internal preview)
  DASHBOARD_WITH_ASSISTANT: '/dashboard-with-assistant',
  
  // Settings
  SETTINGS: '/settings',
  
  // Modeler
  MODELER: '/modeler',
} as const

// Helper function to check if a route matches
export const isRouteActive = (currentPath: string, route: string): boolean => {
  if (route === '/') {
    return currentPath === '/'
  }
  return currentPath === route || currentPath.startsWith(route + '/')
}




