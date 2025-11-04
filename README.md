# Fabrk — Next.js SaaS Boilerplate# Fabrk Boilerplate



Hey maker 👋 Let's get your SaaS off the ground, FAST ⚡️**Ship your SaaS in days, not months.**



## What You GetA production-ready Next.js 15 boilerplate with authentication, payments, database, and email built-in.



- ⚡ **Next.js 15** - App Router + Server Components  ## ✨ What's Included

- 🔐 **Auth** - NextAuth v5 (email/password + Google OAuth)  

- 💳 **Payments** - Stripe checkout + webhooks  - ⚡ **Next.js 15** - App Router with Server Components

- 🗄️ **Database** - Prisma + PostgreSQL  - 🔐 **Authentication** - NextAuth v5 with credentials & OAuth

- 📧 **Email** - Resend integration  - 💳 **Payments** - Stripe integration with webhooks

- 🎨 **UI** - Tailwind CSS + Radix components  - 🗄️ **Database** - Prisma ORM with PostgreSQL

- 🌓 **Dark Mode** - Built-in theme switching- 📧 **Emails** - React Email with Nodemailer

- 🎨 **UI Components** - 25 essential Radix UI components

## Quick Start (5 minutes)- 🎯 **Landing Page** - Pre-built hero, pricing, FAQ sections

- 📊 **Dashboard** - User dashboard with settings & billing

### 1. Clone & Install- 🌓 **Dark Mode** - Built-in theme switching

- 📱 **Responsive** - Mobile-first design

```bash

git clone https://github.com/yourusername/fabrk_plate.git## 🚀 Quick Start

cd fabrk_plate

npm install### Automated Setup (Recommended)

```

Run the setup script to get started in 60 seconds:

### 2. Setup Environment

```bash

Copy `.env.example` to `.env`:chmod +x setup.sh && ./setup.sh

```

```bash

# DatabaseThis will:

DATABASE_URL="postgresql://..."- ✅ Check Node.js version

- ✅ Install dependencies

# NextAuth (generate: openssl rand -base64 32)- ✅ Create .env file

NEXTAUTH_URL="http://localhost:3000"- ✅ Generate Prisma client

NEXTAUTH_SECRET="your-secret"- ✅ Show next steps



# Stripe### Manual Setup

STRIPE_SECRET_KEY="sk_test_..."

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."#### 1. Install Dependencies

STRIPE_WEBHOOK_SECRET="whsec_..."

```bash

# Emailnpm install --legacy-peer-deps

RESEND_API_KEY="re_..."```

EMAIL_FROM="noreply@yourdomain.com"

```#### 2. Setup Environment



### 3. Setup DatabaseCopy `.env.example` to `.env` and configure:



```bash```bash

npx prisma db pushcp .env.example .env

``````



### 4. Run**Required environment variables:**



```bash```env

npm run dev# Database

```DATABASE_URL="postgresql://user:password@localhost:5432/fabrk"



Open [http://localhost:3000](http://localhost:3000) 🚀# NextAuth (generate with: openssl rand -base64 32)

NEXTAUTH_URL="http://localhost:3000"

## Deploy to VercelNEXTAUTH_SECRET="your-generated-secret-here"



1. Push to GitHub# Google OAuth (optional)

2. Import to VercelGOOGLE_CLIENT_ID="your-client-id"

3. Add env varsGOOGLE_CLIENT_SECRET="your-client-secret"

4. Deploy

# Stripe

Then configure Stripe webhook: `https://yourdomain.com/api/webhooks/stripe`STRIPE_SECRET_KEY="sk_test_..."

STRIPE_WEBHOOK_SECRET="whsec_..."

## What's IncludedNEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."



- Landing page with hero, pricing, FAQ# Resend Email

- Email/password + Google authRESEND_API_KEY="re_..."

- Protected dashboard routesEMAIL_FROM="noreply@yourdomain.com"

- Stripe payment flow```

- Email verification & password reset

- Dark mode toggle#### 3. Setup Database

- Mobile responsive

```bash

## Simple & Hackablenpx prisma db push

```

Everything in plain TypeScript. No magic, no complex abstractions. 

#### 4. Run Development Server

- `src/config.js` - All app settings in one place

- `src/lib/stripe.ts` - All Stripe logic (150 lines)```bash

- `src/lib/email.ts` - Email sending (100 lines)npm run dev

- `prisma/schema.prisma` - 7 core models```



Modify anything. It's YOUR codebase now.Open [http://localhost:3000](http://localhost:3000)



---### 📖 Detailed Documentation



**Ship it!** 🚀- **[Full Setup Guide](docs/01-getting-started/SETUP.md)** - Complete setup instructions

- **[Environment Variables](docs/01-getting-started/ENVIRONMENT.md)** - All env vars explained
- **[Database Setup](docs/01-getting-started/DATABASE.md)** - Database configuration
- **[Development Guide](docs/02-development/RUNNING-LOCALLY.md)** - Local development
- **[Configuration](src/config.js)** - Central configuration file

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── (dashboard)/     # User dashboard
│   ├── api/            # API routes
│   └── page.tsx        # Landing page
├── components/
│   ├── ui/             # 25 core UI components
│   ├── home/           # Landing page sections
│   ├── dashboard/      # Dashboard sections
│   └── auth/           # Auth forms
├── lib/
│   ├── auth.ts         # NextAuth config
│   ├── prisma.ts       # Database client
│   ├── email/          # Email service
│   └── api/            # API utilities
└── emails/             # Email templates
```

## 🔑 Features

### Authentication

- Email/password login
- Google OAuth
- Password reset
- Email verification
- Session management

### Payments

- Stripe Checkout
- Subscription management
- Webhook handling
- Customer portal
- Multiple pricing tiers

### Database

- User management
- Subscription tracking
- Payment history
- Secure schema

### Email

- Welcome emails
- Password reset
- Purchase confirmations
- React Email templates

## 📝 Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint
npm run type-check       # TypeScript validation
npm run db:push          # Push database schema
npm run db:studio        # Open Prisma Studio
npm run stripe:listen    # Listen to Stripe webhooks
```

## 🎨 Customization

### Branding

Update colors, fonts, and logo in:
- `tailwind.config.ts` - Tailwind theme
- `src/app/layout.tsx` - Metadata
- `public/` - Logo and favicon

### Pricing

Configure pricing tiers in `.env.local`:

```env
STRIPE_PRICE_BASIC="price_xxx"
STRIPE_PRICE_PROFESSIONAL="price_xxx"
```

### Email Templates

Edit email templates in `src/emails/`:
- `welcome.tsx`
- `reset-password.tsx`
- `purchase-confirmation.tsx`

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Database

Use any PostgreSQL provider:
- Vercel Postgres
- Supabase
- Neon
- Railway

### Stripe Webhooks

After deployment, add webhook endpoint:
```
https://your-domain.com/api/webhooks/stripe
```

Listen for events:
- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [NextAuth Docs](https://authjs.dev)
- [Prisma Docs](https://www.prisma.io/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Radix UI Docs](https://www.radix-ui.com/docs)

## 🤝 Support

For questions or issues, open an issue on GitHub.

## 📄 License

MIT License - feel free to use for personal and commercial projects.

---

**Ready to ship?** Start customizing and launch your SaaS! 🚀
