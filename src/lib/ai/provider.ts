/**
 * Vercel AI SDK Provider Configuration
 * Modern AI integration with structured outputs support
 */

import { createOpenAI } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

// Provider types
export type AIProvider = "openai" | "google";

// Get the configured provider based on available API keys
export function getConfiguredProvider(): AIProvider | null {
  if (process.env.OPENAI_API_KEY) return "openai";
  if (process.env.GOOGLE_AI_API_KEY) return "google";
  return null;
}

// Create OpenAI client
export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  return createOpenAI({ apiKey });
}

// Create Google (Gemini) client
export function getGoogleClient() {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_AI_API_KEY is not configured");
  }
  return createGoogleGenerativeAI({ apiKey });
}

// Get the appropriate model based on provider
export function getModel(provider?: AIProvider) {
  const activeProvider = provider || getConfiguredProvider();

  if (!activeProvider) {
    throw new Error(
      "No AI provider configured. Set OPENAI_API_KEY or GOOGLE_AI_API_KEY in your environment."
    );
  }

  switch (activeProvider) {
    case "openai":
      return getOpenAIClient()("gpt-4o-mini");
    case "google":
      return getGoogleClient()("gemini-1.5-flash");
    default:
      throw new Error(`Unknown provider: ${activeProvider}`);
  }
}

// Check if AI is available
export function isAIConfigured(): boolean {
  return getConfiguredProvider() !== null;
}
