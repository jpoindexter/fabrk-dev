'use client';

import { useState, useEffect } from 'react';
import { Highlight, themes, type PrismTheme } from 'prism-react-renderer';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

interface CodeBlockProps {
  code: string;
  language?: string;
  /** Max height for scrollable content (e.g., "400px", "600px") */
  maxHeight?: string;
  /** Show line numbers (default: true) */
  showLineNumbers?: boolean;
}

// Custom CRT themes - defined outside component to prevent re-creation
/* eslint-disable design-system/no-hardcoded-colors -- Syntax highlighter theme colors are intentional */
const amberTheme: PrismTheme = {
  plain: {
    color: '#ffbb00', // Bright amber
    backgroundColor: '#0d0a00', // Deep black
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#aa8800', opacity: 0.7 },
    },
    { types: ['namespace'], style: { opacity: 0.7 } },
    { types: ['string', 'attr-value'], style: { color: '#ffcc33' } }, // Bright yellow-amber
    { types: ['punctuation', 'operator'], style: { color: '#ff9900' } }, // Orange-amber
    {
      types: [
        'entity',
        'url',
        'symbol',
        'number',
        'boolean',
        'variable',
        'constant',
        'property',
        'regex',
        'inserted',
      ],
      style: { color: '#ffaa00' },
    },
    { types: ['atrule', 'keyword', 'attr-name'], style: { color: '#ff8800' } }, // Bright orange
    { types: ['function', 'deleted', 'tag'], style: { color: '#ffdd44' } }, // Very bright amber
    { types: ['selector'], style: { color: '#ffbb00' } },
    { types: ['important', 'function', 'bold'], style: { fontWeight: 'bold' } },
    { types: ['italic'], style: { fontStyle: 'italic' } },
  ],
};

const redTheme: PrismTheme = {
  plain: {
    color: '#ff5544', // Bright red
    backgroundColor: '#140000', // Deep black with red tint
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#882211', opacity: 0.7 },
    },
    { types: ['namespace'], style: { opacity: 0.7 } },
    { types: ['string', 'attr-value'], style: { color: '#ff7766' } }, // Bright orange-red
    { types: ['punctuation', 'operator'], style: { color: '#cc3322' } }, // Medium red
    {
      types: [
        'entity',
        'url',
        'symbol',
        'number',
        'boolean',
        'variable',
        'constant',
        'property',
        'regex',
        'inserted',
      ],
      style: { color: '#dd4433' },
    },
    { types: ['atrule', 'keyword', 'attr-name'], style: { color: '#ff6655' } }, // Bright red
    { types: ['function', 'deleted', 'tag'], style: { color: '#ff8866' } }, // Bright orange-red
    { types: ['selector'], style: { color: '#ff5544' } },
    { types: ['important', 'function', 'bold'], style: { fontWeight: 'bold' } },
    { types: ['italic'], style: { fontStyle: 'italic' } },
  ],
};

const blueTheme: PrismTheme = {
  plain: {
    color: '#55ccff', // Bright light cyan
    backgroundColor: '#000a14', // Deep black with blue tint
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#3388bb', opacity: 0.7 },
    },
    { types: ['namespace'], style: { opacity: 0.7 } },
    { types: ['string', 'attr-value'], style: { color: '#66ddff' } }, // Bright light blue
    { types: ['punctuation', 'operator'], style: { color: '#44aadd' } }, // Medium sky blue
    {
      types: [
        'entity',
        'url',
        'symbol',
        'number',
        'boolean',
        'variable',
        'constant',
        'property',
        'regex',
        'inserted',
      ],
      style: { color: '#44bbee' },
    },
    { types: ['atrule', 'keyword', 'attr-name'], style: { color: '#55ccff' } }, // Bright sky blue
    { types: ['function', 'deleted', 'tag'], style: { color: '#77eeff' } }, // Very bright light cyan
    { types: ['selector'], style: { color: '#55ccff' } },
    { types: ['important', 'function', 'bold'], style: { fontWeight: 'bold' } },
    { types: ['italic'], style: { fontStyle: 'italic' } },
  ],
};

const greenTheme: PrismTheme = {
  plain: {
    color: '#33ff66', // Bright phosphor green
    backgroundColor: '#001a0a', // Deep black with green tint
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#00aa44', opacity: 0.7 },
    },
    { types: ['namespace'], style: { opacity: 0.7 } },
    { types: ['string', 'attr-value'], style: { color: '#44ff77' } }, // Bright lime green
    { types: ['punctuation', 'operator'], style: { color: '#22dd55' } }, // Medium green
    {
      types: [
        'entity',
        'url',
        'symbol',
        'number',
        'boolean',
        'variable',
        'constant',
        'property',
        'regex',
        'inserted',
      ],
      style: { color: '#00cc44' },
    },
    { types: ['atrule', 'keyword', 'attr-name'], style: { color: '#00ff55' } }, // Bright green
    { types: ['function', 'deleted', 'tag'], style: { color: '#66ff88' } }, // Very bright green
    { types: ['selector'], style: { color: '#33ff66' } },
    { types: ['important', 'function', 'bold'], style: { fontWeight: 'bold' } },
    { types: ['italic'], style: { fontStyle: 'italic' } },
  ],
};

