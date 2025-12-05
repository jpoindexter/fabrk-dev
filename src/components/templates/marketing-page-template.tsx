/**
 * Marketing Page Template
 *
 * Unified template for all marketing pages (home, about, features, pricing, contact).
 * Ensures consistent structure: Navigation → Hero → Sections → CTA → Footer
 *
 * @example
 * ```tsx
 * <MarketingPageTemplate
 *   hero={<AboutHero />}
 *   sections={[
 *     { id: "mission", component: <MissionSection /> },
 *     { id: "team", component: <TeamSection />, background: "muted" },
 *   ]}
 *   cta={<AboutCTA />}
 * />
 * ```
 */

import { SiteNavigation } from "@/components/navigation";
import { Footer } from "@/components/landing/footer";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";
interface MarketingSection {
  /** Unique identifier for the section (used as key) */
  id: string;
  /** The section component to render */
  component: React.ReactNode;
  /** Optional background variant */
  background?: "default" | "muted" | "accent";
  /** Optional additional className */
  className?: string;
}

export interface MarketingPageTemplateProps {
  /**
   * Hero section (REQUIRED)
   * This is the first thing users see below navigation
   */
  hero: React.ReactNode;

  /**
   * Content sections (FLEXIBLE)
   * Array of sections to render between hero and CTA
   */
  sections?: MarketingSection[];

  /**
   * Call-to-action section (OPTIONAL)
   * Rendered at the bottom before the footer
   */
  cta?: React.ReactNode;

  /**
   * Overlay elements (OPTIONAL)
   * Sticky bars, popups, modals that appear outside main content flow
   */
  overlays?: React.ReactNode;

  /**
   * Additional className for the main wrapper
   */
  className?: string;

  /**
   * Children for custom content (alternative to sections array)
   */
  children?: React.ReactNode;
}

/**
 * Get background classes for a section variant
 */
function getSectionBackground(background?: "default" | "muted" | "accent"): string {
  switch (background) {
    case "muted":
      return "bg-muted/30";
    case "accent":
      return "bg-accent/10";
    default:
      return "";
  }
}

/**
 * Marketing Page Template
 *
 * Structure:
 * - Navigation (always from site-navigation.tsx)
 * - <main>
 *   - Hero Section (required)
 *   - Content Sections (from array or children)
 *   - CTA Section (optional)
 * - Footer (always from footer.tsx)
 */
export function MarketingPageTemplate({
  hero,
  sections = [],
  cta,
  overlays,
  className,
  children,
}: MarketingPageTemplateProps) {
  return (
    <div className={cn(mode.font, className)}>
      <SiteNavigation />

      <main>
        {/* Hero Section - Always First */}
        {hero}

        {/* Content Sections - Either from array or children */}
        {sections.length > 0
          ? sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className={cn(getSectionBackground(section.background), section.className)}
              >
                {section.component}
              </section>
            ))
          : children}

        {/* CTA Section - Optional */}
        {cta}
      </main>

      <Footer />

      {/* Overlay Elements - Sticky bars, popups, etc. */}
      {overlays}
    </div>
  );
}

/**
 * Marketing Page Header Component
 *
 * Reusable header for marketing pages with terminal styling
 */
export interface MarketingPageHeaderProps {
  /** Terminal code prefix (e.g., "0x00") */
  code?: string;
  /** Badge text after the code */
  badge?: string;
  /** Main title (will be converted to UPPERCASE_SNAKE_CASE) */
  title: string;
  /** Description text */
  description?: string;
  /** Optional className */
  className?: string;
}

export function MarketingPageHeader({
  code = "0x00",
  badge,
  title,
  description,
  className,
}: MarketingPageHeaderProps) {
  return (
    <section className={cn("border-border border-b px-6 py-16 lg:py-20", className)}>
      <div className="mx-auto max-w-4xl text-center">
        {/* Terminal Badge */}
        <div className="border-border bg-card mb-4 inline-block border px-4 py-1">
          <span className={cn("text-muted-foreground text-xs", mode.font)}>
            [ [{code}] {title.toUpperCase().replace(/ /g, "_")} ]{badge ? ` ${badge}` : ""}
          </span>
        </div>

        {/* Title */}
        <h1 className={cn("mb-4 text-4xl font-semibold tracking-tight", mode.font)}>
          {title.toUpperCase().replace(/ /g, "_")}
        </h1>

        {/* Description */}
        {description && (
          <p className={cn("text-muted-foreground mx-auto max-w-2xl text-sm", mode.font)}>
            &gt; {description.toUpperCase().replace(/ /g, "_")}
          </p>
        )}
      </div>
    </section>
  );
}

export default MarketingPageTemplate;
