---
title: 'Transactional Email with Resend: Developer-First Email'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'transactional-email-resend'
description: 'Send beautiful transactional emails with Resend. Fabrk includes pre-built templates for welcome emails, password resets, and more.'
publishedAt: '2026-01-26T10:00:00.000Z'
---

**Email that developers actually enjoy building.**

---

## Why Resend?

Resend is built for developers:

- Simple API (one function to send)
- React email templates
- Excellent deliverability
- Real-time analytics
- Generous free tier (3,000 emails/month)

Fabrk integrates Resend out of the box.

---

## Configuration

Add your Resend API key:

```bash
# .env.local
RESEND_API_KEY="re_..."
```

That's it. Email is ready.

---

## Sending Email

The simplest email send:

```typescript
import { resend } from '@/lib/email';

await resend.emails.send({
  from: 'noreply@yourdomain.com',
  to: 'user@example.com',
  subject: 'Welcome to Our App',
  html: '<p>Thanks for signing up!</p>',
});
```

---

## Email Service

Fabrk includes an email service with pre-built methods:

```typescript
import { sendEmail } from '@/lib/email';

// Welcome email
await sendEmail.welcome({
  to: user.email,
  name: user.name,
});

// Password reset
await sendEmail.passwordReset({
  to: user.email,
  resetUrl: `https://app.com/reset?token=${token}`,
});

// Invoice
await sendEmail.invoice({
  to: user.email,
  invoiceNumber: 'INV-001',
  amount: '$99.00',
  downloadUrl: invoiceUrl,
});
```

---

## React Email Templates

Build templates with React:

```tsx
// emails/welcome.tsx
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Button,
} from '@react-email/components';

export function WelcomeEmail({ name, loginUrl }) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Text style={heading}>
            Welcome, {name}!
          </Text>
          <Text style={paragraph}>
            Your account is ready. Click below to get started.
          </Text>
          <Button href={loginUrl} style={button}>
            Go to Dashboard
          </Button>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#0a0a0a',
  fontFamily: 'monospace',
};

const container = {
  padding: '40px',
  maxWidth: '600px',
  margin: '0 auto',
};

const heading = {
  color: '#ffffff',
  fontSize: '24px',
};

const paragraph = {
  color: '#a0a0a0',
  fontSize: '14px',
};

const button = {
  backgroundColor: '#7c3aed',
  color: '#ffffff',
  padding: '12px 24px',
  textDecoration: 'none',
};
```

---

## Using Templates

Render and send React templates:

```typescript
import { render } from '@react-email/render';
import { WelcomeEmail } from '@/emails/welcome';
import { resend } from '@/lib/email';

const html = render(
  <WelcomeEmail
    name={user.name}
    loginUrl="https://app.com/login"
  />
);

await resend.emails.send({
  from: 'welcome@yourdomain.com',
  to: user.email,
  subject: 'Welcome to Our App',
  html,
});
```

---

## Pre-Built Templates

Fabrk includes email templates for:

| Template | Use Case |
|----------|----------|
| `welcome.tsx` | New user signup |
| `password-reset.tsx` | Password reset link |
| `email-verify.tsx` | Email verification |
| `invoice.tsx` | Payment receipt |
| `team-invite.tsx` | Organization invite |
| `subscription-updated.tsx` | Plan changes |

All styled to match the terminal aesthetic.

---

## Terminal-Styled Emails

Emails follow the Fabrk design system:

```tsx
const styles = {
  body: {
    backgroundColor: '#0a0a0a',
    fontFamily: 'JetBrains Mono, monospace',
  },
  container: {
    border: '1px solid #27272a',
    padding: '24px',
  },
  heading: {
    color: '#fafafa',
    textTransform: 'uppercase',
  },
  muted: {
    color: '#71717a',
    fontSize: '12px',
  },
};
```

---

## Error Handling

Handle send failures gracefully:

```typescript
try {
  const { data, error } = await resend.emails.send({
    from: 'noreply@yourdomain.com',
    to: user.email,
    subject: 'Welcome',
    html: emailHtml,
  });

  if (error) {
    console.error('Email failed:', error);
    // Queue for retry
    return;
  }

  console.log('Email sent:', data.id);
} catch (error) {
  console.error('Email error:', error);
}
```

---

## Testing Locally

Preview emails without sending:

```bash
# Start email preview server
npm run email:dev
```

Opens at `http://localhost:3030` with live preview of all templates.

---

## Webhooks

Track email events:

```typescript
// src/app/api/email/webhook/route.ts
export async function POST(request: Request) {
  const event = await request.json();

  switch (event.type) {
    case 'email.delivered':
      console.log('Delivered:', event.data.email_id);
      break;
    case 'email.bounced':
      // Mark email as invalid
      await markEmailInvalid(event.data.to);
      break;
    case 'email.complained':
      // Unsubscribe user
      await unsubscribeUser(event.data.to);
      break;
  }

  return new Response('OK');
}
```

---

## Best Practices

1. **Use a custom domain** - Better deliverability than `@resend.dev`
2. **Include unsubscribe links** - Required for marketing emails
3. **Test across clients** - Gmail, Outlook, Apple Mail render differently
4. **Keep it simple** - Complex layouts break in email
5. **Use inline styles** - CSS support is limited

---

## Getting Started

1. Sign up at resend.com
2. Add `RESEND_API_KEY` to `.env.local`
3. Verify your sending domain
4. Import `sendEmail` from `@/lib/email`
5. Send your first email

Email, the developer-friendly way.

