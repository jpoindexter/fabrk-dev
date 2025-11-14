/**
 * ✅ FABRK COMPONENT
 * Multi-step checkout form with validation
 *
 * @example
 * ```tsx
 * <CheckoutForm
 *   cartTotal={99.99}
 *   onSubmit={async (data) => console.log(data)}
 * />
 * ```
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Stepper, Step } from "@/components/ui/stepper";
import { CreditCard, Lock, ArrowLeft, ArrowRight, Check } from "lucide-react";

export interface CheckoutFormData {
  shipping: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  billing: {
    sameAsShipping: boolean;
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  payment: {
    method: "card" | "paypal" | "apple_pay" | "google_pay";
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    saveCard?: boolean;
  };
}

export interface CheckoutFormProps {
  cartTotal: number;
  currency?: string;
  onSubmit?: (data: CheckoutFormData) => Promise<void>;
  onStepChange?: (step: number) => void;
  initialData?: Partial<CheckoutFormData>;
  showOrderSummary?: boolean;
  className?: string;
}

const STEPS: Step[] = [
  { id: "shipping", label: "Shipping", description: "Address details" },
  { id: "payment", label: "Payment", description: "Payment method" },
  { id: "review", label: "Review", description: "Confirm order" },
];

const COUNTRIES = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
];

export function CheckoutForm({
  cartTotal,
  currency = "USD",
  onSubmit,
  onStepChange,
  initialData,
  showOrderSummary = true,
  className,
}: CheckoutFormProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const [formData, setFormData] = React.useState<CheckoutFormData>({
    shipping: {
      fullName: initialData?.shipping?.fullName || "",
      email: initialData?.shipping?.email || "",
      address: initialData?.shipping?.address || "",
      city: initialData?.shipping?.city || "",
      state: initialData?.shipping?.state || "",
      postalCode: initialData?.shipping?.postalCode || "",
      country: initialData?.shipping?.country || "us",
    },
    billing: {
      sameAsShipping: initialData?.billing?.sameAsShipping ?? true,
      address: initialData?.billing?.address || "",
      city: initialData?.billing?.city || "",
      state: initialData?.billing?.state || "",
      postalCode: initialData?.billing?.postalCode || "",
      country: initialData?.billing?.country || "us",
    },
    payment: {
      method: initialData?.payment?.method || "card",
      cardNumber: initialData?.payment?.cardNumber || "",
      expiryDate: initialData?.payment?.expiryDate || "",
      cvv: initialData?.payment?.cvv || "",
      saveCard: initialData?.payment?.saveCard ?? false,
    },
  });

  React.useEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePostalCode = (code: string, country: string): boolean => {
    if (country === "us") {
      return /^\d{5}(-\d{4})?$/.test(code);
    }
    return code.length >= 3;
  };

  const validateCardNumber = (number: string): boolean => {
    const cleaned = number.replace(/\s/g, "");
    return /^\d{13,19}$/.test(cleaned);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.shipping.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }
      if (!validateEmail(formData.shipping.email)) {
        newErrors.email = "Valid email is required";
      }
      if (!formData.shipping.address.trim()) {
        newErrors.address = "Address is required";
      }
      if (!formData.shipping.city.trim()) {
        newErrors.city = "City is required";
      }
      if (!formData.shipping.state.trim()) {
        newErrors.state = "State is required";
      }
      if (!validatePostalCode(formData.shipping.postalCode, formData.shipping.country)) {
        newErrors.postalCode = "Valid postal code is required";
      }
    } else if (step === 1) {
      if (formData.payment.method === "card") {
        if (!validateCardNumber(formData.payment.cardNumber || "")) {
          newErrors.cardNumber = "Valid card number is required";
        }
        if (!formData.payment.expiryDate) {
          newErrors.expiryDate = "Expiry date is required";
        }
        if (!formData.payment.cvv || formData.payment.cvv.length < 3) {
          newErrors.cvv = "Valid CVV is required";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      await onSubmit?.(formData);
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(" ") : cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData({
      ...formData,
      payment: { ...formData.payment, cardNumber: formatted },
    });
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-8">
        <Stepper steps={STEPS} currentStep={currentStep} />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmitForm} className="space-y-6">
            {/* Step 1: Shipping */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="rounded-md border bg-card p-6 shadow-sm">
                  <h2 className="mb-4 text-xl font-semibold">Shipping Information</h2>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName" required>Full Name</Label>
                      <Input
                        id="fullName"
                        value={formData.shipping.fullName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            shipping: { ...formData.shipping, fullName: e.target.value },
                          })
                        }
                        error={!!errors.fullName}
                        className="mt-1"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-destructive">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" required>Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.shipping.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            shipping: { ...formData.shipping, email: e.target.value },
                          })
                        }
                        error={!!errors.email}
                        className="mt-1"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-destructive">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="address" required>Street Address</Label>
                      <Input
                        id="address"
                        value={formData.shipping.address}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            shipping: { ...formData.shipping, address: e.target.value },
                          })
                        }
                        error={!!errors.address}
                        className="mt-1"
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-destructive">{errors.address}</p>
                      )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="city" required>City</Label>
                        <Input
                          id="city"
                          value={formData.shipping.city}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              shipping: { ...formData.shipping, city: e.target.value },
                            })
                          }
                          error={!!errors.city}
                          className="mt-1"
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-destructive">{errors.city}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="state" required>State</Label>
                        <Input
                          id="state"
                          value={formData.shipping.state}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              shipping: { ...formData.shipping, state: e.target.value },
                            })
                          }
                          error={!!errors.state}
                          className="mt-1"
                        />
                        {errors.state && (
                          <p className="mt-1 text-sm text-destructive">{errors.state}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="postalCode" required>Postal Code</Label>
                        <Input
                          id="postalCode"
                          value={formData.shipping.postalCode}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              shipping: { ...formData.shipping, postalCode: e.target.value },
                            })
                          }
                          error={!!errors.postalCode}
                          className="mt-1"
                        />
                        {errors.postalCode && (
                          <p className="mt-1 text-sm text-destructive">{errors.postalCode}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="country" required>Country</Label>
                        <Select
                          value={formData.shipping.country}
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              shipping: { ...formData.shipping, country: value },
                            })
                          }
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {COUNTRIES.map((country) => (
                              <SelectItem key={country.value} value={country.value}>
                                {country.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="rounded-md border bg-card p-6 shadow-sm">
                  <h2 className="mb-4 text-xl font-semibold">Payment Method</h2>

                  <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                    {[
                      { value: "card", label: "Card", icon: CreditCard },
                      { value: "paypal", label: "PayPal", icon: CreditCard },
                      { value: "apple_pay", label: "Apple Pay", icon: CreditCard },
                      { value: "google_pay", label: "Google Pay", icon: CreditCard },
                    ].map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            payment: {
                              ...formData.payment,
                              method: value as CheckoutFormData["payment"]["method"],
                            },
                          })
                        }
                        className={cn(
                          "rounded-md border p-4 transition-all",
                          formData.payment.method === value
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "bg-background hover:shadow-sm hover:opacity-90"
                        )}
                      >
                        <Icon className="mx-auto mb-2 h-6 w-6" />
                        <p className="text-sm font-medium">{label}</p>
                      </button>
                    ))}
                  </div>

                  {formData.payment.method === "card" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber" required>Card Number</Label>
                        <Input
                          id="cardNumber"
                          value={formData.payment.cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          error={!!errors.cardNumber}
                          className="mt-1"
                        />
                        {errors.cardNumber && (
                          <p className="mt-1 text-sm text-destructive">{errors.cardNumber}</p>
                        )}
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="expiryDate" required>Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            value={formData.payment.expiryDate}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                payment: { ...formData.payment, expiryDate: e.target.value },
                              })
                            }
                            placeholder="MM/YY"
                            maxLength={5}
                            error={!!errors.expiryDate}
                            className="mt-1"
                          />
                          {errors.expiryDate && (
                            <p className="mt-1 text-sm text-destructive">{errors.expiryDate}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="cvv" required>CVV</Label>
                          <Input
                            id="cvv"
                            type="password"
                            value={formData.payment.cvv}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                payment: { ...formData.payment, cvv: e.target.value },
                              })
                            }
                            placeholder="123"
                            maxLength={4}
                            error={!!errors.cvv}
                            className="mt-1"
                          />
                          {errors.cvv && (
                            <p className="mt-1 text-sm text-destructive">{errors.cvv}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="saveCard"
                          checked={formData.payment.saveCard}
                          onCheckedChange={(checked) =>
                            setFormData({
                              ...formData,
                              payment: { ...formData.payment, saveCard: checked as boolean },
                            })
                          }
                        />
                        <Label htmlFor="saveCard" className="cursor-pointer">
                          Save card for future purchases
                        </Label>
                      </div>
                    </div>
                  )}

                  {formData.payment.method !== "card" && (
                    <div className="rounded-md border bg-muted p-4">
                      <p className="text-sm text-muted-foreground">
                        You will be redirected to {formData.payment.method === "paypal" ? "PayPal" : formData.payment.method === "apple_pay" ? "Apple Pay" : "Google Pay"} to complete your payment.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="rounded-md border bg-card p-6 shadow-sm">
                  <h2 className="mb-4 text-xl font-semibold">Review Order</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 font-medium">Shipping Address</h3>
                      <div className="text-sm text-muted-foreground">
                        <p>{formData.shipping.fullName}</p>
                        <p>{formData.shipping.address}</p>
                        <p>
                          {formData.shipping.city}, {formData.shipping.state}{" "}
                          {formData.shipping.postalCode}
                        </p>
                        <p>
                          {COUNTRIES.find((c) => c.value === formData.shipping.country)?.label}
                        </p>
                        <p className="mt-2">{formData.shipping.email}</p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="mb-2 font-medium">Payment Method</h3>
                      <div className="text-sm text-muted-foreground">
                        {formData.payment.method === "card" && formData.payment.cardNumber && (
                          <p>Card ending in {formData.payment.cardNumber.slice(-4)}</p>
                        )}
                        {formData.payment.method !== "card" && (
                          <p className="capitalize">{formData.payment.method.replace("_", " ")}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0 || isSubmitting}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              {currentStep < STEPS.length - 1 ? (
                <Button type="button" onClick={handleNext} disabled={isSubmitting}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" loading={isSubmitting} loadingText="Processing...">
                  <Lock className="mr-2 h-4 w-4" />
                  Complete Order
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        {showOrderSummary && (
          <div className="lg:col-span-1">
            <div className="sticky top-4 rounded-md border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

              <div className="space-y-3 border-b pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">
                    {currency} {cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">
                    {currency} {(cartTotal * 0.1).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-semibold">
                  {currency} {(cartTotal * 1.1).toFixed(2)}
                </span>
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-md border bg-muted p-3">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
