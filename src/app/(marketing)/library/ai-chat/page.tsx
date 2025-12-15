/**
 * AI Chat Template - ChatGPT-style interface
 * Full conversational AI interface with sidebar and history
 */
'use client';

import { AiChat } from '@/components/library/ai-chat';
import { TemplateShowcasePage, TemplatePreviewWrapper, BrowserChrome } from '@/components/library';

const templateCode = `"use client";

import { AiChat, type Message, type Model } from '@/components/library/ai-chat';

export default function ChatPage() {
  const handleSendMessage = async (message: string, modelId: string) => {
    // Implement your API call here
    // await fetch('/api/chat', {
    //   method: 'POST',
    //   body: JSON.stringify({ message, modelId })
    // });
  };

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <AiChat 
        onSendMessage={handleSendMessage}
        defaultModelId="gpt-4o"
      />
    </div>
  );
}`;

function AIChatPreview() {
  return (
    <TemplatePreviewWrapper minHeight="700px">
      <BrowserChrome title="AI Chat">
        <AiChat className="h-[600px] border-none" />
      </BrowserChrome>
    </TemplatePreviewWrapper>
  );
}

export default function AIChatTemplate() {
  return (
    <TemplateShowcasePage
      badge="AI CHAT"
      title="AI Chat Interface"
      description="ChatGPT-style conversational interface with streaming, history, and model selection"
      templateId="ai-chat"
      category={{ name: 'AI', href: '/library?category=ai' }}
      preview={<AIChatPreview />}
      code={templateCode}
      fileStructure={[
        { path: ['components/', 'library/', 'ai-chat.tsx'], label: '← Main component' },
        {
          path: ['app/', '(marketing)/', 'library/', 'ai-chat/', 'page.tsx'],
          label: '← Usage example',
        },
      ]}
      features={[
        'Real-time message streaming simulation',
        'Model selection (GPT-4, Claude, Gemini)',
        'Token usage tracking',
        'Markdown rendering support',
        'Terminal aesthetic with strict design tokens',
        'Responsive layout',
        'Error handling states',
        'Auto-scrolling message history',
        'Input validation and loading states',
      ]}
    />
  );
}
