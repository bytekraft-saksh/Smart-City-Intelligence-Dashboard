import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';
import { cn, getCityColor } from '../utils/helpers';
import { citiesData, metricCategories } from '../data/citiesData';
import { BarChart3, ChevronDown } from 'lucide-react';

const BarCharts = ({ selectedCities }) => {
  const [activeCategory, setActiveCategory] = useState('smart_city');
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedCitiesData = citiesData.filter(city => selectedCities.includes(city.id));
  const category = metricCategories[activeCategory];

  // Prepare data for bar chart
  const chartData = selectedCitiesData.map(city => {
    const data = { name: city.city_name, id: city.id };
    category.metrics.forEach(metric => {
      data[metric.key] = city[metric.key];
    });
    return data;
  });

  // Transform for grouped bar chart
  const groupedData = category.metrics.map(metric => {
    const data = { metric: metric.label, key: metric.key };
    selectedCitiesData.forEach((city, index) => {
      data[city.city_name] = city[metric.key];
      data[`${city.city_name}_color`] = getCityColor(index);
    });
    return data;
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl p-4 shadow-2xl">
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-300 text-sm">{entry.name}:</span>
              <span className="text-white font-semibold">{entry.value}
                {!entry.payload.key?.includes('aqi') && 
                 !entry.payload.key?.includes('emission') && 
                 !entry.payload.key?.includes('congestion') && 
                 !entry.payload.key?.includes('commute') && 
                 !entry.payload.key?.includes('cost') && '/100'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn(
        'rounded-2xl',
        'bg-slate-900/50 backdrop-blur-sm',
        'border border-slate-800',
        'p-6'
      )}
    >
      {/* Header with Category Selector */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/20">
            <BarChart3 className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Category Analysis</h3>
            <p className="text-sm text-slate-400">Compare metrics by category</p>
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDropdown(!showDropdown)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl',
              'bg-slate-800 border border-slate-700',
              'hover:border-slate-600 transition-all'
            )}
          >
            <span className="text-sm font-medium text-white">
              {category.label}
            </span>
            <ChevronDown className={cn(
              'w-4 h-4 text-slate-400 transition-transform',
              showDropdown && 'rotate-180'
            )} />
          </motion.button>

          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'absolute right-0 top-full mt-2 w-56',
                'bg-slate-900 border border-slate-700 rounded-xl',
                'shadow-2xl z-50 overflow-hidden'
              )}
            >
              {Object.entries(metricCategories).map(([key, cat]) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveCategory(key);
                    setShowDropdown(false);
                  }}
                  className={cn(
                    'w-full text-left px-4 py-3 text-sm',
                    'hover:bg-slate-800 transition-colors',
                    activeCategory === key ? 'bg-blue-500/20 text-blue-400' : 'text-slate-300'
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={groupedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="metric" 
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              tick={{ fill: '#64748b', fontSize: 11 }}
              domain={[0, 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
            />
            {selectedCitiesData.map((city, index) => (
              <Bar
                key={city.id}
                dataKey={city.city_name}
                fill={getCityColor(index)}
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Metrics Legend */}
      <div className="mt-4 pt-4 border-t border-slate-800">
        <p className="text-xs text-slate-400 mb-2">Metrics in this category:</p>
        <div className="flex flex-wrap gap-2">
          {category.metrics.map((metric) => (
            <span
              key={metric.key}
              className="px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-300"
            >
              {metric.label}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BarCharts;
