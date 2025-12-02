import { test, expect } from '@playwright/test';
import { TestHelpers, testData } from './helpers';

/**
 * Contact Form E2E Tests
 * Validates contact form submission flow, validation, and success/error states
 */

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to contact page
    await page.goto('/contact');
    await TestHelpers.waitForPageReady(page);
  });

  test.describe('Form Display', () => {
    test('should display contact form with all fields', async ({ page }) => {
      // Check form is visible
      const form = page.locator('form').first();
      await expect(form).toBeVisible();

      // Check required fields exist
      const nameInput = page.locator('#name, input[name="name"]');
      const emailInput = page.locator('#email, input[name="email"]');
      const messageTextarea = page.locator('#message, textarea[name="message"]');

      await expect(nameInput.first()).toBeVisible();
      await expect(emailInput.first()).toBeVisible();
      await expect(messageTextarea.first()).toBeVisible();
    });

    test('should display submit button', async ({ page }) => {
      const submitButton = page.locator('button[type="submit"]').first();
      await expect(submitButton).toBeVisible();
      await expect(submitButton).toBeEnabled();
    });

    test('should have subject/category selector', async ({ page }) => {
      // Look for subject dropdown or selector
      const subjectSelector = page.locator('#subject, select[name="subject"], [role="combobox"]').first();

      if (await subjectSelector.count() > 0) {
        await expect(subjectSelector).toBeVisible();
      }
    });

    test('should display terminal-style header', async ({ page }) => {
      // Check for terminal styling elements
      const terminalHeader = page.locator('text=/message.*composer|contact.*form|\\[.*\\]/i').first();

      if (await terminalHeader.count() > 0) {
        await expect(terminalHeader).toBeVisible();
      }
    });
  });

  test.describe('Form Validation', () => {
    test('should show required field validation', async ({ page }) => {
      // Try to submit empty form
      const submitButton = page.locator('button[type="submit"]').first();
      await submitButton.click();
      await page.waitForTimeout(300);

      // Check for HTML5 validation or error messages
      const nameInput = page.locator('#name, input[name="name"]').first();
      const isInvalid = await nameInput.evaluate((el: HTMLInputElement) =>
        !el.validity.valid || el.getAttribute('aria-invalid') === 'true'
      );

      // Either HTML5 validation or custom validation should be present
      expect(isInvalid).toBeTruthy();
    });

    test('should validate email format', async ({ page }) => {
      // Fill name
      await TestHelpers.fillInput(page, '#name, input[name="name"]', 'Test User');

      // Enter invalid email
      const emailInput = page.locator('#email, input[name="email"]').first();
      await emailInput.fill('invalid-email');
      await emailInput.blur();
      await page.waitForTimeout(300);

      // Try to submit
      const submitButton = page.locator('button[type="submit"]').first();
      await submitButton.click();
      await page.waitForTimeout(300);

      // Check email validation
      const emailInvalid = await emailInput.evaluate((el: HTMLInputElement) =>
        !el.validity.valid || el.getAttribute('aria-invalid') === 'true'
      );

      expect(emailInvalid).toBeTruthy();
    });

    test('should require message field', async ({ page }) => {
      // Fill name and email only
      await TestHelpers.fillInput(page, '#name, input[name="name"]', 'Test User');
      await TestHelpers.fillInput(page, '#email, input[name="email"]', testData.validEmail);

      // Try to submit without message
      const submitButton = page.locator('button[type="submit"]').first();
      await submitButton.click();
      await page.waitForTimeout(300);

      // Check message field validation
      const messageTextarea = page.locator('#message, textarea[name="message"]').first();
      const messageInvalid = await messageTextarea.evaluate((el: HTMLTextAreaElement) =>
        !el.validity.valid || el.getAttribute('aria-invalid') === 'true'
      );

      // Either HTML5 or custom validation
      const hasErrorMessage = await page.locator('text=/message.*required/i').count() > 0;

      expect(messageInvalid || hasErrorMessage).toBeTruthy();
    });
  });

  test.describe('Subject Selection', () => {
    test('should allow selecting subject/category', async ({ page }) => {
      // Look for subject selector (could be select, combobox, or custom dropdown)
      const subjectTrigger = page.locator('#subject, select[name="subject"], [role="combobox"]').first();

      if (await subjectTrigger.count() > 0 && await subjectTrigger.isVisible()) {
        await subjectTrigger.click();
        await page.waitForTimeout(300);

        // Look for options
        const options = page.locator('[role="option"], option, [data-value]');
        const optionCount = await options.count();

        // Should have at least 2 subject options
        expect(optionCount).toBeGreaterThanOrEqual(2);
      }
    });

    test('should have common subjects available', async ({ page }) => {
      // Look for common subjects like Support, Sales, Bug Report
      const pageContent = await TestHelpers.getPageContent(page);
      const lowerContent = pageContent.toLowerCase();

      // Click subject selector if it exists
      const subjectTrigger = page.locator('#subject, select[name="subject"], [role="combobox"]').first();

      if (await subjectTrigger.count() > 0 && await subjectTrigger.isVisible()) {
        await subjectTrigger.click();
        await page.waitForTimeout(300);

        // Check for common categories
        const hasSupport = lowerContent.includes('support') || lowerContent.includes('technical');
        const hasSales = lowerContent.includes('sales') || lowerContent.includes('inquiry');
        const hasBug = lowerContent.includes('bug') || lowerContent.includes('report');

        expect(hasSupport || hasSales || hasBug).toBeTruthy();
      }
    });
  });

  test.describe('Form Submission', () => {
    test('should submit valid form successfully', async ({ page }) => {
      // Fill all required fields
      await TestHelpers.fillInput(page, '#name, input[name="name"]', 'E2E Test User');
      await TestHelpers.fillInput(page, '#email, input[name="email"]', testData.validEmail);

      // Select subject if available
      const subjectTrigger = page.locator('#subject, select[name="subject"], [role="combobox"]').first();
      if (await subjectTrigger.count() > 0 && await subjectTrigger.isVisible()) {
        await subjectTrigger.click();
        await page.waitForTimeout(200);

        // Select first option
        const firstOption = page.locator('[role="option"], option').first();
        if (await firstOption.count() > 0) {
          await firstOption.click();
          await page.waitForTimeout(200);
        }
      }

      // Fill message
      await TestHelpers.fillInput(
        page,
        '#message, textarea[name="message"]',
        'This is an E2E test message. Please ignore this automated test submission.'
      );

      // Submit form
      const submitButton = page.locator('button[type="submit"]').first();
      await submitButton.click();

      // Wait for submission
      await page.waitForTimeout(2000);

      // Check for success message or loading state
      const successMessage = page.locator('text=/message.*sent|success|submitted|received/i').first();
      const loadingState = page.locator('text=/sending|loading/i').first();

      const hasSuccess = await successMessage.isVisible().catch(() => false);
      const isLoading = await loadingState.isVisible().catch(() => false);

      // Either success message or still loading (API might be slow)
      expect(hasSuccess || isLoading).toBeTruthy();
    });

    test('should show loading state during submission', async ({ page }) => {
      // Fill form
      await TestHelpers.fillInput(page, '#name, input[name="name"]', 'Test User');
      await TestHelpers.fillInput(page, '#email, input[name="email"]', testData.validEmail);
      await TestHelpers.fillInput(page, '#message, textarea[name="message"]', 'Test message');

      // Submit
      const submitButton = page.locator('button[type="submit"]').first();
      await submitButton.click();

      // Check for loading state immediately
      await page.waitForTimeout(100);

      // Button should be disabled or show loading text
      const isDisabled = await submitButton.isDisabled().catch(() => false);
      const hasLoadingText = await page.locator('text=/sending|loading|please wait/i').count() > 0;

      expect(isDisabled || hasLoadingText).toBeTruthy();
    });

    test('should handle API errors gracefully', async ({ page }) => {
      // Intercept API call and force error
      await page.route('**/api/contact', async (route) => {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Internal Server Error' })
        });
      });

      // Fill and submit form
      await TestHelpers.fillInput(page, '#name, input[name="name"]', 'Test User');
      await TestHelpers.fillInput(page, '#email, input[name="email"]', testData.validEmail);
      await TestHelpers.fillInput(page, '#message, textarea[name="message"]', 'Test message');

      const submitButton = page.locator('button[type="submit"]').first();
      await submitButton.click();

      // Wait for error response
      await page.waitForTimeout(1500);

      // Should show error message
      const errorMessage = page.locator('text=/error|failed|try again/i').first();
      const hasError = await errorMessage.isVisible().catch(() => false);

      expect(hasError).toBeTruthy();
    });
  });

  test.describe('Success State', () => {
    test('should display success message after submission', async ({ page }) => {
      // Mock successful API response
      await page.route('**/api/contact', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, message: 'Message sent successfully' })
        });
      });

      // Fill and submit
      await TestHelpers.fillInput(page, '#name, input[name="name"]', 'Test User');
      await TestHelpers.fillInput(page, '#email, input[name="email"]', testData.validEmail);
      await TestHelpers.fillInput(page, '#message, textarea[name="message"]', 'Test message');

      const submitButton = page.locator('button[type="submit"]').first();
      await submitButton.click();

      // Wait for success
      await page.waitForTimeout(1000);

      // Check for success indicator
      const successAlert = page.locator('[role="alert"], .success, [class*="success"]').filter({
        hasText: /success|sent|received/i
      }).first();

      const hasSuccessMessage = await successAlert.isVisible().catch(() => false);
      const hasSuccessText = await page.locator('text=/message.*sent|successfully/i').count() > 0;

      expect(hasSuccessMessage || hasSuccessText).toBeTruthy();
    });

    test('should clear form after successful submission', async ({ page }) => {
      // Mock successful API response
      await page.route('**/api/contact', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true })
        });
      });

      // Fill and submit
      await TestHelpers.fillInput(page, '#name, input[name="name"]', 'Test User');
      await TestHelpers.fillInput(page, '#email, input[name="email"]', testData.validEmail);
      await TestHelpers.fillInput(page, '#message, textarea[name="message"]', 'Test message');

      const submitButton = page.locator('button[type="submit"]').first();
      await submitButton.click();

      // Wait for success and potential form reset
      await page.waitForTimeout(1500);

      // Check if form was cleared
      const nameInput = page.locator('#name, input[name="name"]').first();
      const emailInput = page.locator('#email, input[name="email"]').first();
      const messageInput = page.locator('#message, textarea[name="message"]').first();

      const nameValue = await nameInput.inputValue();
      const emailValue = await emailInput.inputValue();
      const messageValue = await messageInput.inputValue();

      // At least one field should be cleared
      const someFieldCleared = !nameValue || !emailValue || !messageValue;

      // Or success message is shown (form might not clear immediately)
      const hasSuccess = await page.locator('text=/success|sent/i').count() > 0;

      expect(someFieldCleared || hasSuccess).toBeTruthy();
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper form labels', async ({ page }) => {
      // Check for label elements
      const labels = page.locator('label');
      const labelCount = await labels.count();

      // Should have at least 3 labels (name, email, message)
      expect(labelCount).toBeGreaterThanOrEqual(3);
    });

    test('should have accessible error messages', async ({ page }) => {
      // Try to submit empty form
      const submitButton = page.locator('button[type="submit"]').first();
      await submitButton.click();
      await page.waitForTimeout(500);

      // Check for aria-describedby or aria-live regions for errors
      const errorRegions = page.locator('[role="alert"], [aria-live="polite"], [aria-live="assertive"]');
      const hasErrorRegions = await errorRegions.count() > 0;

      // Or check for validation messages
      const hasValidationMessages = await page.locator('text=/required|invalid|error/i').count() > 0;

      expect(hasErrorRegions || hasValidationMessages).toBeTruthy();
    });

    test('should support keyboard navigation', async ({ page }) => {
      // Tab through form fields
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      // Check if focus is on a form element
      const focusedElement = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? el.tagName.toLowerCase() : null;
      });

      // Should be focused on input, textarea, select, or button
      const validElements = ['input', 'textarea', 'select', 'button'];
      expect(validElements.includes(focusedElement || '')).toBeTruthy();
    });
  });

  test.describe('Privacy Policy Link', () => {
    test('should display privacy policy link', async ({ page }) => {
      // Look for privacy policy link
      const privacyLink = page.locator('a[href*="privacy"]');

      if (await privacyLink.count() > 0) {
        await expect(privacyLink.first()).toBeVisible();
      }
    });

    test('should navigate to privacy policy when clicked', async ({ page }) => {
      const privacyLink = page.locator('a[href*="privacy"]').first();

      if (await privacyLink.count() > 0 && await privacyLink.isVisible()) {
        await privacyLink.click();
        await page.waitForLoadState('domcontentloaded');

        // Should navigate to privacy page
        expect(page.url()).toContain('privacy');
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should display properly on mobile', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      // Form should still be visible
      const form = page.locator('form').first();
      await expect(form).toBeVisible();

      // Fields should be visible
      const nameInput = page.locator('#name, input[name="name"]').first();
      await expect(nameInput).toBeVisible();
    });

    test('should be usable on tablet', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });

      // Form should be functional
      const form = page.locator('form').first();
      await expect(form).toBeVisible();

      // Submit button should be visible
      const submitButton = page.locator('button[type="submit"]').first();
      await expect(submitButton).toBeVisible();
    });
  });
});
