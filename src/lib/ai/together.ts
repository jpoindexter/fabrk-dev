/**
 * Together AI Provider
 *
 * Open models, affordable, serverless
 *
 * Setup:
 *   1. Get API key at api.together.xyz
 *   2. Add TOGETHER_API_KEY to .env
 */

import type { AIProviderClient, ChatOptions, ChatResult } from './index';

const API_BASE = 'https://api.together.xyz/v1';

function getConfig() {
  const apiKey = process.env.TOGETHER_API_KEY;
  if (!apiKey) throw new Error('TOGETHER_API_KEY is required');
  return { apiKey };
}

export class TogetherProvider implements AIProviderClient {
  async chat(options: ChatOptions): Promise<ChatResult> {
    const config = getConfig();

    const res = await fetch(API_BASE + '/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + config.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: options.model || 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
        messages: options.messages,
        max_tokens: options.maxTokens,
        temperature: options.temperature,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error('Together error: ' + res.status + ' - ' + error);
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
    return data.filter((m: any) => m.type === 'chat').map((m: any) => m.id) || [];
  }
}
