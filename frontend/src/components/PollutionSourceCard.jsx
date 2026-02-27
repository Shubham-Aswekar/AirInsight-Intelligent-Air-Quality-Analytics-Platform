import React from 'react';
import { Factory, Car, Wind, Cpu } from 'lucide-react';
import { getPollutionSource } from '../utils/health';
import { cn } from '../utils/cn';

export default function PollutionSourceCard({ data, className }) {
    const { source, type, iconColor } = getPollutionSource(data);

    const renderIcon = () => {
        switch (type) {
            case 'traffic': return <Car size={32} className={iconColor} />;
            case 'factory': return <Factory size={32} className={iconColor} />;
            case 'dust': return <Wind size={32} className={iconColor} />;
            case 'vehicle': return <Car size={32} className={iconColor} />;
            default: return <Cpu size={32} className={iconColor} />;
        }
    };

    return (
        <div className={cn("glass-card p-6 flex items-center gap-6", className)}>
            <div className="flex-shrink-0 p-4 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                {renderIcon()}
            </div>
            <div>
                <h3 className="text-slate-500 dark:text-slate-400 font-semibold mb-1 text-sm uppercase tracking-wider">Major Pollution Source</h3>
                <div className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                    {source}
                </div>
                {data && (
                    <p className="text-xs text-slate-400 mt-2">
                        Computed from live {type === 'mixed' ? 'pollutant averages' : 'high constituent levels'}
                    </p>
                )}
            </div>
        </div>
    );
}
