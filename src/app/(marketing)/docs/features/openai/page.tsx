import { FeatureGuideTemplate } from '@/components/docs';
import { Sparkles, Image, Mic, Code, Brain, Zap } from 'lucide-react';

export const metadata = {
  title: 'OpenAI - Fabrk Docs',
  description:
    'Integrate OpenAI GPT-4o, o1, DALL-E, and Whisper. The most popular AI provider with comprehensive capabilities.',
};

export default function OpenAIPage() {
  return (
    <FeatureGuideTemplate
      code="[0xA0]"
      category="AI Providers"
      title="OpenAI"
      description="GPT-4o, o1 reasoning, DALL-E, Whisper, and embeddings."
      overview="OpenAI is the most widely-used AI provider, offering state-of-the-art language models, image generation, speech recognition, and embeddings. Features include GPT-4o for fast multimodal responses, o1 for complex reasoning tasks, DALL-E 3 for image generation, Whisper for speech-to-text, text-to-speech with multiple voices, and embeddings for semantic search."
      features={[
        {
          icon: Brain,
          title: 'GPT-4o',
          description:
            'Fastest flagship model. Multimodal (text, image, audio). Best for most use cases.',
        },
        {
          icon: Sparkles,
          title: 'o1 Reasoning',
          description:
            'Advanced reasoning model. Best for math, coding, and complex logic problems.',
        },
        {
          icon: Image,
          title: 'DALL-E 3',
          description:
            'Generate images from text prompts. Multiple sizes and quality options.',
        },
        {
          icon: Mic,
          title: 'Whisper',
          description:
            'Speech-to-text transcription. Supports 50+ languages with high accuracy.',
        },
        {
          icon: Code,
          title: 'Function Calling',
          description:
            'Structured outputs and tool use. Connect AI to your APIs and databases.',
        },
        {
          icon: Zap,
          title: 'Streaming',
          description:
            'Real-time token streaming. Show responses as they generate.',
        },
      ]}
      setup={[
        {
          title: 'Create OpenAI Account',
          description:
            'Sign up at platform.openai.com. Add billing information to get API access.',
        },
        {
          title: 'Generate API Key',
          description:
            'Go to API Keys in the dashboard. Click "Create new secret key". Copy it immediately (won\'t be shown again).',
        },
        {
          title: 'Add Environment Variable',
          description: 'Add your OpenAI API key to .env.local',
          code: `# OpenAI API Key
OPENAI_API_KEY="sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx"

# Set OpenAI as your AI provider
AI_PROVIDER="openai"`,
          language: 'bash',
        },
        {
          title: 'Set Usage Limits (Recommended)',
          description:
            'In OpenAI dashboard, go to Settings → Limits. Set monthly spend limits to avoid unexpected charges.',
        },
      ]}
      usage={[
        {
          title: 'Basic Chat Completion',
          description: 'Send a message and get a response using the unified interface.',
          code: `import { chat } from '@/lib/ai';

const result = await chat({
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Explain quantum computing in simple terms.' },
  ],
});

console.log(result.content);
// "Quantum computing uses quantum bits (qubits)..."

console.log(result.usage);
// { promptTokens: 25, completionTokens: 150, totalTokens: 175 }`,
          language: 'typescript',
        },
        {
          title: 'With Custom Model and Parameters',
          description: 'Use specific models and control generation settings.',
          code: `import { chat } from '@/lib/ai';

const result = await chat({
  model: 'gpt-4o', // or 'o1-preview', 'gpt-4o-mini'
  messages: [
    { role: 'user', content: 'Write a haiku about programming.' },
  ],
  maxTokens: 100,
  temperature: 0.7, // Higher = more creative
});`,
          language: 'typescript',
        },
        {
          title: 'Direct Provider Usage',
          description: 'Use the OpenAI provider directly for more control.',
          code: `import { OpenAIProvider } from '@/lib/ai';

const openai = new OpenAIProvider();

// List available models
const models = await openai.listModels();
console.log(models); // ['gpt-4o', 'gpt-4o-mini', 'o1-preview', ...]

// Chat with specific settings
const result = await openai.chat({
  model: 'gpt-4o-mini',
  messages: [{ role: 'user', content: 'Hello!' }],
  temperature: 0.5,
});`,
          language: 'typescript',
        },
      ]}
    />
  );
}
