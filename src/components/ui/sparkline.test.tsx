import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Sparkline, SparklineCard, SparklineGroup } from './sparkline';

describe('Sparkline Component', () => {
  const mockData = [10, 20, 15, 30, 25, 35, 40];

  describe('Rendering', () => {
    it('renders SVG element', () => {
      const { container } = render(<Sparkline data={mockData} />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders line path', () => {
      const { container } = render(<Sparkline data={mockData} />);

      const line = container.querySelector('.sparkline-line');
      expect(line).toBeInTheDocument();
    });

    it('applies custom width', () => {
      const { container } = render(<Sparkline data={mockData} width={200} />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '200');
    });

    it('applies custom height', () => {
      const { container } = render(<Sparkline data={mockData} height={50} />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('height', '50');
    });

    it('uses default dimensions when not specified', () => {
      const { container } = render(<Sparkline data={mockData} />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '100');
      expect(svg).toHaveAttribute('height', '30');
    });
  });

  describe('Area Fill', () => {
    it('shows area when showArea is true', () => {
      const { container } = render(<Sparkline data={mockData} showArea={true} />);

      const area = container.querySelector('.sparkline-area');
      expect(area).toBeInTheDocument();
    });

    it('hides area when showArea is false', () => {
      const { container } = render(<Sparkline data={mockData} showArea={false} />);

      const area = container.querySelector('.sparkline-area');
      expect(area).not.toBeInTheDocument();
    });

    it('applies custom fill color', () => {
      const { container } = render(
        <Sparkline data={mockData} showArea={true} fillColor="blue" />
      );

      const area = container.querySelector('.sparkline-area');
      expect(area).toHaveAttribute('fill', 'blue');
    });

    it('uses line color as fill when fillColor not specified', () => {
      const { container } = render(
        <Sparkline data={mockData} showArea={true} color="red" />
      );

      const area = container.querySelector('.sparkline-area');
      expect(area).toHaveAttribute('fill', 'red');
    });

    it('applies opacity to area', () => {
      const { container } = render(
        <Sparkline data={mockData} showArea={true} />
      );

      const area = container.querySelector('.sparkline-area');
      expect(area).toHaveAttribute('opacity', '0.2');
    });
  });

  describe('Dots', () => {
    it('shows dots when showDots is true', () => {
      const { container } = render(<Sparkline data={mockData} showDots={true} />);

      const dots = container.querySelectorAll('.sparkline-dot');
      expect(dots.length).toBe(mockData.length);
    });

    it('hides dots when showDots is false', () => {
      const { container } = render(<Sparkline data={mockData} showDots={false} />);

      const dots = container.querySelectorAll('.sparkline-dot');
      expect(dots.length).toBe(0);
    });

    it('scales dot size with stroke width', () => {
      const { container } = render(
        <Sparkline data={mockData} showDots={true} strokeWidth={4} />
      );

      const dot = container.querySelector('.sparkline-dot');
      // Dot radius should be strokeWidth * 1.5 = 6
      expect(dot).toHaveAttribute('r', '6');
    });
  });

  describe('Styling', () => {
    it('applies custom color', () => {
      const { container } = render(<Sparkline data={mockData} color="purple" />);

      const line = container.querySelector('.sparkline-line');
      expect(line).toHaveAttribute('stroke', 'purple');
    });

    it('applies custom stroke width', () => {
      const { container } = render(
        <Sparkline data={mockData} strokeWidth={4} />
      );

      const line = container.querySelector('.sparkline-line');
      expect(line).toHaveAttribute('stroke-width', '4');
    });

    it('applies custom className', () => {
      const { container } = render(
        <Sparkline data={mockData} className="custom-sparkline" />
      );

      expect(container.querySelector('.custom-sparkline')).toBeInTheDocument();
    });

    it('uses linecap and linejoin for smooth lines', () => {
      const { container } = render(<Sparkline data={mockData} />);

      const line = container.querySelector('.sparkline-line');
      expect(line).toHaveAttribute('stroke-linecap', 'round');
      expect(line).toHaveAttribute('stroke-linejoin', 'round');
    });
  });

  describe('Data Handling', () => {
    it('returns null for empty data', () => {
      const { container } = render(<Sparkline data={[]} />);

      const svg = container.querySelector('svg');
      expect(svg).not.toBeInTheDocument();
    });

    it('returns null for single data point', () => {
      const { container } = render(<Sparkline data={[10]} />);

      const svg = container.querySelector('svg');
      expect(svg).not.toBeInTheDocument();
    });

    it('handles two data points', () => {
      const { container } = render(<Sparkline data={[10, 20]} />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('handles negative values', () => {
      const negativeData = [-10, 0, 10, 20];
      const { container } = render(<Sparkline data={negativeData} />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('handles equal values', () => {
      const flatData = [10, 10, 10, 10];
      const { container } = render(<Sparkline data={flatData} />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('handles decimal values', () => {
      const decimalData = [10.5, 20.3, 15.7, 30.2];
      const { container } = render(<Sparkline data={decimalData} />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('handles large dataset', () => {
      const largeData = Array.from({ length: 100 }, (_, i) => i);
      const { container } = render(<Sparkline data={largeData} showDots={true} />);

      const dots = container.querySelectorAll('.sparkline-dot');
      expect(dots.length).toBe(100);
    });
  });

  describe('Scale and Range', () => {
    it('scales correctly with varying range', () => {
      const wideRangeData = [0, 100];
      const { container } = render(<Sparkline data={wideRangeData} />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('handles narrow range', () => {
      const narrowRangeData = [10, 11, 12, 13];
      const { container } = render(<Sparkline data={narrowRangeData} />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });
});

describe('SparklineCard Component', () => {
  const mockData = [10, 20, 15, 30, 25, 35, 40];

  describe('Rendering', () => {
    it('renders card with title', () => {
      render(
        <SparklineCard title="Revenue" value="$10,000" data={mockData} />
      );

      expect(screen.getByText('Revenue')).toBeInTheDocument();
    });

    it('renders value', () => {
      render(
        <SparklineCard title="Revenue" value="$10,000" data={mockData} />
      );

      expect(screen.getByText('$10,000')).toBeInTheDocument();
    });

    it('renders numeric value', () => {
      render(<SparklineCard title="Count" value={1000} data={mockData} />);

      expect(screen.getByText('1000')).toBeInTheDocument();
    });

    it('renders sparkline', () => {
      const { container } = render(
        <SparklineCard title="Revenue" value="$10,000" data={mockData} />
      );

      const sparkline = container.querySelector('.sparkline');
      expect(sparkline).toBeInTheDocument();
    });
  });

  describe('Change Indicator', () => {
    it('displays positive change', () => {
      render(
        <SparklineCard
          title="Revenue"
          value="$10,000"
          data={mockData}
          change={{ value: 12.5, label: 'vs last month' }}
        />
      );

      expect(screen.getByText(/\+12\.5%/)).toBeInTheDocument();
      expect(screen.getByText(/vs last month/)).toBeInTheDocument();
    });

    it('displays negative change', () => {
      render(
        <SparklineCard
          title="Revenue"
          value="$10,000"
          data={mockData}
          change={{ value: -5.3 }}
        />
      );

      expect(screen.getByText(/-5\.3%/)).toBeInTheDocument();
    });

    it('uses green color for positive change', () => {
      const { container } = render(
        <SparklineCard
          title="Revenue"
          value="$10,000"
          data={mockData}
          change={{ value: 12.5 }}
        />
      );

      const changeElement = container.querySelector('.text-green-600');
      expect(changeElement).toBeInTheDocument();
    });

    it('uses red color for negative change', () => {
      const { container } = render(
        <SparklineCard
          title="Revenue"
          value="$10,000"
          data={mockData}
          change={{ value: -5.3 }}
        />
      );

      const changeElement = container.querySelector('.text-red-600');
      expect(changeElement).toBeInTheDocument();
    });

    it('treats zero as positive', () => {
      const { container } = render(
        <SparklineCard
          title="Revenue"
          value="$10,000"
          data={mockData}
          change={{ value: 0 }}
        />
      );

      const changeElement = container.querySelector('.text-green-600');
      expect(changeElement).toBeInTheDocument();
      expect(screen.getByText(/\+0%/)).toBeInTheDocument();
    });

    it('hides change when not provided', () => {
      render(<SparklineCard title="Revenue" value="$10,000" data={mockData} />);

      expect(screen.queryByText(/%/)).not.toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies custom sparkline color', () => {
      const { container } = render(
        <SparklineCard
          title="Revenue"
          value="$10,000"
          data={mockData}
          sparklineColor="purple"
        />
      );

      const line = container.querySelector('.sparkline-line');
      expect(line).toHaveAttribute('stroke', 'purple');
    });

    it('shows area by default', () => {
      const { container } = render(
        <SparklineCard title="Revenue" value="$10,000" data={mockData} />
      );

      const area = container.querySelector('.sparkline-area');
      expect(area).toBeInTheDocument();
    });

    it('hides area when showArea is false', () => {
      const { container } = render(
        <SparklineCard
          title="Revenue"
          value="$10,000"
          data={mockData}
          showArea={false}
        />
      );

      const area = container.querySelector('.sparkline-area');
      expect(area).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <SparklineCard
          title="Revenue"
          value="$10,000"
          data={mockData}
          className="custom-card"
        />
      );

      expect(container.querySelector('.custom-card')).toBeInTheDocument();
    });
  });
});

describe('SparklineGroup Component', () => {
  const mockItems = [
    { label: 'Revenue', value: 10000, data: [10, 20, 15, 30, 25] },
    { label: 'Users', value: 5000, data: [5, 10, 8, 15, 12] },
    { label: 'Sessions', value: 8000, data: [8, 16, 12, 24, 20] },
  ];

  describe('Rendering', () => {
    it('renders all items', () => {
      render(<SparklineGroup items={mockItems} />);

      expect(screen.getByText('Revenue')).toBeInTheDocument();
      expect(screen.getByText('Users')).toBeInTheDocument();
      expect(screen.getByText('Sessions')).toBeInTheDocument();
    });

    it('renders values for each item', () => {
      render(<SparklineGroup items={mockItems} />);

      expect(screen.getByText('10000')).toBeInTheDocument();
      expect(screen.getByText('5000')).toBeInTheDocument();
      expect(screen.getByText('8000')).toBeInTheDocument();
    });

    it('renders sparkline for each item', () => {
      const { container } = render(<SparklineGroup items={mockItems} />);

      const sparklines = container.querySelectorAll('.sparkline');
      expect(sparklines.length).toBe(mockItems.length);
    });
  });

  describe('Colors', () => {
    it('uses custom colors when provided', () => {
      const itemsWithColors = [
        { label: 'A', value: 100, data: [1, 2, 3], color: 'red' },
        { label: 'B', value: 200, data: [2, 4, 6], color: 'blue' },
      ];

      const { container } = render(<SparklineGroup items={itemsWithColors} />);

      const lines = container.querySelectorAll('.sparkline-line');
      expect(lines[0]).toHaveAttribute('stroke', 'red');
      expect(lines[1]).toHaveAttribute('stroke', 'blue');
    });

    it('uses default color when not specified', () => {
      const itemsWithoutColors = [
        { label: 'A', value: 100, data: [1, 2, 3] },
      ];

      const { container } = render(<SparklineGroup items={itemsWithoutColors} />);

      const line = container.querySelector('.sparkline-line');
      expect(line).toHaveAttribute('stroke', 'hsl(var(--primary))');
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <SparklineGroup items={mockItems} className="custom-group" />
      );

      expect(container.querySelector('.custom-group')).toBeInTheDocument();
    });

    it('applies hover effect to items', () => {
      const { container } = render(<SparklineGroup items={mockItems} />);

      const items = container.querySelectorAll('.hover\\:bg-accent');
      expect(items.length).toBe(mockItems.length);
    });

    it('shows area for all sparklines', () => {
      const { container } = render(<SparklineGroup items={mockItems} />);

      const areas = container.querySelectorAll('.sparkline-area');
      expect(areas.length).toBe(mockItems.length);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty items array', () => {
      const { container } = render(<SparklineGroup items={[]} />);

      expect(container.querySelector('.space-y-2')).toBeInTheDocument();
    });

    it('handles single item', () => {
      const singleItem = [
        { label: 'Only', value: 100, data: [1, 2, 3] },
      ];

      render(<SparklineGroup items={singleItem} />);

      expect(screen.getByText('Only')).toBeInTheDocument();
    });

    it('handles many items', () => {
      const manyItems = Array.from({ length: 10 }, (_, i) => ({
        label: `Item ${i}`,
        value: i * 100,
        data: [i, i * 2, i * 3],
      }));

      const { container } = render(<SparklineGroup items={manyItems} />);

      const sparklines = container.querySelectorAll('.sparkline');
      expect(sparklines.length).toBe(10);
    });
  });
});
