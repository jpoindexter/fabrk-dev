'use client';

/**
 * AI Chat Messages Area
 * Displays chat message history with auto-scroll
 */

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChatMessageList, EmptyChatState, TypingIndicator, type ChatMessage } from './chat-message';
import { SuggestedActions } from './suggested-actions';

interface AIChatMessagesProps {
  /** Array of messages to display */
  messages: ChatMessage[];
  /** Whether the AI is currently streaming a response */
  isStreaming?: boolean;
  /** Whether to show typing indicator when streaming */
  showTypingIndicator?: boolean;
  /** Empty state configuration */
  emptyState?: {
    title?: string;
    description?: string;
    suggestions?: string[];
    onSuggestionClick?: (suggestion: string) => void;
  };
  /** Custom class name */
  className?: string;
}

export function AIChatMessages({
  messages,
  isStreaming = false,
  showTypingIndicator = true,
  emptyState,
  className,
}: AIChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={cn('flex-1 overflow-y-auto', className)}>
      <div className="mx-auto flex max-w-4xl min-w-0 flex-col gap-4 px-2 py-4 md:gap-6 md:px-4">
        {/* Greeting when no messages */}
        {messages.length === 0 && (
          <>
            <EmptyChatState title={emptyState?.title} description={emptyState?.description} />
            {emptyState?.suggestions && emptyState.suggestions.length > 0 && (
              <SuggestedActions
                suggestions={emptyState.suggestions}
                onSuggestionClick={emptyState?.onSuggestionClick}
                className="mx-auto w-full max-w-3xl px-4"
              />
            )}
          </>
        )}

        {/* Messages */}
        {messages.length > 0 && (
          <>
            <ChatMessageList messages={messages} isStreaming={isStreaming} />

            {/* Typing indicator when streaming and last message is not from assistant */}
            {showTypingIndicator &&
              isStreaming &&
              messages[messages.length - 1]?.role !== 'assistant' && (
                <div className="mt-6">
                  <TypingIndicator />
                </div>
              )}
          </>
        )}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
