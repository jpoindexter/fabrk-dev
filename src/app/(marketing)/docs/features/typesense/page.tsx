import { FeatureGuideTemplate } from '@/components/docs';
import { Search, Server, Zap, Shield, Globe, Code } from 'lucide-react';

export const metadata = {
  title: 'Typesense - Fabrk Docs',
  description:
    'Integrate Typesense for fast, typo-tolerant search. Open source Algolia alternative with excellent developer experience.',
};

export default function TypesensePage() {
  return (
    <FeatureGuideTemplate
      code="[0xS2]"
      category="Search Providers"
      title="Typesense"
      description="Open source Algolia alternative - Developer-friendly and fast."
      overview="Typesense is an open-source search engine designed to be an Algolia alternative. It's known for excellent developer experience and performance. Features include sub-50ms search, typo tolerance and synonyms, faceted filtering, geo search, self-hosting or cloud, and schema-based indexing."
      features={[
        {
          icon: Zap,
          title: 'Blazing Fast',
          description:
            'Written in C++. Sub-50ms responses with excellent memory efficiency.',
        },
        {
          icon: Server,
          title: 'Self-Hostable',
          description:
            'Run on your own infrastructure. Single binary, easy to deploy.',
        },
        {
          icon: Shield,
          title: 'Schema-Based',
          description:
            'Define field types for better search quality. Automatic type detection available.',
        },
        {
          icon: Search,
          title: 'Typo Tolerance',
          description:
            'Handles misspellings with configurable tolerance levels.',
        },
        {
          icon: Globe,
          title: 'Geo Search',
          description:
            'Built-in support for location-based search and filtering.',
        },
        {
          icon: Code,
          title: 'InstantSearch',
          description:
            'Compatible with Algolia InstantSearch adapters for React, Vue, etc.',
        },
      ]}
      setup={[
        {
          title: 'Option A: Use Typesense Cloud',
          description:
            'Sign up at cloud.typesense.org for managed hosting.',
        },
        {
          title: 'Option B: Self-Host with Docker',
          description:
            'Run Typesense on your own server.',
          code: `# Run Typesense with Docker
docker run -d \\
  -p 8108:8108 \\
  -v typesense-data:/data \\
  typesense/typesense:latest \\
  --data-dir /data \\
  --api-key=YOUR_API_KEY

# Create a collection (index)
curl "http://localhost:8108/collections" \\
  -X POST \\
  -H "X-TYPESENSE-API-KEY: YOUR_API_KEY" \\
  -d '{
    "name": "products",
    "fields": [
      {"name": "name", "type": "string"},
      {"name": "price", "type": "float"},
      {"name": "category", "type": "string", "facet": true}
    ]
  }'`,
          language: 'bash',
        },
        {
          title: 'Add Environment Variables',
          description: 'Add your Typesense credentials to .env.local',
          code: `# Typesense Configuration
TYPESENSE_HOST="http://localhost:8108"  # Or your cloud URL
TYPESENSE_API_KEY="YOUR_API_KEY"

# Set Typesense as your search provider
SEARCH_PROVIDER="typesense"`,
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
  query: 'laptop',
  limit: 20,
});

console.log(results.hits);
// [{ name: 'MacBook Pro', price: 1999, ... }, ...]

console.log(results.processingTimeMs);
// 2 (very fast!)`,
          language: 'typescript',
        },
        {
          title: 'Search with Filters',
          description: 'Filter results using Typesense syntax.',
          code: `import { search } from '@/lib/search';

const results = await search({
  index: 'products',
  query: 'headphones',
  filters: {
    category: 'audio',
  },
});`,
          language: 'typescript',
        },
        {
          title: 'Index Documents',
          description: 'Add documents to your collection.',
          code: `import { TypesenseProvider } from '@/lib/search';

const typesense = new TypesenseProvider();

// Index products (must have 'id' field)
await typesense.index('products', [
  {
    id: 'prod_1',
    name: 'Wireless Earbuds',
    price: 79.99,
    category: 'audio',
  },
  {
    id: 'prod_2',
    name: 'Bluetooth Speaker',
    price: 129.99,
    category: 'audio',
  },
]);

// Delete products
await typesense.delete('products', ['prod_1']);`,
          language: 'typescript',
        },
      ]}
    />
  );
}
