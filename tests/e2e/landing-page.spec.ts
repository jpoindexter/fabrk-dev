import { test, expect } from "@playwright/test";

/**
 * Basic E2E test for landing page
 * Tests that the homepage loads and displays key content
 */
test.describe("Landing Page", () => {
  test("should load successfully", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");

    // Check that the page loaded
    await expect(page).toHaveTitle(/Fabrk/i);

    // Verify the page is visible
    await expect(page.locator("body")).toBeVisible();
  });

  test("should display main heading", async ({ page }) => {
    await page.goto("/");

    // Look for a main heading (h1)
    const heading = page.locator("h1").first();
    await expect(heading).toBeVisible();
  });

  test("should have navigation", async ({ page }) => {
    await page.goto("/");

    // Check for common navigation elements
    const nav = page.locator("nav, header").first();
    await expect(nav).toBeVisible();
  });
});
