'use client';

/**
 * Terminal-Styled Chat Interface
 * A reusable chat input component with terminal aesthetic
 */

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

interface ChatInterfaceProps {
  onSubmit: (message: string) => Promise<void>;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

export function ChatInterface({
  onSubmit,
  placeholder = '> Describe your form...',
  disabled = false,
  isLoading = false,
  className,
}: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || disabled) return;

    const message = input.trim();
    setInput('');
    await onSubmit(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <div className={cn('border-border bg-card border', mode.radius)}>
        {/* Terminal Header */}
        <div className="border-border bg-muted/50 border-b px-4 py-2">
          <span className={cn('text-muted-foreground text-xs', mode.font)}>
            [ [0x00] PROMPT INPUT ]
          </span>
        </div>

        {/* Input Area */}
        <div className="relative p-4">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isLoading}
            className={cn(
              'min-h-[80px] resize-none border-0 bg-transparent p-0 text-sm focus-visible:ring-0',
              mode.font,
              mode.radius
            )}
            rows={3}
          />

          {/* Submit Button */}
          <div className="mt-4 flex items-center justify-between">
            <span className={cn('text-muted-foreground text-xs', mode.font)}>
              Press Enter to submit, Shift+Enter for new line
            </span>
            <Button
              type="submit"
              size="sm"
              disabled={!input.trim() || isLoading || disabled}
              className={cn('text-xs', mode.radius, mode.font)}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  GENERATING...
                </>
              ) : (
                <>
                  <Send className="mr-2 size-4" />
                  &gt; GENERATE
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
