# Smart City Dashboard

A premium-quality interactive dashboard web application that compares Mumbai with top global smart cities across multiple dimensions.

![Dashboard Preview](https://via.placeholder.com/800x400/0f172a/3b82f6?text=Smart+City+Dashboard)

## Features

### Dashboard Components
- **City Selector**: Compare Mumbai with 1 or multiple cities from 10 global smart cities
- **KPI Cards**: Real-time display of key metrics (GDP, AQI, Transport Score, etc.)
- **Radar Chart**: Multi-dimensional smart city comparison visualization
- **Bar Charts**: Category-wise metric comparison
- **Ranking Table**: Sortable rankings for all cities per metric
- **World Map**: Interactive map with city markers and details
- **AI Insights Panel**: Auto-generated insights and recommendations

### Cities Compared
1. **Mumbai** (Primary Focus) - India
2. **Zurich** - Switzerland
3. **Oslo** - Norway
4. **Copenhagen** - Denmark
5. **Singapore**
6. **Barcelona** - Spain
7. **Amsterdam** - Netherlands
8. **New York City** - USA
9. **London** - UK
10. **Paris** - France
11. **Hong Kong** - China

### Metrics Tracked (40+ Metrics)
- Smart City Metrics: Governance, Digital Infrastructure, Transport, Sustainability, Energy, Waste Management, Water Management, Urban Planning, Safety, Healthcare, Education
- Technology: IoT Adoption, AI Integration, Open Data, Internet Penetration
- Environment: Air Quality, Green Space, Carbon Emissions, Renewable Energy
- Mobility: Traffic Congestion, Commute Time, Transport Coverage
- Economy: Startup Ecosystem, Employment, Cost of Living

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Maps**: Leaflet.js + React-Leaflet
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd smart-city-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Project Structure

```
smart-city-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Navbar.jsx
│   │   ├── KPIcards.jsx
│   │   ├── RadarChart.jsx
│   │   ├── BarCharts.jsx
│   │   ├── RankingTable.jsx
│   │   ├── CityMap.jsx
│   │   └── InsightsPanel.jsx
│   ├── data/
│   │   └── citiesData.js
│   ├── utils/
│   │   ├── helpers.js
│   │   └── insights.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Key Features

### 1. Premium UI/UX
- Dark mode theme with glassmorphism effects
- Smooth animations powered by Framer Motion
- Responsive design for desktop, tablet, and mobile
- Clean, modern SaaS dashboard aesthetic

### 2. Interactive Visualizations
- **Radar Chart**: Compare cities across 8 key dimensions
- **Bar Charts**: Category-based metric comparison with dropdown selector
- **World Map**: Interactive Leaflet map with custom markers
- **Ranking Table**: Sortable, searchable rankings with pagination

### 3. AI-Powered Insights
- Auto-generated insights based on data analysis
- Mumbai-focused recommendations
- City-to-city comparison insights
- Strengths, warnings, and critical alerts

### 4. Data Structure
All city data includes:
- General Info (population, area, GDP)
- Smart City Metrics (0-100 scores)
- Technology Indicators
- Environment Metrics
- Mobility Statistics
- Economy & Innovation Scores

## Navigation Sections

1. **Overview**: Complete dashboard with all components
2. **Analytics**: Focused charts and insights
3. **Map**: Full-screen map visualization
4. **Rankings**: Detailed comparison tables
5. **AI Insights**: Smart recommendations

## Customization

### Adding a New City
1. Add city data to `src/data/citiesData.js`
2. Include all required metrics (follow existing structure)
3. Add coordinates for map placement
4. Update color assignment if needed

### Adding New Metrics
1. Add metric to `metricCategories` in `citiesData.js`
2. Add data to each city object
3. Update relevant chart components

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - feel free to use for personal or commercial projects.

## Credits

- Map tiles by CARTO
- Icons by Lucide
- Charts by Recharts
- Animations by Framer Motion
