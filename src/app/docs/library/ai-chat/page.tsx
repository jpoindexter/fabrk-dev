'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { AiChat } from '@/components/library/ai-chat';
import { Card, CardHeader } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';

const importCode = `import { AiChat, type Message, type Model } from '@/components/library/ai-chat';`;

const usageCode = `'use client';

import { AiChat } from '@/components/library/ai-chat';

export default function Page() {
  const handleSendMessage = async (message: string, modelId: string) => {
    // Your API logic here
  };

  return (
    <div className="p-4">
      <AiChat onSendMessage={handleSendMessage} />
    </div>
  );
}`;

const typesCode = `export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  tokens?: number;
}

export interface Model {
  id: string;
  name: string;
  provider: string;
  maxTokens: number;
}`;

export default function AiChatDocsPage() {
  return (
    <ComponentShowcaseTemplate
      code="[LIB.AI]"
      title="AI Chat Interface"
      description="A full-featured chat interface with streaming, model selection, and terminal aesthetics."
      importCode={importCode}
      mainPreview={{
        preview: (
          <div className="bg-background w-full p-6">
            <AiChat className="h-[500px]" />
          </div>
        ),
        code: usageCode,
      }}
      props={[
        {
          name: 'messages',
          type: 'Message[]',
          required: false,
          description: 'Initial array of messages to display',
        },
        {
          name: 'models',
          type: 'Model[]',
          required: false,
          description: 'List of available AI models',
        },
        {
          name: 'defaultModelId',
          type: 'string',
          required: false,
          description: 'ID of the initially selected model',
        },
        {
          name: 'onSendMessage',
          type: '(msg: string, model: string) => Promise<void>',
          required: false,
          description: 'Callback function when user sends a message',
        },
        {
          name: 'isStreaming',
          type: 'boolean',
          required: false,
          description: 'Force loading state for external control',
        },
        {
          name: 'error',
          type: 'string | null',
          required: false,
          description: 'Display an error message in the UI',
        },
      ]}
      accessibility={[
        'Keyboard navigation support for input and buttons',
        'Aria labels on all interactive elements',
        'High contrast terminal theme for readability',
        'Focus indicators on all inputs and buttons',
        'Auto-scrolling respects user focus',
      ]}
      previous={{ title: 'Advanced Filters', href: '/docs/components/advanced-filters' }}
      next={{ title: 'Browser Chrome', href: '/docs/components/browser-chrome' }}
    >
      <Card>
        <CardHeader code="0xTYPE" title="TYPE DEFINITIONS" />
        <div className="p-4">
          <CodeBlock code={typesCode} language="typescript" maxHeight="300px" />
        </div>
      </Card>
    </ComponentShowcaseTemplate>
  );
}
