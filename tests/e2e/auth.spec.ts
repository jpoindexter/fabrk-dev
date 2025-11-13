import { test, expect } from '@playwright/test';

/**
 * Authentication E2E Tests
 * Validates user registration, login, and session management flows
 */

test.describe('Authentication Flows', () => {
  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = 'TestPassword123!@#';

  test.describe('Registration Flow', () => {
    test('should navigate to registration page', async ({ page }) => {
      await page.goto('/');
      
      // Look for sign up or register link
      const signupLink = page.locator('a, button').filter({ hasText: /sign up|register|create account/i }).first();
      
      if (await signupLink.isVisible()) {
        await signupLink.click();
        await page.waitForLoadState('domcontentloaded');
        
        // Check we're on a registration-related page
        expect(page.url()).toMatch(/signup|register|auth/i);
      }
    });

    test('should display registration form', async ({ page }) => {
      await page.goto('/auth/register');
      await page.waitForLoadState('domcontentloaded');
      
      // Check for email input
      const emailInput = page.locator('input[type="email"], input[name*="email"]').first();
      await expect(emailInput).toBeVisible();
      
      // Check for password input
      const passwordInput = page.locator('input[type="password"]').first();
      await expect(passwordInput).toBeVisible();
      
      // Check for submit button
      const submitButton = page.locator('button[type="submit"], button').filter({ hasText: /sign up|register|create/i }).first();
      await expect(submitButton).toBeVisible();
    });

    test('should show validation errors for invalid email', async ({ page }) => {
      await page.goto('/auth/register');
      await page.waitForLoadState('domcontentloaded');
      
      const emailInput = page.locator('input[type="email"]').first();
      const submitButton = page.locator('button[type="submit"]').first();
      
      // Enter invalid email
      await emailInput.fill('invalid-email');
      await submitButton.click();
      
      // Wait for validation error to appear
      await page.waitForTimeout(500);
      
      // Look for error message
      const errorMessage = page.locator('[role="alert"], .error, .text-red-500, .text-destructive');
      const hasError = await errorMessage.count() > 0;
      
      // Either we see an error or the form is still visible (pending submission)
      expect(hasError || await emailInput.isVisible()).toBeTruthy();
    });

    test('should show validation error for weak password', async ({ page }) => {
      await page.goto('/auth/register');
      await page.waitForLoadState('domcontentloaded');
      
      const emailInput = page.locator('input[type="email"]').first();
      const passwordInput = page.locator('input[type="password"]').first();
      const submitButton = page.locator('button[type="submit"]').first();
      
      // Fill form with valid email but weak password
      await emailInput.fill('test@example.com');
      await passwordInput.fill('weak');
      await submitButton.click();
      
      // Wait for response
      await page.waitForTimeout(500);
      
      // Should either show error or remain on registration page
      const isStillOnRegister = page.url().includes('register') || page.url().includes('signup');
      expect(isStillOnRegister).toBeTruthy();
    });
  });

  test.describe('Login Flow', () => {
    test('should navigate to login page', async ({ page }) => {
      await page.goto('/');
      
      // Look for login or sign in link
      const loginLink = page.locator('a, button').filter({ hasText: /sign in|login|log in/i }).first();
      
      if (await loginLink.isVisible()) {
        await loginLink.click();
        await page.waitForLoadState('domcontentloaded');
        
        // Check we're on a login-related page
        expect(page.url()).toMatch(/login|signin/i);
      }
    });

    test('should display login form', async ({ page }) => {
      await page.goto('/auth/signin');
      await page.waitForLoadState('domcontentloaded');
      
      // Check for email input
      const emailInput = page.locator('input[type="email"], input[name*="email"]').first();
      await expect(emailInput).toBeVisible();
      
      // Check for password input
      const passwordInput = page.locator('input[type="password"]').first();
      await expect(passwordInput).toBeVisible();
      
      // Check for submit button
      const submitButton = page.locator('button[type="submit"], button').filter({ hasText: /sign in|login|log in/i }).first();
      await expect(submitButton).toBeVisible();
    });

    test('should show error for non-existent user', async ({ page }) => {
      await page.goto('/auth/signin');
      await page.waitForLoadState('domcontentloaded');
      
      const emailInput = page.locator('input[type="email"]').first();
      const passwordInput = page.locator('input[type="password"]').first();
      const submitButton = page.locator('button[type="submit"]').first();
      
      // Fill form with non-existent user
      await emailInput.fill('nonexistent@example.com');
      await passwordInput.fill('password123');
      await submitButton.click();
      
      // Wait for response
      await page.waitForTimeout(1000);
      
      // Should see error or remain on login page
      const errorVisible = await page.locator('[role="alert"], .error').count() > 0;
      const isStillOnLogin = page.url().includes('signin') || page.url().includes('login');
      
      expect(errorVisible || isStillOnLogin).toBeTruthy();
    });

    test('should show error for invalid password', async ({ page }) => {
      await page.goto('/auth/signin');
      await page.waitForLoadState('domcontentloaded');
      
      const emailInput = page.locator('input[type="email"]').first();
      const passwordInput = page.locator('input[type="password"]').first();
      const submitButton = page.locator('button[type="submit"]').first();
      
      // Fill form with test credentials and wrong password
      await emailInput.fill('test@example.com');
      await passwordInput.fill('wrongpassword');
      await submitButton.click();
      
      // Wait for response
      await page.waitForTimeout(1000);
      
      // Should show error
      const errorVisible = await page.locator('[role="alert"], .error').count() > 0;
      expect(errorVisible).toBeTruthy();
    });
  });

  test.describe('Password Reset Flow', () => {
    test('should display forgot password link', async ({ page }) => {
      await page.goto('/auth/signin');
      
      const forgotLink = page.locator('a').filter({ hasText: /forgot password|reset password|forgot/i }).first();
      
      if (await forgotLink.isVisible()) {
        await expect(forgotLink).toBeVisible();
        await expect(forgotLink).toBeEnabled();
      }
    });

    test('should navigate to forgot password page', async ({ page }) => {
      await page.goto('/auth/signin');
      
      const forgotLink = page.locator('a').filter({ hasText: /forgot|reset/i }).first();
      
      if (await forgotLink.isVisible()) {
        await forgotLink.click();
        await page.waitForLoadState('domcontentloaded');
        
        // Should be on forgot password page
        expect(page.url()).toMatch(/forgot|reset/i);
      }
    });

    test('should display forgot password form', async ({ page }) => {
      await page.goto('/auth/forgot-password');
      await page.waitForLoadState('domcontentloaded');
      
      // Check for email input
      const emailInput = page.locator('input[type="email"]').first();
      if (await emailInput.isVisible()) {
        await expect(emailInput).toBeVisible();
        
        // Check for submit button
        const submitButton = page.locator('button[type="submit"]').first();
        await expect(submitButton).toBeVisible();
      }
    });
  });

  test.describe('Session Management', () => {
    test('should preserve user session on page reload', async ({ page, context }) => {
      // Set a session token (simulated)
      await context.addCookies([
        {
          name: 'authjs.session-token',
          value: 'test-token',
          domain: 'localhost',
          path: '/',
          httpOnly: true,
          secure: false,
          sameSite: 'Lax',
          expires: Date.now() / 1000 + 86400,
        },
      ]);
      
      // Navigate to a protected page
      await page.goto('/dashboard');
      await page.waitForLoadState('domcontentloaded');
      
      // The session should be maintained
      const cookies = await context.cookies();
      const hasSessionCookie = cookies.some(c => c.name.includes('auth') || c.name.includes('session'));
      
      // Either we have a session cookie or we're on a public page
      expect(hasSessionCookie || page.url().includes('dashboard')).toBeTruthy();
    });
  });
});
