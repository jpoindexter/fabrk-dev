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
      // Use nightOwl theme for both light and dark modes
      setCurrentTheme(themes.nightOwl);
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
  }, []);

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
      {/* Copy button - icon only, white for dark nightOwl theme */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 z-10 text-white/70 transition-colors hover:text-white" // intentional
        aria-label={copied ? 'Code copied' : 'Copy code to clipboard'}
      >
        {copied ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
      <div className={cn('bg-card w-full min-w-0 overflow-hidden', mode.radius)}>
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
                  {/* Line number */}
                  {showLineNumbers && (
                    <span className="mr-4 inline-block w-8 flex-shrink-0 text-right text-white/60 select-none">
                      {' '}
                      {/* intentional */}
                      {i + 1}
                    </span>
                  )}
                  <span className="flex-1">
                    {/* Add $ prompt for shell commands */}
                    {isShell && i === 0 && <span className="text-primary mr-2 select-none">$</span>}
                    {isShell &&
                      i > 0 &&
                      tokens[i].length > 0 &&
                      tokens[i][0].content.trim() !== '' && (
                        <span className="text-primary mr-2 select-none">$</span>
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
