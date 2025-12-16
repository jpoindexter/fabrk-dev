/**
 * Fabrk MCP Server Implementation
 * Exposes design system, components, themes, and tools to AI assistants
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListResourcesRequestSchema, ListToolsRequestSchema, ReadResourceRequestSchema, ListPromptsRequestSchema, GetPromptRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
// Import data
import { designTokens } from './data/design-tokens.js';
import { componentCatalog } from './data/component-catalog.js';
import { themeConfigs } from './data/theme-configs.js';
// Import tools
import { generateComponent } from './tools/generate-component.js';
import { generatePage } from './tools/generate-page.js';
import { queryComponent } from './tools/query-component.js';
import { validateCode } from './tools/validate-code.js';
// Import prompts
import { buildLandingPrompt } from './prompts/build-landing.js';
import { addFeaturePrompt } from './prompts/add-feature.js';
import { createFormPrompt } from './prompts/create-form.js';
export async function createServer() {
    const server = new Server({
        name: 'fabrk-mcp',
        version: '1.0.0',
    }, {
        capabilities: {
            resources: {},
            tools: {},
            prompts: {},
        },
    });
    // ============================================================
    // RESOURCES - Read-only data AI can query
    // ============================================================
    server.setRequestHandler(ListResourcesRequestSchema, async () => ({
        resources: [
            {
                uri: 'fabrk://design-system',
                name: 'Fabrk Design System',
                description: 'Complete design tokens including mode object, colors, spacing, typography, and design rules',
                mimeType: 'application/json',
            },
            {
                uri: 'fabrk://components',
                name: 'Component Catalog',
                description: '77 UI components with props, variants, and examples',
                mimeType: 'application/json',
            },
            {
                uri: 'fabrk://themes',
                name: 'Theme Configurations',
                description: '12 terminal-themed color palettes (CRT, retro, handheld)',
                mimeType: 'application/json',
            },
        ],
    }));
    server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
        const { uri } = request.params;
        switch (uri) {
            case 'fabrk://design-system':
                return {
                    contents: [
                        {
                            uri,
                            mimeType: 'application/json',
                            text: JSON.stringify(designTokens, null, 2),
                        },
                    ],
                };
            case 'fabrk://components':
                return {
                    contents: [
                        {
                            uri,
                            mimeType: 'application/json',
                            text: JSON.stringify(componentCatalog, null, 2),
                        },
                    ],
                };
            case 'fabrk://themes':
                return {
                    contents: [
                        {
                            uri,
                            mimeType: 'application/json',
                            text: JSON.stringify(themeConfigs, null, 2),
                        },
                    ],
                };
            default:
                // Check for component-specific resource
                if (uri.startsWith('fabrk://components/')) {
                    const componentSlug = uri.replace('fabrk://components/', '');
                    const component = componentCatalog.find((c) => c.slug === componentSlug);
                    if (component) {
                        return {
                            contents: [
                                {
                                    uri,
                                    mimeType: 'application/json',
                                    text: JSON.stringify(component, null, 2),
                                },
                            ],
                        };
                    }
                }
                throw new Error(`Unknown resource: ${uri}`);
        }
    });
    // ============================================================
    // TOOLS - Actions AI can perform
    // ============================================================
    server.setRequestHandler(ListToolsRequestSchema, async () => ({
        tools: [
            {
                name: 'generate_component',
                description: 'Generate a Fabrk-styled component with terminal aesthetic (rounded-none, font-mono)',
                inputSchema: {
                    type: 'object',
                    properties: {
                        componentType: {
                            type: 'string',
                            description: 'Type of component to generate (button, card, form, table, etc.)',
                        },
                        name: {
                            type: 'string',
                            description: 'Name for the component (e.g., PricingCard, UserForm)',
                        },
                        variant: {
                            type: 'string',
                            description: 'Component variant (default, destructive, outline, etc.)',
                        },
                        withTerminalHeader: {
                            type: 'boolean',
                            description: 'Include terminal header [ [0xXX] TITLE ]',
                        },
                    },
                    required: ['componentType', 'name'],
                },
            },
            {
                name: 'generate_page',
                description: 'Scaffold a complete page using Fabrk templates',
                inputSchema: {
                    type: 'object',
                    properties: {
                        pageType: {
                            type: 'string',
                            enum: ['landing', 'dashboard', 'settings', 'auth', 'docs'],
                            description: 'Type of page to generate',
                        },
                        pageName: {
                            type: 'string',
                            description: 'Name for the page',
                        },
                        sections: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'Sections to include (hero, features, pricing, etc.)',
                        },
                    },
                    required: ['pageType', 'pageName'],
                },
            },
            {
                name: 'query_component',
                description: 'Get detailed documentation for a specific Fabrk component',
                inputSchema: {
                    type: 'object',
                    properties: {
                        component: {
                            type: 'string',
                            description: 'Component name or slug (e.g., button, data-table)',
                        },
                        include: {
                            type: 'array',
                            items: {
                                type: 'string',
                                enum: ['props', 'variants', 'examples', 'accessibility'],
                            },
                            description: 'What to include in response',
                        },
                    },
                    required: ['component'],
                },
            },
            {
                name: 'validate_code',
                description: 'Check code against Fabrk design system rules',
                inputSchema: {
                    type: 'object',
                    properties: {
                        code: {
                            type: 'string',
                            description: 'TSX/JSX code to validate',
                        },
                        strict: {
                            type: 'boolean',
                            description: 'Fail on warnings (not just errors)',
                        },
                    },
                    required: ['code'],
                },
            },
        ],
    }));
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        const { name, arguments: args } = request.params;
        switch (name) {
            case 'generate_component':
                return {
                    content: [
                        {
                            type: 'text',
                            text: generateComponent(args),
                        },
                    ],
                };
            case 'generate_page':
                return {
                    content: [
                        {
                            type: 'text',
                            text: generatePage(args),
                        },
                    ],
                };
            case 'query_component':
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(queryComponent(args), null, 2),
                        },
                    ],
                };
            case 'validate_code':
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(validateCode(args), null, 2),
                        },
                    ],
                };
            default:
                throw new Error(`Unknown tool: ${name}`);
        }
    });
    // ============================================================
    // PROMPTS - Pre-configured templates for common tasks
    // ============================================================
    server.setRequestHandler(ListPromptsRequestSchema, async () => ({
        prompts: [
            {
                name: 'build_landing_page',
                description: 'Guide for building a terminal-styled landing page with Fabrk components',
                arguments: [
                    {
                        name: 'productName',
                        description: 'Name of the product/app',
                        required: true,
                    },
                    {
                        name: 'sections',
                        description: 'Comma-separated list of sections (hero,features,pricing,cta)',
                        required: false,
                    },
                ],
            },
            {
                name: 'add_dashboard_feature',
                description: 'Add a new feature/card to a dashboard',
                arguments: [
                    {
                        name: 'featureName',
                        description: 'Name of the feature to add',
                        required: true,
                    },
                    {
                        name: 'featureType',
                        description: 'Type: analytics, settings, data-table, form',
                        required: false,
                    },
                ],
            },
            {
                name: 'create_form',
                description: 'Build a form with validation using Fabrk components',
                arguments: [
                    {
                        name: 'formName',
                        description: 'Name for the form',
                        required: true,
                    },
                    {
                        name: 'fields',
                        description: 'Comma-separated list of field names',
                        required: true,
                    },
                ],
            },
        ],
    }));
    server.setRequestHandler(GetPromptRequestSchema, async (request) => {
        const { name, arguments: args } = request.params;
        let result;
        switch (name) {
            case 'build_landing_page':
                result = buildLandingPrompt((args || {}));
                break;
            case 'add_dashboard_feature':
                result = addFeaturePrompt((args || {}));
                break;
            case 'create_form':
                result = createFormPrompt((args || {}));
                break;
            default:
                throw new Error(`Unknown prompt: ${name}`);
        }
        return {
            messages: result.messages.map((msg) => ({
                role: msg.role,
                content: msg.content,
            })),
        };
    });
    // ============================================================
    // CONNECT VIA STDIO
    // ============================================================
    const transport = new StdioServerTransport();
    await server.connect(transport);
    return server;
}
