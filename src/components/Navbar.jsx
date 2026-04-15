import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Check,
  Building2,
  Globe,
  X
} from 'lucide-react';
import { cn, formatNumber } from '../utils/helpers';
import { citiesData } from '../data/citiesData';

export default function Navbar({ 
  sidebarOpen, 
  selectedCities, 
  onCityToggle,
  searchQuery,
  setSearchQuery
}) {
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const mumbaiSelected = selectedCities.includes('mumbai');

  return (
    <header 
      className={cn(
        'fixed top-0 right-0 h-20 z-40',
        'bg-slate-900/80 backdrop-blur-xl',
        'border-b border-slate-800',
        'flex items-center justify-between px-6',
        'transition-all duration-300',
        sidebarOpen ? 'left-260' : 'left-20'
      )}
      style={{ left: sidebarOpen ? '260px' : '80px' }}
    >
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search metrics, cities, or insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              'w-full pl-12 pr-4 py-2.5 rounded-xl',
              'bg-slate-800/50 border border-slate-700',
              'text-white placeholder-slate-400',
              'focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20',
              'transition-all duration-200'
            )}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* City Selector */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCityDropdown(!showCityDropdown)}
            className={cn(
              'flex items-center gap-3 px-4 py-2.5 rounded-xl',
              'bg-slate-800/50 border border-slate-700',
              'hover:bg-slate-800 hover:border-slate-600',
              'transition-all duration-200'
            )}
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {selectedCities.slice(0, 3).map((cityId, index) => {
                  const city = citiesData.find(c => c.id === cityId);
                  return (
                    <div
                      key={cityId}
                      className={cn(
                        'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 border-slate-800',
                        index === 0 && 'bg-red-500',
                        index === 1 && 'bg-blue-500',
                        index === 2 && 'bg-emerald-500'
                      )}
                    >
                      {city?.city_name.charAt(0)}
                    </div>
                  );
                })}
                {selectedCities.length > 3 && (
                  <div className="w-7 h-7 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold border-2 border-slate-800">
                    +{selectedCities.length - 3}
                  </div>
                )}
              </div>
              <span className="text-sm text-white font-medium">
                {selectedCities.length} Cities
              </span>
            </div>
            <ChevronDown className={cn(
              'w-4 h-4 text-slate-400 transition-transform duration-200',
              showCityDropdown && 'rotate-180'
            )} />
          </motion.button>

          {/* City Dropdown */}
          <AnimatePresence>
            {showCityDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  'absolute right-0 top-full mt-2 w-80',
                  'bg-slate-900/95 backdrop-blur-xl',
                  'border border-slate-700 rounded-2xl',
                  'shadow-2xl shadow-black/50',
                  'overflow-hidden z-50'
                )}
              >
                <div className="p-4 border-b border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Select Cities</span>
                    <button
                      onClick={() => setShowCityDropdown(false)}
                      className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Mumbai is always included as the primary focus
                  </p>
                </div>
                <div className="max-h-80 overflow-y-auto p-2">
                  {citiesData.map((city) => {
                    const isSelected = selectedCities.includes(city.id);
                    const isMumbai = city.id === 'mumbai';
                    
                    return (
                      <motion.button
                        key={city.id}
                        whileHover={{ x: 2 }}
                        onClick={() => !isMumbai && onCityToggle(city.id)}
                        disabled={isMumbai}
                        className={cn(
                          'w-full flex items-center gap-3 p-3 rounded-xl',
                          'transition-all duration-200',
                          isSelected 
                            ? 'bg-blue-500/20 border border-blue-500/30' 
                            : 'hover:bg-slate-800/50',
                          isMumbai && 'opacity-75 cursor-default'
                        )}
                      >
                        <div className={cn(
                          'w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm',
                          isSelected ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'
                        )}>
                          {isSelected ? <Check className="w-5 h-5" /> : city.city_name.charAt(0)}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-white">
                              {city.city_name}
                            </span>
                            {isMumbai && (
                              <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs">
                                Primary
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-400">{city.country}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-slate-400">Pop</span>
                          <p className="text-xs font-medium text-white">
                            {formatNumber(city.population)}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNotifications(!showNotifications)}
            className={cn(
              'relative p-2.5 rounded-xl',
              'bg-slate-800/50 border border-slate-700',
              'hover:bg-slate-800 hover:border-slate-600',
              'text-slate-400 hover:text-white',
              'transition-all duration-200'
            )}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
          </motion.button>
        </div>

        {/* Global Stats */}
        <div className="hidden md:flex items-center gap-4 px-4 py-2 rounded-xl bg-slate-800/30 border border-slate-800">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-slate-400">Cities</span>
            <span className="text-sm font-semibold text-white">11</span>
          </div>
          <div className="w-px h-4 bg-slate-700" />
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-400">Continents</span>
            <span className="text-sm font-semibold text-white">5</span>
          </div>
        </div>
      </div>
    </header>
  );
}
