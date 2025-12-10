/**
 * Terminal Background - Grid pattern with subtle scan lines
 * Clean, minimal terminal aesthetic
 */
'use client';

import { mode } from '@/design-system';

export function TerminalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Dot Grid Pattern */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.10]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dot-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#dot-grid)"
          className={mode.color.text.primary}
        />
      </svg>

      {/* Corner brackets - subtle viewport indicators */}
      <div
        className={`absolute top-20 left-6 h-6 w-6 border-t border-l ${mode.color.text.primary}/[0.015]`}
      />
      <div
        className={`absolute top-20 right-6 h-6 w-6 border-t border-r ${mode.color.text.primary}/[0.015]`}
      />
      <div
        className={`absolute bottom-6 left-6 h-6 w-6 border-b border-l ${mode.color.text.primary}/[0.015]`}
      />
      <div
        className={`absolute right-6 bottom-6 h-6 w-6 border-r border-b ${mode.color.text.primary}/[0.015]`}
      />
    </div>
  );
}
