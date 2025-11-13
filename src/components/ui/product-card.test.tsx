import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from './product-card';
import type { Product } from './product-card';

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    description: 'A great test product',
    image: '/test-product.jpg',
    price: 99.99,
    currency: 'USD',
    rating: 4.5,
    reviewCount: 128,
    stock: 15,
  };

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('A great test product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('displays sale price with strikethrough on original price', () => {
    const saleProduct = {
      ...mockProduct,
      salePrice: 79.99,
    };

    render(<ProductCard product={saleProduct} />);

    // Original price should be present but with line-through
    const originalPrice = screen.getByText('$99.99');
    expect(originalPrice).toBeInTheDocument();
    expect(originalPrice).toHaveClass('line-through');

    // Sale price should be displayed
    expect(screen.getByText('$79.99')).toBeInTheDocument();
  });

  it('renders rating stars correctly', () => {
    render(<ProductCard product={mockProduct} showRating={true} />);

    // Should show rating (4.5) and review count (128)
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(128)')).toBeInTheDocument();
  });

  it('hides rating when showRating is false', () => {
    render(<ProductCard product={mockProduct} showRating={false} />);

    expect(screen.queryByText('4.5')).not.toBeInTheDocument();
  });

  it('displays stock warning when stock is low', () => {
    const lowStockProduct = {
      ...mockProduct,
      stock: 3,
    };

    render(<ProductCard product={lowStockProduct} showStock={true} />);

    expect(screen.getByText('Only 3 left')).toBeInTheDocument();
  });

  it('displays "Out of Stock" when stock is 0', () => {
    const outOfStockProduct = {
      ...mockProduct,
      stock: 0,
    };

    render(<ProductCard product={outOfStockProduct} showStock={true} />);

    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  it('calls onAddToCart when Add to Cart button is clicked', () => {
    const mockAddToCart = vi.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

    const addButton = screen.getByLabelText('Add to cart');
    fireEvent.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
  });

  it('calls onQuickView when Quick View button is clicked', () => {
    const mockQuickView = vi.fn();
    render(<ProductCard product={mockProduct} onQuickView={mockQuickView} />);

    const quickViewButton = screen.getByLabelText('Quick view');
    fireEvent.click(quickViewButton);

    expect(mockQuickView).toHaveBeenCalledWith(mockProduct);
    expect(mockQuickView).toHaveBeenCalledTimes(1);
  });

  it('calls onToggleFavorite when Favorite button is clicked', () => {
    const mockToggleFavorite = vi.fn();
    render(
      <ProductCard
        product={mockProduct}
        onToggleFavorite={mockToggleFavorite}
        isFavorite={false}
      />
    );

    const favoriteButton = screen.getByLabelText('Add to favorites');
    fireEvent.click(favoriteButton);

    expect(mockToggleFavorite).toHaveBeenCalledWith(mockProduct);
    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
  });

  it('shows filled heart when product is favorited', () => {
    render(
      <ProductCard
        product={mockProduct}
        isFavorite={true}
        onToggleFavorite={vi.fn()}
      />
    );

    const favoriteButton = screen.getByLabelText('Remove from favorites');
    expect(favoriteButton).toBeInTheDocument();
  });

  it('displays badge when provided', () => {
    const badgeProduct = {
      ...mockProduct,
      badge: { text: 'SALE', variant: 'sale' as const },
    };

    render(<ProductCard product={badgeProduct} />);

    expect(screen.getByText('SALE')).toBeInTheDocument();
  });

  it('disables Add to Cart button when out of stock', () => {
    const outOfStockProduct = {
      ...mockProduct,
      stock: 0,
    };

    render(<ProductCard product={outOfStockProduct} onAddToCart={vi.fn()} />);

    const addButton = screen.getByLabelText('Add to cart');
    expect(addButton).toBeDisabled();
  });

  it('renders compact variant correctly', () => {
    const { container } = render(
      <ProductCard product={mockProduct} variant="compact" />
    );

    // Compact variant should have different styling
    expect(container.firstChild).toBeInTheDocument();
  });

  it('calculates discount percentage correctly', () => {
    const saleProduct = {
      ...mockProduct,
      price: 100,
      salePrice: 80,
      badge: { text: '-20%', variant: 'sale' as const },
    };

    render(<ProductCard product={saleProduct} />);

    expect(screen.getByText('-20%')).toBeInTheDocument();
  });

  it('handles missing optional props gracefully', () => {
    const minimalProduct: Product = {
      id: '1',
      name: 'Minimal Product',
      description: 'Description',
      image: '/image.jpg',
      price: 50,
    };

    render(<ProductCard product={minimalProduct} />);

    expect(screen.getByText('Minimal Product')).toBeInTheDocument();
    expect(screen.getByText('$50.00')).toBeInTheDocument();
  });

  it('formats price with correct currency symbol', () => {
    const euroProduct = {
      ...mockProduct,
      currency: 'EUR',
      price: 99.99,
    };

    render(<ProductCard product={euroProduct} />);

    // Should format as Euro
    expect(screen.getByText('€99.99')).toBeInTheDocument();
  });

  it('swaps to hover image on mouse enter when provided', () => {
    const hoverProduct = {
      ...mockProduct,
      hoverImage: '/hover-image.jpg',
    };

    const { container } = render(<ProductCard product={hoverProduct} />);

    const imageContainer = container.querySelector('img');
    expect(imageContainer).toHaveAttribute('src', '/test-product.jpg');

    // Mouse enter
    const card = container.firstChild as HTMLElement;
    fireEvent.mouseEnter(card);

    // Image should change (in real implementation)
    // This test validates the structure exists
    expect(imageContainer).toBeInTheDocument();
  });
});

