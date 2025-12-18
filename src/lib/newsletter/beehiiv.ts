/**
 * Beehiiv Newsletter Provider
 *
 * Newsletter monetization, growth tools
 *
 * Setup:
 *   1. Create account at beehiiv.com
 *   2. Add BEEHIIV_API_KEY to .env
 *   3. Add BEEHIIV_PUBLICATION_ID to .env
 */

import type { NewsletterProviderClient, SubscribeOptions, SubscribeResult } from './index';

const API_BASE = 'https://api.beehiiv.com/v2';

function getConfig() {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey) throw new Error('BEEHIIV_API_KEY is required');
  if (!publicationId) throw new Error('BEEHIIV_PUBLICATION_ID is required');

  return { apiKey, publicationId };
}

export class BeehiivProvider implements NewsletterProviderClient {
  async subscribe(options: SubscribeOptions): Promise<SubscribeResult> {
    const config = getConfig();

    const res = await fetch(API_BASE + '/publications/' + config.publicationId + '/subscriptions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + config.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: options.email,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: 'website',
        custom_fields: options.fields ? Object.entries(options.fields).map(([name, value]) => ({ name, value })) : undefined,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error('Beehiiv error: ' + res.status + ' - ' + error);
    }

    const data = await res.json();
    return {
      id: data.data?.id || '',
      success: true,
    };
  }

  async unsubscribe(email: string): Promise<void> {
    const config = getConfig();

    // Get subscription ID first
    const searchRes = await fetch(
      API_BASE + '/publications/' + config.publicationId + '/subscriptions?email=' + encodeURIComponent(email),
      {
        headers: { 'Authorization': 'Bearer ' + config.apiKey },
      }
    );

    const searchData = await searchRes.json();
    const subscriptionId = searchData.data?.[0]?.id;

    if (!subscriptionId) return;

    await fetch(API_BASE + '/publications/' + config.publicationId + '/subscriptions/' + subscriptionId, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + config.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        unsubscribe: true,
      }),
    });
  }
}
