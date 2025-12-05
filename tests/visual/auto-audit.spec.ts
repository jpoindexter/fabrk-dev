import { test, expect } from '@playwright/test';

// List of high-priority pages to visually audit
const pagesToAudit = [
  '/',
  '/pricing',
  '/contact',
  '/templates/billing-dashboard',
  '/templates/team-dashboard',
  '/templates/profile',
  '/templates/settings-page',
  '/templates/security-privacy',
  '/templates/user-management',
  '/templates/analytics-dashboard',
  '/templates/email-templates',
  '/templates/documentation',
  '/docs/components/card',
  '/docs/components/button',
];

test.describe('Automated Visual Audit', () => {
  for (const path of pagesToAudit) {
    test(`snapshot of ${path}`, async ({ page }) => {
      await page.goto(path);
      
      // Wait for fonts and critical content to load
      await page.waitForLoadState('networkidle');

      // Special handling for homepage animations (terminal typing)
      if (path === '/') {
        await page.waitForTimeout(10000); // Wait for terminal demo to finish
      }
      
      // Take a full page snapshot
      await expect(page).toHaveScreenshot({ 
        fullPage: true,
        animations: 'disabled',
        mask: [page.locator('.animate-spin')] // Mask loading spinners if any
      });
    });
  }
});
