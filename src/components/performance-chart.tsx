'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartData {
  name: string;
  value: number;
  value2?: number;
}

interface PerformanceChartProps {
  data: ChartData[];
  title?: string;
  dataKey?: string;
  dataKey2?: string;
  dataLabel?: string;
  dataLabel2?: string;
  yAxisLabel?: string;
  height?: number;
}

export function PerformanceChart({
  data,
  title,
  dataKey = 'value',
  dataKey2,
  dataLabel = 'Value',
  dataLabel2,
  yAxisLabel,
  height = 300,
}: PerformanceChartProps) {
  return (
    <div className="my-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4">
      {title && (
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-800" />
          <XAxis
            dataKey="name"
            className="text-xs"
            tick={{ fill: 'currentColor', className: 'fill-zinc-600 dark:fill-zinc-400' }}
          />
          <YAxis
            label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
            className="text-xs"
            tick={{ fill: 'currentColor', className: 'fill-zinc-600 dark:fill-zinc-400' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgb(24 24 27)',
              border: '1px solid rgb(63 63 70)',
              borderRadius: '8px',
              color: 'rgb(244 244 245)',
            }}
            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
          />
          <Legend />
          <Bar dataKey={dataKey} fill="#3b82f6" name={dataLabel} radius={[4, 4, 0, 0]} />
          {dataKey2 && (
            <Bar dataKey={dataKey2} fill="#8b5cf6" name={dataLabel2} radius={[4, 4, 0, 0]} />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
