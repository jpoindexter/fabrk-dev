# Provider Infrastructure

Fabrk includes a unified provider system with 34+ integrations across 6 categories. Each provider implements a common interface, making them easily swappable.

---

## Overview

| Category | Providers | Default |
|----------|-----------|---------|
| **Payments** | Stripe, Lemonsqueezy, Paddle, Polar, PayPal | Stripe |
| **Email** | Resend, Postmark, SendGrid, AWS SES, Mailgun | Resend |
| **Newsletter** | ConvertKit, Beehiiv, Mailchimp, Buttondown, Loops | ConvertKit |
| **AI** | OpenAI, Anthropic, Google, xAI, DeepSeek, Mistral, Groq, Together, Ollama | OpenAI |
| **Search** | Algolia, Typesense, Meilisearch, Elasticsearch, Fuse.js | Algolia |
| **Storage** | Cloudflare R2, AWS S3, Supabase, UploadThing, Vercel Blob | R2 |

---

## Payment Providers

All payment providers implement the `PaymentProviderClient` interface:

```typescript
interface PaymentProviderClient {
  createCheckoutSession(options: CheckoutOptions): Promise<CheckoutResult>;
  createCustomer(email: string, metadata?: Record<string, string>): Promise<string>;
  getSubscription(subscriptionId: string): Promise<SubscriptionInfo>;
  cancelSubscription(subscriptionId: string): Promise<void>;
  verifyWebhook(payload: string | Buffer, signature: string): Promise<WebhookEvent>;
}
```

### Stripe (Recommended)

Industry standard for subscriptions and one-time payments.

```typescript
import { StripeProvider } from '@/lib/payments/stripe';

const stripe = new StripeProvider();
const session = await stripe.createCheckoutSession({
  priceId: 'price_xxx',
  customerId: 'cus_xxx',
  successUrl: '/success',
  cancelUrl: '/cancel',
});
```

**Environment Variables:**
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Lemonsqueezy

Digital products with EU/tax handling built-in.

```typescript
import { LemonsqueezyProvider } from '@/lib/payments/lemonsqueezy';

const lemon = new LemonsqueezyProvider();
const session = await lemon.createCheckoutSession({
  variantId: 'variant_xxx',
  email: 'customer@example.com',
});
```

**Environment Variables:**
```env
LEMONSQUEEZY_API_KEY=eyJ...
LEMONSQUEEZY_WEBHOOK_SECRET=...
LEMONSQUEEZY_STORE_ID=...
```

### Paddle

Merchant of record with global tax compliance.

```typescript
import { PaddleProvider } from '@/lib/payments/paddle';

const paddle = new PaddleProvider();
const session = await paddle.createCheckoutSession({
  priceId: 'pri_xxx',
  customerId: 'ctm_xxx',
});
```

**Environment Variables:**
```env
PADDLE_API_KEY=...
PADDLE_WEBHOOK_SECRET=pdl_...
```

### Polar.sh

Open source monetization for developers.

```typescript
import { PolarProvider } from '@/lib/payments/polar';

const polar = new PolarProvider();
const session = await polar.createCheckoutSession({
  productPriceId: 'pp_xxx',
  customerEmail: 'dev@example.com',
});
```

**Environment Variables:**
```env
POLAR_ACCESS_TOKEN=polar_...
```

### PayPal

Global reach with trusted brand recognition.

```typescript
import { PayPalProvider } from '@/lib/payments/paypal';

const paypal = new PayPalProvider();
const session = await paypal.createCheckoutSession({
  planId: 'P-xxx',
  successUrl: '/success',
  cancelUrl: '/cancel',
});
```

**Environment Variables:**
```env
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_WEBHOOK_ID=...
```

---

## Email Providers

All email providers implement the `EmailProviderClient` interface:

```typescript
interface EmailProviderClient {
  send(options: EmailOptions): Promise<EmailResult>;
}

interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
}
```

### Resend (Recommended)

Modern email API with React email template support.

```typescript
import { ResendProvider } from '@/lib/email/resend';

const resend = new ResendProvider();
await resend.send({
  to: 'user@example.com',
  subject: 'Welcome!',
  html: '<h1>Welcome to our app!</h1>',
});
```

**Environment Variables:**
```env
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@yourdomain.com
```

### Postmark

Best-in-class deliverability rates.

```typescript
import { PostmarkProvider } from '@/lib/email/postmark';

const postmark = new PostmarkProvider();
await postmark.send({
  to: 'user@example.com',
  subject: 'Welcome!',
  html: '<h1>Welcome!</h1>',
});
```

