# Cursor.com Design System Analysis

Complete design specifications extracted from Cursor.com for implementing a modern, dark-mode-first aesthetic.

## Color Palette

### Core Colors (Extracted)
```css
/* Dark Mode (Primary) */
--background-dark: #14120b;           /* Deep warm black */
--background-pure-black: #000;        /* Pure black for contrasts */
--background-light: #f7f7f4;          /* Off-white (light mode) */
--text-white: #fff;                   /* Pure white text */

/* Accent Colors */
--accent-blue: #2d629e;               /* Link blue (Slack-style) */
--accent-green: #34785c;              /* Theme accent green */

/* Shadows & Overlays */
--shadow-dark: rgba(0, 0, 0, 0.14);
--shadow-medium: rgba(0, 0, 0, 0.1);
--overlay-dark: rgba(0, 0, 0, 0.3);
--overlay-light: rgba(255, 255, 255, 0.3);
```

### Extended Dark Mode Palette (Recommended)
Based on Cursor's aesthetic, these values create a cohesive dark theme:

```css
:root[data-theme="dark"] {
  /* Backgrounds */
  --bg-primary: #14120b;              /* Main background */
  --bg-secondary: #1a1814;            /* Card/panel background */
  --bg-tertiary: #24211c;             /* Hover states */
  --bg-elevated: #2d2924;             /* Elevated surfaces */
  
  /* Text Hierarchy */
  --text-primary: rgba(255, 255, 255, 0.95);      /* High emphasis */
  --text-secondary: rgba(255, 255, 255, 0.75);    /* Medium emphasis */
  --text-tertiary: rgba(242, 242, 242, 0.9);      /* Low emphasis (from extracted) */
  --text-disabled: rgba(255, 255, 255, 0.4);      /* Disabled state */
  
  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.08);     /* Hairline borders */
  --border-default: rgba(255, 255, 255, 0.12);    /* Default borders */
  --border-strong: rgba(255, 255, 255, 0.18);     /* Emphasized borders */
  
  /* Accents */
  --accent-primary: #2d629e;          /* Primary blue */
  --accent-secondary: #34785c;        /* Secondary green */
  --accent-hover: #3a75b8;            /* Blue hover state */
  --accent-active: #255189;           /* Blue active state */
  
  /* Semantic Colors */
  --success: #34785c;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #2d629e;
}
```

## Typography

### Font System
Cursor uses custom web fonts loaded via CSS variables. Recommended modern stack:

```css
:root {
  /* Display/Heading Font - Clean, geometric sans-serif */
  --font-display: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  
  /* Body Font - Optimized for readability */
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  
  /* Monospace Font - Code blocks and technical content */
  --font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, 'Liberation Mono', monospace;
}
```

### Type Scale
```css
/* Headings */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px - extracted */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
--text-6xl: 3.75rem;     /* 60px */

/* Line Heights */
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;

/* Font Weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;

/* Letter Spacing */
--tracking-tighter: -0.05em;
--tracking-tight: -0.025em;
--tracking-normal: 0;
--tracking-wide: 0.025em;
--tracking-wider: 0.05em;
```

## Shadows & Depth

### Elevation System
Cursor uses a sophisticated shadow system for depth:

```css
/* Extracted from Cursor.com */
--shadow-elevation-1: 
  0 28px 70px rgba(0, 0, 0, 0.14),
  0 14px 32px rgba(0, 0, 0, 0.1),
  0 0 0 1px var(--border-default);

/* Recommended Shadow Scale */
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Cursor's Signature Deep Shadow */
--shadow-premium: 
  0 28px 70px rgba(0, 0, 0, 0.14),
  0 14px 32px rgba(0, 0, 0, 0.1),
  0 0 0 1px var(--border-default);
```

## Glassmorphism & Blur Effects

Cursor uses subtle glassmorphism for modern depth:

```css
/* Glass Panel - Light Mode */
.glass-light {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

/* Glass Panel - Dark Mode */
.glass-dark {
  background: rgba(26, 24, 20, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Frosted Effect */
.frosted {
  background: rgba(20, 18, 11, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}
```

## Component Patterns

### Buttons

```css
/* Primary CTA Button */
.btn-primary {
  background: var(--accent-primary);
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  border: none;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary:hover {
  background: var(--accent-hover);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.btn-primary:active {
  background: var(--accent-active);
  transform: translateY(0);
}

/* Secondary Button */
.btn-secondary {
  background: var(--bg-secondary);
  color: var(--text-primary);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  border: 1px solid var(--border-default);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-secondary:hover {
  background: var(--bg-tertiary);
  border-color: var(--border-strong);
}
```

### Cards

```css
/* Standard Card */
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  background: var(--bg-tertiary);
  box-shadow: var(--shadow-premium);
  transform: translateY(-2px);
}

/* Glass Card */
.card-glass {
  background: rgba(26, 24, 20, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-2xl);
}
```

### Hero Section

