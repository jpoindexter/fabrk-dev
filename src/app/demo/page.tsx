/**
 * Template Gallery Hub
 * Browse templates by category
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DemoNav } from "@/components/demo/demo-nav";
import { Footer } from "@/components/landing/footer";
import {
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  Palette,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    id: "dashboard",
    name: "Dashboards",
    description: "Analytics, metrics, and data visualization templates",
    icon: LayoutDashboard,
    href: "/templates/dashboards",
    count: 3,
  },
  {
    id: "admin",
    name: "Admin Panels",
    description: "User management and administrative interfaces",
    icon: Settings,
    href: "/templates/admin-panels",
    count: 1,
  },
  {
    id: "account",
    name: "Account Pages",
    description: "Settings, billing, security, and user profile pages",
    icon: Users,
    href: "/templates/account-pages",
    count: 3,
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Email templates and documentation layouts",
    icon: FileText,
    href: "/templates/marketing",
    count: 2,
  },
  {
    id: "components",
    name: "Components",
    description: "100+ UI components with variants",
    icon: Palette,
    href: "/components",
    count: null,
  },
];

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <DemoNav />

      <main className="container mx-auto max-w-7xl px-6 py-12 space-y-12">
        {/* Header */}
        <section className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">Template Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a category to explore ready-to-use templates. Each template is copy-paste ready and fully customizable.
          </p>
        </section>

        {/* Category Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={category.href}>
              <Card className="h-full group hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-3 rounded-lg bg-primary/10 border-2 border-border group-hover:bg-primary/20 transition-colors">
                        <category.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{category.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {category.description}
                        </CardDescription>
                      </div>
                    </div>
                    {category.count && (
                      <Badge variant="secondary">{category.count}</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Browse
                    </span>
                    <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
