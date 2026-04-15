import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (num, decimals = 0) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(decimals) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(decimals) + 'K';
  }
  return num.toFixed(decimals);
};

export const formatCurrency = (num) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num);
};

export const getScoreColor = (score) => {
  if (score >= 90) return 'text-emerald-400';
  if (score >= 80) return 'text-blue-400';
  if (score >= 70) return 'text-yellow-400';
  if (score >= 60) return 'text-orange-400';
  return 'text-red-400';
};

export const getScoreBgColor = (score) => {
  if (score >= 90) return 'bg-emerald-500';
  if (score >= 80) return 'bg-blue-500';
  if (score >= 70) return 'bg-yellow-500';
  if (score >= 60) return 'bg-orange-500';
  return 'bg-red-500';
};

export const getAQIColor = (aqi) => {
  if (aqi <= 50) return { text: 'text-emerald-400', bg: 'bg-emerald-500', label: 'Good' };
  if (aqi <= 100) return { text: 'text-yellow-400', bg: 'bg-yellow-500', label: 'Moderate' };
  if (aqi <= 150) return { text: 'text-orange-400', bg: 'bg-orange-500', label: 'Unhealthy for Sensitive' };
  if (aqi <= 200) return { text: 'text-red-400', bg: 'bg-red-500', label: 'Unhealthy' };
  if (aqi <= 300) return { text: 'text-purple-400', bg: 'bg-purple-500', label: 'Very Unhealthy' };
  return { text: 'text-rose-400', bg: 'bg-rose-600', label: 'Hazardous' };
};

export const getTrendIcon = (current, previous) => {
  if (current > previous) return 'up';
  if (current < previous) return 'down';
  return 'neutral';
};

export const getCityColor = (index) => {
  const colors = [
    '#ef4444', // Mumbai - Red
    '#3b82f6', // Zurich - Blue
    '#10b981', // Oslo - Emerald
    '#f59e0b', // Copenhagen - Amber
    '#8b5cf6', // Singapore - Violet
    '#ec4899', // Barcelona - Pink
    '#06b6d4', // Amsterdam - Cyan
    '#f97316', // NYC - Orange
    '#6366f1', // London - Indigo
    '#84cc16', // Paris - Lime
    '#14b8a6'  // Hong Kong - Teal
  ];
  return colors[index % colors.length];
};

export const getCityGradient = (index) => {
  const gradients = [
    'from-red-500 to-rose-600',
    'from-blue-500 to-indigo-600',
    'from-emerald-500 to-green-600',
    'from-amber-500 to-yellow-600',
    'from-violet-500 to-purple-600',
    'from-pink-500 to-rose-600',
    'from-cyan-500 to-blue-600',
    'from-orange-500 to-amber-600',
    'from-indigo-500 to-violet-600',
    'from-lime-500 to-green-600',
    'from-teal-500 to-cyan-600'
  ];
  return gradients[index % gradients.length];
};

export const normalizeValue = (value, min, max) => {
  return ((value - min) / (max - min)) * 100;
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
