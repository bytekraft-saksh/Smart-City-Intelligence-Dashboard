import { citiesData } from '../data/citiesData';

export const generateInsights = (selectedCityId = 'mumbai') => {
  const selectedCity = citiesData.find(c => c.id === selectedCityId);
  const insights = [];
  
  if (!selectedCity) return insights;

  // Smart Governance Insights
  const governanceRank = [...citiesData].sort((a, b) => b.smart_governance_score - a.smart_governance_score);
  const governancePosition = governanceRank.findIndex(c => c.id === selectedCityId) + 1;
  const topGovernance = governanceRank[0];
  
  if (selectedCity.smart_governance_score < 70) {
    insights.push({
      type: 'warning',
      category: 'Governance',
      message: `${selectedCity.city_name} ranks #${governancePosition} in smart governance. Significant gap of ${(topGovernance.smart_governance_score - selectedCity.smart_governance_score).toFixed(0)} points behind ${topGovernance.city_name}.`,
      recommendation: 'Invest in digital governance platforms and e-services'
    });
  } else if (selectedCity.smart_governance_score >= 90) {
    insights.push({
      type: 'success',
      category: 'Governance',
      message: `${selectedCity.city_name} demonstrates exceptional smart governance performance, ranking in the top tier globally.`,
      recommendation: 'Maintain leadership through continuous innovation'
    });
  }

  // Sustainability Insights
  const sustainabilityRank = [...citiesData].sort((a, b) => b.sustainability_score - a.sustainability_score);
  const sustainabilityPosition = sustainabilityRank.findIndex(c => c.id === selectedCityId) + 1;
  
  if (selectedCity.sustainability_score < 60) {
    const gap = sustainabilityRank[0].sustainability_score - selectedCity.sustainability_score;
    insights.push({
      type: 'critical',
      category: 'Sustainability',
      message: `${selectedCity.city_name} faces significant sustainability challenges (${selectedCity.sustainability_score}/100), ranking #${sustainabilityPosition} among global smart cities.`,
      recommendation: 'Prioritize green infrastructure and carbon reduction initiatives'
    });
  }

  // Air Quality Analysis
  const aqiCities = [...citiesData].sort((a, b) => a.air_quality_index - b.air_quality_index);
  const bestAQI = aqiCities[0];
  const worstAQI = aqiCities[aqiCities.length - 1];
  
  if (selectedCity.air_quality_index > 100) {
    insights.push({
      type: 'critical',
      category: 'Environment',
      message: `Air quality is a major concern with AQI of ${selectedCity.air_quality_index} - ${(selectedCity.air_quality_index / bestAQI.air_quality_index).toFixed(1)}x worse than ${bestAQI.city_name}.`,
      recommendation: 'Implement aggressive emission control and green mobility programs'
    });
  } else if (selectedCity.air_quality_index < 50) {
    insights.push({
      type: 'success',
      category: 'Environment',
      message: `Excellent air quality (AQI: ${selectedCity.air_quality_index}) - among the best globally.`,
      recommendation: 'Maintain strict environmental standards'
    });
  }

  // Transport Analysis
  if (selectedCity.public_transport_score > 90 && selectedCity.traffic_congestion_index < 40) {
    insights.push({
      type: 'success',
      category: 'Mobility',
      message: `World-class mobility infrastructure with ${selectedCity.public_transport_score}% transport coverage and low congestion.`,
      recommendation: 'Model for other cities to follow'
    });
  } else if (selectedCity.traffic_congestion_index > 60) {
    insights.push({
      type: 'warning',
      category: 'Mobility',
      message: `High traffic congestion (${selectedCity.traffic_congestion_index}/100) with ${selectedCity.average_commute_time}min average commute time.`,
      recommendation: 'Expand metro networks and implement smart traffic management'
    });
  }

  // Digital Infrastructure
  const digitalRank = [...citiesData].sort((a, b) => b.digital_infrastructure_score - a.digital_infrastructure_score);
  const digitalPosition = digitalRank.findIndex(c => c.id === selectedCityId) + 1;
  
  if (selectedCity.digital_infrastructure_score < 70) {
    insights.push({
      type: 'warning',
      category: 'Digital',
      message: `Digital infrastructure gap: ${selectedCity.digital_infrastructure_score}/100, ranking #${digitalPosition} globally.`,
      recommendation: 'Accelerate 5G rollout and smart city sensor deployment'
    });
  }

  // Startup Ecosystem
  if (selectedCity.startup_ecosystem_score > 80) {
    insights.push({
      type: 'success',
      category: 'Innovation',
      message: `Thriving startup ecosystem (${selectedCity.startup_ecosystem_score}/100) driving innovation and employment.`,
      recommendation: 'Expand incubator programs and venture capital access'
    });
  }

  // Renewable Energy
  if (selectedCity.renewable_energy_usage < 25) {
    const bestRenewable = [...citiesData].sort((a, b) => b.renewable_energy_usage - a.renewable_energy_usage)[0];
    insights.push({
      type: 'warning',
      category: 'Energy',
      message: `Low renewable energy adoption (${selectedCity.renewable_energy_usage}%) compared to leaders like ${bestRenewable.city_name} (${bestRenewable.renewable_energy_usage}%).`,
      recommendation: 'Set aggressive renewable energy targets and incentives'
    });
  }

  // Green Space
  if (selectedCity.green_space_per_capita < 50) {
    const bestGreen = [...citiesData].sort((a, b) => b.green_space_per_capita - a.green_space_per_capita)[0];
    insights.push({
      type: 'warning',
      category: 'Livability',
      message: `Limited green space (${selectedCity.green_space_per_capita} m²/capita) vs ${bestGreen.city_name} (${bestGreen.green_space_per_capita} m²/capita).`,
      recommendation: 'Create urban parks and vertical gardens'
    });
  }

  // Cost of Living vs GDP Analysis
  const comparableCities = citiesData.filter(c => 
    Math.abs(c.gdp_per_capita - selectedCity.gdp_per_capita) < 15000 && c.id !== selectedCityId
  );
  
  if (comparableCities.length > 0) {
    const avgCost = comparableCities.reduce((sum, c) => sum + c.cost_of_living_index, 0) / comparableCities.length;
    if (selectedCity.cost_of_living_index > avgCost * 1.2) {
      insights.push({
        type: 'warning',
        category: 'Economy',
        message: `Cost of living (${selectedCity.cost_of_living_index}) is ${((selectedCity.cost_of_living_index / avgCost - 1) * 100).toFixed(0)}% higher than comparable GDP peers.`,
        recommendation: 'Address housing affordability and essential services costs'
      });
    }
  }

  // Safety Analysis
  if (selectedCity.safety_index > 90) {
    insights.push({
      type: 'success',
      category: 'Safety',
      message: `Exceptional safety standards (${selectedCity.safety_index}/100) creating secure urban environment.`,
      recommendation: 'Continue community policing and smart surveillance'
    });
  } else if (selectedCity.safety_index < 70) {
    insights.push({
      type: 'critical',
      category: 'Safety',
      message: `Safety concerns with index of ${selectedCity.safety_index}/100 - below acceptable threshold.`,
      recommendation: 'Enhance law enforcement technology and community programs'
    });
  }

  return insights;
};

