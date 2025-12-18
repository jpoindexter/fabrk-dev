#!/usr/bin/env node

/**
 * Fabrk Setup Wizard
 * Interactive CLI for configuring your SaaS boilerplate
 *
 * Usage:
 *   npm run setup              # Interactive setup
 *   npm run setup -- --dry-run # Preview without writing files
 *
 * Templates:
 *   1. Starter     - SQLite + Auth (30s, 0 keys)
 *   2. SaaS        - Postgres + Stripe + Email + Analytics (4-5m, 3 keys)
 *   3. AI App      - SaaS + OpenAI (5-6m, 4 keys)
 *   4. Marketplace - SaaS + Search + Storage (6-7m, 5 keys)
 *   5. Custom      - Choose each module (6-8m, varies)
 */

// Parse CLI flags
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run') || args.includes('-n');

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { readFile, writeFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes } from 'node:crypto';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');

// ANSI color codes
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
};

const log = (msg, color = 'reset') => console.log(`${c[color]}${msg}${c.reset}`);
const success = (msg) => log(`  ${c.green}[OK]${c.reset} ${msg}`);
const info = (msg) => log(`  ${c.blue}[INFO]${c.reset} ${msg}`);
const warn = (msg) => log(`  ${c.yellow}[WARN]${c.reset} ${msg}`);
const error = (msg) => log(`  ${c.red}[ERROR]${c.reset} ${msg}`);

function banner() {
  console.log('');
  log('  +-----------------------------------------+', 'cyan');
  log('  |  FABRK SETUP                            |', 'cyan');
  log('  |  What are you building?                 |', 'cyan');
  log('  +-----------------------------------------+', 'cyan');
  if (DRY_RUN) {
    log('  |  [DRY RUN] No files will be written     |', 'yellow');
    log('  +-----------------------------------------+', 'cyan');
  }
  console.log('');
}

const TEMPLATES = [
  { key: '1', name: 'Starter', file: 'starter.json', time: '30s', keys: 0 },
  { key: '2', name: 'SaaS', file: 'saas.json', time: '4-5m', keys: 3 },
  { key: '3', name: 'AI App', file: 'ai-app.json', time: '5-6m', keys: 4 },
  { key: '4', name: 'Marketplace', file: 'marketplace.json', time: '6-7m', keys: 5 },
  { key: '5', name: 'Custom', file: null, time: '6-8m', keys: 'varies' },
];

const CUSTOM_OPTIONS = {
  database: [
    { key: '1', name: 'SQLite', value: 'sqlite', recommended: true },
    { key: '2', name: 'PostgreSQL', value: 'postgresql' },
  ],
  payments: [
    { key: '1', name: 'None', value: null },
    { key: '2', name: 'Stripe', value: 'stripe', recommended: true },
    { key: '3', name: 'Polar', value: 'polar' },
    { key: '4', name: 'LemonSqueezy', value: 'lemonsqueezy' },
  ],
  ai: [
    { key: '1', name: 'None', value: null },
    { key: '2', name: 'OpenAI', value: 'openai', recommended: true },
    { key: '3', name: 'Anthropic', value: 'anthropic' },
    { key: '4', name: 'Google AI', value: 'google' },
  ],
  analytics: [
    { key: '1', name: 'None', value: null },
    { key: '2', name: 'PostHog', value: 'posthog', recommended: true },
    { key: '3', name: 'Google Analytics', value: 'ga' },
  ],
  email: [
    { key: '1', name: 'None', value: null },
    { key: '2', name: 'Resend', value: 'resend', recommended: true },
    { key: '3', name: 'SendGrid', value: 'sendgrid' },
  ],
};

async function loadTemplate(filename) {
  const path = join(__dirname, 'templates', filename);
  const content = await readFile(path, 'utf-8');
  return JSON.parse(content);
}

function generateSecret() {
  return randomBytes(32).toString('base64');
}

async function promptSelect(rl, question, options) {
  console.log('');
  log(`  ${question}`, 'bold');
  console.log('');

  for (const opt of options) {
    const rec = opt.recommended ? ` ${c.green}(recommended)${c.reset}` : '';
    const extra = opt.time ? ` ${c.dim}${opt.time}  ${opt.keys} keys${c.reset}` : '';
    log(`    ${opt.key}. ${opt.name}${rec}${extra}`);
  }

  console.log('');
  const validKeys = options.map(o => o.key);

  while (true) {
    const answer = await rl.question(`  ${c.cyan}>${c.reset} `);
    const trimmed = answer.trim();

    if (validKeys.includes(trimmed)) {
      return options.find(o => o.key === trimmed);
    }

    if (trimmed === '?' || trimmed.toLowerCase() === 'help') {
      log('  Enter the number of your choice (1-' + options.length + ')', 'yellow');
      log('  Press Ctrl+C to exit', 'dim');
      continue;
    }

    warn(`Invalid selection. Enter ${validKeys.join(', ')}`);
  }
}

