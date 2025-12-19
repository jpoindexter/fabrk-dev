'use client';

import { useState } from 'react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// Import actual landing page data
import { CORE_BENEFITS } from '@/data/landing/benefits';
import { USE_CASES } from '@/data/landing/use-cases';
import { TESTIMONIALS } from '@/data/landing/testimonials';
import { INCLUDED_FEATURES } from '@/data/landing/included-features';
import { PRICING } from '@/data/landing/pricing';
import { STATS } from '@/data/landing/stats';
import { FAQ_QUESTIONS } from '@/data/landing/faq';

type Style = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

const STYLES: { id: Style; name: string }[] = [
  { id: 'A', name: 'Module' },
  { id: 'B', name: 'SysView' },
  { id: 'C', name: 'Status' },
  { id: 'D', name: 'Corners' },
  { id: 'E', name: 'LeftBar' },
  { id: 'F', name: 'TopBar' },
  { id: 'G', name: 'Double' },
  { id: 'H', name: 'Footer' },
  { id: 'I', name: 'Bracket' },
  { id: 'J', name: 'Slash' },
  { id: 'K', name: 'Chevron' },
  { id: 'L', name: 'Glow' },
  { id: 'M', name: 'Scan' },
  { id: 'N', name: 'Ticker' },
  { id: 'O', name: 'HUD' },
  { id: 'P', name: 'SysDir' },
  { id: 'Q', name: 'Terminal' },
  { id: 'R', name: 'DataCell' },
  { id: 'S', name: 'Status' },
  { id: 'T', name: 'Panel' },
  { id: 'U', name: 'Window' },
  { id: 'V', name: 'TabWin' },
  { id: 'W', name: 'Frame' },
  { id: 'X', name: 'CodePanel' },
  { id: 'Y', name: 'IndexTile' },
  { id: 'Z', name: 'StatusRow' },
  // Numbered styles - FUI aesthetic, visually distinct
  { id: '0', name: 'Split' },
  { id: '1', name: 'Inset' },
  { id: '2', name: 'SideBar' },
  { id: '3', name: 'TopHeavy' },
  { id: '4', name: 'Notch' },
  { id: '5', name: 'Outline' },
  { id: '6', name: 'Stripe' },
  { id: '7', name: 'Tabs' },
  { id: '8', name: 'Minimal' },
  { id: '9', name: 'Full' },
];

