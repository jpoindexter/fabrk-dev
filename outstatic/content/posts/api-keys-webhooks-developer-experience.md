---
title: 'API Keys and Webhooks: Building Developer-Friendly Integrations'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'api-keys-webhooks-developer-experience'
description: 'Fabrk includes API key management and webhook infrastructure for building developer-friendly SaaS integrations.'
publishedAt: '2026-01-18T10:00:00.000Z'
---

**Give your users the integration tools they expect.**

---

## Why API Keys and Webhooks?

Modern SaaS products need:

- API access for automation
- Webhooks for real-time events
- Developer documentation
- Key management UI

Fabrk includes all of this.

---

## API Key Model

```prisma
model ApiKey {
  id             String    @id @default(cuid())
  name           String
  key            String    @unique
  hashedKey      String
  organizationId String
  createdBy      String
  lastUsedAt     DateTime?
  expiresAt      DateTime?
  createdAt      DateTime  @default(now())

  organization Organization @relation(fields: [organizationId], references: [id])
}
```

---

## Creating API Keys

```typescript
import { randomBytes, createHash } from 'crypto';

export async function createApiKey(
  orgId: string,
  userId: string,
  name: string
) {
  // Generate key
  const key = `sk_live_${randomBytes(24).toString('hex')}`;

  // Hash for storage
  const hashedKey = createHash('sha256').update(key).digest('hex');

  // Store (never store raw key)
  await prisma.apiKey.create({
    data: {
      name,
      key: key.slice(0, 12) + '...', // Prefix for display
      hashedKey,
      organizationId: orgId,
      createdBy: userId,
    },
  });

  // Return raw key ONCE (user must save it)
  return key;
}
```

---

## Validating API Keys

```typescript
export async function validateApiKey(key: string) {
  const hashedKey = createHash('sha256').update(key).digest('hex');

  const apiKey = await prisma.apiKey.findFirst({
    where: { hashedKey },
    include: { organization: true },
  });

  if (!apiKey) {
    return null;
  }

  // Check expiration
  if (apiKey.expiresAt && apiKey.expiresAt < new Date()) {
    return null;
  }

  // Update last used
  await prisma.apiKey.update({
    where: { id: apiKey.id },
    data: { lastUsedAt: new Date() },
  });

  return apiKey;
}
```

---

## API Authentication Middleware

```typescript
// middleware.ts
export async function middleware(request: Request) {
  if (request.nextUrl.pathname.startsWith('/api/v1')) {
    const authHeader = request.headers.get('authorization');

    if (!authHeader?.startsWith('Bearer ')) {
      return Response.json(
        { error: 'Missing API key' },
        { status: 401 }
      );
    }

    const key = authHeader.replace('Bearer ', '');
    const apiKey = await validateApiKey(key);

    if (!apiKey) {
      return Response.json(
        { error: 'Invalid API key' },
        { status: 401 }
      );
    }

    // Add org context to request
    request.headers.set('x-organization-id', apiKey.organizationId);
  }
}
```

---

## API Key Management UI

```tsx
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';

export function ApiKeyList({ keys, onRevoke }) {
  return (
    <Card>
      <div className="border-b border-border px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">
          [ API KEYS ]
        </span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Key</TableHead>
            <TableHead>Last Used</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {keys.map((key) => (
            <TableRow key={key.id}>
              <TableCell>{key.name}</TableCell>
              <TableCell className="font-mono text-xs">
                {key.key}
              </TableCell>
              <TableCell>
                {key.lastUsedAt
                  ? formatDate(key.lastUsedAt)
                  : 'Never'}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRevoke(key.id)}
                >
                  Revoke
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
```

---

## Webhook Model

```prisma
model Webhook {
  id             String   @id @default(cuid())
  url            String
  events         String[] // ['user.created', 'payment.completed']
  secret         String
  organizationId String
  isActive       Boolean  @default(true)
  createdAt      DateTime @default(now())

  organization Organization    @relation(fields: [organizationId], references: [id])
  deliveries   WebhookDelivery[]
}

model WebhookDelivery {
  id         String   @id @default(cuid())
  webhookId  String
  event      String
  payload    Json
  statusCode Int?
  response   String?
  deliveredAt DateTime @default(now())

  webhook Webhook @relation(fields: [webhookId], references: [id])
}
```

