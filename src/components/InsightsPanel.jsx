import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Zap,
  ArrowRight,
  RefreshCw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { cn } from '../utils/helpers';
import { generateInsights, getTopPerformer, generateCityVsCityInsights } from '../utils/insights';
import { citiesData } from '../data/citiesData';

const InsightsPanel = ({ selectedCities }) => {
  const [insights, setInsights] = useState([]);
  const [comparisons, setComparisons] = useState([]);
  const [expandedInsight, setExpandedInsight] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('mumbai');

  const mumbaiCity = citiesData.find(c => c.id === 'mumbai');
  const comparisonCity = selectedCities.length > 1 
    ? citiesData.find(c => c.id !== 'mumbai' && selectedCities.includes(c.id))
    : citiesData.find(c => c.id === 'zurich');

  useEffect(() => {
    generateInsightsData();
  }, [selectedCities]);

  const generateInsightsData = () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      const newInsights = generateInsights('mumbai');
      setInsights(newInsights);
      
      if (comparisonCity) {
        const newComparisons = generateCityVsCityInsights('mumbai', comparisonCity.id);
        setComparisons(newComparisons);
      }
      
      setIsGenerating(false);
    }, 800);
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Lightbulb className="w-5 h-5 text-blue-400" />;
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-emerald-500/30 bg-emerald-500/5';
      case 'warning':
        return 'border-amber-500/30 bg-amber-500/5';
      case 'critical':
        return 'border-red-500/30 bg-red-500/5';
      default:
        return 'border-blue-500/30 bg-blue-500/5';
    }
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20">
              <Sparkles className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">AI-Generated Insights</h3>
              <p className="text-sm text-slate-400">Smart analysis & recommendations</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-xl">
              <button
                onClick={() => setActiveTab('mumbai')}
                className={cn(
                  'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
                  activeTab === 'mumbai' 
                    ? 'bg-red-500/20 text-red-400' 
                    : 'text-slate-400 hover:text-white'
                )}
              >
                Mumbai Focus
              </button>
              {comparisonCity && (
                <button
                  onClick={() => setActiveTab('comparison')}
                  className={cn(
                    'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
                    activeTab === 'comparison' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  vs {comparisonCity.city_name}
                </button>
              )}
            </div>

            {/* Refresh Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateInsightsData}
              disabled={isGenerating}
              className={cn(
                'p-2.5 rounded-xl',
                'bg-slate-800 border border-slate-700',
                'hover:bg-slate-700 transition-all',
                'text-slate-400 hover:text-white',
                isGenerating && 'animate-pulse'
              )}
            >
              <RefreshCw className={cn('w-4 h-4', isGenerating && 'animate-spin')} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Insights Content */}
      <div className="p-6">
        {activeTab === 'mumbai' ? (
          <div className="space-y-4">
            {isGenerating ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" />
                  <span className="text-slate-400">Generating insights...</span>
                </div>
              </div>
            ) : insights.length > 0 ? (
              <AnimatePresence>
                {insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      'rounded-xl border p-4 cursor-pointer',
                      'transition-all duration-200',
                      getInsightColor(insight.type),
                      expandedInsight === index && 'ring-2 ring-blue-500/30'
                    )}
                    onClick={() => setExpandedInsight(expandedInsight === index ? null : index)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-0.5">
                        {getInsightIcon(insight.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={cn(
                            'text-xs font-semibold uppercase tracking-wider',
                            insight.type === 'success' && 'text-emerald-400',
                            insight.type === 'warning' && 'text-amber-400',
                            insight.type === 'critical' && 'text-red-400',
                            insight.type === 'info' && 'text-blue-400'
                          )}>
                            {insight.category}
                          </span>
                          {expandedInsight === index ? (
                            <ChevronUp className="w-4 h-4 text-slate-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                          )}
                        </div>
                        <p className="text-white font-medium mt-1">{insight.message}</p>
                        
                        <AnimatePresence>
                          {expandedInsight === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 pt-3 border-t border-slate-700/50"
                            >
                              <div className="flex items-start gap-2">
                                <Zap className="w-4 h-4 text-blue-400 mt-0.5" />
                                <div>
                                  <span className="text-xs text-slate-500 uppercase tracking-wider">Recommendation</span>
                                  <p className="text-sm text-slate-300 mt-1">{insight.recommendation}</p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className="text-center py-12">
                <Lightbulb className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">No insights available</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {comparisons.length > 0 ? (
              <>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl font-bold text-red-400">M</span>
                    </div>
                    <span className="text-white font-medium">Mumbai</span>
                  </div>
                  <div className="text-slate-500 font-bold">VS</div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl font-bold text-blue-400">
                        {comparisonCity.city_name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-white font-medium">{comparisonCity.city_name}</span>
                  </div>
                </div>

                {comparisons.map((comparison, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-xl bg-slate-800/50 border border-slate-700 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-300">{comparison.metric}</span>
                      <span className={cn(
                        'text-sm font-bold',
                        comparison.leader === 'Mumbai' ? 'text-emerald-400' : 'text-amber-400'
                      )}>
                        {comparison.leader} leads
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-red-400">Mumbai</span>
                          <span className="text-white font-medium">{comparison.city1Value}</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-red-500 rounded-full"
                            style={{ width: `${comparison.city1Value}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-blue-400">{comparisonCity.city_name}</span>
                          <span className="text-white font-medium">{comparison.city2Value}</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${comparison.city2Value}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      Gap of <span className="text-white font-medium">{comparison.difference} points</span>
                    </p>
                  </motion.div>
                ))}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-400">Select another city to see comparisons</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-400">
                {insights.filter(i => i.type === 'success').length} Strengths
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-slate-400">
                {insights.filter(i => i.type === 'warning').length} Warnings
              </span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-xs text-slate-400">
                {insights.filter(i => i.type === 'critical').length} Critical
              </span>
            </div>
          </div>
          <span className="text-xs text-slate-500">Powered by Smart Analytics</span>
        </div>
      </div>
    </motion.div>
  );
};

export default InsightsPanel;
