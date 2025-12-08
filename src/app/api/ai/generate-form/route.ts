/**
 * AI Form Generator API Route
 * Generates form schemas from natural language descriptions
 */

import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { z } from "zod";
import { getModel, isAIConfigured } from "@/lib/ai/provider";
import { generatedFormSchema, FORM_GENERATOR_SYSTEM_PROMPT } from "@/lib/ai/schemas";

// Request schema
const requestSchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters"),
});

export async function POST(request: NextRequest) {
  try {
    // Check if AI is configured
    if (!isAIConfigured()) {
      return NextResponse.json(
        {
          error: "AI not configured",
          message: "Set OPENAI_API_KEY or GOOGLE_AI_API_KEY in your environment",
        },
        { status: 503 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const result = requestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { prompt } = result.data;

    // Generate form schema using structured output
    const { object: formSchema } = await generateObject({
      model: getModel(),
      schema: generatedFormSchema,
      system: FORM_GENERATOR_SYSTEM_PROMPT,
      prompt: `Generate a form schema for: ${prompt}`,
    });

    return NextResponse.json({
      success: true,
      form: formSchema,
    });
  } catch (error) {
    console.error("Form generation error:", error);

    // Handle specific AI errors
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return NextResponse.json(
          { error: "AI configuration error", message: error.message },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to generate form", message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
