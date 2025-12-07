"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { PageWrapper } from "@/components/ui/page-wrapper";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

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
                <CardHeader code="0x00" title="Centered_Content" />
                <CardContent padding="md">
                  This card is vertically and horizontally centered
                </CardContent>
              </Card>
            </PageWrapper>
          </div>
        ),
        code: `<PageWrapper>
  <Card>
    <CardHeader code="0x00" title="Login" />
    <CardContent padding="md">
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
                  <CardHeader code="0x01" title="Login" />
                  <CardContent padding="md">
                    Email and password form would go here
                  </CardContent>
                </Card>
              </PageWrapper>
            </div>
          ),
          code: `<PageWrapper>
  <Card>
    <CardHeader code="0x01" title="Login" />
    <CardContent padding="md">
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
                  <div className="text-destructive text-4xl font-semibold">404</div>
                  <p>Page not found</p>
                </div>
              </PageWrapper>
            </div>
          ),
          code: `<PageWrapper>
  <div className="space-y-4 text-center">
    <h1 className="text-4xl font-semibold">404</h1>
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
                  <CardHeader code="0x02" title="Custom_Background" />
                  <CardContent padding="md">
                    Background customized via className
                  </CardContent>
                </Card>
              </PageWrapper>
            </div>
          ),
          code: `<PageWrapper className="bg-primary/5">
  <Card>
    <CardHeader code="0x02" title="Content" />
    <CardContent padding="md">
      {/* content */}
    </CardContent>
  </Card>
</PageWrapper>`,
        },
        {
          title: "Minimal Content",
          description: "Works with any content, not just cards.",
          preview: (
            <div className="h-64 w-full">
              <PageWrapper>
                <div>
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
