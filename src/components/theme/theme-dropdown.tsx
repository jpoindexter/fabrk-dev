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

// Terminal themes (dark CRT + retro light + paper themes)
const themes = [
  // Dark CRT themes
  { id: 'amber', name: 'Amber CRT', preview: '#ffb000' },
  { id: 'green', name: 'Green CRT', preview: '#33ff66' },
  { id: 'blue', name: 'Blue CRT', preview: '#55ccff' },
  { id: 'red', name: 'Red CRT', preview: '#ff6655' },
  { id: 'purple', name: 'Purple CRT', preview: '#bb88ff' },
  // Retro light themes
  { id: 'gameboy', name: 'Game Boy', preview: '#9bbc0f' },
  { id: 'gbpocket', name: 'GB Pocket', preview: '#8a8a8a' },
  { id: 'apple2', name: 'Apple II', preview: '#000000' }, // Black background
  { id: 'c64', name: 'C64 Blue', preview: '#352879' }, // Dark Blue
  { id: 'vic20', name: 'VIC-20', preview: '#e0ffff' }, // Light Cyan/White
  { id: 'atari', name: 'Atari 800', preview: '#305070' }, // Atari Blue
  { id: 'spectrum', name: 'ZX Spectrum', preview: '#ffffff' }, // White
  { id: 'ibmpc', name: 'IBM PC', preview: '#000000' }, // Black background
  { id: 'light-green', name: 'Light Green', preview: '#00aa33' },
  { id: 'light-amber', name: 'Light Amber', preview: '#cc8800' },
  // Paper themes
  { id: 'bw', name: 'Black & White', preview: '#ffffff' },
] as const;

export type ColorTheme = (typeof themes)[number]['id'];

export function ThemeDropdown() {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>('green');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: Hydration pattern for SSR compatibility
    setMounted(true);

    // Remove any leftover dark mode class and localStorage from old theme system
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.remove('light');

    // Clear old next-themes localStorage keys
    localStorage.removeItem('theme-mode'); // Old key if it exists

    // Set DaisyUI theme (force green as default if no valid theme)
    const saved = (localStorage.getItem('theme') as ColorTheme) || 'green';
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

    // Smart Link: Auto-switch monitor effect based on theme type
    let effect = '';

    // 1. LCD Handheld Themes
    if (['gameboy', 'gbpocket'].includes(themeId)) {
      effect = 'lcd';
    }
    // 2. Retro Computer / CRT Themes
    else if (
      [
        'amber',
        'green',
        'blue',
        'red',
        'purple',
        'apple2',
        'c64',
        'vic20',
        'atari',
        'spectrum',
        'ibmpc',
      ].includes(themeId)
    ) {
      effect = 'crt';
    }
    // 3. Paper / Clean Themes
    else if (['bw', 'light-green', 'light-amber'].includes(themeId)) {
      effect = 'none';
    }

    if (effect) {
      // Remove all potential effect classes
      ['effect-crt', 'effect-lcd', 'effect-vhs', 'effect-none'].forEach((c) =>
        document.documentElement.classList.remove(c)
      );
      if (effect !== 'none') {
        document.documentElement.classList.add(`effect-${effect}`);
      }
      localStorage.setItem('monitor-preset', effect);

      // Dispatch storage event to sync other components if they listen
      window.dispatchEvent(new Event('storage'));
    }
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className={mode.radius} disabled aria-label="Loading theme">
        <Palette className="h-4 w-4" />
      </Button>
    );
  }

  const currentThemeName = themes.find((t) => t.id === currentTheme)?.name || 'Green CRT';

  return (
    <DropdownMenu modal={false}>
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
