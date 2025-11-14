import { AlertCircle, CheckCircle, Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';

interface InsightCardProps {
  type: 'success' | 'warning' | 'info' | 'recommendation';
  title: string;
  description: string;
  items?: string[];
}

export function InsightCard({ type, title, description, items }: InsightCardProps) {
  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />,
          bg: 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900',
          titleColor: 'text-green-900 dark:text-green-100',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />,
          bg: 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900',
          titleColor: 'text-yellow-900 dark:text-yellow-100',
        };
      case 'info':
        return {
          icon: <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
          bg: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900',
          titleColor: 'text-blue-900 dark:text-blue-100',
        };
      case 'recommendation':
        return {
          icon: <Lightbulb className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
          bg: 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900',
          titleColor: 'text-purple-900 dark:text-purple-100',
        };
      default:
        return {
          icon: <AlertCircle className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />,
          bg: 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800',
          titleColor: 'text-zinc-900 dark:text-zinc-100',
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`rounded-lg border p-4 my-3 ${styles.bg}`}>
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
        <div className="flex-1">
          <h4 className={`text-sm font-semibold mb-1 ${styles.titleColor}`}>{title}</h4>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-2">{description}</p>
          {items && items.length > 0 && (
            <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

interface InsightListProps {
  insights: Omit<InsightCardProps, 'items'>[];
}

export function InsightList({ insights }: InsightListProps) {
  return (
    <div className="space-y-2">
      {insights.map((insight, index) => (
        <InsightCard key={index} {...insight} />
      ))}
    </div>
  );
}
