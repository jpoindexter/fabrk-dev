/**
 * Feature Gate Component
 * Conditionally render components based on feature flags
 */

"use client";

import { useFeatureFlag, useFeatureVariant } from "@/lib/feature-flags/hooks";

interface FeatureGateProps {
  flag: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Render children only if feature flag is enabled
 *
 * @example
 * <FeatureGate flag="new_dashboard">
 *   <NewDashboard />
 * </FeatureGate>
 */
export function FeatureGate({ flag, children, fallback = null }: FeatureGateProps) {
  const isEnabled = useFeatureFlag(flag);

  if (!isEnabled) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

interface VariantGateProps {
  flag: string;
  variants: Record<string, React.ReactNode>;
  fallback?: React.ReactNode;
}

/**
 * Render different components based on feature variant (A/B testing)
 *
 * @example
 * <VariantGate
 *   flag="checkout_flow"
 *   variants={{
 *     control: <OldCheckout />,
 *     variant_a: <NewCheckoutA />,
 *     variant_b: <NewCheckoutB />
 *   }}
 * />
 */
export function VariantGate({ flag, variants, fallback = null }: VariantGateProps) {
  const variant = useFeatureVariant(flag);

  if (!variant || !variants[variant]) {
    return <>{fallback}</>;
  }

  return <>{variants[variant]}</>;
}
