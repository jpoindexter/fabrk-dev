import type { Meta, StoryObj } from '@storybook/react';
import { ShoppingCart, CartItem } from './shopping-cart';
import { useState } from 'react';

const meta: Meta<typeof ShoppingCart> = {
  title: 'UI/ShoppingCart',
  component: ShoppingCart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ShoppingCart>;

// Sample cart items
const sampleItems: CartItem[] = [
  {
    id: '1',
    productId: 'prod_001',
    name: 'Premium Wireless Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
    price: 299.99,
    quantity: 1,
    variant: 'Black',
    maxQuantity: 5,
  },
  {
    id: '2',
    productId: 'prod_002',
    name: 'Mechanical Keyboard',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=200&h=200&fit=crop',
    price: 149.99,
    quantity: 2,
    variant: 'Cherry MX Blue',
    maxQuantity: 10,
  },
  {
    id: '3',
    productId: 'prod_003',
    name: 'USB-C Hub',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=200&h=200&fit=crop',
    price: 79.99,
    quantity: 1,
    maxQuantity: 3,
  },
];

const manyItems: CartItem[] = [
  ...sampleItems,
  {
    id: '4',
    productId: 'prod_004',
    name: 'Laptop Stand',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop',
    price: 49.99,
    quantity: 1,
    maxQuantity: 8,
  },
  {
    id: '5',
    productId: 'prod_005',
    name: 'Webcam 4K',
    image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=200&h=200&fit=crop',
    price: 199.99,
    quantity: 1,
    variant: '4K Ultra HD',
    maxQuantity: 4,
  },
  {
    id: '6',
    productId: 'prod_006',
    name: 'Monitor Arm',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=200&fit=crop',
    price: 129.99,
    quantity: 2,
    maxQuantity: 6,
  },
];

// Interactive wrapper component
function InteractiveCart({ items: initialItems, ...props }: any) {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [discount, setDiscount] = useState(0);

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleApplyPromo = async (code: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (code.toUpperCase() === 'SAVE10') {
      setDiscount(50);
      return { discount: 50 };
    }
    return { discount: 0 };
  };

  const handleCheckout = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert('Checkout complete!');
  };

  return (
    <ShoppingCart
      {...props}
      items={items}
      onUpdateQuantity={handleUpdateQuantity}
      onRemoveItem={handleRemoveItem}
      onApplyPromo={handleApplyPromo}
      onCheckout={handleCheckout}
      onContinueShopping={() => alert('Continue shopping clicked')}
      discount={discount}
    />
  );
}

// Stories

export const SidebarWithItems: Story = {
  render: (args) => <InteractiveCart {...args} />,
  args: {
    items: sampleItems,
    variant: 'sidebar',
    tax: 30.5,
    shipping: 15.0,
    currency: 'USD',
  },
};

export const PageWithItems: Story = {
  render: (args) => <InteractiveCart {...args} />,
  args: {
    items: sampleItems,
    variant: 'page',
    tax: 30.5,
    shipping: 15.0,
    currency: 'USD',
  },
};

export const EmptyCartSidebar: Story = {
  args: {
    items: [],
    variant: 'sidebar',
    onContinueShopping: () => alert('Continue shopping clicked'),
  },
};

export const EmptyCartPage: Story = {
  args: {
    items: [],
    variant: 'page',
    onContinueShopping: () => alert('Continue shopping clicked'),
  },
};

export const SingleItem: Story = {
  render: (args) => <InteractiveCart {...args} />,
  args: {
    items: [sampleItems[0]],
    variant: 'page',
    tax: 15.0,
    shipping: 10.0,
    currency: 'USD',
  },
};

export const MultipleItems: Story = {
  render: (args) => <InteractiveCart {...args} />,
  args: {
    items: manyItems,
    variant: 'page',
    tax: 65.4,
    shipping: 20.0,
    currency: 'USD',
  },
};

export const WithDiscount: Story = {
  render: (args) => <InteractiveCart {...args} />,
  args: {
    items: sampleItems,
    variant: 'page',
    tax: 30.5,
    shipping: 15.0,
    discount: 50.0,
    currency: 'USD',
  },
};

