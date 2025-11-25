import type { Meta, StoryObj } from "@storybook/nextjs";
import { Rating } from "./rating";
import { useState } from "react";

const meta: Meta<typeof Rating> = {
  title: "UI/Rating",
  component: Rating,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  render: () => {
    const [rating, setRating] = useState(0);
    return <Rating rating={rating} onRatingChange={setRating} />;
  },
};

export const WithPreselectedRating: Story = {
  render: () => {
    const [rating, setRating] = useState(4);
    return <Rating rating={rating} onRatingChange={setRating} />;
  },
};

export const WithValue: Story = {
  render: () => {
    const [rating, setRating] = useState(3.5);
    return <Rating rating={rating} onRatingChange={setRating} showValue />;
  },
};

export const ReadOnly: Story = {
  render: () => {
    return <Rating rating={4.5} readonly showValue />;
  },
};

export const Disabled: Story = {
  render: () => {
    const [rating, setRating] = useState(3);
    return <Rating rating={rating} onRatingChange={setRating} disabled />;
  },
};

export const SmallSize: Story = {
  render: () => {
    const [rating, setRating] = useState(4);
    return <Rating rating={rating} onRatingChange={setRating} size="sm" />;
  },
};

export const MediumSize: Story = {
  render: () => {
    const [rating, setRating] = useState(4);
    return <Rating rating={rating} onRatingChange={setRating} size="md" />;
  },
};

export const LargeSize: Story = {
  render: () => {
    const [rating, setRating] = useState(4);
    return <Rating rating={rating} onRatingChange={setRating} size="lg" />;
  },
};

export const MaxRating10: Story = {
  render: () => {
    const [rating, setRating] = useState(7);
    return (
      <Rating
        rating={rating}
        onRatingChange={setRating}
        maxRating={10}
        showValue
      />
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [rating, setRating] = useState(0);
    return (
      <div className="w-[400px] space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground">
            Rate this product
          </label>
          <Rating rating={rating} onRatingChange={setRating} showValue />
        </div>
        {rating > 0 && (
          <div className="rounded-brutal border-brutal bg-card p-4">
            <p className="text-sm font-bold">Your Rating:</p>
            <p className="text-sm text-muted-foreground">
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const ReviewCard: Story = {
  render: () => {
    const [productRating, setProductRating] = useState(0);
    const [qualityRating, setQualityRating] = useState(0);
    const [valueRating, setValueRating] = useState(0);
    const [serviceRating, setServiceRating] = useState(0);

    const averageRating =
      (productRating + qualityRating + valueRating + serviceRating) / 4;

    return (
      <div className="w-[500px] space-y-6">
        <h3 className="text-lg font-bold">Product Review</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">Overall</span>
            <Rating
              rating={productRating}
              onRatingChange={setProductRating}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">Quality</span>
            <Rating rating={qualityRating} onRatingChange={setQualityRating} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">Value</span>
            <Rating rating={valueRating} onRatingChange={setValueRating} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">Service</span>
            <Rating rating={serviceRating} onRatingChange={setServiceRating} />
          </div>
        </div>
        {averageRating > 0 && (
          <div className="rounded-brutal border-brutal bg-card shadow-sm p-4">
            <p className="text-sm font-bold">Average Rating</p>
            <div className="flex items-center gap-2 mt-2">
              <Rating rating={averageRating} readonly showValue size="lg" />
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const SizeComparison: Story = {
  render: () => {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-bold">Small</p>
          <Rating rating={4} readonly size="sm" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-bold">Medium</p>
          <Rating rating={4} readonly size="md" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-bold">Large</p>
          <Rating rating={4} readonly size="lg" />
        </div>
      </div>
    );
  },
};

export const ProductList: Story = {
  render: () => {
    const products = [
      { name: "Wireless Headphones", rating: 4.5, reviews: 234 },
      { name: "Smartphone Case", rating: 4.2, reviews: 89 },
      { name: "Laptop Stand", rating: 4.8, reviews: 156 },
      { name: "USB-C Cable", rating: 3.9, reviews: 67 },
      { name: "Mouse Pad", rating: 4.6, reviews: 123 },
    ];

    return (
      <div className="w-[500px] space-y-4">
        <h3 className="text-lg font-bold">Products</h3>
        {products.map((product, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-brutal border-brutal bg-card p-4"
          >
            <div>
              <p className="font-bold">{product.name}</p>
              <p className="text-sm text-muted-foreground">
                {product.reviews} reviews
              </p>
            </div>
            <Rating rating={product.rating} readonly showValue />
          </div>
        ))}
      </div>
    );
  },
};
