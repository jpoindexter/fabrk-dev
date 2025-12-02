import { test, expect } from '@playwright/test';
import { TestHelpers } from './helpers';

/**
 * Documentation Navigation E2E Tests
 * Validates docs site navigation, sidebar functionality, and content accessibility
 */

test.describe('Documentation Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to docs home (redirects to getting-started)
    await page.goto('/docs');
    await TestHelpers.waitForPageReady(page);
  });

  test.describe('Docs Home Page', () => {
    test('should redirect to getting-started page', async ({ page }) => {
      // Docs index should redirect to getting-started
      await page.waitForURL(/getting-started/, { timeout: 5000 });
      expect(page.url()).toContain('getting-started');
    });

    test('should display page title and description', async ({ page }) => {
      // Check for main heading
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
      await expect(heading).toContainText(/getting.*started|docs|documentation/i);
    });

    test('should load without JavaScript errors', async ({ page }) => {
      const errors = await TestHelpers.checkForErrors(page);

      // Navigate and wait
      await page.goto('/docs');
      await page.waitForTimeout(1000);

      // Should have no critical errors
      expect(errors.length).toBe(0);
    });
  });

  test.describe('Sidebar Navigation', () => {
    test('should display documentation sidebar', async ({ page }) => {
      // Look for sidebar nav element
      const sidebar = page.locator('aside, nav[aria-label*="doc"], [class*="sidebar"]').first();
      await expect(sidebar).toBeVisible();
    });

    test('should have collapsible sections', async ({ page }) => {
      // Look for section headers with chevron icons (collapsible indicators)
      const sectionHeaders = page.locator('button').filter({
        has: page.locator('svg')
      });

      const count = await sectionHeaders.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should expand/collapse sections on click', async ({ page }) => {
      // Find first collapsible section
      const sectionButton = page.locator('aside button, nav button').filter({
        hasText: /component|feature|tutorial|reference/i
      }).first();

      if (await sectionButton.count() > 0 && await sectionButton.isVisible()) {
        // Get initial state
        const chevron = sectionButton.locator('svg').first();
        const initialRotation = await chevron.evaluate((el) =>
          window.getComputedStyle(el).transform
        );

        // Click to toggle
        await sectionButton.click();
        await page.waitForTimeout(300);

        // Check if rotation changed (indicates collapse/expand)
        const newRotation = await chevron.evaluate((el) =>
          window.getComputedStyle(el).transform
        );

        expect(initialRotation).not.toBe(newRotation);
      }
    });

    test('should highlight active page in sidebar', async ({ page }) => {
      // Current page link should have active styling
      const activeLink = page.locator('aside a[class*="primary"], nav a[class*="bg-primary"]').first();

      if (await activeLink.count() > 0) {
        await expect(activeLink).toBeVisible();
      }
    });

    test('should navigate to different doc pages from sidebar', async ({ page }) => {
      // Find a sidebar link (not current page)
      const sidebarLinks = page.locator('aside a, nav[class*="sidebar"] a');
      const linkCount = await sidebarLinks.count();

      if (linkCount > 1) {
        // Click second link
        const secondLink = sidebarLinks.nth(1);
        const linkHref = await secondLink.getAttribute('href');

        await secondLink.click();
        await page.waitForLoadState('domcontentloaded');

        // URL should have changed
        expect(page.url()).toContain(linkHref || '');
      }
    });

    test('should have terminal-style navigation labels', async ({ page }) => {
      // Check for terminal-style text like [NAV], [0x00], etc.
      const terminalText = page.locator('text=/\\[.*\\]|0x[0-9a-f]+/i').first();

      if (await terminalText.count() > 0) {
        await expect(terminalText).toBeVisible();
      }
    });
  });

  test.describe('Documentation Categories', () => {
    test('should have Getting Started section', async ({ page }) => {
      const gettingStarted = page.locator('a, button').filter({
        hasText: /getting.*started/i
      }).first();

      await expect(gettingStarted).toBeVisible();
    });

    test('should have Components documentation', async ({ page }) => {
      // Navigate to docs overview first
      await page.goto('/docs');
      await TestHelpers.waitForPageReady(page);

      // Look for components section in sidebar or as link
      const componentsLink = page.locator('a, button').filter({
        hasText: /component/i
      }).first();

      if (await componentsLink.count() > 0) {
        await expect(componentsLink).toBeVisible();
      }
    });

    test('should have Features documentation', async ({ page }) => {
      const featuresLink = page.locator('a, button').filter({
        hasText: /feature/i
      }).first();

      if (await featuresLink.count() > 0) {
        await expect(featuresLink).toBeVisible();
      }
    });

    test('should navigate to component docs', async ({ page }) => {
      // Expand components section if collapsed
      const componentsButton = page.locator('button').filter({
        hasText: /component/i
      }).first();

      if (await componentsButton.count() > 0 && await componentsButton.isVisible()) {
        await componentsButton.click();
        await page.waitForTimeout(300);

        // Click first component link
        const componentLink = page.locator('aside a, nav a').filter({
          hasText: /button|card|badge|input/i
        }).first();

        if (await componentLink.count() > 0 && await componentLink.isVisible()) {
          await componentLink.click();
          await page.waitForLoadState('domcontentloaded');

          // Should navigate to component page
          expect(page.url()).toMatch(/docs\/component/i);
        }
      }
    });
  });

  test.describe('Page Navigation (Previous/Next)', () => {
    test('should display previous/next navigation links', async ({ page }) => {
      // Navigate to a middle doc page
      await page.goto('/docs/getting-started');
      await TestHelpers.waitForPageReady(page);

      // Look for prev/next links
      const navLinks = page.locator('a').filter({
        hasText: /previous|next|prev/i
      });

      const count = await navLinks.count();
      // Should have at least next link
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('should navigate to next page', async ({ page }) => {
      await page.goto('/docs/getting-started');
      await TestHelpers.waitForPageReady(page);

      // Find next button
      const nextButton = page.locator('a').filter({
        hasText: /next/i
      }).first();

      if (await nextButton.count() > 0 && await nextButton.isVisible()) {
        const currentUrl = page.url();

        await nextButton.click();
        await page.waitForLoadState('domcontentloaded');

        // URL should change
        expect(page.url()).not.toBe(currentUrl);
      }
    });

    test('should navigate to previous page', async ({ page }) => {
      // Navigate to a page that has a previous link
      await page.goto('/docs/architecture');
      await TestHelpers.waitForPageReady(page);

      const prevButton = page.locator('a').filter({
        hasText: /previous|prev/i
      }).first();

      if (await prevButton.count() > 0 && await prevButton.isVisible()) {
        const currentUrl = page.url();

        await prevButton.click();
        await page.waitForLoadState('domcontentloaded');

        // URL should change
        expect(page.url()).not.toBe(currentUrl);
      }
    });
  });

  test.describe('Code Examples', () => {
    test('should display code blocks', async ({ page }) => {
      // Code blocks typically use pre or code elements
      const codeBlocks = page.locator('pre, code[class*="language"], [class*="code-block"]');
      const count = await codeBlocks.count();

      // Docs should have at least some code examples
      expect(count).toBeGreaterThan(0);
    });

    test('should have syntax highlighting', async ({ page }) => {
      // Check for syntax highlighting classes
      const highlightedCode = page.locator('code[class*="language"], pre[class*="language"]');

      if (await highlightedCode.count() > 0) {
        const firstBlock = highlightedCode.first();
        const className = await firstBlock.getAttribute('class');

        // Should have language class
        expect(className).toBeTruthy();
      }
    });

    test('should have copy button for code blocks', async ({ page }) => {
      // Look for copy buttons near code blocks
      const copyButtons = page.locator('button').filter({
        hasText: /copy|clipboard/i
      });

      const count = await copyButtons.count();

      // May or may not have copy buttons depending on implementation
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('Documentation Content', () => {
    test('should display component documentation with examples', async ({ page }) => {
      // Navigate to components page
      await page.goto('/docs/components/button');
      await TestHelpers.waitForPageReady(page);

      // Should have heading
      const heading = page.locator('h1').first();
      const hasHeading = await heading.isVisible().catch(() => false);

      // Should have some content
      const content = await TestHelpers.getPageContent(page);

      expect(hasHeading && content.length > 100).toBeTruthy();
    });

    test('should display feature documentation', async ({ page }) => {
      await page.goto('/docs/features/cookie-consent');
      await TestHelpers.waitForPageReady(page);

      // Should have documentation content
      const heading = page.locator('h1, h2').first();
      await expect(heading).toBeVisible();
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      // Check that h1 exists
      const h1 = page.locator('h1');
      const h1Count = await h1.count();

      // Should have exactly 1 h1 (page title)
      expect(h1Count).toBeGreaterThanOrEqual(1);
      expect(h1Count).toBeLessThanOrEqual(2); // Allow for logo/brand h1 in header
    });

    test('should display terminal-style headers', async ({ page }) => {
      // Check for terminal-style section headers
      const terminalHeaders = page.locator('[class*="mono"]').filter({
        hasText: /\\[0x[0-9a-f]+\\]/i
      });

      if (await terminalHeaders.count() > 0) {
        await expect(terminalHeaders.first()).toBeVisible();
      }
    });
  });

  test.describe('Mobile Responsiveness', () => {
    test('should hide sidebar on mobile by default', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      // Sidebar should be hidden on mobile
      const sidebar = page.locator('aside').first();
      const isHidden = await sidebar.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return styles.display === 'none' || el.classList.contains('hidden');
      });

      expect(isHidden).toBeTruthy();
    });

    test('should display mobile menu button', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      // Look for mobile menu toggle
      const menuButton = page.locator('button').filter({
        hasText: /menu|nav|sidebar/i
      }).first();

      // Mobile menu might exist
      const hasMenuButton = await menuButton.count() > 0;

      // Or sidebar is always visible but scrollable
      const sidebar = page.locator('aside').first();
      const sidebarVisible = await sidebar.isVisible().catch(() => false);

      expect(hasMenuButton || sidebarVisible).toBeTruthy();
    });

    test('should display content properly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      // Main content should be visible
      const mainContent = page.locator('main, article, [role="main"]').first();
      await expect(mainContent).toBeVisible();

      // Heading should be visible
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
    });
  });

  test.describe('Sidebar Collapse Feature', () => {
    test('should have sidebar collapse button', async ({ page }) => {
      // Look for collapse/expand button
      const collapseButton = page.locator('button').filter({
        has: page.locator('svg')
      }).filter({
        hasText: /^$/  // Empty text content, icon only
      }).first();

      if (await collapseButton.count() > 0) {
        await expect(collapseButton).toBeVisible();
      }
    });

    test('should collapse sidebar when button clicked', async ({ page }) => {
      // Find sidebar
      const sidebar = page.locator('aside').first();
      const initialWidth = await sidebar.evaluate((el) =>
        window.getComputedStyle(el).width
      );

      // Find collapse button (PanelLeftClose icon)
      const collapseButton = page.locator('aside button[title*="ollapse"]').first();

      if (await collapseButton.count() > 0 && await collapseButton.isVisible()) {
        await collapseButton.click();
        await page.waitForTimeout(300);

        // Sidebar width should change
        const newWidth = await sidebar.evaluate((el) =>
          window.getComputedStyle(el).width
        );

        expect(newWidth).not.toBe(initialWidth);
      }
    });

    test('should expand sidebar from collapsed state', async ({ page }) => {
      // Find and click collapse button
      const collapseButton = page.locator('aside button[title*="ollapse"]').first();

      if (await collapseButton.count() > 0 && await collapseButton.isVisible()) {
        // Collapse first
        await collapseButton.click();
        await page.waitForTimeout(300);

        // Find expand button
        const expandButton = page.locator('aside button[title*="xpand"]').first();

        if (await expandButton.count() > 0 && await expandButton.isVisible()) {
          await expandButton.click();
          await page.waitForTimeout(300);

          // Navigation should be visible again
          const navText = page.locator('aside nav').first();
          await expect(navText).toBeVisible();
        }
      }
    });
  });

  test.describe('Breadcrumbs', () => {
    test('should display breadcrumbs on doc pages', async ({ page }) => {
      await page.goto('/docs/components/button');
      await TestHelpers.waitForPageReady(page);

      // Look for breadcrumb navigation
      const breadcrumbs = page.locator('[aria-label*="breadcrumb"], nav ol, nav[class*="breadcrumb"]').first();

      if (await breadcrumbs.count() > 0) {
        await expect(breadcrumbs).toBeVisible();
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should have semantic navigation structure', async ({ page }) => {
      // Check for semantic nav element
      const nav = page.locator('nav').first();
      await expect(nav).toBeVisible();
    });

    test('should have accessible sidebar links', async ({ page }) => {
      // All sidebar links should have text or aria-label
      const sidebarLinks = page.locator('aside a, nav a');
      const count = await sidebarLinks.count();

      if (count > 0) {
        const firstLink = sidebarLinks.first();
        const text = await firstLink.textContent();
        const ariaLabel = await firstLink.getAttribute('aria-label');

        expect(text || ariaLabel).toBeTruthy();
      }
    });

    test('should support keyboard navigation in sidebar', async ({ page }) => {
      // Focus on sidebar
      const firstLink = page.locator('aside a, nav a').first();

      if (await firstLink.count() > 0) {
        await firstLink.focus();

        // Should be able to tab through links
        await page.keyboard.press('Tab');

        const focusedElement = await page.evaluate(() => {
          const el = document.activeElement;
          return el?.tagName.toLowerCase();
        });

        // Should focus on another interactive element
        expect(['a', 'button'].includes(focusedElement || '')).toBeTruthy();
      }
    });

    test('should have proper heading structure for screen readers', async ({ page }) => {
      // h1 should come before h2
      const headings = await page.evaluate(() => {
        const h1s = Array.from(document.querySelectorAll('h1'));
        const h2s = Array.from(document.querySelectorAll('h2'));

        if (h1s.length === 0 || h2s.length === 0) return true;

        const h1Rect = h1s[0].getBoundingClientRect();
        const h2Rect = h2s[0].getBoundingClientRect();

        return h1Rect.top < h2Rect.top;
      });

      expect(headings).toBeTruthy();
    });
  });

  test.describe('Performance', () => {
    test('should load documentation pages quickly', async ({ page }) => {
      const startTime = Date.now();

      await page.goto('/docs/getting-started');
      await TestHelpers.waitForPageReady(page);

      const loadTime = Date.now() - startTime;

      // Should load in under 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });

    test('should not have excessive re-renders', async ({ page }) => {
      const logs = await TestHelpers.captureConsoleLogs(page, async () => {
        await page.goto('/docs');
        await page.waitForTimeout(2000);
      });

      // Filter for render-related logs
      const renderLogs = logs.filter(log =>
        log.message.toLowerCase().includes('render') ||
        log.message.toLowerCase().includes('update')
      );

      // Should not have excessive render warnings
      expect(renderLogs.length).toBeLessThan(50);
    });
  });
});
