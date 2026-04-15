import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Wind, 
  Train,
  Zap,
  Leaf,
  DollarSign,
  Activity,
  Award,
  Globe,
  Building
} from 'lucide-react';
import { cn, formatNumber, formatCurrency, getAQIColor, getScoreColor } from '../utils/helpers';
import { citiesData } from '../data/citiesData';

const KPIGrid = ({ selectedCities }) => {
  const cities = citiesData.filter(c => selectedCities.includes(c.id));
  const primaryCity = cities.find(c => c.id === 'mumbai') || cities[0];
  
  const kpiData = [
    {
      id: 'population',
      title: 'Population',
      value: formatNumber(primaryCity.population),
      subtitle: 'Total residents',
      icon: Users,
      color: 'blue',
      trend: '+2.4%',
      trendUp: true
    },
    {
      id: 'gdp',
      title: 'GDP Per Capita',
      value: formatCurrency(primaryCity.gdp_per_capita),
      subtitle: 'Economic indicator',
      icon: DollarSign,
      color: 'emerald',
      trend: '+5.2%',
      trendUp: true
    },
    {
      id: 'aqi',
      title: 'Air Quality Index',
      value: primaryCity.air_quality_index,
      subtitle: getAQIColor(primaryCity.air_quality_index).label,
      icon: Wind,
      color: primaryCity.air_quality_index > 100 ? 'red' : primaryCity.air_quality_index > 50 ? 'yellow' : 'emerald',
      trend: primaryCity.air_quality_index > 100 ? 'Poor' : 'Good',
      trendUp: primaryCity.air_quality_index <= 100,
      isAQI: true
    },
    {
      id: 'transport',
      title: 'Transport Score',
      value: primaryCity.public_transport_score,
      subtitle: 'Out of 100',
      icon: Train,
      color: 'violet',
      suffix: '/100',
      trend: primaryCity.public_transport_score > 80 ? 'Excellent' : 'Improving',
      trendUp: primaryCity.public_transport_score > 70
    },
    {
      id: 'energy',
      title: 'Renewable Energy',
      value: primaryCity.renewable_energy_usage,
      subtitle: '% of total energy',
      icon: Zap,
      color: 'amber',
      suffix: '%',
      trend: primaryCity.renewable_energy_usage > 50 ? 'High' : 'Growing',
      trendUp: primaryCity.renewable_energy_usage > 30
    },
    {
      id: 'green',
      title: 'Green Space',
      value: primaryCity.green_space_per_capita,
      subtitle: 'm² per capita',
      icon: Leaf,
      color: 'green',
      trend: primaryCity.green_space_per_capita > 100 ? 'Excellent' : 'Developing',
      trendUp: primaryCity.green_space_per_capita > 50
    },
    {
      id: 'safety',
      title: 'Safety Index',
      value: primaryCity.safety_index,
      subtitle: 'Out of 100',
      icon: ShieldIcon,
      color: primaryCity.safety_index > 80 ? 'emerald' : primaryCity.safety_index > 60 ? 'yellow' : 'orange',
      suffix: '/100',
      trend: primaryCity.safety_index > 85 ? 'Very Safe' : 'Moderate',
      trendUp: primaryCity.safety_index > 70
    },
    {
      id: 'digital',
      title: 'Digital Score',
      value: primaryCity.digital_infrastructure_score,
      subtitle: 'Infrastructure rating',
      icon: Globe,
      color: 'cyan',
      suffix: '/100',
      trend: primaryCity.digital_infrastructure_score > 80 ? 'Advanced' : 'Developing',
      trendUp: primaryCity.digital_infrastructure_score > 70
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiData.map((kpi, index) => (
        <KPICard key={kpi.id} data={kpi} index={index} />
      ))}
    </div>
  );
};

const KPICard = ({ data, index }) => {
  const Icon = data.icon;
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/20',
    emerald: 'from-emerald-500/20 to-emerald-600/10 text-emerald-400 border-emerald-500/20',
    green: 'from-green-500/20 to-green-600/10 text-green-400 border-green-500/20',
    violet: 'from-violet-500/20 to-violet-600/10 text-violet-400 border-violet-500/20',
    amber: 'from-amber-500/20 to-amber-600/10 text-amber-400 border-amber-500/20',
    red: 'from-red-500/20 to-red-600/10 text-red-400 border-red-500/20',
    yellow: 'from-yellow-500/20 to-yellow-600/10 text-yellow-400 border-yellow-500/20',
    orange: 'from-orange-500/20 to-orange-600/10 text-orange-400 border-orange-500/20',
    cyan: 'from-cyan-500/20 to-cyan-600/10 text-cyan-400 border-cyan-500/20'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-gradient-to-br',
        colorClasses[data.color],
        'border backdrop-blur-sm',
        'p-5',
        'transition-all duration-300',
        'hover:shadow-xl hover:shadow-black/20'
      )}
    >
      {/* Background Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" />
      
      {/* Header */}
      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            'p-2.5 rounded-xl',
            'bg-slate-900/50 backdrop-blur-sm'
          )}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              {data.title}
            </p>
          </div>
        </div>
        
        {/* Trend Indicator */}
        <div className={cn(
          'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
          data.trendUp 
            ? 'bg-emerald-500/20 text-emerald-400' 
            : 'bg-red-500/20 text-red-400'
        )}>
          {data.trendUp ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span>{data.trend}</span>
        </div>
      </div>

      {/* Value */}
      <div className="relative mt-4">
        <h3 className={cn(
          'text-3xl font-bold tracking-tight',
          data.isAQI ? getAQIColor(data.value).text : 'text-white'
        )}>
          {data.value}
          {data.suffix && (
            <span className="text-lg font-medium text-slate-400 ml-1">
              {data.suffix}
            </span>
          )}
        </h3>
        <p className="text-sm text-slate-400 mt-1">{data.subtitle}</p>
      </div>

      {/* Progress Bar */}
      {!data.isAQI && (
        <div className="relative mt-4">
          <div className="h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((data.value / (data.suffix === '/100' ? 100 : 500)) * 100, 100)}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className={cn(
                'h-full rounded-full',
                'bg-gradient-to-r',
                data.color === 'blue' && 'from-blue-500 to-blue-400',
                data.color === 'emerald' && 'from-emerald-500 to-emerald-400',
                data.color === 'green' && 'from-green-500 to-green-400',
                data.color === 'violet' && 'from-violet-500 to-violet-400',
                data.color === 'amber' && 'from-amber-500 to-amber-400',
                data.color === 'cyan' && 'from-cyan-500 to-cyan-400'
              )}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

const ShieldIcon = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export default KPIGrid;
