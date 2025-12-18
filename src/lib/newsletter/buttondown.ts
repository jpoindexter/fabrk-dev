/**
 * Buttondown Newsletter Provider
 *
 * Simple, markdown-focused, indie maker friendly
 *
 * Setup:
 *   1. Create account at buttondown.email
 *   2. Add BUTTONDOWN_API_KEY to .env
 */

import type { NewsletterProviderClient, SubscribeOptions, SubscribeResult } from './index';

const API_BASE = 'https://api.buttondown.email/v1';

function getConfig() {
  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) throw new Error('BUTTONDOWN_API_KEY is required');
  return { apiKey };
}

export class ButtondownProvider implements NewsletterProviderClient {
  async subscribe(options: SubscribeOptions): Promise<SubscribeResult> {
    const config = getConfig();

    const res = await fetch(API_BASE + '/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': 'Token ' + config.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: options.email,
        metadata: {
          first_name: options.firstName,
          last_name: options.lastName,
          ...options.fields,
        },
        tags: options.tags,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error('Buttondown error: ' + res.status + ' - ' + error);
    }

    const data = await res.json();
    return {
      id: data.id || '',
      success: true,
    };
  }

  async unsubscribe(email: string): Promise<void> {
    const config = getConfig();

    await fetch(API_BASE + '/subscribers/' + encodeURIComponent(email), {
      method: 'DELETE',
      headers: {
        'Authorization': 'Token ' + config.apiKey,
      },
    });
  }

  async addTags(email: string, tags: string[]): Promise<void> {
    const config = getConfig();

    // Get current subscriber
    const getRes = await fetch(API_BASE + '/subscribers/' + encodeURIComponent(email), {
      headers: {
        'Authorization': 'Token ' + config.apiKey,
      },
    });

    if (!getRes.ok) return;

    const subscriber = await getRes.json();
    const existingTags = subscriber.tags || [];

    await fetch(API_BASE + '/subscribers/' + encodeURIComponent(email), {
      method: 'PATCH',
      headers: {
        'Authorization': 'Token ' + config.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tags: [...new Set([...existingTags, ...tags])],
      }),
    });
  }
}
