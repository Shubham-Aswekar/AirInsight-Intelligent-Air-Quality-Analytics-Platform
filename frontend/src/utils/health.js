export const getHealthAdvisory = (aqi) => {
    if (aqi === null || aqi === undefined) return null;

    if (aqi <= 50) return { level: 'Low', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20', advice: 'Air quality is good. Safe for outdoor activities' };
    if (aqi <= 100) return { level: 'Mild', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', advice: 'Sensitive individuals should take precautions' };
    if (aqi <= 200) return { level: 'Moderate', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20', advice: 'Limit prolonged outdoor activity' };
    if (aqi <= 300) return { level: 'High', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', advice: 'Wear mask and avoid outdoor exercise' };
    if (aqi <= 400) return { level: 'Very High', color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20', advice: 'Stay indoors, keep windows closed' };

    return { level: 'Emergency', color: 'text-rose-700', bg: 'bg-rose-700/10', border: 'border-rose-700/20', advice: 'Health emergency. Avoid going outside' };
};

export const getAQIColor = (aqi) => {
    if (aqi === null || aqi === undefined) return 'text-slate-500 bg-slate-500/10 border-slate-500/30 shadow-slate-500/20';
    if (aqi <= 50) return 'text-green-500 bg-green-500/10 border-green-500/30 shadow-green-500/20';
    if (aqi <= 100) return 'text-lime-500 bg-lime-500/10 border-lime-500/30 shadow-lime-500/20';
    if (aqi <= 200) return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30 shadow-yellow-500/20';
    if (aqi <= 300) return 'text-orange-500 bg-orange-500/10 border-orange-500/30 shadow-orange-500/20';
    if (aqi <= 400) return 'text-red-500 bg-red-500/10 border-red-500/30 shadow-red-500/20';
    return 'text-rose-700 bg-rose-700/10 border-rose-700/30 shadow-rose-700/20';
};

export const getPollutionSource = (data) => {
    if (!data) return { source: 'Unknown Data', type: 'mixed', iconColor: 'text-slate-500' };

    // Calculate the ratio of each pollutant to its high threshold
    const factors = [
        { type: 'dust', source: 'Dust & Construction', iconColor: 'text-yellow-600', ratio: (data.PM10 || 0) / 150 },
        { type: 'vehicle', source: 'Vehicle & Biomass', iconColor: 'text-purple-500', ratio: (data.PM2_5 || 0) / 60 },
        { type: 'traffic', source: 'Traffic Emissions', iconColor: 'text-orange-500', ratio: (data.NO2 || 0) / 50 },
        { type: 'factory', source: 'Industrial Emissions', iconColor: 'text-red-500', ratio: (data.SO2 || 0) / 30 },
    ];

    // Sort by whichever exceeds its threshold the most
    factors.sort((a, b) => b.ratio - a.ratio);

    if (factors[0].ratio >= 1.0) {
        return { source: factors[0].source, type: factors[0].type, iconColor: factors[0].iconColor };
    }

    return { source: 'Mixed Sources', type: 'mixed', iconColor: 'text-blue-500' };
};