async function promptInput(rl, label, hint = '') {
  const hintText = hint ? ` ${c.dim}(${hint})${c.reset}` : '';
  const answer = await rl.question(`  ${label}${hintText}: ${c.cyan}`);
  process.stdout.write(c.reset);
  return answer.trim();
}

async function checkEnvExists() {
  try {
    await access(join(ROOT_DIR, '.env.local'));
    return true;
  } catch {
    return false;
  }
}

async function buildEnvContent(template, customValues = {}) {
  const lines = ['# Generated by Fabrk Setup Wizard', `# Template: ${template.name}`, ''];

  for (const [key, value] of Object.entries(template.env)) {
    if (value === '{{AUTO_GENERATE}}') {
      lines.push(`${key}="${generateSecret()}"`);
    } else if (value.startsWith('{{PROMPT:')) {
      const customVal = customValues[key] || '';
      lines.push(`${key}="${customVal}"`);
    } else {
      lines.push(`${key}="${value}"`);
    }
  }

  return lines.join('\n') + '\n';
}

async function writeEnvFile(content) {
  const path = join(ROOT_DIR, '.env.local');
  await writeFile(path, content, 'utf-8');
}

async function installDependencies(deps) {
  if (!deps || deps.length === 0) return;

  info(`Installing ${deps.length} dependencies...`);

  try {
    execSync(`npm install ${deps.join(' ')}`, {
      cwd: ROOT_DIR,
      stdio: 'pipe',
    });
    success(`Installed: ${deps.join(', ')}`);
  } catch (err) {
    warn(`Some dependencies may need manual installation`);
  }
}

async function runCustomFlow(rl) {
  const config = {
    name: 'Custom',
    dependencies: [],
    env: {
      NEXTAUTH_SECRET: '{{AUTO_GENERATE}}',
      NEXTAUTH_URL: 'http://localhost:3000',
      NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
      NODE_ENV: 'development',
    },
  };

  // Step 1: Database
  log('\n  [1/6] Database', 'bold');
  const db = await promptSelect(rl, '', CUSTOM_OPTIONS.database);

  if (db.value === 'sqlite') {
    config.env.DATABASE_URL = 'file:./dev.db';
  } else {
    config.env.DATABASE_URL = '{{PROMPT:PostgreSQL connection string}}';
  }

  // Step 2: Payments
  log('\n  [2/6] Payments', 'bold');
  const payments = await promptSelect(rl, '', CUSTOM_OPTIONS.payments);

  if (payments.value === 'stripe') {
    config.dependencies.push('stripe', '@stripe/stripe-js');
    config.env.STRIPE_SECRET_KEY = '{{PROMPT:Stripe secret key}}';
    config.env.STRIPE_WEBHOOK_SECRET = '{{PROMPT:Stripe webhook secret}}';
    config.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = '{{PROMPT:Stripe publishable key}}';
  } else if (payments.value === 'polar') {
    config.env.POLAR_ACCESS_TOKEN = '{{PROMPT:Polar access token}}';
  } else if (payments.value === 'lemonsqueezy') {
    config.env.LEMONSQUEEZY_API_KEY = '{{PROMPT:LemonSqueezy API key}}';
    config.env.LEMONSQUEEZY_WEBHOOK_SECRET = '{{PROMPT:LemonSqueezy webhook secret}}';
  }

  // Step 3: AI Provider
  log('\n  [3/6] AI Provider', 'bold');
  const ai = await promptSelect(rl, '', CUSTOM_OPTIONS.ai);

  if (ai.value === 'openai') {
    config.dependencies.push('openai', 'ai');
    config.env.OPENAI_API_KEY = '{{PROMPT:OpenAI API key}}';
  } else if (ai.value === 'anthropic') {
    config.dependencies.push('@anthropic-ai/sdk', 'ai');
    config.env.ANTHROPIC_API_KEY = '{{PROMPT:Anthropic API key}}';
  } else if (ai.value === 'google') {
    config.dependencies.push('@google/generative-ai', 'ai');
    config.env.GOOGLE_AI_API_KEY = '{{PROMPT:Google AI API key}}';
  }

  // Step 4: Analytics
  log('\n  [4/6] Analytics', 'bold');
  const analytics = await promptSelect(rl, '', CUSTOM_OPTIONS.analytics);

  if (analytics.value === 'posthog') {
    config.dependencies.push('posthog-js');
    config.env.NEXT_PUBLIC_POSTHOG_KEY = '{{PROMPT:PostHog project API key}}';
    config.env.NEXT_PUBLIC_POSTHOG_HOST = 'https://us.i.posthog.com';
  } else if (analytics.value === 'ga') {
    config.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = '{{PROMPT:Google Analytics ID}}';
  }

  // Step 5: Email
  log('\n  [5/6] Email', 'bold');
  const email = await promptSelect(rl, '', CUSTOM_OPTIONS.email);

  if (email.value === 'resend') {
    config.dependencies.push('resend');
    config.env.RESEND_API_KEY = '{{PROMPT:Resend API key}}';
  } else if (email.value === 'sendgrid') {
    config.dependencies.push('@sendgrid/mail');
    config.env.SENDGRID_API_KEY = '{{PROMPT:SendGrid API key}}';
  }

  // Step 6: Summary
  log('\n  [6/6] Configuration Summary', 'bold');
  console.log('');
  info(`Database: ${db.name}`);
  info(`Payments: ${payments.name}`);
  info(`AI: ${ai.name}`);
  info(`Analytics: ${analytics.name}`);
  info(`Email: ${email.name}`);

  return config;
}

