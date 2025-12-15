'use client';

/**
 * AI Chat Message Components
 * Terminal-styled message bubbles for chat interfaces
 */

import { Bot, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Button } from '@/components/ui/button';

export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt?: Date;
}

interface ChatMessageProps {
  message: ChatMessage;
  isStreaming?: boolean;
}

export function ChatMessageBubble({ message, isStreaming = false }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Don't render system messages
  if (message.role === 'system') return null;

  return (
    <div className={cn('group flex w-full gap-3', isUser && 'justify-end')}>
      {/* Avatar (assistant only) */}
      {!isUser && (
        <div
          className={cn(
            'bg-background ring-border flex size-8 shrink-0 items-center justify-center rounded-full ring-1',
            mode.radius
          )}
        >
          <Bot className="size-4" />
        </div>
      )}

      {/* Message Content */}
      <div
        className={cn('flex flex-col gap-2', {
          'w-full': !isUser,
          'max-w-[calc(100%-2.5rem)] sm:max-w-[min(fit-content,80%)]': isUser,
        })}
      >
        {/* Role Label */}
        <div className={cn('text-sm font-semibold', mode.font, isUser && 'text-right')}>
          {isUser ? 'You' : 'Assistant'}
        </div>

        {/* Message Text */}
        <div className="relative">
          <div
            className={cn(
              'prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap',
              mode.font,
              mode.radius,
              isUser && 'border-primary bg-primary/10 w-fit border px-3 py-2 break-words',
              !isUser && 'bg-transparent px-0 py-0',
              isStreaming && 'animate-pulse'
            )}
          >
            {message.content}
            {isStreaming && <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-current" />}
          </div>

          {/* Copy Button (assistant only, on hover) */}
          {isAssistant && message.content && !isStreaming && (
            <div className="mt-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className={cn('size-7 p-0', mode.radius)}
              >
                {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Chat Message List
 * Container for rendering a list of messages
 */
interface ChatMessageListProps {
  messages: ChatMessage[];
  isStreaming?: boolean;
  className?: string;
}

export function ChatMessageList({
  messages,
  isStreaming = false,
  className,
}: ChatMessageListProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {messages.map((message, index) => (
        <ChatMessageBubble
          key={message.id}
          message={message}
          isStreaming={isStreaming && index === messages.length - 1 && message.role === 'assistant'}
        />
      ))}
    </div>
  );
}

/**
 * Greeting Component
 * Simple greeting shown when chat is empty - Vercel style
 */
interface EmptyChatStateProps {
  title?: string;
  description?: string;
}

export function EmptyChatState({
  title = 'HELLO THERE!',
  description = 'How can I help you today?',
}: EmptyChatStateProps) {
  return (
    <div className="mx-auto mt-2 flex size-full max-w-3xl flex-col justify-center px-4 md:mt-8 md:px-6">
      <h1 className={cn('text-lg font-bold uppercase md:text-xl', mode.font)}>{title}</h1>
      <p className={cn('text-base md:text-lg', mode.font, mode.color.text.muted)}>{description}</p>
    </div>
  );
}

/**
 * Typing Indicator
 * Shows when the AI is generating a response
 */
export function TypingIndicator() {
  return (
    <div className="flex gap-4">
      <div
        className={cn(
          'flex size-8 shrink-0 items-center justify-center border',
          mode.radius,
          'border-border bg-muted text-muted-foreground'
        )}
      >
        <Bot className="size-4" />
      </div>

      <div className="space-y-2">
        <div className={cn('text-xs', mode.font, mode.color.text.muted)}>[ASSISTANT]:</div>
        <div
          className={cn(
            'flex items-center gap-1 border px-4 py-3',
            mode.radius,
            'border-border bg-card'
          )}
        >
          <span className="size-2 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
          <span className="size-2 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
          <span className="size-2 animate-bounce rounded-full bg-current" />
        </div>
      </div>
    </div>
  );
}
