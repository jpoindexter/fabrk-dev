/**
 * Breadcrumbs Component
 * SEO and AEO optimized with JSON-LD schema
 */

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data";
import { SchemaScript } from "./SchemaScript";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
}

/**
 * SEO-optimized breadcrumb navigation
 * Automatically includes JSON-LD schema
 *
 * @example
 * <Breadcrumbs
 *   items={[
 *     { name: "Products", url: "/products" },
 *     { name: "SaaS Boilerplate", url: "/products/saas" }
 *   ]}
 * />
 */
export function Breadcrumbs({ items, showHome = true }: BreadcrumbsProps) {
  const allItems = showHome
    ? [{ name: "Home", url: "/" }, ...items]
    : items;

  const schema = generateBreadcrumbSchema(allItems);

  return (
    <>
      <SchemaScript schema={schema} />

      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <div key={item.url} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
              )}

              {isLast ? (
                <span className="font-medium text-gray-900" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {index === 0 && showHome ? (
                    <Home className="h-4 w-4" />
                  ) : (
                    item.name
                  )}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
