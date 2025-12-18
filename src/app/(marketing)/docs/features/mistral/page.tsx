import { FeatureGuideTemplate } from '@/components/docs';
import { Globe, Code, Shield, Zap, Brain, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Mistral AI - Fabrk Docs',
  description:
    'Integrate Mistral Large 2 and Codestral. European AI with excellent multilingual and coding capabilities.',
};

export default function MistralPage() {
  return (
    <FeatureGuideTemplate
      code="[0xA5]"
      category="AI Providers"
      title="Mistral AI"
      description="Large 2, Codestral - European AI with strong coding."
      overview="Mistral AI is a leading European AI company offering powerful, efficient models. Features include Mistral Large 2 for complex tasks, Codestral for code generation, excellent multilingual support (especially European languages), GDPR-compliant EU hosting option, and competitive pricing."
      features={[
        {
          icon: Brain,
          title: 'Mistral Large 2',
          description:
            'Flagship model with 128K context. Excellent reasoning and instruction following.',
        },
        {
          icon: Code,
          title: 'Codestral',
          description:
            'Specialized code model. Trained on 80+ programming languages.',
        },
        {
          icon: Globe,
          title: 'Multilingual',
          description:
            'Excellent support for European languages. French, German, Spanish, Italian, and more.',
        },
        {
          icon: Shield,
          title: 'EU Hosting',
          description:
            'GDPR-compliant option with EU data residency. Important for European customers.',
        },
        {
          icon: Zap,
          title: 'Fast & Efficient',
          description:
            'Optimized for speed. Mistral 7B runs locally, larger models via API.',
        },
        {
          icon: Sparkles,
          title: 'Function Calling',
          description:
            'Native tool use and JSON mode for structured outputs.',
        },
      ]}
      setup={[
        {
          title: 'Create Mistral Account',
          description:
            'Sign up at console.mistral.ai. Add billing information for API access.',
        },
        {
          title: 'Generate API Key',
          description:
            'Go to API Keys in the console. Create a new key and copy it.',
        },
        {
          title: 'Add Environment Variable',
          description: 'Add your Mistral API key to .env.local',
          code: `# Mistral API Key
MISTRAL_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxx"

# Set Mistral as your AI provider
AI_PROVIDER="mistral"`,
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
    { role: 'user', content: 'Explain machine learning in simple terms.' },
  ],
});

console.log(result.content);`,
          language: 'typescript',
        },
        {
          title: 'With Model Selection',
          description: 'Choose between Mistral models.',
          code: `import { chat } from '@/lib/ai';

// Use Large for complex tasks (default)
const result = await chat({
  model: 'mistral-large-latest',
  messages: [{ role: 'user', content: 'Analyze this business strategy...' }],
});

// Use Codestral for coding tasks
const codeResult = await chat({
  model: 'codestral-latest',
  messages: [{ role: 'user', content: 'Write a React hook for debouncing.' }],
});

// Use Small for simple tasks (cheaper)
const simpleResult = await chat({
  model: 'mistral-small-latest',
  messages: [{ role: 'user', content: 'Translate to French: Hello' }],
});`,
          language: 'typescript',
        },
        {
          title: 'Direct Provider Usage',
          description: 'Use the Mistral provider directly.',
          code: `import { MistralProvider } from '@/lib/ai';

const mistral = new MistralProvider();

const result = await mistral.chat({
  model: 'mistral-large-latest',
  messages: [
    { role: 'user', content: 'Écrivez un poème sur la technologie.' },
  ],
  temperature: 0.8,
});

console.log(result.usage);
// { promptTokens: 15, completionTokens: 100, totalTokens: 115 }`,
          language: 'typescript',
        },
      ]}
    />
  );
}
