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
  CreditCard,
  Plus,
  Trash2,
  CheckCircle2,
  ArrowLeft,
  Shield,
} from "lucide-react";

export default function PaymentMethodsPage() {
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in real implementation, fetch from Stripe API
  const [paymentMethods] = useState([
    {
      id: "pm_123",
      type: "card",
      brand: "visa",
      last4: "4242",
      expMonth: 12,
      expYear: 2025,
      isDefault: true,
    },
  ]);

  const handleAddPaymentMethod = async () => {
    setIsLoading(true);
    // TODO: Open Stripe payment method setup
    alert("Stripe payment method setup to be implemented");
    setIsLoading(false);
  };

  const handleSetDefault = async (id: string) => {
    // TODO: Update default payment method in Stripe
    alert(`Set ${id} as default - to be implemented`);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this payment method?")) {
      // TODO: Delete payment method from Stripe
      alert(`Delete ${id} - to be implemented`);
    }
  };

  const getCardIcon = (brand: string) => {
    // In real implementation, use actual card brand icons
    return <CreditCard className="h-6 w-6" />;
  };

  return (
    <div className="container mx-auto max-w-4xl px-6 py-8">
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
            <h1 className="text-4xl font-bold mb-2">Payment Methods</h1>
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
                  <div className="flex items-center gap-4">
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
                      onClick={() => handleDelete(method.id)}
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
      <div className="grid md:grid-cols-2 gap-4 mt-8">
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
    </div>
  );
}
