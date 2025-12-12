/**
 * Minimal Cookie Consent Banner
 * Compact top banner for marketing pages
 */

'use client';

import { Cookie, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function MinimalCookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user already made a choice
    const hasConsent = localStorage.getItem('cookie-consent');
    if (!hasConsent) {
      // Show banner after short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpenSettings = () => {
    // Trigger the main cookie settings modal
    window.dispatchEvent(new Event('open-cookie-settings'));
    setIsVisible(false);
  };

  const handleDismiss = () => {
    // Save minimal consent (necessary only)
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({
        necessary: true,
        preferences: false,
        statistics: false,
        marketing: false,
      })
    );
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed top-4 left-1/2 z-50 -translate-x-1/2',
        'animate-in slide-in-from-top-5 duration-300'
      )}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent banner"
    >
      <div
        className={cn(
          'bg-card border-accent flex items-center gap-4 border-2 px-4 py-3',
          mode.radius
        )}
      >
        <Cookie className="text-accent h-5 w-5 flex-shrink-0" />
        <button
          onClick={handleOpenSettings}
          className={cn('text-accent hover:text-accent/80 text-sm transition-colors', mode.font)}
        >
          &gt; COOKIE SETTINGS
        </button>
        <button
          onClick={handleDismiss}
          className={cn('text-accent hover:text-accent/80 ml-4 transition-opacity', mode.font)}
          aria-label="Dismiss and reject all"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
