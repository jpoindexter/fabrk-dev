/**
 * AI Providers - Unified Interface
 *
 * Supports: OpenAI, Anthropic, Google, xAI, DeepSeek, Mistral, Groq, Together, Ollama
 *
 * Uses Vercel AI SDK for streaming and type-safe responses
 *
 * Usage:
 *   import { getAIProvider, chat } from '@/lib/ai'
 */

export type AIProvider = 'openai' | 'anthropic' | 'google' | 'xai' | 'deepseek' | 'mistral' | 'groq' | 'together' | 'ollama';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatOptions {
  model?: string;
  messages: ChatMessage[];
  maxTokens?: number;
  temperature?: number;
  stream?: boolean;
}

export interface ChatResult {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface AIProviderClient {
  chat(options: ChatOptions): Promise<ChatResult>;
  listModels?(): Promise<string[]>;
}

// Re-export individual providers
export { OpenAIProvider } from './openai';
export { AnthropicProvider } from './anthropic';
export { GoogleProvider } from './google';
export { XAIProvider } from './xai';
export { DeepSeekProvider } from './deepseek';
export { MistralProvider } from './mistral';
export { GroqProvider } from './groq';
export { TogetherProvider } from './together';
export { OllamaProvider } from './ollama';

/**
 * Get AI provider based on environment config
 */
export function getAIProvider(): AIProviderClient {
  const provider = process.env.AI_PROVIDER as AIProvider || 'openai';

  switch (provider) {
    case 'openai':
      return new (require('./openai').OpenAIProvider)();
    case 'anthropic':
      return new (require('./anthropic').AnthropicProvider)();
    case 'google':
      return new (require('./google').GoogleProvider)();
    case 'xai':
      return new (require('./xai').XAIProvider)();
    case 'deepseek':
      return new (require('./deepseek').DeepSeekProvider)();
    case 'mistral':
      return new (require('./mistral').MistralProvider)();
    case 'groq':
      return new (require('./groq').GroqProvider)();
    case 'together':
      return new (require('./together').TogetherProvider)();
    case 'ollama':
      return new (require('./ollama').OllamaProvider)();
    default:
      throw new Error('Unknown AI provider: ' + provider);
  }
}

/**
 * Chat with the configured AI provider
 */
export async function chat(options: ChatOptions): Promise<ChatResult> {
  const provider = getAIProvider();
  return provider.chat(options);
}
