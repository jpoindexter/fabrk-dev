import type { Locale } from '@/i18n/config';

const RTL_LOCALES: string[] = [
  'ar', // Arabic
  'he', // Hebrew
  'fa', // Persian/Farsi
  'ur', // Urdu
  'yi', // Yiddish
];

export function isRTL(locale: Locale | string): boolean {
  return RTL_LOCALES.includes(locale);
}

export function getTextDirection(locale: Locale | string): 'ltr' | 'rtl' {
  return isRTL(locale) ? 'rtl' : 'ltr';
}

export function getHTMLDir(locale: Locale | string): string {
  return getTextDirection(locale);
}
