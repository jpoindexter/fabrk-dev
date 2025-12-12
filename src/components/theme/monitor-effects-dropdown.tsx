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
  const [selectedEffects, setSelectedEffects] = useState<Set<MonitorEffect>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: Hydration pattern for SSR compatibility
    setMounted(true);

    // Load saved effects (default to empty set - no effects)
    const saved = localStorage.getItem('monitor-effects');
    const effectsArray: MonitorEffect[] = saved ? JSON.parse(saved) : [];
    const effectsSet = new Set(effectsArray);
    setSelectedEffects(effectsSet);

    // Apply all selected effects as CSS classes
    effectsArray.forEach((effect) => {
      document.documentElement.classList.add(`effect-${effect}`);
    });
  }, []);

  const toggleEffect = (effectId: MonitorEffect) => {
    const newEffects = new Set(selectedEffects);

    if (effectId === 'none') {
      // Clear all effects
      newEffects.clear();
      // Remove all effect classes
      effects.forEach((e) => {
        document.documentElement.classList.remove(`effect-${e.id}`);
      });
    } else {
      if (newEffects.has(effectId)) {
        newEffects.delete(effectId);
        document.documentElement.classList.remove(`effect-${effectId}`);
      } else {
        newEffects.add(effectId);
        newEffects.delete('none'); // Remove 'none' if other effects are selected
        document.documentElement.classList.add(`effect-${effectId}`);
        document.documentElement.classList.remove('effect-none');
      }
    }

    setSelectedEffects(newEffects);
    localStorage.setItem('monitor-effects', JSON.stringify(Array.from(newEffects)));
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

  const activeCount = selectedEffects.size;
  const label =
    activeCount === 0 ? 'No Effects' : `${activeCount} Effect${activeCount > 1 ? 's' : ''}`;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn('gap-2', mode.radius)}
          aria-label={`Monitor effects: ${label}`}
        >
          <Monitor className="h-4 w-4" />
          <span className="hidden sm:inline">{label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn('w-56', mode.radius)}>
        <div className="border-border mb-2 border-b px-2 py-1.5">
          <span className="text-muted-foreground font-mono text-xs">[MULTI-SELECT]</span>
        </div>
        {effects.map((effect) => (
          <DropdownMenuItem
            key={effect.id}
            onClick={(e) => {
              e.preventDefault();
              toggleEffect(effect.id);
            }}
            className="flex cursor-pointer flex-col items-start"
          >
            <div className="flex w-full items-center justify-between">
              <span className="font-semibold">{effect.name}</span>
              {selectedEffects.has(effect.id) && <span className="text-xs">✓</span>}
            </div>
            <span className="text-xs opacity-70">{effect.description}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
