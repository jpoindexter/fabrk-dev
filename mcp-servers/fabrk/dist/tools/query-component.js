/**
 * Query Component Tool
 * Get detailed documentation for a specific Fabrk component
 */
import { findComponent, componentCatalog } from '../data/component-catalog.js';
export function queryComponent(args) {
    const { component: query, include } = args;
    // Find the component
    const component = findComponent(query);
    if (!component) {
        // Suggest similar components
        const suggestions = componentCatalog
            .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()) ||
            c.slug.includes(query.toLowerCase()) ||
            c.category === query.toLowerCase())
            .slice(0, 5)
            .map((c) => c.name);
        return {
            found: false,
            error: `Component "${query}" not found`,
            suggestions: suggestions.length
                ? suggestions
                : ['Try: button, card, input, tabs, dialog, toast'],
        };
    }
    // Filter response based on include array
    if (include && include.length > 0) {
        const filtered = {
            name: component.name,
            slug: component.slug,
            category: component.category,
            description: component.description,
            import: component.import,
        };
        if (include.includes('props')) {
            filtered.props = component.props;
        }
        if (include.includes('variants')) {
            filtered.variants = component.variants;
        }
        if (include.includes('examples')) {
            filtered.examples = component.examples;
        }
        if (include.includes('accessibility')) {
            filtered.accessibility = component.accessibility;
        }
        // Always include design notes
        filtered.designNotes = component.designNotes;
        return {
            found: true,
            component: filtered,
        };
    }
    // Return full component data
    return {
        found: true,
        component,
    };
}
// List all components (for discovery)
export function listComponents() {
    const categories = new Map();
    componentCatalog.forEach((c) => {
        categories.set(c.category, (categories.get(c.category) || 0) + 1);
    });
    return {
        total: componentCatalog.length,
        categories: Array.from(categories.entries()).map(([name, count]) => ({
            name,
            count,
        })),
        components: componentCatalog.map((c) => ({
            name: c.name,
            slug: c.slug,
            category: c.category,
        })),
    };
}
// Search components by category
export function searchComponents(query) {
    const normalizedQuery = query.toLowerCase();
    return componentCatalog.filter((c) => c.name.toLowerCase().includes(normalizedQuery) ||
        c.slug.includes(normalizedQuery) ||
        c.category.includes(normalizedQuery) ||
        c.description.toLowerCase().includes(normalizedQuery));
}
