/**
 * ProductCard Storybook Stories
 * Comprehensive examples of ProductCard component usage
 */

import type { Meta, StoryObj } from "@storybook/react";
import { ProductCard, type Product } from "./product-card";
import { useState } from "react";

const meta = {
  title: "Components/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample product data
const sampleProduct: Product = {
  id: "1",
  name: "Wireless Headphones",
  description: "Premium noise-cancelling headphones with 30-hour battery life",
  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  hoverImage: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop",
  price: 299.99,
  currency: "USD",
  rating: 4.5,
  reviewCount: 128,
  stock: 15,
};

// Default product card
export const Default: Story = {
  args: {
    product: sampleProduct,
    onAddToCart: (product) => console.log("Add to cart:", product),
    onQuickView: (product) => console.log("Quick view:", product),
    onToggleFavorite: (product) => console.log("Toggle favorite:", product),
    showRating: true,
    showStock: true,
    variant: "default",
  },
};

// On sale with discount
export const OnSale: Story = {
  args: {
    product: {
      ...sampleProduct,
      salePrice: 199.99,
      badge: { text: "SALE", variant: "sale" },
    },
    onAddToCart: (product) => console.log("Add to cart:", product),
    onQuickView: (product) => console.log("Quick view:", product),
    showRating: true,
  },
};

// Out of stock
export const OutOfStock: Story = {
  args: {
    product: {
      ...sampleProduct,
      stock: 0,
    },
    onAddToCart: (product) => console.log("Add to cart:", product),
    showStock: true,
  },
};

// Low stock warning
export const LowStock: Story = {
  args: {
    product: {
      ...sampleProduct,
      stock: 3,
    },
    onAddToCart: (product) => console.log("Add to cart:", product),
    showStock: true,
  },
};

// With NEW badge
export const NewProduct: Story = {
  args: {
    product: {
      ...sampleProduct,
      badge: { text: "NEW", variant: "new" },
    },
    onAddToCart: (product) => console.log("Add to cart:", product),
  },
};

// With HOT badge
export const HotProduct: Story = {
  args: {
    product: {
      ...sampleProduct,
      badge: { text: "HOT", variant: "hot" },
      rating: 4.8,
      reviewCount: 342,
    },
    onAddToCart: (product) => console.log("Add to cart:", product),
  },
};

// With hover image
export const WithHoverImage: Story = {
  args: {
    product: {
      ...sampleProduct,
      hoverImage: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop",
    },
    onAddToCart: (product) => console.log("Add to cart:", product),
  },
  parameters: {
    docs: {
      description: {
        story: "Hover over the image to see the alternative image",
      },
    },
  },
};

// Compact variant
export const Compact: Story = {
  args: {
    product: sampleProduct,
    variant: "compact",
    onAddToCart: (product) => console.log("Add to cart:", product),
    showRating: true,
  },
};

// Without rating
export const NoRating: Story = {
  args: {
    product: {
      ...sampleProduct,
      rating: undefined,
      reviewCount: undefined,
    },
    onAddToCart: (product) => console.log("Add to cart:", product),
    showRating: false,
  },
};

// Favorited product
export const Favorited: Story = {
  render: () => {
    const [isFavorite, setIsFavorite] = useState(true);
    return (
      <ProductCard
        product={sampleProduct}
        onAddToCart={(product) => console.log("Add to cart:", product)}
        onQuickView={(product) => console.log("Quick view:", product)}
        onToggleFavorite={(product) => {
          setIsFavorite(!isFavorite);
          console.log("Toggle favorite:", product);
        }}
        isFavorite={isFavorite}
        showRating={true}
      />
    );
  },
};

// Grid of products (3 columns)
export const ProductGrid: Story = {
  render: () => {
    const products: Product[] = [
      {
        ...sampleProduct,
        id: "1",
        name: "Wireless Headphones",
        price: 299.99,
        salePrice: 199.99,
        badge: { text: "SALE", variant: "sale" },
      },
      {
        ...sampleProduct,
        id: "2",
        name: "Smart Watch",
        description: "Track your fitness goals with style and precision",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        price: 399.99,
        rating: 4.7,
        reviewCount: 89,
        badge: { text: "NEW", variant: "new" },
      },
      {
        ...sampleProduct,
        id: "3",
        name: "Laptop Backpack",
        description: "Durable water-resistant backpack with laptop compartment",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
        price: 79.99,
        rating: 4.3,
        reviewCount: 256,
        stock: 2,
      },
      {
        ...sampleProduct,
        id: "4",
        name: "Mechanical Keyboard",
        description: "RGB backlit mechanical keyboard with tactile switches",
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=300&fit=crop",
        price: 149.99,
        rating: 4.9,
        reviewCount: 412,
        badge: { text: "HOT", variant: "hot" },
      },
      {
        ...sampleProduct,
        id: "5",
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with precision tracking",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
        price: 59.99,
        stock: 0,
      },
      {
        ...sampleProduct,
        id: "6",
        name: "USB-C Hub",
        description: "7-in-1 USB-C hub with HDMI and card reader",
        image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop",
        price: 49.99,
        rating: 4.4,
        reviewCount: 178,
      },
    ];

    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={(p) => console.log("Add to cart:", p)}
            onQuickView={(p) => console.log("Quick view:", p)}
            onToggleFavorite={(p) => console.log("Toggle favorite:", p)}
            showRating={true}
            showStock={true}
          />
        ))}
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};

