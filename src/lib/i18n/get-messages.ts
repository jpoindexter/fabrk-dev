import type { Locale } from '@/i18n/config';

export async function getMessages(locale: Locale) {
  try {
    const messages = (await import(`@/i18n/messages/${locale}.json`)).default;
    return messages;
  } catch (error: unknown) {
    // Fallback to English if locale not found
    const messages = (await import(`@/i18n/messages/en.json`)).default;
    return messages;
  }
}
