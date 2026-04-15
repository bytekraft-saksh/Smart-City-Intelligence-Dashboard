import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import KPIGrid from './components/KPIcards';
import RadarChart from './components/RadarChart';
import BarCharts from './components/BarCharts';
import RankingTable from './components/RankingTable';
import CityMap from './components/CityMap';
import InsightsPanel from './components/InsightsPanel';
import { cn } from './utils/helpers';
import { Sparkles, BarChart3, Map, Trophy, Lightbulb } from 'lucide-react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedCities, setSelectedCities] = useState(['mumbai', 'zurich', 'singapore', 'new_york']);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleCityToggle = (cityId) => {
    if (selectedCities.includes(cityId)) {
      if (cityId !== 'mumbai') {
        setSelectedCities(prev => prev.filter(id => id !== cityId));
      }
    } else {
      if (selectedCities.length < 6) {
        setSelectedCities(prev => [...prev, cityId]);
      }
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Welcome Banner */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'rounded-2xl p-6',
                'bg-gradient-to-r from-blue-600/20 via-violet-600/20 to-purple-600/20',
                'border border-blue-500/20'
              )}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/20">
                  <Sparkles className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Smart City Intelligence Dashboard
                  </h1>
                  <p className="text-slate-400 mt-1">
                    Compare Mumbai with top global smart cities across 40+ metrics
                  </p>
                </div>
              </div>
            </motion.div>

            {/* KPI Grid */}
            <KPIGrid selectedCities={selectedCities} />

            {/* Main Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RadarChart selectedCities={selectedCities} />
              <BarCharts selectedCities={selectedCities} />
            </div>

            {/* Insights & Map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InsightsPanel selectedCities={selectedCities} />
              <CityMap selectedCities={selectedCities} />
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-blue-500/20">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
            </div>
            <RadarChart selectedCities={selectedCities} />
            <BarCharts selectedCities={selectedCities} />
            <InsightsPanel selectedCities={selectedCities} />
          </div>
        );

      case 'map':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-emerald-500/20">
                <Map className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Global Map View</h2>
            </div>
            <CityMap selectedCities={selectedCities} />
          </div>
        );

      case 'rankings':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-amber-500/20">
                <Trophy className="w-6 h-6 text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">City Rankings</h2>
            </div>
            <RankingTable selectedCities={selectedCities} />
          </div>
        );

      case 'insights':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-violet-500/20">
                <Lightbulb className="w-6 h-6 text-violet-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">AI Insights</h2>
            </div>
            <InsightsPanel selectedCities={selectedCities} />
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-slate-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-blue-500/30">
            <Sparkles className="w-10 h-10 text-white animate-pulse" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Smart City Dashboard</h2>
          <p className="text-slate-400">Loading global city data...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Navbar */}
      <Navbar 
        sidebarOpen={sidebarOpen}
        selectedCities={selectedCities}
        onCityToggle={handleCityToggle}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content */}
      <main 
        className="transition-all duration-300 pt-20"
        style={{ marginLeft: sidebarOpen ? '260px' : '80px' }}
      >
        <div className="p-6 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default App;
