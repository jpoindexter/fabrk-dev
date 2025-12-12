#!/usr/bin/env node
/**
 * Migration Script: Add LibraryNavigation to all template pages
 * Adds breadcrumbs and back button to every library template
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Template metadata from library-data.ts
const TEMPLATES = [
  { id: 'analytics-dashboard', name: 'Analytics Dashboard', category: 'dashboard', categoryName: 'Dashboards', done: true },
  { id: 'user-management', name: 'User Management', category: 'admin', categoryName: 'Admin Panels' },
  { id: 'settings-page', name: 'Settings Page', category: 'account', categoryName: 'Account Pages' },
  { id: 'billing-dashboard', name: 'Billing Dashboard', category: 'account', categoryName: 'Account Pages' },
  { id: 'email-templates', name: 'Email Templates', category: 'marketing', categoryName: 'Marketing' },
  { id: 'documentation', name: 'Documentation Layout', category: 'marketing', categoryName: 'Marketing' },
  { id: 'team-dashboard', name: 'Team Dashboard', category: 'dashboard', categoryName: 'Dashboards' },
  { id: 'security-privacy', name: 'Security & Privacy', category: 'account', categoryName: 'Account Pages' },
  { id: 'sign-in', name: 'Sign In', category: 'auth', categoryName: 'Authentication', path: 'authentication/sign-in' },
  { id: 'sign-up', name: 'Sign Up', category: 'auth', categoryName: 'Authentication', path: 'authentication/sign-up' },
  { id: 'forgot-password', name: 'Forgot Password', category: 'auth', categoryName: 'Authentication', path: 'authentication/forgot-password' },
  { id: 'two-factor', name: 'Two-Factor Auth', category: 'auth', categoryName: 'Authentication', path: 'authentication/two-factor' },
  { id: 'pricing-page', name: 'Pricing Page', category: 'marketing', categoryName: 'Marketing' },
  { id: 'blog', name: 'Blog', category: 'marketing', categoryName: 'Marketing' },
  { id: 'blog-post', name: 'Blog Post', category: 'marketing', categoryName: 'Marketing', path: 'blog/post' },
  { id: 'landing-variations', name: 'Landing Variations', category: 'marketing', categoryName: 'Marketing' },
  { id: 'onboarding', name: 'Onboarding Flow', category: 'ux', categoryName: 'User Experience' },
  { id: 'profile', name: 'Profile Page', category: 'ux', categoryName: 'User Experience' },
  { id: 'notifications', name: 'Notifications Center', category: 'ux', categoryName: 'User Experience' },
  { id: 'search-results', name: 'Search Results', category: 'ux', categoryName: 'User Experience' },
  { id: 'error-pages', name: 'Error Pages', category: 'patterns', categoryName: 'Patterns' },
  { id: 'empty-states', name: 'Empty States', category: 'patterns', categoryName: 'Patterns' },
  { id: 'modals', name: 'Modal Patterns', category: 'patterns', categoryName: 'Patterns' },
  { id: 'ai-forms', name: 'AI Form Generator', category: 'patterns', categoryName: 'Patterns', done: true },
];

// Category href mapping
const CATEGORY_HREFS = {
  dashboard: '/library/dashboards',
  admin: '/library/admin-panels',
  account: '/library/account-pages',
  marketing: '/library/marketing',
  auth: '/library/authentication',
  ux: '/library', // No dedicated UX category page
  patterns: '/library', // No dedicated Patterns category page
};

function addLibraryNavigation(template) {
  const { id, name, category, categoryName, path, done } = template;

  if (done) {
    console.log(`✓ ${id} - Already updated, skipping`);
    return;
  }

  const filePath = join(
    process.cwd(),
    'src/app/(marketing)/library',
    path || id,
    'page.tsx'
  );

  try {
    let content = readFileSync(filePath, 'utf-8');

    // Check if already has LibraryNavigation
    if (content.includes('LibraryNavigation')) {
      console.log(`✓ ${id} - Already has navigation, skipping`);
      return;
    }

    // Step 1: Add import if not present
    if (!content.includes("from '@/components/library'")) {
      // Find a good spot to add the import (after other component imports)
      const importPattern = /import \{ [^}]+ \} from '@\/components\/ui\/[^']+';/g;
      const matches = [...content.matchAll(importPattern)];

      if (matches.length > 0) {
        const lastImportMatch = matches[matches.length - 1];
        const insertPosition = lastImportMatch.index + lastImportMatch[0].length;
        const newImport = "\nimport { LibraryNavigation } from '@/components/library';";
        content = content.slice(0, insertPosition) + newImport + content.slice(insertPosition);
      }
    }

    // Step 2: Add LibraryNavigation component before TemplatePageHeader
    // Match the pattern more flexibly to catch variations in formatting
    const headerPattern = /(space-y-6[^>]*?>\s*)({\s*\/\*\s*Header\s*\*\/\s*}\s*)?(<TemplatePageHeader)/s;

    if (headerPattern.test(content)) {
      const categoryHref = CATEGORY_HREFS[category];
      const showCategory = category !== 'ux' && category !== 'patterns'; // Only show category if it has a page

      const navigationBlock = showCategory
        ? `{/* Navigation */}
        <LibraryNavigation
          templateName="${name}"
          category="${categoryName}"
          categoryHref="${categoryHref}"
        />

        {/* Header */}
        $3`
        : `{/* Navigation */}
        <LibraryNavigation
          templateName="${name}"
        />

        {/* Header */}
        $3`;

      content = content.replace(headerPattern, `$1${navigationBlock}`);

      // Write the updated content
      writeFileSync(filePath, content, 'utf-8');
      console.log(`✓ ${id} - Updated successfully`);
    } else {
      console.log(`⚠ ${id} - Could not find TemplatePageHeader pattern`);
    }
  } catch (error) {
    console.error(`✗ ${id} - Error: ${error.message}`);
  }
}

// Run migration
console.log('\n🔧 Adding LibraryNavigation to all template pages...\n');

let updated = 0;
let skipped = 0;
let errors = 0;

for (const template of TEMPLATES) {
  try {
    addLibraryNavigation(template);
    if (!template.done) updated++;
  } catch (error) {
    errors++;
    console.error(`✗ ${template.id} - ${error.message}`);
  }
}

console.log(`\n✅ Migration complete!`);
console.log(`   Updated: ${updated}`);
console.log(`   Skipped: ${TEMPLATES.filter(t => t.done).length}`);
console.log(`   Errors: ${errors}\n`);
