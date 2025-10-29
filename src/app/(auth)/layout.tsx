/**
 * ✅ COMPONENT
 * - File Size: ✓ (< 100 lines)
 * - Type Safety: ✓
 * - Alias Imports: ✓
 */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { tokens } from "@/lib/design-system/tokens";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-6">
      {/* Back to Home */}
      <div className="absolute left-4 top-4">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className={`mr-2 ${tokens.sizes.icon.sm}`} />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Logo/Brand */}
      <div className="mb-8">
        <Link href="/" className={`flex items-center ${tokens.spacing.gap[2]}`}>
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-xl font-medium text-primary-foreground">C</span>
          </div>
          <span className="text-2xl font-medium">Fabrk</span>
        </Link>
      </div>

      {/* Auth Card Container */}
      <Card className="w-full max-w-md ">{children}</Card>

      {/* Footer Links */}
      <div className={`mt-8 text-center ${tokens.text.size.sm} text-muted-foreground`}>
        <div className="flex items-center justify-center gap-4">
          <Link href="/privacy" className="transition-colors hover:text-foreground">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="/terms" className="transition-colors hover:text-foreground">
            Terms of Service
          </Link>
          <span>•</span>
          <Link href="/help" className="transition-colors hover:text-foreground">
            Help
          </Link>
        </div>
        <p className="mt-2">© {new Date().getFullYear()} Fabrk. All rights reserved.</p>
      </div>
    </div>
  );
}
