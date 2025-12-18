/**
 * ConvertKit Newsletter Provider
 *
 * Creator-focused, great automations
 *
 * Setup:
 *   1. Create account at convertkit.com
 *   2. Add CONVERTKIT_API_KEY to .env
 *   3. Add CONVERTKIT_FORM_ID to .env (optional)
 */

import type { NewsletterProviderClient, SubscribeOptions, SubscribeResult } from './index';

const API_BASE = 'https://api.convertkit.com/v3';

function getConfig() {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_FORM_ID;

  if (!apiKey) throw new Error('CONVERTKIT_API_KEY is required');

  return { apiKey, formId };
}

export class ConvertKitProvider implements NewsletterProviderClient {
  async subscribe(options: SubscribeOptions): Promise<SubscribeResult> {
    const config = getConfig();

    // If form ID is provided, subscribe via form
    if (config.formId) {
      const res = await fetch(API_BASE + '/forms/' + config.formId + '/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: config.apiKey,
          email: options.email,
          first_name: options.firstName,
          fields: options.fields,
          tags: options.tags,
        }),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error('ConvertKit error: ' + res.status + ' - ' + error);
      }

      const data = await res.json();
      return {
        id: data.subscription?.id?.toString() || '',
        success: true,
      };
    }

    // Otherwise, create subscriber directly
    const res = await fetch(API_BASE + '/subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_secret: config.apiKey,
        email: options.email,
        first_name: options.firstName,
        fields: options.fields,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error('ConvertKit error: ' + res.status + ' - ' + error);
    }

    const data = await res.json();
    return {
      id: data.subscriber?.id?.toString() || '',
      success: true,
    };
  }

  async addTags(email: string, tags: string[]): Promise<void> {
    const config = getConfig();

    // Get subscriber ID first
    const subRes = await fetch(API_BASE + '/subscribers?api_secret=' + config.apiKey + '&email_address=' + encodeURIComponent(email));
    const subData = await subRes.json();
    const subscriberId = subData.subscribers?.[0]?.id;

    if (!subscriberId) {
      throw new Error('Subscriber not found');
    }

    // Add each tag
    for (const tagId of tags) {
      await fetch(API_BASE + '/tags/' + tagId + '/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: config.apiKey,
          email: email,
        }),
      });
    }
  }

  async unsubscribe(email: string): Promise<void> {
    const config = getConfig();

    await fetch(API_BASE + '/unsubscribe', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_secret: config.apiKey,
        email: email,
      }),
    });
  }
}
