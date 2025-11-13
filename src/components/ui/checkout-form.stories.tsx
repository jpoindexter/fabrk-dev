import type { Meta, StoryObj } from "@storybook/react";
import { CheckoutForm, CheckoutFormData } from "./checkout-form";
import { fn } from "@storybook/test";

const meta = {
  title: "Forms/CheckoutForm",
  component: CheckoutForm,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    cartTotal: {
      control: { type: "number", min: 0, step: 0.01 },
      description: "Total cart amount",
    },
    currency: {
      control: "text",
      description: "Currency code",
    },
    showOrderSummary: {
      control: "boolean",
      description: "Show/hide order summary sidebar",
    },
    onSubmit: { action: "submitted" },
    onStepChange: { action: "step changed" },
  },
} satisfies Meta<typeof CheckoutForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const handleSubmit = fn(async (data: CheckoutFormData) => {
  console.log("Form submitted:", data);
  await new Promise((resolve) => setTimeout(resolve, 2000));
});

export const Default: Story = {
  args: {
    cartTotal: 99.99,
    currency: "USD",
    onSubmit: handleSubmit,
    showOrderSummary: true,
  },
};

export const Step1Shipping: Story = {
  args: {
    cartTotal: 149.99,
    currency: "USD",
    onSubmit: handleSubmit,
    showOrderSummary: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Step 1: Shipping information form with address fields and validation.",
      },
    },
  },
};

export const Step2Payment: Story = {
  args: {
    cartTotal: 249.99,
    currency: "USD",
    onSubmit: handleSubmit,
    showOrderSummary: true,
    initialData: {
      shipping: {
        fullName: "John Doe",
        email: "john@example.com",
        address: "123 Main St",
        city: "San Francisco",
        state: "CA",
        postalCode: "94102",
        country: "us",
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Step 2: Payment method selection with card input form and alternative payment options.",
      },
    },
  },
};

export const Step3Review: Story = {
  args: {
    cartTotal: 349.99,
    currency: "USD",
    onSubmit: handleSubmit,
    showOrderSummary: true,
    initialData: {
      shipping: {
        fullName: "Jane Smith",
        email: "jane@example.com",
        address: "456 Oak Ave",
        city: "New York",
        state: "NY",
        postalCode: "10001",
        country: "us",
      },
      payment: {
        method: "card",
        cardNumber: "4242 4242 4242 4242",
        expiryDate: "12/25",
        cvv: "123",
        saveCard: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Step 3: Review order details before final submission.",
      },
    },
  },
};

export const CompleteFlow: Story = {
  args: {
    cartTotal: 199.99,
    currency: "USD",
    onSubmit: handleSubmit,
    showOrderSummary: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Complete checkout flow from shipping to payment to review. Navigate through all steps.",
      },
    },
  },
};

export const WithValidationErrors: Story = {
  args: {
    cartTotal: 79.99,
    currency: "USD",
    onSubmit: handleSubmit,
    showOrderSummary: true,
    initialData: {
      shipping: {
        fullName: "",
        email: "invalid-email",
        address: "",
        city: "",
        state: "",
        postalCode: "123",
        country: "us",
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Form with validation errors. Try clicking 'Next' to see error messages appear below invalid fields.",
      },
    },
  },
};

export const BillingSameAsShipping: Story = {
  args: {
    cartTotal: 129.99,
    currency: "USD",
    onSubmit: handleSubmit,
    showOrderSummary: true,
    initialData: {
      shipping: {
        fullName: "Alex Johnson",
        email: "alex@example.com",
        address: "789 Pine St",
        city: "Los Angeles",
        state: "CA",
        postalCode: "90001",
        country: "us",
      },
      billing: {
        sameAsShipping: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Billing address same as shipping (default behavior).",
      },
    },
  },
};

export const BillingDifferentAddress: Story = {
  args: {
    cartTotal: 299.99,
    currency: "USD",
    onSubmit: handleSubmit,
    showOrderSummary: true,
    initialData: {
      shipping: {
        fullName: "Maria Garcia",
        email: "maria@example.com",
        address: "321 Elm St",
        city: "Chicago",
        state: "IL",
        postalCode: "60601",
        country: "us",
      },
      billing: {
        sameAsShipping: false,
        address: "654 Maple Ave",
        city: "Boston",
        state: "MA",
        postalCode: "02101",
        country: "us",
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Billing address different from shipping address.",
      },
    },
  },
};

