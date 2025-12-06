/**
 * ✅ FABRK COMPONENT
 * Recent Invoices Card - Displays recent payment history
 */

import { Button } from "@/components/ui/button";
import { TerminalCard, TerminalCardHeader, TerminalCardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, Clock, Download } from "lucide-react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

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
    <TerminalCard tone="neutral">
      <TerminalCardHeader
        code="0x00"
        title="RECENT_INVOICES"
        meta={
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewAll}
            className={cn(mode.radius, mode.font, "h-6 text-xs")}
          >
            &gt; VIEW_ALL
          </Button>
        }
      />
      <TerminalCardContent padding="md">
        <div className={cn(mode.font, "text-muted-foreground mb-4 text-xs")}>
          [RECENT_INVOICES]: LIMIT=3
        </div>

        <div className="space-y-2">
          {payments.slice(0, 3).map((payment) => {
            const status = getStatusText(payment.status);
            return (
              <div
                key={payment.id}
                className={cn(
                  mode.font,
                  "border-border flex items-center justify-between border p-4 text-xs"
                )}
              >
                <div className="flex items-center gap-4">
                  {payment.status === "succeeded" ? (
                    <CheckCircle2 className="text-success size-4" />
                  ) : payment.status === "failed" ? (
                    <XCircle className="text-destructive size-4" />
                  ) : (
                    <Clock className="text-warning size-4" />
                  )}
                  <div>
                    <div>{payment.description}</div>
                    <div className="text-muted-foreground">{formatDate(payment.date)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span>{formatCurrency(payment.amount)}</span>
                  <span
                    className={`border px-2 py-0.5 ${status.color} ${
                      payment.status === "succeeded"
                        ? "border-success/50"
                        : payment.status === "failed"
                          ? "border-destructive/50"
                          : "border-warning/50"
                    }`}
                  >
                    {status.text}
                  </span>
                  <button className="hover:text-foreground text-muted-foreground">
                    <Download className="size-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </TerminalCardContent>
    </TerminalCard>
  );
}
