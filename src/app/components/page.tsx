/**
 * UI Components Showcase
 * Interactive preview of all 100+ UI components with variants
 */

import Link from "next/link";
import { DemoNav } from "@/components/demo/demo-nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ActivityTimelineDemo from "./activity-timeline-demo";
import { ArrowRight, Bell, Check, Download, Heart, Mail, Search, Settings, Upload, User, X, UserCog, Trash2, MoreHorizontal } from "lucide-react";

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Demo Navigation */}
      <DemoNav backButtonText="Back" backButtonHref="/demo" />

      <main className="container mx-auto max-w-7xl px-6 py-12 space-y-12">
        {/* Buttons Section */}
        <section id="buttons" className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Buttons</h2>
            <p className="text-muted-foreground">Interactive elements with neo-brutalism press effects</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>All available button styles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button>Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Button Sizes</CardTitle>
              <CardDescription>Different size options</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Button with Icons</CardTitle>
              <CardDescription>Buttons with leading and trailing icons</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
              <Button>
                Download
                <Download className="ml-2 h-4 w-4" />
              </Button>
              <Button size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Settings className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Button States</CardTitle>
              <CardDescription>Loading and disabled states</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button loading loadingText="Saving...">Loading</Button>
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>Disabled Outline</Button>
            </CardContent>
          </Card>
        </section>

        {/* Forms Section */}
        <section id="forms" className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Form Components</h2>
            <p className="text-muted-foreground">Input elements with brutal borders and focus states</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Input Fields</CardTitle>
              <CardDescription>Text inputs with different types</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="text">Text Input</Label>
                <Input id="text" placeholder="Enter text..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="disabled">Disabled</Label>
                <Input id="disabled" placeholder="Disabled input" disabled />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Textarea</CardTitle>
              <CardDescription>Multi-line text input</CardDescription>
            </CardHeader>
            <CardContent className="max-w-md">
              <Textarea placeholder="Type your message here..." rows={4} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select</CardTitle>
              <CardDescription>Dropdown selection</CardDescription>
            </CardHeader>
            <CardContent className="max-w-md">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Checkbox & Radio</CardTitle>
              <CardDescription>Selection controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>

              <Separator />

              <RadioGroup defaultValue="option1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="option1" />
                  <Label htmlFor="option1">Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="option2" />
                  <Label htmlFor="option2">Option 2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option3" id="option3" />
                  <Label htmlFor="option3">Option 3</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Switch</CardTitle>
              <CardDescription>Toggle control</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="switch1" />
                <Label htmlFor="switch1">Enable notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="switch2" defaultChecked />
                <Label htmlFor="switch2">Auto-save enabled</Label>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cards Section */}
        <section id="cards" className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Cards</h2>
            <p className="text-muted-foreground">Content containers with brutal shadows</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Simple Card</CardTitle>
                <CardDescription>Basic card with title and description</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This is a simple card component with header and content sections.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card with Actions</CardTitle>
                <CardDescription>Card with button actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Cards can contain any content including forms and buttons.
                </p>
                <div className="flex gap-2">
                  <Button size="sm">Action</Button>
                  <Button size="sm" variant="outline">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Typography Section */}
        <section id="typography" className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Typography</h2>
            <p className="text-muted-foreground">Text styles and formatting</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Headings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h1 className="text-4xl font-bold">Heading 1</h1>
              <h2 className="text-3xl font-bold">Heading 2</h2>
              <h3 className="text-2xl font-bold">Heading 3</h3>
              <h4 className="text-xl font-bold">Heading 4</h4>
              <h5 className="text-lg font-bold">Heading 5</h5>
              <h6 className="text-base font-bold">Heading 6</h6>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Text Styles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">Large text for important content.</p>
              <p className="text-base">Base text for body content.</p>
              <p className="text-sm text-muted-foreground">Small muted text for secondary information.</p>
              <p className="text-xs text-muted-foreground">Extra small text for captions.</p>
            </CardContent>
          </Card>
        </section>

        {/* Feedback Section */}
        <section id="feedback" className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Feedback</h2>
            <p className="text-muted-foreground">Alerts, badges, and status indicators</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Status and category indicators</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="outline">Outline</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
              <CardDescription>Information and warning messages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Bell className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  This is an informational alert with an icon.
                </AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <X className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Something went wrong. Please try again.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </section>

        {/* Navigation Section */}
        <section id="navigation" className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Navigation</h2>
            <p className="text-muted-foreground">Tabs and navigation elements</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tabs</CardTitle>
              <CardDescription>Tabbed navigation interface</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="tab1">
                <TabsList>
                  <TabsTrigger value="tab1">Account</TabsTrigger>
                  <TabsTrigger value="tab2">Settings</TabsTrigger>
                  <TabsTrigger value="tab3">Billing</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="space-y-4">
                  <h4 className="font-semibold">Account Settings</h4>
                  <p className="text-sm text-muted-foreground">
                    Manage your account settings and preferences.
                  </p>
                </TabsContent>
                <TabsContent value="tab2" className="space-y-4">
                  <h4 className="font-semibold">General Settings</h4>
                  <p className="text-sm text-muted-foreground">
                    Configure general application settings.
                  </p>
                </TabsContent>
                <TabsContent value="tab3" className="space-y-4">
                  <h4 className="font-semibold">Billing Information</h4>
                  <p className="text-sm text-muted-foreground">
                    View and manage your billing details.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        {/* Dropdown Menus Section */}
        <section id="dropdown-menus" className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Dropdown Menus</h2>
            <p className="text-muted-foreground">Action menus with proper alignment</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Right-Aligned Menu (align=&quot;end&quot;)</CardTitle>
                <CardDescription>For actions in table rows or right-side triggers</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="font-semibold">
                      <UserCog className="mr-2 h-4 w-4" />
                      Edit User
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-semibold">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive font-semibold">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Left-Aligned Menu (align=&quot;start&quot;)</CardTitle>
                <CardDescription>For sidebar menus or left-positioned actions</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-start">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Options
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuLabel>Menu</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="font-semibold">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-semibold">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Activity Timeline Section */}
        <section id="activity-timeline" className="space-y-6">
          <ActivityTimelineDemo />
        </section>
      </main>
    </div>
  );
}
