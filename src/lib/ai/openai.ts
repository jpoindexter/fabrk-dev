/**
 * OpenAI Provider
 *
 * GPT-4o, o1, embeddings, DALL-E
 *
 * Setup:
 *   1. Create account at platform.openai.com
 *   2. Add OPENAI_API_KEY to .env
 */

import type { AIProviderClient, ChatOptions, ChatResult } from './index';

const API_BASE = 'https://api.openai.com/v1';

function getConfig() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is required');
  return { apiKey };
}

export class OpenAIProvider implements AIProviderClient {
  async chat(options: ChatOptions): Promise<ChatResult> {
    const config = getConfig();

    const res = await fetch(API_BASE + '/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + config.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: options.model || 'gpt-4o',
        messages: options.messages,
        max_tokens: options.maxTokens,
        temperature: options.temperature,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error('OpenAI error: ' + res.status + ' - ' + error);
    }

    const data = await res.json();
    return {
      content: data.choices[0]?.message?.content || '',
      usage: data.usage ? {
        promptTokens: data.usage.prompt_tokens,
        completionTokens: data.usage.completion_tokens,
        totalTokens: data.usage.total_tokens,
      } : undefined,
    };
  }

  async listModels(): Promise<string[]> {
    const config = getConfig();

    const res = await fetch(API_BASE + '/models', {
      headers: { 'Authorization': 'Bearer ' + config.apiKey },
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data.data?.map((m: any) => m.id) || [];
  }
}
