"use client";

/**
 * Payment Methods Page
 * Manage payment methods and billing information
 */

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  CreditCard,
  Plus,
  Trash2,
  CheckCircle2,
  ArrowLeft,
  Shield,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PaymentMethodsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast, error: showError, success } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [methodToDelete, setMethodToDelete] = useState<string | null>(null);

  // Payment methods list - initially empty
  // In a full implementation, fetch from GET /api/stripe/payment-methods endpoint
  // which would call stripe.paymentMethods.list({ customer: customerId })
  const [paymentMethods] = useState<Array<{
    id: string;
    type: string;
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
    isDefault: boolean;
  }>>([]);

  const handleAddPaymentMethod = async () => {
    setIsLoading(true);
    try {
      // Create Stripe Checkout session in setup mode
      const response = await fetch("/api/stripe/setup-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create setup intent");
      }

      const { url } = await response.json();

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error: unknown) {
      showError(
        "Error",
        error instanceof Error ? error.message : "Failed to add payment method"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      // Update default payment method via Stripe API
      const response = await fetch("/api/stripe/payment-methods/default", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethodId: id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to set default payment method");
      }

      success(
        "Success",
        "Default payment method updated successfully"
      );

      // Reload to update UI
      window.location.reload();
    } catch (error: unknown) {
      showError(
        "Error",
        error instanceof Error ? error.message : "Failed to set default payment method"
      );
    }
  };

  const confirmDelete = async () => {
    if (!methodToDelete) return;

    setDeleteDialogOpen(false);

    try {
      // Detach payment method from customer
      const response = await fetch(`/api/stripe/payment-methods/${methodToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete payment method");
      }

      success(
        "Success",
        "Payment method removed successfully"
      );

      // Reload to update UI
      window.location.reload();
    } catch (error: unknown) {
      showError(
        "Error",
        error instanceof Error ? error.message : "Failed to delete payment method"
      );
    } finally {
      setMethodToDelete(null);
    }
  };

  const getCardIcon = (brand: string) => {
    // In real implementation, use actual card brand icons
    return <CreditCard className="h-6 w-6" />;
  };

  return (
    <div className="container mx-auto max-w-6xl px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/billing">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Billing
          </Button>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight mb-2">Payment Methods</h1>
            <p className="text-muted-foreground text-lg">
              Manage your payment methods and billing information
            </p>
          </div>
          <Button onClick={handleAddPaymentMethod} disabled={isLoading}>
            <Plus className="mr-2 h-4 w-4" />
            Add Payment Method
          </Button>
        </div>
      </div>

      {/* Security Notice */}
      <Alert className="mb-6">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          All payment information is securely processed by Stripe. We never store your
          complete card details.
        </AlertDescription>
      </Alert>

      {/* Payment Methods List */}
      <div className="space-y-4">
        {paymentMethods.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center space-y-4">
              <CreditCard className="h-12 w-12 mx-auto text-muted-foreground" />
              <div>
                <h3 className="font-semibold mb-1">No payment methods</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add a payment method to subscribe to plans and make purchases
                </p>
                <Button onClick={handleAddPaymentMethod}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          paymentMethods.map((method) => (
            <Card key={method.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="p-3 rounded-lg bg-primary/10 border-2 border-border">
                      {getCardIcon(method.brand)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold capitalize">
                          {method.brand} •••• {method.last4}
                        </p>
                        {method.isDefault && (
                          <Badge variant="default" className="text-xs">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Expires {method.expMonth}/{method.expYear}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {!method.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(method.id)}
                      >
                        Set as Default
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setMethodToDelete(method.id);
                        setDeleteDialogOpen(true);
                      }}
                      disabled={method.isDefault && paymentMethods.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Information Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Secure Processing</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            All payments are processed securely through Stripe. Your payment information
            is encrypted and we never have access to your full card details.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Automatic Billing</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Your default payment method will be charged automatically for subscriptions
            and recurring payments. You'll receive a receipt after each transaction.
          </CardContent>
        </Card>
      </div>

      {/* Delete Payment Method Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Payment Method?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this payment method from your account. You can add it again later if needed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove Payment Method
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
