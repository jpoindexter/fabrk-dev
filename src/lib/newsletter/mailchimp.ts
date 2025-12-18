/**
 * Mailchimp Newsletter Provider
 *
 * Enterprise, legacy, marketing automation
 *
 * Setup:
 *   1. Create account at mailchimp.com
 *   2. Add MAILCHIMP_API_KEY to .env
 *   3. Add MAILCHIMP_SERVER to .env (e.g., us1)
 *   4. Add MAILCHIMP_LIST_ID to .env
 */

import crypto from 'crypto';
import type { NewsletterProviderClient, SubscribeOptions, SubscribeResult } from './index';

function getConfig() {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const server = process.env.MAILCHIMP_SERVER;
  const listId = process.env.MAILCHIMP_LIST_ID;

  if (!apiKey) throw new Error('MAILCHIMP_API_KEY is required');
  if (!server) throw new Error('MAILCHIMP_SERVER is required');
  if (!listId) throw new Error('MAILCHIMP_LIST_ID is required');

  return { apiKey, server, listId };
}

function getSubscriberHash(email: string): string {
  return crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
}

export class MailchimpProvider implements NewsletterProviderClient {
  async subscribe(options: SubscribeOptions): Promise<SubscribeResult> {
    const config = getConfig();
    const apiBase = 'https://' + config.server + '.api.mailchimp.com/3.0';

    const res = await fetch(apiBase + '/lists/' + config.listId + '/members', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from('anystring:' + config.apiKey).toString('base64'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: options.email,
        status: 'subscribed',
        merge_fields: {
          FNAME: options.firstName || '',
          LNAME: options.lastName || '',
          ...options.fields,
        },
        tags: options.tags,
      }),
    });

    // 400 might mean already subscribed
    if (!res.ok && res.status !== 400) {
      const error = await res.text();
      throw new Error('Mailchimp error: ' + res.status + ' - ' + error);
    }

    const data = await res.json();
    return {
      id: data.id || getSubscriberHash(options.email),
      success: true,
    };
  }

  async addTags(email: string, tags: string[]): Promise<void> {
    const config = getConfig();
    const apiBase = 'https://' + config.server + '.api.mailchimp.com/3.0';
    const hash = getSubscriberHash(email);

    await fetch(apiBase + '/lists/' + config.listId + '/members/' + hash + '/tags', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from('anystring:' + config.apiKey).toString('base64'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tags: tags.map((name) => ({ name, status: 'active' })),
      }),
    });
  }

  async unsubscribe(email: string): Promise<void> {
    const config = getConfig();
    const apiBase = 'https://' + config.server + '.api.mailchimp.com/3.0';
    const hash = getSubscriberHash(email);

    await fetch(apiBase + '/lists/' + config.listId + '/members/' + hash, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Basic ' + Buffer.from('anystring:' + config.apiKey).toString('base64'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'unsubscribed',
      }),
    });
  }
}