---

## Sending Webhooks

```typescript
import { createHmac } from 'crypto';

export async function sendWebhook(
  orgId: string,
  event: string,
  payload: object
) {
  // Find matching webhooks
  const webhooks = await prisma.webhook.findMany({
    where: {
      organizationId: orgId,
      isActive: true,
      events: { has: event },
    },
  });

  for (const webhook of webhooks) {
    const body = JSON.stringify({
      event,
      data: payload,
      timestamp: new Date().toISOString(),
    });

    // Sign payload
    const signature = createHmac('sha256', webhook.secret)
      .update(body)
      .digest('hex');

    try {
      const response = await fetch(webhook.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Signature': signature,
        },
        body,
      });

      // Log delivery
      await prisma.webhookDelivery.create({
        data: {
          webhookId: webhook.id,
          event,
          payload,
          statusCode: response.status,
        },
      });
    } catch (error) {
      // Log failed delivery
      await prisma.webhookDelivery.create({
        data: {
          webhookId: webhook.id,
          event,
          payload,
          statusCode: 0,
          response: error.message,
        },
      });
    }
  }
}
```

---

## Webhook Signature Verification

Document this for your users:

```typescript
// Example verification code for users
import { createHmac } from 'crypto';

function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expected = createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return signature === expected;
}

// Usage
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-webhook-signature'];

  if (!verifyWebhookSignature(req.body, signature, WEBHOOK_SECRET)) {
    return res.status(401).send('Invalid signature');
  }

  // Process webhook
});
```

---

## Webhook Events

Common events to implement:

| Event | Trigger |
|-------|---------|
| `user.created` | New user registration |
| `user.updated` | Profile changes |
| `payment.completed` | Successful payment |
| `subscription.created` | New subscription |
| `subscription.canceled` | Subscription ended |
| `invoice.paid` | Invoice payment |

---

## Webhook Management UI

```tsx
export function WebhookForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-4">
        <div>
          <Label>Endpoint URL</Label>
          <Input
            name="url"
            placeholder="https://your-app.com/webhook"
          />
        </div>

        <div>
          <Label>Events</Label>
          <div className="space-y-2">
            {EVENTS.map((event) => (
              <div key={event} className="flex items-center gap-2">
                <Checkbox name="events" value={event} />
                <Label>{event}</Label>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit">> CREATE WEBHOOK</Button>
      </div>
    </form>
  );
}
```

---

## Delivery Logs

Show users their webhook history:

```tsx
export function DeliveryLog({ deliveries }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Event</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {deliveries.map((delivery) => (
          <TableRow key={delivery.id}>
            <TableCell>{delivery.event}</TableCell>
            <TableCell>
              <Badge
                variant={
                  delivery.statusCode === 200
                    ? 'success'
                    : 'destructive'
                }
              >
                {delivery.statusCode || 'Failed'}
              </Badge>
            </TableCell>
            <TableCell>
              {formatDate(delivery.deliveredAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

---

## Retry Logic

Implement webhook retries:

```typescript
async function sendWithRetry(
  webhook: Webhook,
  event: string,
  payload: object,
  attempts = 3
) {
  const delays = [0, 60000, 300000]; // 0s, 1m, 5m

  for (let i = 0; i < attempts; i++) {
    if (i > 0) {
      await new Promise((r) => setTimeout(r, delays[i]));
    }

    const success = await sendWebhook(webhook, event, payload);
    if (success) return true;
  }

  return false;
}
```

---

## Components Included

| Component | Purpose |
|-----------|---------|
| `ApiKeyList` | Display API keys |
| `CreateApiKey` | Generate new keys |
| `WebhookForm` | Create webhooks |
| `WebhookList` | Display webhooks |
| `DeliveryLog` | Webhook history |

---

## Best Practices

1. **Never store raw keys** - Hash with SHA-256
2. **Show key once** - User must save it
3. **Sign webhooks** - HMAC-SHA256 signature
4. **Retry failures** - Exponential backoff
5. **Log everything** - For debugging

Developer experience, built in.

