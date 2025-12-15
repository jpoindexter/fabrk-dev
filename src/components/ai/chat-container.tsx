'use client';

/**
 * AI Chat Container
 * Full chat interface with message history and streaming support
 * Custom implementation with direct API calls
 */

import { useRef, useEffect, useState, useCallback } from 'react';
import { Send, Loader2, RotateCcw, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ChatMessageList, EmptyChatState, TypingIndicator, type ChatMessage } from './chat-message';
import { SuggestedActions } from './suggested-actions';

interface AIChatContainerProps {
  /** API endpoint for chat */
  endpoint?: string;
  /** System prompt to customize AI behavior */
  systemPrompt?: string;
  /** Initial messages to populate the chat */
  initialMessages?: ChatMessage[];
  /** Placeholder text for input */
  placeholder?: string;
  /** Suggestions for empty state */
  suggestions?: string[];
  /** Title for empty state */
  emptyTitle?: string;
  /** Description for empty state */
  emptyDescription?: string;
  /** Custom class name */
  className?: string;
  /** Show header with controls */
  showHeader?: boolean;
  /** Header title */
  headerTitle?: string;
}

export function AIChatContainer({
  endpoint = '/api/ai/chat',
  systemPrompt,
  initialMessages = [],
  placeholder = '> Type your message...',
  suggestions = [
    'Explain this code',
    'Write a function that...',
    'Help me debug...',
    'What are best practices for...',
  ],
  emptyTitle = 'Start a conversation',
  emptyDescription = 'Ask me anything. I can help with coding, writing, analysis, and more.',
  className,
  showHeader = true,
  headerTitle = 'AI CHAT',
}: AIChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      setError(null);
      setIsLoading(true);

      // Add user message
      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
      };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);

      // Create abort controller for this request
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            systemPrompt,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Request failed with status ${response.status}`);
        }

        // Handle streaming response
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('No response body');
        }

        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: '',
        };
        setMessages([...updatedMessages, assistantMessage]);

        const decoder = new TextDecoder();
        let fullContent = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          fullContent += chunk;

          // Update the assistant message with accumulated content
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage && lastMessage.role === 'assistant') {
              lastMessage.content = fullContent;
            }
            return newMessages;
          });
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          // Request was cancelled, don't show error
          return;
        }
        setError(err instanceof Error ? err : new Error('Unknown error'));
        // Remove the user message if request failed
        setMessages(messages);
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [endpoint, isLoading, messages, systemPrompt]
  );

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!input.trim() || isLoading) return;
      sendMessage(input);
      setInput('');
    },
    [input, isLoading, sendMessage]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const handleClear = () => {
    setMessages([]);
    setError(null);
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    // Find the last user message and resend
    const lastUserMessageIndex = [...messages].reverse().findIndex((m) => m.role === 'user');
    if (lastUserMessageIndex >= 0) {
      const actualIndex = messages.length - 1 - lastUserMessageIndex;
      const lastUserMessage = messages[actualIndex];
      // Remove messages from the last user message onwards
      const newMessages = messages.slice(0, actualIndex);
      setMessages(newMessages);
      setError(null);
      // Resend
      sendMessage(lastUserMessage.content);
    }
  };

  return (
    <Card className={cn('flex h-[600px] flex-col', className)}>
      {/* Header */}
      {showHeader && (
        <CardHeader
          code="0xAI"
          title={headerTitle}
          meta={
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  className={cn('h-6 px-2 text-xs', mode.radius, mode.font)}
                >
                  <Trash2 className="mr-1 size-3" />
                  CLEAR
                </Button>
              )}
            </div>
          }
        />
      )}

      {/* Messages Area */}
      <CardContent padding="md" className="flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-4xl min-w-0 flex-col gap-4 px-2 py-4 md:gap-6 md:px-4">
          {messages.length === 0 ? (
            <>
              <EmptyChatState title={emptyTitle} description={emptyDescription} />
              {suggestions.length > 0 && (
                <SuggestedActions
                  suggestions={suggestions}
                  onSuggestionClick={handleSuggestionClick}
                  className="mx-auto w-full max-w-3xl px-4"
                />
              )}
            </>
          ) : (
            <>
              <ChatMessageList messages={messages} isStreaming={isLoading} />
              {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                <div className="mt-6">
                  <TypingIndicator />
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Error Display */}
        {error && (
          <div
            className={cn(
              'mt-4 flex items-center justify-between border px-4 py-3',
              mode.radius,
              'border-destructive/30 bg-destructive/5'
            )}
          >
            <span className={cn('text-destructive text-xs', mode.font)}>
              [ERROR]: {error.message || 'Something went wrong'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRetry}
              className={cn('h-6 px-2 text-xs', mode.radius, mode.font)}
            >
              <RotateCcw className="mr-1 size-3" />
              RETRY
            </Button>
          </div>
        )}
      </CardContent>

      {/* Input Area */}
      <div className={cn('border-t px-4 py-4', mode.color.border.default)}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={isLoading}
              className={cn('min-h-[44px] resize-none py-3 pr-12 text-sm', mode.font, mode.radius)}
              rows={1}
            />
          </div>

          <div className="flex flex-col gap-2">
            {isLoading ? (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleStop}
                className={cn('h-[44px] px-4 text-xs', mode.radius, mode.font)}
              >
                <Loader2 className="mr-2 size-4 animate-spin" />
                STOP
              </Button>
            ) : (
              <Button
                type="submit"
                size="sm"
                disabled={!input.trim()}
                className={cn('h-[44px] px-4 text-xs', mode.radius, mode.font)}
              >
                <Send className="mr-2 size-4" />
                SEND
              </Button>
            )}
          </div>
        </form>

        <p className={cn('mt-2 text-center text-xs', mode.font, mode.color.text.muted)}>
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </Card>
  );
}
