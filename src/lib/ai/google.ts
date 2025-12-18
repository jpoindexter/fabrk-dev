/**
 * Google AI Provider
 *
 * Gemini 2.0, Gemini Flash
 *
 * Setup:
 *   1. Get API key at aistudio.google.com
 *   2. Add GOOGLE_AI_API_KEY to .env
 */

import type { AIProviderClient, ChatOptions, ChatResult } from './index';

function getConfig() {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) throw new Error('GOOGLE_AI_API_KEY is required');
  return { apiKey };
}

export class GoogleProvider implements AIProviderClient {
  async chat(options: ChatOptions): Promise<ChatResult> {
    const config = getConfig();
    const model = options.model || 'gemini-2.0-flash-exp';
    const apiBase = 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent';

    // Convert messages to Google format
    const contents = options.messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

    const systemInstruction = options.messages.find((m) => m.role === 'system');

    const res = await fetch(apiBase + '?key=' + config.apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction.content }] } : undefined,
        generationConfig: {
          maxOutputTokens: options.maxTokens,
          temperature: options.temperature,
        },
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error('Google AI error: ' + res.status + ' - ' + error);
    }

    const data = await res.json();
    return {
      content: data.candidates?.[0]?.content?.parts?.[0]?.text || '',
      usage: data.usageMetadata ? {
        promptTokens: data.usageMetadata.promptTokenCount || 0,
        completionTokens: data.usageMetadata.candidatesTokenCount || 0,
        totalTokens: data.usageMetadata.totalTokenCount || 0,
      } : undefined,
    };
  }
}
