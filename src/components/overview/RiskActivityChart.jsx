import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', critical: 4, high: 12, medium: 28 },
  { time: '04:00', critical: 6, high: 18, medium: 32 },
  { time: '08:00', critical: 15, high: 35, medium: 54 },
  { time: '12:00', critical: 24, high: 58, medium: 89 },
  { time: '16:00', critical: 18, high: 42, medium: 76 },
  { time: '20:00', critical: 31, high: 64, medium: 95 },
  { time: '24:00', critical: 28, high: 52, medium: 84 },
];

export default function RiskActivityChart() {
  return (
    <div className="p-5 rounded-xl bg-dark-800 border border-dark-700 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-200">Suspicious Transaction Velocity</h3>
          <p className="text-xs text-gray-400">24-hour flagged threat volume distribution</p>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-red-400">
            <span className="w-2 h-2 rounded-full bg-red-500" /> Critical
          </span>
          <span className="flex items-center gap-1.5 text-orange-400">
            <span className="w-2 h-2 rounded-full bg-orange-500" /> High
          </span>
          <span className="flex items-center gap-1.5 text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Medium
          </span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#4B5563" fontSize={11} tickLine={false} />
            <YAxis stroke="#4B5563" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', fontSize: '12px' }}
              labelStyle={{ color: '#9CA3AF', fontWeight: 'bold' }}
            />
            <Area type="monotone" dataKey="critical" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorCritical)" />
            <Area type="monotone" dataKey="high" stroke="#F97316" strokeWidth={2} fillOpacity={1} fill="url(#colorHigh)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
