/**
 * Build Landing Page Prompt
 * Guided workflow for creating terminal-styled landing pages
 */
interface PromptResult {
    messages: Array<{
        role: 'user' | 'assistant';
        content: {
            type: 'text';
            text: string;
        };
    }>;
}
export declare function buildLandingPrompt(args: Record<string, string>): PromptResult;
export {};
//# sourceMappingURL=build-landing.d.ts.map