**Environment Variables:**
```env
POSTMARK_API_KEY=...
EMAIL_FROM=noreply@yourdomain.com
```

### SendGrid

High volume sending with marketing features.

```typescript
import { SendGridProvider } from '@/lib/email/sendgrid';

const sendgrid = new SendGridProvider();
await sendgrid.send({
  to: 'user@example.com',
  subject: 'Welcome!',
  html: '<h1>Welcome!</h1>',
});
```

**Environment Variables:**
```env
SENDGRID_API_KEY=SG....
EMAIL_FROM=noreply@yourdomain.com
```

### AWS SES

Most cost-effective at scale.

```typescript
import { SESProvider } from '@/lib/email/ses';

const ses = new SESProvider();
await ses.send({
  to: 'user@example.com',
  subject: 'Welcome!',
  html: '<h1>Welcome!</h1>',
});
```

**Environment Variables:**
```env
AWS_SES_ACCESS_KEY=AKIA...
AWS_SES_SECRET_KEY=...
AWS_SES_REGION=us-east-1
EMAIL_FROM=noreply@yourdomain.com
```

### Mailgun

Developer-friendly with powerful routing.

```typescript
import { MailgunProvider } from '@/lib/email/mailgun';

const mailgun = new MailgunProvider();
await mailgun.send({
  to: 'user@example.com',
  subject: 'Welcome!',
  html: '<h1>Welcome!</h1>',
});
```

**Environment Variables:**
```env
MAILGUN_API_KEY=key-...
MAILGUN_DOMAIN=mg.yourdomain.com
EMAIL_FROM=noreply@mg.yourdomain.com
```

---

## Newsletter Providers

All newsletter providers implement the `NewsletterProviderClient` interface:

```typescript
interface NewsletterProviderClient {
  subscribe(email: string, options?: SubscribeOptions): Promise<void>;
  unsubscribe(email: string): Promise<void>;
  getSubscriber?(email: string): Promise<Subscriber | null>;
}
```

### ConvertKit (Recommended)

Creator-focused with powerful automations.

```typescript
import { ConvertKitProvider } from '@/lib/newsletter/convertkit';

const ck = new ConvertKitProvider();
await ck.subscribe('user@example.com', { tags: ['free-trial'] });
```

**Environment Variables:**
```env
CONVERTKIT_API_KEY=...
CONVERTKIT_FORM_ID=...
```

### Beehiiv

Newsletter monetization built-in.

```typescript
import { BeehiivProvider } from '@/lib/newsletter/beehiiv';

const beehiiv = new BeehiivProvider();
await beehiiv.subscribe('user@example.com');
```

**Environment Variables:**
```env
BEEHIIV_API_KEY=...
BEEHIIV_PUBLICATION_ID=...
```

### Mailchimp

Enterprise features with extensive integrations.

```typescript
import { MailchimpProvider } from '@/lib/newsletter/mailchimp';

const mc = new MailchimpProvider();
await mc.subscribe('user@example.com', { tags: ['saas'] });
```

**Environment Variables:**
```env
MAILCHIMP_API_KEY=...
MAILCHIMP_SERVER=us1
MAILCHIMP_LIST_ID=...
```

### Buttondown

Simple, markdown-focused newsletters.

```typescript
import { ButtondownProvider } from '@/lib/newsletter/buttondown';

const bd = new ButtondownProvider();
await bd.subscribe('user@example.com');
```

**Environment Variables:**
```env
BUTTONDOWN_API_KEY=...
```

### Loops

Modern, SaaS-focused email marketing.

```typescript
import { LoopsProvider } from '@/lib/newsletter/loops';

const loops = new LoopsProvider();
await loops.subscribe('user@example.com', { properties: { plan: 'pro' } });
```

**Environment Variables:**
```env
LOOPS_API_KEY=...
```

---

## AI Providers

All AI providers implement the `AIProviderClient` interface:

```typescript
interface AIProviderClient {
  chat(options: ChatOptions): Promise<ChatResponse>;
  stream?(options: ChatOptions): AsyncGenerator<string>;
}

interface ChatOptions {
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}
```

### OpenAI (Recommended)

GPT-4o, o1, and embeddings.

```typescript
import { OpenAIProvider } from '@/lib/ai/openai';

const openai = new OpenAIProvider();
const response = await openai.chat({
  messages: [{ role: 'user', content: 'Hello!' }],
  model: 'gpt-4o',
});
```

