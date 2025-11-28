/**
 * Terminal Background - Grid pattern with subtle scan lines
 * Clean, minimal terminal aesthetic
 */
"use client";

export function TerminalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Dot Grid Pattern */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.10]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dot-grid"
            x="0"
            y="0"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" className="text-foreground" />
      </svg>

      {/* Corner brackets */}
      <div className="absolute left-6 top-20 h-16 w-16 border-l-2 border-t-2 border-foreground/[0.06]" />
      <div className="absolute right-6 top-20 h-16 w-16 border-r-2 border-t-2 border-foreground/[0.06]" />
      <div className="absolute bottom-6 left-6 h-16 w-16 border-b-2 border-l-2 border-foreground/[0.06]" />
      <div className="absolute bottom-6 right-6 h-16 w-16 border-b-2 border-r-2 border-foreground/[0.06]" />
    </div>
  );
}
