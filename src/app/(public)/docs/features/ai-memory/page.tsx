import { FeatureGuideTemplate } from '@/components/docs';
import { Database, Brain, Search, Shield, Layers, Zap } from 'lucide-react';

export const metadata = {
  title: 'AI Memory (RAG) - Fabrk Docs',
  description:
    'Multi-scope vector memory with Qdrant support. Store and retrieve contextual memories for AI conversations.',
};

export default function AIMemoryPage() {
  return (
    <FeatureGuideTemplate
      code="[0x60]"
      category="Features"
      title="AI Memory"
      description="Multi-scope vector memory for contextual AI conversations."
      overview="The AI Memory system provides persistent, semantic memory for your AI features. Memories are stored with vector embeddings and retrieved via similarity search. Supports multiple scopes (chat, project, user) so context stays relevant. Uses Qdrant for production and an in-memory fallback for development — gracefully degrades when services are unavailable."
      features={[
        {
          icon: Brain,
          title: 'Semantic Search',
          description:
            'Find relevant memories by meaning, not just keywords. Uses vector embeddings for similarity matching.',
        },
        {
          icon: Layers,
          title: 'Multi-Scope Storage',
          description:
            'Store memories at chat, project, or user scope. Each scope is isolated for relevance.',
        },
        {
          icon: Database,
          title: 'Qdrant Vector Store',
          description:
            'Production-ready Qdrant integration via HTTP API. No SDK dependency required.',
        },
        {
          icon: Shield,
          title: 'Graceful Degradation',
          description:
            'Falls back to in-memory store when Qdrant is unavailable. AI features keep working.',
        },
        {
          icon: Search,
          title: 'Memory API',
          description:
            'REST API for adding, searching, and deleting memories. Auth-protected with session validation.',
        },
        {
          icon: Zap,
          title: 'Auto-Embeddings',
          description:
            'Embeddings generated automatically using the configured AI provider. Supports OpenAI and Google models.',
        },
      ]}
      setup={[
        {
          title: 'Enable Vector Database',
          description:
            'Set SERVICE_VECTOR_DB=true in your environment to use Qdrant for production memory storage.',
          code: `# .env.local
SERVICE_VECTOR_DB=true
FEATURE_MEMORY=true

# Qdrant settings (defaults shown)
QDRANT_HOST=localhost
QDRANT_PORT=6333
QDRANT_COLLECTION=fabrk_memories`,
          language: 'bash',
        },
        {
          title: 'Start Qdrant (Docker)',
          description:
            'Run Qdrant locally via Docker, or uncomment the qdrant service in docker-compose.yml.',
          code: `docker run -p 6333:6333 qdrant/qdrant`,
          language: 'bash',
        },
        {
          title: 'Use the Memory API',
          description:
            'Add and search memories via the REST API or directly in server code.',
          code: `// Server-side usage
import { addMemory, searchMemory } from '@/lib/ai/memory';

// Store a memory
await addMemory('User prefers dark mode', 'user', userId);

// Search memories
const results = await searchMemory(
  'theme preferences',
  'user',
  userId,
  5 // limit
);

// REST API
// POST /api/ai/memory { content, scope, scopeId }
// GET  /api/ai/memory?query=...&scope=user&scopeId=...
// DELETE /api/ai/memory { ids: [...] }`,
          language: 'typescript',
        },
      ]}
    />
  );
}
