/**
 * Generate Page Tool
 * Scaffolds complete pages using Fabrk templates
 */
interface GeneratePageArgs {
    pageType: 'landing' | 'dashboard' | 'settings' | 'auth' | 'docs';
    pageName: string;
    sections?: string[];
}
export declare function generatePage(args: GeneratePageArgs): string;
export {};
//# sourceMappingURL=generate-page.d.ts.map