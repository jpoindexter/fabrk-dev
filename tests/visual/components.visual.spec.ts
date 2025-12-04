import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests for Component Documentation Pages
 *
 * These tests capture full-page screenshots and compare them against baselines.
 * Run `npm run test:visual:update` to create/update baseline snapshots.
 */

const componentPages = [
  '/docs/components/accordion',
  '/docs/components/activity-timeline',
  '/docs/components/alert',
  '/docs/components/alert-dialog',
  '/docs/components/aspect-ratio',
  '/docs/components/autocomplete',
  '/docs/components/avatar',
  '/docs/components/avatar-group',
  '/docs/components/badge',
  '/docs/components/banner',
  '/docs/components/breadcrumb',
  '/docs/components/button',
  '/docs/components/calendar',
  '/docs/components/card',
  '/docs/components/checkbox',
  '/docs/components/code-block',
  '/docs/components/code-generator',
  '/docs/components/collapsible',
  '/docs/components/color-picker',
  '/docs/components/combobox',
  '/docs/components/command',
  '/docs/components/container',
  '/docs/components/context-menu',
  '/docs/components/copy-button',
  '/docs/components/cropper',
  '/docs/components/cropper-controls',
  '/docs/components/data-table-header',
  '/docs/components/date-picker',
  '/docs/components/dialog',
  '/docs/components/donut-chart',
  '/docs/components/dropdown-menu',
  '/docs/components/empty-state',
  '/docs/components/faq',
  '/docs/components/features',
  '/docs/components/field',
  '/docs/components/file-upload',
  '/docs/components/footer',
  '/docs/components/form',
  '/docs/components/form-error',
  '/docs/components/funnel-chart',
  '/docs/components/gauge',
  '/docs/components/grid',
  '/docs/components/heatmap',
  '/docs/components/hero',
  '/docs/components/hover-card',
  '/docs/components/image-dropzone',
  '/docs/components/image-uploader',
  '/docs/components/input',
  '/docs/components/input-group',
  '/docs/components/input-number',
  '/docs/components/input-otp',
  '/docs/components/input-password',
  '/docs/components/input-search',
  '/docs/components/invite-form',
  '/docs/components/kpi-card',
  '/docs/components/label',
  '/docs/components/lightbox',
  '/docs/components/loading',
  '/docs/components/markdown-editor',
  '/docs/components/markdown-viewer',
  '/docs/components/member-card',
  '/docs/components/menubar',
  '/docs/components/multi-select',
  '/docs/components/multi-step-form',
  '/docs/components/navigation',
  '/docs/components/navigation-menu',
  '/docs/components/notification-badge',
  '/docs/components/notification-center',
  '/docs/components/notification-list',
  '/docs/components/overview',
  '/docs/components/page-wrapper',
  '/docs/components/pagination',
  '/docs/components/password-strength',
  '/docs/components/pie-chart',
  '/docs/components/popover',
  '/docs/components/pricing',
  '/docs/components/progress',
  '/docs/components/prompt-builder',
  '/docs/components/radio-group',
  '/docs/components/rating',
  '/docs/components/rich-text-editor',
  '/docs/components/role-selector',
  '/docs/components/scroll-area',
  '/docs/components/section',
  '/docs/components/select',
  '/docs/components/separator',
  '/docs/components/sheet',
  '/docs/components/sidebar',
  '/docs/components/simple-icon',
  '/docs/components/skeleton',
  '/docs/components/slider',
  '/docs/components/sparkline',
  '/docs/components/stack',
  '/docs/components/stat-card',
  '/docs/components/status-indicator',
  '/docs/components/switch',
  '/docs/components/table',
  '/docs/components/tabs',
  '/docs/components/testimonials',
  '/docs/components/textarea',
  '/docs/components/time-picker',
  '/docs/components/toast',
  '/docs/components/toaster',
  '/docs/components/tooltip',
  '/docs/components/typography',
];

test.describe('Component Docs Visual Regression', () => {
  for (const url of componentPages) {
    test(`visual: ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');

      // Wait for any animations to complete
      await page.waitForTimeout(500);

      const screenshotName = `component${url.replace(/\//g, '-')}.png`;
      await expect(page).toHaveScreenshot(screenshotName, {
        fullPage: true,
        animations: 'disabled',
      });
    });
  }
});
