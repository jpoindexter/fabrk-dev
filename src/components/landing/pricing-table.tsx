"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: Record<string, boolean | string>;
  highlighted?: boolean;
  cta?: { text: string; href: string };
}

interface PricingTableProps {
  plans?: PricingPlan[];
}

const defaultPlans: PricingPlan[] = [
  {
    name: "DIY",
    price: "$0",
    description: "Build from scratch",
    features: {
      typescript: true,
      database: "Your choice",
      components: "0",
      dataTable: false,
      emailTemplates: "0",
      oauthProviders: false,
      paymentProviders: false,
      documentation: "None",
      support: "Stack Overflow",
      updates: "None",
      nextjs: "15",
      authLibrary: "DIY",
    },
    highlighted: false,
    cta: { text: "Start Building", href: "#" },
  },
  {
    name: "ShipFast",
    price: "$199",
    description: "Popular choice",
    features: {
      typescript: false,
      database: "MongoDB",
      components: "30-50",
      dataTable: true,
      emailTemplates: "5",
      oauthProviders: true,
      paymentProviders: "Stripe",
      documentation: "Good",
      support: "Discord",
      updates: "Lifetime",
      nextjs: "13/14",
      authLibrary: "NextAuth v4",
    },
    highlighted: false,
    cta: { text: "View ShipFast", href: "https://shipfa.st" },
  },
  {
    name: "Supastarter",
    price: "$349",
    description: "Most complete",
    features: {
      typescript: true,
      database: "PostgreSQL/MySQL",
      components: "100+",
      dataTable: true,
      emailTemplates: "10+",
      oauthProviders: true,
      paymentProviders: "Stripe/Lemon",
      documentation: "Extensive",
      support: "Discord",
      updates: "Lifetime",
      nextjs: "14",
      authLibrary: "Clerk/Supabase",
    },
    highlighted: false,
    cta: { text: "View Supastarter", href: "https://supastarter.dev" },
  },
  {
    name: "Fabrk",
    price: "$79",
    description: "The Anti-Bloat",
    features: {
      typescript: "Strict Mode",
      database: "PostgreSQL",
      components: "80+",
      dataTable: true,
      emailTemplates: "5",
      oauthProviders: true,
      paymentProviders: "Stripe",
      documentation: "Comprehensive",
      support: "Discord + Email",
      updates: "Lifetime v1.x",
      nextjs: "15",
      authLibrary: "NextAuth v5",
    },
    highlighted: true,
    cta: { text: "Get Fabrk Now", href: "#pricing" },
  },
];

const featureLabels: Record<string, string> = {
  typescript: "TypeScript Support",
  database: "Database",
  components: "Component Count",
  dataTable: "Data Table",
  emailTemplates: "Email Templates",
  oauthProviders: "OAuth (Google, etc.)",
  paymentProviders: "Payment Providers",
  documentation: "Documentation",
  support: "Support",
  updates: "Updates",
  nextjs: "Next.js Version",
  authLibrary: "Auth Library",
};

export function PricingTable({ plans = defaultPlans }: PricingTableProps) {
  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-green-600" />
      ) : (
        <X className="h-5 w-5 text-red-500" />
      );
    }
    return <span className="text-sm font-medium text-black">{value}</span>;
  };

  return (
    <section className="bg-white px-6 py-24 sm:py-32" id="pricing">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Compare & Choose
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#666666]">
            See how Fabrk stacks up against the competition. Same features, 60-77% cheaper.
          </p>
        </div>

        {/* Pricing Table */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              {/* Header Row */}
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 border-b-4 border-r-4 border-black bg-white px-6 py-4 text-left">
                    <span className="text-sm font-semibold text-[#666666]">
                      Features
                    </span>
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.name}
                      className={`border-b-4 border-black px-6 py-4 ${
                        plan.highlighted
                          ? "bg-[#007AFF] border-l-4"
                          : "bg-white border-l-4"
                      }`}
                    >
                      <div className="flex flex-col items-start gap-2">
                        <div>
                          <h3
                            className={`text-xl font-bold ${
                              plan.highlighted ? "text-white" : "text-black"
                            }`}
                          >
                            {plan.name}
                          </h3>
                          <p
                            className={`mt-1 text-sm ${
                              plan.highlighted ? "text-white/80" : "text-[#666666]"
                            }`}
                          >
                            {plan.description}
                          </p>
                        </div>
                        <div
                          className={`text-3xl font-bold ${
                            plan.highlighted ? "text-white" : "text-black"
                          }`}
                        >
                          {plan.price}
                        </div>
                        {plan.highlighted && (
                          <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#007AFF]">
                            Best Value
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Feature Rows */}
              <tbody>
                {Object.entries(featureLabels).map(([key, label], index) => (
                  <tr
                    key={key}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#F9F9F9]"}
                  >
                    <td className="sticky left-0 z-10 border-r-4 border-black bg-inherit px-6 py-4">
                      <span className="text-sm font-semibold text-black">
                        {label}
                      </span>
                    </td>
                    {plans.map((plan) => (
                      <td
                        key={`${plan.name}-${key}`}
                        className={`border-l-4 border-black px-6 py-4 text-center ${
                          plan.highlighted ? "bg-[#007AFF]/5" : ""
                        }`}
                      >
                        {renderFeatureValue(
                          plan.features[key] as boolean | string
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>

              {/* CTA Row */}
              <tfoot>
                <tr className="border-t-4 border-black">
                  <td className="sticky left-0 z-10 border-r-4 border-black bg-white px-6 py-6"></td>
                  {plans.map((plan) => (
                    <td
                      key={`cta-${plan.name}`}
                      className={`border-l-4 border-black px-6 py-6 ${
                        plan.highlighted ? "bg-[#007AFF]/5" : "bg-white"
                      }`}
                    >
                      <Button
                        className={`w-full ${
                          plan.highlighted
                            ? "bg-[#007AFF] text-white hover:bg-[#0066CC]"
                            : "border-2 border-black bg-white text-black hover:bg-black hover:text-white"
                        }`}
                        asChild
                      >
                        <Link href={plan.cta?.href || "#"}>
                          {plan.cta?.text || "Learn More"}
                        </Link>
                      </Button>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Savings Highlight */}
        <div className="mt-8 text-center">
          <p className="text-lg font-semibold text-[#007AFF]">
            💰 Save 60-77% with Fabrk • Same features, better stack
          </p>
        </div>

        {/* Guarantee */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#666666]">
            30-day money-back guarantee • No questions asked
          </p>
        </div>
      </div>
    </section>
  );
}