export default function StyleShowcasePage() {
  const [style, setStyle] = useState<Style>('D');

  // Card wrapper based on style
  const Card = ({ children, label }: { children: React.ReactNode; label: string }) => {
    switch (style) {
      case 'A': // MODULE. style header
        return (
          <div className={cn('border', mode.color.border.default)}>
            <div className={cn('flex items-center gap-1 border-b px-4 py-2', mode.color.border.default)}>
              <span className={cn('text-[10px] uppercase tracking-widest', mode.font, mode.color.text.accent)}>{label}.</span>
            </div>
            <div className="p-4">{children}</div>
          </div>
        );
      case 'B': // DATA. VIEW. style dual label
        return (
          <div className={cn('border', mode.color.border.default)}>
            <div className={cn('flex items-center justify-between border-b px-4 py-2', mode.color.border.default)}>
              <div className={cn('flex items-center gap-2 text-[9px] uppercase tracking-widest', mode.font)}>
                <span className={mode.color.text.muted}>SYS.</span>
                <span className={mode.color.text.accent}>{label.slice(0,3).toUpperCase()}</span>
              </div>
            </div>
            <div className="p-4">{children}</div>
          </div>
        );
      case 'C': // Status dot + label
        return (
          <div className={cn('border', mode.color.border.default)}>
            <div className={cn('flex items-center gap-2 border-b px-4 py-2', mode.color.border.default)}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
              <span className={cn('text-[10px] uppercase tracking-widest', mode.font, mode.color.text.muted)}>{label}</span>
            </div>
            <div className="p-4">{children}</div>
          </div>
        );
      case 'D': // Corner L-brackets
        return (
          <div className={cn('relative border p-4', mode.color.border.default)}>
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-px -left-px h-4 w-4 border-t-2 border-l-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute -top-px -right-px h-4 w-4 border-t-2 border-r-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2" style={{ borderColor: 'var(--accent)' }} />
            </div>
            <div className={cn('mb-3 text-[10px] uppercase tracking-widest', mode.font, mode.color.text.muted)}>{label}</div>
            {children}
          </div>
        );
      case 'E': // Left accent border
        return (
          <div className="border-l-2" style={{ borderLeftColor: 'var(--accent)' }}>
            <div className={cn('border-y border-r p-4', mode.color.border.default)}>
              <div className={cn('mb-3 text-[10px] uppercase tracking-widest', mode.font, mode.color.text.muted)}>{label}</div>
              {children}
            </div>
          </div>
        );
      case 'F': // Top accent bar
        return (
          <div className={cn('border', mode.color.border.default)}>
            <div className="h-1" style={{ backgroundColor: 'var(--accent)' }} />
            <div className="p-4">
              <div className={cn('mb-3 text-[10px] uppercase tracking-widest', mode.font, mode.color.text.muted)}>{label}</div>
              {children}
            </div>
          </div>
        );
      case 'G': // Inset double frame
        return (
          <div className={cn('border p-1', mode.color.border.default)}>
            <div className={cn('border p-4', mode.color.border.default)}>
              <div className={cn('mb-3 text-[10px] uppercase tracking-widest', mode.font, mode.color.text.muted)}>{label}</div>
              {children}
            </div>
          </div>
        );
      case 'H': // Header + footer bars
        return (
          <div className={cn('border', mode.color.border.default)}>
            <div className={cn('border-b px-4 py-2', mode.color.border.default)}>
              <span className={cn('text-[10px] uppercase tracking-widest', mode.font, mode.color.text.muted)}>{label}</span>
            </div>
            <div className="p-4">{children}</div>
            <div className={cn('border-t px-4 py-1.5', mode.color.border.default)}>
              <span className={cn('text-[8px] uppercase tracking-widest', mode.font, mode.color.text.accent)}>SYS.READY</span>
            </div>
          </div>
        );
      case 'I': // Bracket prefix label
        return (
          <div className={cn('border p-4', mode.color.border.default)}>
            <div className={cn('mb-3 flex items-center gap-1 text-[10px] uppercase tracking-widest', mode.font)}>
              <span className={mode.color.text.accent}>[</span>
              <span className={mode.color.text.muted}>{label}</span>
              <span className={mode.color.text.accent}>]</span>
            </div>
            {children}
          </div>
        );
      case 'J': // Slash prefix label
        return (
          <div className={cn('border p-4', mode.color.border.default)}>
            <div className={cn('mb-3 text-[10px] uppercase tracking-widest', mode.font)}>
              <span className={mode.color.text.accent}>/</span>
              <span className={mode.color.text.muted}> {label}</span>
            </div>
            {children}
          </div>
        );
      case 'K': // Chevron prefix
        return (
          <div className={cn('border p-4', mode.color.border.default)}>
            <div className={cn('mb-3 text-[10px] uppercase tracking-widest', mode.font)}>
              <span className={mode.color.text.accent}>&gt;</span>
              <span className={mode.color.text.muted}> {label}</span>
            </div>
            {children}
          </div>
        );
      case 'L': // Subtle glow border
        return (
          <div className={cn('border p-4', mode.color.border.default)} style={{ boxShadow: '0 0 20px rgba(var(--accent-rgb, 0,0,0), 0.15)' }}>
            <div className={cn('mb-3 text-[10px] uppercase tracking-widest', mode.font, mode.color.text.muted)}>{label}</div>
            {children}
          </div>
        );
      case 'M': // Underline label
        return (
          <div className={cn('border p-4', mode.color.border.default)}>
            <div className={cn('mb-3 border-b pb-2', mode.color.border.default)}>
              <span className={cn('text-[10px] uppercase tracking-widest', mode.font, mode.color.text.muted)}>{label}</span>
            </div>
            {children}
          </div>
        );
      case 'N': // Ticker
        return (
          <div className={cn('border', mode.color.border.default)}>
            <div className={cn('flex items-center gap-2 border-b px-3 py-1.5', mode.color.border.default)}>
              <span className={cn('text-[10px]', mode.font, mode.color.text.accent)}>▶</span>
              <span className={cn('text-[10px] uppercase tracking-widest', mode.font, mode.color.text.muted)}>{label}</span>
              <span className={cn('ml-auto text-[10px] tabular-nums', mode.font, mode.color.text.muted)}>
                {new Date().toLocaleTimeString('en-US', { hour12: false })}
              </span>
            </div>
            <div className="p-4">{children}</div>
          </div>
        );
      case 'O': // HUD - targeting reticle
        return (
          <div className={cn('relative border p-4', mode.color.border.default)}>
            {/* Corner targeting marks */}
            <div className="pointer-events-none absolute inset-0">
              <div className={cn('absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2', mode.color.text.accent)} />
              <div className={cn('absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2', mode.color.text.accent)} />
              <div className={cn('absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2', mode.color.text.accent)} />
              <div className={cn('absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2', mode.color.text.accent)} />
            </div>
            <div className={cn('mb-2 flex items-center gap-2 text-[10px] uppercase', mode.font)}>
              <span className={mode.color.text.accent}>[</span>
              <span className={mode.color.text.muted}>{label}</span>
              <span className={mode.color.text.accent}>]</span>
            </div>
            {children}
          </div>
        );
      case 'P': // SysDir - like "SYS:\ DIR" header with status dot
        return (
          <div className={cn('border', mode.color.border.default)}>
            <div className={cn('flex items-center justify-between border-b px-3 py-1.5', mode.color.border.default)}>
              <div className={cn('flex items-center gap-2 text-[10px] uppercase', mode.font)}>
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span className={mode.color.text.accent}>{label}</span>
              </div>
              <div className={cn('flex gap-1 text-[8px]', mode.font, mode.color.text.muted)}>
                <span>EDIT</span>
                <span>·</span>
                <span>EXPORT</span>
              </div>
            </div>
            <div className="p-4">{children}</div>
            <div className={cn('flex items-center justify-between border-t px-3 py-1', mode.color.border.default)}>
              <span className={cn('text-[9px]', mode.font, mode.color.text.accent)}>\DF.93</span>
              <span className={cn('text-[9px]', mode.font, mode.color.text.muted)}>Layer 01</span>
            </div>
          </div>
        );
      case 'Q': // Terminal - backslash code style
        return (
          <div className={cn('border bg-card/50 p-4', mode.color.border.default)}>
            <div className={cn('mb-3 flex items-center gap-3 text-[10px]', mode.font)}>
              <span className={mode.color.text.accent}>\{label.slice(0, 2).toUpperCase()}.{Math.floor(Math.random() * 99).toString().padStart(2, '0')}</span>
              <div className="h-px flex-1 bg-border" />
              <span className={mode.color.text.muted}>SYS</span>
            </div>
            {children}
          </div>
        );
      case 'R': // DataCell - numeric grid style
        return (
          <div className={cn('border', mode.color.border.default)}>
            <div className={cn('border-b px-2 py-1', mode.color.border.default)}>
              <span className={cn('text-[8px] uppercase tracking-widest', mode.font, mode.color.text.muted)}>{label}</span>
            </div>
            <div className="p-3">
              {children}
            </div>
            <div className={cn('flex justify-end border-t px-2 py-1', mode.color.border.default)}>
              <span className={cn('text-[8px] tabular-nums', mode.font, mode.color.text.accent)}>
                {String(Math.floor(Math.random() * 999)).padStart(3, '0')}
              </span>
            </div>
          </div>
        );
      case 'S': // Status - with loading bar
        return (
          <div className={cn('border p-4', mode.color.border.default)}>
            <div className={cn('mb-3 flex items-center justify-between text-[10px]', mode.font)}>
              <span className={mode.color.text.muted}>{label}</span>
              <span className={mode.color.text.accent}>34%</span>
            </div>
            <div className={cn('mb-4 h-0.5 w-full overflow-hidden', mode.color.border.default)} style={{ backgroundColor: 'var(--muted)' }}>
              <div className="h-full w-1/3" style={{ backgroundColor: 'var(--accent)' }} />
            </div>
            {children}
          </div>
        );
      case 'T': // Panel - full HUD XT2 style with corner accents
        return (
          <div className={cn('relative border', mode.color.border.default)}>
            {/* Corner accents */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-0 left-0 h-2 w-6 border-t border-l" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute top-0 left-0 h-6 w-2 border-t border-l" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute top-0 right-0 h-2 w-6 border-t border-r" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute top-0 right-0 h-6 w-2 border-t border-r" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute bottom-0 left-0 h-2 w-6 border-b border-l" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute bottom-0 left-0 h-6 w-2 border-b border-l" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute bottom-0 right-0 h-2 w-6 border-b border-r" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute bottom-0 right-0 h-6 w-2 border-b border-r" style={{ borderColor: 'var(--accent)' }} />
            </div>
            {/* Header */}
            <div className={cn('flex items-center gap-2 border-b px-4 py-2', mode.color.border.default)}>
              <span className={cn('text-xs font-medium', mode.font, mode.color.text.accent)}>{label}</span>
              <span className="h-1 w-1 rounded-full bg-red-500" />
            </div>
            {/* Content */}
            <div className="p-4">{children}</div>
          </div>
        );
      case 'U': // Window - HUD XT2 full window chrome
        return (
          <div className={cn('relative border', mode.color.border.default)}>
            {/* Corner L-brackets */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-px -left-px h-3 w-8 border-t-2 border-l-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute -top-px -left-px h-8 w-3 border-t-2 border-l-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute -top-px -right-px h-3 w-8 border-t-2 border-r-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute -top-px -right-px h-8 w-3 border-t-2 border-r-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute -bottom-px -left-px h-3 w-8 border-b-2 border-l-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute -bottom-px -left-px h-8 w-3 border-b-2 border-l-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute -bottom-px -right-px h-3 w-8 border-b-2 border-r-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute -bottom-px -right-px h-8 w-3 border-b-2 border-r-2" style={{ borderColor: 'var(--accent)' }} />
            </div>
            {/* Title bar */}
            <div className={cn('flex items-center justify-between border-b px-3 py-1.5', mode.color.border.default)}>
              <div className={cn('flex items-center gap-2', mode.font)}>
                <span className={cn('text-xs font-medium', mode.color.text.accent)}>{label}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              </div>
              <div className={cn('flex gap-3 text-[9px]', mode.color.text.muted)}>
                <span>FILE</span>
                <span>EDIT</span>
                <span>VIEW</span>
              </div>
            </div>
            {/* Content */}
            <div className="p-4">{children}</div>
            {/* Status bar */}
            <div className={cn('flex items-center justify-between border-t px-3 py-1', mode.color.border.default)}>
              <span className={cn('text-[9px]', mode.font, mode.color.text.accent)}>\{label.slice(0,2).toUpperCase()}.{Math.floor(Math.random()*99).toString().padStart(2,'0')}</span>
              <span className={cn('text-[9px]', mode.font, mode.color.text.muted)}>Layer 01</span>
            </div>
          </div>
        );
      case 'V': // TabWin - window with bottom tabs
        return (
          <div className={cn('border', mode.color.border.default)}>
            {/* Header */}
            <div className={cn('flex items-center justify-between border-b px-3 py-1.5', mode.color.border.default)}>
              <div className={cn('flex items-center gap-2', mode.font)}>
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span className={cn('text-xs', mode.color.text.accent)}>{label}</span>
              </div>
              <div className={cn('flex gap-1', mode.font)}>
                <span className={cn('border px-1.5 py-0.5 text-[8px]', mode.color.border.default, mode.color.text.muted)}>−</span>
                <span className={cn('border px-1.5 py-0.5 text-[8px]', mode.color.border.default, mode.color.text.muted)}>□</span>
                <span className={cn('border px-1.5 py-0.5 text-[8px]', mode.color.border.default, mode.color.text.muted)}>×</span>
              </div>
            </div>
            {/* Content */}
            <div className="p-4">{children}</div>
            {/* Tab bar */}
            <div className={cn('flex border-t', mode.color.border.default)}>
              {['MODE 01', 'MODE 02', 'MODE 03'].map((tab, i) => (
                <div
                  key={tab}
                  className={cn(
                    'flex-1 border-r px-2 py-1.5 text-center text-[9px]',
                    mode.color.border.default,
                    mode.font,
                    i === 0 ? mode.color.text.accent : mode.color.text.muted
                  )}
                >
                  {tab}
                </div>
              ))}
            </div>
          </div>
        );
      case 'W': // Frame - corner brackets + header with status + footer
        return (
          <div className={cn('relative border', mode.color.border.default)}>
            {/* Corner L-brackets */}
            <div className="pointer-events-none absolute -inset-px">
              <div className="absolute top-0 left-0 h-3 w-6 border-t-2 border-l-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute top-0 left-0 h-6 w-3 border-t-2 border-l-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute top-0 right-0 h-3 w-6 border-t-2 border-r-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute top-0 right-0 h-6 w-3 border-t-2 border-r-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute bottom-0 left-0 h-3 w-6 border-b-2 border-l-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute bottom-0 left-0 h-6 w-3 border-b-2 border-l-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute bottom-0 right-0 h-3 w-6 border-b-2 border-r-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute bottom-0 right-0 h-6 w-3 border-b-2 border-r-2" style={{ borderColor: 'var(--accent)' }} />
            </div>
            {/* Header */}
            <div className={cn('flex items-center justify-between border-b px-4 py-2', mode.color.border.default)}>
              <div className={cn('flex items-center gap-2', mode.font)}>
                <span className={cn('text-[10px] uppercase tracking-widest', mode.color.text.accent)}>{label}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              </div>
              <div className={cn('flex gap-3 text-[9px] uppercase tracking-wide', mode.color.text.muted)}>
                <span>FILE</span>
                <span>VIEW</span>
              </div>
            </div>
            {/* Content */}
            <div className="p-4">{children}</div>
            {/* Footer */}
            <div className={cn('flex items-center justify-between border-t px-4 py-1.5', mode.color.border.default)}>
              <span className={cn('text-[9px] uppercase tracking-wide', mode.font, mode.color.text.muted)}>SYS.READY</span>
              <span className={cn('text-[9px] tabular-nums', mode.font, mode.color.text.accent)}>01</span>
            </div>
          </div>
        );
      case 'X': // CodePanel - "CODE. E" style with DATA.VIEW.PR header
        return (
          <div className={cn('border', mode.color.border.default)}>
            {/* Header bar */}
            <div className={cn('flex items-center justify-between border-b px-3 py-1', mode.color.border.default)}>
              <div className={cn('flex items-center gap-4 text-[8px]', mode.font)}>
                <span className={mode.color.text.muted}>DATA. VIEW.</span>
                <span className={mode.color.text.accent}>PR</span>
              </div>
              <div className={cn('flex items-center gap-3 text-[8px]', mode.font)}>
                <span className={mode.color.text.muted}>READ.</span>
                <span className={mode.color.text.accent}>WRITE</span>
                <span className={mode.color.text.muted}>X + Y</span>
              </div>
            </div>
            {/* Title */}
            <div className={cn('flex items-center gap-2 border-b px-3 py-2', mode.color.border.default)}>
              <span className={cn('text-xs', mode.font, mode.color.text.accent)}>CODE.</span>
              <span className={cn('text-xs', mode.font, mode.color.text.primary)}>{label.charAt(0).toUpperCase()}</span>
            </div>
            {/* Content */}
            <div className="p-3">{children}</div>
          </div>
        );
      case 'Y': // IndexTile - "A 01" style tiles with INDEX label
        return (
          <div className={cn('border', mode.color.border.default)}>
            <div className="flex items-center">
              {/* Large index */}
              <div className={cn('flex h-full flex-col items-center justify-center border-r px-4 py-3', mode.color.border.default)}>
                <span className={cn('text-xl font-medium', mode.font, mode.color.text.accent)}>
                  {label.slice(0, 2).toUpperCase()}
                </span>
              </div>
              {/* Info section */}
              <div className="flex-1 px-3 py-2">
                <div className={cn('mb-1 flex items-center gap-3 text-[8px]', mode.font)}>
                  <span className={cn('border px-1.5 py-0.5', mode.color.border.default, mode.color.text.accent)}>DSX</span>
                  <span className={mode.color.text.muted}>37 MB</span>
                  <span className={mode.color.text.muted}>77 GB</span>
                </div>
                <div className={cn('text-[9px]', mode.font, mode.color.text.muted)}>
                  {children}
                </div>
              </div>
              {/* Right label */}
              <div className={cn('border-l px-3 py-2 text-center', mode.color.border.default)}>
                <div className={cn('text-[8px]', mode.font, mode.color.text.muted)}>INDEX</div>
              </div>
            </div>
            <div className={cn('border-t px-3 py-1 text-[8px]', mode.color.border.default, mode.font, mode.color.text.muted)}>
              CONN. TYPE
            </div>
          </div>
        );
      case 'Z': // StatusRow - SPL-1 | 425 PR | status | ACTIVE/RESET style
        return (
          <div className={cn('border', mode.color.border.default)}>
            <div className={cn('border-b px-3 py-1.5', mode.color.border.default)}>
              <span className={cn('text-[9px] uppercase', mode.font, mode.color.text.muted)}>{label}</span>
            </div>
            <div className="p-3">{children}</div>
            {/* Status rows */}
            <div className={cn('border-t', mode.color.border.default)}>
              {[
                { id: 'SPL-1', code: '425 PR', status: 'CLEANED CLUSTER', state: 'RESET' },
                { id: 'SPL-2', code: '421 PR', status: 'IN IDLE...', state: 'ACTIVE' },
              ].map((row) => (
                <div key={row.id} className={cn('flex items-center border-b px-2 py-1 text-[8px] last:border-b-0', mode.color.border.default, mode.font)}>
                  <span className={cn('w-12', mode.color.text.muted)}>{row.id}</span>
                  <span className={cn('w-14 border px-1', mode.color.border.default, mode.color.text.accent)}>{row.code}</span>
                  <span className={cn('flex-1 px-2', mode.color.text.muted)}>{row.status}</span>
                  <span className={cn('px-2 py-0.5', row.state === 'ACTIVE' ? 'bg-green-500/20 text-green-400' : 'text-muted-foreground')}>
                    {row.state}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      // ═══════════════════════════════════════════════════════════════════════
      // NUMBERED STYLES (0-9) - Visually distinct FUI layouts
      // ═══════════════════════════════════════════════════════════════════════

      case '0': // Split - header split into two equal columns
        return (
          <div className={cn('border', mode.color.border.default)}>
            <div className={cn('grid grid-cols-2 divide-x border-b', mode.color.border.default)}>
              <div className="px-4 py-2">
                <span className={cn('text-[10px] uppercase tracking-widest', mode.font, mode.color.text.accent)}>{label}</span>
              </div>
              <div className="flex items-center justify-end gap-2 px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span className={cn('text-[9px] uppercase', mode.font, mode.color.text.muted)}>ONLINE</span>
              </div>
            </div>
            <div className="p-4">{children}</div>
            <div className={cn('grid grid-cols-2 divide-x border-t', mode.color.border.default)}>
              <div className="px-4 py-1.5">
                <span className={cn('text-[9px] uppercase', mode.font, mode.color.text.muted)}>SYS</span>
              </div>
              <div className="px-4 py-1.5 text-right">
                <span className={cn('text-[9px] tabular-nums', mode.font, mode.color.text.accent)}>001</span>
              </div>
            </div>
          </div>
        );

      case '1': // Inset - double border with inset content
        return (
          <div className="border-2 p-1" style={{ borderColor: 'var(--accent)' }}>
            <div className={cn('border', mode.color.border.default)}>
              <div className={cn('border-b px-4 py-2', mode.color.border.default)}>
                <span className={cn('text-[10px] uppercase tracking-widest', mode.font, mode.color.text.muted)}>{label}</span>
              </div>
              <div className="p-4">{children}</div>
              <div className={cn('border-t px-4 py-1.5', mode.color.border.default)}>
                <span className={cn('text-[9px] uppercase', mode.font, mode.color.text.accent)}>SYS.READY</span>
              </div>
            </div>
          </div>
        );

      case '2': // SideBar - thick left sidebar with label
        return (
          <div className={cn('flex border', mode.color.border.default)}>
            {/* Left sidebar */}
            <div className="flex w-10 flex-col items-center justify-between border-r py-3" style={{ backgroundColor: 'var(--accent)', opacity: 0.1 }}>
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
              <div className={cn('text-[8px] uppercase tracking-widest', mode.font, mode.color.text.accent)} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                {label.slice(0, 8)}
              </div>
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
            </div>
            {/* Content */}
            <div className="flex-1">
              <div className={cn('border-b px-4 py-2', mode.color.border.default)}>
                <span className={cn('text-[10px] uppercase tracking-widest', mode.font, mode.color.text.muted)}>{label}</span>
              </div>
              <div className="p-4">{children}</div>
            </div>
          </div>
        );

      case '3': // TopHeavy - large accent header area
        return (
          <div className={cn('border', mode.color.border.default)}>
            {/* Large header */}
            <div className="relative border-b p-6" style={{ backgroundColor: 'rgba(var(--accent-rgb, 128,128,128), 0.05)' }}>
              <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-green-500" />
              <span className={cn('text-sm uppercase tracking-widest', mode.font, mode.color.text.accent)}>{label}</span>
              <div className={cn('mt-1 text-[9px] uppercase', mode.font, mode.color.text.muted)}>MODULE.ACTIVE</div>
            </div>
            <div className="p-4">{children}</div>
          </div>
        );

      case '4': // Notch - cut corners effect
        return (
          <div className={cn('relative border', mode.color.border.default)}>
            {/* Corner notches */}
            <div className="pointer-events-none absolute inset-0">
              {/* Top-left notch */}
              <div className="absolute -top-px -left-px h-4 w-4 border-b border-r bg-background" style={{ borderColor: 'var(--accent)' }} />
              {/* Top-right notch */}
              <div className="absolute -top-px -right-px h-4 w-4 border-b border-l bg-background" style={{ borderColor: 'var(--accent)' }} />
              {/* Bottom-left notch */}
              <div className="absolute -bottom-px -left-px h-4 w-4 border-t border-r bg-background" style={{ borderColor: 'var(--accent)' }} />
              {/* Bottom-right notch */}
              <div className="absolute -bottom-px -right-px h-4 w-4 border-t border-l bg-background" style={{ borderColor: 'var(--accent)' }} />
            </div>
            <div className={cn('border-b px-6 py-2', mode.color.border.default)}>
              <span className={cn('text-[10px] uppercase tracking-widest', mode.font, mode.color.text.muted)}>{label}</span>
            </div>
            <div className="p-4">{children}</div>
            <div className={cn('border-t px-6 py-1.5', mode.color.border.default)}>
              <span className={cn('text-[9px] uppercase', mode.font, mode.color.text.accent)}>SYS.OK</span>
            </div>
          </div>
        );

      case '5': // Outline - accent outline around entire card
        return (
          <div className="relative p-0.5" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, transparent 50%, var(--accent) 100%)' }}>
            <div className={cn('border bg-background', mode.color.border.default)}>
              <div className={cn('flex items-center justify-between border-b px-4 py-2', mode.color.border.default)}>
                <span className={cn('text-[10px] uppercase tracking-widest', mode.font, mode.color.text.accent)}>{label}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              </div>
              <div className="p-4">{children}</div>
              <div className={cn('border-t px-4 py-1.5', mode.color.border.default)}>
                <span className={cn('text-[9px] uppercase', mode.font, mode.color.text.muted)}>SYS.READY</span>
              </div>
            </div>
          </div>
        );

      case '6': // Stripe - horizontal accent stripe through header
        return (
          <div className={cn('border', mode.color.border.default)}>
            <div className="relative">
              {/* Stripe behind text */}
              <div className="absolute top-1/2 left-0 right-0 h-px" style={{ backgroundColor: 'var(--accent)' }} />
              <div className={cn('relative flex items-center justify-between border-b px-4 py-2', mode.color.border.default)}>
                <span className={cn('bg-background px-2 text-[10px] uppercase tracking-widest', mode.font, mode.color.text.muted)}>{label}</span>
                <span className={cn('bg-background px-2 text-[9px] uppercase', mode.font, mode.color.text.accent)}>ACTIVE</span>
              </div>
            </div>
            <div className="p-4">{children}</div>
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-px" style={{ backgroundColor: 'var(--accent)' }} />
              <div className={cn('relative border-t px-4 py-1.5', mode.color.border.default)}>
                <span className={cn('bg-background px-2 text-[9px] uppercase', mode.font, mode.color.text.muted)}>SYS.OK</span>
              </div>
            </div>
          </div>
        );

      case '7': // Tabs - tab-style header
        return (
          <div className={cn('border', mode.color.border.default)}>
            {/* Tab row */}
            <div className="flex">
              <div className="border-b-2 px-4 py-2" style={{ borderBottomColor: 'var(--accent)' }}>
                <span className={cn('text-[10px] uppercase tracking-widest', mode.font, mode.color.text.accent)}>{label}</span>
              </div>
              <div className={cn('flex-1 border-b px-4 py-2', mode.color.border.default)}>
                <span className={cn('text-[10px] uppercase tracking-widest', mode.font, mode.color.text.muted)}>INFO</span>
              </div>
              <div className={cn('border-b px-4 py-2', mode.color.border.default)}>
                <span className={cn('text-[10px] uppercase tracking-widest', mode.font, mode.color.text.muted)}>SYS</span>
              </div>
            </div>
            <div className="p-4">{children}</div>
          </div>
        );

      case '8': // Minimal - ultra minimal, almost no chrome
        return (
          <div className="border-l-2 pl-4" style={{ borderLeftColor: 'var(--accent)' }}>
            <div className="mb-2">
              <span className={cn('text-[10px] uppercase tracking-widest', mode.font, mode.color.text.muted)}>{label}</span>
            </div>
            <div>{children}</div>
          </div>
        );

      case '9': // Full - complete HUD with all elements
        return (
          <div className={cn('relative border', mode.color.border.default)}>
            {/* Corner L-brackets */}
            <div className="pointer-events-none absolute -inset-px">
              <div className="absolute top-0 left-0 h-4 w-8 border-t-2 border-l-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute top-0 left-0 h-8 w-4 border-t-2 border-l-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute top-0 right-0 h-4 w-8 border-t-2 border-r-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute top-0 right-0 h-8 w-4 border-t-2 border-r-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute bottom-0 left-0 h-4 w-8 border-b-2 border-l-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute bottom-0 left-0 h-8 w-4 border-b-2 border-l-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute bottom-0 right-0 h-4 w-8 border-b-2 border-r-2" style={{ borderColor: 'var(--accent)' }} />
              <div className="absolute bottom-0 right-0 h-8 w-4 border-b-2 border-r-2" style={{ borderColor: 'var(--accent)' }} />
            </div>
            {/* Header */}
            <div className={cn('flex items-center justify-between border-b px-4 py-2', mode.color.border.default)}>
              <div className={cn('flex items-center gap-2', mode.font)}>
                <span className={cn('text-[10px] uppercase tracking-widest', mode.color.text.accent)}>{label}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              </div>
              <div className={cn('flex gap-3 text-[9px] uppercase', mode.color.text.muted)}>
                <span>FILE</span>
                <span>VIEW</span>
              </div>
            </div>
            {/* Content */}
            <div className="p-4">{children}</div>
            {/* Footer */}
            <div className={cn('flex items-center justify-between border-t px-4 py-1.5', mode.color.border.default)}>
              <span className={cn('text-[9px] uppercase', mode.font, mode.color.text.muted)}>SYS.READY</span>
              <span className={cn('text-[9px] tabular-nums', mode.font, mode.color.text.accent)}>01</span>
            </div>
          </div>
        );

      default:
        return (
          <div className={cn('border p-4', mode.color.border.default)}>
            <div className={cn('mb-2 text-[10px] uppercase', mode.font, mode.color.text.muted)}>{label}</div>
            {children}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Style Selector - Fixed */}
      <div className={cn('sticky top-0 z-50 border-b bg-background px-4 py-3', mode.color.border.default)}>
        <div className="mx-auto flex max-w-6xl items-center gap-2">
          <span className={cn('text-xs', mode.font, mode.color.text.muted)}>STYLE:</span>
          {STYLES.map((s) => (
            <button
              key={s.id}
              onClick={() => setStyle(s.id)}
              className={cn(
                'px-2 py-1 text-xs',
                mode.font,
                style === s.id ? mode.color.text.accent : mode.color.text.muted
              )}
            >
              {s.id}
            </button>
          ))}
          <span className={cn('ml-4 text-xs', mode.font, mode.color.text.accent)}>
            {STYLES.find((s) => s.id === style)?.name}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-12">
        {/* HERO */}
        <section>
          <h2 className={cn('mb-6 text-xs uppercase', mode.font, mode.color.text.muted)}>Hero</h2>
          <Card label="SYSTEM INIT">
            <div className="space-y-4 text-center">
              <div className={cn('text-3xl font-bold', mode.font)}>BUILD PRODUCTION APPS AT AI SPEED</div>
              <div className={cn('text-sm', mode.font, mode.color.text.muted)}>
                Skip months of boilerplate. Ship your SaaS in days, not weeks.
              </div>
              <div className={cn('inline-block border px-6 py-2 text-sm', mode.color.border.default, mode.font)}>
                GET FABRK — $199
              </div>
            </div>
          </Card>
        </section>

        {/* HERO STATS */}
        <section>
          <h2 className={cn('mb-6 text-xs uppercase', mode.font, mode.color.text.muted)}>Hero Stats</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.slice(0, 4).map((stat) => (
              <Card key={stat.label} label={stat.label}>
                <div className={cn('text-2xl font-bold', mode.font, mode.color.text.accent)}>{stat.value}</div>
              </Card>
            ))}
          </div>
        </section>

        {/* BENEFITS */}
        <section>
          <h2 className={cn('mb-6 text-xs uppercase', mode.font, mode.color.text.muted)}>Benefits</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {CORE_BENEFITS.slice(0, 3).map((benefit) => (
              <Card key={benefit.module} label={benefit.module}>
                <div className={cn('text-sm font-medium', mode.font)}>{benefit.benefit}</div>
                <div className={cn('mt-2 flex gap-4 text-xs', mode.font)}>
                  <span><span className={mode.color.text.muted}>TIME:</span> {benefit.timeSaved}</span>
                  <span><span className={mode.color.text.muted}>COST:</span> {benefit.costSaved}</span>
                </div>
                <div className={cn('mt-3 space-y-1 text-xs', mode.font, mode.color.text.muted)}>
                  {benefit.features.slice(0, 3).map((f) => <div key={f}>&gt; {f}</div>)}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* USE CASES */}
        <section>
          <h2 className={cn('mb-6 text-xs uppercase', mode.font, mode.color.text.muted)}>Use Cases</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {USE_CASES.map((useCase) => (
              <Card key={useCase.persona} label={useCase.persona}>
                <div className={cn('text-xs', mode.font)}>
                  <span className={mode.color.text.muted}>PROBLEM:</span> {useCase.painPoint.slice(0, 60)}...
                </div>
                <div className={cn('mt-2 text-xs', mode.font)}>
                  <span className={mode.color.text.muted}>SOLUTION:</span>{' '}
                  <span className={mode.color.text.accent}>{useCase.solution}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section>
          <h2 className={cn('mb-6 text-xs uppercase', mode.font, mode.color.text.muted)}>Pricing</h2>
          <div className="mx-auto max-w-sm">
            <Card label="PRICING">
              <div className="text-center">
                <div className={cn('text-sm line-through', mode.font, mode.color.text.muted)}>{PRICING.display.regular}</div>
                <div className={cn('text-4xl font-bold', mode.font)}>{PRICING.display.launch}</div>
                <div className={cn('mt-2 text-xs', mode.font, mode.color.text.muted)}>ONE-TIME PAYMENT</div>
                <div className={cn('mt-4 space-y-1 text-xs', mode.font)}>
                  {PRICING.features.slice(0, 4).map((f) => <div key={f}>&gt; {f}</div>)}
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section>
          <h2 className={cn('mb-6 text-xs uppercase', mode.font, mode.color.text.muted)}>Testimonials</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <Card key={t.id} label="FEEDBACK">
                <div className={cn('text-sm', mode.font)}>"{t.quote}"</div>
                <div className={cn('mt-3 flex justify-between text-xs', mode.font)}>
                  <span className={mode.color.text.muted}>{t.author}</span>
                  <span className={mode.color.text.accent}>{'★'.repeat(t.rating)}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* WHAT'S INCLUDED */}
        <section>
          <h2 className={cn('mb-6 text-xs uppercase', mode.font, mode.color.text.muted)}>What's Included</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {INCLUDED_FEATURES.slice(0, 6).map((item) => (
              <Card key={item.id} label={item.category}>
                <div className={cn('space-y-1 text-xs', mode.font)}>
                  {item.features.slice(0, 4).map((f) => <div key={f}>&gt; {f}</div>)}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* TECH STACK */}
        <section>
          <h2 className={cn('mb-6 text-xs uppercase', mode.font, mode.color.text.muted)}>Tech Stack</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { name: 'NEXT.JS', version: '16.0.10', specs: ['App Router', 'React 19', 'RSC'] },
              { name: 'TYPESCRIPT', version: '5.x', specs: ['Strict', 'Zod', 'Type-Safe'] },
              { name: 'TAILWIND', version: '4.x', specs: ['OKLCH', '12 Themes', 'CSS Vars'] },
            ].map((tech) => (
              <Card key={tech.name} label={tech.name}>
                <div className={cn('text-xs', mode.font, mode.color.text.accent)}>v{tech.version}</div>
                <div className={cn('mt-2 flex flex-wrap gap-1', mode.font)}>
                  {tech.specs.map((s) => (
                    <span key={s} className={cn('border px-1.5 py-0.5 text-[10px]', mode.color.border.default)}>{s}</span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* COMPONENT PREVIEW */}
        <section>
          <h2 className={cn('mb-6 text-xs uppercase', mode.font, mode.color.text.muted)}>Component Library Preview</h2>
          <div className="grid gap-4 md:grid-cols-4">
            {['Button', 'Input', 'Select', 'Card', 'Modal', 'Table', 'Form', 'Toast'].map((comp) => (
              <Card key={comp} label={comp.toUpperCase()}>
                <div className={cn('h-16 flex items-center justify-center border border-dashed', mode.color.border.default)}>
                  <span className={cn('text-xs', mode.font, mode.color.text.muted)}>[{comp}]</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className={cn('mb-6 text-xs uppercase', mode.font, mode.color.text.muted)}>FAQ</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {FAQ_QUESTIONS.slice(0, 4).map((faq) => (
              <Card key={faq.id} label="FAQ">
                <div className={cn('text-sm font-medium', mode.font)}>{faq.question}</div>
                <div className={cn('mt-2 text-xs', mode.font, mode.color.text.muted)}>{faq.answer.slice(0, 100)}...</div>
              </Card>
            ))}
          </div>
        </section>

        {/* FOUNDER */}
        <section>
          <h2 className={cn('mb-6 text-xs uppercase', mode.font, mode.color.text.muted)}>Founder</h2>
          <div className="mx-auto max-w-md">
            <Card label="FOUNDER">
              <div className="text-center">
                <div className={cn('text-sm font-medium', mode.font)}>JASON POINDEXTER</div>
                <div className={cn('text-xs', mode.font, mode.color.text.muted)}>Full-Stack Developer · SaaS Builder</div>
                <div className={cn('mt-4 flex justify-center gap-6 text-xs', mode.font)}>
                  <span><span className={mode.color.text.muted}>YEARS:</span> 10+</span>
                  <span><span className={mode.color.text.muted}>SAAS:</span> 6+</span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section>
          <h2 className={cn('mb-6 text-xs uppercase', mode.font, mode.color.text.muted)}>Final CTA</h2>
          <Card label="ACTION">
            <div className="space-y-4 text-center">
              <div className={cn('text-xl font-bold', mode.font)}>READY TO SHIP?</div>
              <div className={cn('text-sm', mode.font, mode.color.text.muted)}>
                Join developers building faster with Fabrk
              </div>
              <div className={cn('inline-block border px-6 py-2 text-sm', mode.color.border.default, mode.font, mode.color.text.accent)}>
                GET FABRK — $199
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
