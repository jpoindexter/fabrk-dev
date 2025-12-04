import { test, expect } from '@playwright/test';

/**
 * DOCS COMPONENT PAGES VISUAL REGRESSION
 *
 * Tests all 98 component documentation pages in /docs/components/
 *
 * Run: npm run test:visual
 * Update baselines: npm run test:visual:update
 */

test.describe('Docs - Components (98 pages)', () => {
  const componentPages = [
    'accordion',
    'activity-timeline',
    'alert',
    'alert-dialog',
    'aspect-ratio',
    'autocomplete',
    'avatar',
    'avatar-group',
    'badge',
    'banner',
    'breadcrumb',
    'button',
    'calendar',
    'card',
    'checkbox',
    'code-block',
    'code-generator',
    'collapsible',
    'color-picker',
    'combobox',
    'command',
    'container',
    'context-menu',
    'copy-button',
    'cropper',
    'cropper-controls',
    'data-table-header',
    'date-picker',
    'dialog',
    'donut-chart',
    'dropdown-menu',
    'empty-state',
    'faq',
    'features',
    'field',
    'file-upload',
    'footer',
    'form',
    'form-error',
    'funnel-chart',
    'gauge',
    'grid',
    'heatmap',
    'hero',
    'hover-card',
    'image-dropzone',
    'image-uploader',
    'input',
    'input-group',
    'input-number',
    'input-otp',
    'input-password',
    'input-search',
    'invite-form',
    'kpi-card',
    'label',
    'lightbox',
    'loading',
    'markdown-editor',
    'markdown-viewer',
    'member-card',
    'menubar',
    'multi-select',
    'multi-step-form',
    'navigation',
    'navigation-menu',
    'notification-badge',
    'notification-center',
    'notification-list',
    'overview',
    'page-wrapper',
    'pagination',
    'password-strength',
    'pie-chart',
    'popover',
    'pricing',
    'progress',
    'prompt-builder',
    'radio-group',
    'rating',
    'rich-text-editor',
    'role-selector',
    'scroll-area',
    'section',
    'select',
    'separator',
    'sheet',
    'sidebar',
    'simple-icon',
    'skeleton',
    'slider',
    'sparkline',
    'stack',
    'stat-card',
    'status-indicator',
    'switch',
    'table',
    'tabs',
    'testimonials',
    'textarea',
    'time-picker',
    'toast',
    'toaster',
    'tooltip',
    'typography',
  ];

  // Test overview page separately
  test('Component Overview', async ({ page }) => {
    await page.goto('/docs/components/overview');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('docs-components-overview.png', {
      fullPage: true,
      animations: 'disabled',
      maxDiffPixels: 100,
    });
  });

  // Test all individual component pages
  for (const componentName of componentPages) {
    test(`Component: ${componentName}`, async ({ page }) => {
      await page.goto(`/docs/components/${componentName}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(300);

      await expect(page).toHaveScreenshot(`docs-component-${componentName}.png`, {
        fullPage: true,
        animations: 'disabled',
        maxDiffPixels: 150, // Higher tolerance for interactive components
      });
    });
  }
});

// ============================================================================
// COMPONENT TERMINAL STYLE VALIDATION
// ============================================================================

test.describe('Component Pages Terminal Style', () => {
  // Sample 10 component pages for terminal style validation
  const sampleComponents = [
    'button',
    'input',
    'card',
    'select',
    'textarea',
    'dialog',
    'dropdown-menu',
    'table',
    'form',
    'badge',
  ];

  for (const componentName of sampleComponents) {
    test(`Terminal Check: ${componentName}`, async ({ page }) => {
      await page.goto(`/docs/components/${componentName}`);
      await page.waitForLoadState('networkidle');

      // Verify DocsCard has title (terminal header)
      const docsCards = await page.locator('[class*="DocsCard"]').count();
      if (docsCards > 0) {
        // Check if cards have proper terminal headers
        const cardsWithHeaders = await page.locator('[class*="DocsCard"] [class*="border-b"]').count();
        expect(cardsWithHeaders, `DocsCard components on ${componentName} should have terminal headers`).toBeGreaterThan(0);
      }

      // Check for banned rounded classes in preview sections
      const bannedRoundedInPreview = await page.locator('[class*="preview"] button.rounded-sm, [class*="preview"] button.rounded-md, [class*="preview"] button.rounded-lg').count();
      expect(bannedRoundedInPreview, `Found buttons with banned rounded classes in preview on ${componentName}`).toBe(0);

      // Verify font-mono is used for terminal elements
      const terminalElements = await page.locator('[class*="font-mono"]').count();
      expect(terminalElements, `${componentName} should have font-mono elements for terminal aesthetic`).toBeGreaterThan(0);
    });
  }
});
