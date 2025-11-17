/**
 * ✅ FABRK LOGO COMPONENT - ICON + WORDMARK
 * Custom geometric F icon + FABRK wordmark
 * Similar to Framer's logo pattern (icon + text)
 */

interface LogoProps {
  size?: number
  className?: string
}

export function LogoAlt({ size = 20, className = "" }: LogoProps = {}) {
  return (
    <div className="inline-flex items-center gap-3">
      {/* Custom F Icon - Brutalist geometric design */}
      <div className="relative h-10 w-10 -rotate-6 rounded-brutal border-4 border-foreground bg-secondary shadow-brutal transition-all hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1 hover:rotate-0">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full p-1 text-foreground"
        >
          {/* Geometric F made of bold rectangles */}
          <rect x="6" y="6" width="22" height="6" fill="currentColor" />
          <rect x="6" y="6" width="6" height="28" fill="currentColor" />
          <rect x="6" y="17" width="16" height="6" fill="currentColor" />
        </svg>
      </div>

      {/* Wordmark */}
      <span className="text-2xl font-black uppercase leading-none tracking-tight text-foreground">
        FABRK
      </span>
    </div>
  )
}
