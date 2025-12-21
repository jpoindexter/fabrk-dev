/**
 * Motion Design System
 * Terminal-themed, subtle animations for a dynamic feel
 * Uses step-based timing and terminal characters
 */
'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

// Terminal characters for scramble effect
const TERMINAL_CHARS = '█▓▒░│─┌┐└┘├┤┬┴┼╔╗╚╝═║<>[]{}/*#@$%&';

// ============================================
// 1. SCROLL REVEAL - Terminal-style fade up
// ============================================
interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
  /** If true, element will animate out when scrolled away */
  reversible?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  reversible = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (!reversible) observer.disconnect();
          } else if (reversible) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '0px'
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reversible]);

  const transforms = {
    up: isVisible ? 'translate-y-0' : 'translate-y-12',
    left: isVisible ? 'translate-x-0' : 'translate-x-12',
    right: isVisible ? 'translate-x-0' : '-translate-x-12',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]',
        isVisible ? 'opacity-100' : 'opacity-0',
        transforms[direction],
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ============================================
// 2. STAGGER CONTAINER - Children animate in sequence
// ============================================
interface StaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  /** If true, children will animate out when scrolled away */
  reversible?: boolean;
}

export function Stagger({
  children,
  className,
  staggerDelay = 100,
  reversible = true,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!reversible) observer.disconnect();
        } else if (reversible) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reversible]);

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              className={cn(
                'transition-all duration-500 ease-[steps(8,end)]',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: `${i * staggerDelay}ms` }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}

// ============================================
// 3. COUNTER - Terminal-style animated counter
// ============================================
interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** Add leading zeros to match digit count */
  padZeros?: boolean;
  /** Wrap in terminal brackets [000] */
  brackets?: boolean;
}

export function Counter({
  end,
  duration = 1500,
  prefix = '',
  suffix = '',
  className,
  padZeros = false,
  brackets = false,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const digits = String(end).length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Step-based easing for terminal feel
      const stepped = Math.floor(progress * 20) / 20;
      const eased = 1 - Math.pow(1 - stepped, 2);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  const displayValue = padZeros ? String(count).padStart(digits, '0') : String(count);
  const content = brackets ? `[${displayValue}]` : displayValue;

  return (
    <span ref={ref} className={cn('font-mono tabular-nums', className)}>
      {prefix}{content}{suffix}
    </span>
  );
}

// ============================================
// 4. MAGNETIC BUTTON - Moves toward cursor
// ============================================
interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({ children, className, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) * strength;
    const y = (e.clientY - centerY) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      className={cn('inline-block transition-transform duration-200 ease-out', className)}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

// ============================================
// 5. TEXT SCRAMBLE - Terminal decode effect
// ============================================
interface ScrambleProps {
  text: string;
  className?: string;
  scrambleDuration?: number;
  /** Use block characters for more terminal feel */
  useBlocks?: boolean;
}

export function Scramble({
  text,
  className,
  scrambleDuration = 800,
  useBlocks = true,
}: ScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState(text);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const chars = useBlocks ? '█▓▒░' : TERMINAL_CHARS;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / scrambleDuration, 1);

      // Step-based reveal for digital feel
      const revealed = Math.floor(progress * text.length);
      let result = '';

      for (let i = 0; i < text.length; i++) {
        if (i < revealed) {
          result += text[i];
        } else if (text[i] === ' ') {
          result += ' ';
        } else {
          // Cycle through block characters for loading effect
          const charIndex = Math.floor((elapsed / 50 + i) % chars.length);
          result += chars[charIndex];
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, text, scrambleDuration, useBlocks]);

  return (
    <span ref={ref} className={cn('font-mono', className)}>
      {displayText}
    </span>
  );
}

// ============================================
// 6. FADE SECTION - Terminal-style section reveal
// ============================================
interface FadeSectionProps {
  children: ReactNode;
  className?: string;
  /** If true, section will fade out when scrolled away */
  reversible?: boolean;
}

export function FadeSection({ children, className, reversible = true }: FadeSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!reversible) observer.disconnect();
        } else if (reversible) {
          setIsVisible(false);
        }
      },
      { threshold: 0.05 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reversible]);

  return (
    <section
      ref={ref}
      className={cn(
        'transition-opacity duration-700 ease-[steps(12,end)]',
        isVisible ? 'opacity-100' : 'opacity-0',
        className
      )}
    >
      {children}
    </section>
  );
}

// ============================================
// 7. TERMINAL CURSOR - Blinking block cursor
// ============================================
interface CursorProps {
  className?: string;
  blinkSpeed?: number;
}

export function TerminalCursor({ className, blinkSpeed = 530 }: CursorProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((v) => !v);
    }, blinkSpeed);
    return () => clearInterval(interval);
  }, [blinkSpeed]);

  return (
    <span
      className={cn(
        'inline-block w-[0.6em] h-[1.1em] bg-primary align-text-bottom',
        visible ? 'opacity-100' : 'opacity-0',
        className
      )}
    />
  );
}

// ============================================
// 8. LOADING BAR - Terminal progress bar
// ============================================
interface LoadingBarProps {
  progress?: number;
  className?: string;
  showPercent?: boolean;
  width?: number;
}

export function LoadingBar({
  progress = 0,
  className,
  showPercent = true,
  width = 20,
}: LoadingBarProps) {
  const filled = Math.floor((progress / 100) * width);
  const empty = width - filled;

  return (
    <span className={cn('font-mono', className)}>
      [{'\u2588'.repeat(filled)}
      {'\u2591'.repeat(empty)}]
      {showPercent && ` ${Math.floor(progress)}%`}
    </span>
  );
}

// ============================================
// 9. ANIMATED LOADING BAR - Auto-animates to 100%
// ============================================
interface AnimatedLoadingBarProps {
  duration?: number;
  className?: string;
  showPercent?: boolean;
  width?: number;
  onComplete?: () => void;
}

export function AnimatedLoadingBar({
  duration = 2000,
  className,
  showPercent = true,
  width = 20,
  onComplete,
}: AnimatedLoadingBarProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, duration, onComplete]);

  return (
    <span ref={ref} className={cn('font-mono', className)}>
      <LoadingBar progress={progress} showPercent={showPercent} width={width} />
    </span>
  );
}

// ============================================
// 10. TYPEWRITER - Types out text character by character
// ============================================
interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
  onComplete?: () => void;
}

export function Typewriter({
  text,
  className,
  speed = 50,
  delay = 0,
  showCursor = true,
  onComplete,
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [hasStarted, text, speed, delay, onComplete]);

  return (
    <span ref={ref} className={cn('font-mono', className)}>
      {displayText}
      {showCursor && !isComplete && <TerminalCursor />}
    </span>
  );
}
