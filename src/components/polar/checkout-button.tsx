'use client';

import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { trackCTAClicked } from '@/lib/analytics/events';

const REPO_URL = 'https://github.com/THEFT-DEV/fabrk';

interface PolarCheckoutButtonProps {
  customerEmail?: string;
  className?: string;
  children?: React.ReactNode;
  discountId?: string;
  skipDiscount?: boolean;
}

export function PolarCheckoutButton({
  className,
  children = '> GITHUB',
}: PolarCheckoutButtonProps) {
  const handleClick = () => {
    trackCTAClicked({
      ctaText: 'GITHUB',
      ctaLocation: 'hero',
      page: window.location.pathname,
    });
    window.open(REPO_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button onClick={handleClick} className={className}>
      <Github className="mr-2 h-4 w-4" />
      {children}
    </Button>
  );
}
