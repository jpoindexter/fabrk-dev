import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ShoppingCart, calculateSubtotal, calculateTotal, formatPrice } from './shopping-cart';
import type { CartItem } from './shopping-cart';

describe('Shopping Cart Utility Functions', () => {
  describe('calculateSubtotal', () => {
    it('calculates subtotal correctly for single item', () => {
      const items: CartItem[] = [
        {
          id: '1',
          productId: 'prod-1',
          name: 'Product 1',
          image: '/image.jpg',
          price: 50,
          quantity: 2,
        },
      ];

      expect(calculateSubtotal(items)).toBe(100);
    });

    it('calculates subtotal correctly for multiple items', () => {
      const items: CartItem[] = [
        {
          id: '1',
          productId: 'prod-1',
          name: 'Product 1',
          image: '/image1.jpg',
          price: 50,
          quantity: 2,
        },
        {
          id: '2',
          productId: 'prod-2',
          name: 'Product 2',
          image: '/image2.jpg',
          price: 30,
          quantity: 3,
        },
      ];

      expect(calculateSubtotal(items)).toBe(190); // 100 + 90
    });

    it('returns 0 for empty cart', () => {
      expect(calculateSubtotal([])).toBe(0);
    });
  });

  describe('calculateTotal', () => {
    it('calculates total with tax and shipping', () => {
      const subtotal = 100;
      const tax = 10;
      const shipping = 5;

      expect(calculateTotal(subtotal, tax, shipping)).toBe(115);
    });

    it('calculates total with discount', () => {
      const subtotal = 100;
      const tax = 10;
      const shipping = 5;
      const discount = 15;

      expect(calculateTotal(subtotal, tax, shipping, discount)).toBe(100);
    });

    it('handles zero values correctly', () => {
      expect(calculateTotal(100, 0, 0, 0)).toBe(100);
    });
  });

  describe('formatPrice', () => {
    it('formats USD correctly', () => {
      expect(formatPrice(99.99, 'USD')).toBe('$99.99');
    });

    it('formats EUR correctly', () => {
      expect(formatPrice(99.99, 'EUR')).toBe('€99.99');
    });

    it('handles whole numbers', () => {
      expect(formatPrice(100, 'USD')).toBe('$100.00');
    });

    it('handles decimal places correctly', () => {
      expect(formatPrice(99.95, 'USD')).toBe('$99.95');
    });
  });
});