const purpleTheme: PrismTheme = {
  plain: {
    color: '#bb88ff', // Bright purple
    backgroundColor: '#0a001a', // Deep black with purple tint
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#6644aa', opacity: 0.7 },
    },
    { types: ['namespace'], style: { opacity: 0.7 } },
    { types: ['string', 'attr-value'], style: { color: '#cc99ff' } }, // Bright lavender
    { types: ['punctuation', 'operator'], style: { color: '#9966dd' } }, // Medium purple
    {
      types: [
        'entity',
        'url',
        'symbol',
        'number',
        'boolean',
        'variable',
        'constant',
        'property',
        'regex',
        'inserted',
      ],
      style: { color: '#aa77ee' },
    },
    { types: ['atrule', 'keyword', 'attr-name'], style: { color: '#cc88ff' } }, // Bright purple
    { types: ['function', 'deleted', 'tag'], style: { color: '#ddaaff' } }, // Very bright purple
    { types: ['selector'], style: { color: '#bb88ff' } },
    { types: ['important', 'function', 'bold'], style: { fontWeight: 'bold' } },
    { types: ['italic'], style: { fontStyle: 'italic' } },
  ],
};

const lightTheme: PrismTheme = {
  plain: {
    color: '#000000', // Black text
    backgroundColor: '#ffffff', // White background
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#6a737d', fontStyle: 'italic' }, // Gray comments
    },
    { types: ['namespace'], style: { opacity: 0.7 } },
    { types: ['string', 'attr-value'], style: { color: '#032f62' } }, // Dark blue strings
    { types: ['punctuation', 'operator'], style: { color: '#393a34' } }, // Dark gray
    {
      types: [
        'entity',
        'url',
        'symbol',
        'number',
        'boolean',
        'variable',
        'constant',
        'property',
        'regex',
        'inserted',
      ],
      style: { color: '#005cc5' }, // Blue
    },
    { types: ['atrule', 'keyword', 'attr-name'], style: { color: '#d73a49' } }, // Red keywords
    { types: ['function', 'deleted', 'tag'], style: { color: '#6f42c1' } }, // Purple functions
    { types: ['selector'], style: { color: '#22863a' } }, // Green selectors
    { types: ['important', 'function', 'bold'], style: { fontWeight: 'bold' } },
    { types: ['italic'], style: { fontStyle: 'italic' } },
  ],
};
/* eslint-enable design-system/no-hardcoded-colors */

export function CodeBlock({
  code,
  language = 'typescript',
  maxHeight,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<PrismTheme>(themes.nightOwl);

  // Detect current theme and update syntax highlighting
  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      // Use custom themes for each color theme
      if (theme === 'light') {
        setCurrentTheme(lightTheme);
      } else if (theme === 'dark') {
        setCurrentTheme(themes.nightOwl);
      } else if (theme === 'amber') {
        setCurrentTheme(amberTheme);
      } else if (theme === 'green') {
        setCurrentTheme(greenTheme);
      } else if (theme === 'blue') {
        setCurrentTheme(blueTheme);
      } else if (theme === 'red') {
        setCurrentTheme(redTheme);
      } else if (theme === 'purple') {
        setCurrentTheme(purpleTheme);
      } else {
        setCurrentTheme(lightTheme); // Default to light theme
      }
    };

    // Initial theme detection
    updateTheme();

    // Listen for theme changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []); // Empty deps - theme objects are now module-level constants

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Add $ prompt for bash/shell commands
  const isShell = language === 'bash' || language === 'sh' || language === 'shell';

  return (
    <div
      className="not-prose group relative w-full min-w-0 overflow-hidden"
      role="region"
      aria-label={`Code example in ${language}`}
    >
      <button
        onClick={handleCopy}
        className={cn(
          'absolute top-3 right-3 z-10 transition-colors',
          mode.color.text.muted,
          'hover:opacity-100'
        )}
        aria-label={copied ? 'Code copied' : 'Copy code to clipboard'}
      >
        {copied ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
      <div className={cn('w-full min-w-0 overflow-hidden', mode.color.bg.elevated, mode.radius)}>
        <Highlight theme={currentTheme} code={code.trim()} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} m-0 p-4 text-xs leading-relaxed`}
              style={{
                ...style,
                overflowY: maxHeight ? 'auto' : 'visible',
                maxWidth: '100%',
                width: '100%',
                boxSizing: 'border-box',
                ...(maxHeight && { maxHeight }),
              }}
              tabIndex={0}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="flex whitespace-pre-wrap">
                  {showLineNumbers && (
                    <span
                      className={cn(
                        'mr-4 inline-block w-8 flex-shrink-0 text-right select-none',
                        mode.color.text.muted
                      )}
                    >
                      {i + 1}
                    </span>
                  )}
                  <span className="flex-1">
                    {/* Add $ prompt for shell commands */}
                    {isShell && i === 0 && (
                      <span className={cn('mr-2 select-none', mode.color.text.accent)}>$</span>
                    )}
                    {isShell &&
                      i > 0 &&
                      tokens[i].length > 0 &&
                      tokens[i][0].content.trim() !== '' && (
                        <span className={cn('mr-2 select-none', mode.color.text.accent)}>$</span>
                      )}
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
