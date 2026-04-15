import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn, getScoreColor, getScoreBgColor, formatNumber, getAQIColor } from '../utils/helpers';
import { citiesData, metricCategories } from '../data/citiesData';
import { Trophy, ArrowUp, ArrowDown, Minus, ChevronLeft, ChevronRight, Search } from 'lucide-react';

const RankingTable = ({ selectedCities }) => {
  const [selectedMetric, setSelectedMetric] = useState('smart_governance_score');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Get all metrics from categories
  const allMetrics = Object.values(metricCategories).flatMap(cat => 
    cat.metrics.map(m => ({ ...m, category: cat.label }))
  );

  const selectedMetricData = allMetrics.find(m => m.key === selectedMetric);
  const lowerIsBetter = selectedMetricData?.lowerIsBetter || false;

  // Sort cities
  const sortedCities = [...citiesData].sort((a, b) => {
    if (lowerIsBetter) {
      return sortOrder === 'desc' ? a[selectedMetric] - b[selectedMetric] : b[selectedMetric] - a[selectedMetric];
    }
    return sortOrder === 'desc' ? b[selectedMetric] - a[selectedMetric] : a[selectedMetric] - b[selectedMetric];
  });

  // Filter by search
  const filteredCities = sortedCities.filter(city => 
    city.city_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredCities.length / itemsPerPage);
  const paginatedCities = filteredCities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <span className="text-slate-300 font-bold">2</span>;
    if (rank === 3) return <span className="text-amber-600 font-bold">3</span>;
    return <span className="text-slate-500">{rank}</span>;
  };

  const getTrendIcon = (currentRank, previousRank) => {
    if (currentRank < previousRank) return <ArrowUp className="w-4 h-4 text-emerald-400" />;
    if (currentRank > previousRank) return <ArrowDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-slate-500" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'rounded-2xl',
        'bg-slate-900/50 backdrop-blur-sm',
        'border border-slate-800',
        'overflow-hidden'
      )}
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">City Rankings</h3>
              <p className="text-sm text-slate-400">Ranked by {selectedMetricData?.label}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className={cn(
                  'pl-9 pr-4 py-2 rounded-xl text-sm',
                  'bg-slate-800 border border-slate-700',
                  'text-white placeholder-slate-500',
                  'focus:outline-none focus:border-blue-500/50'
                )}
              />
            </div>

            {/* Metric Selector */}
            <select
              value={selectedMetric}
              onChange={(e) => {
                setSelectedMetric(e.target.value);
                setCurrentPage(1);
              }}
              className={cn(
                'px-4 py-2 rounded-xl text-sm',
                'bg-slate-800 border border-slate-700',
                'text-white',
                'focus:outline-none focus:border-blue-500/50',
                'cursor-pointer'
              )}
            >
              {Object.entries(metricCategories).map(([catKey, cat]) => (
                <optgroup key={catKey} label={cat.label}>
                  {cat.metrics.map(metric => (
                    <option key={metric.key} value={metric.key}>
                      {metric.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>

            {/* Sort Toggle */}
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium',
                'bg-slate-800 border border-slate-700',
                'hover:bg-slate-700 transition-colors',
                'flex items-center gap-2'
              )}
            >
              {sortOrder === 'desc' ? (
                <><ArrowDown className="w-4 h-4" /> Highest</>
              ) : (
                <><ArrowUp className="w-4 h-4" /> Lowest</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-800/50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {selectedMetricData?.label}
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {paginatedCities.map((city, index) => {
              const actualRank = (currentPage - 1) * itemsPerPage + index + 1;
              const value = city[selectedMetric];
              const isSelected = selectedCities.includes(city.id);
              const isMumbai = city.id === 'mumbai';

              return (
                <motion.tr
                  key={city.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    'hover:bg-slate-800/30 transition-colors',
                    isMumbai && 'bg-red-500/5'
                  )}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold">
                        {getRankIcon(actualRank)}
                      </span>
                      {actualRank <= 3 && (
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-500">
                            {actualRank === 1 ? 'Top' : actualRank === 2 ? 'Runner-up' : 'Third'}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center font-bold',
                        isMumbai ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-300'
                      )}>
                        {city.city_name.charAt(0)}
                      </div>
                      <div>
                        <p className={cn(
                          'font-medium',
                          isMumbai ? 'text-red-400' : 'text-white'
                        )}>
                          {city.city_name}
                        </p>
                        {isMumbai && (
                          <span className="text-xs text-red-400/70">Primary Focus</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-300">{city.country}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        'text-2xl font-bold',
                        selectedMetric.includes('aqi') ? getAQIColor(value).text : getScoreColor(value)
                      )}>
                        {value}
                      </span>
                      {selectedMetric.includes('score') && (
                        <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              'h-full rounded-full',
                              getScoreBgColor(value)
                            )}
                            style={{ width: `${Math.min(value, 100)}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      'px-3 py-1 rounded-full text-xs font-medium',
                      actualRank <= 3 ? 'bg-emerald-500/20 text-emerald-400' :
                      actualRank <= 6 ? 'bg-blue-500/20 text-blue-400' :
                      'bg-slate-700 text-slate-400'
                    )}>
                      {actualRank <= 3 ? 'Leader' : actualRank <= 6 ? 'Strong' : 'Developing'}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between">
        <span className="text-sm text-slate-400">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredCities.length)} of {filteredCities.length} cities
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-slate-800 disabled:opacity-50 text-slate-400"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-slate-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-slate-800 disabled:opacity-50 text-slate-400"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RankingTable;
