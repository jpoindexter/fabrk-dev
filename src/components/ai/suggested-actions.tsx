'use client';

/**
 * Suggested Actions
 * Shows clickable suggestion buttons when chat is empty
 */

import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Button } from '@/components/ui/button';

interface SuggestedActionsProps {
  suggestions: string[];
  onSuggestionClick?: (suggestion: string) => void;
  className?: string;
}

export function SuggestedActions({
  suggestions,
  onSuggestionClick,
  className,
}: SuggestedActionsProps) {
  return (
    <div className={cn('grid w-full gap-3 sm:grid-cols-2', className)}>
      {suggestions.map((suggestion, index) => (
        <Button
          key={suggestion}
          variant="outline"
          size="lg"
          onClick={() => onSuggestionClick?.(suggestion)}
          className={cn(
            'h-auto w-full p-4 text-left text-sm font-normal whitespace-normal',
            mode.radius,
            mode.font
          )}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
}
