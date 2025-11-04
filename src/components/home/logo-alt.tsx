/**
 * ✅ FABRK LOGO COMPONENT - ORIGINAL BRUTALIST DESIGN
 * Single bold badge with stacked text layout
 * Unique design with hard shadows and bold geometry
 */

interface LogoProps {
  size?: number
  className?: string
}

export function LogoAlt({ size = 20, className = "" }: LogoProps = {}) {
  return (
    <div className="inline-flex items-center justify-center rounded-brutal border-4 border-black bg-primary px-4 py-2 shadow-brutal transition-all hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1">
      <div className="flex flex-col items-center leading-none">
        <span className="text-2xl font-black uppercase tracking-tighter text-primary-foreground">
          FABRK
        </span>
        <div className="mt-0.5 h-1 w-full bg-black"></div>
      </div>
    </div>
  )
}