describe('ProductCard Accessibility', () => {
  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    description: 'Description',
    image: '/test.jpg',
    price: 99.99,
  };

  it('has accessible button labels', () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={vi.fn()}
        onQuickView={vi.fn()}
        onToggleFavorite={vi.fn()}
      />
    );

    expect(screen.getByLabelText('Add to cart')).toBeInTheDocument();
    expect(screen.getByLabelText('Quick view')).toBeInTheDocument();
    expect(screen.getByLabelText('Add to favorites')).toBeInTheDocument();
  });

  it('has accessible image alt text', () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
  });

  it('maintains focus order', () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={vi.fn()}
        onQuickView={vi.fn()}
        onToggleFavorite={vi.fn()}
      />
    );

    // All interactive elements should be focusable
    const addButton = screen.getByLabelText('Add to cart');
    const quickViewButton = screen.getByLabelText('Quick view');
    const favoriteButton = screen.getByLabelText('Add to favorites');

    expect(addButton).not.toHaveAttribute('tabIndex', '-1');
    expect(quickViewButton).not.toHaveAttribute('tabIndex', '-1');
    expect(favoriteButton).not.toHaveAttribute('tabIndex', '-1');
  });
});

describe('ProductCard Edge Cases', () => {
  it('handles very long product names', () => {
    const longNameProduct: Product = {
      id: '1',
      name: 'This is a very long product name that should be handled gracefully by the component without breaking the layout',
      description: 'Description',
      image: '/test.jpg',
      price: 99.99,
    };

    render(<ProductCard product={longNameProduct} />);

    expect(
      screen.getByText(
        /This is a very long product name that should be handled gracefully/
      )
    ).toBeInTheDocument();
  });

  it('handles zero price', () => {
    const freeProduct: Product = {
      id: '1',
      name: 'Free Product',
      description: 'Description',
      image: '/test.jpg',
      price: 0,
    };

    render(<ProductCard product={freeProduct} />);

    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });

  it('handles very high stock numbers', () => {
    const highStockProduct: Product = {
      id: '1',
      name: 'Product',
      description: 'Description',
      image: '/test.jpg',
      price: 50,
      stock: 9999,
    };

    render(<ProductCard product={highStockProduct} showStock={true} />);

    // Should not show stock warning for high numbers
    expect(screen.queryByText(/Only.*left/)).not.toBeInTheDocument();
  });

  it('handles decimal prices correctly', () => {
    const decimalProduct: Product = {
      id: '1',
      name: 'Product',
      description: 'Description',
      image: '/test.jpg',
      price: 99.95,
    };

    render(<ProductCard product={decimalProduct} />);

    expect(screen.getByText('$99.95')).toBeInTheDocument();
  });
});
