/**
 * ✅ FABRK COMPONENT
 * Monitor effects picker dropdown for navbar (Retro/CRT presets)
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
import { useThemeContext } from '@/design-system/providers';

// Consolidated Retro Presets
const effects = [
  { id: 'none', name: 'Clean', description: 'No effects' },
  { id: 'crt', name: 'CRT Monitor', description: 'Scanlines, glow, flicker' },
  { id: 'lcd', name: 'LCD Handheld', description: 'Pixel grid, no glow' },
  { id: 'vhs', name: 'VHS Glitch', description: 'Tracking error, noise' },
] as const;

export type MonitorEffect = (typeof effects)[number]['id'];

export function MonitorEffectsDropdown() {
  const { setColorTheme } = useThemeContext();
  const [activeEffect, setActiveEffect] = useState<MonitorEffect>('none');
  const [mounted, setMounted] = useState(false);

  const applyEffect = (effectId: MonitorEffect) => {
    // Remove all existing effect classes
    effects.forEach((e) => {
      document.documentElement.classList.remove(`effect-${e.id}`);
    });

    // Add new effect class (if not none)
    if (effectId !== 'none') {
      document.documentElement.classList.add(`effect-${effectId}`);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    // Load saved effect
    const saved = localStorage.getItem('monitor-preset') as MonitorEffect;
    if (saved && effects.some((e) => e.id === saved)) {
      setActiveEffect(saved);
      applyEffect(saved);
    } else {
      setActiveEffect('none');
    }
  }, []);

  const handleSelect = (effectId: MonitorEffect) => {
    setActiveEffect(effectId);
    applyEffect(effectId);
    localStorage.setItem('monitor-preset', effectId);

    // Auto-switch theme based on effect (Soft Link)
    // User can still manually change theme afterwards
    switch (effectId) {
      case 'lcd':
        setColorTheme('gameboy'); // Authentic green dot matrix
        break;
      case 'crt':
        setColorTheme('green'); // Classic green phosphor
        break;
      case 'vhs':
        setColorTheme('blue'); // VCR OSD blue
        break;
      default:
        // Don't change theme for 'Clean' or unknown
        break;
    }
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className={mode.radius} disabled>
        <Monitor className="h-4 w-4" />
      </Button>
    );
  }

  const activeLabel = effects.find((e) => e.id === activeEffect)?.name || 'Clean';

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn('gap-2', mode.radius)}
          aria-label={`Display Mode: ${activeLabel}`}
        >
          <Monitor className="h-4 w-4" />
          <span className="hidden sm:inline">{activeLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn('w-48', mode.radius)}>
        <div className="border-border mb-2 border-b px-2 py-1.5">
          <span className="text-muted-foreground font-mono text-xs">[DISPLAY MODE]</span>
        </div>
        {effects.map((effect) => (
          <DropdownMenuItem
            key={effect.id}
            onClick={() => handleSelect(effect.id)}
            className="flex cursor-pointer flex-col items-start"
          >
            <div className="flex w-full items-center justify-between">
              <span className="font-semibold">{effect.name}</span>
              {activeEffect === effect.id && <span className="text-xs">✓</span>}
            </div>
            <span className="text-xs opacity-70">{effect.description}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
