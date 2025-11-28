/**
 * Terminal Background - Golden ratio inspired pattern
 * Subtle background with fibonacci rectangles and scan lines
 */
"use client";

export function TerminalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {/* Fibonacci/Golden Ratio Rectangles */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.015]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Golden ratio pattern - fibonacci rectangles */}
          <pattern
            id="fibonacci-pattern"
            x="0"
            y="0"
            width="610"
            height="377"
            patternUnits="userSpaceOnUse"
          >
            {/* Fibonacci sequence: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610 */}
            {/* Scaled by 1px = 1 unit for visual clarity */}

            {/* 377x233 rectangle */}
            <rect x="0" y="0" width="377" height="233" fill="none" stroke="currentColor" strokeWidth="1" />

            {/* 233x144 rectangle */}
            <rect x="377" y="0" width="233" height="144" fill="none" stroke="currentColor" strokeWidth="1" />

            {/* 144x89 rectangle */}
            <rect x="377" y="144" width="144" height="89" fill="none" stroke="currentColor" strokeWidth="1" />

            {/* 89x55 rectangle */}
            <rect x="521" y="144" width="89" height="55" fill="none" stroke="currentColor" strokeWidth="1" />

            {/* 55x34 rectangle */}
            <rect x="521" y="199" width="55" height="34" fill="none" stroke="currentColor" strokeWidth="1" />

            {/* 34x21 rectangle */}
            <rect x="576" y="199" width="34" height="21" fill="none" stroke="currentColor" strokeWidth="1" />

            {/* 21x13 rectangle */}
            <rect x="576" y="220" width="21" height="13" fill="none" stroke="currentColor" strokeWidth="1" />

            {/* Additional layer - 233x377 for full pattern */}
            <rect x="0" y="233" width="233" height="144" fill="none" stroke="currentColor" strokeWidth="1" />
            <rect x="233" y="233" width="144" height="144" fill="none" stroke="currentColor" strokeWidth="1" />

            {/* Golden spiral approximation with arcs */}
            <path
              d="M 377 233
                 A 233 233 0 0 1 144 0
                 M 144 0
                 A 144 144 0 0 1 377 144
                 M 377 144
                 A 89 89 0 0 1 466 233
                 M 466 233
                 A 55 55 0 0 1 521 178
                 M 521 178
                 A 34 34 0 0 1 555 212"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fibonacci-pattern)" className="text-foreground" />
      </svg>

      {/* CRT Scan Lines Effect */}
      <div
        className="absolute inset-0 opacity-[0.008]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            currentColor 2px,
            currentColor 3px
          )`,
        }}
      />

      {/* Subtle corner brackets - terminal window feel */}
      <div className="absolute left-8 top-24 h-20 w-20 border-l border-t border-foreground/[0.03]" />
      <div className="absolute right-8 top-24 h-20 w-20 border-r border-t border-foreground/[0.03]" />
      <div className="absolute bottom-8 left-8 h-20 w-20 border-b border-l border-foreground/[0.03]" />
      <div className="absolute bottom-8 right-8 h-20 w-20 border-b border-r border-foreground/[0.03]" />

      {/* Floating terminal markers */}
      <div className="absolute left-12 top-1/4 font-mono text-[10px] text-foreground/[0.025] rotate-90">
        [0x00FF]
      </div>
      <div className="absolute right-12 top-1/3 font-mono text-[10px] text-foreground/[0.025] -rotate-90">
        [0x1A2B]
      </div>
      <div className="absolute left-12 bottom-1/4 font-mono text-[10px] text-foreground/[0.025] rotate-90">
        [0xDEAD]
      </div>
      <div className="absolute right-12 bottom-1/3 font-mono text-[10px] text-foreground/[0.025] -rotate-90">
        [0xBEEF]
      </div>

      {/* Terminal box-drawing decorations */}
      <div className="absolute left-1/4 top-12 font-mono text-[10px] text-foreground/[0.025]">
        ┌─ FIB[1,1,2,3,5,8,13,21,34,55,89,144,233,377,610]
      </div>
      <div className="absolute right-1/4 bottom-12 font-mono text-[10px] text-foreground/[0.025]">
        └─ FABRK_SYSTEM_v2.0 │ STATUS: OPERATIONAL
      </div>

      {/* Additional hex markers */}
      <div className="absolute left-1/3 top-1/2 font-mono text-[10px] text-foreground/[0.02]">
        [0xCAFE]
      </div>
      <div className="absolute right-1/3 top-2/3 font-mono text-[10px] text-foreground/[0.02]">
        [0xF00D]
      </div>
    </div>
  );
}
