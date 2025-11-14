/**
 * ✅ FABRK COMPONENT
 * ProductGrid Stories - E-commerce product grid layouts
 *
 * @see ProductGrid component documentation
 */

import { ProductGrid } from "@/components/ui/product-grid";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof ProductGrid> = {
  title: "UI/E-commerce/ProductGrid",
  component: ProductGrid,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    columns: {
      control: "number",
    },
    loading: {
      control: "boolean",
    },
    error: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductGrid>;

const sampleProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 299,
    image: "https://placehold.co/400x400/3B82F6/FFFFFF/png?text=Headphones",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 399,
    image: "https://placehold.co/400x400/8B5CF6/FFFFFF/png?text=Watch",
  },
  {
    id: "3",
    name: "Laptop Stand",
    price: 89,
    image: "https://placehold.co/400x400/10B981/FFFFFF/png?text=Stand",
  },
  {
    id: "4",
    name: "Mechanical Keyboard",
    price: 179,
    image: "https://placehold.co/400x400/F59E0B/FFFFFF/png?text=Keyboard",
  },
  {
    id: "5",
    name: "USB-C Hub",
    price: 69,
    image: "https://placehold.co/400x400/EF4444/FFFFFF/png?text=Hub",
  },
  {
    id: "6",
    name: "Webcam HD",
    price: 129,
    image: "https://placehold.co/400x400/EC4899/FFFFFF/png?text=Webcam",
  },
  {
    id: "7",
    name: "Monitor 27\"",
    price: 449,
    image: "https://placehold.co/400x400/6366F1/FFFFFF/png?text=Monitor",
  },
  {
    id: "8",
    name: "Gaming Mouse",
    price: 79,
    image: "https://placehold.co/400x400/14B8A6/FFFFFF/png?text=Mouse",
  },
];

/**
 * Default product grid
 */
export const Default: Story = {
  args: {
    products: sampleProducts,
  },
};

/**
 * Three columns
 */
export const ThreeColumns: Story = {
  args: {
    products: sampleProducts,
    columns: 3,
  },
};

/**
 * Two columns
 */
export const TwoColumns: Story = {
  args: {
    products: sampleProducts,
    columns: 2,
  },
};

/**
 * Six columns
 */
export const SixColumns: Story = {
  args: {
    products: sampleProducts.slice(0, 6),
    columns: 6,
  },
};

/**
 * Small catalog
 */
export const SmallCatalog: Story = {
  args: {
    products: sampleProducts.slice(0, 4),
  },
};

/**
 * Single row
 */
export const SingleRow: Story = {
  args: {
    products: sampleProducts.slice(0, 4),
    columns: 4,
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    loading: true,
  },
};

/**
 * Error state
 */
export const Error: Story = {
  args: {
    error: true,
  },
};

/**
 * Empty grid
 */
export const Empty: Story = {
  args: {
    products: [],
  },
};

/**
 * Without images
 */
export const WithoutImages: Story = {
  args: {
    products: sampleProducts.map(p => ({ ...p, image: undefined })),
  },
};

/**
 * Electronics store
 */
export const ElectronicsStore: Story = {
  render: () => (
    <div className="w-full max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <p className="text-sm text-muted-foreground">{sampleProducts.length} items</p>
      </div>
      <ProductGrid products={sampleProducts} columns={4} />
    </div>
  ),
};

/**
 * Fashion products
 */
