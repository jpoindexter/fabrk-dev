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
import { useThemeContext, type ColorThemeName } from '@/design-system/providers';

// Grouped themes for organized dropdown
/* eslint-disable design-system/no-hardcoded-colors -- Theme preview swatches require hex colors for visual reference */
const themeGroups = {
  Cinematic: [
    { id: 'milano' as const, name: 'Milano', preview: '#00ffff' },
    { id: 'collector' as const, name: 'Collector', preview: '#ff00ff' },
    { id: 'life-hutch' as const, name: 'Life Hutch', preview: '#33ff66' },
  ],
  'Standard CRT': [
    { id: 'amber' as const, name: 'Amber CRT', preview: '#ffb000' },
    { id: 'blue' as const, name: 'Blue CRT', preview: '#55ccff' },
    { id: 'green' as const, name: 'Green CRT', preview: '#33ff66' },
    { id: 'purple' as const, name: 'Purple CRT', preview: '#bb88ff' },
    { id: 'red' as const, name: 'Red CRT', preview: '#ff6655' },
  ],
  'Retro Computer': [
    { id: 'atari' as const, name: 'Atari 800', preview: '#305070' },
    { id: 'c64' as const, name: 'C64 Blue', preview: '#352879' },
    { id: 'spectrum' as const, name: 'ZX Spectrum', preview: '#ffffff' },
    { id: 'vic20' as const, name: 'VIC-20', preview: '#e0ffff' },
  ],
  Handheld: [
    { id: 'gameboy' as const, name: 'Game Boy', preview: '#9bbc0f' },
    { id: 'gbpocket' as const, name: 'GB Pocket', preview: '#8a8a8a' },
  ],
  Light: [{ id: 'bw' as const, name: 'Black & White', preview: '#ffffff' }],
} as const;

// FUI decoration styles - each has its own signature color
const fuiStyles = [
  { id: 'none', name: 'None', preview: 'transparent' },
  { id: 'bracket-corners', name: 'Bracket Corners', preview: '#00ffff' },
  { id: 'corner-ticks', name: 'Corner Ticks', preview: '#ff8800' },
  { id: 'wireframe', name: 'Wireframe', preview: '#ffffff' },
  { id: 'oblivion', name: 'Oblivion', preview: '#00ffff' },
  { id: 'remote-link', name: 'Remote Link', preview: '#ff6600' },
  { id: 'tread', name: 'Tread FX-D', preview: '#ccff00' },
  { id: 'jarvis', name: 'JARVIS', preview: '#00aaff' },
  { id: 'lcars', name: 'LCARS', preview: '#ff9900' },
  { id: 'cortana', name: 'Cortana', preview: '#0088ff' },
  { id: 'pacific-rim', name: 'Pacific Rim', preview: '#ff4400' },
  { id: 'alien', name: 'Alien Isolation', preview: '#00ff66' },
  { id: 'dead-space', name: 'Dead Space', preview: '#00ffcc' },
  { id: 'mass-effect', name: 'Mass Effect', preview: '#ff6600' },
  { id: 'deus-ex', name: 'Deus Ex', preview: '#ffcc00' },
  { id: 'ghost-shell', name: 'Ghost in Shell', preview: '#ff0066' },
  { id: 'tron', name: 'Tron Legacy', preview: '#00ffff' },
  { id: 'avatar', name: 'Avatar HUD', preview: '#00ff00' },
  { id: 'blade-runner', name: 'Blade Runner', preview: '#ff0055' },
  { id: 'interstellar', name: 'Interstellar', preview: '#aaaaaa' },
  { id: 'iron-man', name: 'Iron Man HUD', preview: '#00ccff' },
  { id: 'wakanda', name: 'Wakanda Tech', preview: '#aa55ff' },
  { id: 'milano', name: 'Milano Cinematic', preview: '#00ffff' },
  { id: 'collector', name: 'Collector Cinematic', preview: '#ff00ff' },
  { id: 'life-hutch', name: 'Life Hutch FUI', preview: '#33ff66' },
] as const;
/* eslint-enable design-system/no-hardcoded-colors */

// Flattened list for type safety and easy lookup
const themes = Object.values(themeGroups).flat();

export type ColorTheme = (typeof themes)[number]['id'];
export type FuiStyle = (typeof fuiStyles)[number]['id'];

export function ThemeDropdown() {
  const { colorTheme, setColorTheme } = useThemeContext();
  const [currentFui, setCurrentFui] = useState<FuiStyle>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('fui-style') as FuiStyle) || 'none';
    }
    return 'none';
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Apply FUI style to document on mount if it's not none
    if (currentFui !== 'none') {
      document.documentElement.setAttribute('data-fui', currentFui);
    }
    
    // Use a small timeout or requestAnimationFrame to avoid synchronous setState in effect
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, [currentFui]);

  const handleThemeChange = (themeId: ColorTheme) => {
    setColorTheme(themeId as ColorThemeName);
    localStorage.setItem('theme', themeId);

    // Clear FUI style when selecting a color theme directly
    setCurrentFui('none');
    localStorage.setItem('fui-style', 'none');
    document.documentElement.removeAttribute('data-fui');

    // Smart Link: Auto-switch monitor effect based on theme type
    let effect = '';

    // 1. LCD Handheld Themes
    if (['gameboy', 'gbpocket'].includes(themeId)) {
      effect = 'lcd';
    }
    // 2. Retro Computer / CRT Themes / Cinematic
    else if (
      ['amber', 'green', 'blue', 'red', 'purple', 'c64', 'vic20', 'atari', 'spectrum', 'milano', 'collector'].includes(
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
      // Also set data-theme to the FUI style so colors are controlled by fui-styles.css
      document.documentElement.setAttribute('data-theme', fuiId);
      localStorage.setItem('theme', fuiId);
    }
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className={mode.radius} disabled aria-label="Loading theme">
        <Palette className="h-4 w-4" />
      </Button>
    );
  }

  const currentThemeName = themes.find((t) => t.id === colorTheme)?.name || 'Green CRT';

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
                  colorTheme === theme.id && 'bg-primary text-primary-foreground'
                )}
              >
                <div
                  className={cn('mr-2 h-4 w-4 border', mode.radius)}
                  style={{ backgroundColor: theme.preview }}
                />
                {theme.name}
                {colorTheme === theme.id && <span className="ml-auto text-xs">✓</span>}
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
              className={cn('mr-2 h-4 w-4 border', mode.radius)}
              style={{ backgroundColor: fui.preview }}
            />
            {fui.name}
            {currentFui === fui.id && <span className="ml-auto text-xs">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}