**Environment Variables:**
```env
OPENAI_API_KEY=sk-...
```

### Anthropic

Claude 3.5 Sonnet and Opus models.

```typescript
import { AnthropicProvider } from '@/lib/ai/anthropic';

const anthropic = new AnthropicProvider();
const response = await anthropic.chat({
  messages: [{ role: 'user', content: 'Hello!' }],
  model: 'claude-3-5-sonnet-20241022',
});
```

**Environment Variables:**
```env
ANTHROPIC_API_KEY=sk-ant-...
```

### Google AI

Gemini 2.0 and Flash models.

```typescript
import { GoogleAIProvider } from '@/lib/ai/google';

const google = new GoogleAIProvider();
const response = await google.chat({
  messages: [{ role: 'user', content: 'Hello!' }],
  model: 'gemini-2.0-flash',
});
```

**Environment Variables:**
```env
GOOGLE_AI_API_KEY=AIza...
```

### xAI (Grok)

Grok 2 with real-time data access.

```typescript
import { XAIProvider } from '@/lib/ai/xai';

const xai = new XAIProvider();
const response = await xai.chat({
  messages: [{ role: 'user', content: 'Hello!' }],
  model: 'grok-2',
});
```

**Environment Variables:**
```env
XAI_API_KEY=xai-...
```

### DeepSeek

DeepSeek V3 and R1 reasoning models.

```typescript
import { DeepSeekProvider } from '@/lib/ai/deepseek';

const deepseek = new DeepSeekProvider();
const response = await deepseek.chat({
  messages: [{ role: 'user', content: 'Hello!' }],
  model: 'deepseek-chat',
});
```

**Environment Variables:**
```env
DEEPSEEK_API_KEY=sk-...
```

### Mistral

Mistral Large 2 and Codestral.

```typescript
import { MistralProvider } from '@/lib/ai/mistral';

const mistral = new MistralProvider();
const response = await mistral.chat({
  messages: [{ role: 'user', content: 'Hello!' }],
  model: 'mistral-large-latest',
});
```

**Environment Variables:**
```env
MISTRAL_API_KEY=...
```

### Groq

Fastest inference speeds.

```typescript
import { GroqProvider } from '@/lib/ai/groq';

const groq = new GroqProvider();
const response = await groq.chat({
  messages: [{ role: 'user', content: 'Hello!' }],
  model: 'llama-3.3-70b-versatile',
});
```

**Environment Variables:**
```env
GROQ_API_KEY=gsk_...
```

### Together AI

Open models at low cost.

```typescript
import { TogetherProvider } from '@/lib/ai/together';

const together = new TogetherProvider();
const response = await together.chat({
  messages: [{ role: 'user', content: 'Hello!' }],
  model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
});
```

**Environment Variables:**
```env
TOGETHER_API_KEY=...
```

### Ollama

Local models, completely free.

```typescript
import { OllamaProvider } from '@/lib/ai/ollama';

const ollama = new OllamaProvider();
const response = await ollama.chat({
  messages: [{ role: 'user', content: 'Hello!' }],
  model: 'llama3.2',
});
```

**Environment Variables:**
```env
OLLAMA_BASE_URL=http://localhost:11434
```

---

## Search Providers

All search providers implement the `SearchProviderClient` interface:

```typescript
interface SearchProviderClient {
  search(query: string, options?: SearchOptions): Promise<SearchResult[]>;
  index(id: string, document: Record<string, unknown>): Promise<void>;
  delete?(id: string): Promise<void>;
}
```

### Algolia (Recommended)

Fastest search with typo tolerance.

```typescript
import { AlgoliaProvider } from '@/lib/search/algolia';

const algolia = new AlgoliaProvider('products');
const results = await algolia.search('laptop');
await algolia.index('prod_1', { name: 'MacBook Pro', price: 2499 });
```

**Environment Variables:**
```env
ALGOLIA_APP_ID=XXXXXX
ALGOLIA_API_KEY=...
```

### Typesense

Open source Algolia alternative.

```typescript
import { TypesenseProvider } from '@/lib/search/typesense';

const typesense = new TypesenseProvider('products');
const results = await typesense.search('laptop');
```

**Environment Variables:**
```env
TYPESENSE_HOST=xxx.typesense.net
TYPESENSE_API_KEY=...
```

### Meilisearch

Easy setup, great defaults.

