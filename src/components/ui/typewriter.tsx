'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { mode } from '@/design-system';

interface TypeWriterProps {
  text: string;
  delay?: number;
  speed?: number;
  showCursor?: boolean;
}

/**
 * TypeWriter Component
 * Animated typewriter effect that triggers on scroll
 * Used for terminal-style text animations
 */
export function TypeWriter({ text, delay = 0, speed = 30, showCursor = false }: TypeWriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay * 1000);

    return () => clearTimeout(startTimer);
  }, [isInView, delay]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [started, text, speed]);

  return (
    <span ref={ref}>
      {displayText}
      {showCursor && displayText.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className={mode.color.text.accent}
        >
          █
        </motion.span>
      )}
    </span>
  );
}
