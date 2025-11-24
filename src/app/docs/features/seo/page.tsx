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

      <h1 className="text-4xl font-bold mb-4">SEO & Metadata</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Comprehensive SEO configuration including meta tags, OpenGraph, Twitter cards, and structured data for optimal search engine visibility.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <Card className="bg-zinc-950">
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
        <h2 className="text-2xl font-semibold mb-4">Configuration</h2>

        <h3 className="text-xl font-medium mb-3">1. Update Central Config</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Edit <code className="bg-muted px-2 py-1 rounded">src/config.js</code> with your site details:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`export const config = {
  app: {
    name: "Your SaaS Name",
    description: "Your compelling product description",
    url: "https://yourdomain.com",
    ogImage: "/og-image.png",
    twitterHandle: "@yourusername",
  },
  // ...
};`}
            </pre>
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">2. Root Layout Metadata</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">The root layout exports metadata automatically:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`// src/app/layout.tsx
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
};`}
            </pre>
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">3. Page-Specific Metadata</h3>
        <Card className="bg-zinc-950">
          <CardContent className="pt-6">
            <p className="mb-4">Override metadata for individual pages:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`// src/app/pricing/page.tsx
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
}`}
            </pre>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Code Examples</h2>

        <h3 className="text-xl font-medium mb-3">Dynamic Metadata</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Generate metadata based on dynamic content:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`// src/app/blog/[slug]/page.tsx
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
}`}
            </pre>
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">JSON-LD Structured Data</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Add structured data for rich search results:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`// src/lib/seo/structured-data.ts
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
/>`}
            </pre>
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">Sitemap Generation</h3>
        <Card className="bg-zinc-950">
          <CardContent className="pt-6">
            <p className="mb-4">Automatic sitemap at <code className="bg-muted px-2 py-1 rounded">/sitemap.xml</code>:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`// src/app/sitemap.ts
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
}`}
            </pre>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Common Use Cases</h2>

        <div className="grid gap-4">
          <Card className="bg-zinc-950">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Landing Page SEO</h3>
              <p className="text-muted-foreground">
                Configure meta tags for your homepage with compelling title and description that matches your value proposition. Include OpenGraph image (1200x630px recommended).
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Blog Post Optimization</h3>
              <p className="text-muted-foreground">
                Use dynamic metadata generation to automatically pull title, description, and featured image from your CMS or database for each blog post.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Product Pages</h3>
              <p className="text-muted-foreground">
                Add Product schema structured data for e-commerce features, including price, availability, and reviews for rich snippets in search results.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Localized Content</h3>
              <p className="text-muted-foreground">
                Use hreflang tags and locale-specific metadata for international SEO. Fabrk's i18n system automatically handles alternate language links.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <Card className="bg-zinc-950">
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
