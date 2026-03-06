# Rebrand Your App

Change FABRK's identity to match your product in under 10 minutes.

---

## 1. Update App Config

Edit `src/config/app.ts` -- this is the single source of truth for app identity:

```ts
const config = {
  app: {
    name: 'YourApp',
    description: 'Your one-line product description',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://yourapp.com',
    author: process.env.NEXT_PUBLIC_AUTHOR_NAME || 'Your Name',
    supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@yourapp.com',
  },
  // ...
};
```

Set the matching env vars in `.env.local`:

```bash
NEXT_PUBLIC_APP_URL="https://yourapp.com"
NEXT_PUBLIC_AUTHOR_NAME="Your Name"
NEXT_PUBLIC_SUPPORT_EMAIL="support@yourapp.com"
```

## 2. Update Metadata / SEO

Edit `src/lib/metadata.ts`:

```ts
export const siteConfig = {
  name: 'YourApp',
  description: 'Your SEO description here',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/og-image.png',
  links: {
    github: 'https://github.com/you/your-repo',
  },
};
```

Update the `authors` and `creator` fields in `defaultMetadata` in the same file:

```ts
authors: [{ name: 'Your Name', url: 'https://yourwebsite.com' }],
creator: 'Your Name',
```

## 3. Swap Logo Files

Replace these files in `public/`:

| File | Size | Purpose |
|------|------|---------|
| `favicon.ico` | 32x32 | Browser tab icon |
| `favicon-16x16.png` | 16x16 | Small favicon |
| `apple-touch-icon.png` | 180x180 | iOS home screen |
| `logo.png` | 512x512 | Schema.org / structured data |
| `og-image.png` | 1200x630 | Social media preview |

Then update the Logo component at `src/components/shared/logo.tsx` if you use a custom SVG or image instead of the built-in terminal-style logo.

## 4. Update Email Templates

Edit `src/config/app.ts` email section:

```ts
email: {
  provider: 'resend',
  apiKey: env?.server?.RESEND_API_KEY || process.env.RESEND_API_KEY,
  from: {
    name: 'YourApp',
    email: process.env.EMAIL_FROM || 'noreply@yourapp.com',
  },
  replyTo: process.env.EMAIL_REPLY_TO || 'support@yourapp.com',
},
```

Set in `.env.local`:

```bash
RESEND_API_KEY="re_your_key"
EMAIL_FROM="noreply@mail.yourapp.com"
EMAIL_REPLY_TO="support@yourapp.com"
CONTACT_FORM_EMAIL="support@yourapp.com"
```

## 5. Update Footer Social Links

Edit `src/components/shared/footer.tsx`:

- Change the `FABRK` brand text to your app name
- Update the copyright line at the bottom
- Swap the `techStack` array if your stack differs
- Replace or remove the Product Hunt badge
- Update nav links in the PRODUCT / COMPANY / LEGAL sections

## 6. Update Navigation

Edit `src/components/marketing/navigation.tsx` to change the nav links:

```ts
const navLinks = [
  { label: 'FEATURES', href: '#features' },
  { label: 'PRICING', href: '#pricing' },
  { label: 'DOCS', href: '/docs' },
  { label: 'FAQ', href: '#faq' },
];
```

## 7. Update Site Manifest

Edit `public/site.webmanifest`:

```json
{
  "name": "YourApp",
  "short_name": "YourApp",
  "icons": [
    { "src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#000000",
  "background_color": "#000000",
  "display": "standalone"
}
```

## Verification

After making changes, run:

```bash
npm run build
npm run dev
```

Check these pages to confirm branding is correct:

- Landing page (`/`)
- Login page (`/login`)
- Dashboard (`/dashboard`)
- View page source for correct `<title>` and OG meta tags
