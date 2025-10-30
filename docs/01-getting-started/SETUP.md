# Complete Setup Guide

**Time Estimate: 20-30 minutes**

This guide will walk you through setting up the Fabrk Boilerplate from scratch. Follow each step exactly as written.

---

## Prerequisites Checklist

Before starting, verify you have:

- [ ] **Node.js 18+** installed ([Download here](https://nodejs.org/))
- [ ] **Git** installed ([Download here](https://git-scm.com/))
- [ ] **PostgreSQL database** (local or hosted - see DATABASE.md)
- [ ] **Stripe account** (free test mode - [Sign up](https://stripe.com/))
- [ ] **Code editor** (VS Code recommended)

### Verify Your Setup

Run these commands to check versions:

```bash
node --version
# Expected: v18.0.0 or higher

npm --version
# Expected: 9.0.0 or higher

git --version
# Expected: 2.0.0 or higher
```

**If any command fails:** Install the missing software from the links above.

---

## Step 1: Clone the Repository (2 minutes)

### Commands:

```bash
# Navigate to where you want the project
cd ~/Documents/GitHub

# Clone the repository
git clone <your-repo-url> fabrk-app
cd fabrk-app
```

### Expected Output:

```
Cloning into 'fabrk-app'...
remote: Enumerating objects: 150, done.
remote: Counting objects: 100% (150/150), done.
```

### Common Errors:

- **"git: command not found"** → Install Git from [git-scm.com](https://git-scm.com/)
- **"Permission denied"** → Check your SSH keys or use HTTPS clone URL

---

## Step 2: Install Dependencies (3-5 minutes)

### Commands:

```bash
npm install
```

### Expected Output:

```
added 350 packages, and audited 351 packages in 2m

45 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

### Common Errors:

- **"EACCES: permission denied"** → Don't use `sudo`. Fix permissions:
  ```bash
  sudo chown -R $USER ~/.npm
  ```

- **"gyp ERR!"** or **"node-gyp"** errors → Install build tools:
  ```bash
  # macOS
  xcode-select --install

  # Windows
  npm install --global windows-build-tools

  # Linux
  sudo apt-get install build-essential
  ```

---

## Step 3: Configure Environment Variables (10-15 minutes)

This is the most important step. Copy the example environment file:

```bash
cp .env.example .env.local
```

Now open `.env.local` in your code editor and configure each section:

### 3a. Database Configuration

```env
DATABASE_URL="postgresql://user:password@localhost:5432/fabrk"
```

**Replace with your actual database URL:**
- Local PostgreSQL: `postgresql://postgres:yourpassword@localhost:5432/fabrk`
- Vercel Postgres: Get from Vercel dashboard
- Supabase: Get from Supabase project settings
- Neon: Get from Neon console

See [DATABASE.md](./DATABASE.md) for detailed database setup.

### 3b. Application URLs

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

**Keep these as-is for local development.** Change only when deploying.

### 3c. NextAuth Configuration

```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

**Generate a secure secret:**

```bash
# Run this command to generate a random secret
openssl rand -base64 32
```

**Copy the output and paste it as your `NEXTAUTH_SECRET`.**

Example output: `XjK9L2mN3pQ4rS5tU6vW7xY8zA1bC2dE3fG4hI5jK6l=`

### 3d. Google OAuth (Optional but Recommended)

```env
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

**To get these credentials:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Application type: "Web application"
6. Authorized redirect URIs:
   - Add: `http://localhost:3000/api/auth/callback/google`
7. Copy Client ID and Client Secret

**Skip for now?** Comment out these lines with `#` to disable Google OAuth.

### 3e. Stripe Configuration (Required for Payments)

```env
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

**To get these:**

1. Create account at [stripe.com](https://stripe.com)
2. Go to [Dashboard](https://dashboard.stripe.com/test/dashboard)
3. Click "Developers" → "API keys"
4. Copy:
   - Publishable key (starts with `pk_test_`)
   - Secret key (starts with `sk_test_`)

**Webhook secret:** We'll set this up later in Step 6.

**Product Price IDs:**

Keep the example product IDs for now, or create your own:

```env
NEXT_PUBLIC_STRIPE_PRICE_STARTER="prod_..."
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL="prod_..."
NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE="prod_..."
```

See [STRIPE-SETUP.md](../03-deployment/STRIPE-SETUP.md) for creating products.

### 3f. Email Configuration (Optional)

```env
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@yourdomain.com"
```

**Using Resend (Recommended):**

1. Sign up at [resend.com](https://resend.com)
2. Get API key from dashboard
3. Add your sending domain

**Skip for now?** Comment out with `#`. The app will work without email.

### 3g. Redis Cache (Optional - Production Only)

```env
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."
```

**Skip for local development.** See [REDIS-SETUP.md](../03-deployment/REDIS-SETUP.md) for production.

### 3h. Monitoring (Optional)

```env
NEXT_PUBLIC_SENTRY_DSN="https://..."
SENTRY_AUTH_TOKEN="..."
```

**Skip for local development.**

---

## Step 4: Initialize Database (2 minutes)

Now that your `.env.local` is configured, set up your database:

```bash
npm run db:push
```

### Expected Output:

```
Environment variables loaded from .env.local
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "fabrk"

🚀  Your database is now in sync with your Prisma schema.

✔ Generated Prisma Client (5.8.0 | library)
```

### Common Errors:

- **"Can't reach database server"** → Check your DATABASE_URL
- **"Authentication failed"** → Verify database password
- **"Database doesn't exist"** → Create database first:
  ```bash
  # For local PostgreSQL
  createdb fabrk
  ```

---

## Step 5: Verify Installation (1 minute)

Run type checking and linting to ensure everything is set up correctly:

```bash
npm run type-check
```

### Expected Output:

```
No errors found.
```

```bash
npm run lint
```

### Expected Output:

```
✔ No ESLint warnings or errors
```

---

## Step 6: Start Development Server (1 minute)

```bash
npm run dev
```

### Expected Output:

```
  ▲ Next.js 15.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Ready in 2.1s
```

**Open your browser to [http://localhost:3000](http://localhost:3000)**

You should see the landing page!

### Common Errors:

- **"Port 3000 is already in use"** → Kill the process:
  ```bash
  # macOS/Linux
  lsof -ti:3000 | xargs kill -9

  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  ```

- **"Module not found"** → Reinstall dependencies:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

---

## Step 7: Set Up Stripe Webhooks (5 minutes)

To test payments locally, you need to forward Stripe webhooks:

### Install Stripe CLI:

**macOS:**
```bash
brew install stripe/stripe-cli/stripe
```

**Windows:**
Download from [stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)

**Linux:**
```bash
curl -s https://packages.stripe.com/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | sudo tee /usr/share/keyrings/stripe.gpg
echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.com/stripe-cli-debian-local stable main" | sudo tee -a /etc/apt/sources.list.d/stripe.list
sudo apt update
sudo apt install stripe
```

### Login to Stripe:

```bash
stripe login
```

Follow the browser prompt to authenticate.

### Start Webhook Forwarding (in a new terminal):

```bash
npm run stripe:listen
```

### Expected Output:

```
Ready! You are using Stripe API Version [2023-10-16]. Your webhook signing secret is whsec_xxxxx

> Listening on http://localhost:3000/api/webhooks/stripe
```

**Copy the webhook secret (`whsec_xxxxx`) and add it to your `.env.local`:**

```env
STRIPE_WEBHOOK_SECRET="whsec_xxxxx"
```

**Keep this terminal running** while testing payments.

---

## Step 8: Test Your Setup (3 minutes)

### Create an Account:

1. Go to [http://localhost:3000](http://localhost:3000)
2. Click "Sign Up"
3. Enter email and password
4. Click "Create Account"

### Test Authentication:

1. You should be redirected to the dashboard
2. Check that your name appears in the header
3. Try logging out and logging back in

### Test Stripe Integration (Optional):

1. Go to Pricing page
2. Click "Get Started" on any tier
3. Use test card: `4242 4242 4242 4242`
4. Any future expiry date
5. Any CVC
6. Complete checkout

**Check the Stripe CLI terminal** - you should see webhook events.

---

## Troubleshooting Common Issues

### "Cannot find module" errors

```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
```

### Database connection errors

```bash
# Test database connection
npx prisma studio
```

This should open a database browser at [http://localhost:5555](http://localhost:5555)

### Environment variables not loading

- Make sure file is named `.env.local` (NOT `.env`)
- Restart the dev server after changing `.env.local`
- No spaces around `=` in env vars

### Stripe webhooks not working

- Make sure Stripe CLI is running: `npm run stripe:listen`
- Check that webhook secret in `.env.local` matches CLI output
- Restart dev server after updating webhook secret

---

## Next Steps

Congratulations! Your development environment is ready.

**Continue to:**

1. [RUNNING-LOCALLY.md](../02-development/RUNNING-LOCALLY.md) - Learn the development workflow
2. [ENVIRONMENT.md](./ENVIRONMENT.md) - Understand all environment variables
3. [DATABASE.md](./DATABASE.md) - Learn about database management
4. [MCP-SERVERS.md](../02-development/MCP-SERVERS.md) - Set up Claude integration (optional)

---

## Getting Help

**If you're stuck:**

1. Check the [troubleshooting section](#troubleshooting-common-issues) above
2. Search existing GitHub issues
3. Create a new issue with:
   - Steps you followed
   - Error messages (full text)
   - Your environment (OS, Node version)
   - Screenshots if relevant

**Need to start over?** Delete the project folder and start from Step 1.
