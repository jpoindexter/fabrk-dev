/**
 * ✅ FABRK COMPONENT
 * Payment Methods Card - Displays and manages payment methods
 */

import { Button } from "@/components/ui/button";
import { CreditCard, Plus } from "lucide-react";

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

interface PaymentMethodsCardProps {
  paymentMethods: PaymentMethod[];
}

export function PaymentMethodsCard({ paymentMethods }: PaymentMethodsCardProps) {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-2">
          <div className="size-2 rounded-none bg-destructive/50" />
          <div className="size-2 rounded-none bg-warning/50" />
          <div className="size-2 rounded-none bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">payment_methods.json</span>
      </div>
      <div className="p-4">
        <div className="font-mono text-xs text-muted-foreground mb-4">[PAYMENT_METHODS]:</div>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between border border-border p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center border border-border bg-muted">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div className="rounded-none font-mono text-xs">
                  <div>{method.brand} **** {method.last4}</div>
                  <div className="text-muted-foreground">
                    EXP: {method.expMonth}/{method.expYear}
                  </div>
                </div>
              </div>
              {method.isDefault && (
                <span className="border border-primary/50 px-2 py-0.5 font-mono text-xs text-primary">
                  DEFAULT
                </span>
              )}
            </div>
          ))}
        </div>

        <Button variant="outline" size="sm" className="rounded-none w-full mt-4 font-mono text-xs">
          <Plus className="mr-2 h-3 w-3" />
          &gt; ADD_PAYMENT_METHOD
        </Button>
      </div>
    </div>
  );
}
