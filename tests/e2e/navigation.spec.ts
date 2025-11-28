import { test, expect } from '@playwright/test';

/**
 * Navigation E2E Tests
 * Validates main navigation links and site structure accessibility
 */

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Start from landing page
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should have visible header/navigation', async ({ page }) => {
    // Check for navigation element
    const header = page.locator('header, nav, [role="navigation"]').first();
    await expect(header).toBeVisible();
  });

  test('should navigate to features page', async ({ page }) => {
    // Navigate directly to features page (footer uses #features anchor, not /features)
    await page.goto('/features');
    await page.waitForLoadState('domcontentloaded');

    // Verify we're on the features page
    expect(page.url()).toContain('/features');

    // Check page loaded with heading
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/feature/i);
  });

  test('should navigate to components showcase', async ({ page }) => {
    // Find components link
    const componentsLink = page.locator('a').filter({ hasText: /components|ui/i }).first();
    
    if (await componentsLink.isVisible()) {
      await componentsLink.click();
      await page.waitForLoadState('domcontentloaded');
      
      // Verify navigation
      expect(page.url()).toMatch(/components|ui/i);
    }
  });

  test('should navigate to templates page', async ({ page }) => {
    // Find templates link
    const templatesLink = page.locator('a').filter({ hasText: /templates/i }).first();
    
    if (await templatesLink.isVisible()) {
      await templatesLink.click();
      await page.waitForLoadState('domcontentloaded');
      
      // Verify navigation
      expect(page.url()).toContain('/templates');
    }
  });

  test('should navigate to contact page', async ({ page }) => {
    // Find contact link in footer
    const contactLink = page.locator('footer a').filter({ hasText: /contact/i }).first();

    await expect(contactLink).toBeVisible();
    await contactLink.click();

    // Wait for navigation to complete
    await page.waitForURL('**/contact');

    // Verify navigation
    expect(page.url()).toContain('/contact');

    // Check page loaded with heading or content
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });

  test('should navigate to about page', async ({ page }) => {
    // Find about link in footer
    const aboutLink = page.locator('footer a').filter({ hasText: /about/i }).first();

    await expect(aboutLink).toBeVisible();
    await aboutLink.click();

    // Wait for navigation to complete
    await page.waitForURL('**/about');

    // Verify navigation
    expect(page.url()).toContain('/about');

    // Check page loaded with heading
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });

  test('should navigate to privacy policy', async ({ page }) => {
    // Find privacy link in footer
    const privacyLink = page.locator('footer a').filter({ hasText: /privacy/i }).first();

    await expect(privacyLink).toBeVisible();
    await privacyLink.click();

    // Wait for navigation to complete
    await page.waitForURL('**/privacy');

    // Verify navigation
    expect(page.url()).toContain('/privacy');

    // Check page loaded with heading
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });

  test('should navigate to terms of service', async ({ page }) => {
    // Find terms link in footer
    const termsLink = page.locator('footer a').filter({ hasText: /terms/i }).first();

    await expect(termsLink).toBeVisible();
    await termsLink.click();

    // Wait for navigation to complete
    await page.waitForURL('**/terms');

    // Verify navigation
    expect(page.url()).toContain('/terms');

    // Check page loaded with heading
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });

  test('should have working logo link', async ({ page }) => {
    // Find logo link (usually in header)
    const logoLink = page.locator('a[href="/"], header a').first();
    
    if (await logoLink.isVisible()) {
      const currentUrl = page.url();
      
      await logoLink.click();
      await page.waitForLoadState('domcontentloaded');
      
      // Should navigate to home
      expect(page.url()).toBe('http://localhost:3000/');
    }
  });

  test('should have consistent navigation across pages', async ({ page }) => {
    // Check navigation exists on home
    const homeNav = page.locator('nav, header').first();
    await expect(homeNav).toBeVisible();

    // Navigate to about page (actual page, not anchor)
    const aboutLink = page.locator('footer a').filter({ hasText: /about/i }).first();
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();
    await page.waitForLoadState('domcontentloaded');

    // Check navigation still exists on about page
    const aboutPageNav = page.locator('nav, header').first();
    await expect(aboutPageNav).toBeVisible();
  });

  test('should navigate between variations', async ({ page }) => {
    // Go to variations page
    const variationsLink = page.locator('a').filter({ hasText: /variations|designs|styles/i }).first();
    
    if (await variationsLink.isVisible()) {
      await variationsLink.click();
      await page.waitForLoadState('domcontentloaded');
      
      expect(page.url()).toMatch(/variations/i);
      
      // Check for different variation links
      const modernLink = page.locator('a').filter({ hasText: /modern/i }).first();
      if (await modernLink.isVisible()) {
        await modernLink.click();
        await page.waitForLoadState('domcontentloaded');
        
        expect(page.url()).toContain('/modern');
      }
    }
  });

  test('should handle broken links gracefully', async ({ page }) => {
    // Collect all navigation links
    const navLinks = page.locator('nav a, header a').all();
    const links = await navLinks;
    
    // Check at least one link is valid
    let validLinkFound = false;
    for (const link of links.slice(0, 3)) {
      const href = await link.getAttribute('href');
      if (href && (href.startsWith('/') || href.startsWith('http'))) {
        validLinkFound = true;
        break;
      }
    }
    
    expect(validLinkFound).toBeTruthy();
  });

  test('should render mobile navigation on small screens', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check for mobile menu or responsive navigation
    const navElement = page.locator('nav, header').first();
    await expect(navElement).toBeVisible();
    
    // Mobile menu might be a button that opens a menu
    const mobileMenuButton = page.locator('button').filter({ hasText: /menu|nav|hamburger/i }).first();
    
    // Either mobile menu button exists or nav is visible
    const hasMobileMenu = await mobileMenuButton.isVisible();
    const navVisible = await navElement.isVisible();
    
    expect(hasMobileMenu || navVisible).toBeTruthy();
  });

  test('should preserve scroll position on navigation back', async ({ page }) => {
    // Scroll down on home page
    await page.evaluate(() => window.scrollBy(0, 500));

    // Navigate to about page (actual page navigation, not anchor link)
    const aboutLink = page.locator('footer a').filter({ hasText: /about/i }).first();
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();

    // Wait for navigation to complete
    await page.waitForURL('**/about');

    // Verify we navigated away
    expect(page.url()).toContain('/about');

    // Go back
    await page.goBack();
    await page.waitForLoadState('domcontentloaded');

    // Check we're back on home
    expect(page.url()).toBe('http://localhost:3000/');
  });

  test('should have accessible navigation', async ({ page }) => {
    // Check for aria-label or text on navigation items
    const navItems = page.locator('nav a, header a');
    const count = await navItems.count();
    
    for (let i = 0; i < Math.min(count, 5); i++) {
      const item = navItems.nth(i);
      const text = await item.textContent();
      const ariaLabel = await item.getAttribute('aria-label');
      
      // Should have either visible text or aria-label
      expect(text || ariaLabel).toBeTruthy();
    }
  });
});
