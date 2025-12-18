import { FeatureGuideTemplate } from '@/components/docs';
import { Search, Server, Database, Shield, Globe, BarChart3 } from 'lucide-react';

export const metadata = {
  title: 'Elasticsearch - Fabrk Docs',
  description:
    'Integrate Elasticsearch for full-text search. Enterprise-grade search and analytics engine.',
};

export default function ElasticsearchPage() {
  return (
    <FeatureGuideTemplate
      code="[0xS3]"
      category="Search Providers"
      title="Elasticsearch"
      description="Enterprise search - Full-text search and analytics."
      overview="Elasticsearch is the industry standard for enterprise search and log analytics. It powers search for Wikipedia, GitHub, and Netflix. Features include powerful full-text search, aggregations and analytics, horizontal scaling, self-hosting or Elastic Cloud, and extensive query DSL."
      features={[
        {
          icon: Search,
          title: 'Full-Text Search',
          description:
            'Advanced text analysis, stemming, and relevance scoring. Best-in-class search quality.',
        },
        {
          icon: Database,
          title: 'Aggregations',
          description:
            'Build analytics dashboards. Sum, average, histogram, and more.',
        },
        {
          icon: Server,
          title: 'Horizontal Scaling',
          description:
            'Scale to petabytes of data. Distributed architecture for high availability.',
        },
        {
          icon: Shield,
          title: 'Enterprise Security',
          description:
            'Role-based access, encryption, audit logging. Meet compliance requirements.',
        },
        {
          icon: Globe,
          title: 'Elastic Cloud',
          description:
            'Managed hosting on AWS, GCP, or Azure. No ops required.',
        },
        {
          icon: BarChart3,
          title: 'Kibana',
          description:
            'Visualization and dashboard tool included. Explore and analyze data.',
        },
      ]}
      setup={[
        {
          title: 'Option A: Use Elastic Cloud',
          description:
            'Sign up at cloud.elastic.co for managed Elasticsearch. Easiest for production.',
        },
        {
          title: 'Option B: Self-Host with Docker',
          description:
            'Run Elasticsearch locally for development.',
          code: `# Run Elasticsearch with Docker
docker run -d \\
  --name elasticsearch \\
  -p 9200:9200 \\
  -e "discovery.type=single-node" \\
  -e "xpack.security.enabled=false" \\
  docker.elastic.co/elasticsearch/elasticsearch:8.11.0

# Verify it's running
curl http://localhost:9200`,
          language: 'bash',
        },
        {
          title: 'Add Environment Variable',
          description: 'Add your Elasticsearch URL to .env.local',
          code: `# Elasticsearch URL (with auth if needed)
ELASTICSEARCH_URL="http://localhost:9200"

# For Elastic Cloud with auth:
# ELASTICSEARCH_URL="https://user:pass@your-cluster.es.cloud.es.io:9243"

# Set Elasticsearch as your search provider
SEARCH_PROVIDER="elasticsearch"`,
          language: 'bash',
        },
        {
          title: 'Create an Index',
          description:
            'Create an index with mappings for your data.',
          code: `# Create index with mappings
curl -X PUT "localhost:9200/products" \\
  -H "Content-Type: application/json" \\
  -d '{
    "mappings": {
      "properties": {
        "name": { "type": "text" },
        "description": { "type": "text" },
        "price": { "type": "float" },
        "category": { "type": "keyword" }
      }
    }
  }'`,
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
  query: 'wireless bluetooth',
  limit: 20,
});

console.log(results.hits);
// [{ name: 'Wireless Bluetooth Speaker', ... }, ...]

console.log(results.total);
// 127`,
          language: 'typescript',
        },
        {
          title: 'Search with Filters',
          description: 'Filter results using term queries.',
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
          description: 'Bulk index documents.',
          code: `import { ElasticsearchProvider } from '@/lib/search';

const es = new ElasticsearchProvider();

// Bulk index products
await es.index('products', [
  {
    id: 'prod_1',
    name: 'Noise Cancelling Headphones',
    price: 299.99,
    category: 'audio',
  },
  {
    id: 'prod_2',
    name: 'Gaming Headset',
    price: 149.99,
    category: 'audio',
  },
]);

// Delete products
await es.delete('products', ['prod_1', 'prod_2']);`,
          language: 'typescript',
        },
      ]}
    />
  );
}
