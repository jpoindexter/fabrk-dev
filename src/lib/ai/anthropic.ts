/**
 * Anthropic Provider
 *
 * Claude 3.5 Sonnet, Claude 3 Opus
 *
 * Setup:
 *   1. Create account at console.anthropic.com
 *   2. Add ANTHROPIC_API_KEY to .env
 */

import type { AIProviderClient, ChatOptions, ChatResult } from './index';

const API_BASE = 'https://api.anthropic.com/v1';

function getConfig() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is required');
  return { apiKey };
}

export class AnthropicProvider implements AIProviderClient {
  async chat(options: ChatOptions): Promise<ChatResult> {
    const config = getConfig();

    // Extract system message if present
    const systemMessage = options.messages.find((m) => m.role === 'system');
    const messages = options.messages.filter((m) => m.role !== 'system');

    const res = await fetch(API_BASE + '/messages', {
      method: 'POST',
      headers: {
        'x-api-key': config.apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: options.model || 'claude-sonnet-4-20250514',
        max_tokens: options.maxTokens || 4096,
        system: systemMessage?.content,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        temperature: options.temperature,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error('Anthropic error: ' + res.status + ' - ' + error);
    }

    const data = await res.json();
    return {
      content: data.content[0]?.text || '',
      usage: data.usage ? {
        promptTokens: data.usage.input_tokens,
        completionTokens: data.usage.output_tokens,
        totalTokens: data.usage.input_tokens + data.usage.output_tokens,
      } : undefined,
    };
  }
}
