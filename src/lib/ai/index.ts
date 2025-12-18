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
 * Check if any AI provider is configured
 */
export function isAIConfigured(): boolean {
  return !!(
    process.env.OPENAI_API_KEY ||
    process.env.ANTHROPIC_API_KEY ||
    process.env.GOOGLE_AI_API_KEY ||
    process.env.XAI_API_KEY ||
    process.env.DEEPSEEK_API_KEY ||
    process.env.MISTRAL_API_KEY ||
    process.env.GROQ_API_KEY ||
    process.env.TOGETHER_API_KEY ||
    process.env.OLLAMA_ENABLED === 'true'
  );
}

// Import available AI SDK providers at module level
import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

/**
 * Get the AI model instance for use with Vercel AI SDK
 * Returns an openai() or google() model based on config
 */
export function getModel() {
  // Check OpenAI first (most common)
  if (process.env.OPENAI_API_KEY) {
    const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
    return openai(process.env.OPENAI_MODEL || 'gpt-4o-mini');
  }

  // Check Google AI
  if (process.env.GOOGLE_AI_API_KEY) {
    const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_AI_API_KEY });
    return google(process.env.GOOGLE_AI_MODEL || 'gemini-1.5-flash');
  }

  // Check Groq (fast inference) - uses OpenAI-compatible API
  if (process.env.GROQ_API_KEY) {
    const groq = createOpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
    });
    return groq(process.env.GROQ_MODEL || 'llama-3.1-8b-instant');
  }

  // Check Together AI - uses OpenAI-compatible API
  if (process.env.TOGETHER_API_KEY) {
    const together = createOpenAI({
      apiKey: process.env.TOGETHER_API_KEY,
      baseURL: 'https://api.together.xyz/v1',
    });
    return together(process.env.TOGETHER_MODEL || 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo');
  }

  // Check Ollama (local) - uses OpenAI-compatible API
  if (process.env.OLLAMA_ENABLED === 'true') {
    const ollama = createOpenAI({
      apiKey: 'ollama',
      baseURL: process.env.OLLAMA_BASE_URL || 'http://localhost:11434/v1',
    });
    return ollama(process.env.OLLAMA_MODEL || 'llama3.1:8b');
  }

  throw new Error('No AI provider configured. Set OPENAI_API_KEY, GOOGLE_AI_API_KEY, GROQ_API_KEY, TOGETHER_API_KEY, or OLLAMA_ENABLED.');
}

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

// ============================================================================
// Speech-to-Text (Whisper) - OpenAI only
// ============================================================================

export interface SpeechToTextOptions {
  language?: string;
  prompt?: string;
}

/**
 * Transcribe audio to text using OpenAI Whisper
 * Requires OPENAI_API_KEY
 */
export async function speechToText(
  audio: File | Blob,
  options: SpeechToTextOptions = {}
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is required for speech-to-text');
  }

  const formData = new FormData();
  formData.append('file', audio);
  formData.append('model', 'whisper-1');
  if (options.language) formData.append('language', options.language);
  if (options.prompt) formData.append('prompt', options.prompt);

  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Whisper API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.text;
}

// ============================================================================
// Text-to-Speech (TTS) - OpenAI only
// ============================================================================

export interface TextToSpeechOptions {
  text: string;
  voice?: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
  model?: 'tts-1' | 'tts-1-hd';
  speed?: number;
}

/**
 * Generate speech from text using OpenAI TTS
 * Requires OPENAI_API_KEY
 * Returns audio as Buffer
 */
export async function textToSpeech(options: TextToSpeechOptions): Promise<Buffer> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is required for text-to-speech');
  }

  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: options.model || 'tts-1',
      input: options.text,
      voice: options.voice || 'alloy',
      speed: options.speed || 1.0,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`TTS API error: ${response.status} - ${error}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// ============================================================================
// Image Generation (DALL-E) - OpenAI only
// ============================================================================

export interface GenerateImageOptions {
  prompt: string;
  model?: 'dall-e-2' | 'dall-e-3';
  size?: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792';
  quality?: 'standard' | 'hd';
  style?: 'vivid' | 'natural';
  n?: number;
}

/**
 * Generate images using OpenAI DALL-E
 * Requires OPENAI_API_KEY
 * Returns array of image URLs
 */
export async function generateImage(options: GenerateImageOptions): Promise<string[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is required for image generation');
  }

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: options.model || 'dall-e-3',
      prompt: options.prompt,
      size: options.size || '1024x1024',
      quality: options.quality || 'standard',
      style: options.style || 'vivid',
      n: options.n || 1,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`DALL-E API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.data.map((img: { url: string }) => img.url);
}
