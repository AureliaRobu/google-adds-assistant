import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  subtitle?: string;
  highlight?: boolean;
}

export function MetricCard({ label, value, trend, subtitle, highlight }: MetricCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'neutral':
        return <Minus className="h-4 w-4 text-zinc-400" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`rounded-lg border p-4 ${
        highlight
          ? 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/20'
          : 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">{label}</p>
          <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">{subtitle}</p>
          )}
        </div>
        {trend && <div className="ml-2">{getTrendIcon()}</div>}
      </div>
    </div>
  );
}

interface MetricsGridProps {
  metrics: Array<Omit<MetricCardProps, 'highlight'>>;
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}
