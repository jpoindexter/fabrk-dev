/**
 * Create Form Prompt
 * Guided workflow for building forms with validation
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
export declare function createFormPrompt(args: Record<string, string>): PromptResult;
export {};
//# sourceMappingURL=create-form.d.ts.map