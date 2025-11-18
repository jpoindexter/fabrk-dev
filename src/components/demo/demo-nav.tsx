"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoAlt as Logo } from "@/components/home/logo-alt";

interface DemoNavProps {
  backButtonText?: string;
  backButtonHref?: string;
}

export function DemoNav({
  backButtonText = "Back Home",
  backButtonHref = "/",
}: DemoNavProps = {}) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo/Home Link */}
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Logo size={24} />
        </Link>

        {/* CTA Button */}
        <Button asChild>
          <Link href={backButtonHref}>{backButtonText}</Link>
        </Button>
      </div>
    </nav>
  );
}
