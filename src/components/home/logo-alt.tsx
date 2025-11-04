/**
 * ✅ FABRK LOGO COMPONENT - ALTERNATIVE BRUTALIST DESIGN
 * Ultra-bold stacked text logo with stamp aesthetic
 * Option 2: Pure typography, no SVG icon
 */

interface LogoProps {
  size?: number
  className?: string
}

export function LogoAlt({ size = 20, className = "" }: LogoProps = {}) {
  return (
    <div className="inline-flex flex-col items-center justify-center rounded-brutal border-4 border-black bg-primary px-3 py-2 shadow-brutal-lg -rotate-2 transition-all hover:shadow-brutal-xl hover:-translate-x-1 hover:-translate-y-1 hover:rotate-0">
      <span className="text-2xl font-black uppercase leading-none tracking-tighter text-primary-foreground">
        FABRK
      </span>
      <span className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground/80">
        BOILERPLATE
      </span>
    </div>
  )
}
