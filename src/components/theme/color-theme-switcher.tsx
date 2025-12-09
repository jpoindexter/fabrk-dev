/**
 * ✅ FABRK COMPONENT
 * DaisyUI theme switcher with 20+ color options
 * Production-ready ✓
 */

'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
const themes = [
  { id: 'light', name: 'Light', preview: '#ffffff' },
  { id: 'dark', name: 'Dark', preview: '#1d232a' },
  { id: 'cupcake', name: 'Cupcake', preview: '#65c3c8' },
  { id: 'bumblebee', name: 'Bumblebee', preview: '#e0a82e' },
  { id: 'emerald', name: 'Emerald', preview: '#66cc8a' },
  { id: 'corporate', name: 'Corporate', preview: '#4b6bfb' },
  { id: 'synthwave', name: 'Synthwave', preview: '#e779c1' },
  { id: 'retro', name: 'Retro', preview: '#ef9995' },
  { id: 'cyberpunk', name: 'Cyberpunk', preview: '#ff7598' },
  { id: 'valentine', name: 'Valentine', preview: '#e96d7b' },
  { id: 'halloween', name: 'Halloween', preview: '#ff7700' },
  { id: 'forest', name: 'Forest', preview: '#1eb854' },
  { id: 'aqua', name: 'Aqua', preview: '#09ecf3' },
  { id: 'lofi', name: 'Lo-Fi', preview: '#0d0d0d' },
  { id: 'pastel', name: 'Pastel', preview: '#d1c1d7' },
  { id: 'fantasy', name: 'Fantasy', preview: '#6e0b75' },
  { id: 'luxury', name: 'Luxury', preview: '#ffffff' },
  { id: 'dracula', name: 'Dracula', preview: '#ff79c6' },
  { id: 'autumn', name: 'Autumn', preview: '#8c0327' },
  { id: 'business', name: 'Business', preview: '#1c4e80' },
] as const;

export type DaisyUITheme = (typeof themes)[number]['id'];

export function ColorThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<DaisyUITheme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: Hydration pattern for SSR compatibility
    setMounted(true);
    // Load saved theme from localStorage
    const saved = (localStorage.getItem('theme') as DaisyUITheme) || 'light';
    setCurrentTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const handleChange = (themeId: DaisyUITheme) => {
    setCurrentTheme(themeId);
    localStorage.setItem('theme', themeId);
    document.documentElement.setAttribute('data-theme', themeId);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="bg-muted h-8 w-full animate-pulse rounded" />;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">
        Choose Theme ({themes.length} available)
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {themes.map((theme) => (
          <Button
            key={theme.id}
            onClick={() => handleChange(theme.id)}
            variant={currentTheme === theme.id ? 'default' : 'outline'}
            size="sm"
            className="justify-start gap-2"
          >
            <div
              className={cn('border-border h-4 w-4 border', mode.radius)}
              style={{ backgroundColor: theme.preview }}
            />
            <span className="text-xs">{theme.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

// Helper to get current theme (for server components)
export function getDaisyUITheme(): DaisyUITheme {
  if (typeof window === 'undefined') return 'light';
  return (localStorage.getItem('theme') as DaisyUITheme) || 'light';
}
