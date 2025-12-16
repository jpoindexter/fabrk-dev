/**
 * Query Component Tool
 * Get detailed documentation for a specific Fabrk component
 */
import { type ComponentMetadata } from '../data/component-catalog.js';
interface QueryComponentArgs {
    component: string;
    include?: ('props' | 'variants' | 'examples' | 'accessibility')[];
}
interface QueryResult {
    found: boolean;
    component?: Partial<ComponentMetadata>;
    suggestions?: string[];
    error?: string;
}
export declare function queryComponent(args: QueryComponentArgs): QueryResult;
export declare function listComponents(): {
    total: number;
    categories: {
        name: string;
        count: number;
    }[];
    components: {
        name: string;
        slug: string;
        category: string;
    }[];
};
export declare function searchComponents(query: string): ComponentMetadata[];
export {};
//# sourceMappingURL=query-component.d.ts.map