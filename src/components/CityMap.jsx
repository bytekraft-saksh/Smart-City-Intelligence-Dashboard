import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cn, formatNumber, getScoreColor } from '../utils/helpers';
import { citiesData } from '../data/citiesData';
import { MapPin, X, ExternalLink } from 'lucide-react';

// Fix Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (color, isMumbai = false) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${isMumbai ? '40px' : '32px'};
        height: ${isMumbai ? '40px' : '32px'};
        background: ${color};
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 14px ${color}80;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
        font-size: ${isMumbai ? '14px' : '12px'};
      ">${isMumbai ? 'M' : '●'}</div>
    `,
    iconSize: [isMumbai ? 40 : 32, isMumbai ? 40 : 32],
    iconAnchor: [isMumbai ? 20 : 16, isMumbai ? 20 : 16],
  });
};

// Map bounds component
const MapBounds = ({ selectedCities }) => {
  const map = useMap();
  
  useEffect(() => {
    const selectedCitiesData = citiesData.filter(c => selectedCities.includes(c.id));
    if (selectedCitiesData.length > 0) {
      const bounds = L.latLngBounds(selectedCitiesData.map(c => c.coordinates));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 5 });
    }
  }, [map, selectedCities]);
  
  return null;
};

const CityMap = ({ selectedCities }) => {
  const [selectedCity, setSelectedCity] = useState(null);

  const getCityColor = (index, isMumbai) => {
    if (isMumbai) return '#ef4444';
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316', '#6366f1', '#84cc16', '#14b8a6'];
    return colors[index % colors.length];
  };

  const selectedCitiesData = citiesData.filter(city => selectedCities.includes(city.id));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'rounded-2xl overflow-hidden',
        'bg-slate-900/50 backdrop-blur-sm',
        'border border-slate-800'
      )}
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20">
              <MapPin className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Global City Map</h3>
              <p className="text-sm text-slate-400">Geographic distribution of smart cities</p>
            </div>
          </div>
          
          {/* Legend */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-white shadow-lg" />
              <span className="text-xs text-slate-400">Mumbai (Focus)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white" />
              <span className="text-xs text-slate-400">Comparison Cities</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-96 relative">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%', background: '#0f172a' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <MapBounds selectedCities={selectedCities} />
          
          {selectedCitiesData.map((city, index) => {
            const isMumbai = city.id === 'mumbai';
            const color = getCityColor(index, isMumbai);
            
            return (
              <Marker
                key={city.id}
                position={city.coordinates}
                icon={createCustomIcon(color, isMumbai)}
                eventHandlers={{
                  click: () => setSelectedCity(city),
                }}
              >
                <Popup className="custom-popup">
                  <div className="p-2 min-w-[200px]">
                    <h4 className="font-bold text-slate-900">{city.city_name}</h4>
                    <p className="text-sm text-slate-600">{city.country}</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-xs">
                        <span className="text-slate-500">Population:</span>{' '}
                        <span className="font-medium">{formatNumber(city.population)}</span>
                      </p>
                      <p className="text-xs">
                        <span className="text-slate-500">Smart Score:</span>{' '}
                        <span className={getScoreColor(city.smart_governance_score)}>
                          {city.smart_governance_score}/100
                        </span>
                      </p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* City Info Panel */}
        {selectedCity && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-4 right-4 w-72 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl p-5 shadow-2xl z-[1000]"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-white">{selectedCity.city_name}</h4>
                <p className="text-sm text-slate-400">{selectedCity.country}</p>
              </div>
              <button
                onClick={() => setSelectedCity(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-sm text-slate-400">Population</span>
                <span className="text-sm font-medium text-white">
                  {formatNumber(selectedCity.population)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-sm text-slate-400">Area</span>
                <span className="text-sm font-medium text-white">
                  {selectedCity.area} km²
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-sm text-slate-400">GDP/Capita</span>
                <span className="text-sm font-medium text-white">
                  ${selectedCity.gdp_per_capita.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-sm text-slate-400">Smart Score</span>
                <span className={cn(
                  'text-sm font-medium',
                  getScoreColor(selectedCity.smart_governance_score)
                )}>
                  {selectedCity.smart_governance_score}/100
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-sm text-slate-400">Sustainability</span>
                <span className={cn(
                  'text-sm font-medium',
                  getScoreColor(selectedCity.sustainability_score)
                )}>
                  {selectedCity.sustainability_score}/100
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-slate-400">Transport</span>
                <span className={cn(
                  'text-sm font-medium',
                  getScoreColor(selectedCity.public_transport_score)
                )}>
                  {selectedCity.public_transport_score}/100
                </span>
              </div>
            </div>

            <button className="mt-4 w-full py-2 rounded-xl bg-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2">
              <ExternalLink className="w-4 h-4" />
              View Full Profile
            </button>
          </motion.div>
        )}
      </div>

      {/* Bottom Stats */}
      <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-xs text-slate-500 block">Selected Cities</span>
              <span className="text-lg font-semibold text-white">{selectedCities.length}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Continents</span>
              <span className="text-lg font-semibold text-white">
                {new Set(selectedCitiesData.map(c => {
                  if (c.country === 'India' || c.country === 'Singapore' || c.country === 'China') return 'Asia';
                  if (c.country === 'USA') return 'North America';
                  if (['UK', 'Spain', 'France', 'Netherlands'].includes(c.country)) return 'Europe';
                  if (['Switzerland', 'Norway', 'Denmark'].includes(c.country)) return 'Europe';
                  return 'Other';
                })).size}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Total Population</span>
              <span className="text-lg font-semibold text-white">
                {formatNumber(selectedCitiesData.reduce((sum, c) => sum + c.population, 0))}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Map data:</span>
            <span className="text-xs text-slate-400">CARTO</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CityMap;
