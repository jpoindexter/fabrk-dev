'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function TestCookiePage() {
  const clearCookieConsent = () => {
    localStorage.removeItem('cookie-consent');
    localStorage.removeItem('cookie-consent-date');
    window.location.reload();
  };

  const checkConsent = () => {
    const consent = localStorage.getItem('cookie-consent');
    const date = localStorage.getItem('cookie-consent-date');
    alert(
      consent
        ? `Cookie consent saved: ${consent}\nDate: ${date}`
        : 'No cookie consent found in localStorage'
    );
  };

  return (
    <div className="container mx-auto max-w-2xl py-12">
      <Card>
        <CardHeader code="0x00" title="COOKIE_BANNER_TEST" />
        <CardContent className="space-y-4">
          <p className="text-muted-foreground font-mono text-sm">
            Use this page to test the cookie consent banner.
          </p>

          <div className="flex gap-2">
            <Button onClick={clearCookieConsent} variant="destructive">
              &gt; CLEAR CONSENT & RELOAD
            </Button>
            <Button onClick={checkConsent} variant="outline">
              &gt; CHECK STORAGE
            </Button>
          </div>

          <div className="border-border bg-muted/50 space-y-2 border p-4">
            <p className="font-mono text-xs font-semibold">[INSTRUCTIONS]</p>
            <ol className="text-muted-foreground list-inside list-decimal space-y-1 font-mono text-xs">
              <li>Click "CHECK STORAGE" to see if consent is saved</li>
              <li>If saved, click "CLEAR CONSENT & RELOAD"</li>
              <li>Wait 1 second - banner should appear at top-center</li>
              <li>Banner has orange border with cookie icon</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
