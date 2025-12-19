/**
 * ✅ FABRK COMPONENT
 * Color theme + FUI style picker dropdown for navbar
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

import { mode } from '@/design-system';

// Grouped themes for organized dropdown
/* eslint-disable design-system/no-hardcoded-colors -- Theme preview swatches require hex colors for visual reference */
const themeGroups = {
  'Standard CRT': [
    { id: 'amber', name: 'Amber CRT', preview: '#ffb000' },
    { id: 'blue', name: 'Blue CRT', preview: '#55ccff' },
    { id: 'green', name: 'Green CRT', preview: '#33ff66' },
    { id: 'purple', name: 'Purple CRT', preview: '#bb88ff' },
    { id: 'red', name: 'Red CRT', preview: '#ff6655' },
  ],
  'Retro Computer': [
    { id: 'atari', name: 'Atari 800', preview: '#305070' },
    { id: 'c64', name: 'C64 Blue', preview: '#352879' },
    { id: 'spectrum', name: 'ZX Spectrum', preview: '#ffffff' },
    { id: 'vic20', name: 'VIC-20', preview: '#e0ffff' },
  ],
  Handheld: [
    { id: 'gameboy', name: 'Game Boy', preview: '#9bbc0f' },
    { id: 'gbpocket', name: 'GB Pocket', preview: '#8a8a8a' },
  ],
  Light: [{ id: 'bw', name: 'Black & White', preview: '#ffffff' }],
} as const;

// FUI decoration styles - these add visual decorations to cards
const fuiStyles = [
  { id: 'none', name: 'None', preview: 'transparent' },
  { id: 'bracket-corners', name: 'Bracket Corners', preview: 'currentColor' },
  { id: 'corner-ticks', name: 'Corner Ticks', preview: 'currentColor' },
  { id: 'wireframe', name: 'Wireframe', preview: 'currentColor' },
  { id: 'oblivion', name: 'Oblivion', preview: 'currentColor' },
  { id: 'remote-link', name: 'Remote Link', preview: 'currentColor' },
  { id: 'tread', name: 'Tread FX-D', preview: 'currentColor' },
  { id: 'jarvis', name: 'JARVIS', preview: 'currentColor' },
  { id: 'lcars', name: 'LCARS', preview: 'currentColor' },
  { id: 'cortana', name: 'Cortana', preview: 'currentColor' },
  { id: 'pacific-rim', name: 'Pacific Rim', preview: 'currentColor' },
  { id: 'alien', name: 'Alien Isolation', preview: 'currentColor' },
  { id: 'dead-space', name: 'Dead Space', preview: 'currentColor' },
  { id: 'mass-effect', name: 'Mass Effect', preview: 'currentColor' },
  { id: 'deus-ex', name: 'Deus Ex', preview: 'currentColor' },
  { id: 'ghost-shell', name: 'Ghost in Shell', preview: 'currentColor' },
  { id: 'tron', name: 'Tron Legacy', preview: 'currentColor' },
  { id: 'avatar', name: 'Avatar HUD', preview: 'currentColor' },
  { id: 'blade-runner', name: 'Blade Runner', preview: 'currentColor' },
  { id: 'interstellar', name: 'Interstellar', preview: 'currentColor' },
  { id: 'iron-man', name: 'Iron Man HUD', preview: 'currentColor' },
  { id: 'wakanda', name: 'Wakanda Tech', preview: 'currentColor' },
] as const;
/* eslint-enable design-system/no-hardcoded-colors */

// Flattened list for type safety and easy lookup
const themes = Object.values(themeGroups).flat();

export type ColorTheme = (typeof themes)[number]['id'];
export type FuiStyle = (typeof fuiStyles)[number]['id'];

export function ThemeDropdown() {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>('green');
  const [currentFui, setCurrentFui] = useState<FuiStyle>('none');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: Hydration pattern for SSR compatibility
    setMounted(true);

    // Remove any leftover dark mode class and localStorage from old theme system
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.remove('light');

    // Clear old next-themes localStorage keys
    localStorage.removeItem('theme-mode'); // Old key if it exists

    // Set color theme (force green as default if no valid theme)
    const saved = (localStorage.getItem('theme') as ColorTheme) || 'green';
    setCurrentTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);

    // Set FUI style
    const savedFui = (localStorage.getItem('fui-style') as FuiStyle) || 'none';
    setCurrentFui(savedFui);
    if (savedFui !== 'none') {
      document.documentElement.setAttribute('data-fui', savedFui);
    }

    // Force remove dark class if it somehow persists (safe cleanup)
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      // Only remove theme-related keys, not auth tokens or other data
      localStorage.removeItem('theme');
      localStorage.removeItem('theme-mode');
      localStorage.removeItem('color-theme');
    }
  }, []);

  const handleThemeChange = (themeId: ColorTheme) => {
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
      ['amber', 'green', 'blue', 'red', 'purple', 'c64', 'vic20', 'atari', 'spectrum'].includes(
        themeId
      )
    ) {
      effect = 'crt';
    }
    // 3. Light Themes
    else if (['bw'].includes(themeId)) {
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

  const handleFuiChange = (fuiId: FuiStyle) => {
    setCurrentFui(fuiId);
    localStorage.setItem('fui-style', fuiId);
    if (fuiId === 'none') {
      document.documentElement.removeAttribute('data-fui');
    } else {
      document.documentElement.setAttribute('data-fui', fuiId);
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
  const currentFuiName = fuiStyles.find((f) => f.id === currentFui)?.name || 'None';

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
      <DropdownMenuContent align="end" className={cn('w-56 max-h-[70vh] overflow-y-auto', mode.radius)}>
        {/* Color Themes */}
        {Object.entries(themeGroups).map(([groupName, groupThemes], index) => (
          <div key={groupName}>
            {index > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel className="text-muted-foreground text-xs tracking-wider uppercase">
              {groupName}
            </DropdownMenuLabel>
            {groupThemes.map((theme) => (
              <DropdownMenuItem
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
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
          </div>
        ))}

        {/* FUI Styles */}
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-muted-foreground text-xs tracking-wider uppercase">
          FUI Style
        </DropdownMenuLabel>
        {fuiStyles.map((fui) => (
          <DropdownMenuItem
            key={fui.id}
            onClick={() => handleFuiChange(fui.id)}
            className={cn(
              'font-semibold',
              currentFui === fui.id && 'bg-primary text-primary-foreground'
            )}
          >
            <div
              className={cn('mr-2 h-4 w-4 border border-current', mode.radius)}
            />
            {fui.name}
            {currentFui === fui.id && <span className="ml-auto text-xs">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
