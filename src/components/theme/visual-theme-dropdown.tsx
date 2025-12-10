/**
 * ✅ FABRK COMPONENT
 * Visual Theme Picker - Manages both color themes (DaisyUI) and visual themes (terminal/modern/soft)
 * Production-ready ✓
 */

'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { env } from '@/lib/env';

// Visual themes configuration (audit exception in pre-commit-audit.mjs)
const visualThemes = [
  {
    id: 'terminal',
    name: 'Terminal',
    description: 'Sharp edges, monospace',
    config: {
      radius: 'rounded-none',
      font: 'font-mono',
      shadow: '',
    },
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Rounded edges, sans-serif',
    config: {
      radius: 'rounded-lg',
      font: 'font-sans',
      shadow: 'shadow-sm',
    },
  },
] as const;

export type VisualTheme = (typeof visualThemes)[number]['id'];

export function VisualThemeDropdown() {
  const [currentTheme, setCurrentTheme] = useState<VisualTheme>('terminal');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: Hydration pattern for SSR compatibility
    setMounted(true);

    // Check environment variable first
    const envTheme = env.client.NEXT_PUBLIC_VISUAL_THEME;
    if (envTheme && visualThemes.some((t) => t.id === envTheme)) {
      setCurrentTheme(envTheme);
      document.documentElement.setAttribute('data-visual-mode', envTheme);
      return;
    }

    // Otherwise check localStorage (use existing key for compatibility)
    const saved = localStorage.getItem('fabrk-theme-visual-mode') as VisualTheme;
    if (saved && visualThemes.some((t) => t.id === saved)) {
      setCurrentTheme(saved);
      document.documentElement.setAttribute('data-visual-mode', saved);
    } else {
      // Default to terminal
      const defaultTheme = env.client.NEXT_PUBLIC_DEFAULT_VISUAL_THEME || 'terminal';
      setCurrentTheme(defaultTheme as VisualTheme);
      document.documentElement.setAttribute('data-visual-mode', defaultTheme);
    }
  }, []);

  const handleChange = (themeId: VisualTheme) => {
    // If env variable is set, don't allow switching
    if (env.client.NEXT_PUBLIC_VISUAL_THEME) {
      console.warn('Visual theme is locked via NEXT_PUBLIC_VISUAL_THEME environment variable');
      return;
    }

    setCurrentTheme(themeId);
    localStorage.setItem('fabrk-theme-visual-mode', themeId);
    document.documentElement.setAttribute('data-visual-mode', themeId);

    // Force reload to apply theme changes
    // This is necessary because CSS utility classes need to be regenerated
    window.location.reload();
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className={mode.radius} disabled aria-label="Loading theme">
        <Eye className="h-4 w-4" />
      </Button>
    );
  }

  const currentThemeName = visualThemes.find((t) => t.id === currentTheme)?.name || 'Terminal';
  const isLocked = !!env.client.NEXT_PUBLIC_VISUAL_THEME;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn('gap-2', mode.radius)}
          aria-label={`Change visual theme, current: ${currentThemeName}`}
          disabled={isLocked}
        >
          <Eye className="h-4 w-4" />
          <span className="hidden sm:inline">{currentThemeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn('w-56', mode.radius)}>
        <DropdownMenuLabel className={mode.font}>[VISUAL THEME]</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {visualThemes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => handleChange(theme.id)}
            className={cn(
              mode.font,
              'cursor-pointer',
              currentTheme === theme.id && 'bg-primary text-primary-foreground'
            )}
            disabled={isLocked}
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{theme.name}</span>
                {currentTheme === theme.id && <span className="text-xs">✓</span>}
              </div>
              <span className="text-muted-foreground text-xs">{theme.description}</span>
            </div>
          </DropdownMenuItem>
        ))}
        {isLocked && (
          <>
            <DropdownMenuSeparator />
            <div className="text-muted-foreground px-2 py-1.5 text-xs">
              [NOTE]: Theme locked via env
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
