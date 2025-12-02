/**
 * ✅ FABRK COMPONENT
 * Billing History Table - Complete payment history with download
 */

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface Payment {
  id: string;
  date: string;
  amount: number;
  status: string;
  description: string;
}

interface BillingHistoryTableProps {
  payments: Payment[];
  formatDate: (date: string) => string;
  formatCurrency: (amount: number) => string;
  getStatusText: (status: string) => { text: string; color: string };
}

export function BillingHistoryTable({
  payments,
  formatDate,
  formatCurrency,
  getStatusText,
}: BillingHistoryTableProps) {
  return (
    <>
      <div className="border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2">
          <div className="flex gap-2">
            <div className="size-2 rounded-full bg-destructive/50" />
            <div className="size-2 rounded-full bg-warning/50" />
            <div className="size-2 rounded-full bg-success/50" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">billing_history.log</span>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="font-mono text-xs text-muted-foreground">
              [BILLING_HISTORY]: COUNT={payments.length}
            </div>
            <Button variant="outline" size="sm" className="rounded-none font-mono text-xs h-7">
              <Download className="mr-2 h-3 w-3" />
              &gt; EXPORT_ALL
            </Button>
          </div>

          {/* Terminal Table */}
          <div className="border border-border">
            <div className="grid grid-cols-5 border-b border-border bg-muted/30 px-4 py-2 font-mono text-xs">
              <span className="text-muted-foreground">[DATE]</span>
              <span className="text-muted-foreground col-span-2">[DESCRIPTION]</span>
              <span className="text-muted-foreground">[AMOUNT]</span>
              <span className="text-muted-foreground">[STATUS]</span>
            </div>
            <div className="divide-y divide-border">
              {payments.map((payment) => {
                const status = getStatusText(payment.status);
                return (
                  <div key={payment.id} className="grid grid-cols-5 px-4 py-4 font-mono text-xs hover:bg-muted/30 items-center">
                    <span>{formatDate(payment.date)}</span>
                    <span className="col-span-2 text-muted-foreground">{payment.description}</span>
                    <span>{formatCurrency(payment.amount)}</span>
                    <div className="flex items-center gap-2">
                      <span className={`border px-2 py-0.5 ${status.color} ${
                        payment.status === "succeeded" ? "border-success/50" :
                        payment.status === "failed" ? "border-destructive/50" : "border-warning/50"
                      }`}>
                        {status.text}
                      </span>
                      <button className="hover:text-foreground text-muted-foreground">
                        <Download className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Info Note */}
      <div className="border border-border bg-card p-4 font-mono text-xs">
        <span className="text-muted-foreground">[INFO]:</span> All invoices are automatically emailed to your registered email address. Contact support if you need assistance.
      </div>
    </>
  );
}
