import { FeatureGuideTemplate } from '@/components/docs';
import { Server, Shield, DollarSign, Zap, Globe, Code } from 'lucide-react';

export const metadata = {
  title: 'Ollama - Fabrk Docs',
  description:
    'Integrate Ollama for local AI. Run Llama, Mistral, and other models on your own hardware with complete privacy.',
};

export default function OllamaPage() {
  return (
    <FeatureGuideTemplate
      code="[0xA8]"
      category="AI Providers"
      title="Ollama"
      description="Local AI - Run models on your own hardware."
      overview="Ollama makes it easy to run AI models locally on your own hardware. Features include complete data privacy (nothing leaves your machine), zero API costs, Llama 3.2, Mistral, Gemma, and many more models, simple CLI and API, and works offline. Perfect for development, testing, and privacy-sensitive applications."
      features={[
        {
          icon: Shield,
          title: 'Complete Privacy',
          description:
            'Data never leaves your machine. Perfect for sensitive applications and HIPAA/GDPR compliance.',
        },
        {
          icon: DollarSign,
          title: 'Zero API Costs',
          description:
            'No per-token charges. Run unlimited inference once models are downloaded.',
        },
        {
          icon: Server,
          title: 'Local Inference',
          description:
            'Run on Mac, Linux, or Windows. Works with CPU or GPU acceleration.',
        },
        {
          icon: Globe,
          title: '100+ Models',
          description:
            'Llama 3.2, Mistral, Gemma, Phi, Qwen, and many more. One command to download.',
        },
        {
          icon: Zap,
          title: 'Works Offline',
          description:
            'No internet required after downloading models. Perfect for air-gapped environments.',
        },
        {
          icon: Code,
          title: 'Simple API',
          description:
            'RESTful API compatible with our unified interface. Easy to integrate.',
        },
      ]}
      setup={[
        {
          title: 'Install Ollama',
          description:
            'Download from ollama.ai or install via package manager.',
          code: `# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.ai/install.sh | sh

# Windows
# Download installer from ollama.ai`,
          language: 'bash',
        },
        {
          title: 'Start Ollama Server',
          description:
            'Run the Ollama server (runs on port 11434 by default).',
          code: `ollama serve

# Or it may start automatically on install`,
          language: 'bash',
        },
        {
          title: 'Pull a Model',
          description:
            'Download a model to use. Llama 3.2 is a great starting point.',
          code: `# Pull Llama 3.2 (2GB)
ollama pull llama3.2

# Or pull larger models for better quality
ollama pull llama3.2:70b  # 40GB, requires good GPU

# Pull coding model
ollama pull codellama

# Pull Mistral
ollama pull mistral`,
          language: 'bash',
        },
        {
          title: 'Add Environment Variable',
          description: 'Configure the Ollama URL (optional if using defaults).',
          code: `# Ollama URL (default: http://localhost:11434)
OLLAMA_BASE_URL="http://localhost:11434"

# Set Ollama as your AI provider
AI_PROVIDER="ollama"`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Basic Chat Completion',
          description: 'Send a message to your local model.',
          code: `import { chat } from '@/lib/ai';

const result = await chat({
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Explain how transformers work in AI.' },
  ],
});

console.log(result.content);
// Response generated locally, no API calls!`,
          language: 'typescript',
        },
        {
          title: 'With Model Selection',
          description: 'Use different models for different tasks.',
          code: `import { chat } from '@/lib/ai';

// Use Llama 3.2 for general tasks (default)
const result = await chat({
  model: 'llama3.2',
  messages: [{ role: 'user', content: 'Write a haiku.' }],
});

// Use CodeLlama for coding
const codeResult = await chat({
  model: 'codellama',
  messages: [{ role: 'user', content: 'Write a Python quicksort.' }],
});

// Use Mistral for reasoning
const reasonResult = await chat({
  model: 'mistral',
  messages: [{ role: 'user', content: 'Solve this logic puzzle...' }],
});`,
          language: 'typescript',
        },
        {
          title: 'List Local Models',
          description: 'See which models are available locally.',
          code: `import { OllamaProvider } from '@/lib/ai';

const ollama = new OllamaProvider();

// List downloaded models
const models = await ollama.listModels();
console.log(models);
// ['llama3.2', 'codellama', 'mistral']

// Use a specific model
const result = await ollama.chat({
  model: 'llama3.2',
  messages: [{ role: 'user', content: 'Hello!' }],
  temperature: 0.7,
});

console.log(result.usage);
// { promptTokens: 5, completionTokens: 50, totalTokens: 55 }`,
          language: 'typescript',
        },
      ]}
    />
  );
}
