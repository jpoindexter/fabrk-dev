"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export default function PaginationPage() {
  return (
    <ComponentShowcaseTemplate
      title="Pagination"
      description="Navigation for paginated content with numbered pages and next/previous controls."
      mainPreview={{
        code: `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
        component: (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ),
      }}
      variants={[
        {
          title: "With Ellipsis",
          description: "Show ellipsis for large page ranges",
          code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">10</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
          component: (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">10</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
        },
        {
          title: "With First and Last",
          description: "Include first and last page navigation buttons",
          code: `import { PaginationFirst, PaginationLast } from "@/components/ui/pagination";

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationFirst href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLast href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
          component: (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationFirst href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLast href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
        },
        {
          title: "Minimal",
          description: "Simple pagination with only previous and next buttons",
          code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <span className="text-sm text-muted-foreground px-4">
        Page 2 of 10
      </span>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
          component: (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <span className="text-sm text-muted-foreground px-4">
                    Page 2 of 10
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
        },
        {
          title: "Compact (Icon Only)",
          description: "Icon-only buttons for compact layouts",
          code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationLink href="#" size="icon">
        1
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" size="icon" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" size="icon">
        3
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" size="icon">
        4
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" size="icon">
        5
      </PaginationLink>
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
          component: (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink href="#" size="icon">
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" size="icon" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" size="icon">
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" size="icon">
                    4
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" size="icon">
                    5
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
        },
      ]}
      props={[
        {
          name: "isActive",
          type: "boolean",
          description: "For PaginationLink - marks the current active page",
          default: "false",
        },
        {
          name: "size",
          type: '"default" | "icon"',
          description: "For PaginationLink - controls the button size",
          default: '"icon"',
        },
        {
          name: "href",
          type: "string",
          description: "The URL to navigate to when the link is clicked",
        },
      ]}
      accessibility={[
        "Uses semantic nav element with aria-label='pagination'",
        "Active page is marked with aria-current='page'",
        "Previous/Next buttons have descriptive aria-labels",
        "First/Last buttons have descriptive aria-labels",
        "Ellipsis is hidden from screen readers with aria-hidden",
        "Keyboard navigable with Tab key",
      ]}
      previousPage={{
        title: "Breadcrumb",
        href: "/docs/components/breadcrumb",
      }}
      nextPage={{
        title: "Components",
        href: "/docs/components",
      }}
    />
  );
}
