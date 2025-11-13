import { Page, expect } from '@playwright/test';

/**
 * E2E Test Helpers
 * Reusable utility functions for common test operations
 */

export class TestHelpers {
  /**
   * Wait for page to be fully loaded and interactive
   */
  static async waitForPageReady(page: Page) {
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => {
      return new Promise((resolve) => {
        if (document.readyState === 'complete') {
          resolve(null);
        } else {
          window.addEventListener('load', () => resolve(null));
        }
      });
    });
  }

  /**
   * Get all text content from page
   */
  static async getPageContent(page: Page): Promise<string> {
    return await page.evaluate(() => document.body.innerText);
  }

  /**
   * Check if element is in viewport
   */
  static async isInViewport(page: Page, selector: string): Promise<boolean> {
    return await page.evaluate(({ selector }) => {
      const element = document.querySelector(selector);
      if (!element) return false;

      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }, { selector });
  }

  /**
   * Scroll element into view
   */
  static async scrollIntoView(page: Page, selector: string) {
    await page.locator(selector).first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
  }

  /**
   * Type text slowly (useful for form interactions)
   */
  static async typeText(page: Page, selector: string, text: string, delay: number = 100) {
    const input = page.locator(selector).first();
    await input.clear();
    await input.type(text, { delay });
  }

  /**
   * Fill form field
   */
  static async fillInput(page: Page, selector: string, value: string) {
    await page.locator(selector).first().fill(value);
  }

  /**
   * Click element with retry logic
   */
  static async clickWithRetry(
    page: Page,
    selector: string,
    maxRetries: number = 3
  ): Promise<void> {
    let lastError;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        const element = page.locator(selector).first();
        await element.waitFor({ state: 'visible', timeout: 5000 });
        await element.click();
        return;
      } catch (error) {
        lastError = error;
        if (i < maxRetries - 1) {
          await page.waitForTimeout(500);
        }
      }
    }
    
    throw lastError;
  }

  /**
   * Wait for element and verify it's visible
   */
  static async expectElementVisible(
    page: Page,
    selector: string,
    timeout: number = 5000
  ) {
    const element = page.locator(selector).first();
    await element.waitFor({ state: 'visible', timeout });
    await expect(element).toBeVisible();
  }

  /**
   * Extract table data to array of objects
   */
  static async getTableData(
    page: Page,
    tableSelector: string
  ): Promise<Record<string, string>[]> {
    return await page.evaluate(({ tableSelector }) => {
      const rows: Record<string, string>[] = [];
      const table = document.querySelector(tableSelector);
      
      if (!table) return rows;

      const headerCells = table.querySelectorAll('thead th');
      const headers = Array.from(headerCells).map(cell => cell.textContent?.trim() || '');

      const bodyRows = table.querySelectorAll('tbody tr');
      bodyRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData: Record<string, string> = {};
        
        headers.forEach((header, index) => {
          rowData[header] = cells[index]?.textContent?.trim() || '';
        });
        
        rows.push(rowData);
      });

      return rows;
    }, { tableSelector });
  }

  /**
   * Check if API request was made with specific URL pattern
   */
  static async captureNetworkRequest(
    page: Page,
    pattern: string | RegExp,
    action: () => Promise<void>
  ) {
    const requests: string[] = [];
    
    page.on('request', (request) => {
      if (request.url().match(pattern)) {
        requests.push(request.url());
      }
    });

    await action();
    
    return requests;
  }

  /**
   * Set authentication cookie
   */
  static async setAuthCookie(
    page: Page,
    cookieName: string = 'authjs.session-token',
    value: string = 'test-token'
  ) {
    await page.context().addCookies([
      {
        name: cookieName,
        value,
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        expires: Date.now() / 1000 + 86400,
      },
    ]);
  }

  /**
   * Take screenshot for debugging
   */
  static async takeDebugScreenshot(page: Page, testName: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({
      path: `test-results/debug-${testName}-${timestamp}.png`,
    });
  }

  /**
   * Get all console messages
   */
  static async captureConsoleLogs(page: Page, action: () => Promise<void>) {
    const logs: Array<{ type: string; message: string }> = [];
    
    page.on('console', (msg) => {
      logs.push({
        type: msg.type(),
        message: msg.text(),
      });
    });

    await action();
    
    return logs;
  }

  /**
   * Check page has no JavaScript errors
   */
  static async checkForErrors(page: Page): Promise<string[]> {
    const errors: string[] = [];
    
    page.on('pageerror', (error) => {
      errors.push(error.toString());
    });

    return errors;
  }

  /**
   * Verify element text content
   */
  static async expectTextContent(
    page: Page,
    selector: string,
    expectedText: string | RegExp
  ) {
    const element = page.locator(selector).first();
    await expect(element).toContainText(expectedText);
  }

  /**
   * Wait for navigation to complete
   */
  static async waitForNavigation(page: Page, action: () => Promise<void>) {
    const navigationPromise = page.waitForNavigation({
      waitUntil: 'networkidle',
    });
    
    await action();
    await navigationPromise;
  }

  /**
   * Switch theme
   */
  static async switchTheme(page: Page, themeName: string) {
    // Find theme switcher dropdown
    const themeButton = page.locator('button').filter({ hasText: /theme|dark|light|color/i }).first();
    
    if (await themeButton.isVisible()) {
      await themeButton.click();
      
      // Click theme option
      const themeOption = page.locator('[role="option"], li').filter({ hasText: new RegExp(themeName, 'i') }).first();
      if (await themeOption.isVisible()) {
        await themeOption.click();
        await page.waitForTimeout(300); // Wait for theme transition
      }
    }
  }
}

/**
 * Test data fixtures
 */
export const testData = {
  validEmail: 'test@example.com',
  validPassword: 'TestPassword123!@#',
  invalidEmail: 'not-an-email',
  weakPassword: 'weak',
  strongPassword: 'SecurePassword123!@#',
};