export const getTopPerformer = (metricKey, lowerIsBetter = false) => {
  const sorted = [...citiesData].sort((a, b) => {
    return lowerIsBetter ? a[metricKey] - b[metricKey] : b[metricKey] - a[metricKey];
  });
  return sorted[0];
};

export const getComparisonInsight = (city1Id, city2Id, metricKey) => {
  const city1 = citiesData.find(c => c.id === city1Id);
  const city2 = citiesData.find(c => c.id === city2Id);
  
  if (!city1 || !city2) return null;
  
  const diff = city1[metricKey] - city2[metricKey];
  const percentDiff = ((diff / city2[metricKey]) * 100).toFixed(1);
  
  return {
    city1: city1.city_name,
    city2: city2.city_name,
    metric: metricKey,
    difference: Math.abs(diff).toFixed(1),
    percentDifference: Math.abs(percentDiff),
    leader: diff > 0 ? city1.city_name : city2.city_name
  };
};

export const generateCityVsCityInsights = (city1Id, city2Id) => {
  const city1 = citiesData.find(c => c.id === city1Id);
  const city2 = citiesData.find(c => c.id === city2Id);
  
  if (!city1 || !city2) return [];
  
  const comparisons = [];
  const keyMetrics = [
    { key: 'smart_governance_score', label: 'Smart Governance' },
    { key: 'sustainability_score', label: 'Sustainability' },
    { key: 'digital_infrastructure_score', label: 'Digital Infrastructure' },
    { key: 'public_transport_score', label: 'Public Transport' },
    { key: 'startup_ecosystem_score', label: 'Startup Ecosystem' }
  ];
  
  keyMetrics.forEach(({ key, label }) => {
    const val1 = city1[key];
    const val2 = city2[key];
    const diff = val1 - val2;
    
    if (Math.abs(diff) > 10) {
      comparisons.push({
        metric: label,
        leader: diff > 0 ? city1.city_name : city2.city_name,
        difference: Math.abs(diff).toFixed(0),
        city1Value: val1,
        city2Value: val2
      });
    }
  });
  
  return comparisons.sort((a, b) => b.difference - a.difference);
};
