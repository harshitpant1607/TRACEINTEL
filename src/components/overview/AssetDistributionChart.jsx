import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'USDT', value: 58, color: '#26A17B' },
  { name: 'ETH', value: 24, color: '#627EEA' },
  { name: 'BTC', value: 12, color: '#F7931A' },
  { name: 'USDC', value: 4, color: '#2775CA' },
  { name: 'Other', value: 2, color: '#9CA3AF' },
];

export default function AssetDistributionChart() {
  return (
    <div className="p-5 rounded-xl bg-dark-800 border border-dark-700 shadow-lg flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-semibold text-gray-200">Asset Distribution</h3>
        <p className="text-xs text-gray-400">Illicit flow breakdown by cryptocurrency</p>
      </div>

      <div className="h-48 w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={55}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#111827" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', fontSize: '12px' }}
              formatter={(value) => [`${value}%`, 'Volume Share']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-2 border-t border-dark-700 pt-3">
        {data.map(item => (
          <div key={item.name} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
            <div className="min-w-0">
              <p className="text-[11px] font-mono font-semibold text-gray-200 leading-tight">{item.name}</p>
              <p className="text-[10px] text-gray-400 font-mono">{item.value}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
