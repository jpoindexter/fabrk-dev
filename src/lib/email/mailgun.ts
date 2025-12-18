/**
 * Mailgun Email Provider
 *
 * Developer-friendly, good deliverability
 *
 * Setup:
 *   1. Create account at mailgun.com
 *   2. Add MAILGUN_API_KEY, MAILGUN_DOMAIN to .env
 *   3. Verify your domain
 */

import type { EmailProviderClient, EmailOptions, EmailResult } from './index';

function getConfig() {
  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;

  if (!apiKey) throw new Error('MAILGUN_API_KEY is required');
  if (!domain) throw new Error('MAILGUN_DOMAIN is required');

  return { apiKey, domain };
}

export class MailgunProvider implements EmailProviderClient {
  async send(options: EmailOptions): Promise<EmailResult> {
    const config = getConfig();
    const toArray = Array.isArray(options.to) ? options.to : [options.to];

    const formData = new FormData();
    formData.append('from', options.from || 'noreply@' + config.domain);
    formData.append('to', toArray.join(','));
    formData.append('subject', options.subject);

    if (options.html) {
      formData.append('html', options.html);
    }
    if (options.text) {
      formData.append('text', options.text);
    }
    if (options.replyTo) {
      formData.append('h:Reply-To', options.replyTo);
    }
    if (options.cc) {
      formData.append('cc', options.cc.join(','));
    }
    if (options.bcc) {
      formData.append('bcc', options.bcc.join(','));
    }

    options.attachments?.forEach((attachment) => {
      const content = typeof attachment.content === 'string'
        ? new Blob([attachment.content])
        : new Blob([attachment.content]);
      formData.append('attachment', content, attachment.filename);
    });

    const auth = Buffer.from('api:' + config.apiKey).toString('base64');

    const res = await fetch('https://api.mailgun.net/v3/' + config.domain + '/messages', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + auth,
      },
      body: formData,
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error('Mailgun error: ' + res.status + ' - ' + error);
    }

    const data = await res.json();
    return {
      id: data.id || '',
      success: true,
    };
  }
}
