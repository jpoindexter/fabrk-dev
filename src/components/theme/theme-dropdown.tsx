/**
 * ✅ FABRK COMPONENT
 * Color theme picker dropdown for navbar (Light/Dark only)
 * Production-ready ✓
 */

'use client';

import { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

import { mode } from '@/design-system';

// Minimal theme set - GitHub light + CRT phosphor themes
const themes = [
  // Light theme
  { id: 'light', name: 'GitHub', preview: '#f4f4f4' },
  { id: 'dark', name: 'Monokai Night', preview: '#1f1f1f' },
  // CRT phosphor themes
  { id: 'amber', name: 'Amber CRT', preview: '#ffb000' },
  { id: 'green', name: 'Green CRT', preview: '#33ff66' },
  { id: 'blue', name: 'Blue CRT', preview: '#55ccff' },
  { id: 'red', name: 'Red CRT', preview: '#ff6655' },
  { id: 'purple', name: 'Purple CRT', preview: '#bb88ff' },
] as const;

export type ColorTheme = (typeof themes)[number]['id'];

export function ThemeDropdown() {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: Hydration pattern for SSR compatibility
    setMounted(true);

    // Remove any leftover dark mode class and localStorage from old theme system
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.remove('light');

    // Clear old next-themes localStorage keys
    localStorage.removeItem('theme-mode'); // Old key if it exists

    // Set DaisyUI theme (force light as default if no valid theme)
    const saved = (localStorage.getItem('theme') as ColorTheme) || 'light';
    setCurrentTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);

    // Force remove dark class if it somehow persists (safe cleanup)
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      // Only remove theme-related keys, not auth tokens or other data
      localStorage.removeItem('theme');
      localStorage.removeItem('theme-mode');
      localStorage.removeItem('color-theme');
    }
  }, []);

  const handleChange = (themeId: ColorTheme) => {
    setCurrentTheme(themeId);
    localStorage.setItem('theme', themeId);
    document.documentElement.setAttribute('data-theme', themeId);
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className={mode.radius} disabled aria-label="Loading theme">
        <Palette className="h-4 w-4" />
      </Button>
    );
  }

  const currentThemeName = themes.find((t) => t.id === currentTheme)?.name || 'Light';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn('gap-2', mode.radius)}
          aria-label={`Change theme, current: ${currentThemeName}`}
        >
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">{currentThemeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn('w-48', mode.radius)}>
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => handleChange(theme.id)}
            className={cn(
              'font-semibold',
              currentTheme === theme.id && 'bg-primary text-primary-foreground'
            )}
          >
            <div
              className={cn('mr-2 h-4 w-4 border', mode.radius)}
              style={{ backgroundColor: theme.preview }}
            />
            {theme.name}
            {currentTheme === theme.id && <span className="ml-auto text-xs">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
