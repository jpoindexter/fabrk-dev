import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PieChart } from './pie-chart';
import type { PieChartDataItem } from './pie-chart';

describe('PieChart Component', () => {
  const mockData: PieChartDataItem[] = [
    { label: 'Sales', value: 45, color: '#3b82f6' },
    { label: 'Marketing', value: 25, color: '#10b981' },
    { label: 'Operations', value: 20, color: '#f59e0b' },
    { label: 'R&D', value: 10, color: '#8b5cf6' },
  ];

  describe('Rendering', () => {
    it('renders SVG element', () => {
      const { container } = render(<PieChart data={mockData} />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders correct number of segments', () => {
      const { container } = render(<PieChart data={mockData} />);

      const paths = container.querySelectorAll('path');
      expect(paths.length).toBe(mockData.length);
    });

    it('applies custom size', () => {
      const { container } = render(<PieChart data={mockData} size={400} />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '400');
      expect(svg).toHaveAttribute('height', '400');
    });

    it('renders with default size when not specified', () => {
      const { container } = render(<PieChart data={mockData} />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '300');
      expect(svg).toHaveAttribute('height', '300');
    });
  });

  describe('Legend', () => {
    it('shows legend when showLegend is true', () => {
      render(<PieChart data={mockData} showLegend={true} />);

      expect(screen.getByText('Sales')).toBeInTheDocument();
      expect(screen.getByText('Marketing')).toBeInTheDocument();
      expect(screen.getByText('Operations')).toBeInTheDocument();
      expect(screen.getByText('R&D')).toBeInTheDocument();
    });

    it('hides legend when showLegend is false', () => {
      render(<PieChart data={mockData} showLegend={false} />);

      expect(screen.queryByText('Sales')).not.toBeInTheDocument();
      expect(screen.queryByText('Marketing')).not.toBeInTheDocument();
    });

    it('displays percentages in legend when showPercentages is true', () => {
      render(<PieChart data={mockData} showLegend={true} showPercentages={true} />);

      // Sales: 45/100 = 45%
      expect(screen.getByText(/45\.0%/)).toBeInTheDocument();
      // Marketing: 25/100 = 25%
      expect(screen.getByText(/25\.0%/)).toBeInTheDocument();
    });

    it('shows color indicators in legend', () => {
      const { container } = render(<PieChart data={mockData} showLegend={true} />);

      const colorBoxes = container.querySelectorAll('.w-3.h-3');
      expect(colorBoxes.length).toBe(mockData.length);
    });
  });

  describe('Labels on Segments', () => {
    it('shows labels on segments when showLabels is true', () => {
      const { container } = render(
        <PieChart data={mockData} showLabels={true} showPercentages={false} />
      );

      const textElements = container.querySelectorAll('text');
      // Should have labels for segments > 5%
      expect(textElements.length).toBeGreaterThan(0);
    });

    it('hides labels when showLabels is false', () => {
      const { container } = render(
        <PieChart data={mockData} showLabels={false} />
      );

      // Should only have legend text, no labels on segments
      const svgText = container.querySelector('svg text');
      expect(svgText).not.toBeInTheDocument();
    });

    it('shows percentages on segments when showPercentages is true', () => {
      const { container } = render(
        <PieChart data={mockData} showLabels={true} showPercentages={true} />
      );

      const textElements = container.querySelectorAll('svg text');
      // Should have percentage text elements
      expect(textElements.length).toBeGreaterThan(0);
    });

    it('does not show labels for segments smaller than 5%', () => {
      const dataWithSmallSegment: PieChartDataItem[] = [
        { label: 'Large', value: 95 },
        { label: 'Tiny', value: 5 },
      ];

      const { container } = render(
        <PieChart data={dataWithSmallSegment} showLabels={true} />
      );

      // Small segment (5%) should not have label
      const textElements = container.querySelectorAll('svg text');
      // Should only show label for large segment
      expect(textElements.length).toBeLessThanOrEqual(1);
    });
  });

  describe('Interactions', () => {
    it('applies hover effect to segment', () => {
      const { container } = render(<PieChart data={mockData} />);

      const firstPath = container.querySelector('path');
      if (firstPath) {
        fireEvent.mouseEnter(firstPath);

        // Hovered segment should have opacity-90 class
        expect(firstPath).toHaveClass('opacity-90');
      }
    });

    it('removes hover effect on mouse leave', () => {
      const { container } = render(<PieChart data={mockData} />);

      const firstPath = container.querySelector('path');
      if (firstPath) {
        fireEvent.mouseEnter(firstPath);
        expect(firstPath).toHaveClass('opacity-90');

        fireEvent.mouseLeave(firstPath);
        expect(firstPath).not.toHaveClass('opacity-90');
      }
    });

    it('calls onSegmentClick when segment is clicked', () => {
      const mockClick = vi.fn();
      const { container } = render(
        <PieChart data={mockData} onSegmentClick={mockClick} />
      );

      const firstPath = container.querySelector('path');
      if (firstPath) {
        fireEvent.click(firstPath);

        expect(mockClick).toHaveBeenCalledWith(
          expect.objectContaining({
            label: 'Sales',
            value: 45,
          }),
          0
        );
      }
    });

    it('dims other legend items when one is hovered', () => {
      const { container } = render(<PieChart data={mockData} showLegend={true} />);

      const legendItems = container.querySelectorAll('.flex.items-center.gap-2');
      const firstItem = legendItems[0];

      if (firstItem) {
        fireEvent.mouseEnter(firstItem);

        // Other items should have opacity-50
        const secondItem = legendItems[1];
        expect(secondItem).toHaveClass('opacity-50');
      }
    });

    it('calls onSegmentClick when legend item is clicked', () => {
      const mockClick = vi.fn();
      const { container } = render(
        <PieChart data={mockData} showLegend={true} onSegmentClick={mockClick} />
      );

      const legendItems = container.querySelectorAll('.flex.items-center.gap-2');
      const firstItem = legendItems[0];

      if (firstItem) {
        fireEvent.click(firstItem);

        expect(mockClick).toHaveBeenCalledWith(
          expect.objectContaining({
            label: 'Sales',
            value: 45,
          }),
          0
        );
      }
    });
  });

  describe('Donut Chart Mode', () => {
    it('renders as donut chart when innerRadius is provided', () => {
      const { container } = render(
        <PieChart data={mockData} innerRadius={50} />
      );

      // Donut chart will have different path structure
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBe(mockData.length);
    });

    it('renders as pie chart when innerRadius is 0', () => {
      const { container } = render(<PieChart data={mockData} innerRadius={0} />);

      const paths = container.querySelectorAll('path');
      expect(paths.length).toBe(mockData.length);
    });
  });

  describe('Color Handling', () => {
    it('uses custom colors when provided', () => {
      const { container } = render(<PieChart data={mockData} />);

      const firstPath = container.querySelector('path');
      expect(firstPath).toHaveAttribute('fill', '#3b82f6');
    });

    it('uses default colors when not provided', () => {
      const dataWithoutColors: PieChartDataItem[] = [
        { label: 'A', value: 50 },
        { label: 'B', value: 50 },
      ];

      const { container } = render(<PieChart data={dataWithoutColors} />);

      const paths = container.querySelectorAll('path');
      // Should have default colors applied
      expect(paths[0]).toHaveAttribute('fill');
      expect(paths[1]).toHaveAttribute('fill');
    });

    it('cycles through default colors for many segments', () => {
      const manySegments: PieChartDataItem[] = Array.from(
        { length: 10 },
        (_, i) => ({
          label: `Segment ${i}`,
          value: 10,
        })
      );

      const { container } = render(<PieChart data={manySegments} />);

      const paths = container.querySelectorAll('path');
      expect(paths.length).toBe(10);
    });
  });

  describe('Calculations', () => {
    it('calculates percentages correctly', () => {
      render(
        <PieChart data={mockData} showLegend={true} showPercentages={true} />
      );

      // Total = 100, Sales = 45
      expect(screen.getByText(/45\.0%/)).toBeInTheDocument();
      // Total = 100, Marketing = 25
      expect(screen.getByText(/25\.0%/)).toBeInTheDocument();
      // Total = 100, Operations = 20
      expect(screen.getByText(/20\.0%/)).toBeInTheDocument();
      // Total = 100, R&D = 10
      expect(screen.getByText(/10\.0%/)).toBeInTheDocument();
    });

    it('handles equal values correctly', () => {
      const equalData: PieChartDataItem[] = [
        { label: 'A', value: 25 },
        { label: 'B', value: 25 },
        { label: 'C', value: 25 },
        { label: 'D', value: 25 },
      ];

      render(
        <PieChart data={equalData} showLegend={true} showPercentages={true} />
      );

      // All should be 25%
      const percentages = screen.getAllByText(/25\.0%/);
      expect(percentages.length).toBe(4);
    });

    it('handles non-100 totals correctly', () => {
      const data: PieChartDataItem[] = [
        { label: 'A', value: 30 },
        { label: 'B', value: 20 },
      ];

      render(<PieChart data={data} showLegend={true} showPercentages={true} />);

      // A: 30/50 = 60%
      expect(screen.getByText(/60\.0%/)).toBeInTheDocument();
      // B: 20/50 = 40%
      expect(screen.getByText(/40\.0%/)).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles single data point', () => {
      const singleData: PieChartDataItem[] = [{ label: 'Only', value: 100 }];

      const { container } = render(<PieChart data={singleData} />);

      const paths = container.querySelectorAll('path');
      expect(paths.length).toBe(1);
    });

    it('handles zero values', () => {
      const dataWithZero: PieChartDataItem[] = [
        { label: 'A', value: 100 },
        { label: 'B', value: 0 },
      ];

      const { container } = render(<PieChart data={dataWithZero} />);

      // Should still render both segments (even if one is 0)
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBe(2);
    });

    it('handles very small values', () => {
      const smallValueData: PieChartDataItem[] = [
        { label: 'Large', value: 99.9 },
        { label: 'Tiny', value: 0.1 },
      ];

      const { container } = render(<PieChart data={smallValueData} />);

      const paths = container.querySelectorAll('path');
      expect(paths.length).toBe(2);
    });

    it('handles decimal values', () => {
      const decimalData: PieChartDataItem[] = [
        { label: 'A', value: 33.33 },
        { label: 'B', value: 33.33 },
        { label: 'C', value: 33.34 },
      ];

      const { container } = render(<PieChart data={decimalData} />);

      const paths = container.querySelectorAll('path');
      expect(paths.length).toBe(3);
    });

    it('handles very large values', () => {
      const largeValueData: PieChartDataItem[] = [
        { label: 'A', value: 1000000 },
        { label: 'B', value: 500000 },
      ];

      render(
        <PieChart data={largeValueData} showLegend={true} showPercentages={true} />
      );

      // A: 1M/1.5M = 66.7%
      expect(screen.getByText(/66\.7%/)).toBeInTheDocument();
      // B: 500K/1.5M = 33.3%
      expect(screen.getByText(/33\.3%/)).toBeInTheDocument();
    });

    it('handles empty data array gracefully', () => {
      const { container } = render(<PieChart data={[]} />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('handles very long labels', () => {
      const longLabelData: PieChartDataItem[] = [
        {
          label: 'This is a very long label that should be handled gracefully',
          value: 50,
        },
        { label: 'Short', value: 50 },
      ];

      render(<PieChart data={longLabelData} showLegend={true} />);

      expect(
        screen.getByText('This is a very long label that should be handled gracefully')
      ).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has cursor pointer on segments', () => {
      const { container } = render(<PieChart data={mockData} />);

      const paths = container.querySelectorAll('path');
      paths.forEach((path) => {
        expect(path).toHaveClass('cursor-pointer');
      });
    });

    it('has cursor pointer on legend items', () => {
      const { container } = render(<PieChart data={mockData} showLegend={true} />);

      const legendItems = container.querySelectorAll('.cursor-pointer');
      expect(legendItems.length).toBeGreaterThan(0);
    });

    it('applies transition effects', () => {
      const { container } = render(<PieChart data={mockData} />);

      const paths = container.querySelectorAll('path');
      paths.forEach((path) => {
        expect(path).toHaveClass('transition-all');
      });
    });
  });
});
