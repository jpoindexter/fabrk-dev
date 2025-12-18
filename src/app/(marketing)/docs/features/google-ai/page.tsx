import { FeatureGuideTemplate } from '@/components/docs';
import { Sparkles, Zap, Globe, Image, Code, Brain } from 'lucide-react';

export const metadata = {
  title: 'Google Gemini - Fabrk Docs',
  description:
    'Integrate Google Gemini 2.0 Flash and Pro. Multimodal AI with excellent speed and generous free tier.',
};

export default function GoogleAIPage() {
  return (
    <FeatureGuideTemplate
      code="[0xA2]"
      category="AI Providers"
      title="Google Gemini"
      description="Gemini 2.0 Flash, Pro - Fast multimodal AI with generous free tier."
      overview="Google's Gemini models offer excellent multimodal capabilities with competitive pricing. Features include Gemini 2.0 Flash for speed, Gemini Pro for complex tasks, native multimodal support (text, image, audio, video), 1M+ token context window, and a generous free tier for development."
      features={[
        {
          icon: Zap,
          title: 'Gemini 2.0 Flash',
          description:
            'Fastest Gemini model. Excellent for real-time applications and high-volume use cases.',
        },
        {
          icon: Brain,
          title: 'Gemini Pro',
          description:
            'Most capable model for complex reasoning, analysis, and content generation.',
        },
        {
          icon: Image,
          title: 'Native Multimodal',
          description:
            'Process text, images, audio, and video in a single request. No separate vision model needed.',
        },
        {
          icon: Globe,
          title: '1M+ Context',
          description:
            'Process extremely long documents, entire codebases, or hours of audio.',
        },
        {
          icon: Sparkles,
          title: 'Free Tier',
          description:
            '60 requests/minute free. Perfect for development and prototyping.',
        },
        {
          icon: Code,
          title: 'Structured Output',
          description:
            'JSON mode and function calling for reliable structured responses.',
        },
      ]}
      setup={[
        {
          title: 'Get API Key',
          description:
            'Go to aistudio.google.com. Sign in with Google and click "Get API key". No billing required for free tier.',
        },
        {
          title: 'Add Environment Variable',
          description: 'Add your Google AI API key to .env.local',
          code: `# Google AI API Key
GOOGLE_AI_API_KEY="AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxx"

# Set Google as your AI provider
AI_PROVIDER="google"`,
          language: 'bash',
        },
        {
          title: 'Optional: Enable Billing',
          description:
            'For production use, enable billing in Google Cloud Console to increase rate limits and access paid features.',
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
    { role: 'user', content: 'What is the capital of France?' },
  ],
});

console.log(result.content);
// "The capital of France is Paris."`,
          language: 'typescript',
        },
        {
          title: 'With Model Selection',
          description: 'Choose between Gemini models.',
          code: `import { chat } from '@/lib/ai';

// Use Flash for speed (default)
const fastResult = await chat({
  model: 'gemini-2.0-flash-exp',
  messages: [{ role: 'user', content: 'Quick question: 2+2?' }],
});

// Use Pro for complex tasks
const complexResult = await chat({
  model: 'gemini-1.5-pro',
  messages: [{ role: 'user', content: 'Analyze this business plan...' }],
  maxTokens: 4000,
});`,
          language: 'typescript',
        },
        {
          title: 'Direct Provider Usage',
          description: 'Use the Google provider directly.',
          code: `import { GoogleProvider } from '@/lib/ai';

const gemini = new GoogleProvider();

const result = await gemini.chat({
  model: 'gemini-2.0-flash-exp',
  messages: [
    { role: 'system', content: 'You are a coding assistant.' },
    { role: 'user', content: 'Write a Python function to reverse a string.' },
  ],
  temperature: 0.2,
});

console.log(result.usage);
// { promptTokens: 20, completionTokens: 80, totalTokens: 100 }`,
          language: 'typescript',
        },
      ]}
    />
  );
}
