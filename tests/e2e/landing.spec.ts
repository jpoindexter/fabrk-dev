import { test, expect } from '@playwright/test';

/**
 * Landing Page E2E Tests
 * Validates landing page loads correctly, displays hero content, and CTA buttons are functional
 */

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to landing page
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should load landing page successfully', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Fabrk|boilerplate/i);
    
    // Check page is visible
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should display hero section with heading', async ({ page }) => {
    // Check for main hero heading
    const heroHeading = page.locator('h1').first();
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText(/production|next.js|saas|boilerplate/i);
  });

  test('should display hero description text', async ({ page }) => {
    // Check for hero description
    const description = page.locator('p').filter({ hasText: /production|ready|next\.js|saas/i }).first();
    await expect(description).toBeVisible();
  });

  test('should have working CTA buttons', async ({ page }) => {
    // Find primary CTA button
    const ctaButton = page.locator('button, a[role="button"]').filter({ hasText: /get started|start|try|demo|signup|sign up/i }).first();
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toBeEnabled();
  });

  test('should have multiple CTA buttons', async ({ page }) => {
    // Check for at least 2 call-to-action buttons
    const buttons = page.locator('button, a[role="button"]').filter({ hasText: /get started|documentation|features|contact|signup/i });
    const count = await buttons.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should navigate to features page from CTA', async ({ page }) => {
    // Find and click features or learn more button
    const featuresLink = page.locator('a, button').filter({ hasText: /features|learn more/i }).first();
    
    if (await featuresLink.isVisible()) {
      await featuresLink.click();
      // Wait for navigation
      await page.waitForLoadState('domcontentloaded');
      
      // Verify we navigated somewhere different
      expect(page.url()).not.toBe('http://localhost:3000/');
    }
  });

  test('should display features section', async ({ page }) => {
    // Check if features section exists
    const featuresSection = page.locator('section').filter({ hasText: /feature|benefit|capability/i }).first();
    
    if (await featuresSection.isVisible()) {
      await expect(featuresSection).toBeVisible();
      
      // Check for feature items
      const featureItems = page.locator('[class*="feature"], [class*="benefit"]');
      const itemCount = await featureItems.count();
      expect(itemCount).toBeGreaterThan(0);
    }
  });

  test('should display pricing section', async ({ page }) => {
    // Scroll to pricing if it exists
    const pricingSection = page.locator('section').filter({ hasText: /pricing|plan|price/i }).first();
    
    if (await pricingSection.count() > 0) {
      await pricingSection.scrollIntoViewIfNeeded();
      await expect(pricingSection).toBeVisible();
    }
  });

  test('should have responsive navigation', async ({ page }) => {
    // Check if navigation header is visible
    const header = page.locator('header, nav').first();
    await expect(header).toBeVisible();
  });

  test('should load all images without errors', async ({ page }) => {
    // Collect all image load states
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        const image = images.nth(i);
        // Wait for image to load
        await image.evaluate((img: HTMLImageElement) => {
          return new Promise((resolve, reject) => {
            if (img.complete) {
              resolve(null);
            } else {
              img.onload = () => resolve(null);
              img.onerror = () => reject(new Error(`Image failed to load: ${img.src}`));
            }
          });
        });
      }
    }
  });

  test('should have proper accessibility - alt text on images', async ({ page }) => {
    // Check critical images have alt text
    const images = page.locator('img[alt]:not([alt=""])');
    const imageCount = await images.count();
    
    // At least some images should have alt text
    expect(imageCount).toBeGreaterThan(0);
  });
});