```typescript
import { MeilisearchProvider } from '@/lib/search/meilisearch';

const meili = new MeilisearchProvider('products');
const results = await meili.search('laptop');
```

**Environment Variables:**
```env
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_API_KEY=...
```

### Elasticsearch

Full-text search for enterprise.

```typescript
import { ElasticsearchProvider } from '@/lib/search/elasticsearch';

const es = new ElasticsearchProvider('products');
const results = await es.search('laptop');
```

**Environment Variables:**
```env
ELASTICSEARCH_URL=https://...
ELASTICSEARCH_API_KEY=...
```

### Fuse.js

Client-side search, no API needed.

```typescript
import { FuseProvider } from '@/lib/search/fuse';

const data = [{ name: 'MacBook Pro' }, { name: 'ThinkPad' }];
const fuse = new FuseProvider(data, { keys: ['name'] });
const results = fuse.search('mac');
```

**Environment Variables:** None required.

---

## Storage Providers

All storage providers implement the `StorageProviderClient` interface:

```typescript
interface StorageProviderClient {
  upload(options: UploadOptions): Promise<UploadResult>;
  delete(key: string): Promise<void>;
  getUrl(key: string): Promise<string>;
  list?(prefix?: string): Promise<string[]>;
}
```

### Cloudflare R2 (Recommended)

S3-compatible with zero egress fees.

```typescript
import { R2Provider } from '@/lib/storage/r2';

const r2 = new R2Provider();
const result = await r2.upload({
  file: buffer,
  filename: 'avatar.png',
  contentType: 'image/png',
});
```

**Environment Variables:**
```env
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET=my-bucket
R2_ACCOUNT_ID=...
R2_PUBLIC_URL=https://pub-xxx.r2.dev
```

### AWS S3

Industry standard object storage.

```typescript
import { S3Provider } from '@/lib/storage/s3';

const s3 = new S3Provider();
const result = await s3.upload({
  file: buffer,
  filename: 'avatar.png',
  contentType: 'image/png',
});
```

**Environment Variables:**
```env
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=my-bucket
AWS_S3_REGION=us-east-1
```

### Supabase Storage

Integrated with Supabase database.

```typescript
import { SupabaseStorageProvider } from '@/lib/storage/supabase';

const storage = new SupabaseStorageProvider();
const result = await storage.upload({
  file: buffer,
  filename: 'avatar.png',
  contentType: 'image/png',
});
```

**Environment Variables:**
```env
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
```

### UploadThing

Simple, type-safe uploads for Next.js.

```typescript
import { UploadThingProvider } from '@/lib/storage/uploadthing';

const ut = new UploadThingProvider();
const result = await ut.upload({
  file: buffer,
  filename: 'avatar.png',
  contentType: 'image/png',
});
```

**Environment Variables:**
```env
UPLOADTHING_SECRET=sk_live_...
```

### Vercel Blob

Zero config on Vercel platform.

```typescript
import { VercelBlobProvider } from '@/lib/storage/vercel-blob';

const blob = new VercelBlobProvider();
const result = await blob.upload({
  file: buffer,
  filename: 'avatar.png',
  contentType: 'image/png',
});
```

**Environment Variables:**
```env
BLOB_READ_WRITE_TOKEN=vercel_blob_...
```

---

## Switching Providers

All providers implement the same interface, making switching easy:

```typescript
// Before: Using Stripe
import { StripeProvider } from '@/lib/payments/stripe';
const payments = new StripeProvider();

// After: Switch to Lemonsqueezy
import { LemonsqueezyProvider } from '@/lib/payments/lemonsqueezy';
const payments = new LemonsqueezyProvider();

// Usage stays the same
await payments.createCheckoutSession({ ... });
```

---

## Factory Pattern

Use the factory function to instantiate providers from environment:

```typescript
import { createPaymentProvider } from '@/lib/payments';
import { createEmailProvider } from '@/lib/email';
import { createAIProvider } from '@/lib/ai';

// Reads PAYMENT_PROVIDER env var (defaults to 'stripe')
const payments = createPaymentProvider();

// Reads EMAIL_PROVIDER env var (defaults to 'resend')
const email = createEmailProvider();

// Reads AI_PROVIDER env var (defaults to 'openai')
const ai = createAIProvider();
```

---

## Related Documentation

- [Setup Wizard](../01-getting-started/QUICK-START.md) - Configure providers interactively
- [Environment Variables](./ENV-VALIDATION.md) - All supported env vars
- [Webhooks](./WEBHOOKS.md) - Webhook handling for payments
