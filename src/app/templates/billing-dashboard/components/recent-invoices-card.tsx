/**
 * ✅ FABRK COMPONENT
 * Recent Invoices Card - Displays recent payment history
 */

import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock, Download } from "lucide-react";

interface Payment {
  id: string;
  date: string;
  amount: number;
  status: string;
  description: string;
}

interface RecentInvoicesCardProps {
  payments: Payment[];
  formatDate: (date: string) => string;
  formatCurrency: (amount: number) => string;
  getStatusText: (status: string) => { text: string; color: string };
  onViewAll: () => void;
}

export function RecentInvoicesCard({
  payments,
  formatDate,
  formatCurrency,
  getStatusText,
  onViewAll,
}: RecentInvoicesCardProps) {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-1.5">
          <div className="size-2 rounded-full bg-destructive/50" />
          <div className="size-2 rounded-full bg-warning/50" />
          <div className="size-2 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">recent_invoices.log</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          className="ml-auto font-mono text-xs h-6 rounded-none"
        >
          &gt; VIEW_ALL
        </Button>
      </div>
      <div className="p-4">
        <div className="font-mono text-xs text-muted-foreground mb-4">[RECENT_INVOICES]: LIMIT=3</div>

        <div className="space-y-2">
          {payments.slice(0, 3).map((payment) => {
            const status = getStatusText(payment.status);
            return (
              <div
                key={payment.id}
                className="flex items-center justify-between border border-border p-3 font-mono text-xs"
              >
                <div className="flex items-center gap-3">
                  {payment.status === "succeeded" ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : payment.status === "failed" ? (
                    <XCircle className="h-4 w-4 text-destructive" />
                  ) : (
                    <Clock className="h-4 w-4 text-warning" />
                  )}
                  <div>
                    <div>{payment.description}</div>
                    <div className="text-muted-foreground">{formatDate(payment.date)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span>{formatCurrency(payment.amount)}</span>
                  <span className={`border px-2 py-0.5 ${status.color} ${
                    payment.status === "succeeded" ? "border-success/50" :
                    payment.status === "failed" ? "border-destructive/50" : "border-warning/50"
                  }`}>
                    {status.text}
                  </span>
                  <button className="hover:text-foreground text-muted-foreground">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
