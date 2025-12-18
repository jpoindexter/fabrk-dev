/**
 * Newsletter Providers - Unified Interface
 *
 * Supports: ConvertKit, Beehiiv, Mailchimp, Buttondown, Loops
 *
 * Usage:
 *   import { subscribe, getNewsletterProvider } from '@/lib/newsletter'
 */

export type NewsletterProvider = 'convertkit' | 'beehiiv' | 'mailchimp' | 'buttondown' | 'loops';

export interface SubscribeOptions {
  email: string;
  firstName?: string;
  lastName?: string;
  tags?: string[];
  fields?: Record<string, string>;
}

export interface SubscribeResult {
  id: string;
  success: boolean;
}

export interface NewsletterProviderClient {
  subscribe(options: SubscribeOptions): Promise<SubscribeResult>;
  unsubscribe?(email: string): Promise<void>;
  addTags?(email: string, tags: string[]): Promise<void>;
}

// Re-export individual providers
export { ConvertKitProvider } from './convertkit';
export { BeehiivProvider } from './beehiiv';
export { MailchimpProvider } from './mailchimp';
export { ButtondownProvider } from './buttondown';
export { LoopsProvider } from './loops';

/**
 * Get newsletter provider based on environment config
 */
export function getNewsletterProvider(): NewsletterProviderClient {
  const provider = process.env.NEWSLETTER_PROVIDER as NewsletterProvider || 'convertkit';

  switch (provider) {
    case 'convertkit':
      return new (require('./convertkit').ConvertKitProvider)();
    case 'beehiiv':
      return new (require('./beehiiv').BeehiivProvider)();
    case 'mailchimp':
      return new (require('./mailchimp').MailchimpProvider)();
    case 'buttondown':
      return new (require('./buttondown').ButtondownProvider)();
    case 'loops':
      return new (require('./loops').LoopsProvider)();
    default:
      throw new Error('Unknown newsletter provider: ' + provider);
  }
}

/**
 * Subscribe an email using the configured provider
 */
export async function subscribe(options: SubscribeOptions): Promise<SubscribeResult> {
  const provider = getNewsletterProvider();
  return provider.subscribe(options);
}
