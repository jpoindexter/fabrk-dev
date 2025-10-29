/**
 * ✅ FABRK COMPONENT
 * Footer Sections Components
 * Production-ready ✓
 */

import { FabrkLogo } from "@/components/icons/fabrk-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tokens } from "@/lib/design-system/tokens";
import { ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import { footerLinks, socialLinks, trustBadges } from "./footer-data";

interface NewsletterSectionProps {
  email: string;
  setEmail: (email: string) => void;
  subscribed: boolean;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

export function NewsletterSection({
  email,
  setEmail,
  subscribed,
  loading,
  handleSubmit,
}: NewsletterSectionProps) {
  return (
    <div className="border-b">
      <div className="container py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className={`mb-2 text-2xl font-medium`}>Stay Updated</h3>
          <p className="mb-6 text-muted-foreground">
            Get the latest updates on new components, templates, and features.
          </p>

          <form
            onSubmit={handleSubmit}
            className={`mx-auto flex max-w-md ${tokens.spacing.gap[2]}`}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
              disabled={loading}
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                "Subscribing..."
              ) : subscribed ? (
                "Subscribed!"
              ) : (
                <>
                  Subscribe
                  <ArrowRight
                    className={`ml-2 ${tokens.sizes.icon.sm} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
                  />
                </>
              )}
            </Button>
          </form>

          {subscribed && (
            <p className={`mt-4 ${tokens.text.size.sm} text-primary dark:text-primary`}>
              Thanks for subscribing! Check your email for confirmation.
            </p>
          )}

          <p className={`mt-4 ${tokens.text.size.xs} text-muted-foreground`}>
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}

export function FooterLinksSection() {
  return (
    <div className="container py-12">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
        {/* Product Column */}
        <div>
          <h4 className="mb-4 font-medium">Product</h4>
          <ul className={`${tokens.spacing.space.y[2]}`}>
            {footerLinks.product.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`inline-flex items-center gap-2 ${tokens.text.size.sm} text-muted-foreground transition-colors hover:text-foreground`}
                >
                  {link.label}
                  {link.badge && (
                    <Badge variant="secondary" className={`h-4 px-2 ${tokens.text.size.xs}`}>
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources Column */}
        <div>
          <h4 className="mb-4 font-medium">Resources</h4>
          <ul className={`${tokens.spacing.space.y[2]}`}>
            {footerLinks.resources.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`inline-flex items-center gap-2 ${tokens.text.size.sm} text-muted-foreground transition-colors hover:text-foreground`}
                >
                  {link.label}
                  {link.badge && (
                    <Badge variant="secondary" className={`h-4 px-2 ${tokens.text.size.xs}`}>
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h4 className="mb-4 font-medium">Company</h4>
          <ul className={`${tokens.spacing.space.y[2]}`}>
            {footerLinks.company.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${tokens.text.size.sm} text-muted-foreground transition-colors hover:text-foreground`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h4 className="mb-4 font-medium">Legal</h4>
          <ul className={`${tokens.spacing.space.y[2]}`}>
            {footerLinks.legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${tokens.text.size.sm} text-muted-foreground transition-colors hover:text-foreground`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect Column - Spans 2 columns on larger screens */}
        <div className="col-span-2">
          <h4 className="mb-4 font-medium">Connect</h4>

          {/* Social Links */}
          <div className={`mb-6 flex ${tokens.spacing.gap[2]}`}>
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 transition-colors hover:bg-accent"
                  aria-label={social.label}
                >
                  <Icon className={`${tokens.sizes.icon.md}`} />
                </Link>
              );
            })}
          </div>

          {/* Trust Badges */}
          <div className={`${tokens.spacing.space.y[2]}`}>
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className={`flex items-center gap-2 ${tokens.text.size.sm} text-muted-foreground`}
                >
                  <Icon className={`${tokens.sizes.icon.sm}`} />
                  <span>{badge.label}</span>
                </div>
              );
            })}
          </div>

          {/* Community Stats */}
          <div className={`mt-6 rounded-lg bg-muted/50 ${tokens.components.card.content}`}>
            <div className="mb-2 flex items-center justify-between">
              <span className={`${tokens.text.size.sm} font-medium`}>Join our community</span>
              <Badge variant="secondary">7,394 developers</Badge>
            </div>
            <Link href="https://discord.gg/fabrk" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Action button"
              >
                <MessageSquare className={`mr-2 ${tokens.sizes.icon.sm}`} />
                Join Discord
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t pt-8">
        <div
          className={`flex flex-col items-center justify-between ${tokens.spacing.gap[4]} md:flex-row`}
        >
          {/* Logo and Copyright */}
          <div className={`flex items-center ${tokens.spacing.gap[2]}`}>
            <FabrkLogo size={24} />
            <span className={`${tokens.text.size.sm} text-muted-foreground`}>
              © {new Date().getFullYear()} Fabrk. All rights reserved.
            </span>
          </div>

          {/* Additional Links */}
          <div className={`flex items-center gap-4 ${tokens.text.size.sm} text-muted-foreground`}>
            <Link href="/sitemap" className="transition-colors hover:text-foreground">
              Sitemap
            </Link>
            <span>•</span>
            <Link href="/accessibility" className="transition-colors hover:text-foreground">
              Accessibility
            </Link>
            <span>•</span>
            <Link href="/status" className="transition-colors hover:text-foreground">
              Status
            </Link>
            <span>•</span>
            <Link href="/api" className="transition-colors hover:text-foreground">
              API
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