```css
.hero {
  position: relative;
  min-height: 90vh;
  background: var(--bg-primary);
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1280px;
  margin: 0 auto;
  padding: 120px 24px;
  text-align: center;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin-bottom: 24px;
}

.hero-subtitle {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  line-height: 1.5;
  color: var(--text-secondary);
  max-width: 42rem;
  margin: 0 auto 48px;
}
```

## Visual Effects

### Glow Effects

```css
/* Accent Glow */
.glow-accent {
  box-shadow: 
    0 0 20px rgba(45, 98, 158, 0.3),
    0 0 40px rgba(45, 98, 158, 0.2),
    0 0 60px rgba(45, 98, 158, 0.1);
}

/* Hover Glow */
.glow-hover:hover {
  box-shadow: 
    0 0 30px rgba(45, 98, 158, 0.4),
    0 0 60px rgba(45, 98, 158, 0.3),
    0 0 90px rgba(45, 98, 158, 0.2);
  transition: box-shadow 0.3s ease;
}

/* Success Glow */
.glow-success {
  box-shadow: 
    0 0 20px rgba(52, 120, 92, 0.3),
    0 0 40px rgba(52, 120, 92, 0.2);
}
```

### Gradient Patterns

```css
/* Hero Gradient Background */
.gradient-hero {
  background: 
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(45, 98, 158, 0.15), transparent),
    radial-gradient(ellipse 60% 50% at 80% 50%, rgba(52, 120, 92, 0.1), transparent),
    var(--bg-primary);
}

/* Mesh Gradient (Subtle) */
.gradient-mesh {
  background: 
    radial-gradient(at 0% 0%, rgba(45, 98, 158, 0.08) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(52, 120, 92, 0.05) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(45, 98, 158, 0.06) 0px, transparent 50%),
    radial-gradient(at 0% 100%, rgba(52, 120, 92, 0.04) 0px, transparent 50%),
    var(--bg-primary);
}

/* Animated Gradient */
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.gradient-animated {
  background: linear-gradient(
    -45deg,
    rgba(45, 98, 158, 0.1),
    rgba(52, 120, 92, 0.1),
    rgba(45, 98, 158, 0.1),
    rgba(52, 120, 92, 0.1)
  );
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}
```

## Animation & Transitions

### Timing Functions

```css
:root {
  /* Easing Curves */
  --ease-in-out-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-in-quart: cubic-bezier(0.5, 0, 0.75, 0);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  
  /* Durations */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 350ms;
}
```

### Common Animations

```css
/* Fade In */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale In */
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Apply Animations */
.animate-fade-in {
  animation: fade-in var(--duration-normal) var(--ease-in-out-smooth);
}

.animate-slide-up {
  animation: slide-up var(--duration-slow) var(--ease-out-back);
}

.animate-scale-in {
  animation: scale-in var(--duration-normal) var(--ease-out-quart);
}
```

## Layout Utilities

### Spacing Scale

```css
:root {
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-5: 1.25rem;    /* 20px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */
}
```

### Border Radius

```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;
}
```

## Code Editor Styling

Based on Cursor's IDE aesthetic:

```css
.code-editor {
  background: #1a1814;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 24px;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.6;
  overflow: auto;
}

.code-editor-header {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.code-editor-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.code-editor-dot.red { background: #ef4444; }
.code-editor-dot.yellow { background: #f59e0b; }
.code-editor-dot.green { background: #34785c; }

/* Syntax Highlighting Colors */
.token.keyword { color: #2d629e; }
.token.string { color: #34785c; }
.token.function { color: #f59e0b; }
.token.comment { color: rgba(255, 255, 255, 0.4); }
.token.operator { color: rgba(255, 255, 255, 0.75); }
```

## Implementation Guide

### 1. Global Styles Setup

```css
/* globals.css or app.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Import all color, typography, and spacing variables above */
  color-scheme: dark light;
}

body {
  font-family: var(--font-body);
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: var(--leading-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 2. Tailwind Integration (Optional)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'text-primary': 'var(--text-primary)',
        'accent': 'var(--accent-primary)',
        // ... add all other variables
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
      boxShadow: {
        'premium': 'var(--shadow-premium)',
        // ... other shadows
      },
    },
  },
}
```

### 3. Dark Mode Toggle

```typescript
// theme-toggle.tsx
'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="btn-secondary"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
```

## Key Takeaways

1. **Dark-First Approach**: Primary background is #14120b (warm black), not pure black
2. **Subtle Borders**: Use rgba(255, 255, 255, 0.08) for barely-there borders
3. **Depth Through Shadows**: Premium shadow with triple-layer depth creates elevation
4. **Minimal Blur**: Backdrop blur at 12-16px for glass effects, not excessive
5. **Accent Colors**: Blue (#2d629e) for CTAs, Green (#34785c) for success states
6. **Clean Typography**: Sans-serif (Inter-style) with tight tracking on headings
7. **Smooth Transitions**: 200-350ms with cubic-bezier easing for premium feel
8. **Gradient Subtlety**: Use opacity 0.05-0.15 for background gradients, never vibrant

This design system creates the polished, modern aesthetic that makes Cursor feel premium and developer-focused.
