/**
 * Central Configuration File
 * Single source of truth for all app settings
 *
 * INSTRUCTIONS:
 * 1. Copy this to your project root if needed
 * 2. Update all values to match your app
 * 3. Never commit real API keys to git
 */

const config = {
  // ============================================================================
  // APP INFORMATION
  // ============================================================================
  app: {
    name: "Fabrk Boilerplate",
    description: "Production-ready SaaS boilerplate with authentication, payments, and dashboard",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    author: "Your Name",
    supportEmail: "support@yourdomain.com",
  },

  // ============================================================================
  // AUTHENTICATION (NextAuth v5)
  // ============================================================================
  auth: {
    secret: process.env.NEXTAUTH_SECRET,
    sessionMaxAge: 30 * 24 * 60 * 60, // 30 days
    providers: {
      google: {
        enabled: !!process.env.GOOGLE_CLIENT_ID,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      credentials: {
        enabled: true, // Email/password auth
      },
    },
  },

  // ============================================================================
  // STRIPE PAYMENT CONFIGURATION
  // ============================================================================
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,

    // Your Stripe Price IDs
    prices: {
      starter: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER || "price_starter",
      professional: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL || "price_professional",
      enterprise: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE || "price_enterprise",
    },
  },

  // ============================================================================
  // EMAIL CONFIGURATION (Resend)
  // ============================================================================
  email: {
    provider: "resend", // or "sendgrid", "ses", etc.
    apiKey: process.env.RESEND_API_KEY,
    from: {
      name: "Fabrk Boilerplate",
      email: process.env.EMAIL_FROM || "noreply@yourdomain.com",
    },
    replyTo: process.env.EMAIL_REPLY_TO || "support@yourdomain.com",
  },

  // ============================================================================
  // DATABASE (Prisma)
  // ============================================================================
  database: {
    url: process.env.DATABASE_URL,
    // For connection pooling (recommended for serverless)
    directUrl: process.env.DATABASE_URL_DIRECT,
  },

  // ============================================================================
  // FEATURE FLAGS
  // ============================================================================
  features: {
    // Authentication features
    emailVerification: true,
    passwordReset: true,
    googleAuth: !!process.env.GOOGLE_CLIENT_ID,

    // Payment features
    subscriptions: true,
    oneTimePurchases: true,
    trialPeriod: true,

    // Dashboard features
    analytics: false, // Enable when ready
    userManagement: true,
    teamFeatures: false, // Coming soon

    // Content features
    blog: false, // Enable when you add blog posts
    documentation: true,
    changelog: false,
  },

  // ============================================================================
  // SUBSCRIPTION TIERS
  // ============================================================================
  tiers: {
    trial: {
      name: "Trial",
      durationDays: 14,
      features: ["Basic features", "Limited usage", "Email support"],
    },
    starter: {
      name: "Starter",
      price: 29,
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER,
      features: [
        "All basic features",
        "Increased limits",
        "Priority email support",
        "Monthly updates",
      ],
    },
    professional: {
      name: "Professional",
      price: 99,
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL,
      features: [
        "All Starter features",
        "Advanced analytics",
        "API access",
        "Dedicated support",
        "Custom integrations",
      ],
    },
    enterprise: {
      name: "Enterprise",
      price: "Custom",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE,
      features: [
        "All Professional features",
        "Unlimited usage",
        "SLA guarantee",
        "Dedicated account manager",
        "Custom development",
      ],
    },
  },

  // ============================================================================
  // API CONFIGURATION
  // ============================================================================
  api: {
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Max requests per window
    },
    timeout: 30000, // 30 seconds
  },

  // ============================================================================
  // ANALYTICS (Optional)
  // ============================================================================
  analytics: {
    enabled: false,
    // Add your analytics provider keys here
    // google: process.env.NEXT_PUBLIC_GA_ID,
    // plausible: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  },

  // ============================================================================
  // MONITORING (Optional)
  // ============================================================================
  monitoring: {
    // sentry: {
    //   dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    //   enabled: process.env.NODE_ENV === 'production',
    // },
  },

  // ============================================================================
  // DEVELOPMENT SETTINGS
  // ============================================================================
  dev: {
    enableDebugLogs: process.env.NODE_ENV === "development",
    mockStripe: false, // Set to true to test without real Stripe
    mockEmails: process.env.NODE_ENV === "development", // Log emails instead of sending
  },
};

// Export as both config and siteConfig for compatibility
module.exports = config;
module.exports.siteConfig = {
  name: config.app.name,
  description: config.app.description,
  url: config.app.url,
};
module.exports.default = config;
