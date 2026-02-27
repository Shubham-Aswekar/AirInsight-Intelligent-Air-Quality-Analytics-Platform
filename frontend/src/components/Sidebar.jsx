import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Activity, TrendingUp, MapPin, Play, Wind, AlertTriangle, Loader2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { cn } from '../utils/cn';
import { fetchTopPolluted } from '../services/api';
import { getHealthAdvisory, getPollutionSource } from '../utils/health';

const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/prediction', label: 'Prediction', icon: Activity },
    { path: '/trends', label: 'Trends', icon: TrendingUp },
    { path: '/map', label: 'Map View', icon: MapPin },
];

function SidebarTopPolluted() {
    const [regions, setRegions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        fetchTopPolluted().then(res => {
            if (isMounted) {
                const dataArray = Array.isArray(res.data) ? res.data : [res.data];
                const filtered = dataArray.filter(r => r && r.aqi >= 301).slice(0, 3);
                setRegions(filtered);
            }
        }).catch(console.error).finally(() => {
            if (isMounted) setLoading(false);
        });
        return () => { isMounted = false; };
    }, []);

    if (loading) return <div className="py-4 text-center border-t border-slate-200 dark:border-slate-800"><Loader2 className="animate-spin mx-auto text-slate-400" size={16} /></div>;
    if (regions.length === 0) return null;

    return (
        <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-800 bg-red-50/50 dark:bg-red-900/10 flex-shrink-0">
            <h4 className="text-[10px] uppercase font-bold tracking-wider text-rose-500 mb-3 flex items-center gap-1.5">
                <AlertTriangle size={12} /> Critical Regions
            </h4>
            <div className="space-y-3">
                {regions.map((region, i) => {
                    const advisory = getHealthAdvisory(region.aqi);
                    const sourceInfo = getPollutionSource(region);
                    return (
                        <div key={i} className="bg-white/80 dark:bg-slate-800/80 rounded-lg p-2.5 border border-red-100 dark:border-red-900/30 shadow-sm backdrop-blur-sm">
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-slate-800 dark:text-slate-100 text-xs truncate pr-2">{region.region || region.region_name || 'Unknown'}</span>
                                <span className="font-black text-rose-600 dark:text-rose-400 text-xs">{Math.round(region.aqi)}</span>
                            </div>
                            <div className="text-[10px] font-medium text-slate-500 mb-1.5 line-clamp-1 border-b border-slate-100 dark:border-slate-700/50 pb-1.5">
                                Source: <span className="text-slate-700 dark:text-slate-300">{sourceInfo.source}</span>
                            </div>
                            <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-tight">
                                {advisory?.advice || 'Avoid outdoor exposure.'}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function Sidebar() {
    const { sidebarOpen, isAuthenticated } = useAppContext();

    return (
        <div className={cn(
            "fixed left-0 top-0 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-xl z-50 transition-all duration-300 flex flex-col",
            sidebarOpen ? "w-64" : "w-20 hidden md:flex"
        )}>
            <div className="h-16 flex items-center justify-center border-b border-slate-200 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-500">
                    <Wind size={28} className="animate-pulse" />
                    {sidebarOpen && <span className="font-bold text-xl tracking-tight leading-none">AirInsight</span>}
                </div>
            </div>

            <nav className="flex-1 py-6 px-3 flex flex-col gap-2 overflow-y-auto">
                {(isAuthenticated ? [...navItems, { path: '/simulator', label: 'Simulator', icon: Play }] : navItems).map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                                isActive
                                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold shadow-sm"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                            )}
                        >
                            <Icon size={22} className={cn("shrink-0", sidebarOpen ? "" : "mx-auto")} />
                            {sidebarOpen && <span>{item.label}</span>}

                            {!sidebarOpen && (
                                <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-800 text-white text-sm font-medium rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                                    {item.label}
                                </div>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {sidebarOpen && <SidebarTopPolluted />}

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-center text-xs font-medium text-slate-500 shrink-0">
                {sidebarOpen ? 'v1.0.0 Production' : 'v1.0'}
            </div>
        </div>
    );
}
