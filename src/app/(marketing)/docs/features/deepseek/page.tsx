import { FeatureGuideTemplate } from '@/components/docs';
import { DollarSign, Brain, Code, Zap, Globe, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'DeepSeek - Fabrk Docs',
  description:
    'Integrate DeepSeek V3 and R1. Most affordable AI with excellent reasoning and coding capabilities.',
};

export default function DeepSeekPage() {
  return (
    <FeatureGuideTemplate
      code="[0xA4]"
      category="AI Providers"
      title="DeepSeek"
      description="V3, R1 - Most affordable with excellent reasoning."
      overview="DeepSeek offers state-of-the-art AI at a fraction of the cost of competitors. Features include DeepSeek V3 for general tasks, R1 for reasoning (matches o1 quality), exceptional coding abilities, OpenAI-compatible API, and pricing 90%+ cheaper than GPT-4."
      features={[
        {
          icon: DollarSign,
          title: 'Extremely Affordable',
          description:
            '$0.14/M input, $0.28/M output. 90%+ cheaper than GPT-4o while matching quality.',
        },
        {
          icon: Brain,
          title: 'R1 Reasoning',
          description:
            'DeepSeek R1 matches o1 on benchmarks. Excellent for math, logic, and complex problems.',
        },
        {
          icon: Code,
          title: 'Strong at Coding',
          description:
            'Trained on extensive code data. Excellent for generation, debugging, and explanation.',
        },
        {
          icon: Zap,
          title: 'Fast Inference',
          description:
            'Optimized infrastructure delivers quick responses despite the low price.',
        },
        {
          icon: Globe,
          title: 'OpenAI Compatible',
          description:
            'Drop-in replacement for OpenAI API. Minimal code changes to switch.',
        },
        {
          icon: Sparkles,
          title: '64K Context',
          description:
            'Long context window for processing large documents and codebases.',
        },
      ]}
      setup={[
        {
          title: 'Create DeepSeek Account',
          description:
            'Sign up at platform.deepseek.com. Add minimal credits ($5 minimum) to get started.',
        },
        {
          title: 'Generate API Key',
          description:
            'Go to API Keys in the dashboard. Create a new key and copy it.',
        },
        {
          title: 'Add Environment Variable',
          description: 'Add your DeepSeek API key to .env.local',
          code: `# DeepSeek API Key
DEEPSEEK_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxx"

# Set DeepSeek as your AI provider
AI_PROVIDER="deepseek"`,
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
    { role: 'user', content: 'Explain the difference between var, let, and const in JavaScript.' },
  ],
});

console.log(result.content);
// Detailed explanation of JavaScript variable declarations`,
          language: 'typescript',
        },
        {
          title: 'With Model Selection',
          description: 'Choose between DeepSeek models.',
          code: `import { chat } from '@/lib/ai';

// Use deepseek-chat for general tasks (default)
const result = await chat({
  model: 'deepseek-chat',
  messages: [{ role: 'user', content: 'Write a haiku.' }],
});

// Use deepseek-reasoner for complex problems
const reasoningResult = await chat({
  model: 'deepseek-reasoner',
  messages: [{ role: 'user', content: 'Solve this math problem: ...' }],
});`,
          language: 'typescript',
        },
        {
          title: 'Cost Comparison',
          description: 'See how much you save with DeepSeek.',
          code: `// DeepSeek Pricing (as of 2024)
// Input:  $0.14 per 1M tokens
// Output: $0.28 per 1M tokens

// GPT-4o Pricing
// Input:  $2.50 per 1M tokens
// Output: $10.00 per 1M tokens

// Example: 1M tokens in, 500K tokens out
// DeepSeek: $0.14 + $0.14 = $0.28
// GPT-4o:   $2.50 + $5.00 = $7.50

// Savings: 96%!`,
          language: 'typescript',
        },
      ]}
    />
  );
}
