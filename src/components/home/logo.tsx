/**
 * ✅ FABRK LOGO COMPONENT - BRUTALIST EDITION
 * Neobrutalist brand logo with thick border and hard shadow
 * Shared across header and footers
 * Production-ready ✓
 */

interface LogoProps {
  size?: number
  className?: string
}

export function Logo({ size = 20, className = "" }: LogoProps = {}) {
  // Calculate proportional height (28:40 ratio from original)
  const height = (size / 28) * 40

  return (
    <div className="inline-flex items-center gap-2 border-3 border-foreground bg-primary px-2 py-1 shadow-brutal transition-all hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={height}
        viewBox="0 0 28 40"
        fill="none"
        className={`${className} flex-shrink-0 text-primary-foreground`}
        style={{ display: 'block' }}
        aria-label="Fabrk Logo"
      >
        {/* Brutalist F - Sharp geometric shapes, no curves */}
        {/* Top horizontal bar */}
        <rect x="0" y="0" width="24" height="7" fill="currentColor" />
        {/* Vertical bar */}
        <rect x="0" y="0" width="7" height="30" fill="currentColor" />
        {/* Middle horizontal bar */}
        <rect x="0" y="12" width="18" height="6" fill="currentColor" />
        {/* Bottom angled piece - made blocky */}
        <polygon points="0,30 7,30 7,40 0,40" fill="currentColor" />
        <polygon points="7,33 14,33 14,40 7,40" fill="currentColor" />
      </svg>
      <span className="text-lg font-black uppercase leading-none tracking-tight text-primary-foreground">Fabrk</span>
    </div>
  )
}
