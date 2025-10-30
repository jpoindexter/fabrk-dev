/**
 * ✅ FABRK LOGO COMPONENT
 * Official Fabrk brand logo
 * Shared across header and footers
 * Production-ready ✓
 */

interface LogoProps {
  size?: number
  className?: string
}

export function Logo({ size = 32, className = "" }: LogoProps = {}) {
  // Calculate proportional height (28:40 ratio from original)
  const height = (size / 28) * 40

  return (
    <div className="flex items-center gap-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={height}
        viewBox="0 0 28 40"
        fill="none"
        className={className}
        aria-label="Fabrk Logo"
      >
        <path
          d="M22.6988 0H8C3.58172 0 0 3.58172 0 8V9.87007C0 10.9541 0.440015 11.9918 1.21929 12.7454L12.3307 23.491C14.0613 25.1647 16.8138 25.1428 18.5176 23.4419C20.2748 21.6878 20.24 18.8299 18.4406 17.1191L11.5862 10.6024H22.6988C25.6266 10.6024 28 8.22898 28 5.30121C28 2.37343 25.6266 0 22.6988 0Z"
          fill="currentColor"
        />
        <path
          d="M12.038 26.0745L1.6944 16.0929C1.05948 15.4802 0 15.9302 0 16.8125V26.9288C0 29.1206 0.899272 31.2164 2.48774 32.7266L9.23907 39.1454C9.81614 39.6941 10.582 40 11.3782 40C13.0928 40 14.4828 38.61 14.4828 36.8954V31.8312C14.4828 29.6601 13.6003 27.5822 12.038 26.0745Z"
          fill="currentColor"
        />
      </svg>
      <span className="text-xl font-bold tracking-tight">Fabrk</span>
    </div>
  )
}
