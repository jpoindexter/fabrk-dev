import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404: Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
  robots: "noindex, nofollow",
};

export default function NotFound() {
  return (
 <div className="flex flex-col items-center justify-center px-6 font-mono">
      <div className="mx-auto max-w-2xl text-center">
        {/* Terminal Header */}
        <div className="mb-6 inline-block border-2 border-foreground/20 bg-foreground/5 px-3 py-1">
          <span className="text-xs tracking-wider text-foreground/60">
            [ [0x404] ERROR_PAGE ]
          </span>
        </div>

        {/* 404 Display */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold tracking-tighter text-foreground md:text-9xl">
            404
          </h1>
          <div className="mx-auto mt-4 h-0.5 w-24 bg-foreground/20"></div>
        </div>

        {/* Error Message */}
        <h2 className="mb-4 text-xl font-bold uppercase tracking-wider text-foreground">
          PAGE_NOT_FOUND
        </h2>
        <p className="mb-2 text-sm text-foreground/60">
          [ [0x01] STATUS ]---------------------------------
        </p>
        <p className="mb-8 text-foreground/80">
          The requested resource could not be located on this server.
          <br />
          <span className="text-foreground/60">Path may have been moved or deleted.</span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild className="h-12 rounded-none px-8 uppercase tracking-wider">
            <Link href="/">
              <span className="mr-2 text-lg">▸</span>
              RETURN_HOME
            </Link>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 border-t border-foreground/10 pt-8">
          <p className="mb-4 text-xs uppercase tracking-wider text-foreground/60">
            [ NAVIGATION_OPTIONS ]
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/#features" className="text-foreground/70 transition-colors hover:text-primary">
              &gt; FEATURES
            </Link>
            <Link href="/#pricing" className="text-foreground/70 transition-colors hover:text-primary">
              &gt; PRICING
            </Link>
            <Link href="/#faq" className="text-foreground/70 transition-colors hover:text-primary">
              &gt; FAQ
            </Link>
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="mt-12 text-xs text-foreground/40">
          <span className="animate-pulse">▊</span> System ready for input_
        </div>
      </div>
    </div>
  );
}