describe('ShoppingCart Component', () => {
  const mockItems: CartItem[] = [
    {
      id: '1',
      productId: 'prod-1',
      name: 'Widget Pro',
      image: '/widget.jpg',
      price: 79.99,
      quantity: 2,
      variant: 'Blue / Large',
      maxQuantity: 10,
    },
    {
      id: '2',
      productId: 'prod-2',
      name: 'Gadget Plus',
      image: '/gadget.jpg',
      price: 49.99,
      quantity: 1,
      maxQuantity: 5,
    },
  ];

  describe('Rendering', () => {
    it('renders empty cart message when no items', () => {
      render(<ShoppingCart items={[]} />);

      expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
      expect(screen.getByText('Add some items to get started')).toBeInTheDocument();
    });

    it('renders all cart items', () => {
      render(<ShoppingCart items={mockItems} />);

      expect(screen.getByText('Widget Pro')).toBeInTheDocument();
      expect(screen.getByText('Gadget Plus')).toBeInTheDocument();
      expect(screen.getByText('Blue / Large')).toBeInTheDocument();
    });

    it('displays correct quantities', () => {
      render(<ShoppingCart items={mockItems} />);

      // Check for quantity displays
      const quantities = screen.getAllByText('2');
      expect(quantities.length).toBeGreaterThan(0);
    });

    it('calculates and displays subtotal correctly', () => {
      render(<ShoppingCart items={mockItems} />);

      // (79.99 * 2) + (49.99 * 1) = 209.97
      expect(screen.getByText('$209.97')).toBeInTheDocument();
    });

    it('displays tax and shipping when provided', () => {
      render(<ShoppingCart items={mockItems} tax={20} shipping={10} />);

      expect(screen.getByText('$20.00')).toBeInTheDocument();
      expect(screen.getByText('$10.00')).toBeInTheDocument();
    });

    it('displays discount when provided', () => {
      render(<ShoppingCart items={mockItems} discount={30} />);

      expect(screen.getByText('-$30.00')).toBeInTheDocument();
    });

    it('renders sidebar variant correctly', () => {
      const { container } = render(
        <ShoppingCart items={mockItems} variant="sidebar" />
      );

      expect(container.querySelector('.fixed')).toBeInTheDocument();
    });

    it('renders page variant correctly', () => {
      const { container } = render(
        <ShoppingCart items={mockItems} variant="page" />
      );

      // Page variant should be centered
      expect(container.querySelector('.mx-auto')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onUpdateQuantity when increasing quantity', () => {
      const mockUpdate = vi.fn();
      render(
        <ShoppingCart items={mockItems} onUpdateQuantity={mockUpdate} />
      );

      // Find the plus button for first item
      const plusButtons = screen.getAllByLabelText('Increase quantity');
      fireEvent.click(plusButtons[0]);

      expect(mockUpdate).toHaveBeenCalledWith('1', 3);
    });

    it('calls onUpdateQuantity when decreasing quantity', () => {
      const mockUpdate = vi.fn();
      render(
        <ShoppingCart items={mockItems} onUpdateQuantity={mockUpdate} />
      );

      // Find the minus button for first item
      const minusButtons = screen.getAllByLabelText('Decrease quantity');
      fireEvent.click(minusButtons[0]);

      expect(mockUpdate).toHaveBeenCalledWith('1', 1);
    });

    it('does not allow quantity below 1', () => {
      const singleItemCart: CartItem[] = [
        { ...mockItems[0], quantity: 1 },
      ];

      const mockUpdate = vi.fn();
      render(
        <ShoppingCart items={singleItemCart} onUpdateQuantity={mockUpdate} />
      );

      const minusButton = screen.getByLabelText('Decrease quantity');
      expect(minusButton).toBeDisabled();
    });

    it('does not allow quantity above maxQuantity', () => {
      const maxedCart: CartItem[] = [
        { ...mockItems[0], quantity: 10, maxQuantity: 10 },
      ];

      const mockUpdate = vi.fn();
      render(<ShoppingCart items={maxedCart} onUpdateQuantity={mockUpdate} />);

      const plusButton = screen.getByLabelText('Increase quantity');
      expect(plusButton).toBeDisabled();
    });

    it('calls onRemoveItem when remove button is clicked', () => {
      const mockRemove = vi.fn();
      render(<ShoppingCart items={mockItems} onRemoveItem={mockRemove} />);

      const removeButtons = screen.getAllByLabelText('Remove item');
      fireEvent.click(removeButtons[0]);

      expect(mockRemove).toHaveBeenCalledWith('1');
    });

    it('calls onCheckout when checkout button is clicked', async () => {
      const mockCheckout = vi.fn();
      render(<ShoppingCart items={mockItems} onCheckout={mockCheckout} />);

      const checkoutButton = screen.getByText('Checkout');
      fireEvent.click(checkoutButton);

      await waitFor(() => {
        expect(mockCheckout).toHaveBeenCalledTimes(1);
      });
    });

    it('calls onContinueShopping when continue button is clicked', () => {
      const mockContinue = vi.fn();
      render(
        <ShoppingCart
          items={[]}
          onContinueShopping={mockContinue}
        />
      );

      const continueButton = screen.getByText('Continue Shopping');
      fireEvent.click(continueButton);

      expect(mockContinue).toHaveBeenCalledTimes(1);
    });
  });

  describe('Promo Code', () => {
    it('displays promo code input when onApplyPromo is provided', () => {
      render(
        <ShoppingCart items={mockItems} onApplyPromo={async () => ({ discount: 10 })} />
      );

      expect(screen.getByPlaceholderText('Promo code')).toBeInTheDocument();
      expect(screen.getByText('Apply')).toBeInTheDocument();
    });

    it('calls onApplyPromo when Apply button is clicked', async () => {
      const mockApplyPromo = vi.fn().mockResolvedValue({ discount: 10 });
      render(
        <ShoppingCart items={mockItems} onApplyPromo={mockApplyPromo} />
      );

      const input = screen.getByPlaceholderText('Promo code');
      const applyButton = screen.getByText('Apply');

      fireEvent.change(input, { target: { value: 'SAVE10' } });
      fireEvent.click(applyButton);

      await waitFor(() => {
        expect(mockApplyPromo).toHaveBeenCalledWith('SAVE10');
      });
    });

    it('shows loading state while applying promo', async () => {
      const mockApplyPromo = vi.fn(
        () => new Promise((resolve) => setTimeout(() => resolve({ discount: 10 }), 100))
      );

      render(
        <ShoppingCart items={mockItems} onApplyPromo={mockApplyPromo} />
      );

      const input = screen.getByPlaceholderText('Promo code');
      const applyButton = screen.getByText('Apply');

      fireEvent.change(input, { target: { value: 'SAVE10' } });
      fireEvent.click(applyButton);

      expect(screen.getByText('Applying...')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByText('Apply')).toBeInTheDocument();
      });
    });
  });

  describe('Stock Warnings', () => {
    it('displays low stock warning at 80% of maxQuantity', () => {
      const lowStockCart: CartItem[] = [
        {
          id: '1',
          productId: 'prod-1',
          name: 'Limited Widget',
          image: '/widget.jpg',
          price: 50,
          quantity: 8,
          maxQuantity: 10,
        },
      ];

      render(<ShoppingCart items={lowStockCart} />);

      expect(screen.getByText('Only 2 left')).toBeInTheDocument();
    });

    it('displays max quantity warning', () => {
      const maxCart: CartItem[] = [
        {
          id: '1',
          productId: 'prod-1',
          name: 'Limited Widget',
          image: '/widget.jpg',
          price: 50,
          quantity: 10,
          maxQuantity: 10,
        },
      ];

      render(<ShoppingCart items={maxCart} />);

      expect(screen.getByText('Max quantity')).toBeInTheDocument();
    });
  });

  describe('Currency Formatting', () => {
    it('formats prices with specified currency', () => {
      render(<ShoppingCart items={mockItems} currency="EUR" />);

      // Should display Euro symbol
      expect(screen.getByText(/€/)).toBeInTheDocument();
    });

    it('defaults to USD when currency not specified', () => {
      render(<ShoppingCart items={mockItems} />);

      // Should display dollar sign
      expect(screen.getByText(/\$/)).toBeInTheDocument();
    });
  });

  describe('Loading States', () => {
    it('shows loading state on checkout button', async () => {
      const mockCheckout = vi.fn(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

      render(<ShoppingCart items={mockItems} onCheckout={mockCheckout} />);

      const checkoutButton = screen.getByText('Checkout');
      fireEvent.click(checkoutButton);

      // Button should show loading state
      await waitFor(() => {
        expect(checkoutButton).toBeDisabled();
      });
    });
  });
});

