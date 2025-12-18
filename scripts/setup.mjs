#!/usr/bin/env node

/**
 * Fabrk Setup Wizard
 * Tab-based navigation with Amber CRT aesthetic
 */

import * as readline from 'node:readline';
import { stdin, stdout } from 'node:process';
import { readFile, writeFile, copyFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes } from 'node:crypto';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run') || args.includes('-n');

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');

// ============================================================================
// AMBER CRT COLORS
// ============================================================================

const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  amber: '\x1b[33m',
  amberBright: '\x1b[93m',
  amberDim: '\x1b[2m\x1b[33m',
  bgAmber: '\x1b[43m',
  black: '\x1b[30m',
};

const clear = () => stdout.write('\x1b[2J\x1b[H');
const hideCursor = () => stdout.write('\x1b[?25l');
const showCursor = () => stdout.write('\x1b[?25h');

// ============================================================================
// TEMPLATES & DATA
// ============================================================================

const TEMPLATES = [
  { name: 'STARTER', file: 'starter.json', time: '30 sec', keys: 0, desc: 'SQLite + NextAuth', detail: 'demos, prototypes' },
  { name: 'SAAS', file: 'saas.json', time: '4-5 min', keys: 3, desc: 'PostgreSQL + Stripe + Resend', detail: 'subscription apps', recommended: true },
  { name: 'AI APP', file: 'ai-app.json', time: '5-6 min', keys: 4, desc: 'SaaS + OpenAI', detail: 'AI wrappers, chat' },
  { name: 'MARKETPLACE', file: 'marketplace.json', time: '6-7 min', keys: 5, desc: 'SaaS + Algolia + S3', detail: 'platforms' },
  { name: 'CUSTOM', file: null, time: 'varies', keys: '?', desc: 'Mix and match', detail: 'pick each feature' },
];

const MARKETPLACE_STYLES = [
  { name: 'AMAZON/ETSY', value: 'amazon', source: 'marketplace-amazon.tsx', desc: 'Product grid' },
  { name: 'AIRBNB', value: 'airbnb', source: 'marketplace-airbnb.tsx', desc: 'Listing cards' },
  { name: 'GUMROAD', value: 'minimal', source: 'marketplace-minimal.tsx', desc: 'Minimal creator' },
];

const STARTER_PAGES = {
  saas: { source: 'saas.tsx', name: 'SaaS Landing' },
  'ai-app': { source: 'ai-app.tsx', name: 'AI App Landing' },
};

const API_KEY_INFO = {
  // Database
  DATABASE_URL: { format: 'postgresql://user:pass@host:5432/db', where: 'supabase.com / neon.tech / vercel.com/storage' },
  MONGODB_URI: { format: 'mongodb+srv://...', where: 'cloud.mongodb.com' },

  // Payments
  STRIPE_SECRET_KEY: { format: 'sk_test_...', where: 'dashboard.stripe.com/apikeys' },
  STRIPE_WEBHOOK_SECRET: { format: 'whsec_...', where: 'dashboard.stripe.com/webhooks' },
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: { format: 'pk_test_...', where: 'dashboard.stripe.com/apikeys' },
  LEMONSQUEEZY_API_KEY: { format: 'eyJ...', where: 'app.lemonsqueezy.com/settings/api' },
  LEMONSQUEEZY_WEBHOOK_SECRET: { format: '...', where: 'app.lemonsqueezy.com/settings/webhooks' },
  PADDLE_API_KEY: { format: '...', where: 'vendors.paddle.com/authentication' },
  PADDLE_WEBHOOK_SECRET: { format: 'pdl_...', where: 'vendors.paddle.com/notifications' },
  POLAR_ACCESS_TOKEN: { format: 'polar_...', where: 'polar.sh/settings/tokens' },
  PAYPAL_CLIENT_ID: { format: '...', where: 'developer.paypal.com/dashboard/applications' },
  PAYPAL_CLIENT_SECRET: { format: '...', where: 'developer.paypal.com/dashboard/applications' },

  // Email
  RESEND_API_KEY: { format: 're_...', where: 'resend.com/api-keys' },
  POSTMARK_API_KEY: { format: '...', where: 'account.postmarkapp.com/servers' },
  SENDGRID_API_KEY: { format: 'SG....', where: 'app.sendgrid.com/settings/api_keys' },
  AWS_SES_ACCESS_KEY: { format: 'AKIA...', where: 'console.aws.amazon.com/ses' },
  AWS_SES_SECRET_KEY: { format: '...', where: 'console.aws.amazon.com/ses' },
  AWS_SES_REGION: { format: 'us-east-1', where: 'console.aws.amazon.com/ses' },
  MAILGUN_API_KEY: { format: 'key-...', where: 'app.mailgun.com/app/account/security/api_keys' },
  MAILGUN_DOMAIN: { format: 'mg.yourdomain.com', where: 'app.mailgun.com/app/sending/domains' },

  // Analytics
  NEXT_PUBLIC_POSTHOG_KEY: { format: 'phc_...', where: 'app.posthog.com/project/settings' },
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: { format: 'yourdomain.com', where: 'plausible.io/sites' },
  NEXT_PUBLIC_MIXPANEL_TOKEN: { format: '...', where: 'mixpanel.com/settings/project' },
  NEXT_PUBLIC_AMPLITUDE_KEY: { format: '...', where: 'analytics.amplitude.com/settings' },

  // Newsletter
  CONVERTKIT_API_KEY: { format: '...', where: 'app.convertkit.com/account_settings/developer_settings' },
  BEEHIIV_API_KEY: { format: '...', where: 'app.beehiiv.com/settings/integrations' },
  MAILCHIMP_API_KEY: { format: '...', where: 'admin.mailchimp.com/account/api' },
  MAILCHIMP_SERVER: { format: 'us1', where: 'admin.mailchimp.com (in API key)' },
  BUTTONDOWN_API_KEY: { format: '...', where: 'buttondown.email/settings/api' },
  LOOPS_API_KEY: { format: '...', where: 'app.loops.so/settings/api' },

  // AI Providers
  OPENAI_API_KEY: { format: 'sk-...', where: 'platform.openai.com/api-keys' },
  ANTHROPIC_API_KEY: { format: 'sk-ant-...', where: 'console.anthropic.com/settings/keys' },
  GOOGLE_AI_API_KEY: { format: 'AIza...', where: 'aistudio.google.com/app/apikey' },
  XAI_API_KEY: { format: 'xai-...', where: 'console.x.ai/api-keys' },
  DEEPSEEK_API_KEY: { format: 'sk-...', where: 'platform.deepseek.com/api_keys' },
  MISTRAL_API_KEY: { format: '...', where: 'console.mistral.ai/api-keys' },
  GROQ_API_KEY: { format: 'gsk_...', where: 'console.groq.com/keys' },
  TOGETHER_API_KEY: { format: '...', where: 'api.together.xyz/settings/api-keys' },
  OLLAMA_BASE_URL: { format: 'http://localhost:11434', where: 'Local - run: ollama serve' },

  // Search
  ALGOLIA_APP_ID: { format: 'XXXXXX', where: 'dashboard.algolia.com/account/api-keys' },
  ALGOLIA_API_KEY: { format: '...', where: 'dashboard.algolia.com/account/api-keys' },
  TYPESENSE_HOST: { format: 'xxx.typesense.net', where: 'cloud.typesense.org' },
  TYPESENSE_API_KEY: { format: '...', where: 'cloud.typesense.org' },
  MEILISEARCH_HOST: { format: 'http://localhost:7700', where: 'cloud.meilisearch.com' },
  MEILISEARCH_API_KEY: { format: '...', where: 'cloud.meilisearch.com' },
  ELASTICSEARCH_URL: { format: 'https://...', where: 'cloud.elastic.co' },

  // Storage
  AWS_ACCESS_KEY_ID: { format: 'AKIA...', where: 'console.aws.amazon.com/iam' },
  AWS_SECRET_ACCESS_KEY: { format: '...', where: 'console.aws.amazon.com/iam' },
  AWS_S3_BUCKET: { format: 'my-bucket-name', where: 's3.console.aws.amazon.com' },
  R2_ACCESS_KEY_ID: { format: '...', where: 'dash.cloudflare.com/r2' },
  R2_SECRET_ACCESS_KEY: { format: '...', where: 'dash.cloudflare.com/r2' },
  R2_BUCKET: { format: 'my-bucket', where: 'dash.cloudflare.com/r2' },
  SUPABASE_URL: { format: 'https://xxx.supabase.co', where: 'supabase.com/dashboard/project/settings/api' },
  SUPABASE_ANON_KEY: { format: 'eyJ...', where: 'supabase.com/dashboard/project/settings/api' },
  UPLOADTHING_SECRET: { format: 'sk_live_...', where: 'uploadthing.com/dashboard' },
  BLOB_READ_WRITE_TOKEN: { format: 'vercel_blob_...', where: 'vercel.com/dashboard/stores' },
};

