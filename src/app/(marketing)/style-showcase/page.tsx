'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { FuiCard } from '@/components/ui/fui-card';
import { useThemeContext, type ColorThemeName } from '@/design-system/providers';

// Landing page section imports
import { HeroSection } from '@/components/marketing/hero-section';
import { FeaturesShowcase } from '@/components/marketing/features-showcase';
import { StatsSection } from '@/components/marketing/stats-section';
import { PricingSection } from '@/components/marketing/pricing-section';
import { FAQSection } from '@/components/marketing/faq-section';
import { TechStack } from '@/components/marketing/tech-stack';

const STYLES = [
  { id: 'star-nav', name: 'Star Nav', cat: 'Fantasy', desc: 'Heavy Structural Dashboard' },
  { id: 'milano', name: 'Milano', cat: 'Fantasy', desc: 'Advanced Technical' },
  { id: 'collector', name: 'Collector', cat: 'Fantasy', desc: 'Luxury Magenta' },
  { id: 'life-hutch', name: 'Life Hutch', cat: 'Fantasy', desc: 'Gritty Technical' },
  { id: 'blade-runner', name: 'Blade Runner', cat: 'Fantasy', desc: 'Neon Noir' },
  { id: 'ghost-shell', name: 'Ghost Shell', cat: 'Fantasy', desc: 'Cybernetic' },
  { id: 'jarvis', name: 'Jarvis', cat: 'Fantasy', desc: 'Holographic Blue' },
  { id: 'alien', name: 'Alien', cat: 'Fantasy', desc: 'Retro Green CRT' },
  { id: 'oblivion', name: 'Oblivion', cat: 'Fantasy', desc: 'Technical HUD' },
  { id: 'iron-man', name: 'Iron Man', cat: 'Fantasy', desc: 'Stark HUD' },
  { id: 'tron', name: 'Tron', cat: 'Fantasy', desc: 'The Grid' },
  { id: 'mass-effect', name: 'Mass Effect', cat: 'Fantasy', desc: 'Omni-Tool' },
  { id: 'wakanda', name: 'Wakanda', cat: 'Fantasy', desc: 'Vibranium Tech' },
  { id: 'interstellar', name: 'Interstellar', cat: 'Fantasy', desc: 'NASA Minimal' },
  { id: 'none', name: 'None', cat: 'Standard', desc: 'No FUI Overlay' },
];

const THEMES = [
  { id: 'milano', name: 'Milano' },
  { id: 'collector', name: 'Collector' },
  { id: 'life-hutch', name: 'Life Hutch' },
  { id: 'blue', name: 'Blue CRT' },
  { id: 'green', name: 'Green CRT' },
  { id: 'amber', name: 'Amber CRT' },
  { id: 'red', name: 'Red CRT' },
  { id: 'purple', name: 'Purple CRT' },
  { id: 'bw', name: 'Black & White' },
];

const generateStyleCSS = (styleId: string): string => {
  const fonts: Record<string, string> = {
    'star-nav': '"Rajdhani", sans-serif',
    'milano': '"Rajdhani", sans-serif',
    'collector': '"Major Mono Display", monospace',
    'life-hutch': '"Share Tech Mono", monospace',
    'blade-runner': '"Orbitron", sans-serif',
    'ghost-shell': '"Major Mono Display", monospace',
    'jarvis': '"Orbitron", sans-serif',
    'alien': '"VT323", monospace',
    'oblivion': '"Nova Mono", monospace',
    'iron-man': '"Orbitron", sans-serif',
    'tron': '"Orbitron", sans-serif',
    'mass-effect': '"Orbitron", sans-serif',
    'wakanda': '"Rajdhani", sans-serif',
    'interstellar': '"IBM Plex Mono", monospace',
  };

  const selectedFont = fonts[styleId] || '"JetBrains Mono", monospace';
  
  return `
    [data-fui-style="${styleId}"], 
    [data-fui-style="${styleId}"] *,
    [data-fui-style="${styleId}"] [data-slot] { 
      font-family: ${selectedFont} !important; 
    }
    [data-fui-style="${styleId}"] {
      --font-mono: ${selectedFont} !important;
      --font-sans: ${selectedFont} !important;
    }
  `;
};

export default function StyleShowcasePage() {
  const { colorTheme, setColorTheme } = useThemeContext();
  const [style, setStyle] = useState('star-nav');

  const renderWrapped = (Component: React.ComponentType, title: string) => {
    if (style !== 'none') {
      const isStarNav = style === 'star-nav';
      const isBladeRunner = style === 'blade-runner';
      const isGhostShell = style === 'ghost-shell';
      
      return (
        <FuiCard 
          title={title} 
          className="mb-12" 
          meta={`NODE_0x${style.substring(0,2).toUpperCase()}`}
          variant={isStarNav || isBladeRunner || isGhostShell ? 'solid' : 'heavy'}
        >
          <Component />
        </FuiCard>
      );
    }
    return <Component />;
  };

  return (
    <div data-theme={colorTheme} data-fui={style} data-fui-style={style} className="min-h-screen bg-background text-foreground relative overflow-hidden transition-colors duration-500">
      <link
        href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&family=Nova+Mono&family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&family=VT323&display=swap"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: generateStyleCSS(style) }} />

      {/* Control Panel */}
      <div className="sticky top-0 z-[110] border-b-2 px-4 py-2 flex flex-col gap-1 border-accent/30 bg-background/95 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-accent px-2 py-0.5 text-[10px] font-black text-background uppercase tracking-tighter">FUI Showcase</div>
            <div className="size-2 bg-accent rounded-full animate-pulse shadow-[0_0_8px_var(--accent)]" />
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col">
              <label htmlFor="fui-structure-select" className="text-[7px] text-accent/60 font-bold uppercase tracking-[0.2em] mb-0.5">Structure</label>
              <select id="fui-structure-select" aria-label="Select FUI structure style" value={style} onChange={(e) => setStyle(e.target.value)} className="bg-background border border-accent/50 text-[10px] text-accent p-1 outline-none font-bold uppercase">
                {STYLES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="fui-palette-select" className="text-[7px] text-accent/60 font-bold uppercase tracking-[0.2em] mb-0.5">Palette</label>
              <select id="fui-palette-select" aria-label="Select color palette" value={colorTheme} onChange={(e) => setColorTheme(e.target.value as ColorThemeName)} className="bg-background border border-accent/50 text-[10px] text-accent p-1 outline-none font-bold uppercase">
                {THEMES.map(t => <option key={t.id} value={t.id as ColorThemeName}>{t.name}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        {renderWrapped(HeroSection, 'HERO_INIT')}
        {renderWrapped(FeaturesShowcase, 'BENEFITS_MODULE')}
        {renderWrapped(StatsSection, 'METRICS_READOUT')}
        {renderWrapped(TechStack, 'STACK_VALIDATION')}
        {renderWrapped(PricingSection, 'COMMERCE_PROTOCOL')}
        {renderWrapped(FAQSection, 'KNOWLEDGE_BASE')}
      </div>
    </div>
  );
}