export const CardPayment: Story = {
  args: {
    cartTotal: 449.99,
    currency: "USD",
    onSubmit: handleSubmit,
    showOrderSummary: true,
    initialData: {
      shipping: {
        fullName: "David Lee",
        email: "david@example.com",
        address: "987 Cedar Ln",
        city: "Seattle",
        state: "WA",
        postalCode: "98101",
        country: "us",
      },
      payment: {
        method: "card",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        saveCard: false,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Card payment method selected with card number masking and validation.",
      },
    },
  },
};

export const PayPalPayment: Story = {
  args: {
    cartTotal: 189.99,
    currency: "USD",
    onSubmit: handleSubmit,
    showOrderSummary: true,
    initialData: {
      shipping: {
        fullName: "Sarah Wilson",
        email: "sarah@example.com",
        address: "147 Birch Rd",
        city: "Austin",
        state: "TX",
        postalCode: "73301",
        country: "us",
      },
      payment: {
        method: "paypal",
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: "PayPal payment method selected - shows redirect notice.",
      },
    },
  },
};

export const ApplePayPayment: Story = {
  args: {
    cartTotal: 329.99,
    currency: "USD",
    onSubmit: handleSubmit,
    showOrderSummary: true,
    initialData: {
      shipping: {
        fullName: "Michael Brown",
        email: "michael@example.com",
        address: "258 Spruce St",
        city: "Denver",
        state: "CO",
        postalCode: "80201",
        country: "us",
      },
      payment: {
        method: "apple_pay",
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Apple Pay payment method selected.",
      },
    },
  },
};

export const GooglePayPayment: Story = {
  args: {
    cartTotal: 269.99,
    currency: "USD",
    onSubmit: handleSubmit,
    showOrderSummary: true,
    initialData: {
      shipping: {
        fullName: "Emily Davis",
        email: "emily@example.com",
        address: "369 Willow Way",
        city: "Portland",
        state: "OR",
        postalCode: "97201",
        country: "us",
      },
      payment: {
        method: "google_pay",
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Google Pay payment method selected.",
      },
    },
  },
};

export const WithoutOrderSummary: Story = {
  args: {
    cartTotal: 99.99,
    currency: "USD",
    onSubmit: handleSubmit,
    showOrderSummary: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Checkout form without the order summary sidebar.",
      },
    },
  },
};

export const LoadingState: Story = {
  args: {
    cartTotal: 399.99,
    currency: "USD",
    onSubmit: async (data: CheckoutFormData) => {
      console.log("Processing payment:", data);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    },
    showOrderSummary: true,
    initialData: {
      shipping: {
        fullName: "Robert Taylor",
        email: "robert@example.com",
        address: "741 Ash Blvd",
        city: "Miami",
        state: "FL",
        postalCode: "33101",
        country: "us",
      },
      payment: {
        method: "card",
        cardNumber: "4532 1234 5678 9010",
        expiryDate: "09/26",
        cvv: "456",
        saveCard: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Form in loading state during submission. Navigate to review step and click 'Complete Order' to see the loading spinner.",
      },
    },
  },
};

export const MobileLayout: Story = {
  args: {
    cartTotal: 159.99,
    currency: "USD",
    onSubmit: handleSubmit,
    showOrderSummary: true,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "Checkout form optimized for mobile devices with responsive layout.",
      },
    },
  },
};

export const EuropeCheckout: Story = {
  args: {
    cartTotal: 89.99,
    currency: "EUR",
    onSubmit: handleSubmit,
    showOrderSummary: true,
    initialData: {
      shipping: {
        fullName: "Sophie Laurent",
        email: "sophie@example.com",
        address: "12 Rue de la Paix",
        city: "Paris",
        state: "Île-de-France",
        postalCode: "75001",
        country: "uk",
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: "European customer checkout with EUR currency.",
      },
    },
  },
};

export const CanadianCheckout: Story = {
  args: {
    cartTotal: 119.99,
    currency: "CAD",
    onSubmit: handleSubmit,
    showOrderSummary: true,
    initialData: {
      shipping: {
        fullName: "James Chen",
        email: "james@example.com",
        address: "567 Maple Avenue",
        city: "Toronto",
        state: "ON",
        postalCode: "M5H 2N2",
        country: "ca",
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Canadian customer checkout with CAD currency and postal code format.",
      },
    },
  },
};

export const HighValueOrder: Story = {
  args: {
    cartTotal: 1499.99,
    currency: "USD",
    onSubmit: handleSubmit,
    showOrderSummary: true,
    initialData: {
      shipping: {
        fullName: "William Anderson",
        email: "william@example.com",
        address: "852 Commerce Plaza",
        city: "San Diego",
        state: "CA",
        postalCode: "92101",
        country: "us",
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: "High-value order showing tax and total calculations.",
      },
    },
  },
};
