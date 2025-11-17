'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    // Store locale preference in cookie
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;

    // Get current path without locale prefix
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '');

    // Navigate to new locale path
    router.push(`/${newLocale}${pathWithoutLocale || ''}`);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-2 border-brutal rounded-brutal shadow-brutal hover:shadow-brutal-lg transition-all"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline-flex items-center gap-1">
            <span>{localeFlags[locale]}</span>
            <span>{localeNames[locale]}</span>
          </span>
          <span className="sm:hidden">{localeFlags[locale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => switchLocale(loc)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-lg">{localeFlags[loc]}</span>
            <span className="flex-1">{localeNames[loc]}</span>
            {locale === loc && (
              <span className="text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