// ============================================================================
// WIZARD STATE
// ============================================================================

// All feature categories - comprehensive industry options
const FEATURE_CATEGORIES = [
  {
    name: 'DATABASE',
    desc: 'Where your data lives',
    options: [
      { id: 'postgres', name: 'PostgreSQL', keys: ['DATABASE_URL'], desc: 'Supabase, Neon, Vercel Postgres', rec: true },
      { id: 'mysql', name: 'MySQL', keys: ['DATABASE_URL'], desc: 'PlanetScale, traditional hosting' },
      { id: 'mongodb', name: 'MongoDB', keys: ['MONGODB_URI'], desc: 'Document database, Atlas' },
      { id: 'sqlite', name: 'SQLite', keys: [], desc: 'Local file, zero config' },
    ],
  },
  {
    name: 'PAYMENTS',
    desc: 'Accept money from customers',
    options: [
      { id: 'stripe', name: 'Stripe', keys: ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET', 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'], desc: 'Cards, subscriptions, invoices', rec: true },
      { id: 'lemonsqueezy', name: 'Lemonsqueezy', keys: ['LEMONSQUEEZY_API_KEY', 'LEMONSQUEEZY_WEBHOOK_SECRET'], desc: 'Digital products, EU/tax handled' },
      { id: 'paddle', name: 'Paddle', keys: ['PADDLE_API_KEY', 'PADDLE_WEBHOOK_SECRET'], desc: 'Merchant of record, global' },
      { id: 'polar', name: 'Polar.sh', keys: ['POLAR_ACCESS_TOKEN'], desc: 'Open source monetization' },
      { id: 'paypal', name: 'PayPal', keys: ['PAYPAL_CLIENT_ID', 'PAYPAL_CLIENT_SECRET'], desc: 'Global reach, trusted' },
      { id: 'none-pay', name: 'None', keys: [], desc: 'Skip payments' },
    ],
  },
  {
    name: 'EMAIL',
    desc: 'Send transactional emails',
    options: [
      { id: 'resend', name: 'Resend', keys: ['RESEND_API_KEY'], desc: 'Modern, React email templates', rec: true },
      { id: 'postmark', name: 'Postmark', keys: ['POSTMARK_API_KEY'], desc: 'Best deliverability' },
      { id: 'sendgrid', name: 'SendGrid', keys: ['SENDGRID_API_KEY'], desc: 'High volume, marketing' },
      { id: 'ses', name: 'AWS SES', keys: ['AWS_SES_ACCESS_KEY', 'AWS_SES_SECRET_KEY', 'AWS_SES_REGION'], desc: 'Cheapest at scale' },
      { id: 'mailgun', name: 'Mailgun', keys: ['MAILGUN_API_KEY', 'MAILGUN_DOMAIN'], desc: 'Developer-friendly' },
      { id: 'none-email', name: 'None', keys: [], desc: 'Skip email' },
    ],
  },
  {
    name: 'ANALYTICS',
    desc: 'Track user behavior',
    options: [
      { id: 'posthog', name: 'PostHog', keys: ['NEXT_PUBLIC_POSTHOG_KEY'], desc: 'Product analytics + feature flags', rec: true },
      { id: 'plausible', name: 'Plausible', keys: ['NEXT_PUBLIC_PLAUSIBLE_DOMAIN'], desc: 'Privacy-friendly, simple' },
      { id: 'mixpanel', name: 'Mixpanel', keys: ['NEXT_PUBLIC_MIXPANEL_TOKEN'], desc: 'Event analytics, funnels' },
      { id: 'amplitude', name: 'Amplitude', keys: ['NEXT_PUBLIC_AMPLITUDE_KEY'], desc: 'Product analytics, cohorts' },
      { id: 'vercel', name: 'Vercel Analytics', keys: [], desc: 'Built-in, zero config' },
      { id: 'none-analytics', name: 'None', keys: [], desc: 'Skip analytics' },
    ],
  },
  {
    name: 'NEWSLETTER',
    desc: 'Email marketing and subscribers',
    options: [
      { id: 'convertkit', name: 'ConvertKit', keys: ['CONVERTKIT_API_KEY'], desc: 'Creator-focused, automations', rec: true },
      { id: 'beehiiv', name: 'Beehiiv', keys: ['BEEHIIV_API_KEY'], desc: 'Newsletter monetization' },
      { id: 'mailchimp', name: 'Mailchimp', keys: ['MAILCHIMP_API_KEY', 'MAILCHIMP_SERVER'], desc: 'Enterprise, legacy' },
      { id: 'buttondown', name: 'Buttondown', keys: ['BUTTONDOWN_API_KEY'], desc: 'Simple, markdown' },
      { id: 'loops', name: 'Loops', keys: ['LOOPS_API_KEY'], desc: 'Modern, SaaS-focused' },
      { id: 'resend-audience', name: 'Resend Audiences', keys: [], desc: 'If using Resend for email' },
      { id: 'none-newsletter', name: 'None', keys: [], desc: 'Skip newsletter' },
    ],
  },
  {
    name: 'AI',
    desc: 'Add AI capabilities',
    options: [
      { id: 'openai', name: 'OpenAI', keys: ['OPENAI_API_KEY'], desc: 'GPT-4o, o1, embeddings', rec: true },
      { id: 'anthropic', name: 'Anthropic', keys: ['ANTHROPIC_API_KEY'], desc: 'Claude 3.5 Sonnet, Opus' },
      { id: 'google', name: 'Google AI', keys: ['GOOGLE_AI_API_KEY'], desc: 'Gemini 2.0, Flash' },
      { id: 'xai', name: 'xAI (Grok)', keys: ['XAI_API_KEY'], desc: 'Grok 2, real-time data' },
      { id: 'deepseek', name: 'DeepSeek', keys: ['DEEPSEEK_API_KEY'], desc: 'V3, R1 reasoning' },
      { id: 'mistral', name: 'Mistral', keys: ['MISTRAL_API_KEY'], desc: 'Large 2, Codestral' },
      { id: 'groq', name: 'Groq', keys: ['GROQ_API_KEY'], desc: 'Fastest inference' },
      { id: 'together', name: 'Together AI', keys: ['TOGETHER_API_KEY'], desc: 'Open models, cheap' },
      { id: 'ollama', name: 'Ollama', keys: ['OLLAMA_BASE_URL'], desc: 'Local models, free' },
      { id: 'none-ai', name: 'None', keys: [], desc: 'Skip AI' },
    ],
  },
  {
    name: 'SEARCH',
    desc: 'Search and discovery',
    options: [
      { id: 'algolia', name: 'Algolia', keys: ['ALGOLIA_APP_ID', 'ALGOLIA_API_KEY'], desc: 'Fastest, typo-tolerant', rec: true },
      { id: 'typesense', name: 'Typesense', keys: ['TYPESENSE_HOST', 'TYPESENSE_API_KEY'], desc: 'Open source Algolia alt' },
      { id: 'meilisearch', name: 'Meilisearch', keys: ['MEILISEARCH_HOST', 'MEILISEARCH_API_KEY'], desc: 'Open source, easy' },
      { id: 'elasticsearch', name: 'Elasticsearch', keys: ['ELASTICSEARCH_URL'], desc: 'Full-text, enterprise' },
      { id: 'fuse', name: 'Fuse.js', keys: [], desc: 'Client-side, no API' },
      { id: 'none-search', name: 'None', keys: [], desc: 'Skip search' },
    ],
  },
  {
    name: 'STORAGE',
    desc: 'File uploads and media',
    options: [
      { id: 'r2', name: 'Cloudflare R2', keys: ['R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET'], desc: 'S3-compatible, no egress', rec: true },
      { id: 's3', name: 'AWS S3', keys: ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_S3_BUCKET'], desc: 'Industry standard' },
      { id: 'supabase-storage', name: 'Supabase Storage', keys: ['SUPABASE_URL', 'SUPABASE_ANON_KEY'], desc: 'Integrated with DB' },
      { id: 'uploadthing', name: 'UploadThing', keys: ['UPLOADTHING_SECRET'], desc: 'Simple, type-safe' },
      { id: 'vercel-blob', name: 'Vercel Blob', keys: ['BLOB_READ_WRITE_TOKEN'], desc: 'Zero config on Vercel' },
      { id: 'none-storage', name: 'None', keys: [], desc: 'Skip storage' },
    ],
  },
];

