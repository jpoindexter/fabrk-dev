import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export default function SEOPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Link href="/docs" className="text-primary hover:underline text-sm">
          ← Back to Documentation
        </Link>
      </div>

      <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
        <span className="font-mono text-xs text-muted-foreground">[ [0x70] FEATURES ] SEO</span>
      </div>
      <h1 className="font-mono text-3xl font-bold tracking-tight mb-4">SEO_METADATA</h1>
      <p className="font-mono text-sm text-muted-foreground mb-8">
        &gt; Comprehensive SEO configuration including meta tags, OpenGraph, Twitter cards, and structured data for optimal search engine visibility.
      </p>

      <section className="mb-12">
        <h2 className="font-mono text-xl font-semibold mb-4">OVERVIEW</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Fabrk includes a complete SEO system built on Next.js 15's metadata API. The system provides:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Automatic meta tag generation from centralized configuration</li>
              <li>OpenGraph and Twitter card support for social sharing</li>
              <li>JSON-LD structured data for rich search results</li>
              <li>Dynamic sitemap and robots.txt generation</li>
              <li>Canonical URL management</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-xl font-semibold mb-4">CONFIGURATION</h2>

        <div className="flex items-center gap-3 mb-3">
          <span className="flex h-8 w-8 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">1</span>
          <h3 className="font-mono text-xl font-medium">UPDATE_CENTRAL_CONFIG</h3>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-muted-foreground">Edit <code className="bg-muted px-2 py-1 font-mono">src/config.js</code> with your site details:</p>
          </div>
          <CodeBlock language="typescript" code={`export const config = {
  app: {
    name: "Your SaaS Name",
    description: "Your compelling product description",
    url: "https://yourdomain.com",
    ogImage: "/og-image.png",
    twitterHandle: "@yourusername",
  },
  // ...
};`} />
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span className="flex h-8 w-8 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">2</span>
          <h3 className="font-mono text-xl font-medium">ROOT_LAYOUT_METADATA</h3>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-muted-foreground">The root layout exports metadata automatically:</p>
          </div>
          <CodeBlock language="typescript" code={`// src/app/layout.tsx
import { config } from "@/config";

export const metadata = {
  title: {
    default: config.app.name,
    template: \`%s | \${config.app.name}\`,
  },
  description: config.app.description,
  openGraph: {
    title: config.app.name,
    description: config.app.description,
    url: config.app.url,
    siteName: config.app.name,
    images: [{ url: config.app.ogImage }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.app.name,
    description: config.app.description,
    creator: config.app.twitterHandle,
  },
};`} />
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span className="flex h-8 w-8 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">3</span>
          <h3 className="font-mono text-xl font-medium">PAGE_SPECIFIC_METADATA</h3>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground">Override metadata for individual pages:</p>
          </div>
          <CodeBlock language="tsx" code={`// src/app/pricing/page.tsx
export const metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for teams of all sizes",
  openGraph: {
    title: "Pricing | Your SaaS",
    description: "Simple, transparent pricing for teams of all sizes",
  },
};

export default function PricingPage() {
  return <div>...</div>;
}`} />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-xl font-semibold mb-4">CODE_EXAMPLES</h2>

        <h3 className="font-mono text-xl font-medium mb-3">DYNAMIC_METADATA</h3>
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-muted-foreground">Generate metadata based on dynamic content:</p>
          </div>
          <CodeBlock language="typescript" code={`// src/app/blog/[slug]/page.tsx
import { prisma } from "@/lib/db";

export async function generateMetadata({ params }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: "article",
      publishedTime: post.createdAt,
    },
  };
}`} />
        </div>

        <h3 className="font-mono text-xl font-medium mb-3">JSON_LD_STRUCTURED_DATA</h3>
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-muted-foreground">Add structured data for rich search results:</p>
          </div>
          <CodeBlock language="json" code={`// src/lib/seo/structured-data.ts
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.app.name,
    url: config.app.url,
    logo: \`\${config.app.url}/logo.png\`,
    sameAs: [
      "https://twitter.com/yourusername",
      "https://linkedin.com/company/yourcompany",
    ],
  };
}

// In your layout or page:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(generateOrganizationSchema()),
  }}
/>`} />
        </div>

        <h3 className="font-mono text-xl font-medium mb-3">SITEMAP_GENERATION</h3>
        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground">Automatic sitemap at <code className="bg-muted px-2 py-1 font-mono">/sitemap.xml</code>:</p>
          </div>
          <CodeBlock language="typescript" code={`// src/app/sitemap.ts
import { config } from "@/config";

export default async function sitemap() {
  const staticPages = [
    { url: config.app.url, lastModified: new Date() },
    { url: \`\${config.app.url}/pricing\`, lastModified: new Date() },
    { url: \`\${config.app.url}/features\`, lastModified: new Date() },
  ];

  // Add dynamic pages (blog posts, etc.)
  const posts = await prisma.post.findMany({
    select: { slug: true, updatedAt: true },
  });

  const postPages = posts.map((post) => ({
    url: \`\${config.app.url}/blog/\${post.slug}\`,
    lastModified: post.updatedAt,
  }));

  return [...staticPages, ...postPages];
}`} />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-xl font-semibold mb-4">COMMON_USE_CASES</h2>

        <div className="grid gap-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-mono font-semibold mb-2">LANDING_PAGE_SEO</h3>
              <p className="text-muted-foreground">
                Configure meta tags for your homepage with compelling title and description that matches your value proposition. Include OpenGraph image (1200x630px recommended).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-mono font-semibold mb-2">BLOG_POST_OPTIMIZATION</h3>
              <p className="text-muted-foreground">
                Use dynamic metadata generation to automatically pull title, description, and featured image from your CMS or database for each blog post.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-mono font-semibold mb-2">PRODUCT_PAGES</h3>
              <p className="text-muted-foreground">
                Add Product schema structured data for e-commerce features, including price, availability, and reviews for rich snippets in search results.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-mono font-semibold mb-2">LOCALIZED_CONTENT</h3>
              <p className="text-muted-foreground">
                Use hreflang tags and locale-specific metadata for international SEO. Fabrk's i18n system automatically handles alternate language links.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="font-mono text-xl font-semibold mb-4">BEST_PRACTICES</h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="list-disc pl-6 space-y-2">
              <li>Keep titles under 60 characters for full display in search results</li>
              <li>Write descriptions between 120-160 characters</li>
              <li>Use unique titles and descriptions for every page</li>
              <li>Include primary keyword near the beginning of titles</li>
              <li>Ensure OpenGraph images are at least 1200x630px</li>
              <li>Test structured data with Google's Rich Results Test</li>
              <li>Submit sitemap to Google Search Console</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
