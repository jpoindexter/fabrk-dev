/**
 * ✅ FABRK COMPONENT
 * Monitor effects picker dropdown for navbar (CRT/display effects)
 * Production-ready ✓
 */

'use client';

import { useEffect, useState } from 'react';
import { Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

import { mode } from '@/design-system';

// Monitor/CRT display effects
const effects = [
  { id: 'none', name: 'No Effects', description: 'Clean display' },
  { id: 'scanlines', name: 'Scanlines', description: 'Horizontal CRT lines' },
  { id: 'scanlines-subtle', name: 'Scanlines Subtle', description: 'Light scanlines' },
  { id: 'glow', name: 'CRT Glow', description: 'Phosphor glow' },
  { id: 'glow-strong', name: 'Strong Glow', description: 'Bright phosphor' },
  { id: 'vintage', name: 'Vintage CRT', description: 'Full CRT effect' },
  { id: 'fast-flicker', name: 'Fast Flicker', description: 'Rapid video flicker' },
  { id: 'screen-door', name: 'Screen Door', description: 'Pixel grid pattern' },
  { id: 'color-shift', name: 'Color Shift', description: 'RGB separation' },
  { id: 'retro-crt', name: 'Retro CRT', description: 'All modern effects' },
] as const;

export type MonitorEffect = (typeof effects)[number]['id'];

export function MonitorEffectsDropdown() {
  const [currentEffect, setCurrentEffect] = useState<MonitorEffect>('none');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: Hydration pattern for SSR compatibility
    setMounted(true);

    // Load saved effect (default to 'none' - clean display)
    const saved = (localStorage.getItem('monitor-effect') as MonitorEffect) || 'none';
    setCurrentEffect(saved);
    document.documentElement.setAttribute('data-monitor-effect', saved);
  }, []);

  const handleChange = (effectId: MonitorEffect) => {
    setCurrentEffect(effectId);
    localStorage.setItem('monitor-effect', effectId);
    document.documentElement.setAttribute('data-monitor-effect', effectId);
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className={mode.radius}
        disabled
        aria-label="Loading effects"
      >
        <Monitor className="h-4 w-4" />
      </Button>
    );
  }

  const currentEffectName = effects.find((e) => e.id === currentEffect)?.name || 'No Effects';

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn('gap-2', mode.radius)}
          aria-label={`Change monitor effect, current: ${currentEffectName}`}
        >
          <Monitor className="h-4 w-4" />
          <span className="hidden sm:inline">{currentEffectName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn('w-56', mode.radius)}>
        {effects.map((effect) => (
          <DropdownMenuItem
            key={effect.id}
            onClick={() => handleChange(effect.id)}
            className={cn(
              'flex flex-col items-start',
              currentEffect === effect.id && 'bg-primary text-primary-foreground'
            )}
          >
            <div className="flex w-full items-center justify-between">
              <span className="font-semibold">{effect.name}</span>
              {currentEffect === effect.id && <span className="text-xs">✓</span>}
            </div>
            <span className="text-xs opacity-70">{effect.description}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