// Template configurations - which categories each template uses and defaults
const TEMPLATE_CONFIGS = {
  starter: {
    categories: [], // No category selection, just basic setup
    defaults: {},
  },
  saas: {
    categories: ['DATABASE', 'PAYMENTS', 'EMAIL', 'NEWSLETTER', 'ANALYTICS', 'SEARCH', 'STORAGE'],
    defaults: {
      DATABASE: 'postgres',
      PAYMENTS: 'stripe',
      EMAIL: 'resend',
      NEWSLETTER: 'none-newsletter',
      ANALYTICS: 'posthog',
      SEARCH: 'none-search',
      STORAGE: 'none-storage',
    },
  },
  'ai-app': {
    categories: ['DATABASE', 'PAYMENTS', 'EMAIL', 'NEWSLETTER', 'ANALYTICS', 'AI', 'SEARCH', 'STORAGE'],
    defaults: {
      DATABASE: 'postgres',
      PAYMENTS: 'stripe',
      EMAIL: 'resend',
      NEWSLETTER: 'none-newsletter',
      ANALYTICS: 'posthog',
      AI: 'openai',
      SEARCH: 'none-search',
      STORAGE: 'none-storage',
    },
  },
  marketplace: {
    categories: ['DATABASE', 'PAYMENTS', 'EMAIL', 'NEWSLETTER', 'ANALYTICS', 'SEARCH', 'STORAGE'],
    defaults: {
      DATABASE: 'postgres',
      PAYMENTS: 'stripe',
      EMAIL: 'resend',
      NEWSLETTER: 'none-newsletter',
      ANALYTICS: 'posthog',
      SEARCH: 'algolia',
      STORAGE: 'r2',
    },
  },
  custom: {
    categories: ['DATABASE', 'PAYMENTS', 'EMAIL', 'NEWSLETTER', 'ANALYTICS', 'AI', 'SEARCH', 'STORAGE'],
    defaults: {
      DATABASE: 'postgres',
      PAYMENTS: 'none-pay',
      EMAIL: 'none-email',
      NEWSLETTER: 'none-newsletter',
      ANALYTICS: 'none-analytics',
      AI: 'none-ai',
      SEARCH: 'none-search',
      STORAGE: 'none-storage',
    },
  },
};

