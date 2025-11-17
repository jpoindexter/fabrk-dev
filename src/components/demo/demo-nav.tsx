"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoAlt as Logo } from "@/components/home/logo-alt";

interface DemoNavProps {
  activeDemo?: string;
}

const demos = [
  {
    id: "dashboard",
    label: "Dashboard",
    url: "/templates/team-dashboard",
  },
  {
    id: "settings",
    label: "Settings",
    url: "/templates/settings-page",
  },
  {
    id: "admin",
    label: "Admin Panel",
    url: "/templates/user-management",
  },
  {
    id: "charts",
    label: "Analytics",
    url: "/templates/analytics-dashboard",
  },
];

export function DemoNav({ activeDemo }: DemoNavProps) {
  const [activeTab, setActiveTab] = useState(activeDemo || "dashboard");

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo/Home Link */}
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Logo size={24} />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {demos.map((demo) => (
            <Link
              key={demo.id}
              href={demo.url}
              className={`text-sm font-medium transition-colors ${
                activeTab === demo.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {demo.label}
            </Link>
          ))}
          <Link
            href="/templates"
            className="text-sm font-medium text-foreground"
          >
            Templates
          </Link>
        </div>

        {/* CTA Button */}
        <Button asChild>
          <Link href="/">Back Home</Link>
        </Button>
      </div>
    </nav>
  );
}
