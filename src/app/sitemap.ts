import { MetadataRoute } from 'next';
import { readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Sitemap Generation
 * Dynamically generates XML sitemap from all public routes
 */

const baseUrl = process.env.NEXTAUTH_URL || 'https://fabrk.dev';

/**
 * Recursively scan directory for page.tsx files
 */
function getRoutes(dir: string, basePath: string = ''): string[] {
  const routes: string[] = [];

  if (!existsSync(dir)) return routes;

  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip private folders and special Next.js folders
      if (item.startsWith('_') || item.startsWith('.') || item === 'api' || item === 'components') {
        continue;
      }

      // Handle route groups (parentheses folders)
      const routePath = item.startsWith('(') ? basePath : `${basePath}/${item}`;
      routes.push(...getRoutes(fullPath, routePath));
    } else if (item === 'page.tsx' || item === 'page.ts') {
      // Found a page - add the route
      const route = basePath || '/';
      if (!routes.includes(route)) {
        routes.push(route);
      }
    }
  }

  return routes;
}

/**
 * Determine priority based on route depth and type
 */
function getPriority(route: string): number {
  if (route === '/') return 1.0;
  if (route === '/pricing' || route === '/features') return 0.9;
  if (route === '/docs' || route === '/library' || route === '/blog') return 0.85;
  if (route.startsWith('/docs/')) return 0.7;
  if (route.startsWith('/library/')) return 0.6;
  if (route.startsWith('/blog/')) return 0.7;
  if (['/terms', '/privacy', '/refund'].includes(route)) return 0.3;
  if (['/login', '/register'].includes(route)) return 0.4;
  return 0.5;
}

/**
 * Determine change frequency based on route type
 */
function getChangeFreq(route: string): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
  if (route === '/') return 'daily';
  if (route === '/blog' || route.startsWith('/blog/')) return 'daily';
  if (route === '/changelog') return 'weekly';
  if (route === '/pricing' || route === '/features') return 'weekly';
  if (route.startsWith('/docs/') || route.startsWith('/library/')) return 'weekly';
  if (['/terms', '/privacy', '/refund'].includes(route)) return 'yearly';
  return 'monthly';
}

/**
 * Filter out routes that shouldn't be in sitemap
 */
function shouldIncludeRoute(route: string): boolean {
  // Exclude authenticated routes
  const excludePatterns = [
    '/dashboard',
    '/settings',
    '/admin',
    '/profile',
    '/onboarding',
    '/organizations',
    '/usage',
    '/two-factor',
    '/reset-password',
    '/forgot-password',
    '/verify-email',
    '/maintenance',
    '/purchase',
  ];

  return !excludePatterns.some(pattern => route.startsWith(pattern));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Get all routes from the app directory
  const appDir = join(process.cwd(), 'src/app');
  const allRoutes = getRoutes(appDir);

  // Filter and transform routes
  const sitemapEntries = allRoutes
    .filter(shouldIncludeRoute)
    .map(route => ({
      url: `${baseUrl}${route === '/' ? '' : route}`,
      lastModified: currentDate,
      changeFrequency: getChangeFreq(route),
      priority: getPriority(route),
    }))
    // Sort by priority (highest first)
    .sort((a, b) => b.priority - a.priority);

  return sitemapEntries;
}
