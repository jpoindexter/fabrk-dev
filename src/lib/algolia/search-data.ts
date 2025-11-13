// Search data for Algolia indexing
// This file contains static data about pages, components, and templates

export interface SearchRecord {
  objectID: string;
  title: string;
  description: string;
  url: string;
  category: string;
  type: 'page' | 'component' | 'template' | 'doc';
  content?: string;
  tags?: string[];
}

// Pages to index
export const pages: SearchRecord[] = [
  {
    objectID: 'page-home',
    title: 'Home',
    description: 'Fabrk - Production-ready Next.js SaaS boilerplate',
    url: '/',
    category: 'Marketing',
    type: 'page',
    tags: ['landing', 'home', 'hero'],
  },
  {
    objectID: 'page-features',
    title: 'Features',
    description: 'Complete feature set with 150+ components, authentication, payments, and more',
    url: '/features',
    category: 'Marketing',
    type: 'page',
    tags: ['features', 'capabilities'],
  },
  {
    objectID: 'page-components',
    title: 'Components',
    description: 'Showcase of 25+ production-ready UI components',
    url: '/components',
    category: 'Documentation',
    type: 'page',
    tags: ['ui', 'components', 'showcase'],
  },
  {
    objectID: 'page-templates',
    title: 'Templates',
    description: '8 ready-to-use page templates for common SaaS pages',
    url: '/templates',
    category: 'Documentation',
    type: 'page',
    tags: ['templates', 'pages', 'examples'],
  },
  {
    objectID: 'page-variations',
    title: 'Landing Page Variations',
    description: '4 landing page designs: Neo-Brutalism, Modern, SaaS, Startup',
    url: '/variations',
    category: 'Marketing',
    type: 'page',
    tags: ['landing', 'variations', 'designs'],
  },
  {
    objectID: 'page-about',
    title: 'About',
    description: 'Learn about Fabrk and our mission',
    url: '/about',
    category: 'Marketing',
    type: 'page',
    tags: ['company', 'mission', 'values'],
  },
  {
    objectID: 'page-contact',
    title: 'Contact',
    description: 'Get in touch with our team',
    url: '/contact',
    category: 'Marketing',
    type: 'page',
    tags: ['support', 'contact', 'help'],
  },
  {
    objectID: 'page-dashboard',
    title: 'Dashboard',
    description: 'User dashboard with overview and quick actions',
    url: '/dashboard',
    category: 'Application',
    type: 'page',
    tags: ['dashboard', 'overview', 'app'],
  },
  {
    objectID: 'page-settings',
    title: 'Settings',
    description: 'Account settings and preferences',
    url: '/settings',
    category: 'Application',
    type: 'page',
    tags: ['settings', 'preferences', 'account'],
  },
  {
    objectID: 'page-billing',
    title: 'Billing',
    description: 'Manage payments, invoices, and subscriptions',
    url: '/billing/payment-methods',
    category: 'Application',
    type: 'page',
    tags: ['billing', 'payments', 'subscriptions'],
  },
];

// Components to index
export const components: SearchRecord[] = [
  {
    objectID: 'component-button',
    title: 'Button',
    description: 'Clickable button with multiple variants and sizes',
    url: '/components#button',
    category: 'Forms',
    type: 'component',
    tags: ['button', 'cta', 'action'],
  },
  {
    objectID: 'component-input',
    title: 'Input',
    description: 'Text input field with validation support',
    url: '/components#input',
    category: 'Forms',
    type: 'component',
    tags: ['input', 'form', 'text'],
  },
  {
    objectID: 'component-textarea',
    title: 'Textarea',
    description: 'Multi-line text input for longer content',
    url: '/components#textarea',
    category: 'Forms',
    type: 'component',
    tags: ['textarea', 'form', 'multiline'],
  },
  {
    objectID: 'component-select',
    title: 'Select',
    description: 'Dropdown select with search and multi-select',
    url: '/components#select',
    category: 'Forms',
    type: 'component',
    tags: ['select', 'dropdown', 'picker'],
  },
  {
    objectID: 'component-checkbox',
    title: 'Checkbox',
    description: 'Checkbox for boolean selections',
    url: '/components#checkbox',
    category: 'Forms',
    type: 'component',
    tags: ['checkbox', 'toggle', 'boolean'],
  },
  {
    objectID: 'component-radio',
    title: 'Radio Group',
    description: 'Radio buttons for mutually exclusive options',
    url: '/components#radio',
    category: 'Forms',
    type: 'component',
    tags: ['radio', 'option', 'selection'],
  },
  {
    objectID: 'component-switch',
    title: 'Switch',
    description: 'Toggle switch for on/off states',
    url: '/components#switch',
    category: 'Forms',
    type: 'component',
    tags: ['switch', 'toggle', 'boolean'],
  },
  {
    objectID: 'component-card',
    title: 'Card',
    description: 'Container for grouping related content',
    url: '/components#card',
    category: 'Layout',
    type: 'component',
    tags: ['card', 'container', 'box'],
  },
  {
    objectID: 'component-dialog',
    title: 'Dialog',
    description: 'Modal dialog for focused interactions',
    url: '/components#dialog',
    category: 'Overlay',
    type: 'component',
    tags: ['dialog', 'modal', 'popup'],
  },
  {
    objectID: 'component-alert-dialog',
    title: 'Alert Dialog',
    description: 'Confirmation dialog for important actions',
    url: '/components#alert-dialog',
    category: 'Overlay',
    type: 'component',
    tags: ['alert', 'confirm', 'modal'],
  },
  {
    objectID: 'component-sheet',
    title: 'Sheet',
    description: 'Slide-in panel from screen edges',
    url: '/components#sheet',
    category: 'Overlay',
    type: 'component',
    tags: ['sheet', 'drawer', 'panel'],
  },
  {
    objectID: 'component-toast',
    title: 'Toast',
    description: 'Temporary notifications',
    url: '/components#toast',
    category: 'Feedback',
    type: 'component',
    tags: ['toast', 'notification', 'snackbar'],
  },
  {
    objectID: 'component-alert',
    title: 'Alert',
    description: 'Inline alerts for important messages',
    url: '/components#alert',
    category: 'Feedback',
    type: 'component',
    tags: ['alert', 'message', 'banner'],
  },
  {
    objectID: 'component-badge',
    title: 'Badge',
    description: 'Small label for status or count',
    url: '/components#badge',
    category: 'Data Display',
    type: 'component',
    tags: ['badge', 'label', 'tag'],
  },
  {
    objectID: 'component-avatar',
    title: 'Avatar',
    description: 'User profile image with fallback',
    url: '/components#avatar',
    category: 'Data Display',
    type: 'component',
    tags: ['avatar', 'profile', 'image'],
  },
  {
    objectID: 'component-table',
    title: 'Table',
    description: 'Data table with sorting and pagination',
    url: '/components#table',
    category: 'Data Display',
    type: 'component',
    tags: ['table', 'data', 'grid'],
  },
  {
    objectID: 'component-tabs',
    title: 'Tabs',
    description: 'Tabbed interface for organizing content',
    url: '/components#tabs',
    category: 'Navigation',
    type: 'component',
    tags: ['tabs', 'navigation', 'panels'],
  },
  {
    objectID: 'component-dropdown',
    title: 'Dropdown Menu',
    description: 'Dropdown menu with nested items',
    url: '/components#dropdown',
    category: 'Navigation',
    type: 'component',
    tags: ['dropdown', 'menu', 'navigation'],
  },
  {
    objectID: 'component-progress',
    title: 'Progress',
    description: 'Progress bar for loading states',
    url: '/components#progress',
    category: 'Feedback',
    type: 'component',
    tags: ['progress', 'loading', 'bar'],
  },
  {
    objectID: 'component-separator',
    title: 'Separator',
    description: 'Visual divider between content',
    url: '/components#separator',
    category: 'Layout',
    type: 'component',
    tags: ['separator', 'divider', 'line'],
  },
];

