'use client';

import { Sparkles } from 'lucide-react';

interface ExamplePromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const examplePrompts = [
  {
    title: 'Top Campaigns',
    prompt: 'Show me my top performing campaigns by ROAS',
  },
  {
    title: 'Budget Analysis',
    prompt: 'Which campaigns are spending the most and what is their performance?',
  },
  {
    title: 'Optimization Tips',
    prompt: 'What can I do to improve my overall campaign performance?',
  },
  {
    title: 'Keyword Performance',
    prompt: 'Show me my best and worst performing keywords',
  },
];

export function ExamplePrompts({ onSelectPrompt }: ExamplePromptsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
        <Sparkles className="h-4 w-4" />
        <span className="text-sm font-medium">Try asking:</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {examplePrompts.map((example, index) => (
          <button
            key={index}
            onClick={() => onSelectPrompt(example.prompt)}
            className="text-left p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all group"
          >
            <div className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
              {example.title}
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-500">
              {example.prompt}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