describe('ShoppingCart Accessibility', () => {
  const mockItems: CartItem[] = [
    {
      id: '1',
      productId: 'prod-1',
      name: 'Widget',
      image: '/widget.jpg',
      price: 50,
      quantity: 2,
    },
  ];

  it('has accessible button labels', () => {
    render(
      <ShoppingCart
        items={mockItems}
        onUpdateQuantity={vi.fn()}
        onRemoveItem={vi.fn()}
      />
    );

    expect(screen.getByLabelText('Increase quantity')).toBeInTheDocument();
    expect(screen.getByLabelText('Decrease quantity')).toBeInTheDocument();
    expect(screen.getByLabelText('Remove item')).toBeInTheDocument();
  });

  it('has accessible image alt text', () => {
    render(<ShoppingCart items={mockItems} />);

    const image = screen.getByAltText('Widget');
    expect(image).toBeInTheDocument();
  });

  it('maintains keyboard navigation', () => {
    render(
      <ShoppingCart
        items={mockItems}
        onUpdateQuantity={vi.fn()}
        onRemoveItem={vi.fn()}
        onCheckout={vi.fn()}
      />
    );

    // All interactive elements should be keyboard accessible
    const plusButton = screen.getByLabelText('Increase quantity');
    const minusButton = screen.getByLabelText('Decrease quantity');
    const removeButton = screen.getByLabelText('Remove item');
    const checkoutButton = screen.getByText('Checkout');

    expect(plusButton.tabIndex).toBeGreaterThanOrEqual(0);
    expect(minusButton.tabIndex).toBeGreaterThanOrEqual(0);
    expect(removeButton.tabIndex).toBeGreaterThanOrEqual(0);
    expect(checkoutButton.tabIndex).toBeGreaterThanOrEqual(0);
  });
});

describe('ShoppingCart Edge Cases', () => {
  it('handles very large quantities', () => {
    const largeCart: CartItem[] = [
      {
        id: '1',
        productId: 'prod-1',
        name: 'Widget',
        image: '/widget.jpg',
        price: 10,
        quantity: 9999,
      },
    ];

    render(<ShoppingCart items={largeCart} />);

    expect(screen.getByText('9999')).toBeInTheDocument();
    // Total should be calculated correctly
    expect(screen.getByText('$99,990.00')).toBeInTheDocument();
  });

  it('handles decimal prices correctly', () => {
    const decimalCart: CartItem[] = [
      {
        id: '1',
        productId: 'prod-1',
        name: 'Widget',
        image: '/widget.jpg',
        price: 9.95,
        quantity: 3,
      },
    ];

    render(<ShoppingCart items={decimalCart} />);

    // 9.95 * 3 = 29.85
    expect(screen.getByText('$29.85')).toBeInTheDocument();
  });

  it('handles empty variant strings', () => {
    const noVariantCart: CartItem[] = [
      {
        id: '1',
        productId: 'prod-1',
        name: 'Widget',
        image: '/widget.jpg',
        price: 50,
        quantity: 1,
        variant: '',
      },
    ];

    render(<ShoppingCart items={noVariantCart} />);

    // Should render without crashing
    expect(screen.getByText('Widget')).toBeInTheDocument();
  });

  it('handles missing maxQuantity', () => {
    const noMaxCart: CartItem[] = [
      {
        id: '1',
        productId: 'prod-1',
        name: 'Widget',
        image: '/widget.jpg',
        price: 50,
        quantity: 100,
      },
    ];

    const mockUpdate = vi.fn();
    render(<ShoppingCart items={noMaxCart} onUpdateQuantity={mockUpdate} />);

    // Plus button should not be disabled
    const plusButton = screen.getByLabelText('Increase quantity');
    expect(plusButton).not.toBeDisabled();
  });
});
