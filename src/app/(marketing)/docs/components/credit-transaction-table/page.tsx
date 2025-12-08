"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { TransactionTable } from "@/components/credits";

// Mock transaction data for previews
const mixedTransactions = [
  {
    id: "1",
    amount: -10,
    type: "USAGE",
    description: "Form generation",
    endpoint: "/api/ai/generate-form",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 min ago
  },
  {
    id: "2",
    amount: -20,
    type: "USAGE",
    description: "Code generation",
    endpoint: "/api/ai/generate-code",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
  },
  {
    id: "3",
    amount: 500,
    type: "PURCHASE",
    description: "Purchased 500 credit pack",
    endpoint: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: "4",
    amount: 1000,
    type: "SUBSCRIPTION_REFILL",
    description: "Monthly refill for starter tier",
    endpoint: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
];

const usageOnlyTransactions = [
  {
    id: "1",
    amount: -10,
    type: "USAGE",
    description: "Form generation",
    endpoint: "/api/ai/generate-form",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "2",
    amount: -1,
    type: "USAGE",
    description: "Chat message",
    endpoint: "/api/ai/chat",
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
  {
    id: "3",
    amount: -20,
    type: "USAGE",
    description: "Code generation",
    endpoint: "/api/ai/generate-code",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
];

const refillTransactions = [
  {
    id: "1",
    amount: 1000,
    type: "SUBSCRIPTION_REFILL",
    description: "Monthly refill for starter tier",
    endpoint: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: "2",
    amount: 1000,
    type: "SUBSCRIPTION_REFILL",
    description: "Monthly refill for starter tier",
    endpoint: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
  },
];

const bonusTransactions = [
  {
    id: "1",
    amount: 50,
    type: "BONUS",
    description: "Referral bonus",
    endpoint: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "2",
    amount: 25,
    type: "REFUND",
    description: "Failed generation refund",
    endpoint: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
];

export default function CreditTransactionTablePage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.122]"
      category="Credits"
      title="Credit Transaction Table"
      description="Displays credit transaction history with type icons, amounts, descriptions, and timestamps. Supports all transaction types: usage, purchases, refills, bonuses, and refunds."
      importCode={`import { TransactionTable } from "@/components/credits"`}
      mainPreview={{
        preview: (
          <div className="mx-auto max-w-lg p-4">
            <TransactionTable transactions={mixedTransactions} />
          </div>
        ),
        code: `<TransactionTable transactions={transactions} />`,
      }}
      variants={[
        {
          title: "Usage Transactions",
          description: "Shows credit deductions from AI operations.",
          preview: (
            <div className="mx-auto max-w-lg p-4">
              <TransactionTable transactions={usageOnlyTransactions} />
            </div>
          ),
          code: `// Usage transactions show red arrows and negative amounts`,
        },
        {
          title: "Subscription Refills",
          description: "Monthly credit replenishments.",
          preview: (
            <div className="mx-auto max-w-lg p-4">
              <TransactionTable transactions={refillTransactions} />
            </div>
          ),
          code: `// Refills show refresh icon and green amounts`,
        },
        {
          title: "Bonuses & Refunds",
          description: "Special credit additions.",
          preview: (
            <div className="mx-auto max-w-lg p-4">
              <TransactionTable transactions={bonusTransactions} />
            </div>
          ),
          code: `// Bonuses and refunds show distinct icons`,
        },
        {
          title: "Empty State",
          description: "Message when no transactions exist.",
          preview: (
            <div className="mx-auto max-w-lg p-4">
              <TransactionTable transactions={[]} />
            </div>
          ),
          code: `<TransactionTable transactions={[]} />`,
        },
      ]}
      props={[
        {
          name: "transactions",
          type: "Transaction[]",
          required: true,
          description:
            "Array of transaction objects with id, amount, type, description, endpoint, and createdAt.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes to apply.",
        },
      ]}
      accessibility={[
        "Color-coded amounts (red for deductions, green for additions)",
        "Type-specific icons for quick recognition",
        "Timestamps for chronological context",
        "Endpoint display for debugging/transparency",
      ]}
      previous={{ title: "Credit Usage Chart", href: "/docs/components/credit-usage-chart" }}
      next={{ title: "Overview", href: "/docs/components/overview" }}
    />
  );
}
