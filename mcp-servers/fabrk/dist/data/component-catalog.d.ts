/**
 * Fabrk Component Catalog
 * Metadata for all 77 UI components
 */
export interface ComponentProp {
    name: string;
    type: string;
    required: boolean;
    default?: string;
    description: string;
}
export interface ComponentVariant {
    name: string;
    value: string;
    description: string;
    example: string;
}
export interface ComponentMetadata {
    name: string;
    slug: string;
    category: 'form' | 'display' | 'navigation' | 'data' | 'chart' | 'feedback' | 'layout';
    description: string;
    import: string;
    props: ComponentProp[];
    variants?: ComponentVariant[];
    examples: {
        title: string;
        code: string;
    }[];
    accessibility: string[];
    designNotes: string[];
}
export declare const componentCatalog: ComponentMetadata[];
export declare function findComponent(query: string): ComponentMetadata | undefined;
export declare function getComponentsByCategory(category: ComponentMetadata['category']): ComponentMetadata[];
//# sourceMappingURL=component-catalog.d.ts.map