const state = {
  currentTab: 0,
  tabs: ['Template', 'Review', 'Starter Page', 'Complete'],
  // Selections
  template: null,
  templateKey: null,
  marketplaceStyle: null,
  apiKeyValues: {},
  wantsStarterPage: false,
  // UI state for current screen
  selectedIndex: 0,
  inputValue: '',
  // Category tab state - inline key entry
  categoryPhase: 'selection', // 'selection' | 'keys'
  categoryKeyIndex: 0, // which key in current category
  categoryKeys: [], // keys for current category's selection
  // Custom mode
  isCustomMode: false,
  customSelections: {}, // { categoryName: optionId }
};

// ============================================================================
// RENDERING
// ============================================================================

function renderTabs() {
  const tabs = state.tabs.map((tab, i) => {
    if (i === state.currentTab) {
      return `${c.bgAmber}${c.black} ${tab} ${c.reset}`;
    } else if (i < state.currentTab) {
      return `${c.amberDim}${tab}${c.reset}`;
    } else {
      return `${c.amber}${tab}${c.reset}`;
    }
  });

  console.log(`  ${tabs.join('  ')}    ${c.amberDim}(Tab to cycle)${c.reset}`);
  console.log(`${c.amber}${'─'.repeat(74)}${c.reset}`);
}

