import React from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { getHealthAdvisory } from '../utils/health';
import { cn } from '../utils/cn';

export default function HealthAdvisoryCard({ aqi, className }) {
    const advisory = getHealthAdvisory(aqi);

    if (!advisory) {
        return (
            <div className={cn("glass-card p-6 flex flex-col justify-center text-center", className)}>
                <AlertCircle size={32} className="mx-auto text-slate-400 mb-3 opacity-50" />
                <h3 className="text-slate-500 font-semibold mb-1">Health Advisory</h3>
                <p className="text-sm text-slate-400">Waiting for AQI data...</p>
            </div>
        );
    }

    return (
        <div className={cn("glass-card p-6 border-l-4", advisory.border, advisory.bg, className)}>
            <div className="flex items-center gap-3 mb-3">
                <ShieldCheck size={28} className={advisory.color} />
                <div>
                    <h3 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-0.5">Health Advisory</h3>
                    <h4 className={cn("text-lg font-black", advisory.color)}>
                        {advisory.level}
                    </h4>
                </div>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 opacity-90 leading-snug">
                {advisory.advice}
            </p>
        </div>
    );
}
