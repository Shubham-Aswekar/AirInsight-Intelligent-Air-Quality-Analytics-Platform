import React, { useEffect, useState } from 'react';
import { MapPin, AlertTriangle, Loader2 } from 'lucide-react';
import { fetchTopPolluted } from '../services/api';
import { getAQIColor, getHealthAdvisory, getPollutionSource } from '../utils/health';
import { cn } from '../utils/cn';

export default function TopPollutedRegionCard({ className }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        fetchTopPolluted()
            .then(res => {
                if (isMounted) {
                    const top = Array.isArray(res.data) && res.data.length > 0 ? res.data[0] : res.data;
                    setData(top);
                }
            })
            .catch(console.error)
            .finally(() => {
                if (isMounted) setLoading(false);
            });
        return () => { isMounted = false; };
    }, []);

    if (loading) {
        return (
            <div className={cn("glass-card p-6 flex items-center justify-center animate-pulse min-h-[160px]", className)}>
                <Loader2 size={32} className="animate-spin text-slate-400 opacity-50" />
            </div>
        );
    }

    if (!data) {
        return (
            <div className={cn("glass-card p-6 min-h-[160px] flex items-center justify-center text-slate-500", className)}>
                <p>No critical regions detected.</p>
            </div>
        );
    }

    const aqiColorClass = getAQIColor(data.aqi);
    const advisory = getHealthAdvisory(data.aqi);
    const { source } = getPollutionSource(data);
    const isCritical = data.aqi > 200;

    return (
        <div className={cn("glass-card p-6 relative overflow-hidden", isCritical ? "border-red-500/30" : "", className)}>
            {/* Background Hint */}
            <div className={cn("absolute right-0 top-0 w-48 h-48 rounded-bl-full opacity-10 blur-3xl", aqiColorClass.split(' ')[0])}></div>

            <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-2 text-rose-500">
                    <AlertTriangle size={20} className={isCritical ? "animate-pulse" : ""} />
                    <span className="text-xs font-bold uppercase tracking-wider">Most Polluted Region</span>
                </div>
            </div>

            <div className="flex items-center justify-between mb-6 relative z-10">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <MapPin size={24} className="text-slate-400" />
                        {data.region || data.region_name || 'Unknown Region'}
                    </h2>
                    <p className="text-sm font-semibold text-slate-500 mt-1 dark:text-slate-400">
                        Primary Source: <span className="text-slate-700 dark:text-slate-300">{source}</span>
                    </p>
                </div>

                <div className={cn("px-4 py-2 rounded-xl text-center border shadow-sm", aqiColorClass)}>
                    <div className="text-xs font-bold opacity-80 uppercase tracking-widest mb-1">AQI</div>
                    <div className="text-3xl font-black leading-none">{Math.round(data.aqi)}</div>
                </div>
            </div>

            <div className={cn("p-4 rounded-xl border backdrop-blur-sm", advisory?.bg || "bg-slate-50 dark:bg-slate-800/50", advisory?.border || "border-slate-200 dark:border-slate-700")}>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-1">
                    <span className="opacity-70">Impact:</span> <span className={advisory?.color}>{advisory?.level || 'Unknown'}</span>
                </div>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {advisory?.advice}
                </div>
            </div>
        </div>
    );
}
