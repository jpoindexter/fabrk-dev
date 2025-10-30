# Database Setup Guide

This guide covers everything you need to know about setting up and managing your PostgreSQL database.

---

## Quick Start

**Choose one option:**

1. [Local PostgreSQL](#option-1-local-postgresql) - Best for development, free, full control
2. [Vercel Postgres](#option-2-vercel-postgres) - Best for Vercel deployments, easy setup
3. [Supabase](#option-3-supabase) - Free tier, great features, easy to use
4. [Neon](#option-4-neon) - Serverless, generous free tier, modern
5. [Railway](#option-5-railway) - Simple, good for small projects

---

## Database Schema Overview

The boilerplate includes a complete database schema with:

- **User authentication** - Credentials, OAuth, sessions
- **Subscriptions** - Stripe integration, plans, tiers
- **Payments** - Transaction history, customer records
- **Multi-tenancy** - Organizations, teams, members
- **Security** - MFA, audit logs, login history
- **Email** - Queue, retry logic, templates

**Total tables:** 30+ models covering all SaaS needs

---

## Option 1: Local PostgreSQL

**Best for:** Development, testing, full control

**Time:** 10-15 minutes

### Step 1: Install PostgreSQL

**macOS (Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**macOS (Postgres.app):**
1. Download from [postgresapp.com](https://postgresapp.com/)
2. Drag to Applications
3. Click "Initialize"

**Windows:**
1. Download installer from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run installer
3. Remember the password you set!
4. Default port: 5432

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Step 2: Create Database

**macOS/Linux:**
```bash
# Login as postgres user
psql postgres

# Create database
CREATE DATABASE fabrk;

# Create user (optional)
CREATE USER fabrk_user WITH PASSWORD 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE fabrk TO fabrk_user;

# Exit
\q
```

**Windows (pgAdmin):**
1. Open pgAdmin 4
2. Connect to PostgreSQL server
3. Right-click "Databases" → "Create" → "Database"
4. Name: `fabrk`
5. Click "Save"

### Step 3: Get Connection URL

**Format:**
```
postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE
```

**Examples:**

Default user (postgres):
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/fabrk"
```

Custom user:
```env
DATABASE_URL="postgresql://fabrk_user:your_password@localhost:5432/fabrk"
```

### Step 4: Test Connection

Add URL to `.env.local` and run:

```bash
npm run db:push
```

**Expected output:**
```
✓ Generated Prisma Client
🚀 Your database is now in sync with your Prisma schema.
```

### Common Local Database Issues

**"Connection refused"**
```bash
# Check if PostgreSQL is running
brew services list  # macOS
sudo systemctl status postgresql  # Linux
```

**"Role does not exist"**
```bash
# Create the role
psql postgres
CREATE USER postgres WITH PASSWORD 'password';
```

**"Password authentication failed"**
```bash
# Reset password
psql postgres
ALTER USER postgres WITH PASSWORD 'newpassword';
```

---

## Option 2: Vercel Postgres

**Best for:** Vercel deployments, zero-config integration

**Time:** 5 minutes

**Pricing:** Free tier includes 256MB storage, 60 hours compute

### Step 1: Create Database

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Storage" tab
3. Click "Create Database"
4. Select "Postgres"
5. Choose region (same as your app deployment)
6. Name: `fabrk-db`
7. Click "Create"

### Step 2: Get Connection String

1. Open your database
2. Go to ".env.local" tab
3. Copy the `POSTGRES_PRISMA_URL` value

**Format:**
```env
DATABASE_URL="postgres://default:abc123@ep-cool-darkness-123456.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require"
```

### Step 3: Connect to Project

**For Vercel-deployed app:**
- Vercel automatically injects database URL
- No manual setup needed

**For local development:**
1. Copy `POSTGRES_PRISMA_URL` to your `.env.local`
2. Rename to `DATABASE_URL`
3. Run `npm run db:push`

### Vercel Postgres Features

- ✅ Automatic backups
- ✅ Connection pooling
- ✅ SSL by default
- ✅ Usage dashboard
- ✅ No credit card for free tier

### Limits (Free Tier)

- Storage: 256MB
- Compute: 60 hours/month
- Databases: 1
- Good for: Small apps, testing, staging

---

## Option 3: Supabase

**Best for:** Full-featured backend, generous free tier

**Time:** 5 minutes

**Pricing:** Free tier includes 500MB database, 2GB bandwidth

### Step 1: Create Project

1. Sign up at [supabase.com](https://supabase.com)
2. Click "New Project"
3. Name: `fabrk`
4. Database password: (generate or create strong password)
5. Region: Choose closest to users
6. Click "Create new project"
7. Wait 2-3 minutes for provisioning

### Step 2: Get Connection String

1. Go to Project Settings (gear icon)
2. Click "Database" in sidebar
3. Scroll to "Connection string"
4. Select "URI" tab
5. Copy the connection string

**Format:**
```
postgresql://postgres:[YOUR-PASSWORD]@db.projectref.supabase.co:5432/postgres
```

**Replace `[YOUR-PASSWORD]`** with the password from Step 1.

### Step 3: Configure Prisma

Add to `.env.local`:

```env
DATABASE_URL="postgresql://postgres:yourpassword@db.abcdefghij.supabase.co:5432/postgres"
```

Run:
```bash
npm run db:push
```

### Supabase Features

- ✅ Built-in auth (optional, we use NextAuth)
- ✅ Realtime subscriptions
- ✅ File storage
- ✅ Edge functions
- ✅ Database dashboard
- ✅ Automatic API generation

### Limits (Free Tier)

- Storage: 500MB
- Bandwidth: 2GB/month
- Good for: MVPs, small apps, side projects

---

## Option 4: Neon

**Best for:** Serverless PostgreSQL, modern stack

**Time:** 5 minutes

**Pricing:** Free tier includes 3GB storage, 1 project

### Step 1: Create Project

1. Sign up at [neon.tech](https://neon.tech)
2. Click "Create Project"
3. Name: `fabrk`
4. Region: Choose closest
5. Postgres version: 15 (recommended)
6. Click "Create Project"

### Step 2: Get Connection String

Connection string appears immediately after creation.

**Format:**
```
postgresql://username:password@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb
```

### Step 3: Add to Environment

```env
DATABASE_URL="postgresql://username:password@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

**Important:** Add `?sslmode=require` to the URL.

Run:
```bash
npm run db:push
```

### Neon Features

- ✅ Serverless (scales to zero)
- ✅ Instant branching
- ✅ Point-in-time restore
- ✅ No server management
- ✅ Great for staging/preview environments

### Limits (Free Tier)

- Storage: 3GB
- Projects: 1
- Compute: Shared
- Good for: Development, small production apps

---

## Option 5: Railway

**Best for:** Simple deployments, all-in-one platform

**Time:** 5 minutes

**Pricing:** $5/month credit free, pay-as-you-go after

### Step 1: Create Database

1. Go to [railway.app](https://railway.app)
2. "New Project" → "Provision PostgreSQL"
3. Wait for deployment

### Step 2: Get Connection String

1. Click on the Postgres service
2. Go to "Variables" tab
3. Copy `DATABASE_URL`

**Format:**
```
postgresql://postgres:password@containers-us-west-1.railway.app:5432/railway
```

### Step 3: Configure

Add to `.env.local`:
```env
DATABASE_URL="postgresql://postgres:password@containers-us-west-1.railway.app:5432/railway"
```

Run:
```bash
npm run db:push
```

### Railway Features

- ✅ One-click PostgreSQL
- ✅ Auto-deploy from GitHub
- ✅ Preview environments
- ✅ Built-in metrics
- ✅ Simple pricing

### Pricing

- Free: $5 credit/month
- Pay-as-you-go after
- Good for: Small to medium apps

---

## Database Management

### View Your Data (Prisma Studio)

```bash
npm run db:studio
```

Opens web interface at [http://localhost:5555](http://localhost:5555)

**Features:**
- Browse all tables
- Edit records
- Filter and search
- Add/delete records

### Push Schema Changes

After modifying `prisma/schema.prisma`:

```bash
npm run db:push
```

**Use for:**
- Development
- Rapid iteration
- Schema prototyping

### Create Migrations (Production)

For production-ready migrations:

```bash
npx prisma migrate dev --name add_new_feature
```

**Creates:**
- SQL migration file
- Migration history
- Rollback capability

### Reset Database (WARNING: Deletes all data)

```bash
npx prisma migrate reset
```

**This will:**
- Drop database
- Recreate database
- Run all migrations
- Seed data (if configured)

---

## Connection Pooling

For production, use connection pooling to handle many concurrent users.

### Prisma Data Proxy (Recommended for serverless)

1. Add to `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_DATABASE_URL")
}
```

2. In `.env.local`:
```env
DATABASE_URL="your-pooled-connection-url"
DIRECT_DATABASE_URL="your-direct-connection-url"
```

### External Poolers

**PgBouncer (Neon, Supabase built-in)**
- Connection pooling
- Reduces connection overhead
- Better performance

**Supabase example:**
```env
# Pooled connection (for queries)
DATABASE_URL="postgresql://postgres:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres"

# Direct connection (for migrations)
DIRECT_DATABASE_URL="postgresql://postgres:password@db.projectref.supabase.co:5432/postgres"
```

---

## Backup and Restore

### Backup Database

**Using pg_dump:**
```bash
pg_dump -h hostname -U username -d database_name -F c -f backup.dump
```

**Example:**
```bash
pg_dump -h localhost -U postgres -d fabrk -F c -f fabrk_backup.dump
```

### Restore Database

```bash
pg_restore -h hostname -U username -d database_name backup.dump
```

**Example:**
```bash
pg_restore -h localhost -U postgres -d fabrk fabrk_backup.dump
```

### Automated Backups

Most hosted providers include automatic backups:

- **Vercel Postgres:** Not included in free tier
- **Supabase:** Daily backups (7 day retention)
- **Neon:** Point-in-time restore
- **Railway:** Automated backups available

---

## Security Best Practices

### 1. Use Environment Variables

Never hardcode credentials:

```env
# ✅ Good
DATABASE_URL="postgresql://user:pass@host:5432/db"

# ❌ Bad
const dbUrl = "postgresql://user:pass@host:5432/db"
```

### 2. Strong Passwords

```bash
# Generate secure password
openssl rand -base64 32
```

### 3. SSL Connections

Always use SSL in production:

```env
DATABASE_URL="postgresql://...?sslmode=require"
```

### 4. IP Whitelisting

Configure firewall rules:
- Allow your app's IP addresses
- Block all other traffic
- Use VPN for admin access

### 5. Least Privilege

Create read-only users for analytics:

```sql
CREATE USER analytics_readonly WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE fabrk TO analytics_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analytics_readonly;
```

### 6. Regular Backups

- Automated daily backups
- Test restore procedure
- Store backups securely
- Keep multiple versions

---

## Performance Optimization

### 1. Indexes

Already included in `schema.prisma`:

```prisma
model User {
  email String @unique

  @@index([email])  // Fast email lookups
}
```

### 2. Connection Pooling

Use pooled connections in production (see [Connection Pooling](#connection-pooling))

### 3. Query Optimization

Use Prisma's query logging:

```typescript
// lib/prisma.ts
const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
})
```

### 4. Caching

Implement Redis caching for frequently accessed data (see [REDIS-SETUP.md](../03-deployment/REDIS-SETUP.md))

---

## Troubleshooting

### "Too many connections"

**Solution:** Use connection pooling

```env
# Add connection limit
DATABASE_URL="postgresql://...?connection_limit=5"
```

### "SSL required"

**Solution:** Add SSL mode

```env
DATABASE_URL="postgresql://...?sslmode=require"
```

### "Database does not exist"

**Solution:** Create database first

```bash
createdb fabrk
```

### "Migration failed"

**Solution:** Reset and retry

```bash
npx prisma migrate reset
npx prisma migrate dev
```

### Slow queries

**Solution 1:** Check indexes

```bash
npm run db:studio
# Verify indexes exist on filtered columns
```

**Solution 2:** Enable query logging

```typescript
const prisma = new PrismaClient({ log: ['query'] })
```

---

## Migration from Development to Production

### Step 1: Backup Development Data

```bash
pg_dump -F c -f dev_backup.dump
```

### Step 2: Create Production Database

Choose production provider (Neon, Supabase, etc.)

### Step 3: Run Migrations

```bash
npx prisma migrate deploy
```

### Step 4: Seed Production Data (optional)

```bash
npx prisma db seed
```

---

## Database Costs

### Free Tier Comparison

| Provider | Storage | Compute | Bandwidth | Backup |
|----------|---------|---------|-----------|--------|
| **Local** | Unlimited | Unlimited | N/A | Manual |
| **Vercel** | 256MB | 60hrs | N/A | Paid |
| **Supabase** | 500MB | Shared | 2GB | 7 days |
| **Neon** | 3GB | Shared | N/A | 7 days |
| **Railway** | $5 credit | Shared | N/A | Optional |

### When to Upgrade

Signs you need paid tier:
- Over storage limit
- High traffic (1000+ users)
- Need better performance
- Require advanced features
- Need support SLA

---

## Next Steps

Database is ready! Continue to:

- [RUNNING-LOCALLY.md](../02-development/RUNNING-LOCALLY.md) - Start development
- [TESTING.md](../02-development/TESTING.md) - Write tests
- [VERCEL.md](../03-deployment/VERCEL.md) - Deploy to production

---

## Need Help?

**Common issues:**
- Connection errors → Check DATABASE_URL format
- Schema errors → Run `npm run db:push`
- Data issues → Use `npm run db:studio` to inspect

**Still stuck?** Open an issue with:
- Database provider
- Error message
- Connection string (hide password!)
