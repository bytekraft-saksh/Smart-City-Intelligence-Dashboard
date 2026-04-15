import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { cn, getCityColor } from '../utils/helpers';
import { citiesData } from '../data/citiesData';
import { Maximize2, Info } from 'lucide-react';

const RadarComparison = ({ selectedCities }) => {
  const [hoveredMetric, setHoveredMetric] = useState(null);
  
  const metrics = [
    { key: 'smart_governance_score', label: 'Governance' },
    { key: 'digital_infrastructure_score', label: 'Digital Infra' },
    { key: 'public_transport_score', label: 'Transport' },
    { key: 'sustainability_score', label: 'Sustainability' },
    { key: 'energy_efficiency', label: 'Energy' },
    { key: 'safety_index', label: 'Safety' },
    { key: 'healthcare_quality', label: 'Healthcare' },
    { key: 'urban_planning_score', label: 'Planning' }
  ];

  const selectedCitiesData = citiesData.filter(city => selectedCities.includes(city.id));
  
  // Transform data for radar chart
  const chartData = metrics.map(metric => {
    const dataPoint = { metric: metric.label };
    selectedCitiesData.forEach(city => {
      dataPoint[city.city_name] = city[metric.key];
    });
    return dataPoint;
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
              <span className="text-white font-semibold">{entry.value}/100</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'relative rounded-2xl',
        'bg-slate-900/50 backdrop-blur-sm',
        'border border-slate-800',
        'p-6',
        'overflow-hidden'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-violet-500/20">
            <Maximize2 className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Smart City Profile</h3>
            <p className="text-sm text-slate-400">Multi-dimensional comparison</p>
          </div>
        </div>
        <button className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 transition-colors">
          <Info className="w-5 h-5" />
        </button>
      </div>

      {/* Chart Container */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
            <PolarGrid 
              stroke="#334155" 
              strokeDasharray="3 3"
            />
            <PolarAngleAxis 
              dataKey="metric" 
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fill: '#64748b', fontSize: 10 }}
              stroke="#334155"
            />
            {selectedCitiesData.map((city, index) => (
              <Radar
                key={city.id}
                name={city.city_name}
                dataKey={city.city_name}
                stroke={getCityColor(index)}
                fill={getCityColor(index)}
                fillOpacity={city.id === 'mumbai' ? 0.3 : 0.1}
                strokeWidth={city.id === 'mumbai' ? 3 : 2}
              />
            ))}
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value, entry) => (
                <span style={{ color: entry.color, fontSize: '12px' }}>
                  {value}
                </span>
              )}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* City Legend */}
      <div className="mt-4 flex flex-wrap gap-2">
        {selectedCitiesData.map((city, index) => (
          <motion.div
            key={city.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-full',
              'bg-slate-800/50 border border-slate-700',
              city.id === 'mumbai' && 'border-red-500/30 bg-red-500/10'
            )}
          >
            <div 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: getCityColor(index) }}
            />
            <span className={cn(
              'text-xs font-medium',
              city.id === 'mumbai' ? 'text-red-400' : 'text-slate-300'
            )}>
              {city.city_name}
            </span>
            {city.id === 'mumbai' && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400">
                FOCUS
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RadarComparison;
