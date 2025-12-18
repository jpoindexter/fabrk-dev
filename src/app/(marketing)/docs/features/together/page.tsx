import { FeatureGuideTemplate } from '@/components/docs';
import { Globe, DollarSign, Layers, Zap, Code, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Together AI - Fabrk Docs',
  description:
    'Integrate Together AI. Run 100+ open-source models with serverless inference and fine-tuning.',
};

export default function TogetherPage() {
  return (
    <FeatureGuideTemplate
      code="[0xA7]"
      category="AI Providers"
      title="Together AI"
      description="100+ open models - Serverless inference and fine-tuning."
      overview="Together AI provides access to 100+ open-source models with serverless inference and fine-tuning capabilities. Features include Llama, Mistral, Qwen, and many more models, pay-per-token pricing, custom fine-tuning, OpenAI-compatible API, and dedicated deployments available."
      features={[
        {
          icon: Globe,
          title: '100+ Models',
          description:
            'Access Llama, Mistral, Qwen, DeepSeek, Gemma, and many more open models.',
        },
        {
          icon: DollarSign,
          title: 'Pay Per Token',
          description:
            'Serverless pricing. Only pay for what you use, no minimum commitment.',
        },
        {
          icon: Layers,
          title: 'Fine-Tuning',
          description:
            'Train custom models on your data. LoRA and full fine-tuning available.',
        },
        {
          icon: Zap,
          title: 'Fast Inference',
          description:
            'Optimized infrastructure for low latency. Flash Attention and other optimizations.',
        },
        {
          icon: Code,
          title: 'OpenAI Compatible',
          description:
            'Drop-in replacement for OpenAI API. Easy migration from other providers.',
        },
        {
          icon: Sparkles,
          title: 'Dedicated GPUs',
          description:
            'Option to deploy on dedicated infrastructure for consistent performance.',
        },
      ]}
      setup={[
        {
          title: 'Create Together Account',
          description:
            'Sign up at api.together.xyz. Free credits available for new accounts.',
        },
        {
          title: 'Generate API Key',
          description:
            'Go to Settings → API Keys. Create a new key and copy it.',
        },
        {
          title: 'Add Environment Variable',
          description: 'Add your Together API key to .env.local',
          code: `# Together AI API Key
TOGETHER_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Set Together as your AI provider
AI_PROVIDER="together"`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Basic Chat Completion',
          description: 'Send a message and get a response.',
          code: `import { chat } from '@/lib/ai';

const result = await chat({
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'What is the meaning of life?' },
  ],
});

console.log(result.content);`,
          language: 'typescript',
        },
        {
          title: 'With Model Selection',
          description: 'Choose from 100+ available models.',
          code: `import { chat } from '@/lib/ai';

// Llama 3.1 70B Instruct (default)
const llamaResult = await chat({
  model: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
  messages: [{ role: 'user', content: 'Explain recursion.' }],
});

// Qwen 2.5 72B
const qwenResult = await chat({
  model: 'Qwen/Qwen2.5-72B-Instruct-Turbo',
  messages: [{ role: 'user', content: 'Write a poem.' }],
});

// Mixtral 8x22B
const mixtralResult = await chat({
  model: 'mistralai/Mixtral-8x22B-Instruct-v0.1',
  messages: [{ role: 'user', content: 'Analyze this code...' }],
});`,
          language: 'typescript',
        },
        {
          title: 'List Available Models',
          description: 'Get a list of all available chat models.',
          code: `import { TogetherProvider } from '@/lib/ai';

const together = new TogetherProvider();

// List all chat models
const models = await together.listModels();
console.log(models);
// ['meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo', ...]

// Use a specific model
const result = await together.chat({
  model: models[0],
  messages: [{ role: 'user', content: 'Hello!' }],
});`,
          language: 'typescript',
        },
      ]}
    />
  );
}
