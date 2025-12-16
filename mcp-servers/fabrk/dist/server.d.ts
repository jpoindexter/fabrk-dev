/**
 * Fabrk MCP Server Implementation
 * Exposes design system, components, themes, and tools to AI assistants
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
export declare function createServer(): Promise<Server<{
    method: string;
    params?: {
        [x: string]: unknown;
        task?: {
            [x: string]: unknown;
            ttl?: number | null | undefined;
            pollInterval?: number | undefined;
        } | undefined;
        _meta?: {
            [x: string]: unknown;
            progressToken?: string | number | undefined;
            "io.modelcontextprotocol/related-task"?: {
                [x: string]: unknown;
                taskId: string;
            } | undefined;
        } | undefined;
    } | undefined;
}, {
    method: string;
    params?: {
        [x: string]: unknown;
        _meta?: {
            [x: string]: unknown;
            "io.modelcontextprotocol/related-task"?: {
                [x: string]: unknown;
                taskId: string;
            } | undefined;
        } | undefined;
    } | undefined;
}, {
    [x: string]: unknown;
    _meta?: {
        [x: string]: unknown;
        "io.modelcontextprotocol/related-task"?: {
            [x: string]: unknown;
            taskId: string;
        } | undefined;
    } | undefined;
}>>;
//# sourceMappingURL=server.d.ts.map