export const WithPromoCode: Story = {
  render: (args) => <InteractiveCart {...args} />,
  args: {
    items: sampleItems,
    variant: 'page',
    tax: 30.5,
    shipping: 15.0,
    currency: 'USD',
  },
  parameters: {
    docs: {
      description: {
        story: 'Try entering "SAVE10" as the promo code to apply a discount.',
      },
    },
  },
};

export const MaxQuantityReached: Story = {
  render: (args) => <InteractiveCart {...args} />,
  args: {
    items: [
      {
        id: '1',
        productId: 'prod_001',
        name: 'Limited Edition Mouse',
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=200&h=200&fit=crop',
        price: 99.99,
        quantity: 3,
        variant: 'White',
        maxQuantity: 3,
      },
    ],
    variant: 'page',
    tax: 15.0,
    shipping: 10.0,
    currency: 'USD',
  },
};

export const LowStockWarning: Story = {
  render: (args) => <InteractiveCart {...args} />,
  args: {
    items: [
      {
        id: '1',
        productId: 'prod_001',
        name: 'Gaming Monitor',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=200&fit=crop',
        price: 499.99,
        quantity: 4,
        variant: '27" 144Hz',
        maxQuantity: 5,
      },
    ],
    variant: 'page',
    tax: 25.0,
    shipping: 0,
    currency: 'USD',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows low stock warning when quantity is >= 80% of max quantity.',
      },
    },
  },
};

export const CheckoutButtonLoading: Story = {
  render: (args) => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Click the checkout button to see the loading state
      </p>
      <InteractiveCart {...args} />
    </div>
  ),
  args: {
    items: sampleItems,
    variant: 'page',
    tax: 30.5,
    shipping: 15.0,
    currency: 'USD',
  },
};

export const EuropeFormat: Story = {
  render: (args) => <InteractiveCart {...args} />,
  args: {
    items: sampleItems,
    variant: 'page',
    tax: 100.0,
    shipping: 20.0,
    currency: 'EUR',
  },
};

export const GBPFormat: Story = {
  render: (args) => <InteractiveCart {...args} />,
  args: {
    items: sampleItems,
    variant: 'page',
    tax: 60.0,
    shipping: 10.0,
    currency: 'GBP',
  },
};

export const MobileView: Story = {
  render: (args) => <InteractiveCart {...args} />,
  args: {
    items: sampleItems,
    variant: 'page',
    tax: 30.5,
    shipping: 15.0,
    currency: 'USD',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const WithoutCheckout: Story = {
  render: (args) => {
    const [items, setItems] = useState<CartItem[]>(sampleItems);

    return (
      <ShoppingCart
        {...args}
        items={items}
        onUpdateQuantity={(itemId, quantity) =>
          setItems((prev) =>
            prev.map((item) =>
              item.id === itemId ? { ...item, quantity } : item
            )
          )
        }
        onRemoveItem={(itemId) =>
          setItems((prev) => prev.filter((item) => item.id !== itemId))
        }
      />
    );
  },
  args: {
    items: sampleItems,
    variant: 'page',
    tax: 30.5,
    shipping: 15.0,
    currency: 'USD',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Cart without checkout button (onCheckout callback not provided).',
      },
    },
  },
};

export const FreeShipping: Story = {
  render: (args) => <InteractiveCart {...args} />,
  args: {
    items: sampleItems,
    variant: 'page',
    tax: 30.5,
    shipping: 0,
    currency: 'USD',
  },
  parameters: {
    docs: {
      description: {
        story: 'Cart with free shipping (shipping = 0).',
      },
    },
  },
};

export const NoTax: Story = {
  render: (args) => <InteractiveCart {...args} />,
  args: {
    items: sampleItems,
    variant: 'page',
    tax: 0,
    shipping: 15.0,
    currency: 'USD',
  },
  parameters: {
    docs: {
      description: {
        story: 'Cart without tax (tax = 0).',
      },
    },
  },
};
