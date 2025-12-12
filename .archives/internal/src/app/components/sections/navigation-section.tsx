/**
 * ✅ FABRK COMPONENT
 * Navigation Section - Tabs and navigation elements
 * Production-ready ✓
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export function NavigationSection() {
  return (
    <section id="navigation" className="space-y-6">
      <div>
        <span className="text-muted-foreground text-xs">[0x60]</span>
        <h2 className="text-2xl font-semibold tracking-tight">NAVIGATION</h2>
        <p className="text-muted-foreground text-xs">&gt; Tabs and navigation elements</p>
      </div>

      <Card>
        <CardHeader code="0x60" title="Tabs" meta="Tabbed navigation interface" />
        <CardContent padding="md">
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Account</TabsTrigger>
              <TabsTrigger value="tab2">Settings</TabsTrigger>
              <TabsTrigger value="tab3">Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="space-y-4">
              <h4 className="font-semibold">Account Settings</h4>
              <p className="text-muted-foreground text-sm">
                Manage your account settings and preferences.
              </p>
            </TabsContent>
            <TabsContent value="tab2" className="space-y-4">
              <h4 className="font-semibold">General Settings</h4>
              <p className="text-muted-foreground text-sm">
                Configure general application settings.
              </p>
            </TabsContent>
            <TabsContent value="tab3" className="space-y-4">
              <h4 className="font-semibold">Billing Information</h4>
              <p className="text-muted-foreground text-sm">View and manage your billing details.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
