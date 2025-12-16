/**
 * Authentication Category Page
 * Uses CategoryShowcasePage template for consistent styling
 */
import { CategoryShowcasePage } from '@/components/library';
import { getTemplatesByCategory, getCategoryInfo } from '../library-data';

const categoryId = 'auth';
const categoryInfo = getCategoryInfo(categoryId);
const categoryTemplates = getTemplatesByCategory(categoryId);

// Strip icon functions for client component serialization
const serializableTemplates = categoryTemplates.map(({ icon, ...rest }) => rest);

const features = [
  'Pre-built flows for Login, Register, and Recovery',
  'Integrated with NextAuth v5 and OAuth providers',
  'Form validation using Zod and React Hook Form',
  'Accessible components (ARIA) and keyboard navigation',
  'Responsive designs that work on all devices',
  'Secure implementation with CSRF protection',
];

export default function AuthenticationPage() {
  return (
    <CategoryShowcasePage
      categoryId={categoryId}
      badge="AUTHENTICATION"
      title="Authentication"
      description="Login, registration, and password recovery templates"
      templates={serializableTemplates}
      features={features}
    />
  );
}
