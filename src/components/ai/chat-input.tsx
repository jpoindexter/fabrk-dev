'use client';

/**
 * AI Chat Input
 * Message input area with send button and keyboard shortcuts
 */

import { useRef, useEffect, useState } from 'react';
import { Send, Loader2, StopCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface AIChatInputProps {
  /** Callback when message is sent */
  onSend: (message: string) => void;
  /** Callback to stop current generation */
  onStop?: () => void;
  /** Whether a message is currently being generated */
  isLoading?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Disable input */
  disabled?: boolean;
  /** Show helper text */
  showHelperText?: boolean;
  /** Custom helper text */
  helperText?: string;
  /** Maximum rows for textarea */
  maxRows?: number;
  /** Custom class name */
  className?: string;
}

export function AIChatInput({
  onSend,
  onStop,
  isLoading = false,
  placeholder = 'Message AI...',
  disabled = false,
  showHelperText = true,
  helperText = 'Press Enter to send, Shift+Enter for new line',
  maxRows = 5,
  className,
}: AIChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState('');

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to get accurate scrollHeight
    textarea.style.height = 'auto';

    // Calculate new height (max 150px = ~5 rows)
    const maxHeight = 24 * maxRows; // 24px per row approximately
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${newHeight}px`;
  }, [input, maxRows]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!input.trim() || isLoading || disabled) return;

    onSend(input.trim());
    setInput('');

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleStop = () => {
    onStop?.();
  };

  return (
    <div className={cn('border-border bg-background border-t', className)}>
      <div className="mx-auto max-w-4xl px-3 py-3">
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={isLoading || disabled}
              className={cn(
                'min-h-[40px] resize-none py-2.5 pr-10 text-sm',
                mode.font,
                mode.radius
              )}
              rows={1}
              aria-label="Chat message input"
            />

            {isLoading ? (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={handleStop}
                disabled={!onStop}
                className={cn(
                  'absolute top-1/2 right-1.5 size-7 -translate-y-1/2 p-0',
                  mode.radius
                )}
                aria-label="Stop generation"
              >
                <StopCircle className="size-3.5" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="sm"
                disabled={!input.trim() || disabled}
                className={cn(
                  'absolute top-1/2 right-1.5 size-7 -translate-y-1/2 p-0',
                  mode.radius
                )}
                aria-label="Send message"
              >
                <Send className="size-3.5" />
              </Button>
            )}
          </div>

          {showHelperText && (
            <p className={cn('text-center text-xs', mode.font, mode.color.text.muted)}>
              {helperText}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
