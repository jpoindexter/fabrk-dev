import { FeatureGuideTemplate } from '@/components/docs';
import { Search, Zap, Globe, Sparkles, BarChart3, Code } from 'lucide-react';

export const metadata = {
  title: 'Algolia Search - Fabrk Docs',
  description:
    'Integrate Algolia for instant, typo-tolerant search. The fastest search experience for your application.',
};

export default function AlgoliaPage() {
  return (
    <FeatureGuideTemplate
      code="[0xS0]"
      category="Search Providers"
      title="Algolia"
      description="Instant, typo-tolerant search - The gold standard."
      overview="Algolia is the industry standard for search experiences, powering search for companies like Stripe, Twitch, and Medium. Features include sub-50ms search responses, typo tolerance and synonyms, faceted filtering, personalization and A/B testing, InstantSearch UI components, and analytics and click tracking."
      features={[
        {
          icon: Zap,
          title: 'Lightning Fast',
          description:
            'Sub-50ms search responses globally. Users see results as they type.',
        },
        {
          icon: Sparkles,
          title: 'Typo Tolerance',
          description:
            'Automatically handles misspellings. Users find what they want despite typos.',
        },
        {
          icon: Search,
          title: 'Faceted Search',
          description:
            'Filter by category, price, date, or any attribute. Build powerful filtering UIs.',
        },
        {
          icon: Globe,
          title: 'Global CDN',
          description:
            '70+ data centers worldwide. Fast search regardless of user location.',
        },
        {
          icon: BarChart3,
          title: 'Analytics',
          description:
            'Track searches, clicks, and conversions. Understand user behavior.',
        },
        {
          icon: Code,
          title: 'InstantSearch',
          description:
            'Pre-built UI components for React, Vue, Angular. Build search UIs quickly.',
        },
      ]}
      setup={[
        {
          title: 'Create Algolia Account',
          description:
            'Sign up at algolia.com. Free tier includes 10,000 search requests/month.',
        },
        {
          title: 'Create an Index',
          description:
            'In the Algolia dashboard, go to Indices and create a new index. Name it something like "products" or "articles".',
        },
        {
          title: 'Get API Keys',
          description:
            'Go to Settings → API Keys. Copy your Application ID and Admin API Key (for indexing) or Search-Only API Key (for frontend).',
        },
        {
          title: 'Add Environment Variables',
          description: 'Add your Algolia credentials to .env.local',
          code: `# Algolia Credentials
ALGOLIA_APP_ID="XXXXXXXXXX"
ALGOLIA_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Set Algolia as your search provider
SEARCH_PROVIDER="algolia"`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Search Documents',
          description: 'Search your indexed data.',
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
// 3 (milliseconds!)`,
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
    category: 'electronics',
    inStock: true,
  },
  limit: 10,
});`,
          language: 'typescript',
        },
        {
          title: 'Index Documents',
          description: 'Add or update documents in your index.',
          code: `import { AlgoliaProvider } from '@/lib/search';

const algolia = new AlgoliaProvider();

// Index new products
await algolia.index('products', [
  {
    objectID: 'prod_123', // Required: unique ID
    name: 'Wireless Mouse',
    price: 49.99,
    category: 'electronics',
  },
  {
    objectID: 'prod_124',
    name: 'Mechanical Keyboard',
    price: 149.99,
    category: 'electronics',
  },
]);

// Delete documents
await algolia.delete('products', ['prod_123', 'prod_124']);`,
          language: 'typescript',
        },
      ]}
    />
  );
}