export const FashionProducts: Story = {
  args: {
    products: [
      {
        id: "1",
        name: "Classic T-Shirt",
        price: 29,
        image: "https://placehold.co/400x400/EF4444/FFFFFF/png?text=T-Shirt",
      },
      {
        id: "2",
        name: "Denim Jeans",
        price: 89,
        image: "https://placehold.co/400x400/3B82F6/FFFFFF/png?text=Jeans",
      },
      {
        id: "3",
        name: "Leather Jacket",
        price: 299,
        image: "https://placehold.co/400x400/000000/FFFFFF/png?text=Jacket",
      },
      {
        id: "4",
        name: "Sneakers",
        price: 129,
        image: "https://placehold.co/400x400/10B981/FFFFFF/png?text=Sneakers",
      },
      {
        id: "5",
        name: "Backpack",
        price: 69,
        image: "https://placehold.co/400x400/8B5CF6/FFFFFF/png?text=Backpack",
      },
      {
        id: "6",
        name: "Watch",
        price: 199,
        image: "https://placehold.co/400x400/F59E0B/FFFFFF/png?text=Watch",
      },
    ],
    columns: 3,
  },
};

/**
 * Home decor
 */
export const HomeDecor: Story = {
  args: {
    products: [
      {
        id: "1",
        name: "Modern Lamp",
        price: 149,
        image: "https://placehold.co/400x400/F59E0B/FFFFFF/png?text=Lamp",
      },
      {
        id: "2",
        name: "Throw Pillow",
        price: 39,
        image: "https://placehold.co/400x400/EC4899/FFFFFF/png?text=Pillow",
      },
      {
        id: "3",
        name: "Wall Art",
        price: 99,
        image: "https://placehold.co/400x400/8B5CF6/FFFFFF/png?text=Art",
      },
      {
        id: "4",
        name: "Area Rug",
        price: 299,
        image: "https://placehold.co/400x400/10B981/FFFFFF/png?text=Rug",
      },
    ],
  },
};

/**
 * Featured collection
 */
export const FeaturedCollection: Story = {
  render: () => (
    <div className="w-full max-w-7xl space-y-8">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">New Arrivals</h1>
        <p className="text-lg text-muted-foreground">
          Check out our latest collection
        </p>
      </div>
      <ProductGrid products={sampleProducts} columns={4} />
      <div className="text-center">
        <button className="rounded-md border px-6 py-2 hover:bg-accent">
          View All Products
        </button>
      </div>
    </div>
  ),
};

/**
 * Sale section
 */
export const SaleSection: Story = {
  render: () => (
    <div className="w-full max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Flash Sale</h2>
          <p className="text-muted-foreground">Limited time offers - up to 50% off</p>
        </div>
        <span className="rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white">
          Ends in 2h 34m
        </span>
      </div>
      <ProductGrid products={sampleProducts.slice(0, 6)} columns={3} />
    </div>
  ),
};

/**
 * Category page
 */
export const CategoryPage: Story = {
  render: () => (
    <div className="w-full max-w-7xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Electronics</h1>
        <p className="text-muted-foreground">Browse our selection of quality electronics</p>
      </div>

      <div className="flex items-center justify-between border-b pb-4">
        <p className="text-sm text-muted-foreground">{sampleProducts.length} products</p>
        <select className="rounded-md border px-3 py-2 text-sm">
          <option>Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>

      <ProductGrid products={sampleProducts} columns={4} />
    </div>
  ),
};

/**
 * Search results
 */
export const SearchResults: Story = {
  render: () => (
    <div className="w-full max-w-7xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          Search results for "headphones"
        </h2>
        <p className="text-sm text-muted-foreground">
          Found {sampleProducts.length} products
        </p>
      </div>
      <ProductGrid products={sampleProducts} columns={4} />
    </div>
  ),
};

/**
 * Related products
 */
export const RelatedProducts: Story = {
  render: () => (
    <div className="w-full max-w-7xl space-y-6">
      <h3 className="text-xl font-semibold">You might also like</h3>
      <ProductGrid products={sampleProducts.slice(0, 4)} columns={4} />
    </div>
  ),
};

/**
 * Best sellers
 */
export const BestSellers: Story = {
  render: () => (
    <div className="w-full max-w-7xl space-y-6">
      <div className="text-center">
        <h2 className="mb-2 text-3xl font-bold">Best Sellers</h2>
        <p className="text-muted-foreground">Our most popular products</p>
      </div>
      <ProductGrid products={sampleProducts} columns={4} />
    </div>
  ),
};
