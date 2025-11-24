import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export default function InternationalizationPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Internationalization (i18n)</h1>
        <p className="text-lg text-muted-foreground">
          Support multiple languages with next-intl. Fabrk includes 6 languages out of the box.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="mb-2 font-semibold">Supported Languages</h3>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            <li>English (en) - Default</li>
            <li>Spanish (es)</li>
            <li>French (fr)</li>
            <li>German (de)</li>
            <li>Portuguese (pt)</li>
            <li>Japanese (ja)</li>
          </ul>
        </CardContent>
      </Card>

      {/* URL Structure */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">URL Structure</h2>
        <p className="text-muted-foreground">
          Uses "as-needed" locale prefix strategy:
        </p>
        <CodeBlock language="bash" code={`# English (default - no prefix)
https://yourapp.com/dashboard
https://yourapp.com/pricing

# Other languages (prefixed)
https://yourapp.com/es/dashboard    # Spanish
https://yourapp.com/fr/pricing      # French
https://yourapp.com/de/settings     # German
https://yourapp.com/pt/features     # Portuguese
https://yourapp.com/ja/docs         # Japanese`} />
      </div>

      {/* Configuration */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Configuration</h2>
        <p className="text-muted-foreground">
          i18n configuration in <code className="rounded bg-muted px-1 py-0.5">src/i18n.ts</code>:
        </p>
        <CodeBlock language="typescript" code={`// src/i18n.ts

import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "es", "fr", "de", "pt", "ja"] as const;
export const defaultLocale = "en" as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(\`./messages/\${locale}.json\`)).default,
}));

// src/middleware.ts

import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed", // Only prefix non-default locales
});

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\\\..*).*)",
  ],
};`} />
      </div>

      {/* Translation Files */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Translation Files</h2>
        <p className="text-muted-foreground">
          JSON files in <code className="rounded bg-muted px-1 py-0.5">src/messages/</code>:
        </p>
        <CodeBlock language="json" code={`// src/messages/en.json

{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "loading": "Loading...",
    "error": "Something went wrong"
  },
  "auth": {
    "signIn": "Sign in",
    "signOut": "Sign out",
    "signUp": "Sign up",
    "email": "Email",
    "password": "Password",
    "forgotPassword": "Forgot password?"
  },
  "dashboard": {
    "title": "Dashboard",
    "welcome": "Welcome back, {name}!",
    "stats": {
      "totalUsers": "Total Users",
      "revenue": "Revenue",
      "activeProjects": "Active Projects"
    }
  },
  "pricing": {
    "title": "Simple, transparent pricing",
    "monthly": "Monthly",
    "yearly": "Yearly",
    "perMonth": "/month",
    "getStarted": "Get started"
  }
}

// src/messages/es.json

{
  "common": {
    "save": "Guardar",
    "cancel": "Cancelar",
    "delete": "Eliminar",
    "loading": "Cargando...",
    "error": "Algo salió mal"
  },
  "auth": {
    "signIn": "Iniciar sesión",
    "signOut": "Cerrar sesión",
    "signUp": "Registrarse",
    "email": "Correo electrónico",
    "password": "Contraseña",
    "forgotPassword": "¿Olvidaste tu contraseña?"
  }
  // ...
}`} />
      </div>

      {/* Using Translations */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Using Translations</h2>
        <p className="text-muted-foreground">
          Use the useTranslations hook in components:
        </p>
        <CodeBlock language="tsx" code={`// Client Component
"use client";

import { useTranslations } from "next-intl";

export function DashboardHeader() {
  const t = useTranslations("dashboard");
  const tCommon = useTranslations("common");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("welcome", { name: "John" })}</p>
      <button>{tCommon("save")}</button>
    </div>
  );
}

// Server Component
import { getTranslations } from "next-intl/server";

export default async function PricingPage() {
  const t = await getTranslations("pricing");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("perMonth")}</p>
    </div>
  );
}`} />
      </div>

      {/* Dynamic Values */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Dynamic Values & Pluralization</h2>
        <p className="text-muted-foreground">
          Pass variables and handle plurals:
        </p>
        <CodeBlock language="typescript" code={`// messages/en.json
{
  "items": {
    "count": "{count, plural, =0 {No items} =1 {1 item} other {# items}}",
    "selected": "You selected {items}"
  },
  "dates": {
    "lastUpdated": "Last updated {date, date, short}",
    "timeAgo": "{time, time, medium}"
  },
  "numbers": {
    "price": "Price: {amount, number, currency}"
  }
}

// Usage
const t = useTranslations("items");

t("count", { count: 0 })    // "No items"
t("count", { count: 1 })    // "1 item"
t("count", { count: 5 })    // "5 items"

t("selected", { items: "A, B, C" })  // "You selected A, B, C"

// Date formatting
const tDates = useTranslations("dates");
tDates("lastUpdated", { date: new Date() })  // "Last updated 11/24/25"`} />
      </div>

      {/* Locale Switcher */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Locale Switcher Component</h2>
        <p className="text-muted-foreground">
          Let users switch languages:
        </p>
        <CodeBlock language="tsx" code={`"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { locales } from "@/i18n";

const localeNames: Record<string, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
  ja: "日本語",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    // Remove current locale prefix
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as any)) {
      segments.splice(1, 1);
    }

    // Add new locale (unless default)
    const newPath = newLocale === "en"
      ? segments.join("/") || "/"
      : \`/\${newLocale}\${segments.join("/")}\`;

    router.push(newPath);
  };

  return (
    <select
      value={locale}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded border bg-background px-2 py-1"
    >
      {locales.map((loc) => (
        <option key={loc} value={loc}>
          {localeNames[loc]}
        </option>
      ))}
    </select>
  );
}`} />
      </div>

      {/* Adding a New Language */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Adding a New Language</h2>
        <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
          <li>
            Add locale to <code className="rounded bg-muted px-1 py-0.5">src/i18n.ts</code>:
            <pre className="mt-1 rounded bg-muted p-2 text-sm">
              <code>export const locales = ["en", "es", "fr", "de", "pt", "ja", "ko"] as const;</code>
            </pre>
          </li>
          <li>
            Create translation file <code className="rounded bg-muted px-1 py-0.5">src/messages/ko.json</code>
          </li>
          <li>
            Copy content from <code className="rounded bg-muted px-1 py-0.5">en.json</code> and translate
          </li>
          <li>
            Add locale name to LocaleSwitcher component
          </li>
        </ol>
      </div>

      {/* SEO for Multiple Languages */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">SEO for Multiple Languages</h2>
        <p className="text-muted-foreground">
          Add hreflang tags for SEO:
        </p>
        <CodeBlock language="typescript" code={`// src/app/[locale]/layout.tsx

import { locales } from "@/i18n";

export function generateMetadata({ params }: { params: { locale: string } }) {
  return {
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [
          locale,
          locale === "en" ? "/" : \`/\${locale}\`,
        ])
      ),
    },
  };
}

// Generates:
// <link rel="alternate" hreflang="en" href="/" />
// <link rel="alternate" hreflang="es" href="/es" />
// <link rel="alternate" hreflang="fr" href="/fr" />
// ...`} />
      </div>

      {/* Type Safety */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Type Safety</h2>
        <p className="text-muted-foreground">
          Get TypeScript autocomplete for translation keys:
        </p>
        <CodeBlock language="typescript" code={`// src/types/next-intl.d.ts

import en from "../messages/en.json";

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}

// Now you get autocomplete:
const t = useTranslations("common");
t("save")     // ✅ Autocomplete works
t("invalid")  // ❌ TypeScript error`} />
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/extras/theming">
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Theming</h3>
                <p className="text-sm text-muted-foreground">
                  Customize colors and appearance
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/deployment/vercel">
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Deploy to Vercel</h3>
                <p className="text-sm text-muted-foreground">
                  Deploy your multilingual app
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
