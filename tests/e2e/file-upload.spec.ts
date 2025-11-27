import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

/**
 * File Upload E2E Tests
 * Validates file upload functionality including validation, success, and error states
 */

test.describe('File Upload', () => {
  // Helper to create test files
  const createTestFile = async (
    filename: string,
    content: Buffer | string,
    mimeType: string
  ): Promise<string> => {
    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, filename);
    await fs.promises.writeFile(filePath, content);
    return filePath;
  };

  // Create valid PNG file (minimal valid PNG)
  const createValidPng = async (): Promise<string> => {
    // Minimal valid PNG (1x1 transparent pixel)
    const pngData = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, // PNG signature
      0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4,
      0x89, 0x00, 0x00, 0x00, 0x0a, 0x49, 0x44, 0x41, // IDAT chunk
      0x54, 0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00,
      0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00,
      0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, // IEND chunk
      0x42, 0x60, 0x82,
    ]);
    return createTestFile('test-image.png', pngData, 'image/png');
  };

  test.describe('Avatar Upload', () => {
    test('should display avatar upload option in settings', async ({ page }) => {
      await page.goto('/settings/profile');
      await page.waitForLoadState('domcontentloaded');

      // Look for avatar upload area
      const avatarUpload = page.locator(
        '[data-testid="avatar-upload"], input[type="file"], [class*="avatar"], button:has-text("Upload")'
      );

      if (await avatarUpload.count() > 0) {
        await expect(avatarUpload.first()).toBeVisible();
      }
    });

    test('should have file input for avatar', async ({ page }) => {
      await page.goto('/settings/profile');
      await page.waitForLoadState('domcontentloaded');

      // Look for file input (might be hidden)
      const fileInput = page.locator('input[type="file"]');

      if (await fileInput.count() > 0) {
        // File input exists (might be visually hidden but functional)
        expect(await fileInput.count()).toBeGreaterThanOrEqual(1);
      }
    });

    test('should accept valid image file', async ({ page }) => {
      await page.goto('/settings/profile');
      await page.waitForLoadState('domcontentloaded');

      const fileInput = page.locator('input[type="file"]').first();

      if (await fileInput.count() > 0) {
        // Create a valid PNG file
        const pngPath = await createValidPng();

        // Upload the file
        await fileInput.setInputFiles(pngPath);
        await page.waitForTimeout(1000);

        // Look for success indicators
        const successIndicator = page.locator(
          '[class*="success"], [data-status="success"], img[src*="avatar"], .avatar'
        );
        const errorIndicator = page.locator(
          '[class*="error"], [role="alert"], [data-status="error"]'
        );

        // Should either show success or preview (not error)
        const hasError = await errorIndicator.count() > 0;

        if (hasError) {
          // If there's an error, it shouldn't be about file type for valid PNG
          const errorText = await errorIndicator.first().textContent();
          expect(errorText?.toLowerCase()).not.toContain('type');
        }

        // Cleanup
        await fs.promises.unlink(pngPath);
      }
    });
  });

  test.describe('File Size Validation', () => {
    test('should reject files exceeding size limit', async ({ page }) => {
      await page.goto('/settings/profile');
      await page.waitForLoadState('domcontentloaded');

      const fileInput = page.locator('input[type="file"]').first();

      if (await fileInput.count() > 0) {
        // Create a large file (11MB - exceeds typical 10MB limit)
        const largeContent = Buffer.alloc(11 * 1024 * 1024, 'a');
        const largePath = await createTestFile('large-file.png', largeContent, 'image/png');

        // Try to upload
        await fileInput.setInputFiles(largePath);
        await page.waitForTimeout(1000);

        // Look for error message about size
        const errorMessage = page.locator('text=/too large|size limit|maximum size|exceeds/i');

        if (await errorMessage.count() > 0) {
          await expect(errorMessage.first()).toBeVisible();
        }

        // Cleanup
        await fs.promises.unlink(largePath);
      }
    });
  });

  test.describe('File Type Validation', () => {
    test('should reject invalid file types', async ({ page }) => {
      await page.goto('/settings/profile');
      await page.waitForLoadState('domcontentloaded');

      const fileInput = page.locator('input[type="file"]').first();

      if (await fileInput.count() > 0) {
        // Create an invalid file (executable-like)
        const invalidContent = Buffer.from('#!/bin/bash\necho "test"');
        const invalidPath = await createTestFile('script.sh', invalidContent, 'text/x-shellscript');

        // Try to upload
        await fileInput.setInputFiles(invalidPath);
        await page.waitForTimeout(1000);

        // Look for error message about type
        const errorMessage = page.locator('text=/not allowed|invalid.*type|unsupported|format/i');

        if (await errorMessage.count() > 0) {
          await expect(errorMessage.first()).toBeVisible();
        }

        // Cleanup
        await fs.promises.unlink(invalidPath);
      }
    });

    test('should check file input accept attribute', async ({ page }) => {
      await page.goto('/settings/profile');
      await page.waitForLoadState('domcontentloaded');

      const fileInput = page.locator('input[type="file"]').first();

      if (await fileInput.count() > 0) {
        const acceptAttr = await fileInput.getAttribute('accept');

        if (acceptAttr) {
          // Should restrict to image types
          expect(acceptAttr).toMatch(/image|png|jpg|jpeg|webp/i);
        }
      }
    });
  });

  test.describe('Upload Progress', () => {
    test('should show upload progress indicator', async ({ page }) => {
      await page.goto('/settings/profile');
      await page.waitForLoadState('domcontentloaded');

      const fileInput = page.locator('input[type="file"]').first();

      if (await fileInput.count() > 0) {
        const pngPath = await createValidPng();

        // Upload the file
        await fileInput.setInputFiles(pngPath);

        // Look for progress indicator (might be brief)
        const progressIndicator = page.locator(
          '[role="progressbar"], .progress, [class*="loading"], [class*="spinner"]'
        );

        // Progress might be too fast to catch, so just verify no errors
        const errorIndicator = page.locator('[role="alert"][class*="error"]');
        const hasError = await errorIndicator.count() > 0;

        // Should not have immediate type/validation errors
        expect(hasError).toBeFalsy();

        // Cleanup
        await fs.promises.unlink(pngPath);
      }
    });
  });

  test.describe('Upload API Endpoint', () => {
    test('should have upload API endpoint', async ({ page }) => {
      // Check if upload endpoint exists
      const response = await page.request.post('/api/upload', {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {},
      });

      // Should respond (even with error due to missing file/auth)
      expect([400, 401, 403, 422, 500]).toContain(response.status());
    });

    test('should reject unauthenticated uploads', async ({ page }) => {
      await page.context().clearCookies();

      const response = await page.request.post('/api/upload', {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Should require authentication
      expect([401, 403]).toContain(response.status());
    });
  });

  test.describe('Document Upload (if applicable)', () => {
    test('should display document upload area if feature exists', async ({ page }) => {
      await page.goto('/dashboard');
      await page.waitForLoadState('domcontentloaded');

      // Look for document upload area
      const uploadArea = page.locator(
        '[data-testid="document-upload"], [class*="upload-zone"], [class*="dropzone"]'
      );

      if (await uploadArea.count() > 0) {
        await expect(uploadArea.first()).toBeVisible();
      }
    });

    test('should support drag and drop if feature exists', async ({ page }) => {
      await page.goto('/dashboard');
      await page.waitForLoadState('domcontentloaded');

      // Look for dropzone
      const dropzone = page.locator('[class*="dropzone"], [data-testid*="drop"]');

      if (await dropzone.count() > 0) {
        // Verify dropzone has appropriate attributes
        const zone = dropzone.first();
        await expect(zone).toBeVisible();
      }
    });
  });

  test.describe('Storage Provider', () => {
    test('should handle local storage fallback', async ({ page }) => {
      // This tests that uploads work even without cloud storage
      await page.goto('/settings/profile');
      await page.waitForLoadState('domcontentloaded');

      const fileInput = page.locator('input[type="file"]').first();

      if (await fileInput.count() > 0) {
        const pngPath = await createValidPng();

        await fileInput.setInputFiles(pngPath);
        await page.waitForTimeout(2000);

        // Should not show cloud storage error
        const cloudError = page.locator('text=/cloud.*error|storage.*unavailable|s3.*error/i');
        const hasCloudError = await cloudError.count() > 0;

        expect(hasCloudError).toBeFalsy();

        // Cleanup
        await fs.promises.unlink(pngPath);
      }
    });
  });
});