// List view (full width)
export const ListView: Story = {
  render: () => {
    const products: Product[] = [
      {
        ...sampleProduct,
        id: "1",
        salePrice: 199.99,
      },
      {
        ...sampleProduct,
        id: "2",
        name: "Smart Watch",
        description: "Track your fitness goals with style and precision",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        price: 399.99,
      },
      {
        ...sampleProduct,
        id: "3",
        name: "Laptop Backpack",
        description: "Durable water-resistant backpack with laptop compartment",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
        price: 79.99,
        stock: 0,
      },
    ];

    return (
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={(p) => console.log("Add to cart:", p)}
            onQuickView={(p) => console.log("Quick view:", p)}
            showRating={true}
            showStock={true}
            className="w-full max-w-4xl"
          />
        ))}
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};

// Loading skeleton
export const LoadingSkeleton: Story = {
  render: () => (
    <div className="max-w-sm overflow-hidden rounded-brutal border-brutal bg-card shadow-brutal">
      {/* Image skeleton */}
      <div className="aspect-[4/3] animate-pulse bg-muted" />

      {/* Content skeleton */}
      <div className="p-4">
        {/* Title skeleton */}
        <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-muted" />

        {/* Description skeleton */}
        <div className="mb-3 space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-muted" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
        </div>

        {/* Rating skeleton */}
        <div className="mb-3 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-4 w-4 animate-pulse rounded bg-muted"
            />
          ))}
        </div>

        {/* Stock skeleton */}
        <div className="mb-3 h-6 w-24 animate-pulse rounded-brutal bg-muted" />

        {/* Price and button skeleton */}
        <div className="flex items-center justify-between gap-2">
          <div className="h-7 w-20 animate-pulse rounded bg-muted" />
          <div className="h-10 w-24 animate-pulse rounded-brutal bg-muted" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Loading skeleton state for better perceived performance",
      },
    },
  },
};

// Different currency
export const DifferentCurrency: Story = {
  args: {
    product: {
      ...sampleProduct,
      price: 249.99,
      currency: "EUR",
    },
    onAddToCart: (product) => console.log("Add to cart:", product),
  },
};

// High rating
export const HighRating: Story = {
  args: {
    product: {
      ...sampleProduct,
      rating: 4.9,
      reviewCount: 542,
      badge: { text: "BESTSELLER", variant: "hot" },
    },
    onAddToCart: (product) => console.log("Add to cart:", product),
    showRating: true,
  },
};

// No actions (display only)
export const DisplayOnly: Story = {
  args: {
    product: sampleProduct,
    showRating: true,
    showStock: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Product card without any action buttons (onAddToCart, onQuickView, onToggleFavorite not provided)",
      },
    },
  },
};
