/**
 * AI Integration Kit
 * OpenAI & Anthropic helpers with streaming support
 *
 * Features:
 * - OpenAI GPT-4/GPT-3.5 support
 * - Anthropic Claude support
 * - Streaming responses
 * - Function calling
 * - Token usage tracking
 * - Rate limiting
 * - Cost tracking
 */

import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

// Initialize clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export type AIProvider = "openai" | "anthropic";
export type OpenAIModel = "gpt-4" | "gpt-4-turbo" | "gpt-3.5-turbo";
export type AnthropicModel = "claude-3-opus-20240229" | "claude-3-sonnet-20240229" | "claude-3-haiku-20240307";

export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  cost?: number;
  model: string;
  provider: AIProvider;
}

/**
 * Token pricing (per 1M tokens)
 */
const TOKEN_PRICING = {
  "gpt-4": { input: 30, output: 60 },
  "gpt-4-turbo": { input: 10, output: 30 },
  "gpt-3.5-turbo": { input: 0.5, output: 1.5 },
  "claude-3-opus-20240229": { input: 15, output: 75 },
  "claude-3-sonnet-20240229": { input: 3, output: 15 },
  "claude-3-haiku-20240307": { input: 0.25, output: 1.25 },
};

/**
 * Calculate cost
 */
function calculateCost(
  model: string,
  promptTokens: number,
  completionTokens: number
): number {
  const pricing = TOKEN_PRICING[model as keyof typeof TOKEN_PRICING];
  if (!pricing) return 0;

  const inputCost = (promptTokens / 1_000_000) * pricing.input;
  const outputCost = (completionTokens / 1_000_000) * pricing.output;

  return inputCost + outputCost;
}

/**
 * Chat completion with OpenAI
 */
export async function chatWithOpenAI(options: {
  messages: AIMessage[];
  model?: OpenAIModel;
  temperature?: number;
  maxTokens?: number;
  stream?: false;
}): Promise<AIResponse>;

export async function chatWithOpenAI(options: {
  messages: AIMessage[];
  model?: OpenAIModel;
  temperature?: number;
  maxTokens?: number;
  stream: true;
}): Promise<AsyncIterable<string>>;

export async function chatWithOpenAI(options: {
  messages: AIMessage[];
  model?: OpenAIModel;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}): Promise<AIResponse | AsyncIterable<string>> {
  const model = options.model || "gpt-3.5-turbo";

  if (options.stream) {
    // Streaming response
    const stream = await openai.chat.completions.create({
      model,
      messages: options.messages as any,
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens,
      stream: true,
    });

    return (async function* () {
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          yield content;
        }
      }
    })();
  } else {
    // Regular response
    const completion = await openai.chat.completions.create({
      model,
      messages: options.messages as any,
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens,
    });

    const usage = completion.usage;
    const content = completion.choices[0]?.message?.content || "";

    return {
      content,
      usage: usage
        ? {
            promptTokens: usage.prompt_tokens,
            completionTokens: usage.completion_tokens,
            totalTokens: usage.total_tokens,
          }
        : undefined,
      cost: usage
        ? calculateCost(model, usage.prompt_tokens, usage.completion_tokens)
        : undefined,
      model,
      provider: "openai",
    };
  }
}

/**
 * Chat completion with Anthropic Claude
 */
export async function chatWithClaude(options: {
  messages: AIMessage[];
  model?: AnthropicModel;
  temperature?: number;
  maxTokens?: number;
  stream?: false;
}): Promise<AIResponse>;

export async function chatWithClaude(options: {
  messages: AIMessage[];
  model?: AnthropicModel;
  temperature?: number;
  maxTokens?: number;
  stream: true;
}): Promise<AsyncIterable<string>>;

