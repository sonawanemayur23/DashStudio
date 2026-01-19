# Olive - Product Explanation Document
## An AI-Powered Business Intelligence Dashboard Platform

---

## 📋 Table of Contents

1. [What is Olive?](#what-is-olive)
2. [Getting Started - Login Screen](#getting-started---login-screen)
3. [Dashboard List - Your Dashboard Collection](#dashboard-list---your-dashboard-collection)
4. [Prompt Studio - Create Dashboards with AI](#prompt-studio---create-dashboards-with-ai)
5. [Data Source Upload - Add Your Data](#data-source-upload---add-your-data)
6. [Semantic Model - Organize Your Data](#semantic-model---organize-your-data)
7. [Dashboard Detail - View and Analyze](#dashboard-detail---view-and-analyze)
8. [Dashboard with Assistant - Ask Questions](#dashboard-with-assistant---ask-questions)
9. [Visualization Editor - Customize Charts](#visualization-editor---customize-charts)
10. [Settings - Personalize Your Experience](#settings---personalize-your-experience)

---

## What is Olive?

**Olive** is an intelligent business analytics platform that helps you turn your data into beautiful, interactive dashboards using artificial intelligence. Instead of needing technical skills or data science expertise, you can simply describe what you want to see, and Olive will create professional dashboards for you.

### Key Benefits:
- **No Coding Required**: Describe your needs in plain English
- **AI-Powered**: Artificial intelligence does the heavy lifting
- **Quick Setup**: Get insights in minutes, not weeks
- **Professional Results**: Beautiful, publication-ready dashboards
- **Interactive**: Ask questions about your data and get instant answers

---

## Getting Started - Login Screen

### Purpose
The login screen is where you begin your journey with Olive. Here, you can sign in or choose a role that matches your needs.

### Features:

#### **Role Selection**
Choose from four different roles based on what you need to do:

1. **Owner**
   - Full control over everything
   - Manage billing and subscriptions
   - Access to all settings
   - Best for: Business owners and decision-makers

2. **Admin**
   - Manage team members
   - Connect data sources
   - Organize projects
   - Best for: Team leaders and data managers

3. **Editor**
   - Create and edit dashboards
   - Publish analytics reports
   - Customize visualizations
   - Best for: Analysts and content creators

4. **Viewer**
   - Explore existing dashboards
   - Filter and search data
   - Ask questions about reports
   - Best for: End users and stakeholders

#### **Sign-In Options**
- Sign in with Google
- Sign in with Microsoft
- Continue as a selected role (for testing/demo purposes)

#### **Theme Toggle**
Switch between dark mode (🌙) and light mode (☀️) to match your preference.

---

## Dashboard List - Your Dashboard Collection

### Purpose
This is your main workspace where you can see all your dashboards at a glance, similar to a gallery or portfolio of your analytics reports.

### Features:

#### **Search and Filter**
- **Search Bar**: Type keywords to find specific dashboards quickly
- **Status Filter**: View only Published dashboards, Draft dashboards, or both
- **Owner Filter**: See dashboards created by you, your team, or everyone

#### **View Modes**
- **Grid View** (📊): See dashboards as cards with previews
- **List View** (📋): See dashboards in a compact list format

#### **Dashboard Cards**
Each dashboard card shows:
- **Preview**: A small visual preview of the charts inside
- **Title**: Name of the dashboard (e.g., "Q3 Sales Performance")
- **Status Badge**: 
  - 🟢 **Published**: Ready to share with others
  - 🟡 **Draft**: Still being worked on
- **Metadata**: 
  - When it was created or last updated
  - Who created it (you, AI, or team members)
  - Number of views (how many people have seen it)
  - Number of comments

#### **Actions**
- **New Dashboard Button**: Create a fresh dashboard using AI
- **Click a Dashboard**: Open it to view details
- **Menu Button** (⋮): Access options like edit, duplicate, or delete

#### **Example Dashboards You Might See:**
- Q3 Sales Performance
- Customer Churn Analysis
- Website Traffic Overview
- Marketing ROI
- Employee Performance
- Inventory Status

---

## Prompt Studio - Create Dashboards with AI

### Purpose
This is where the magic happens! The Prompt Studio lets you create new dashboards simply by describing what you want in plain English. It's like having a conversation with an AI assistant who builds dashboards for you.

### Features:

#### **Recent Prompts Sidebar**
- See your recent dashboard creation requests
- Quick access to past prompts
- Start a new session anytime

#### **Prompt Templates**
Pre-built templates to get started quickly:
- **Sales Overview**: Analyze sales performance
- **Churn Analysis**: Understand customer retention
- **Marketing ROI**: Measure marketing effectiveness
- **Inventory Health**: Monitor stock levels

#### **Main Prompt Input**
This is where you describe what you want:
- **Connected Data Source**: Shows which data file you're working with
- **Text Area**: Type your request in natural language
  - Example: "Show me Q3 revenue trends by region, focusing on underperforming stores"
- **Voice Input** (🎤): Speak your request instead of typing
- **Image Upload** (🖼️): Attach reference images or screenshots
- **Add Metric**: Include specific measurements you want to track

#### **Live Prompt Preview**
See how your request is being interpreted by the AI:
- Shows the AI's role (BI_Architect_Expert_v2)
- Displays your connected data context
- Lists constraints and preferences
- Updates in real-time as you type

#### **Configuration Sidebar**
Fine-tune how your dashboard will be created:

1. **Data Source**: Choose which data file to use
2. **Time Period**: Select date ranges (e.g., Jan 2023 - Dec 2023)
3. **Output Type**: 
   - Dashboard (interactive)
   - Report (static document)
4. **Analysis Depth**: 
   - Summary (quick overview)
   - Detailed (moderate depth)
   - Deep Dive (comprehensive analysis)
5. **Options**:
   - Include Forecast: Show future predictions
   - Show Anomalies: Highlight unusual patterns
   - Global Filters: Allow filtering across all charts
6. **KPI Style**: Choose how key metrics are displayed
   - Minimal (clean, simple)
   - Card (detailed cards)
   - List (compact list)

#### **Generate Button**
Click this when you're ready! The AI will create your dashboard based on your description and settings.

---

## Data Source Upload - Add Your Data

### Purpose
Before you can create dashboards, you need to upload your data. This screen helps you import CSV files and configure how Olive understands your data.

### Features:

#### **File Upload Status**
After uploading a file, you'll see:
- **File Name**: The name of your uploaded file
- **Status**: Ready when the file is processed
- **File Details**:
  - Size (e.g., 14.2 MB)
  - Number of rows detected
  - Upload time
- **Replace File**: Upload a different file if needed

#### **Schema Configuration Tab**
This tab shows all the columns in your data file and lets you configure them:

**Field Settings Table:**
- **Checkbox**: Include or exclude columns from analysis
- **Column Name**: The name of each data column
- **AI Badge**: Shows which columns were automatically detected by AI
- **Data Type**: Dropdown to set the type of data:
  - String (text)
  - Number (numeric values)
  - Date (dates and times)
  - Currency (money amounts)
- **Sample Value**: See what the data looks like

#### **Data Preview Tab**
View a sample of your actual data to verify everything looks correct.

#### **AI Analysis Panel**
The right sidebar provides intelligent assistance:

1. **AI Analysis Complete**: Confirmation that AI has processed your file
2. **AI Suggestions Card**: 
   - Detects important fields (like dates or revenue)
   - Suggests useful charts
   - Offers to generate visualizations automatically
3. **Data Quality Check**:
   - Missing Values: Percentage of empty cells
   - Distinct Values: Number of unique items (e.g., 4 regions)
   - Date Range: The time period covered in your data

#### **Actions**
- **Reset to Default**: Undo your changes
- **Back**: Return to previous step
- **Connect Dataset**: Save your configuration and proceed

---

## Semantic Model - Organize Your Data

### Purpose
A semantic model translates your raw data into business-friendly terms. It's like creating a dictionary that helps the AI understand what your data means in business context.

### Features:

#### **Data Sources Sidebar**
Left panel showing all your connected data tables:
- See all database tables
- View columns in each table
- Search for specific columns
- Connect new tables

#### **Dimensions Section**
Dimensions are ways to group or categorize your data:

**Example Dimensions:**
- Order Date: When transactions happened
- Customer Segment: Types of customers (Enterprise, SMB, etc.)
- Region: Geographic locations

For each dimension, you specify:
- **Friendly Name**: What you want to call it (business-friendly)
- **Source Column**: Where the data comes from (technical location)
- **Type**: DATE, STRING, etc.

#### **Measures Section**
Measures are the numbers you want to analyze:

**Example Measures:**
- Total Revenue: Sum of all sales
- Average Order Value: Average amount per order

For each measure, you specify:
- **Friendly Name**: Business term (e.g., "Total Revenue")
- **Aggregation**: How to calculate it (SUM, AVG, COUNT, etc.)
- **Format**: How to display it ($ CURRENCY, NUMBER, PERCENTAGE)

#### **Field Properties Panel**
When you click on a dimension or measure, a panel opens to edit:

**Settings Include:**
- **Display Name**: What users will see
- **Description**: Explanation of what this metric means
- **Aggregation**: Calculation method
- **Format**: Display style
- **Source Column**: Original data location
- **Synonyms**: Alternative names the AI should recognize
  - Example: "sales, income, gross revenue" for Total Revenue
- **Visible to AI**: Whether AI can use this metric
- **Verified Metric**: Mark trusted, validated metrics

#### **Calculated Fields**
Create new metrics by combining existing columns:
- Example: "Profit Margin = (Revenue - Cost) / Revenue"
- Uses SQL-like expressions

#### **Auto-Generate Model**
Button that lets AI automatically create the semantic model by analyzing your data structure.

---

## Dashboard Detail - View and Analyze

### Purpose
This is where you view a complete dashboard with all its charts, metrics, and insights. It's your finished analytics report.

### Features:

#### **Dashboard Header**
- **Title**: Name of the dashboard
- **Preview Badge**: Shows if you're in preview mode (not yet published)
- **Metadata**: When it was created and last updated
- **Actions**:
  - **Edit Layout**: Rearrange charts and widgets
  - **Share**: Send to team members
  - **Publish**: Make it available to others

#### **Filters Section**
Apply filters to see different views of the data:
- **Time Range**: Last 90 Days, This Month, Custom range
- **Region**: Filter by geographic area
- **Product**: Filter by product type
- **Reset All**: Clear all filters

#### **KPI Cards (Key Performance Indicators)**
Large cards showing your most important metrics:

**Each KPI Shows:**
- **Icon**: Visual representation (💰 revenue, 👥 users, etc.)
- **Label**: What you're measuring
- **Value**: Current number (e.g., $1.2M)
- **Change**: Percentage change (e.g., +12%)
- **Trend Indicator**: Green for positive, red for negative
- **Context**: Comparison period (e.g., "vs. previous period")

**Example KPIs:**
- Total Revenue: $1.2M (+12%)
- Active Users: 4,302 (+5.2%)
- Average Deal Size: $8.4k (-2.1%)
- Churn Rate: 2.1% (-0.5% - improvement!)

#### **Charts Section**
Visual representations of your data:

1. **Revenue Overview** (Bar Chart)
   - Monthly revenue over time
   - Easy to spot trends

2. **Traffic Source** (Pie Chart)
   - Shows distribution (e.g., 45% Direct, 25% Organic Search, 30% Social)
   - Visual breakdown of sources

3. **Recent Transactions** (Table)
   - List of recent activities
   - Customer, date, amount, status

4. **Geographic Distribution** (Map)
   - Visual representation of data by location

#### **AI Question Overlay**
At the bottom, you can ask AI questions about the dashboard:
- "Why did revenue peak in June?"
- "What caused the churn rate decrease?"
- Get instant answers based on your data

---

## Dashboard with Assistant - Ask Questions

### Purpose
An interactive dashboard experience where you can have a conversation with an AI assistant about your data. Ask questions in plain English and get immediate insights.

### Features:

#### **Top Navigation**
- Export to PDF
- Share dashboard
- Sign in / Join options

#### **Dashboard Display**
Similar to Dashboard Detail, showing:
- Dashboard title and description
- Live badge (shows data is current)
- Last updated timestamp
- Filters for time, region, and other dimensions
- KPI cards with key metrics
- Interactive charts

#### **AI Assistant Sidebar**
Right panel for conversation:

**Header:**
- Sparkles icon (✨) indicating AI
- "Data Assistant" title

**Conversation Flow:**
- **Welcome Message**: AI suggests questions you can ask
  - "Why did revenue peak in June?"
  - "Compare ROI for top 3 campaigns"
  - "Summarize the churn trend"
- **Your Questions**: Type or ask about your data
- **AI Responses**: Get detailed explanations
  - Highlighted answers for important insights
  - "Highlight related data" link to see supporting charts

**Example Conversation:**
- **You**: "What caused the dip in churn rate in August?"
- **AI**: "Churn rate decreased by 0.5% in August primarily due to the launch of the 'Welcome Series A' email campaign, which improved early user onboarding retention by 15%."

**Usage Meter:**
- Shows free questions remaining
- Progress bar (e.g., 3/5 Free Uses)
- Upgrade link for unlimited queries

**Input Box:**
- Type your questions
- Send button to submit

---

## Visualization Editor - Customize Charts

### Purpose
Fine-tune individual charts and visualizations. Customize how data is displayed, change chart types, and adjust styling.

### Features:

#### **Live Preview Panel**
Left side shows your chart as you edit it:
- **Live Preview Badge**: Confirms changes update in real-time
- **Chart Title**: What the visualization is called
- **Device Buttons**:
  - Desktop view (🖥️)
  - Mobile view (📱)
  - Refresh (🔄)
- **Preview Card**: Shows exactly how the chart will appear
  - Includes header with title and summary
  - Total value display (e.g., $1.2M)
  - Percentage change indicator
  - The actual chart visualization

#### **Editor Panel**
Right side with all customization options:

**Visualization Type:**
Choose how to display your data:
- **Bar Chart** (📊): For comparing categories
- **Line Chart** (📈): For showing trends over time
- **Area Chart** (📊): For cumulative values
- **Pie Chart** (🥧): For showing parts of a whole

**Data Configuration:**
- **X-Axis (Dimension)**: What to show on the horizontal axis
  - Example: Transaction Date (Month)
- **Y-Axis (Measure)**: What to show on the vertical axis
  - Example: Total Revenue

**Constraints & Sort:**
- **Limit**: Maximum number of items to show (e.g., top 12)
- **Sort By**: 
  - Value (Descending) - Highest first
  - Value (Ascending) - Lowest first
  - Date (Descending) - Newest first
  - Date (Ascending) - Oldest first

**AI Assistant Section:**
Describe changes in natural language:
- Input box: "Make the bars blue" or "Group by region"
- Quick suggestions:
  - "Group by Region"
  - "Show Top 5"

**Actions:**
- **Reset to Default**: Undo all changes
- **Cancel**: Discard changes and exit
- **Update Card**: Save your changes

---

## Settings - Personalize Your Experience

### Purpose
Configure your account preferences, manage your workspace, and adjust how Olive works for you.

### Features:

#### **Appearance Settings**
- **Theme Toggle**: Switch between dark mode (🌙) and light mode (☀️)
  - Dark mode: Better for low-light environments
  - Light mode: Classic bright interface

#### **Account Settings**
- **Profile Information**: 
  - Update your name, email, and personal details
  - Change your profile picture
  - Edit button to modify

#### **Workspace Settings**
- **Workspace Name**: The name of your organization/team
  - Currently: "Olive"
  - Change button to rename

#### **Security Settings**
- **Password Management**: 
  - Shows when you last changed your password
  - Change Password button to update

#### **Billing Settings**
- **Subscription Information**:
  - Current plan (e.g., Enterprise Plan)
  - Monthly cost (e.g., $99/month)
  - Manage Billing button to:
    - Update payment method
    - Change subscription tier
    - View billing history
    - Cancel subscription

#### **Navigation**
- Search bar at the top
- Notification bell (🔔)
- User avatar showing your initials

---

## Common Use Cases

### For Business Owners
1. **Upload sales data** → Create dashboard → See revenue trends → Share with investors
2. **Ask AI questions** → Get instant insights → Make data-driven decisions

### For Analysts
1. **Connect multiple data sources** → Build semantic model → Create detailed dashboards → Publish reports

### For Team Managers
1. **Use Prompt Studio** → Describe what you need → AI generates dashboard → Review and publish → Share with team

### For Stakeholders
1. **Browse dashboard list** → Open relevant dashboards → Apply filters → Ask questions → Export reports

---

## Tips for Getting Started

1. **Start Simple**: Begin with one data file and a basic prompt
2. **Use Templates**: Leverage prompt templates to get started quickly
3. **Ask Questions**: Don't hesitate to use the AI assistant
4. **Experiment**: Try different visualization types to see what works best
5. **Filter Data**: Use filters to drill down into specific areas
6. **Save Drafts**: Create dashboards as drafts, review them, then publish
7. **Share Early**: Get feedback from your team before finalizing

---

## Glossary of Terms

- **Dashboard**: A collection of charts and metrics showing insights about your data
- **KPI**: Key Performance Indicator - an important metric you track
- **Semantic Model**: A business-friendly translation of your raw data
- **Dimension**: A way to categorize data (e.g., Region, Date, Product)
- **Measure**: A number you analyze (e.g., Revenue, Count, Average)
- **Prompt**: A description you give to AI to create something
- **Data Source**: Your original data file or database connection
- **Visualization**: A chart or graph showing your data
- **Filter**: A way to narrow down what data you're viewing
- **Aggregation**: How numbers are calculated (Sum, Average, Count, etc.)

---

## Support and Help

- **Help Center**: Access from login page footer
- **Privacy Policy**: Available from login page
- **Terms of Service**: Available from login page
- **AI Assistant**: Available in Dashboard with Assistant view
- **Tooltips**: Hover over icons and buttons for hints

---

*This document is designed to help non-technical users understand and use Olive effectively. For technical documentation, please refer to the README.md file.*


