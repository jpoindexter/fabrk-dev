import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404: Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
  robots: "noindex, nofollow",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="mx-auto max-w-2xl text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-foreground">404</h1>
          <div className="mx-auto mt-4 h-1 w-24 bg-primary"></div>
        </div>

        {/* Error Message */}
        <h2 className="mb-4 text-3xl font-bold text-foreground">
          Page Not Found
        </h2>
        <p className="mb-8 text-lg text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild className="h-12 px-8">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 border-t border-border/60 pt-8">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/#features" className="text-primary hover:underline">
              Features
            </Link>
            <Link href="/#pricing" className="text-primary hover:underline">
              Pricing
            </Link>
            <Link href="/#faq" className="text-primary hover:underline">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
