import { FeatureGuideTemplate } from '@/components/docs';
import { Search, Server, DollarSign, Zap, Code, Globe } from 'lucide-react';

export const metadata = {
  title: 'Meilisearch - Fabrk Docs',
  description:
    'Integrate Meilisearch for fast, typo-tolerant search. Open source and self-hostable Algolia alternative.',
};

export default function MeilisearchPage() {
  return (
    <FeatureGuideTemplate
      code="[0xS1]"
      category="Search Providers"
      title="Meilisearch"
      description="Open source Algolia alternative - Fast and self-hostable."
      overview="Meilisearch is an open-source search engine that's easy to use and self-host. It provides Algolia-like features at a fraction of the cost. Features include sub-50ms search responses, typo tolerance built-in, faceted filtering, easy self-hosting with Docker, cloud hosting available, and RESTful API with SDKs."
      features={[
        {
          icon: Server,
          title: 'Self-Hostable',
          description:
            'Run on your own infrastructure. Full control over your data and costs.',
        },
        {
          icon: DollarSign,
          title: 'Cost Effective',
          description:
            'Free to self-host. Cloud pricing starts much lower than Algolia.',
        },
        {
          icon: Zap,
          title: 'Fast Search',
          description:
            'Sub-50ms responses. Rust-powered for maximum performance.',
        },
        {
          icon: Search,
          title: 'Typo Tolerance',
          description:
            'Handles misspellings automatically. Great search UX out of the box.',
        },
        {
          icon: Globe,
          title: 'Cloud Option',
          description:
            'Meilisearch Cloud for managed hosting. No DevOps required.',
        },
        {
          icon: Code,
          title: 'Simple API',
          description:
            'RESTful API that\'s easy to understand. SDKs for all major languages.',
        },
      ]}
      setup={[
        {
          title: 'Option A: Use Meilisearch Cloud',
          description:
            'Sign up at cloud.meilisearch.com. Easiest way to get started.',
        },
        {
          title: 'Option B: Self-Host with Docker',
          description:
            'Run Meilisearch locally or on your server.',
          code: `# Run Meilisearch with Docker
docker run -d \\
  -p 7700:7700 \\
  -v meili_data:/meili_data \\
  getmeili/meilisearch:latest \\
  meilisearch --master-key="YOUR_MASTER_KEY"

# Or without Docker (Mac)
brew install meilisearch
meilisearch --master-key="YOUR_MASTER_KEY"`,
          language: 'bash',
        },
        {
          title: 'Add Environment Variables',
          description: 'Add your Meilisearch credentials to .env.local',
          code: `# Meilisearch Configuration
MEILISEARCH_HOST="http://localhost:7700"  # Or your cloud URL
MEILISEARCH_API_KEY="YOUR_MASTER_KEY"

# Set Meilisearch as your search provider
SEARCH_PROVIDER="meilisearch"`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Search Documents',
          description: 'Search your indexed data.',
          code: `import { search } from '@/lib/search';

const results = await search({
  index: 'movies',
  query: 'science fiction',
  limit: 20,
});

console.log(results.hits);
// [{ title: 'Interstellar', genre: 'sci-fi', ... }, ...]

console.log(results.total);
// 156`,
          language: 'typescript',
        },
        {
          title: 'Search with Filters',
          description: 'Filter results by attributes.',
          code: `import { search } from '@/lib/search';

const results = await search({
  index: 'movies',
  query: 'action',
  filters: {
    year: 2024,
    rating: 'PG-13',
  },
});`,
          language: 'typescript',
        },
        {
          title: 'Index Documents',
          description: 'Add or update documents in your index.',
          code: `import { MeilisearchProvider } from '@/lib/search';

const meili = new MeilisearchProvider();

// Index movies
await meili.index('movies', [
  {
    id: 'movie_1',
    title: 'The Matrix',
    genre: 'sci-fi',
    year: 1999,
  },
  {
    id: 'movie_2',
    title: 'Inception',
    genre: 'sci-fi',
    year: 2010,
  },
]);

// Delete movies
await meili.delete('movies', ['movie_1']);`,
          language: 'typescript',
        },
      ]}
    />
  );
}
