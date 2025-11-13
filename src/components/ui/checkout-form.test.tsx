import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CheckoutForm } from './checkout-form';
import type { CheckoutFormData } from './checkout-form';

describe('CheckoutForm Component', () => {
  const mockCartTotal = 99.99;

  describe('Step Navigation', () => {
    it('renders step 1 (Shipping) initially', () => {
      render(<CheckoutForm cartTotal={mockCartTotal} />);

      expect(screen.getByText('Shipping Information')).toBeInTheDocument();
      expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    });

    it('displays stepper with all steps', () => {
      render(<CheckoutForm cartTotal={mockCartTotal} />);

      expect(screen.getByText('Shipping')).toBeInTheDocument();
      expect(screen.getByText('Payment')).toBeInTheDocument();
      expect(screen.getByText('Review')).toBeInTheDocument();
    });

    it('moves to step 2 when Next button is clicked with valid data', () => {
      render(<CheckoutForm cartTotal={mockCartTotal} />);

      // Fill in shipping information
      fireEvent.change(screen.getByLabelText(/Full Name/i), {
        target: { value: 'John Doe' },
      });
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: 'john@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/Street Address/i), {
        target: { value: '123 Main St' },
      });
      fireEvent.change(screen.getByLabelText(/City/i), {
        target: { value: 'New York' },
      });
      fireEvent.change(screen.getByLabelText(/State/i), {
        target: { value: 'NY' },
      });
      fireEvent.change(screen.getByLabelText(/Postal Code/i), {
        target: { value: '10001' },
      });

      const nextButton = screen.getByText('Next');
      fireEvent.click(nextButton);

      expect(screen.getByText('Payment Method')).toBeInTheDocument();
    });

    it('navigates back to previous step', () => {
      render(<CheckoutForm cartTotal={mockCartTotal} />);

      // Fill in data and move to step 2
      fireEvent.change(screen.getByLabelText(/Full Name/i), {
        target: { value: 'John Doe' },
      });
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: 'john@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/Street Address/i), {
        target: { value: '123 Main St' },
      });
      fireEvent.change(screen.getByLabelText(/City/i), {
        target: { value: 'New York' },
      });
      fireEvent.change(screen.getByLabelText(/State/i), {
        target: { value: 'NY' },
      });
      fireEvent.change(screen.getByLabelText(/Postal Code/i), {
        target: { value: '10001' },
      });
      fireEvent.click(screen.getByText('Next'));

      // Now on step 2, click Back
      const backButton = screen.getByText('Back');
      fireEvent.click(backButton);

      expect(screen.getByText('Shipping Information')).toBeInTheDocument();
    });

    it('disables Back button on first step', () => {
      render(<CheckoutForm cartTotal={mockCartTotal} />);

      const backButton = screen.getByText('Back');
      expect(backButton).toBeDisabled();
    });

    it('calls onStepChange when step changes', () => {
      const mockStepChange = vi.fn();
      render(
        <CheckoutForm cartTotal={mockCartTotal} onStepChange={mockStepChange} />
      );

      expect(mockStepChange).toHaveBeenCalledWith(0);
    });
  });

  describe('Shipping Validation', () => {
    it('shows error for empty full name', () => {
      render(<CheckoutForm cartTotal={mockCartTotal} />);

      const nextButton = screen.getByText('Next');
      fireEvent.click(nextButton);

      expect(screen.getByText('Full name is required')).toBeInTheDocument();
    });

    it('shows error for invalid email', () => {
      render(<CheckoutForm cartTotal={mockCartTotal} />);

      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: 'invalid-email' },
      });
      fireEvent.click(screen.getByText('Next'));

      expect(screen.getByText('Valid email is required')).toBeInTheDocument();
    });

    it('shows error for invalid postal code', () => {
      render(<CheckoutForm cartTotal={mockCartTotal} />);

      // Fill in other fields
      fireEvent.change(screen.getByLabelText(/Full Name/i), {
        target: { value: 'John Doe' },
      });
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: 'john@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/Street Address/i), {
        target: { value: '123 Main St' },
      });
      fireEvent.change(screen.getByLabelText(/City/i), {
        target: { value: 'New York' },
      });
      fireEvent.change(screen.getByLabelText(/State/i), {
        target: { value: 'NY' },
      });
      fireEvent.change(screen.getByLabelText(/Postal Code/i), {
        target: { value: 'invalid' },
      });

      fireEvent.click(screen.getByText('Next'));

      expect(screen.getByText('Valid postal code is required')).toBeInTheDocument();
    });

    it('validates US postal code format', () => {
      render(<CheckoutForm cartTotal={mockCartTotal} />);

      // Fill in required fields with valid US postal code
      fireEvent.change(screen.getByLabelText(/Full Name/i), {
        target: { value: 'John Doe' },
      });
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: 'john@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/Street Address/i), {
        target: { value: '123 Main St' },
      });
      fireEvent.change(screen.getByLabelText(/City/i), {
        target: { value: 'New York' },
      });
      fireEvent.change(screen.getByLabelText(/State/i), {
        target: { value: 'NY' },
      });
      fireEvent.change(screen.getByLabelText(/Postal Code/i), {
        target: { value: '10001' },
      });

      fireEvent.click(screen.getByText('Next'));

      expect(screen.getByText('Payment Method')).toBeInTheDocument();
    });
  });

  describe('Payment Methods', () => {
    beforeEach(() => {
      // Helper to fill shipping info and navigate to payment step
      const fillShippingAndNavigate = () => {
        fireEvent.change(screen.getByLabelText(/Full Name/i), {
          target: { value: 'John Doe' },
        });
        fireEvent.change(screen.getByLabelText(/Email/i), {
          target: { value: 'john@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/Street Address/i), {
          target: { value: '123 Main St' },
        });
        fireEvent.change(screen.getByLabelText(/City/i), {
          target: { value: 'New York' },
        });
        fireEvent.change(screen.getByLabelText(/State/i), {
          target: { value: 'NY' },
        });
        fireEvent.change(screen.getByLabelText(/Postal Code/i), {
          target: { value: '10001' },
        });
        fireEvent.click(screen.getByText('Next'));
      };

      render(<CheckoutForm cartTotal={mockCartTotal} />);
      fillShippingAndNavigate();
    });

    it('displays payment method options', () => {
      expect(screen.getByText('Card')).toBeInTheDocument();
      expect(screen.getByText('PayPal')).toBeInTheDocument();
      expect(screen.getByText('Apple Pay')).toBeInTheDocument();
      expect(screen.getByText('Google Pay')).toBeInTheDocument();
    });

    it('shows card input fields when Card is selected', () => {
      expect(screen.getByLabelText(/Card Number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Expiry Date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/CVV/i)).toBeInTheDocument();
    });

    it('validates card number', () => {
      fireEvent.change(screen.getByLabelText(/Card Number/i), {
        target: { value: '1234' }, // Invalid: too short
      });
      fireEvent.click(screen.getByText('Next'));

      expect(screen.getByText('Valid card number is required')).toBeInTheDocument();
    });

    it('formats card number with spaces', () => {
      const cardInput = screen.getByLabelText(/Card Number/i) as HTMLInputElement;
      fireEvent.change(cardInput, {
        target: { value: '4532015112830366' },
      });

      expect(cardInput.value).toBe('4532 0151 1283 0366');
    });

    it('validates expiry date', () => {
      // Fill valid card number
      fireEvent.change(screen.getByLabelText(/Card Number/i), {
        target: { value: '4532015112830366' },
      });
      // Leave expiry empty
      fireEvent.change(screen.getByLabelText(/CVV/i), {
        target: { value: '123' },
      });

      fireEvent.click(screen.getByText('Next'));

      expect(screen.getByText('Expiry date is required')).toBeInTheDocument();
    });

    it('validates CVV', () => {
      // Fill valid card number and expiry
      fireEvent.change(screen.getByLabelText(/Card Number/i), {
        target: { value: '4532015112830366' },
      });
      fireEvent.change(screen.getByLabelText(/Expiry Date/i), {
        target: { value: '12/25' },
      });
      // Invalid CVV (too short)
      fireEvent.change(screen.getByLabelText(/CVV/i), {
        target: { value: '12' },
      });

      fireEvent.click(screen.getByText('Next'));

      expect(screen.getByText('Valid CVV is required')).toBeInTheDocument();
    });

    it('switches to PayPal and shows redirect message', () => {
      const paypalButton = screen.getByText('PayPal');
      fireEvent.click(paypalButton);

      expect(
        screen.getByText(/You will be redirected to PayPal/i)
      ).toBeInTheDocument();
    });
  });

  describe('Review Step', () => {
    beforeEach(() => {
      render(<CheckoutForm cartTotal={mockCartTotal} />);

      // Fill shipping info
      fireEvent.change(screen.getByLabelText(/Full Name/i), {
        target: { value: 'John Doe' },
      });
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: 'john@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/Street Address/i), {
        target: { value: '123 Main St' },
      });
      fireEvent.change(screen.getByLabelText(/City/i), {
        target: { value: 'New York' },
      });
      fireEvent.change(screen.getByLabelText(/State/i), {
        target: { value: 'NY' },
      });
      fireEvent.change(screen.getByLabelText(/Postal Code/i), {
        target: { value: '10001' },
      });
      fireEvent.click(screen.getByText('Next'));

      // Fill payment info
      fireEvent.change(screen.getByLabelText(/Card Number/i), {
        target: { value: '4532015112830366' },
      });
      fireEvent.change(screen.getByLabelText(/Expiry Date/i), {
        target: { value: '12/25' },
      });
      fireEvent.change(screen.getByLabelText(/CVV/i), {
        target: { value: '123' },
      });
      fireEvent.click(screen.getByText('Next'));
    });

    it('displays review step with order summary', () => {
      expect(screen.getByText('Review Order')).toBeInTheDocument();
      expect(screen.getByText('Shipping Address')).toBeInTheDocument();
      expect(screen.getByText('Payment Method')).toBeInTheDocument();
    });

    it('shows shipping information', () => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('123 Main St')).toBeInTheDocument();
      expect(screen.getByText(/New York, NY 10001/)).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });

    it('shows masked card number', () => {
      expect(screen.getByText(/Card ending in 0366/)).toBeInTheDocument();
    });

    it('shows Complete Order button on final step', () => {
      expect(screen.getByText('Complete Order')).toBeInTheDocument();
    });
  });

  describe('Order Summary', () => {
    it('displays order summary sidebar when enabled', () => {
      render(<CheckoutForm cartTotal={mockCartTotal} showOrderSummary={true} />);

      expect(screen.getByText('Order Summary')).toBeInTheDocument();
      expect(screen.getByText('Subtotal')).toBeInTheDocument();
      expect(screen.getByText('Shipping')).toBeInTheDocument();
      expect(screen.getByText('Tax')).toBeInTheDocument();
      expect(screen.getByText('Total')).toBeInTheDocument();
    });

    it('hides order summary when disabled', () => {
      render(<CheckoutForm cartTotal={mockCartTotal} showOrderSummary={false} />);

      expect(screen.queryByText('Order Summary')).not.toBeInTheDocument();
    });

    it('calculates and displays correct totals', () => {
      render(<CheckoutForm cartTotal={100} currency="USD" />);

      // Subtotal
      expect(screen.getByText('USD 100.00')).toBeInTheDocument();
      // Tax (10%)
      expect(screen.getByText('USD 10.00')).toBeInTheDocument();
      // Total (subtotal + tax)
      expect(screen.getByText('USD 110.00')).toBeInTheDocument();
    });

    it('displays correct currency symbol', () => {
      render(<CheckoutForm cartTotal={100} currency="EUR" />);

      expect(screen.getByText('EUR 100.00')).toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    it('calls onSubmit with complete form data', async () => {
      const mockSubmit = vi.fn().mockResolvedValue(undefined);
      render(<CheckoutForm cartTotal={mockCartTotal} onSubmit={mockSubmit} />);

      // Fill and navigate through all steps
      fireEvent.change(screen.getByLabelText(/Full Name/i), {
        target: { value: 'John Doe' },
      });
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: 'john@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/Street Address/i), {
        target: { value: '123 Main St' },
      });
      fireEvent.change(screen.getByLabelText(/City/i), {
        target: { value: 'New York' },
      });
      fireEvent.change(screen.getByLabelText(/State/i), {
        target: { value: 'NY' },
      });
      fireEvent.change(screen.getByLabelText(/Postal Code/i), {
        target: { value: '10001' },
      });
      fireEvent.click(screen.getByText('Next'));

      fireEvent.change(screen.getByLabelText(/Card Number/i), {
        target: { value: '4532015112830366' },
      });
      fireEvent.change(screen.getByLabelText(/Expiry Date/i), {
        target: { value: '12/25' },
      });
      fireEvent.change(screen.getByLabelText(/CVV/i), {
        target: { value: '123' },
      });
      fireEvent.click(screen.getByText('Next'));

      const completeButton = screen.getByText('Complete Order');
      fireEvent.click(completeButton);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            shipping: expect.objectContaining({
              fullName: 'John Doe',
              email: 'john@example.com',
              address: '123 Main St',
              city: 'New York',
              state: 'NY',
              postalCode: '10001',
            }),
            payment: expect.objectContaining({
              method: 'card',
              cardNumber: '4532 0151 1283 0366',
              expiryDate: '12/25',
              cvv: '123',
            }),
          })
        );
      });
    });

    it('shows loading state during submission', async () => {
      const mockSubmit = vi.fn(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );
      render(<CheckoutForm cartTotal={mockCartTotal} onSubmit={mockSubmit} />);

      // Navigate to final step
      fireEvent.change(screen.getByLabelText(/Full Name/i), {
        target: { value: 'John Doe' },
      });
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: 'john@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/Street Address/i), {
        target: { value: '123 Main St' },
      });
      fireEvent.change(screen.getByLabelText(/City/i), {
        target: { value: 'New York' },
      });
      fireEvent.change(screen.getByLabelText(/State/i), {
        target: { value: 'NY' },
      });
      fireEvent.change(screen.getByLabelText(/Postal Code/i), {
        target: { value: '10001' },
      });
      fireEvent.click(screen.getByText('Next'));

      fireEvent.change(screen.getByLabelText(/Card Number/i), {
        target: { value: '4532015112830366' },
      });
      fireEvent.change(screen.getByLabelText(/Expiry Date/i), {
        target: { value: '12/25' },
      });
      fireEvent.change(screen.getByLabelText(/CVV/i), {
        target: { value: '123' },
      });
      fireEvent.click(screen.getByText('Next'));

      const completeButton = screen.getByText('Complete Order');
      fireEvent.click(completeButton);

      // Button should be disabled during submission
      await waitFor(() => {
        expect(completeButton).toBeDisabled();
      });
    });
  });

  describe('Initial Data', () => {
    it('prefills form with initial data', () => {
      const initialData: Partial<CheckoutFormData> = {
        shipping: {
          fullName: 'Jane Smith',
          email: 'jane@example.com',
          address: '456 Oak Ave',
          city: 'Boston',
          state: 'MA',
          postalCode: '02101',
          country: 'us',
        },
      };

      render(<CheckoutForm cartTotal={mockCartTotal} initialData={initialData} />);

      expect(screen.getByDisplayValue('Jane Smith')).toBeInTheDocument();
      expect(screen.getByDisplayValue('jane@example.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('456 Oak Ave')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Boston')).toBeInTheDocument();
      expect(screen.getByDisplayValue('MA')).toBeInTheDocument();
      expect(screen.getByDisplayValue('02101')).toBeInTheDocument();
    });
  });
});

describe('CheckoutForm Accessibility', () => {
  it('has accessible form labels', () => {
    render(<CheckoutForm cartTotal={99.99} />);

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Street Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/State/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Postal Code/i)).toBeInTheDocument();
  });

  it('displays required field indicators', () => {
    render(<CheckoutForm cartTotal={99.99} />);

    // All required labels should be present
    expect(screen.getByText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
  });

  it('shows error messages in accessible way', () => {
    render(<CheckoutForm cartTotal={99.99} />);

    fireEvent.click(screen.getByText('Next'));

    // Error messages should be visible
    expect(screen.getByText('Full name is required')).toBeInTheDocument();
  });
});
