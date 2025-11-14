'use client';

import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { Bot, User } from 'lucide-react';
import { MetricsGrid } from './metrics-card';
import { CampaignTable } from './campaign-table';
import { PerformanceChart } from './performance-chart';
import { InsightCard } from './insight-card';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  structuredData?: any[];
}

export function ChatMessage({ role, content, structuredData }: ChatMessageProps) {
  const isUser = role === 'user';

  const renderStructuredData = (data: any, index: number) => {
    const { type, data: innerData, title } = data;

    switch (type) {
      case 'table':
        if (innerData.campaigns) {
          return (
            <div key={index}>
              {title && (
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  {title}
                </h3>
              )}
              <CampaignTable campaigns={innerData.campaigns} />
            </div>
          );
        }
        break;

      case 'metrics':
        if (innerData.metrics) {
          return (
            <div key={index}>
              {title && (
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  {title}
                </h3>
              )}
              <MetricsGrid metrics={innerData.metrics} />
            </div>
          );
        }
        break;

      case 'chart':
        if (innerData.chartData) {
          return (
            <PerformanceChart
              key={index}
              data={innerData.chartData}
              title={title}
              yAxisLabel={innerData.yAxisLabel}
              dataKey={innerData.dataKey || 'value'}
              dataLabel={innerData.dataLabel || 'Value'}
            />
          );
        }
        break;

      case 'insights':
        if (innerData.insights) {
          return (
            <div key={index}>
              {title && (
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  {title}
                </h3>
              )}
              {innerData.insights.map((insight: any, idx: number) => (
                <InsightCard key={idx} {...insight} />
              ))}
            </div>
          );
        }
        break;

      default:
        return null;
    }

    return null;
  };

  return (
    <div className={`flex gap-4 mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className="bg-blue-600 text-white rounded-full flex items-center justify-center h-8 w-8">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div className={`max-w-[85%] ${isUser ? '' : 'flex-1'}`}>
        {/* Structured Data (only for assistant) */}
        {!isUser && structuredData && structuredData.length > 0 && (
          <div className="space-y-4 mb-4">
            {structuredData.map((data, index) => renderStructuredData(data, index))}
          </div>
        )}

        {/* Text Content */}
        {content && (
          <div
            className={`rounded-2xl px-4 py-3 ${
              isUser
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
            }`}
          >
            <div className="prose prose-sm dark:prose-invert max-w-none [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0">
              {content.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className="bg-zinc-700 text-white rounded-full flex items-center justify-center h-8 w-8">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
