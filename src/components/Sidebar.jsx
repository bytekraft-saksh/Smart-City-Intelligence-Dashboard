import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BarChart3, 
  Map, 
  Trophy, 
  Lightbulb, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { cn } from '../utils/helpers';

const menuItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'map', label: 'Map View', icon: Map },
  { id: 'rankings', label: 'Rankings', icon: Trophy },
  { id: 'insights', label: 'AI Insights', icon: Lightbulb },
];

export default function Sidebar({ 
  isOpen, 
  setIsOpen, 
  activeSection, 
  setActiveSection 
}) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 260 : 80 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'fixed left-0 top-0 h-screen z-50',
        'bg-slate-900/95 backdrop-blur-xl',
        'border-r border-slate-800',
        'flex flex-col'
      )}
    >
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 border-b border-slate-800">
        <motion.div
          animate={{ scale: isOpen ? 1 : 0.8 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex flex-col"
            >
              <span className="text-lg font-bold text-white">SmartCity</span>
              <span className="text-xs text-slate-400">Global Dashboard</span>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600/20 to-violet-600/20 text-white border border-blue-500/30' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  )}
                >
                  <Icon className={cn(
                    'w-5 h-5 flex-shrink-0',
                    isActive && 'text-blue-400'
                  )} />
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                  {isActive && isOpen && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400"
                    />
                  )}
                </motion.button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Toggle Button */}
      <div className="p-4 border-t border-slate-800">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full flex items-center justify-center gap-2',
            'px-4 py-3 rounded-xl',
            'bg-slate-800/50 hover:bg-slate-800',
            'text-slate-400 hover:text-white',
            'transition-all duration-200'
          )}
        >
          {isOpen ? (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Collapse</span>
            </>
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </motion.button>
      </div>
    </motion.aside>
  );
}
