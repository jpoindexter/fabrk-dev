/**
 * Ollama Provider
 *
 * Local models, free, privacy-focused
 *
 * Setup:
 *   1. Install Ollama: brew install ollama
 *   2. Run: ollama serve
 *   3. Pull a model: ollama pull llama3.2
 *   4. Add OLLAMA_BASE_URL to .env (default: http://localhost:11434)
 */

import type { AIProviderClient, ChatOptions, ChatResult } from './index';

function getConfig() {
  const baseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
  return { baseUrl };
}

export class OllamaProvider implements AIProviderClient {
  async chat(options: ChatOptions): Promise<ChatResult> {
    const config = getConfig();

    const res = await fetch(config.baseUrl + '/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: options.model || 'llama3.2',
        messages: options.messages,
        stream: false,
        options: {
          temperature: options.temperature,
          num_predict: options.maxTokens,
        },
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error('Ollama error: ' + res.status + ' - ' + error);
    }

    const data = await res.json();
    return {
      content: data.message?.content || '',
      usage: data.eval_count ? {
        promptTokens: data.prompt_eval_count || 0,
        completionTokens: data.eval_count || 0,
        totalTokens: (data.prompt_eval_count || 0) + (data.eval_count || 0),
      } : undefined,
    };
  }

  async listModels(): Promise<string[]> {
    const config = getConfig();

    try {
      const res = await fetch(config.baseUrl + '/api/tags');
      if (!res.ok) return [];

      const data = await res.json();
      return data.models?.map((m: any) => m.name) || [];
    } catch {
      return [];
    }
  }
}
