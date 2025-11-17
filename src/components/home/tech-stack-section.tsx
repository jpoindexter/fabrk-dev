/**
 * ✅ FABRK COMPONENT
 * Tech Stack Section - Shows technologies used
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-150px" },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

export function TechStackSection() {
  return (
    <section className="border-t border-border bg-muted py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div className="text-center" {...fadeInUp}>
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Built with the tools you love
          </p>

          <div className="mx-auto mt-12 flex max-w-5xl flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
            {/* Next.js */}
            <div className="flex flex-col items-center gap-2 grayscale transition-all hover:grayscale-0">
              <svg
                className="size-12"
                viewBox="0 0 180 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_408_139"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="180"
                  height="180"
                >
                  <circle cx="90" cy="90" r="90" fill="black" />
                </mask>
                <g mask="url(#mask0_408_139)">
                  <circle cx="90" cy="90" r="90" fill="black" />
                  <path
                    d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
                    fill="url(#paint0_linear_408_139)"
                  />
                  <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_408_139)" />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_408_139"
                    x1="109"
                    y1="116.5"
                    x2="144.5"
                    y2="160.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_408_139"
                    x1="121"
                    y1="54"
                    x2="120.799"
                    y2="106.875"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-xs text-muted-foreground">Next.js</span>
            </div>

            {/* React */}
            <div className="flex flex-col items-center gap-2 grayscale transition-all hover:grayscale-0">
              <svg
                className="size-12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="2" fill="#61DAFB" />
                <ellipse
                  cx="12"
                  cy="12"
                  rx="10"
                  ry="4"
                  stroke="#61DAFB"
                  strokeWidth="1"
                  fill="none"
                />
                <ellipse
                  cx="12"
                  cy="12"
                  rx="10"
                  ry="4"
                  stroke="#61DAFB"
                  strokeWidth="1"
                  fill="none"
                  transform="rotate(60 12 12)"
                />
                <ellipse
                  cx="12"
                  cy="12"
                  rx="10"
                  ry="4"
                  stroke="#61DAFB"
                  strokeWidth="1"
                  fill="none"
                  transform="rotate(-60 12 12)"
                />
              </svg>
              <span className="text-xs text-muted-foreground">React</span>
            </div>

            {/* TypeScript */}
            <div className="flex flex-col items-center gap-2 grayscale transition-all hover:grayscale-0">
              <svg
                className="size-12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" fill="#3178C6" rx="2" />
                <path
                  d="M13.5 16V18.5H15.5V16H13.5ZM15.5 10.5H17.5V16H15.5V10.5ZM9.5 14H7.5V16H9.5V14ZM9.5 10.5H7.5V12.5H9.5V10.5Z"
                  fill="white"
                />
                <path
                  d="M13.5 10.5V8H11V10.5H9.5V8H7V18.5H9.5V16H11V18.5H13.5V16H15.5V18.5H18V8H15.5V10.5H13.5Z"
                  fill="white"
                />
              </svg>
              <span className="text-xs text-muted-foreground">TypeScript</span>
            </div>

            {/* Tailwind CSS */}
            <div className="flex flex-col items-center gap-2 grayscale transition-all hover:grayscale-0">
              <svg
                className="size-12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 6C9.33 6 7.67 7.33 7 10C8 8.67 9.17 8.17 10.5 8.5C11.26 8.67 11.81 9.23 12.41 9.84C13.39 10.84 14.54 12 17 12C19.67 12 21.33 10.67 22 8C21 9.33 19.83 9.83 18.5 9.5C17.74 9.33 17.19 8.77 16.59 8.16C15.61 7.16 14.46 6 12 6ZM7 12C4.33 12 2.67 13.33 2 16C3 14.67 4.17 14.17 5.5 14.5C6.26 14.67 6.81 15.23 7.41 15.84C8.39 16.84 9.54 18 12 18C14.67 18 16.33 16.67 17 14C16 15.33 14.83 15.83 13.5 15.5C12.74 15.33 12.19 14.77 11.59 14.16C10.61 13.16 9.46 12 7 12Z"
                  fill="#06B6D4"
                />
              </svg>
              <span className="text-xs text-muted-foreground">Tailwind</span>
            </div>

            {/* Radix UI */}
            <div className="flex flex-col items-center gap-2 grayscale transition-all hover:grayscale-0">
              <svg
                className="size-12"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"
                  fill="currentColor"
                  className="text-foreground"
                />
                <path d="M12 0H4V8H12V0Z" fill="currentColor" className="text-foreground" />
                <path
                  d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"
                  fill="currentColor"
                  className="text-foreground"
                />
              </svg>
              <span className="text-xs text-muted-foreground">Radix UI</span>
            </div>

            {/* Framer Motion */}
            <div className="flex flex-col items-center gap-2 grayscale transition-all hover:grayscale-0">
              <svg
                className="size-12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 0H20V8H12L4 0Z" fill="#FF0055" />
                <path d="M4 8H12L20 16H12H4V8Z" fill="#00AAFF" />
                <path d="M4 16H12V24L4 16Z" fill="#88DDFF" />
              </svg>
              <span className="text-xs text-muted-foreground">Framer</span>
            </div>

            {/* Vitest */}
            <div className="flex flex-col items-center gap-2 grayscale transition-all hover:grayscale-0">
              <svg
                className="size-12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.5 2L20 12L14.5 22H9.5L4 12L9.5 2H14.5Z" fill="#729B1B" />
                <path d="M14.5 6L17 12L14.5 18H9.5L7 12L9.5 6H14.5Z" fill="#FCC72B" />
              </svg>
              <span className="text-xs text-muted-foreground">Vitest</span>
            </div>

            {/* Playwright */}
            <div className="flex flex-col items-center gap-2 grayscale transition-all hover:grayscale-0">
              <svg
                className="size-12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" fill="#2EAD33" />
                <path
                  d="M8 12L11 15L16 9"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs text-muted-foreground">Playwright</span>
            </div>

            {/* shadcn/ui */}
            <div className="flex flex-col items-center gap-2 grayscale transition-all hover:grayscale-0">
              <div className="flex size-12 items-center justify-center rounded-lg bg-foreground">
                <span className="font-mono text-xl font-bold text-white">$</span>
              </div>
              <span className="text-xs text-muted-foreground">shadcn/ui</span>
            </div>

            {/* Vercel */}
            <div className="flex flex-col items-center gap-2 grayscale transition-all hover:grayscale-0">
              <svg
                className="size-12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L22 20H2L12 2Z" fill="black" />
              </svg>
              <span className="text-xs text-muted-foreground">Vercel</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
