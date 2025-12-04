import { test, expect } from "@playwright/test";

/**
 * Visual Regression Tests for Component Showcase
 *
 * Run with: npx playwright test tests/visual/
 * Update snapshots: npx playwright test tests/visual/ --update-snapshots
 */

test.describe("Component Showcase Visual Regression", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to component showcase
    await page.goto("/component-showcase");
    // Wait for page to fully load
    await page.waitForLoadState("networkidle");
  });

  test("full page snapshot", async ({ page }) => {
    // Take full page screenshot
    await expect(page).toHaveScreenshot("component-showcase-full.png", {
      fullPage: true,
      // Allow some tolerance for anti-aliasing differences
      maxDiffPixels: 100,
    });
  });

  test("buttons section", async ({ page }) => {
    const section = page.locator("section").filter({ hasText: "BUTTONS" }).first();
    await expect(section).toBeVisible();
    await expect(section).toHaveScreenshot("buttons-section.png");
  });

  test("form inputs section", async ({ page }) => {
    const section = page.locator("section").filter({ hasText: "FORM_INPUTS" }).first();
    await expect(section).toBeVisible();
    await expect(section).toHaveScreenshot("form-inputs-section.png");
  });

  test("selection controls section", async ({ page }) => {
    const section = page.locator("section").filter({ hasText: "SELECTION_CONTROLS" }).first();
    await expect(section).toBeVisible();
    await expect(section).toHaveScreenshot("selection-controls-section.png");
  });

  test("badges section", async ({ page }) => {
    const section = page.locator("section").filter({ hasText: "BADGES" }).first();
    await expect(section).toBeVisible();
    await expect(section).toHaveScreenshot("badges-section.png");
  });

  test("alerts section", async ({ page }) => {
    const section = page.locator("section").filter({ hasText: "ALERTS" }).first();
    await expect(section).toBeVisible();
    await expect(section).toHaveScreenshot("alerts-section.png");
  });

  test("cards section", async ({ page }) => {
    const section = page.locator("section").filter({ hasText: "CARDS" }).first();
    await expect(section).toBeVisible();
    await expect(section).toHaveScreenshot("cards-section.png");
  });

  test("tabs section", async ({ page }) => {
    const section = page.locator("section").filter({ hasText: "TABS" }).first();
    await expect(section).toBeVisible();
    await expect(section).toHaveScreenshot("tabs-section.png");
  });

  test("accordion section", async ({ page }) => {
    const section = page.locator("section").filter({ hasText: "ACCORDION" }).first();
    await expect(section).toBeVisible();
    await expect(section).toHaveScreenshot("accordion-section.png");
  });

  test("table section", async ({ page }) => {
    const section = page.locator("section").filter({ hasText: "TABLE" }).first();
    await expect(section).toBeVisible();
    await expect(section).toHaveScreenshot("table-section.png");
  });

  test("window controls section", async ({ page }) => {
    const section = page.locator("section").filter({ hasText: "WINDOW_CONTROLS" }).first();
    await expect(section).toBeVisible();
    await expect(section).toHaveScreenshot("window-controls-section.png");
  });
});

test.describe("Visual Consistency Checks", () => {
  test("all buttons have consistent styling", async ({ page }) => {
    await page.goto("/component-showcase");
    await page.waitForLoadState("networkidle");

    // Check all buttons use rounded-none (sharp corners)
    const buttons = page.locator("button");
    const buttonCount = await buttons.count();

    for (let i = 0; i < Math.min(buttonCount, 20); i++) {
      const button = buttons.nth(i);
      if (await button.isVisible()) {
        const className = await button.getAttribute("class");
        // In sharp mode, buttons should have rounded-none (no rounded-sm/md/lg)
        if (className && !className.includes("rounded-full")) {
          expect(className).not.toMatch(/rounded-(sm|md|lg|xl)/);
        }
      }
    }
  });

  test("all inputs have consistent styling", async ({ page }) => {
    await page.goto("/component-showcase");
    await page.waitForLoadState("networkidle");

    // Check inputs use sharp corners
    const inputs = page.locator("input");
    const inputCount = await inputs.count();

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      if (await input.isVisible()) {
        const className = await input.getAttribute("class");
        if (className) {
          expect(className).not.toMatch(/rounded-(sm|md|lg|xl)/);
        }
      }
    }
  });

  test("window controls use correct shape", async ({ page }) => {
    await page.goto("/component-showcase");
    await page.waitForLoadState("networkidle");

    // Navigate to window controls section
    const section = page.locator("section").filter({ hasText: "WINDOW_CONTROLS" }).first();
    await section.scrollIntoViewIfNeeded();

    // Take screenshot to verify squares vs circles
    await expect(section).toHaveScreenshot("window-controls-shape.png");
  });
});

test.describe("Marketing Pages Visual Check", () => {
  test("home page snapshot", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    // Wait for animations to complete
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot("home-page.png", {
      fullPage: true,
      maxDiffPixels: 200,
    });
  });

  test("contact page snapshot", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot("contact-page.png", {
      fullPage: true,
      maxDiffPixels: 200,
    });
  });

  test("pricing section snapshot", async ({ page }) => {
    await page.goto("/#pricing");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    const pricingSection = page.locator("#pricing");
    await expect(pricingSection).toBeVisible();
    await expect(pricingSection).toHaveScreenshot("pricing-section.png");
  });
});
