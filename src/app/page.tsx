'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/components/chat-message';
import { ChatInput } from '@/components/chat-input';
import { ExamplePrompts } from '@/components/example-prompts';
import { BarChart3, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  structuredData?: any[];
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Prepare messages for API (convert to Claude format)
      const apiMessages = [...messages, userMessage].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get response');
      }

      const data = await response.json();

      // Add assistant message
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        structuredData: data.structuredData,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Sorry, I encountered an error: ${error.message}. Please make sure your ANTHROPIC_API_KEY is set in .env.local`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Google Ads AI Assistant
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Chat with your ad performance data
            </p>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="space-y-8">
              <div className="text-center space-y-3">
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                  Welcome to Your Ads Dashboard
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                  Ask me anything about your campaign performance, keywords, or get
                  optimization recommendations.
                </p>
              </div>
              <ExamplePrompts onSelectPrompt={handleSendMessage} />
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  role={message.role}
                  content={message.content}
                  structuredData={message.structuredData}
                />
              ))}
              {isLoading && (
                <div className="flex gap-4 mb-6">
                  <div className="h-8 w-8 flex-shrink-0 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl px-4 py-3">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Analyzing your data...
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 px-6 py-4 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSend={handleSendMessage} disabled={isLoading} />
          <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2 text-center">
            This is a demo using mock Google Ads data. Powered by Claude AI.
          </p>
        </div>
      </div>
    </div>
  );
}