function renderBox(title, lines) {
  const width = 70;
  const hr = '═'.repeat(width);

  console.log(`${c.amber}  ╔${hr}╗${c.reset}`);

  if (title) {
    const titlePad = width - title.length;
    const left = Math.floor(titlePad / 2);
    const right = titlePad - left;
    console.log(`${c.amber}  ║${' '.repeat(left)}${c.amberBright}${title}${c.amber}${' '.repeat(right)}║${c.reset}`);
    console.log(`${c.amber}  ╠${hr}╣${c.reset}`);
  }

  for (const line of lines) {
    const stripped = line.replace(/\x1b\[[0-9;]*m/g, '');
    const pad = width - stripped.length;
    console.log(`${c.amber}  ║${c.reset}${line}${' '.repeat(Math.max(0, pad))}${c.amber}║${c.reset}`);
  }

  console.log(`${c.amber}  ╚${hr}╝${c.reset}`);
}

function renderScreen() {
  clear();

  // Header
  console.log(`${c.amber}`);
  console.log(`  ███████╗ █████╗ ██████╗ ██████╗ ██╗  ██╗`);
  console.log(`  ██╔════╝██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝`);
  console.log(`  █████╗  ███████║██████╔╝██████╔╝█████╔╝   ${c.amberBright}SETUP WIZARD${c.amber}`);
  console.log(`  ██╔══╝  ██╔══██║██╔══██╗██╔══██╗██╔═██╗   ${c.amberDim}v1.0${c.amber}`);
  console.log(`  ██║     ██║  ██║██████╔╝██║  ██║██║  ██╗`);
  console.log(`  ╚═╝     ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝`);
  console.log(`${c.reset}`);

  if (DRY_RUN) {
    console.log(`  ${c.amberBright}⚠ DRY RUN MODE${c.reset}`);
  }
  console.log('');

  // Tab bar
  renderTabs();
  console.log('');

  // Content based on current tab
  const tabName = state.tabs[state.currentTab];
  switch (tabName) {
    case 'Template':
      renderTemplateTab();
      break;
    case 'Review':
      renderReviewTab();
      break;
    case 'Starter Page':
      renderStarterPageTab();
      break;
    case 'Complete':
      renderCompleteTab();
      break;
    default:
      // Check if it's a category tab
      if (FEATURE_CATEGORIES.find((cat) => cat.name === tabName)) {
        renderCategoryTab(tabName);
      }
      break;
  }

  // Footer
  console.log('');
  console.log(`${c.amber}${'─'.repeat(74)}${c.reset}`);
  renderFooter();
}

function renderTemplateTab() {
  const lines = [];
  lines.push(`${c.amberBright}> What are you building?${c.reset}`);
  lines.push('');

  TEMPLATES.forEach((t, i) => {
    const selected = i === state.selectedIndex;
    const bullet = selected ? `${c.amberBright}●${c.reset}` : ' ';
    const num = selected ? `${c.amberBright}${i + 1}.${c.reset}` : `${c.amberDim}${i + 1}.${c.reset}`;
    const name = selected ? `${c.amberBright}${c.bold}${t.name}${c.reset}` : `${c.amber}${t.name}${c.reset}`;
    const rec = t.recommended ? ` ${c.amberBright}★${c.reset}` : '';
    const meta = `${c.amberDim}${t.time} · ${t.keys} keys${c.reset}`;

    lines.push(`${bullet} ${num} ${name}${rec}  ${meta}`);
    lines.push(`     ${c.amberDim}${t.desc}${c.reset}`);
    if (selected) {
      lines.push(`     ${c.amber}→ ${t.detail}${c.reset}`);
    }
    lines.push('');
  });

  renderBox('TEMPLATE', lines);
}

function renderCategoryTab(categoryName) {
  const category = FEATURE_CATEGORIES.find((c) => c.name === categoryName);
  if (!category) return;

  const currentSelection = state.customSelections[categoryName];

  // If in key entry phase, show key input UI
  if (state.categoryPhase === 'keys' && state.categoryKeys.length > 0) {
    renderCategoryKeyEntry(categoryName);
    return;
  }

  // Selection phase
  const lines = [
    '',
    `${c.amberBright}> ${category.desc}${c.reset}`,
    '',
  ];

  category.options.forEach((opt, i) => {
    const isSelected = i === state.selectedIndex;
    const isChosen = currentSelection === opt.id;

    const bullet = isChosen
      ? `${c.amberBright}●${c.reset}`
      : isSelected
        ? `${c.amber}○${c.reset}`
        : `${c.amberDim}○${c.reset}`;

    const name = isSelected
      ? `${c.amberBright}${c.bold}${opt.name}${c.reset}`
      : `${c.amber}${opt.name}${c.reset}`;

    const rec = opt.rec ? ` ${c.amberBright}★${c.reset}` : '';
    const keyCount = opt.keys.length;
    const keyHint = keyCount > 0 ? `${c.amberDim}(${keyCount} key${keyCount > 1 ? 's' : ''})${c.reset}` : '';

    lines.push(`  ${bullet} ${name}${rec}  ${keyHint}`);
    lines.push(`      ${c.amberDim}${opt.desc}${c.reset}`);
    lines.push('');
  });

  // Show summary of selections so far
  const config = TEMPLATE_CONFIGS[state.templateKey] || TEMPLATE_CONFIGS.custom;
  const tabIndex = config.categories.indexOf(categoryName);
  if (tabIndex > 0) {
    lines.push(`${c.amber}${'─'.repeat(66)}${c.reset}`);
    lines.push(`${c.amberDim}Selected so far:${c.reset}`);
    config.categories.slice(0, tabIndex).forEach((catName) => {
      const cat = FEATURE_CATEGORIES.find((c) => c.name === catName);
      if (!cat) return;
      const sel = state.customSelections[catName];
      const opt = cat.options.find((o) => o.id === sel);
      if (opt && !opt.id.startsWith('none')) {
        lines.push(`  ${c.amberDim}${catName}:${c.reset} ${c.amber}${opt.name}${c.reset}`);
      }
    });
  }

  // Legend
  lines.push('');
  lines.push(`${c.amberDim}★ = recommended${c.reset}`);

  renderBox(categoryName, lines);
}

function renderCategoryKeyEntry(categoryName) {
  const category = FEATURE_CATEGORIES.find((c) => c.name === categoryName);
  const selectedOpt = category?.options.find((o) => o.id === state.customSelections[categoryName]);

  const lines = [''];

  // Show what's selected
  lines.push(`${c.amberBright}${selectedOpt?.name || categoryName}${c.reset} ${c.amberDim}selected${c.reset}`);
  lines.push('');

  // Show key entry progress
  state.categoryKeys.forEach((key, i) => {
    const isCurrent = i === state.categoryKeyIndex;
    const isComplete = i < state.categoryKeyIndex;
    const value = state.apiKeyValues[key];

    let status;
    if (isComplete) {
      status = value ? `${c.amberBright}✓${c.reset}` : `${c.amberDim}skipped${c.reset}`;
    } else if (isCurrent) {
      status = `${c.amberBright}◀${c.reset}`;
    } else {
      status = `${c.amberDim}...${c.reset}`;
    }

    const name = isCurrent
      ? `${c.amberBright}${c.bold}${key}${c.reset}`
      : isComplete
        ? `${c.amberDim}${key}${c.reset}`
        : `${c.amber}${key}${c.reset}`;

    lines.push(`  ${status}  ${name}`);
  });

  lines.push('');
  lines.push(`${c.amber}${'─'.repeat(66)}${c.reset}`);
  lines.push('');

  // Current key details
  const key = state.categoryKeys[state.categoryKeyIndex];
  const info = API_KEY_INFO[key] || { format: '', where: '' };

  lines.push(`${c.amber}FORMAT:${c.reset}  ${c.amberDim}${info.format}${c.reset}`);
  lines.push(`${c.amber}WHERE:${c.reset}   ${c.amberDim}${info.where}${c.reset}`);
  lines.push('');
  lines.push(`${c.amberDim}Leave blank to skip · Enter to continue${c.reset}`);
  lines.push('');
  lines.push(`${c.amberBright}>${c.reset} ${state.inputValue}█`);
  lines.push('');

  renderBox(`${categoryName} KEYS`, lines);
}

function renderReviewTab() {
  const lines = [''];

  // Show all selections grouped by category
  const config = TEMPLATE_CONFIGS[state.templateKey] || TEMPLATE_CONFIGS.custom;

  if (config.categories.length === 0) {
    // Starter template
    lines.push(`${c.amberBright}STARTER${c.reset} ${c.amberDim}template${c.reset}`);
    lines.push('');
    lines.push(`${c.amberDim}SQLite database + NextAuth${c.reset}`);
    lines.push(`${c.amberDim}No additional API keys needed.${c.reset}`);
  } else {
    lines.push(`${c.amberBright}Configuration Summary${c.reset}`);
    lines.push('');

    let keysConfigured = 0;
    let keysTotal = 0;

    config.categories.forEach((catName) => {
      const cat = FEATURE_CATEGORIES.find((c) => c.name === catName);
      if (!cat) return;

      const sel = state.customSelections[catName];
      const opt = cat.options.find((o) => o.id === sel);

      if (opt && !opt.id.startsWith('none')) {
        const configured = opt.keys.filter((k) => state.apiKeyValues[k]).length;
        keysTotal += opt.keys.length;
        keysConfigured += configured;

        const status = opt.keys.length === 0
          ? `${c.amberBright}✓${c.reset}`
          : configured === opt.keys.length
            ? `${c.amberBright}✓${c.reset}`
            : `${c.amber}${configured}/${opt.keys.length}${c.reset}`;

        lines.push(`  ${status}  ${c.amber}${catName}:${c.reset} ${c.amberBright}${opt.name}${c.reset}`);
      } else {
        lines.push(`  ${c.amberDim}○  ${catName}: None${c.reset}`);
      }
    });

    lines.push('');
    lines.push(`${c.amber}${'─'.repeat(66)}${c.reset}`);
    lines.push('');

    if (keysTotal > 0) {
      const pct = Math.round((keysConfigured / keysTotal) * 100);
      lines.push(`${c.amberDim}API Keys:${c.reset} ${keysConfigured}/${keysTotal} configured (${pct}%)`);
    } else {
      lines.push(`${c.amberDim}No API keys needed for your selection.${c.reset}`);
    }
  }

  lines.push('');
  lines.push(`${c.amberDim}Press Enter to continue${c.reset}`);
  lines.push('');

  renderBox('REVIEW', lines);
}

function renderStarterPageTab() {
  const options = [
    { name: 'YES', desc: 'Copy pre-built landing page + FABRK-PROMPTS.md' },
    { name: 'NO', desc: 'Skip - keep existing page.tsx' },
  ];

  const lines = [
    '',
    `${c.amberBright}> Copy a starter landing page?${c.reset}`,
    '',
  ];

  options.forEach((opt, i) => {
    const selected = i === state.selectedIndex;
    const bullet = selected ? `${c.amberBright}●${c.reset}` : ' ';
    const num = selected ? `${c.amberBright}${i + 1}.${c.reset}` : `${c.amberDim}${i + 1}.${c.reset}`;
    const name = selected ? `${c.amberBright}${c.bold}${opt.name}${c.reset}` : `${c.amber}${opt.name}${c.reset}`;
    lines.push(`${bullet} ${num} ${name}`);
    lines.push(`     ${c.amberDim}${opt.desc}${c.reset}`);
    lines.push('');
  });

  renderBox('STARTER PAGE', lines);
}

function renderCompleteTab() {
  if (DRY_RUN) {
    const lines = [
      '',
      `${c.amberBright}⚠ DRY RUN - No files written${c.reset}`,
      '',
      `${c.amber}Would create:${c.reset}`,
      `  • .env.local`,
      state.wantsStarterPage ? `  • src/app/(marketing)/page.tsx` : '',
      state.wantsStarterPage ? `  • FABRK-PROMPTS.md` : '',
      '',
      `${c.amberDim}Run ${c.amber}npm run setup${c.amberDim} to apply.${c.reset}`,
      '',
    ].filter(Boolean);
    renderBox('DRY RUN COMPLETE', lines);
  } else {
    const lines = [
      '',
      `${c.amberBright}✓ Setup Complete!${c.reset}`,
      '',
      `${c.amber}Created:${c.reset}`,
      `  ${c.amberBright}✓${c.reset} .env.local`,
      state.wantsStarterPage ? `  ${c.amberBright}✓${c.reset} Landing page copied` : '',
      state.wantsStarterPage ? `  ${c.amberBright}✓${c.reset} FABRK-PROMPTS.md` : '',
      '',
      `${c.amber}Next steps:${c.reset}`,
      `  ${c.amberBright}1.${c.reset} npm run db:push`,
      `  ${c.amberBright}2.${c.reset} npm run dev`,
      '',
    ].filter(Boolean);
    renderBox('COMPLETE', lines);
  }
}

function renderFooter() {
  const hints = [];
  const tabName = state.tabs[state.currentTab];

  // Check if it's a category tab or selection tab
  const isCategory = FEATURE_CATEGORIES.some((c) => c.name === tabName);

  if (isCategory && state.categoryPhase === 'keys') {
    // Key entry mode
    hints.push(`${c.amberDim}type${c.reset} ${c.amber}value${c.reset}`);
    hints.push(`${c.amberDim}Enter${c.reset} ${c.amber}next key${c.reset}`);
  } else if (tabName === 'Template' || tabName === 'Starter Page' || (isCategory && state.categoryPhase === 'selection')) {
    hints.push(`${c.amberDim}↑/↓${c.reset} ${c.amber}select${c.reset}`);
    hints.push(`${c.amberDim}Enter${c.reset} ${c.amber}confirm${c.reset}`);
  } else if (tabName === 'Review') {
    hints.push(`${c.amberDim}Enter${c.reset} ${c.amber}continue${c.reset}`);
  }

  if (state.currentTab < state.tabs.length - 1 && state.categoryPhase !== 'keys') {
    hints.push(`${c.amberDim}Tab${c.reset} ${c.amber}next${c.reset}`);
    hints.push(`${c.amberDim}Shift+Tab${c.reset} ${c.amber}back${c.reset}`);
  } else if (state.currentTab === state.tabs.length - 1) {
    hints.push(`${c.amberDim}Enter${c.reset} ${c.amber}finish${c.reset}`);
  }
  hints.push(`${c.amberDim}Ctrl+C${c.reset} ${c.amber}exit${c.reset}`);

  console.log(`  ${hints.join('   ')}`);
}

// ============================================================================
// LOGIC
// ============================================================================

async function loadTemplate(filename) {
  const content = await readFile(join(__dirname, 'templates', filename), 'utf-8');
  return JSON.parse(content);
}

function generateSecret() {
  return randomBytes(32).toString('base64');
}

async function buildEnvContent(template, values = {}) {
  const lines = ['# Generated by Fabrk Setup Wizard', `# Template: ${template.name}`, ''];
  for (const [key, val] of Object.entries(template.env)) {
    if (val === '{{AUTO_GENERATE}}') {
      lines.push(`${key}="${generateSecret()}"`);
    } else if (typeof val === 'string' && val.startsWith('{{PROMPT:')) {
      lines.push(`${key}="${values[key] || ''}"`);
    } else {
      lines.push(`${key}="${val}"`);
    }
  }
  return lines.join('\n') + '\n';
}

async function copyStarterPage(templateKey, marketplaceStyle = null) {
  const templatesDir = join(__dirname, 'page-templates');
  let sourceFile;

  if (templateKey === 'marketplace' && marketplaceStyle) {
    const style = MARKETPLACE_STYLES.find((s) => s.value === marketplaceStyle);
    sourceFile = style?.source;
  } else if (STARTER_PAGES[templateKey]) {
    sourceFile = STARTER_PAGES[templateKey].source;
  }

  if (!sourceFile) return false;

  const sourcePath = join(templatesDir, sourceFile);
  const destPath = join(ROOT_DIR, 'src/app/(marketing)/page.tsx');

  if (!existsSync(sourcePath)) return false;

  if (existsSync(destPath)) {
    await copyFile(destPath, destPath + '.backup');
  }
  await copyFile(sourcePath, destPath);
  return true;
}

async function generatePromptsFile() {
  const content = `# FABRK-PROMPTS.md

Paste into Cursor, Claude Code, or Windsurf:

## Update Content
\`\`\`
Update src/app/(marketing)/page.tsx with your app name, tagline, and 3 features.
Keep terminal aesthetic (font-mono, rounded-none).
\`\`\`

## Add Pricing
\`\`\`
Create src/app/(marketing)/pricing/page.tsx with 3 tiers.
\`\`\`
`;
  await writeFile(join(ROOT_DIR, 'FABRK-PROMPTS.md'), content, 'utf-8');
}

async function finalize() {
  const selectedTemplate = TEMPLATES[state.selectedIndex];

  // Load template
  let template;
  if (selectedTemplate.file) {
    template = await loadTemplate(selectedTemplate.file);
  } else {
    // Custom - basic template
    template = {
      name: 'Custom',
      env: {
        NEXTAUTH_SECRET: '{{AUTO_GENERATE}}',
        NEXTAUTH_URL: 'http://localhost:3000',
        NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
        NODE_ENV: 'development',
      },
    };
  }

  state.template = template;
  state.templateKey = selectedTemplate.name.toLowerCase().replace(' ', '-');

  // Build env content
  const envContent = await buildEnvContent(template, state.apiKeyValues);

  if (!DRY_RUN) {
    // Write .env.local
    await writeFile(join(ROOT_DIR, '.env.local'), envContent, 'utf-8');

    // Copy starter page if requested
    if (state.wantsStarterPage && ['saas', 'ai-app', 'marketplace'].includes(state.templateKey)) {
      const copied = await copyStarterPage(state.templateKey, state.marketplaceStyle);
      if (copied) {
        await generatePromptsFile();
      }
    }
  }
}

// ============================================================================
// INPUT HANDLING
// ============================================================================

async function handleKeypress(str, key) {
  // Ctrl+C - exit
  if (key.ctrl && key.name === 'c') {
    showCursor();
    if (stdin.isTTY) stdin.setRawMode(false);
    clear();
    console.log(`\n  ${c.amberDim}Setup cancelled. No changes made.${c.reset}\n`);
    process.exit(0);
  }

  // Tab - next tab
  if (key.name === 'tab' && !key.shift) {
    await goToNextTab();
    return;
  }

  // Shift+Tab - previous tab
  if (key.name === 'tab' && key.shift) {
    goToPrevTab();
    return;
  }

  // Tab-specific handling
  const tabName = state.tabs[state.currentTab];
  switch (tabName) {
    case 'Template':
      if (key.name === 'up') {
        state.selectedIndex = (state.selectedIndex - 1 + TEMPLATES.length) % TEMPLATES.length;
        renderScreen();
      } else if (key.name === 'down') {
        state.selectedIndex = (state.selectedIndex + 1) % TEMPLATES.length;
        renderScreen();
      } else if (key.name === 'return') {
        await goToNextTab();
      } else if (str >= '1' && str <= '5') {
        state.selectedIndex = parseInt(str, 10) - 1;
        renderScreen();
      }
      break;


    case 'Review':
      if (key.name === 'return') {
        await goToNextTab();
      }
      break;

    case 'Starter Page':
      if (key.name === 'up' || key.name === 'down') {
        state.selectedIndex = state.selectedIndex === 0 ? 1 : 0;
        renderScreen();
      } else if (key.name === 'return') {
        state.wantsStarterPage = state.selectedIndex === 0;
        await goToNextTab();
      } else if (str === '1' || str === '2') {
        state.selectedIndex = parseInt(str, 10) - 1;
        state.wantsStarterPage = state.selectedIndex === 0;
        renderScreen();
      }
      break;

    case 'Complete':
      if (key.name === 'return') {
        showCursor();
        if (stdin.isTTY) stdin.setRawMode(false);
        console.log('');
        process.exit(0);
      }
      break;

    default:
      // Handle category tabs (DATABASE, PAYMENTS, EMAIL, etc.)
      const category = FEATURE_CATEGORIES.find((c) => c.name === tabName);
      if (category) {
        if (state.categoryPhase === 'keys') {
          // Key entry mode
          if (key.name === 'return') {
            // Save current value and move to next key
            const currentKey = state.categoryKeys[state.categoryKeyIndex];
            state.apiKeyValues[currentKey] = state.inputValue;
            state.inputValue = '';
            state.categoryKeyIndex++;

            if (state.categoryKeyIndex >= state.categoryKeys.length) {
              // Done with keys, advance to next tab
              state.categoryPhase = 'selection';
              state.categoryKeys = [];
              state.categoryKeyIndex = 0;
              await goToNextTab();
            } else {
              renderScreen();
            }
          } else if (key.name === 'backspace') {
            state.inputValue = state.inputValue.slice(0, -1);
            renderScreen();
          } else if (str && str.length === 1 && !key.ctrl) {
            state.inputValue += str;
            renderScreen();
          }
        } else {
          // Selection mode
          if (key.name === 'up') {
            state.selectedIndex = (state.selectedIndex - 1 + category.options.length) % category.options.length;
            renderScreen();
          } else if (key.name === 'down') {
            state.selectedIndex = (state.selectedIndex + 1) % category.options.length;
            renderScreen();
          } else if (key.name === 'return') {
            // Save selection
            const selectedOpt = category.options[state.selectedIndex];
            state.customSelections[tabName] = selectedOpt.id;

            // If option has keys, switch to key entry phase
            if (selectedOpt.keys.length > 0) {
              state.categoryPhase = 'keys';
              state.categoryKeys = [...selectedOpt.keys];
              state.categoryKeyIndex = 0;
              state.inputValue = '';
              renderScreen();
            } else {
              // No keys needed, advance to next tab
              await goToNextTab();
            }
          }
        }
      }
      break;
  }
}

async function goToNextTab() {
  const tabName = state.tabs[state.currentTab];

  // Handle Template tab - set up categories based on template config
  if (tabName === 'Template') {
    const selectedTemplate = TEMPLATES[state.selectedIndex];
    state.templateKey = selectedTemplate.name.toLowerCase().replace(' ', '-');

    // Get template config
    const config = TEMPLATE_CONFIGS[state.templateKey] || TEMPLATE_CONFIGS.custom;

    if (config.categories.length > 0) {
      // Template has categories - show category tabs
      state.tabs = ['Template', ...config.categories, 'Review', 'Starter Page', 'Complete'];

      // Initialize selections with defaults
      state.customSelections = { ...config.defaults };
    } else {
      // Starter template - no categories, just basic setup
      state.tabs = ['Template', 'Review', 'Starter Page', 'Complete'];
      state.customSelections = {};
    }

    state.inputValue = '';
    state.categoryPhase = 'selection';
    state.categoryKeys = [];
    state.categoryKeyIndex = 0;
  }

  // Before Review tab - build template env
  const nextTabName = state.tabs[state.currentTab + 1];
  if (nextTabName === 'Review') {
    // Collect all API keys from selected options
    const allKeys = [];
    Object.entries(state.customSelections).forEach(([catName, optionId]) => {
      const cat = FEATURE_CATEGORIES.find((c) => c.name === catName);
      if (cat) {
        const opt = cat.options.find((o) => o.id === optionId);
        if (opt) {
          allKeys.push(...opt.keys);
        }
      }
    });

    // Build template env
    state.template = {
      name: state.templateKey,
      env: {
        NEXTAUTH_SECRET: '{{AUTO_GENERATE}}',
        NEXTAUTH_URL: 'http://localhost:3000',
        NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
        NODE_ENV: 'development',
      },
    };
    allKeys.forEach((key) => {
      state.template.env[key] = `{{PROMPT:${key}}}`;
    });
  }

  // Handle Starter Page tab - finalize before Complete
  if (tabName === 'Starter Page') {
    await finalize();
  }

  if (state.currentTab < state.tabs.length - 1) {
    state.currentTab++;

    // Reset category phase when moving between tabs
    state.categoryPhase = 'selection';
    state.categoryKeys = [];
    state.categoryKeyIndex = 0;

    // Set correct selection index for category tabs
    const nextTab = state.tabs[state.currentTab];
    const nextCategory = FEATURE_CATEGORIES.find((c) => c.name === nextTab);
    if (nextCategory && state.customSelections[nextTab]) {
      const idx = nextCategory.options.findIndex((o) => o.id === state.customSelections[nextTab]);
      state.selectedIndex = idx >= 0 ? idx : 0;
    } else {
      state.selectedIndex = 0;
    }

    renderScreen();
  }
}

function goToPrevTab() {
  if (state.currentTab > 0) {
    state.currentTab--;

    // If going back to Template tab, reset tabs to default
    const tabName = state.tabs[state.currentTab];
    if (tabName === 'Template') {
      state.tabs = ['Template', 'Review', 'Starter Page', 'Complete'];
      state.isCustomMode = false;
      state.customSelections = {};
      state.apiKeyValues = {};
    }

    // Reset category phase
    state.categoryPhase = 'selection';
    state.categoryKeys = [];
    state.categoryKeyIndex = 0;

    // Restore selection index for category tabs
    const category = FEATURE_CATEGORIES.find((c) => c.name === tabName);
    if (category && state.customSelections[tabName]) {
      const idx = category.options.findIndex((o) => o.id === state.customSelections[tabName]);
      state.selectedIndex = idx >= 0 ? idx : 0;
    } else {
      state.selectedIndex = 0;
    }

    state.inputValue = '';
    renderScreen();
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  if (!stdin.isTTY) {
    console.log(`${c.amber}Fabrk Setup Wizard requires an interactive terminal.${c.reset}`);
    console.log(`${c.amberDim}Please run in a terminal that supports TTY.${c.reset}`);
    process.exit(1);
  }

  readline.emitKeypressEvents(stdin);
  stdin.setRawMode(true);
  hideCursor();

  // Check for existing .env.local
  if (!DRY_RUN && existsSync(join(ROOT_DIR, '.env.local'))) {
    clear();
    console.log(`\n  ${c.amberBright}Warning:${c.reset} .env.local already exists.`);
    console.log(`  ${c.amberDim}It will be overwritten. Press Enter to continue or Ctrl+C to cancel.${c.reset}\n`);

    await new Promise((resolve) => {
      const handler = (str, key) => {
        if (key.ctrl && key.name === 'c') {
          showCursor();
          stdin.setRawMode(false);
          console.log(`\n  ${c.amberDim}Cancelled.${c.reset}\n`);
          process.exit(0);
        }
        if (key.name === 'return') {
          stdin.removeListener('keypress', handler);
          resolve();
        }
      };
      stdin.on('keypress', handler);
    });
  }

  // Initial render
  renderScreen();

  // Listen for input
  stdin.on('keypress', handleKeypress);
}

process.on('SIGINT', () => {
  showCursor();
  if (stdin.isTTY) stdin.setRawMode(false);
  process.exit(0);
});

main().catch((err) => {
  showCursor();
  if (stdin.isTTY) stdin.setRawMode(false);
  console.error(err);
  process.exit(1);
});