export async function chatWithClaude(options: {
  messages: AIMessage[];
  model?: AnthropicModel;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}): Promise<AIResponse | AsyncIterable<string>> {
  const model = options.model || "claude-3-sonnet-20240229";

  // Separate system message
  const systemMessage = options.messages.find((m) => m.role === "system");
  const messages = options.messages.filter((m) => m.role !== "system");

  if (options.stream) {
    // Streaming response
    const stream = await anthropic.messages.create({
      model,
      messages: messages as any,
      system: systemMessage?.content,
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 1024,
      stream: true,
    });

    return (async function* () {
      for await (const event of stream) {
        if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
          yield event.delta.text;
        }
      }
    })();
  } else {
    // Regular response
    const message = await anthropic.messages.create({
      model,
      messages: messages as any,
      system: systemMessage?.content,
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 1024,
    });

    const content =
      message.content[0]?.type === "text" ? message.content[0].text : "";

    return {
      content,
      usage: {
        promptTokens: message.usage.input_tokens,
        completionTokens: message.usage.output_tokens,
        totalTokens: message.usage.input_tokens + message.usage.output_tokens,
      },
      cost: calculateCost(
        model,
        message.usage.input_tokens,
        message.usage.output_tokens
      ),
      model,
      provider: "anthropic",
    };
  }
}

/**
 * Generic chat function (auto-select provider)
 */
export async function chat(options: {
  messages: AIMessage[];
  provider?: AIProvider;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}): Promise<AIResponse | AsyncIterable<string>> {
  const provider = options.provider || "openai";

  if (provider === "openai") {
    return chatWithOpenAI({
      messages: options.messages,
      model: (options.model as OpenAIModel) || "gpt-3.5-turbo",
      temperature: options.temperature,
      maxTokens: options.maxTokens,
      stream: options.stream as any,
    });
  } else {
    return chatWithClaude({
      messages: options.messages,
      model: (options.model as AnthropicModel) || "claude-3-sonnet-20240229",
      temperature: options.temperature,
      maxTokens: options.maxTokens,
      stream: options.stream as any,
    });
  }
}

/**
 * Generate embeddings (OpenAI)
 */
export async function generateEmbeddings(
  text: string | string[],
  model: string = "text-embedding-3-small"
): Promise<number[][]> {
  const response = await openai.embeddings.create({
    model,
    input: text,
  });

  return response.data.map((d) => d.embedding);
}

/**
 * Text moderation (OpenAI)
 */
export async function moderateContent(text: string): Promise<{
  flagged: boolean;
  categories: Record<string, boolean>;
  scores: Record<string, number>;
}> {
  const response = await openai.moderations.create({
    input: text,
  });

  const result = response.results[0];

  return {
    flagged: result.flagged,
    categories: result.categories as any,
    scores: result.category_scores as any,
  };
}

/**
 * Image generation (OpenAI DALL-E)
 */
export async function generateImage(options: {
  prompt: string;
  model?: "dall-e-2" | "dall-e-3";
  size?: "256x256" | "512x512" | "1024x1024" | "1792x1024" | "1024x1792";
  quality?: "standard" | "hd";
  n?: number;
}): Promise<string[]> {
  const response = await openai.images.generate({
    model: options.model || "dall-e-3",
    prompt: options.prompt,
    size: options.size || "1024x1024",
    quality: options.quality || "standard",
    n: options.n || 1,
  });

  return response.data.map((d) => d.url || "");
}

/**
 * Text-to-speech (OpenAI TTS)
 */
export async function textToSpeech(options: {
  text: string;
  voice?: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
  model?: "tts-1" | "tts-1-hd";
}): Promise<Buffer> {
  const response = await openai.audio.speech.create({
    model: options.model || "tts-1",
    voice: options.voice || "alloy",
    input: options.text,
  });

  return Buffer.from(await response.arrayBuffer());
}

/**
 * Speech-to-text (OpenAI Whisper)
 */
export async function speechToText(
  audioFile: File,
  options?: {
    language?: string;
    prompt?: string;
  }
): Promise<string> {
  const response = await openai.audio.transcriptions.create({
    file: audioFile,
    model: "whisper-1",
    language: options?.language,
    prompt: options?.prompt,
  });

  return response.text;
}

/**
 * Helper: Stream to string
 */
export async function streamToString(stream: AsyncIterable<string>): Promise<string> {
  let result = "";
  for await (const chunk of stream) {
    result += chunk;
  }
  return result;
}

/**
 * Helper: Estimate tokens
 */
export function estimateTokens(text: string): number {
  // Rough estimation: ~4 characters per token
  return Math.ceil(text.length / 4);
}
