import { FeatureGuideTemplate } from '@/components/docs';
import { Zap, Cpu, DollarSign, Code, Globe, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Groq - Fabrk Docs',
  description:
    'Integrate Groq LPU inference. Fastest AI inference with Llama, Mixtral, and Gemma models.',
};

export default function GroqPage() {
  return (
    <FeatureGuideTemplate
      code="[0xA6]"
      category="AI Providers"
      title="Groq"
      description="LPU Inference - Fastest AI with open models."
      overview="Groq builds custom LPU (Language Processing Unit) hardware that delivers the fastest AI inference available. Features include 10x faster than GPU inference, Llama 3.3 70B and Mixtral models, generous free tier, OpenAI-compatible API, and real-time streaming responses."
      features={[
        {
          icon: Zap,
          title: 'Fastest Inference',
          description:
            '500+ tokens/second. 10x faster than GPU-based inference. Near-instant responses.',
        },
        {
          icon: Cpu,
          title: 'LPU Technology',
          description:
            'Custom Language Processing Units designed specifically for AI inference.',
        },
        {
          icon: Globe,
          title: 'Open Models',
          description:
            'Run Llama 3.3 70B, Mixtral, Gemma. Best open-source models at incredible speed.',
        },
        {
          icon: DollarSign,
          title: 'Generous Free Tier',
          description:
            '6,000 tokens/minute free. Perfect for development and moderate production use.',
        },
        {
          icon: Code,
          title: 'OpenAI Compatible',
          description:
            'Drop-in replacement for OpenAI API. Switch with one line change.',
        },
        {
          icon: Sparkles,
          title: 'Real-Time Apps',
          description:
            'Fast enough for real-time chat, voice assistants, and interactive applications.',
        },
      ]}
      setup={[
        {
          title: 'Create Groq Account',
          description:
            'Sign up at console.groq.com. Free tier available immediately, no credit card required.',
        },
        {
          title: 'Generate API Key',
          description:
            'Go to API Keys in the console. Create a new key and copy it.',
        },
        {
          title: 'Add Environment Variable',
          description: 'Add your Groq API key to .env.local',
          code: `# Groq API Key
GROQ_API_KEY="gsk_xxxxxxxxxxxxxxxxxxxxxxxx"

# Set Groq as your AI provider
AI_PROVIDER="groq"`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Basic Chat Completion',
          description: 'Send a message and get an incredibly fast response.',
          code: `import { chat } from '@/lib/ai';

const start = Date.now();

const result = await chat({
  messages: [
    { role: 'user', content: 'Explain quantum computing.' },
  ],
});

console.log(\`Response in \${Date.now() - start}ms\`);
// "Response in 150ms" - incredibly fast!

console.log(result.content);`,
          language: 'typescript',
        },
        {
          title: 'With Model Selection',
          description: 'Choose between available models.',
          code: `import { chat } from '@/lib/ai';

// Llama 3.3 70B - Best quality (default)
const result = await chat({
  model: 'llama-3.3-70b-versatile',
  messages: [{ role: 'user', content: 'Write a poem.' }],
});

// Llama 3.2 90B Vision - Multimodal
const visionResult = await chat({
  model: 'llama-3.2-90b-vision-preview',
  messages: [{ role: 'user', content: 'Describe this image...' }],
});

// Mixtral 8x7B - Fast and capable
const mixtralResult = await chat({
  model: 'mixtral-8x7b-32768',
  messages: [{ role: 'user', content: 'Quick question.' }],
});`,
          language: 'typescript',
        },
        {
          title: 'Direct Provider Usage',
          description: 'Use the Groq provider directly.',
          code: `import { GroqProvider } from '@/lib/ai';

const groq = new GroqProvider();

const result = await groq.chat({
  model: 'llama-3.3-70b-versatile',
  messages: [
    { role: 'system', content: 'You are a helpful coding assistant.' },
    { role: 'user', content: 'Write a TypeScript function to sort an array.' },
  ],
  temperature: 0.2,
  maxTokens: 500,
});

console.log(result.usage);
// { promptTokens: 30, completionTokens: 200, totalTokens: 230 }`,
          language: 'typescript',
        },
      ]}
    />
  );
}
