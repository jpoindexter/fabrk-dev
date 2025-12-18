/**
 * Loops Newsletter Provider
 *
 * Modern, SaaS-focused, great for product updates
 *
 * Setup:
 *   1. Create account at loops.so
 *   2. Add LOOPS_API_KEY to .env
 */

import type { NewsletterProviderClient, SubscribeOptions, SubscribeResult } from './index';

const API_BASE = 'https://app.loops.so/api/v1';

function getConfig() {
  const apiKey = process.env.LOOPS_API_KEY;
  if (!apiKey) throw new Error('LOOPS_API_KEY is required');
  return { apiKey };
}

export class LoopsProvider implements NewsletterProviderClient {
  async subscribe(options: SubscribeOptions): Promise<SubscribeResult> {
    const config = getConfig();

    const res = await fetch(API_BASE + '/contacts/create', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + config.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: options.email,
        firstName: options.firstName,
        lastName: options.lastName,
        source: 'website',
        subscribed: true,
        userGroup: options.tags?.[0], // Loops uses userGroup instead of tags
        ...options.fields,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error('Loops error: ' + res.status + ' - ' + error);
    }

    const data = await res.json();
    return {
      id: data.id || options.email,
      success: data.success || true,
    };
  }

  async unsubscribe(email: string): Promise<void> {
    const config = getConfig();

    await fetch(API_BASE + '/contacts/update', {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + config.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        subscribed: false,
      }),
    });
  }
}
