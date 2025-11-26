"use client";
import { toast } from "sonner";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DemoNav } from "@/components/demo/demo-nav";
import { ExternalLink } from "lucide-react";
import { getCategoryInfo, getTemplatesByCategory } from "../template-data";

export default function MarketingPage() {
  const categoryTemplates = getTemplatesByCategory("marketing");
  const categoryInfo = getCategoryInfo("marketing");

  return (
    <div className="min-h-screen bg-background">
      <DemoNav backButtonText="Back" backButtonHref="/demo" />

      <main className="container mx-auto max-w-7xl px-6 py-12 space-y-12">
        {/* Category Header */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            {categoryInfo && <categoryInfo.icon className="h-6 w-6 text-primary" />}
            <h2 className="text-3xl font-bold">Marketing</h2>
            <Badge variant="secondary">{categoryTemplates.length}</Badge>
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {categoryTemplates.map((template) => (
              <Card key={template.id} className="group hover:border-primary/50 transition-all">
                <CardHeader>
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
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature) => (
                      <Badge key={feature} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Button asChild className="w-full">
                      <Link href={template.href}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Template
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Template Features Card */}
        <Card>
          <CardContent className="pt-6">
            <h4 className="mb-2 font-semibold">📢 Marketing Page Templates</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="font-semibold">✓ Landing pages with hero sections</li>
              <li className="font-semibold">✓ Feature showcase sections with icons</li>
              <li className="font-semibold">✓ Testimonials and social proof</li>
              <li className="font-semibold">✓ Pricing tables with plan comparison</li>
              <li className="font-semibold">✓ Call-to-action sections and buttons</li>
              <li className="font-semibold">✓ Newsletter signup forms</li>
              <li className="font-semibold">✓ Footer with site navigation and links</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
