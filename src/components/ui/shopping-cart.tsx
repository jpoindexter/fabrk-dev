'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, X, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
  maxQuantity?: number;
}

export interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
  onRemoveItem?: (itemId: string) => void;
  onCheckout?: () => void;
  onContinueShopping?: () => void;
  onApplyPromo?: (code: string) => Promise<{ discount: number }>;
  subtotal?: number;
  tax?: number;
  shipping?: number;
  discount?: number;
  currency?: string;
  variant?: 'sidebar' | 'page';
  className?: string;
}

// Price calculation utilities
export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function calculateTotal(
  subtotal: number,
  tax: number = 0,
  shipping: number = 0,
  discount: number = 0
): number {
  return subtotal + tax + shipping - discount;
}

export function formatPrice(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function ShoppingCart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onContinueShopping,
  onApplyPromo,
  subtotal: providedSubtotal,
  tax = 0,
  shipping = 0,
  discount = 0,
  currency = 'USD',
  variant = 'sidebar',
  className,
}: ShoppingCartProps) {
  const [promoCode, setPromoCode] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = providedSubtotal ?? calculateSubtotal(items);
  const total = calculateTotal(subtotal, tax, shipping, discount);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    const item = items.find((i) => i.id === itemId);
    if (item?.maxQuantity && newQuantity > item.maxQuantity) return;
    onUpdateQuantity?.(itemId, newQuantity);
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim() || !onApplyPromo) return;
    setIsApplyingPromo(true);
    try {
      await onApplyPromo(promoCode);
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleCheckout = async () => {
    if (!onCheckout) return;
    setIsCheckingOut(true);
    try {
      await onCheckout();
    } finally {
      setIsCheckingOut(false);
    }
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-6 rounded-md border bg-muted/20 p-8">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-foreground">Your cart is empty</h3>
      <p className="mb-6 text-sm text-muted-foreground">
        Add some items to get started
      </p>
      {onContinueShopping && (
        <Button onClick={onContinueShopping} variant="default">
          Continue Shopping
        </Button>
      )}
    </div>
  );

  const CartContent = () => (
    <>
      {/* Items List */}
      <div className="flex-1 space-y-4 overflow-y-auto">
        {items.map((item) => {
          const isLowStock =
            item.maxQuantity ? item.quantity >= item.maxQuantity * 0.8 : false;
          const isMaxQuantity = item.maxQuantity ? item.quantity >= item.maxQuantity : false;

          return (
            <div
              key={item.id}
              className="group relative rounded-md border bg-card p-4 shadow-sm transition-all hover:shadow-md"
            >
              {/* Remove Button */}
              <button
                onClick={() => onRemoveItem?.(item.id)}
                className="absolute -right-2 -top-2 rounded-full border bg-destructive p-1.5 text-white opacity-0 shadow-sm transition-all hover:shadow-md group-hover:opacity-100"
                aria-label="Remove item"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex gap-4">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <div className="h-20 w-20 overflow-hidden rounded-md border bg-muted">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">{item.name}</h4>
                    {item.variant && (
                      <p className="text-xs text-muted-foreground">{item.variant}</p>
                    )}
                    <p className="mt-1 text-sm font-medium text-primary">
                      {formatPrice(item.price, currency)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center rounded-md border bg-background shadow-sm">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="flex h-8 w-8 items-center justify-center border-r transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="flex h-8 w-12 items-center justify-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        disabled={isMaxQuantity}
                        className="flex h-8 w-8 items-center justify-center border-l transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {isLowStock && (
                      <Badge className="bg-destructive text-destructive-foreground text-xs">
                        {isMaxQuantity
                          ? 'Max quantity'
                          : `Only ${item.maxQuantity! - item.quantity} left`}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Item Total */}
                <div className="flex-shrink-0 text-right">
                  <p className="font-semibold text-foreground">
                    {formatPrice(item.price * item.quantity, currency)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Promo Code */}
      {onApplyPromo && (
        <div className="rounded-md border bg-card p-4 shadow-sm">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              onClick={handleApplyPromo}
              disabled={!promoCode.trim() || isApplyingPromo}
              variant="outline"
            >
              {isApplyingPromo ? 'Applying...' : 'Apply'}
            </Button>
          </div>
        </div>
      )}

      {/* Price Breakdown */}
      <div className="rounded-md border bg-card p-4 shadow-sm">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">{formatPrice(subtotal, currency)}</span>
          </div>

          {tax > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span className="font-medium">{formatPrice(tax, currency)}</span>
            </div>
          )}

          {shipping > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">{formatPrice(shipping, currency)}</span>
            </div>
          )}

          {discount > 0 && (
            <div className="flex justify-between text-sm text-primary">
              <span>Discount</span>
              <span className="font-medium">-{formatPrice(discount, currency)}</span>
            </div>
          )}

          <div className="border-t pt-2">
            <div className="flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-semibold text-primary">
                {formatPrice(total, currency)}
              </span>
            </div>
          </div>

          {shipping > 0 && (
            <p className="text-xs text-muted-foreground">
              Estimated delivery: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        {onCheckout && (
          <Button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className="w-full"
            size="lg"
          >
            {isCheckingOut ? (
              'Processing...'
            ) : (
              <>
                Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        )}

        {onContinueShopping && (
          <Button
            onClick={onContinueShopping}
            variant="outline"
            className="w-full"
          >
            Continue Shopping
          </Button>
        )}
      </div>
    </>
  );

  if (items.length === 0) {
    return (
      <div
        className={cn(
          'rounded-md border bg-background shadow-sm',
          variant === 'sidebar' && 'fixed right-4 top-20 w-96 max-h-[calc(100vh-6rem)]',
          variant === 'page' && 'mx-auto max-w-2xl',
          className
        )}
      >
        <EmptyState />
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div
        className={cn(
          'fixed right-4 top-20 flex w-96 max-h-[calc(100vh-6rem)] flex-col gap-4 rounded-md border bg-background p-4 shadow-md',
          className
        )}
      >
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <Badge variant="default">{items.length} items</Badge>
        </div>
        <CartContent />
      </div>
    );
  }

  return (
    <div className={cn('mx-auto max-w-2xl', className)}>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Shopping Cart</h1>
        <Badge variant="default" className="text-base">
          {items.length} items
        </Badge>
      </div>
      <div className="flex flex-col gap-4">
        <CartContent />
      </div>
    </div>
  );
}
