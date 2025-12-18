/**
 * xAI Provider (Grok)
 *
 * Grok 2, real-time data access
 *
 * Setup:
 *   1. Get API key at console.x.ai
 *   2. Add XAI_API_KEY to .env
 */

import type { AIProviderClient, ChatOptions, ChatResult } from './index';

const API_BASE = 'https://api.x.ai/v1';

function getConfig() {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) throw new Error('XAI_API_KEY is required');
  return { apiKey };
}

export class XAIProvider implements AIProviderClient {
  async chat(options: ChatOptions): Promise<ChatResult> {
    const config = getConfig();

    const res = await fetch(API_BASE + '/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + config.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: options.model || 'grok-2-latest',
        messages: options.messages,
        max_tokens: options.maxTokens,
        temperature: options.temperature,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error('xAI error: ' + res.status + ' - ' + error);
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
}
