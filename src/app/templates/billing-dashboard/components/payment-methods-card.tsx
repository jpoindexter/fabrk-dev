/**
 * ✅ FABRK COMPONENT
 * Payment Methods Card - Displays and manages payment methods
 */

import { Button } from "@/components/ui/button";
import { StyledCard, StyledCardHeader } from "@/components/ui/card";
import { CreditCard, Plus } from "lucide-react";
import { mode } from "@/lib/design-system";
import { cn } from "@/lib/utils";

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
    <StyledCard>
      <StyledCardHeader code="0x00" title="PAYMENT_METHODS" />
      <div className="p-4">
        <div className={cn(mode.font, "text-muted-foreground mb-4 text-xs")}>
          [PAYMENT_METHODS]:
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="border-border flex items-center justify-between border p-4"
            >
              <div className="flex items-center gap-4">
                <div className="border-border bg-muted flex h-8 w-8 items-center justify-center border">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div className={cn(mode.radius, mode.font, "text-xs")}>
                  <div>
                    {method.brand} **** {method.last4}
                  </div>
                  <div className="text-muted-foreground">
                    EXP: {method.expMonth}/{method.expYear}
                  </div>
                </div>
              </div>
              {method.isDefault && (
                <span
                  className={cn(
                    mode.font,
                    "border-primary/50 text-primary border px-2 py-0.5 text-xs"
                  )}
                >
                  DEFAULT
                </span>
              )}
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          className={cn(mode.radius, mode.font, "mt-4 w-full text-xs")}
        >
          <Plus className="mr-2 h-3 w-3" />
          &gt; ADD_PAYMENT_METHOD
        </Button>
      </div>
    </StyledCard>
  );
}
