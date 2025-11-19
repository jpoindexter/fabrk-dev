/**
 * Central Configuration File
 * Single source of truth for all app settings
 *
 * INSTRUCTIONS:
 * 1. Copy this to your project root if needed
 * 2. Update all values to match your app
 * 3. Never commit real API keys to git
 *
 * IMPORTANT: Environment variables are now validated via src/lib/env.ts
 * Critical variables will fail loudly if missing in production
 */

// Import validated environment variables for type safety
// Note: Using dynamic import to avoid module system conflicts
let env;
try {
  // Only import env validation in Node.js environment (not during Next.js client bundling)
  if (typeof window === 'undefined') {
    env = require('./lib/env').env;
  }
} catch (error) {
  // Fallback to process.env if env.ts hasn't been loaded yet
  env = { server: process.env, client: process.env };
}

const config = {
  // ============================================================================
  // APP INFORMATION
  // ============================================================================
  app: {
    name: "Fabrk Boilerplate",
    description: "Production-ready SaaS boilerplate with authentication, payments, and dashboard",
    url: env?.client?.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    author: env?.client?.NEXT_PUBLIC_AUTHOR_NAME || process.env.NEXT_PUBLIC_AUTHOR_NAME || "Fabrk Team",
    supportEmail: env?.client?.NEXT_PUBLIC_SUPPORT_EMAIL || process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@fabrk.dev",
  },

  // ============================================================================
  // AUTHENTICATION (NextAuth v5)
  // ============================================================================
  auth: {
    secret: env?.server?.NEXTAUTH_SECRET || process.env.NEXTAUTH_SECRET,
    sessionMaxAge: 30 * 24 * 60 * 60, // 30 days
    providers: {
      google: {
        enabled: !!(env?.server?.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID),
        clientId: env?.server?.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID,
        clientSecret: env?.server?.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET,
      },
      credentials: {
        enabled: true, // Email/password auth
      },
    },
  },

  // ============================================================================
  // STRIPE PAYMENT CONFIGURATION
  // CRITICAL: Price IDs must be set in production (no fallbacks)
  // ============================================================================
  stripe: {
    publishableKey: env?.client?.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    secretKey: env?.server?.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY,
    webhookSecret: env?.server?.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET,

    // Your Stripe Price IDs
    // IMPORTANT: These fallbacks only work in development
    // In production, these MUST be set or the app will fail during env validation
    prices: {
      starter: env?.client?.NEXT_PUBLIC_STRIPE_PRICE_STARTER || process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER || "price_starter",
      professional: env?.client?.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL || process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL || "price_professional",
      enterprise: env?.client?.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE || process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE || "price_enterprise",
    },
  },

  // ============================================================================
  // EMAIL CONFIGURATION (Resend)
  // ============================================================================
  email: {
    provider: "resend", // or "sendgrid", "ses", etc.
    apiKey: env?.server?.RESEND_API_KEY || process.env.RESEND_API_KEY,
    from: {
      name: "Fabrk Boilerplate",
      email: env?.server?.EMAIL_FROM || process.env.EMAIL_FROM || "noreply@fabrk.dev",
    },
    replyTo: env?.server?.EMAIL_REPLY_TO || process.env.EMAIL_REPLY_TO || "support@fabrk.dev",
  },

  // ============================================================================
  // DATABASE (Prisma)
  // CRITICAL: DATABASE_URL is required in production
  // ============================================================================
  database: {
    url: env?.server?.DATABASE_URL || process.env.DATABASE_URL,
    // For connection pooling (recommended for serverless)
    directUrl: env?.server?.DATABASE_URL_DIRECT || process.env.DATABASE_URL_DIRECT,
  },

  // ============================================================================
  // FEATURE FLAGS
  // ============================================================================
  features: {
    // Authentication features
    emailVerification: true,
    passwordReset: true,
    googleAuth: !!(env?.server?.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID),

    // Payment features
    subscriptions: true,
    oneTimePurchases: true,
    // TODO: Trial period - Database field exists (User.trialEndsAt) but checkout flow
    // needs implementation. Set trialEndsAt on user creation and check in middleware/API routes.
    trialPeriod: false, // Not fully implemented

    // Dashboard features
    analytics: false, // Enable when ready
    userManagement: true,
    teamFeatures: false, // Coming soon

    // Content features
    blog: false, // Enable when you add blog posts
    documentation: true,
    changelog: false,

    // Search features
    algoliaSearch: !!((env?.client?.NEXT_PUBLIC_ALGOLIA_APP_ID || process.env.NEXT_PUBLIC_ALGOLIA_APP_ID) &&
                      (env?.client?.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY)),
    commandPalette: true, // ⌘K keyboard shortcut

    // CMS features
    sanityCMS: !!((env?.client?.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) &&
                  (env?.client?.NEXT_PUBLIC_SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET)),
  },

  // ============================================================================
  // SEARCH CONFIGURATION (Algolia)
  // ============================================================================
  search: {
    enabled: !!((env?.client?.NEXT_PUBLIC_ALGOLIA_APP_ID || process.env.NEXT_PUBLIC_ALGOLIA_APP_ID) &&
                (env?.client?.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY)),
    appId: env?.client?.NEXT_PUBLIC_ALGOLIA_APP_ID || process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    searchApiKey: env?.client?.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
    adminApiKey: env?.server?.ALGOLIA_ADMIN_API_KEY || process.env.ALGOLIA_ADMIN_API_KEY, // Server-side only
    indices: {
      pages: 'pages',
      components: 'components',
      templates: 'templates',
      docs: 'docs',
    },
  },

  // ============================================================================
  // CMS CONFIGURATION (Sanity)
  // ============================================================================
  cms: {
    enabled: !!((env?.client?.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) &&
                (env?.client?.NEXT_PUBLIC_SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET)),
    projectId: env?.client?.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env?.client?.NEXT_PUBLIC_SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiToken: env?.server?.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN, // Server-side only
    studio: {
      basePath: '/studio', // Studio accessible at /studio
    },
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
      priceId: env?.client?.NEXT_PUBLIC_STRIPE_PRICE_STARTER || process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER,
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
      priceId: env?.client?.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL || process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL,
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
      priceId: env?.client?.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE || process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE,
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
  // PRODUCT PRICING (Landing Page Display)
  // ============================================================================
  pricing: {
    // Boilerplate product pricing (what customers pay to buy Fabrk)
    product: {
      current: 199, // One-time price for Fabrk boilerplate
      original: 299, // Original price before launch discount
      currency: "USD",
      display: {
        current: "$199",
        original: "$299",
      },
    },
    // Competitor pricing (for comparison tables)
    competitors: {
      diy: {
        name: "DIY",
        price: 0,
        display: "$0",
      },
      shipfast: {
        name: "ShipFast",
        price: 199,
        display: "$199",
      },
      supastarter: {
        name: "Supastarter",
        price: 349,
        display: "$349",
      },
    },
    // Example SaaS tier pricing (for customer's product demos)
    exampleTiers: {
      starter: {
        name: "Starter",
        price: 29,
        display: "$29",
        period: "/month",
      },
      professional: {
        name: "Professional",
        price: 99,
        display: "$99",
        period: "/month",
      },
      enterprise: {
        name: "Enterprise",
        price: 299,
        display: "$299",
        period: "/month",
      },
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
