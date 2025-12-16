/**
 * Add Dashboard Feature Prompt
 * Guided workflow for adding features to dashboards
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
export declare function addFeaturePrompt(args: Record<string, string>): PromptResult;
export {};
//# sourceMappingURL=add-feature.d.ts.map