# Fabrk Quick Reference

One-page reference for common tasks and commands.

---

## 📦 Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production
npm start                # Start production server

# Database
npm run db:push          # Push schema to database
npm run db:studio        # Open Prisma Studio GUI

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript validation

# Stripe (Local Testing)
npm run stripe:listen    # Forward webhooks to localhost
```

---

## 🗂️ File Structure

```
src/
├── app/
│   ├── (auth)/         # Login, signup, password reset
│   ├── (dashboard)/    # Protected dashboard pages
│   ├── (legal)/        # Terms, privacy, refund
│   ├── api/            # API routes
│   └── page.tsx        # Landing page
├── components/
│   ├── ui/             # 23 Radix UI components
│   ├── landing/        # 11 landing page sections
│   ├── dashboard/      # 10 dashboard components
│   └── settings/       # 6 settings pages
├── lib/
│   ├── auth.ts         # NextAuth configuration
│   ├── prisma.ts       # Database client
│   ├── stripe.ts       # Stripe helpers
│   └── email.ts        # Email service
├── emails/             # 5 email templates
└── config.js           # Central configuration
```

---

## 🎨 Component Imports

```tsx
// Landing components (barrel export)
import { HeroSection, HeroSplit, HeroVideo, PricingSection, PricingTable } from "@/components/landing";

// Email templates (barrel export)
import { generateWelcomeEmailHTML, generateVerifyEmailHTML } from "@/emails";

// UI components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
```

---

## 🔧 Environment Variables

```bash
# Required
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="openssl rand -base64 32"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
RESEND_API_KEY="re_..."

# Optional
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

---

## 🎯 Quick Pages

```
/                       Landing page (default)
/landing-alt            With comparison section
/variations             All component variations

/examples/admin         Data table demo
/examples/analytics     Analytics dashboard
/examples/user-profile  User profile page

/terms                  Terms of Service
/privacy                Privacy Policy
/refund                 Refund Policy

/login                  Login page
/signup                 Registration
/dashboard              Main dashboard
```

---

## 📚 Documentation Files

```
README.md                    # Project overview
QUICK-START.md               # 5-minute setup guide
DEPLOYMENT.md                # Production deployment
CLAUDE.md                    # Architecture reference
COMPONENT-SHOWCASE.md        # Component testing guide
LANDING-PAGE-VARIATIONS.md   # Hero/pricing variations
MARKETING.md                 # Launch strategy
PRODUCT-HUNT.md              # Launch copy
LAUNCH-STATUS.md             # Progress tracker
CHANGELOG.md                 # Version history
CONTRIBUTING.md              # Contribution guide
```

---

## 🎨 Design Tokens

```tsx
// Colors
const primary = "#007AFF";  // Purple/Blue
const black = "#000000";
const white = "#FFFFFF";
const gray = "#666666";

// Shadows (Neobrutalism)
className="shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"  // Small
className="shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"  // Medium
className="shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"  // Large

// Borders
className="border-2 border-black"  // Standard
className="border-4 border-black"  // Thick

// Spacing (Tailwind)
p-4, p-6, p-8     // Padding
m-4, m-6, m-8     // Margin
gap-4, gap-6      // Gap
```

---

## 🧩 Common Patterns

### Protected Route (Server Component)

```tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return <div>Protected content</div>;
}
```

### API Route with Auth

```tsx
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ data: "..." });
}
```

### Database Query (Prisma)

```tsx
import { prisma } from "@/lib/prisma";

// Find user
const user = await prisma.user.findUnique({
  where: { email: "user@example.com" },
});

// Create user
const newUser = await prisma.user.create({
  data: {
    name: "John Doe",
    email: "john@example.com",
  },
});

// Update user
await prisma.user.update({
  where: { id: userId },
  data: { name: "Jane Doe" },
});
```

### Send Email

```tsx
import { generateWelcomeEmailHTML } from "@/emails";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "noreply@fabrk.dev",
  to: "user@example.com",
  subject: "Welcome to Fabrk!",
  html: generateWelcomeEmailHTML({
    name: "John",
    licenseKey: "FABRK-123",
    downloadUrl: "https://...",
  }),
});
```

### Stripe Checkout

```tsx
import { stripe } from "@/lib/stripe";

const session = await stripe.checkout.sessions.create({
  mode: "payment",
  payment_method_types: ["card"],
  line_items: [
    {
      price: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER,
      quantity: 1,
    },
  ],
  success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
  cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
  metadata: {
    userId: session.user.id,
  },
});
```

---

## 🐛 Common Issues

### Module not found

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### Database connection error

```bash
# Check DATABASE_URL in .env.local
# Push schema again
npx prisma db push
```

### Prisma Client not generated

```bash
# Regenerate Prisma Client
npx prisma generate
```

### TypeScript errors

```bash
# Check for errors
npm run type-check

# Common fix: restart TS server in VS Code
# Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Stripe webhook not receiving events

```bash
# Make sure stripe CLI is running
npm run stripe:listen

# Check webhook secret matches in .env.local
STRIPE_WEBHOOK_SECRET="whsec_..."
```

---

## 📊 Database Schema (7 Models)

```prisma
User                # Authentication + customer info
Account             # OAuth accounts (Google)
Session             # Active sessions
VerificationToken   # Email verification tokens
Payment             # Stripe payment records
CheckoutSession     # Prevents duplicate charges
WebhookEvent        # Prevents duplicate webhooks
```

---

## 🎯 Testing Checklist

### Before Launch
- [ ] All environment variables set
- [ ] Database schema pushed
- [ ] Stripe products configured ($79)
- [ ] Test checkout flow (use test card 4242 4242 4242 4242)
- [ ] Test email sending (verify, reset, purchase)
- [ ] Test auth flow (signup, login, logout)
- [ ] Mobile responsive check
- [ ] Legal pages reviewed
- [ ] Support email/Discord set up

### Test Card (Stripe)
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

---

## 🚀 Deployment Checklist

### Vercel
```bash
# 1. Push to GitHub
git push origin main

# 2. Import to Vercel
# - Go to vercel.com/new
# - Import your repository

# 3. Add environment variables
# - Paste all from .env.local

# 4. Deploy
# - Vercel will build automatically
```

### After Deployment
- [ ] Set DATABASE_URL to production database
- [ ] Set NEXTAUTH_URL to production URL
- [ ] Configure Stripe webhook (production endpoint)
- [ ] Test checkout in production
- [ ] Configure custom domain (optional)

---

## 💡 Pro Tips

**Development:**
- Use `next dev --turbo` for faster HMR
- Keep Prisma Studio open for database inspection
- Use `console.log` sparingly (remove before commit)

**Components:**
- Start with UI primitives in `src/components/ui/`
- Use barrel exports for cleaner imports
- Check `/variations` page for layout previews

**Database:**
- Use `prisma db push` in development
- Use migrations in production
- Always backup before schema changes

**Styling:**
- Mobile-first (design for small screens first)
- Use Tailwind utilities (avoid custom CSS)
- Follow neobrutalism for landing pages

**Performance:**
- Use Server Components by default
- Add `"use client"` only when needed
- Lazy load heavy components

---

## 🔗 Quick Links

- **Docs:** `/docs` directory
- **Examples:** `/examples/*` routes
- **Variations:** `/variations` route
- **GitHub:** https://github.com/yourusername/fabrk
- **Discord:** https://discord.gg/fabrk
- **Support:** support@fabrk.dev

---

**Keep this file bookmarked for quick reference! 🚀**
