# Fabrk Boilerplate

**Ship your SaaS in days, not months.**

A production-ready Next.js 15 boilerplate with authentication, payments, database, and email built-in.

## ✨ What's Included

- ⚡ **Next.js 15** - App Router with Server Components
- 🔐 **Authentication** - NextAuth v5 with credentials & OAuth
- 💳 **Payments** - Stripe integration with webhooks
- 🗄️ **Database** - Prisma ORM with PostgreSQL
- 📧 **Emails** - React Email with Nodemailer
- 🎨 **UI Components** - 25 essential Radix UI components
- 🎯 **Landing Page** - Pre-built hero, pricing, FAQ sections
- 📊 **Dashboard** - User dashboard with settings & billing
- 🌓 **Dark Mode** - Built-in theme switching
- 📱 **Responsive** - Mobile-first design

## 🚀 Quick Start

### Automated Setup (Recommended)

Run the setup script to get started in 60 seconds:

```bash
chmod +x setup.sh && ./setup.sh
```

This will:
- ✅ Check Node.js version
- ✅ Install dependencies
- ✅ Create .env file
- ✅ Generate Prisma client
- ✅ Show next steps

### Manual Setup

#### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

#### 2. Setup Environment

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

**Required environment variables:**

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/fabrk"

# NextAuth (generate with: openssl rand -base64 32)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-here"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Resend Email
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@yourdomain.com"
```

#### 3. Setup Database

```bash
npx prisma db push
```

#### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 📖 Detailed Documentation

- **[Full Setup Guide](docs/01-getting-started/SETUP.md)** - Complete setup instructions
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
