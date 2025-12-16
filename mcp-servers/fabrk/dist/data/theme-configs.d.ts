/**
 * Fabrk Theme Configurations
 * 12 terminal-themed color palettes
 */
export interface ThemeConfig {
    name: string;
    displayName: string;
    category: 'crt-phosphor' | 'retro-computer' | 'handheld' | 'monochrome';
    description: string;
    dataTheme: string;
    preview: {
        background: string;
        foreground: string;
        primary: string;
        muted: string;
    };
}
export declare const themeConfigs: ThemeConfig[];
export declare function getThemesByCategory(category: ThemeConfig['category']): ThemeConfig[];
export declare function findTheme(name: string): ThemeConfig | undefined;
export declare const themeCategories: readonly [{
    readonly id: "crt-phosphor";
    readonly name: "CRT Phosphor";
    readonly count: 5;
}, {
    readonly id: "retro-computer";
    readonly name: "Retro Computer";
    readonly count: 4;
}, {
    readonly id: "handheld";
    readonly name: "Handheld";
    readonly count: 2;
}, {
    readonly id: "monochrome";
    readonly name: "Monochrome";
    readonly count: 1;
}];
//# sourceMappingURL=theme-configs.d.ts.map