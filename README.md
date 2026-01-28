# BI Dashboard Studio - React Application

A comprehensive Business Intelligence dashboard application built with React, TypeScript, and Vite. This pixel-perfect implementation matches the provided designs and includes full dark/light mode support.

## Features

- 🎨 **Pixel-Perfect Design** - Matches all provided design mockups exactly
- 🌓 **Dark/Light Mode** - Full theme support with seamless switching
- 📊 **Multiple Dashboards** - Various dashboard views and analytics
- 🤖 **AI-Powered Features** - AI assistant, prompt studio, and semantic model generation
- 📈 **Data Visualization** - Interactive charts using Recharts
- 🔄 **Full Routing** - Complete navigation between all screens
- 📱 **Responsive Components** - Reusable UI components for consistency

## Screens

1. **Login/Role Selection** (`/`) - DashStudio login with role selection
2. **Dashboard List** (`/dashboards`) - AI Studio Enterprise dashboard management
3. **Dashboard Detail** (`/dashboard/:id`) - Q3 Sales Performance dashboard
4. **Data Source Upload** (`/data-sources/upload`) - CSV upload with schema configuration
5. **Semantic Model** (`/semantic-model`) - Dashboard Studio semantic model editor
6. **Prompt Studio** (`/studio`) - AI dashboard generation studio
7. **Visualization Editor** (`/visualization/edit`) - Interactive chart editor
8. **Dashboard with Assistant** (`/dashboard-with-assistant`) - Q3 Marketing Performance with AI chat

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Routing
- **Recharts** - Chart library
- **Lucide React** - Icon library
- **CSS Modules** - Styling with CSS variables for theming

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start on `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Theme System

The application uses CSS variables for theming, supporting both dark and light modes:

- Theme toggle available in the login page (top right)
- Theme preference is saved to localStorage
- All components automatically adapt to the selected theme

### Color Palette

**Dark Theme:**
- Primary Background: `#0a0e27`
- Secondary Background: `#131b2e`
- Accent: `#3b82f6` (Blue), `#8b5cf6` (Purple)

**Light Theme:**
- Primary Background: `#ffffff`
- Secondary Background: `#f7fafc`
- Accent: `#3b82f6` (Blue), `#8b5cf6` (Purple)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Sidebar.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Input.tsx
├── pages/              # Page components
│   ├── LoginPage.tsx
│   ├── DashboardList.tsx
│   ├── DashboardDetail.tsx
│   ├── DataSourceUpload.tsx
│   ├── SemanticModel.tsx
│   ├── PromptStudio.tsx
│   ├── VisualizationEditor.tsx
│   └── DashboardWithAssistant.tsx
├── contexts/           # React contexts
│   └── ThemeContext.tsx
├── styles/             # Global styles
│   └── theme.css
├── App.tsx            # Main app component with routing
└── main.tsx           # Entry point
```

## Key Features

### Navigation
- Persistent sidebar navigation
- Breadcrumb navigation
- Route-based active states

### Data Visualization
- Bar charts
- Line charts
- Pie/Donut charts
- Custom styled tooltips and legends

### Interactive Components
- Dropdowns and selects
- Toggle switches
- Range sliders
- Input fields with icons
- Modal dialogs

### AI Features
- Prompt-based dashboard generation
- AI assistant chat interface
- Semantic model auto-generation
- Data quality analysis

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Development Notes

- All styling uses CSS variables for easy theme customization
- Components are fully typed with TypeScript
- Icons from Lucide React for consistency
- Charts powered by Recharts for interactivity
- Responsive layouts with CSS Grid and Flexbox



