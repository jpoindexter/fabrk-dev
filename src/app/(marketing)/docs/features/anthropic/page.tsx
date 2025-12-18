import { FeatureGuideTemplate } from '@/components/docs';
import { Brain, Shield, Code, FileText, Zap, MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'Anthropic Claude - Fabrk Docs',
  description:
    'Integrate Anthropic Claude Sonnet 4 and Opus. Best for coding, analysis, and safety-focused applications.',
};

export default function AnthropicPage() {
  return (
    <FeatureGuideTemplate
      code="[0xA1]"
      category="AI Providers"
      title="Anthropic Claude"
      description="Claude Sonnet 4, Opus - Best for coding and analysis."
      overview="Anthropic builds Claude, known for exceptional coding abilities, nuanced analysis, and constitutional AI safety. Features include Claude Sonnet 4 for balanced performance, Claude Opus for complex tasks, 200K token context window, vision capabilities for image analysis, and industry-leading safety measures."
      features={[
        {
          icon: Code,
          title: 'Best at Coding',
          description:
            'Claude excels at code generation, debugging, and refactoring. Powers many AI coding tools.',
        },
        {
          icon: Brain,
          title: 'Claude Sonnet 4',
          description:
            'Latest model with balanced speed and capability. Best for most applications.',
        },
        {
          icon: FileText,
          title: '200K Context',
          description:
            'Process entire codebases, long documents, or extensive conversation history.',
        },
        {
          icon: Shield,
          title: 'Safety First',
          description:
            'Constitutional AI ensures helpful, harmless, and honest responses.',
        },
        {
          icon: MessageSquare,
          title: 'System Prompts',
          description:
            'Powerful system prompts for consistent persona and behavior control.',
        },
        {
          icon: Zap,
          title: 'Streaming',
          description:
            'Real-time response streaming with event-based API.',
        },
      ]}
      setup={[
        {
          title: 'Create Anthropic Account',
          description:
            'Sign up at console.anthropic.com. Add billing information to enable API access.',
        },
        {
          title: 'Generate API Key',
          description:
            'Go to API Keys in the console. Click "Create Key". Copy the key immediately.',
        },
        {
          title: 'Add Environment Variable',
          description: 'Add your Anthropic API key to .env.local',
          code: `# Anthropic API Key
ANTHROPIC_API_KEY="sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxx"

# Set Anthropic as your AI provider
AI_PROVIDER="anthropic"`,
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
    { role: 'system', content: 'You are a senior software engineer.' },
    { role: 'user', content: 'Review this code for bugs:\\n\\nfunction add(a, b) { return a - b; }' },
  ],
});

console.log(result.content);
// "I found a bug: the function is named 'add' but uses subtraction..."`,
          language: 'typescript',
        },
        {
          title: 'With Model Selection',
          description: 'Choose between Claude models based on your needs.',
          code: `import { chat } from '@/lib/ai';

// Use Sonnet for most tasks (fast, capable)
const result = await chat({
  model: 'claude-sonnet-4-20250514',
  messages: [{ role: 'user', content: 'Explain recursion.' }],
  maxTokens: 1000,
});

// Use Opus for complex reasoning (slower, most capable)
const complexResult = await chat({
  model: 'claude-opus-4-20250514',
  messages: [{ role: 'user', content: 'Analyze this architecture...' }],
});`,
          language: 'typescript',
        },
        {
          title: 'Direct Provider Usage',
          description: 'Use the Anthropic provider directly.',
          code: `import { AnthropicProvider } from '@/lib/ai';

const claude = new AnthropicProvider();

const result = await claude.chat({
  model: 'claude-sonnet-4-20250514',
  messages: [
    { role: 'system', content: 'Respond in JSON format only.' },
    { role: 'user', content: 'List 3 programming languages.' },
  ],
  temperature: 0,
});

// Parse JSON response
const languages = JSON.parse(result.content);`,
          language: 'typescript',
        },
      ]}
    />
  );
}
