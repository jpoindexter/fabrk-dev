/**
 * Terminal Background - Grid pattern with subtle scan lines
 * Clean, minimal terminal aesthetic
 */
'use client';

export function TerminalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {}
      {/* Dot Grid Pattern - uses theme accent color at visible opacity */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, oklch(var(--accent) / 0.35) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      {}
    </div>
  );
}