async function collectEnvValues(rl, template) {
  const values = {};
  const prompts = [];

  for (const [key, value] of Object.entries(template.env)) {
    if (typeof value === 'string' && value.startsWith('{{PROMPT:')) {
      const hint = value.replace('{{PROMPT:', '').replace('}}', '');
      prompts.push({ key, hint });
    }
  }

  if (prompts.length === 0) return values;

  console.log('');
  log('  Enter your API keys (leave blank to skip):', 'bold');
  console.log('');

  for (const { key, hint } of prompts) {
    const answer = await promptInput(rl, `  ${key}`, hint);
    values[key] = answer;
  }

  return values;
}

async function main() {
  const rl = readline.createInterface({ input, output });

  try {
    banner();

    // Check for existing .env.local (skip in dry run)
    if (!DRY_RUN && await checkEnvExists()) {
      warn('.env.local already exists');
      const answer = await rl.question(`  Overwrite? (y/N): ${c.cyan}`);
      process.stdout.write(c.reset);

      if (answer.trim().toLowerCase() !== 'y') {
        info('Setup cancelled');
        rl.close();
        return;
      }
    }

    log('  Press Ctrl+C to exit at any time', 'dim');

    // Select template
    const selected = await promptSelect(rl, 'Select a template:', TEMPLATES);

    let template;
    let customValues = {};

    if (selected.name === 'Custom') {
      template = await runCustomFlow(rl);
    } else {
      template = await loadTemplate(selected.file);
    }

    // Collect API keys
    customValues = await collectEnvValues(rl, template);

    // Generate and write .env.local
    console.log('');
    info('Generating configuration...');

    const envContent = await buildEnvContent(template, customValues);
    const envVarCount = envContent.split('\n').filter(l => l.includes('=')).length;

    if (DRY_RUN) {
      // Show preview instead of writing
      console.log('');
      log('  +-----------------------------------------+', 'magenta');
      log('  |  DRY RUN PREVIEW                        |', 'magenta');
      log('  +-----------------------------------------+', 'magenta');
      console.log('');
      log('  .env.local would contain:', 'bold');
      console.log('');
      for (const line of envContent.split('\n')) {
        if (line.startsWith('#') || line === '') {
          log(`    ${c.dim}${line}${c.reset}`);
        } else {
          // Mask sensitive values
          const [key, ...valueParts] = line.split('=');
          const value = valueParts.join('=');
          if (key && value) {
            const masked = value.length > 10 ? value.slice(0, 8) + '...' : value;
            log(`    ${c.cyan}${key}${c.reset}=${masked}`);
          }
        }
      }
      console.log('');
      info(`Would generate ${envVarCount} variables`);

      if (template.dependencies && template.dependencies.length > 0) {
        info(`Would install: ${template.dependencies.join(', ')}`);
      }

      console.log('');
      log('  +-----------------------------------------+', 'yellow');
      log('  |  DRY RUN COMPLETE                       |', 'yellow');
      log('  |  Run without --dry-run to apply         |', 'yellow');
      log('  +-----------------------------------------+', 'yellow');
      console.log('');
    } else {
      // Actually write and install
      await writeEnvFile(envContent);
      success(`Generated .env.local (${envVarCount} variables)`);

      // Install dependencies if needed
      if (template.dependencies && template.dependencies.length > 0) {
        await installDependencies(template.dependencies);
      }

      // Auto-generate secret confirmation
      success('Auto-generated NEXTAUTH_SECRET');

      // Final message
      console.log('');
      log('  +-----------------------------------------+', 'green');
      log('  |  Setup complete!                        |', 'green');
      log('  +-----------------------------------------+', 'green');
      console.log('');
      log(`  ${c.bold}Next steps:${c.reset}`);
      log(`    1. npm run db:push   ${c.dim}(push schema to database)${c.reset}`);
      log(`    2. npm run dev       ${c.dim}(start development server)${c.reset}`);
      console.log('');
    }

  } catch (err) {
    if (err.code === 'ERR_USE_AFTER_CLOSE') {
      // User pressed Ctrl+C
      console.log('');
      info('Setup cancelled');
    } else {
      error(err.message);
      process.exit(1);
    }
  } finally {
    rl.close();
  }
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('');
  log('  [INFO] Setup cancelled', 'blue');
  console.log('');
  process.exit(0);
});

main();
