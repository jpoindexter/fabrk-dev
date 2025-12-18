import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsCallout } from '@/components/docs';
import { Search, Zap, Filter, Globe, Server, DollarSign } from 'lucide-react';

export const metadata = {
  title: 'Search Integration - Fabrk Docs',
  description:
    'Add powerful search to your SaaS with Algolia, Meilisearch, Typesense, Elasticsearch, or Fuse.js. Multi-provider support with unified API.',
};

export default function SearchPage() {
  return (
    <FeatureGuideTemplate
      code="[0xSR]"
      category="Features"
      title="Search Integration"
      description="Powerful search for your SaaS - Multiple providers, one API."
      overview="Fabrk provides a unified search interface supporting multiple providers: Algolia for managed search, Meilisearch and Typesense for self-hosted options, Elasticsearch for enterprise, and Fuse.js for client-side search. Switch providers without changing your application code. Features include typo tolerance, faceted filtering, instant results, and relevance ranking."
      features={[
        {
          icon: Search,
          title: 'Typo Tolerance',
          description:
            'Users find what they want despite spelling mistakes. All providers handle fuzzy matching.',
        },
        {
          icon: Zap,
          title: 'Instant Results',
          description:
            'Sub-50ms responses for all cloud providers. Real-time search as users type.',
        },
        {
          icon: Filter,
          title: 'Faceted Filtering',
          description:
            'Filter by category, price, date, or any attribute. Build powerful filter UIs.',
        },
        {
          icon: Globe,
          title: 'Multi-Provider',
          description:
            'Algolia, Meilisearch, Typesense, Elasticsearch, or Fuse.js. Choose what fits your needs.',
        },
        {
          icon: Server,
          title: 'Self-Host Options',
          description:
            'Run Meilisearch, Typesense, or Elasticsearch on your own infrastructure.',
        },
        {
          icon: DollarSign,
          title: 'Zero-Cost Option',
          description:
            'Fuse.js runs entirely client-side. No server, no API costs, works offline.',
        },
      ]}
      setup={[
        {
          title: 'Choose a Provider',
          description:
            'Set your preferred search provider in environment variables.',
          code: `# .env.local

# Option 1: Algolia (managed, fastest)
SEARCH_PROVIDER="algolia"
ALGOLIA_APP_ID="XXXXXXXXXX"
ALGOLIA_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Option 2: Meilisearch (self-hosted, great DX)
SEARCH_PROVIDER="meilisearch"
MEILISEARCH_HOST="http://localhost:7700"
MEILISEARCH_API_KEY="YOUR_MASTER_KEY"

# Option 3: Typesense (self-hosted, fast)
SEARCH_PROVIDER="typesense"
TYPESENSE_HOST="http://localhost:8108"
TYPESENSE_API_KEY="YOUR_API_KEY"

# Option 4: Elasticsearch (enterprise)
SEARCH_PROVIDER="elasticsearch"
ELASTICSEARCH_URL="http://localhost:9200"

# Option 5: Fuse.js (client-side, zero cost)
SEARCH_PROVIDER="fuse"
# No API keys needed!`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Search Documents',
          description: 'Use the unified search API.',
          code: `import { search } from '@/lib/search';

const results = await search({
  index: 'products',
  query: 'wireless headphones',
  limit: 20,
});

console.log(results.hits);
// [{ name: 'Wireless Headphones Pro', price: 199, ... }, ...]

console.log(results.total);
// 42

console.log(results.processingTimeMs);
// 3 (milliseconds)`,
          language: 'typescript',
        },
        {
          title: 'Search with Filters',
          description: 'Filter results by attributes.',
          code: `import { search } from '@/lib/search';

const results = await search({
  index: 'products',
  query: 'headphones',
  filters: {
    category: 'audio',
    inStock: true,
    price: { min: 50, max: 200 },
  },
  limit: 10,
});`,
          language: 'typescript',
        },
        {
          title: 'Index Documents',
          description: 'Add documents to your search index.',
          code: `import { getSearchProvider } from '@/lib/search';

const provider = getSearchProvider();

// Index products
await provider.index('products', [
  {
    id: 'prod_1',
    name: 'Wireless Mouse',
    price: 49.99,
    category: 'electronics',
  },
  {
    id: 'prod_2',
    name: 'Mechanical Keyboard',
    price: 149.99,
    category: 'electronics',
  },
]);

// Delete products
await provider.delete('products', ['prod_1', 'prod_2']);`,
          language: 'typescript',
        },
      ]}
      previous={{ title: 'Cloud Storage', href: '/docs/features/cloud-storage' }}
      next={{ title: 'Analytics', href: '/docs/features/analytics' }}
    >
      {/* Search Provider Guides */}
      <DocsSection title="Search Provider Guides">
        <p className="text-muted-foreground mb-4">
          Fabrk supports 5 search providers. Choose based on your needs:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a href="/docs/features/algolia">
            <DocsCard title="ALGOLIA" className="hover:border-primary/50 h-full transition-all">
              <p className="text-muted-foreground mb-2">Gold standard</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• Sub-50ms globally</li>
                <li>• InstantSearch UI</li>
                <li>• Analytics included</li>
              </ul>
            </DocsCard>
          </a>
          <a href="/docs/features/meilisearch">
            <DocsCard title="MEILISEARCH" className="hover:border-primary/50 h-full transition-all">
              <p className="text-muted-foreground mb-2">Open source Algolia</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• Self-host or cloud</li>
                <li>• Rust-powered</li>
                <li>• Great free tier</li>
              </ul>
            </DocsCard>
          </a>
          <a href="/docs/features/typesense">
            <DocsCard title="TYPESENSE" className="hover:border-primary/50 h-full transition-all">
              <p className="text-muted-foreground mb-2">Developer-friendly</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• C++ performance</li>
                <li>• Schema-based</li>
                <li>• Geo search built-in</li>
              </ul>
            </DocsCard>
          </a>
          <a href="/docs/features/elasticsearch">
            <DocsCard title="ELASTICSEARCH" className="hover:border-primary/50 h-full transition-all">
              <p className="text-muted-foreground mb-2">Enterprise grade</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• Petabyte scale</li>
                <li>• Advanced analytics</li>
                <li>• Kibana dashboards</li>
              </ul>
            </DocsCard>
          </a>
          <a href="/docs/features/fuse">
            <DocsCard title="FUSE.JS" className="hover:border-primary/50 h-full transition-all">
              <p className="text-muted-foreground mb-2">Zero cost</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• Client-side only</li>
                <li>• Works offline</li>
                <li>• ~4KB gzipped</li>
              </ul>
            </DocsCard>
          </a>
        </div>
      </DocsSection>

      {/* Provider Comparison */}
      <DocsSection title="Provider Comparison">
        <DocsCard title="CHOOSE YOUR PROVIDER">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-border border-b">
                  <th className="p-2 text-left">Provider</th>
                  <th className="p-2 text-left">Best For</th>
                  <th className="p-2 text-left">Hosting</th>
                  <th className="p-2 text-left">Cost</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-border border-b">
                  <td className="p-2 font-medium">Algolia</td>
                  <td className="p-2">Production SaaS</td>
                  <td className="p-2">Managed</td>
                  <td className="p-2">$$</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-medium">Meilisearch</td>
                  <td className="p-2">Self-hosted, startups</td>
                  <td className="p-2">Self/Cloud</td>
                  <td className="p-2">$</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-medium">Typesense</td>
                  <td className="p-2">High performance</td>
                  <td className="p-2">Self/Cloud</td>
                  <td className="p-2">$</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-medium">Elasticsearch</td>
                  <td className="p-2">Enterprise, analytics</td>
                  <td className="p-2">Self/Cloud</td>
                  <td className="p-2">$$$</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Fuse.js</td>
                  <td className="p-2">Small datasets, offline</td>
                  <td className="p-2">Client-side</td>
                  <td className="p-2">Free</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocsCard>

        <DocsCallout variant="info" title="When to use which?">
          Use Algolia for production SaaS with budget. Use Meilisearch/Typesense for self-hosting or lower costs. Use Elasticsearch for enterprise with complex analytics. Use Fuse.js for small datasets or offline-first apps.
        </DocsCallout>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
