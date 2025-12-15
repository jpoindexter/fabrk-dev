/**
 * Account Pages Category Page
 * Uses CategoryShowcasePage template for consistent styling
 */
import { CategoryShowcasePage } from '@/components/library';
import { getTemplatesByCategory, getCategoryInfo } from '../library-data';

const categoryId = 'account';
const categoryInfo = getCategoryInfo(categoryId);
const categoryTemplates = getTemplatesByCategory(categoryId);

const features = [
  'Settings page with tabbed navigation and forms',
  'Billing dashboard with invoice history',
  'Security settings with 2FA and session management',
  'Profile editing with avatar upload',
  'Subscription management and plan upgrades',
  'GDPR compliance and data export controls',
];

export default function AccountPagesPage() {
  return (
    <CategoryShowcasePage
      categoryId={categoryId}
      badge="ACCOUNT PAGES"
      title="Account Pages"
      description="User settings, billing, security, and profile management"
      icon={categoryInfo?.icon}
      templates={categoryTemplates}
      features={features}
    />
  );
}
