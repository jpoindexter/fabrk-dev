import { FeatureGuideTemplate } from '@/components/docs';
import { Search, Zap, DollarSign, Code, Shield, Globe } from 'lucide-react';

export const metadata = {
  title: 'Fuse.js - Fabrk Docs',
  description:
    'Integrate Fuse.js for client-side fuzzy search. No API needed, perfect for small datasets.',
};

export default function FusePage() {
  return (
    <FeatureGuideTemplate
      code="[0xS4]"
      category="Search Providers"
      title="Fuse.js"
      description="Client-side fuzzy search - No API needed."
      overview="Fuse.js is a lightweight, client-side fuzzy search library. Perfect for searching small to medium datasets without requiring a backend. Features include fuzzy matching with configurable threshold, weighted search on multiple keys, no API or server needed, works offline, and tiny bundle size (~4KB gzipped)."
      features={[
        {
          icon: DollarSign,
          title: 'Zero Cost',
          description:
            'No API calls, no server costs. Runs entirely in the browser or Node.js.',
        },
        {
          icon: Zap,
          title: 'Instant Results',
          description:
            'No network latency. Searches happen immediately in-memory.',
        },
        {
          icon: Search,
          title: 'Fuzzy Matching',
          description:
            'Find approximate matches. Handles typos and partial matches.',
        },
        {
          icon: Code,
          title: 'Lightweight',
          description:
            '~4KB gzipped. No heavy dependencies. Works everywhere.',
        },
        {
          icon: Shield,
          title: 'Privacy First',
          description:
            'Data stays local. No data sent to external servers.',
        },
        {
          icon: Globe,
          title: 'Works Offline',
          description:
            'Perfect for PWAs and offline-first applications.',
        },
      ]}
      setup={[
        {
          title: 'No Setup Required!',
          description:
            'Fuse.js works without any API keys or external services. Just configure it as your search provider.',
        },
        {
          title: 'Add Environment Variable',
          description: 'Set Fuse as your search provider in .env.local',
          code: `# Set Fuse.js as your search provider
SEARCH_PROVIDER="fuse"

# No API keys needed!`,
          language: 'bash',
        },
        {
          title: 'Load Your Data',
          description:
            'For Fuse.js to work, you need to index your data first. This is typically done on app startup or when data changes.',
        },
      ]}
      usage={[
        {
          title: 'Index Data First',
          description: 'Load your data into the Fuse provider.',
          code: `import { FuseProvider } from '@/lib/search';

const fuse = new FuseProvider();

// Load your data (typically from database or API)
const products = [
  { id: '1', name: 'Wireless Mouse', category: 'electronics', price: 29.99 },
  { id: '2', name: 'Mechanical Keyboard', category: 'electronics', price: 149.99 },
  { id: '3', name: 'USB-C Hub', category: 'accessories', price: 49.99 },
  // ... more products
];

// Index the data
await fuse.index('products', products);`,
          language: 'typescript',
        },
        {
          title: 'Search Documents',
          description: 'Search your indexed data.',
          code: `import { search } from '@/lib/search';

const results = await search({
  index: 'products',
  query: 'wireles mous', // Note: typos are handled!
  limit: 10,
});

console.log(results.hits);
// [{ id: '1', name: 'Wireless Mouse', ... }]

console.log(results.processingTimeMs);
// 1 (instant!)`,
          language: 'typescript',
        },
        {
          title: 'Search with Filters',
          description: 'Filter results by attributes.',
          code: `import { search } from '@/lib/search';

const results = await search({
  index: 'products',
  query: 'keyboard',
  filters: {
    category: 'electronics',
  },
});`,
          language: 'typescript',
        },
        {
          title: 'Best Practices',
          description: 'When to use Fuse.js vs other providers.',
          code: `// USE Fuse.js when:
// - Dataset is small (< 10,000 items)
// - Data changes infrequently
// - You need offline support
// - You want zero infrastructure costs
// - Privacy is critical

// DON'T USE Fuse.js when:
// - Dataset is large (> 10,000 items)
// - You need real-time sync across users
// - You need advanced features (facets, analytics)
// - Response time is critical for large datasets`,
          language: 'typescript',
        },
      ]}
    />
  );
}
