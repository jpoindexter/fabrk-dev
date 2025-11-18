"use client";
import { toast } from "sonner";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DemoNav } from "@/components/demo/demo-nav";
import { Copy, ExternalLink, LayoutDashboard, Settings, Users, FileText, Palette } from "lucide-react";
import { templates, categories, getCategoryInfo, getTemplatesByCategory } from "../template-data";

export default function AdminPanelsPage() {
  const categoryTemplates = getTemplatesByCategory("admin");
  const categoryInfo = getCategoryInfo("admin");

  return (
    <div className="min-h-screen bg-background">
      <DemoNav backButtonText="Back" backButtonHref="/demo" />

      <main className="container mx-auto max-w-7xl px-6 py-12 space-y-12">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={category.id === "admin" ? "default" : "outline"}
              asChild
              className="gap-2"
            >
              {category.href ? (
                <Link href={category.href}>
                  <category.icon className="h-4 w-4" />
                  {category.name}
                </Link>
              ) : (
                <Link href={`/templates/${category.id === "dashboard" ? "dashboards" : category.id === "admin" ? "admin-panels" : category.id === "account" ? "account-pages" : "marketing"}`}>
                  <category.icon className="h-4 w-4" />
                  {category.name}
                </Link>
              )}
            </Button>
          ))}
        </div>

        {/* Category Header */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            {categoryInfo && <categoryInfo.icon className="h-6 w-6 text-primary" />}
            <h2 className="text-3xl font-bold">Admin Panels</h2>
            <Badge variant="secondary">{categoryTemplates.length}</Badge>
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {categoryTemplates.map((template) => (
              <Card key={template.id} className="group hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-3 rounded-lg bg-primary/10 border-2 border-border">
                        <template.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{template.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {template.description}
                        </CardDescription>
                      </div>
                    </div>
                    {template.badge && <Badge>{template.badge}</Badge>}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature) => (
                      <Badge key={feature} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button asChild className="flex-1">
                      <Link href={template.href}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Template
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        toast.success("Template code copied to clipboard!");
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Template Features Card */}
        <Card className="border border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <h4 className="mb-2 font-semibold">⚙️ Admin Panel Templates</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="font-semibold">✓ User management with role-based access control</li>
              <li className="font-semibold">✓ Invitation system with 7-day token expiry</li>
              <li className="font-semibold">✓ Organization switcher with multi-tenancy support</li>
              <li className="font-semibold">✓ Audit logs and activity tracking</li>
              <li className="font-semibold">✓ Data tables with sorting, filtering, and pagination</li>
              <li className="font-semibold">✓ Webhook management and delivery history</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
