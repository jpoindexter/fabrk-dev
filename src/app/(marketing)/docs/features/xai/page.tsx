import { FeatureGuideTemplate } from '@/components/docs';
import { Brain, Globe, Zap, MessageSquare, Code, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'xAI Grok - Fabrk Docs',
  description:
    'Integrate xAI Grok 2. Real-time knowledge, witty responses, and X/Twitter integration.',
};

export default function XAIPage() {
  return (
    <FeatureGuideTemplate
      code="[0xA3]"
      category="AI Providers"
      title="xAI Grok"
      description="Grok 2 - Real-time knowledge with personality."
      overview="xAI's Grok models are designed to be maximally helpful with a touch of wit. Features include Grok 2 with real-time knowledge from X, willingness to answer spicy questions, excellent reasoning capabilities, and OpenAI-compatible API format for easy integration."
      features={[
        {
          icon: Globe,
          title: 'Real-Time Knowledge',
          description:
            'Access to real-time information from X (Twitter). Always up-to-date on current events.',
        },
        {
          icon: Brain,
          title: 'Grok 2',
          description:
            'Latest model with improved reasoning, coding, and instruction following.',
        },
        {
          icon: MessageSquare,
          title: 'Personality',
          description:
            'Witty, direct responses. Willing to tackle questions other AIs avoid.',
        },
        {
          icon: Code,
          title: 'OpenAI Compatible',
          description:
            'Uses OpenAI-compatible API format. Easy to switch from GPT models.',
        },
        {
          icon: Zap,
          title: 'Fast Inference',
          description:
            'Optimized for speed. Quick responses for real-time applications.',
        },
        {
          icon: Sparkles,
          title: 'X Integration',
          description:
            'Native integration with X platform. Analyze tweets, trends, and social data.',
        },
      ]}
      setup={[
        {
          title: 'Get API Access',
          description:
            'Go to console.x.ai. Sign in with your X account and request API access.',
        },
        {
          title: 'Generate API Key',
          description:
            'Once approved, create an API key in the xAI console.',
        },
        {
          title: 'Add Environment Variable',
          description: 'Add your xAI API key to .env.local',
          code: `# xAI API Key
XAI_API_KEY="xai-xxxxxxxxxxxxxxxxxxxxxxxx"

# Set xAI as your AI provider
AI_PROVIDER="xai"`,
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
    { role: 'user', content: 'What is happening in tech news today?' },
  ],
});

console.log(result.content);
// Response with real-time knowledge from X`,
          language: 'typescript',
        },
        {
          title: 'With Model Selection',
          description: 'Use Grok 2 for best results.',
          code: `import { chat } from '@/lib/ai';

const result = await chat({
  model: 'grok-2-latest',
  messages: [
    { role: 'system', content: 'You are a helpful coding assistant.' },
    { role: 'user', content: 'Explain the latest JavaScript features.' },
  ],
  temperature: 0.7,
});`,
          language: 'typescript',
        },
        {
          title: 'Direct Provider Usage',
          description: 'Use the xAI provider directly.',
          code: `import { XAIProvider } from '@/lib/ai';

const grok = new XAIProvider();

const result = await grok.chat({
  model: 'grok-2-latest',
  messages: [{ role: 'user', content: 'Tell me a joke about programming.' }],
  maxTokens: 200,
});

console.log(result.content);
// Witty response with Grok's personality`,
          language: 'typescript',
        },
      ]}
    />
  );
}