// Templates to index
export const templates: SearchRecord[] = [
  {
    objectID: 'template-analytics',
    title: 'Analytics Dashboard',
    description: 'Dashboard with charts, metrics, and data visualization',
    url: '/templates/analytics-dashboard',
    category: 'Dashboard',
    type: 'template',
    tags: ['analytics', 'charts', 'metrics', 'dashboard'],
  },
  {
    objectID: 'template-team',
    title: 'Team Dashboard',
    description: 'Multi-tenancy with RBAC (Owner/Admin/Member/Guest roles)',
    url: '/templates/team-dashboard',
    category: 'Dashboard',
    type: 'template',
    tags: ['team', 'roles', 'permissions', 'multi-tenant'],
  },
  {
    objectID: 'template-charts',
    title: 'Chart Library',
    description: 'Recharts showcase with line, area, bar, and pie charts',
    url: '/templates/chart-library',
    category: 'Visualization',
    type: 'template',
    tags: ['charts', 'recharts', 'graphs', 'visualization'],
  },
  {
    objectID: 'template-user-management',
    title: 'User Management',
    description: 'Admin panel with data table, sorting, filtering, and pagination',
    url: '/templates/user-management',
    category: 'Admin',
    type: 'template',
    tags: ['admin', 'users', 'management', 'table'],
  },
  {
    objectID: 'template-settings',
    title: 'Settings Page',
    description: '4-tab settings interface (General, Account, Privacy, Billing)',
    url: '/templates/settings-page',
    category: 'Account',
    type: 'template',
    tags: ['settings', 'preferences', 'account'],
  },
  {
    objectID: 'template-billing',
    title: 'Billing Dashboard',
    description: 'Subscription management, usage tracking, payment history',
    url: '/templates/billing-dashboard',
    category: 'Payments',
    type: 'template',
    tags: ['billing', 'subscriptions', 'payments', 'invoices'],
  },
  {
    objectID: 'template-security',
    title: 'Security & Privacy',
    description: '2FA, OAuth, sessions, audit log, GDPR compliance',
    url: '/templates/security-privacy',
    category: 'Security',
    type: 'template',
    tags: ['security', 'privacy', '2fa', 'gdpr', 'audit'],
  },
  {
    objectID: 'template-email',
    title: 'Email Templates',
    description: 'Interactive showcase of 5 transactional emails',
    url: '/templates/email-templates',
    category: 'Communication',
    type: 'template',
    tags: ['email', 'transactional', 'templates'],
  },
  {
    objectID: 'template-docs',
    title: 'Documentation Layout',
    description: '3-column docs site with markdown parsing',
    url: '/templates/documentation-layout',
    category: 'Content',
    type: 'template',
    tags: ['docs', 'documentation', 'markdown', 'layout'],
  },
];

// Combine all search records
export const allSearchRecords: SearchRecord[] = [
  ...pages,
  ...components,
  ...templates,
];

// Helper function to filter records by type
export function getRecordsByType(type: SearchRecord['type']): SearchRecord[] {
  return allSearchRecords.filter((record) => record.type === type);
}

// Helper function to search records locally (for development)
export function searchRecordsLocally(query: string): SearchRecord[] {
  const lowerQuery = query.toLowerCase();
  return allSearchRecords.filter(
    (record) =>
      record.title.toLowerCase().includes(lowerQuery) ||
      record.description.toLowerCase().includes(lowerQuery) ||
      record.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}
