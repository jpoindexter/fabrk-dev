'use client';

import * as React from 'react';
import { Send, Bot, User, RefreshCw, AlertCircle, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TerminalSpinner } from '@/components/ui/terminal-spinner';
import { formatButtonText, formatCardHeader } from '@/design-system/themes/terminal';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface Message {
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
}

export interface AiChatProps {
  messages?: Message[];
  models?: Model[];
  defaultModelId?: string;
  onSendMessage?: (message: string, modelId: string) => Promise<void>;
  isStreaming?: boolean;
  error?: string | null;
  className?: string;
}

// -----------------------------------------------------------------------------
// Mock Data (for demo purposes)
// -----------------------------------------------------------------------------

const DEFAULT_MODELS: Model[] = [
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', maxTokens: 128000 },
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', maxTokens: 200000 },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', provider: 'Google', maxTokens: 1000000 },
];

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: 'Hello. I am ready for your instructions. select a model to begin.',
  timestamp: Date.now(),
  tokens: 12,
};

// -----------------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------------

export function AiChat({
  messages: controlledMessages,
  models = DEFAULT_MODELS,
  defaultModelId = 'gpt-4o',
  onSendMessage,
  isStreaming: controlledIsStreaming = false,
  error: controlledError = null,
  className,
}: AiChatProps) {
  // State
  const [messages, setMessages] = React.useState<Message[]>(
    controlledMessages || [WELCOME_MESSAGE]
  );
  const [input, setInput] = React.useState('');
  const [selectedModelId, setSelectedModelId] = React.useState(defaultModelId);
  const [isStreaming, setIsStreaming] = React.useState(controlledIsStreaming);
  const [localError, setLocalError] = React.useState<string | null>(controlledError);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Sync controlled state
  React.useEffect(() => {
    if (controlledMessages) setMessages(controlledMessages);
  }, [controlledMessages]);

  React.useEffect(() => {
    if (controlledIsStreaming !== undefined) setIsStreaming(controlledIsStreaming);
  }, [controlledIsStreaming]);

  React.useEffect(() => {
    if (controlledError !== undefined) setLocalError(controlledError);
  }, [controlledError]);

  // Auto-scroll to bottom
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  // Handle Send
  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLocalError(null);

    if (onSendMessage) {
      setIsStreaming(true);
      try {
        await onSendMessage(input, selectedModelId);
      } catch (err) {
        setLocalError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsStreaming(false);
      }
    } else {
      // Mock simulation
      simulateResponse(selectedModelId);
    }
  };

  // Mock Response Simulation
  const simulateResponse = (modelId: string) => {
    setIsStreaming(true);
    const modelName = models.find((m) => m.id === modelId)?.name || modelId;

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);

      const responseText = `This is a simulated response from [${modelName}].

I am operating in a mock environment to demonstrate the UI capabilities. I can format code:

\`\`\`typescript
const greeting = "Hello World";
// greeting is now ready to use
\`\`\`

End of transmission.`;
      let charIndex = 0;

      const interval = setInterval(() => {
        if (charIndex < responseText.length) {
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMsg = newMessages[newMessages.length - 1];
            if (lastMsg.role === 'assistant') {
              lastMsg.content = responseText.slice(0, charIndex + 1);
            }
            return newMessages;
          });
          charIndex++;
        } else {
          clearInterval(interval);
          setIsStreaming(false);
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMsg = newMessages[newMessages.length - 1];
            lastMsg.tokens = Math.ceil(responseText.length / 4);
            return newMessages;
          });
        }
      }, 15); // Typing speed
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={cn(
        'flex h-[600px] w-full flex-col overflow-hidden border',
        mode.color.bg.base,
        mode.color.border.default,
        mode.radius,
        className
      )}
    >
      {/* Header */}
      <header
        className={cn(
          'flex items-center justify-between border-b px-4 py-3',
          mode.color.border.default,
          mode.color.bg.surface
        )}
      >
        <div className="flex items-center gap-3">
          <span className={cn('text-xs font-bold tracking-wider uppercase', mode.color.text.muted)}>
            {formatCardHeader('AI_UPLINK', '0x01')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedModelId} onValueChange={setSelectedModelId} disabled={isStreaming}>
            <SelectTrigger className="h-8 w-[180px] text-xs uppercase">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id} className="text-xs uppercase">
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Messages Area */}
      <div
        ref={scrollRef}
        className={cn('flex-1 space-y-6 overflow-y-auto p-4', mode.color.bg.base)}
      >
        {messages.map((msg, index) => (
          <MessageItem key={msg.id} message={msg} isLast={index === messages.length - 1} />
        ))}
        {localError && (
          <div
            className={cn(
              'flex items-center gap-2 border p-3 text-xs',
              mode.color.border.danger,
              mode.color.bg.dangerMuted,
              mode.color.text.danger
            )}
          >
            <AlertCircle className="size-4" />
            <span>ERROR: {localError}</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className={cn('border-t p-4', mode.color.border.default, mode.color.bg.surface)}>
        <div className="relative flex items-end gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="ENTER COMMAND OR MESSAGE..."
            className={cn(
              'max-h-[200px] min-h-[50px] resize-none pr-12 text-sm',
              mode.color.bg.base
            )}
            disabled={isStreaming}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            size="icon"
            className={cn('absolute right-2 bottom-2 size-8', mode.radius)}
          >
            {isStreaming ? (
              <TerminalSpinner className="text-primary-foreground" />
            ) : (
              <Send className="size-4" />
            )}
          </Button>
        </div>
        <div
          className={cn('mt-2 flex justify-between text-[10px] uppercase', mode.color.text.muted)}
        >
          <span>Tokens: {messages.reduce((acc, m) => acc + (m.tokens || 0), 0)}</span>
          <span>Status: {isStreaming ? 'PROCESSING...' : 'READY'}</span>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

function MessageItem({ message, isLast }: { message: Message; isLast: boolean }) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('flex gap-4', isUser ? 'flex-row-reverse' : 'flex-row')}>
      <div
        className={cn(
          'flex size-8 shrink-0 items-center justify-center border',
          mode.radius,
          isUser ? mode.color.bg.accent : mode.color.bg.muted,
          isUser ? mode.color.border.accent : mode.color.border.default
        )}
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </div>

      <div className={cn('flex max-w-[80%] flex-col gap-1', isUser ? 'items-end' : 'items-start')}>
        <div className="flex items-center gap-2">
          <span className={cn('text-[10px] font-bold uppercase', mode.color.text.muted)}>
            {isUser ? 'OPERATOR' : 'SYSTEM'}
          </span>
          <span className={cn('text-[10px]', mode.color.text.muted)}>
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>

        <div
          className={cn(
            'group relative min-w-[200px] border px-4 py-3 text-sm whitespace-pre-wrap',
            mode.radius,
            isUser
              ? cn(mode.color.bg.muted, mode.color.border.accent, mode.color.text.primary)
              : cn(mode.color.bg.surface, mode.color.border.default, mode.color.text.secondary)
          )}
        >
          {message.content}

          {!isUser && (
            <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={copyToClipboard}
                className={cn('hover:bg-muted/50 p-1', mode.radius)}
              >
                {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
              </button>
            </div>
          )}
        </div>

        {message.tokens && (
          <span className={cn('text-[10px] opacity-50', mode.color.text.muted)}>
            [{message.tokens} TOKENS]
          </span>
        )}
      </div>
    </div>
  );
}
