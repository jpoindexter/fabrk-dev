"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { PageWrapper } from "@/components/ui/page-wrapper";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PageWrapperPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.75]"
      category="Components"
      title="Page Wrapper"
      description="Centered page layout wrapper for auth and standalone pages."
      importCode={`import { PageWrapper } from "@/components/ui/page-wrapper"`}
      mainPreview={{
        preview: (
          <div className="h-64 w-full">
            <PageWrapper>
              <Card>
                <CardHeader>
                  <CardTitle className="font-mono text-sm">
                    <span className="text-primary">&gt;</span> Centered Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="font-mono text-sm text-muted-foreground">
                  This card is vertically and horizontally centered
                </CardContent>
              </Card>
            </PageWrapper>
          </div>
        ),
        code: `<PageWrapper>
  <Card>
    <CardHeader>
      <CardTitle>Login</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Your login form</p>
    </CardContent>
  </Card>
</PageWrapper>`,
      }}
      variants={[
        {
          title: "Login Page",
          description: "Common use case for authentication pages.",
          preview: (
            <div className="h-64 w-full">
              <PageWrapper>
                <Card>
                  <CardHeader>
                    <CardTitle className="font-mono text-sm">Login</CardTitle>
                  </CardHeader>
                  <CardContent className="font-mono text-sm text-muted-foreground">
                    Email and password form would go here
                  </CardContent>
                </Card>
              </PageWrapper>
            </div>
          ),
          code: `<PageWrapper>
  <Card>
    <CardHeader>
      <CardTitle>Login</CardTitle>
    </CardHeader>
    <CardContent>
      <LoginForm />
    </CardContent>
  </Card>
</PageWrapper>`,
        },
        {
          title: "Error Page",
          description: "Centered error messages and 404 pages.",
          preview: (
            <div className="h-64 w-full">
              <PageWrapper>
                <div className="space-y-4 text-center">
                  <div className="font-mono text-4xl font-bold text-destructive">404</div>
                  <p className="font-mono text-sm text-muted-foreground">Page not found</p>
                </div>
              </PageWrapper>
            </div>
          ),
          code: `<PageWrapper>
  <div className="space-y-4 text-center">
    <h1 className="text-4xl font-bold">404</h1>
    <p>Page not found</p>
  </div>
</PageWrapper>`,
        },
        {
          title: "Custom Background",
          description: "Override the default background color.",
          preview: (
            <div className="h-64 w-full">
              <PageWrapper className="bg-primary/5">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-mono text-sm">Custom Background</CardTitle>
                  </CardHeader>
                  <CardContent className="font-mono text-sm text-muted-foreground">
                    Background customized via className
                  </CardContent>
                </Card>
              </PageWrapper>
            </div>
          ),
          code: `<PageWrapper className="bg-primary/5">
  <Card>
    <CardHeader>
      <CardTitle>Content</CardTitle>
    </CardHeader>
  </Card>
</PageWrapper>`,
        },
        {
          title: "Minimal Content",
          description: "Works with any content, not just cards.",
          preview: (
            <div className="h-64 w-full">
              <PageWrapper>
                <div className="rounded-none border border-border bg-card p-6 font-mono text-sm text-muted-foreground">
                  <span className="text-primary">&gt;</span> Simple content block
                </div>
              </PageWrapper>
            </div>
          ),
          code: `<PageWrapper>
  <div>
    <h1>Simple heading</h1>
    <p>Content goes here</p>
  </div>
</PageWrapper>`,
        },
      ]}
      props={[
        {
          name: "children",
          type: "React.ReactNode",
          default: "-",
          description: "Content to be centered on the page.",
        },
        {
          name: "className",
          type: "string",
          default: "-",
          description: "Additional CSS classes for the wrapper.",
        },
      ]}
      accessibility={[
        "Uses semantic HTML with proper container hierarchy",
        "Maintains full viewport height for proper centering",
        "Responsive padding ensures content is never cut off on mobile",
        "Maximum width constraint (max-w-md) optimizes reading experience",
        "Works without JavaScript for universal accessibility",
      ]}
      previous={{ title: "Pagination", href: "/docs/components/pagination" }}
      next={{ title: "Popover", href: "/docs/components/popover" }}
    />
  );
}
