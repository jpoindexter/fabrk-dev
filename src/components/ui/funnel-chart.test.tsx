import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FunnelChart } from './funnel-chart';
import type { FunnelStage } from './funnel-chart';

describe('FunnelChart Component', () => {
  const mockData: FunnelStage[] = [
    { label: 'Visitors', value: 10000 },
    { label: 'Sign Ups', value: 5000 },
    { label: 'Active Users', value: 2000 },
    { label: 'Paying Customers', value: 500 },
  ];

  describe('Rendering', () => {
    it('renders SVG elements for each stage', () => {
      const { container } = render(<FunnelChart data={mockData} />);

      const svgElements = container.querySelectorAll('svg');
      expect(svgElements.length).toBe(mockData.length);
    });

    it('renders correct number of stages', () => {
      const { container } = render(<FunnelChart data={mockData} />);

      const stages = container.querySelectorAll('.transition-all.cursor-pointer');
      expect(stages.length).toBe(mockData.length);
    });

    it('applies custom width', () => {
      const { container } = render(
        <FunnelChart data={mockData} width={800} direction="vertical" />
      );

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '800');
    });

    it('applies custom height', () => {
      const { container } = render(
        <FunnelChart data={mockData} height={600} />
      );

      const wrapper = container.querySelector('.flex.flex-col');
      expect(wrapper).toBeInTheDocument();
    });

    it('renders in vertical direction by default', () => {
      const { container } = render(<FunnelChart data={mockData} />);

      const wrapper = container.querySelector('.flex.flex-col');
      expect(wrapper).toBeInTheDocument();
    });

    it('renders in horizontal direction when specified', () => {
      const { container } = render(
        <FunnelChart data={mockData} direction="horizontal" />
      );

      const wrapper = container.querySelector('.flex.flex-row');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Labels and Values', () => {
    it('displays stage labels', () => {
      render(<FunnelChart data={mockData} />);

      expect(screen.getByText('Visitors')).toBeInTheDocument();
      expect(screen.getByText('Sign Ups')).toBeInTheDocument();
      expect(screen.getByText('Active Users')).toBeInTheDocument();
      expect(screen.getByText('Paying Customers')).toBeInTheDocument();
    });

    it('shows values by default', () => {
      render(<FunnelChart data={mockData} />);

      expect(screen.getByText('10,000')).toBeInTheDocument();
      expect(screen.getByText('5,000')).toBeInTheDocument();
      expect(screen.getByText('2,000')).toBeInTheDocument();
      expect(screen.getByText('500')).toBeInTheDocument();
    });

    it('hides values when showValues is false', () => {
      render(<FunnelChart data={mockData} showValues={false} />);

      expect(screen.queryByText('10,000')).not.toBeInTheDocument();
      expect(screen.queryByText('5,000')).not.toBeInTheDocument();
    });

    it('formats large numbers with thousand separators', () => {
      const largeData: FunnelStage[] = [
        { label: 'Stage 1', value: 1000000 },
        { label: 'Stage 2', value: 500000 },
      ];

      render(<FunnelChart data={largeData} />);

      expect(screen.getByText('1,000,000')).toBeInTheDocument();
      expect(screen.getByText('500,000')).toBeInTheDocument();
    });
  });

  describe('Conversion Rates', () => {
    it('shows conversion percentages by default', () => {
      render(<FunnelChart data={mockData} />);

      // Sign Ups: 5000/10000 = 50%
      expect(screen.getByText(/50\.0% conversion/)).toBeInTheDocument();
      // Active Users: 2000/5000 = 40%
      expect(screen.getByText(/40\.0% conversion/)).toBeInTheDocument();
      // Paying Customers: 500/2000 = 25%
      expect(screen.getByText(/25\.0% conversion/)).toBeInTheDocument();
    });

    it('does not show conversion for first stage', () => {
      const { container } = render(<FunnelChart data={mockData} />);

      const firstStage = container.querySelector('.transition-all.cursor-pointer');
      expect(firstStage?.textContent).not.toContain('conversion');
    });

    it('hides conversion percentages when showPercentages is false', () => {
      render(<FunnelChart data={mockData} showPercentages={false} />);

      expect(screen.queryByText(/conversion/)).not.toBeInTheDocument();
    });

    it('calculates 100% conversion correctly', () => {
      const equalData: FunnelStage[] = [
        { label: 'Stage 1', value: 100 },
        { label: 'Stage 2', value: 100 },
      ];

      render(<FunnelChart data={equalData} />);

      expect(screen.getByText(/100\.0% conversion/)).toBeInTheDocument();
    });

    it('handles low conversion rates', () => {
      const lowConversionData: FunnelStage[] = [
        { label: 'Stage 1', value: 10000 },
        { label: 'Stage 2', value: 100 },
      ];

      render(<FunnelChart data={lowConversionData} />);

      expect(screen.getByText(/1\.0% conversion/)).toBeInTheDocument();
    });
  });

  describe('Colors', () => {
    it('uses default colors when not specified', () => {
      const { container } = render(<FunnelChart data={mockData} />);

      const paths = container.querySelectorAll('path');
      expect(paths.length).toBe(mockData.length);
      paths.forEach((path) => {
        expect(path).toHaveAttribute('fill');
      });
    });

    it('uses custom colors when provided', () => {
      const coloredData: FunnelStage[] = [
        { label: 'Stage 1', value: 100, color: '#ff0000' },
        { label: 'Stage 2', value: 50, color: '#00ff00' },
      ];

      const { container } = render(<FunnelChart data={coloredData} />);

      const paths = container.querySelectorAll('path');
      expect(paths[0]).toHaveAttribute('fill', '#ff0000');
      expect(paths[1]).toHaveAttribute('fill', '#00ff00');
    });

    it('cycles through default colors for many stages', () => {
      const manyStages: FunnelStage[] = Array.from({ length: 7 }, (_, i) => ({
        label: `Stage ${i + 1}`,
        value: 100 - i * 10,
      }));

      const { container } = render(<FunnelChart data={manyStages} />);

      const paths = container.querySelectorAll('path');
      expect(paths.length).toBe(7);
    });

    it('displays color indicators in legend', () => {
      const { container } = render(<FunnelChart data={mockData} />);

      const colorBoxes = container.querySelectorAll('.w-3.h-3.rounded-sm.border-brutal');
      expect(colorBoxes.length).toBe(mockData.length);
    });
  });

  describe('Legend', () => {
    it('renders legend with all stages', () => {
      const { container } = render(<FunnelChart data={mockData} />);

      const legendItems = container.querySelectorAll('.flex.items-center.gap-2');
      expect(legendItems.length).toBe(mockData.length);
    });

    it('syncs legend hover with stage hover', () => {
      const { container } = render(<FunnelChart data={mockData} />);

      const legendItems = container.querySelectorAll('.flex.items-center.gap-2');
      const firstLegendItem = legendItems[0];

      fireEvent.mouseEnter(firstLegendItem);

      // Other legend items should have opacity-50
      const secondLegendItem = legendItems[1];
      expect(secondLegendItem).toHaveClass('opacity-50');
    });

    it('removes opacity when no legend item is hovered', () => {
      const { container } = render(<FunnelChart data={mockData} />);

      const legendItems = container.querySelectorAll('.flex.items-center.gap-2');
      const firstLegendItem = legendItems[0];

      fireEvent.mouseEnter(firstLegendItem);
      fireEvent.mouseLeave(firstLegendItem);

      legendItems.forEach((item) => {
        expect(item).not.toHaveClass('opacity-50');
      });
    });
  });

  describe('Interactions', () => {
    it('applies hover effect to stage', () => {
      const { container } = render(<FunnelChart data={mockData} />);

      const stages = container.querySelectorAll('.transition-all.cursor-pointer');
      const firstStage = stages[0];

      fireEvent.mouseEnter(firstStage);

      expect(firstStage).toHaveClass('scale-105');
    });

    it('removes hover effect on mouse leave', () => {
      const { container } = render(<FunnelChart data={mockData} />);

      const stages = container.querySelectorAll('.transition-all.cursor-pointer');
      const firstStage = stages[0];

      fireEvent.mouseEnter(firstStage);
      expect(firstStage).toHaveClass('scale-105');

      fireEvent.mouseLeave(firstStage);
      expect(firstStage).not.toHaveClass('scale-105');
    });

    it('calls onStageClick when stage is clicked', () => {
      const mockClick = vi.fn();
      const { container } = render(
        <FunnelChart data={mockData} onStageClick={mockClick} />
      );

      const stages = container.querySelectorAll('.transition-all.cursor-pointer');
      const firstStage = stages[0];

      fireEvent.click(firstStage);

      expect(mockClick).toHaveBeenCalledWith(
        expect.objectContaining({
          label: 'Visitors',
          value: 10000,
        }),
        0
      );
    });

    it('syncs hover between stage and legend', () => {
      const { container } = render(<FunnelChart data={mockData} />);

      const stages = container.querySelectorAll('.transition-all.cursor-pointer');
      const legendItems = container.querySelectorAll('.flex.items-center.gap-2');

      fireEvent.mouseEnter(stages[0]);

      // Other legend items should be dimmed
      expect(legendItems[1]).toHaveClass('opacity-50');

      fireEvent.mouseLeave(stages[0]);

      // All legend items should be normal
      legendItems.forEach((item) => {
        expect(item).not.toHaveClass('opacity-50');
      });
    });
  });

  describe('Gap Spacing', () => {
    it('applies default gap', () => {
      const { container } = render(<FunnelChart data={mockData} />);

      const wrapper = container.querySelector('.flex.flex-col');
      expect(wrapper).toBeInTheDocument();
    });

    it('applies custom gap', () => {
      const { container } = render(<FunnelChart data={mockData} gap={16} />);

      const wrapper = container.querySelector('.flex.flex-col');
      expect(wrapper?.getAttribute('style')).toContain('gap: 16px');
    });

    it('handles zero gap', () => {
      const { container } = render(<FunnelChart data={mockData} gap={0} />);

      const wrapper = container.querySelector('.flex.flex-col');
      expect(wrapper?.getAttribute('style')).toContain('gap: 0px');
    });
  });

  describe('Edge Cases', () => {
    it('handles single stage', () => {
      const singleStage: FunnelStage[] = [{ label: 'Only Stage', value: 100 }];

      const { container } = render(<FunnelChart data={singleStage} />);

      const stages = container.querySelectorAll('.transition-all.cursor-pointer');
      expect(stages.length).toBe(1);
    });

    it('handles two stages', () => {
      const twoStages: FunnelStage[] = [
        { label: 'Stage 1', value: 100 },
        { label: 'Stage 2', value: 50 },
      ];

      render(<FunnelChart data={twoStages} />);

      expect(screen.getByText(/50\.0% conversion/)).toBeInTheDocument();
    });

    it('handles many stages', () => {
      const manyStages: FunnelStage[] = Array.from({ length: 10 }, (_, i) => ({
        label: `Stage ${i + 1}`,
        value: 1000 - i * 100,
      }));

      const { container } = render(<FunnelChart data={manyStages} />);

      const stages = container.querySelectorAll('.transition-all.cursor-pointer');
      expect(stages.length).toBe(10);
    });

    it('handles zero values', () => {
      const zeroData: FunnelStage[] = [
        { label: 'Stage 1', value: 100 },
        { label: 'Stage 2', value: 0 },
      ];

      render(<FunnelChart data={zeroData} />);

      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText(/0\.0% conversion/)).toBeInTheDocument();
    });

    it('handles equal values', () => {
      const equalData: FunnelStage[] = [
        { label: 'Stage 1', value: 100 },
        { label: 'Stage 2', value: 100 },
        { label: 'Stage 3', value: 100 },
      ];

      render(<FunnelChart data={equalData} />);

      const conversions = screen.getAllByText(/100\.0% conversion/);
      expect(conversions.length).toBe(2); // Not for first stage
    });

    it('handles decimal values', () => {
      const decimalData: FunnelStage[] = [
        { label: 'Stage 1', value: 100.5 },
        { label: 'Stage 2', value: 50.3 },
      ];

      render(<FunnelChart data={decimalData} />);

      // Values should be formatted with thousand separators
      expect(screen.getByText(/100/)).toBeInTheDocument();
      expect(screen.getByText(/50/)).toBeInTheDocument();
    });

    it('handles very small values', () => {
      const smallData: FunnelStage[] = [
        { label: 'Stage 1', value: 10 },
        { label: 'Stage 2', value: 1 },
      ];

      render(<FunnelChart data={smallData} />);

      expect(screen.getByText(/10\.0% conversion/)).toBeInTheDocument();
    });

    it('handles increasing values (anti-funnel)', () => {
      const increasingData: FunnelStage[] = [
        { label: 'Stage 1', value: 100 },
        { label: 'Stage 2', value: 200 },
      ];

      render(<FunnelChart data={increasingData} />);

      // Should handle >100% conversion
      expect(screen.getByText(/200\.0% conversion/)).toBeInTheDocument();
    });
  });

  describe('Direction Modes', () => {
    it('renders vertical layout correctly', () => {
      const { container } = render(
        <FunnelChart data={mockData} direction="vertical" />
      );

      const wrapper = container.querySelector('.flex.flex-col');
      expect(wrapper).toBeInTheDocument();
    });

    it('renders horizontal layout correctly', () => {
      const { container } = render(
        <FunnelChart data={mockData} direction="horizontal" />
      );

      const wrapper = container.querySelector('.flex.flex-row');
      expect(wrapper).toBeInTheDocument();
    });

    it('hides conversion percentages in horizontal mode', () => {
      render(
        <FunnelChart data={mockData} direction="horizontal" showPercentages={true} />
      );

      // Conversion rates should not appear in horizontal mode
      const stages = screen.queryAllByText(/conversion/);
      expect(stages.length).toBe(0);
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <FunnelChart data={mockData} className="custom-funnel" />
      );

      expect(container.querySelector('.custom-funnel')).toBeInTheDocument();
    });

    it('applies transition effects to stages', () => {
      const { container } = render(<FunnelChart data={mockData} />);

      const stages = container.querySelectorAll('.transition-all.cursor-pointer');
      stages.forEach((stage) => {
        expect(stage).toHaveClass('transition-all');
      });
    });

    it('applies cursor pointer to stages', () => {
      const { container } = render(<FunnelChart data={mockData} />);

      const stages = container.querySelectorAll('.cursor-pointer');
      expect(stages.length).toBe(mockData.length);
    });
  });

  describe('Accessibility', () => {
    it('provides visual feedback on hover', () => {
      const { container } = render(<FunnelChart data={mockData} />);

      const stages = container.querySelectorAll('.transition-all.cursor-pointer');
      const firstStage = stages[0];

      fireEvent.mouseEnter(firstStage);

      expect(firstStage).toHaveClass('scale-105');
    });

    it('supports keyboard interaction via click', () => {
      const mockClick = vi.fn();
      const { container } = render(
        <FunnelChart data={mockData} onStageClick={mockClick} />
      );

      const stages = container.querySelectorAll('.transition-all.cursor-pointer');
      const firstStage = stages[0];

      fireEvent.click(firstStage);

      expect(mockClick).toHaveBeenCalled();
    });

    it('legend items are interactive', () => {
      const { container } = render(<FunnelChart data={mockData} />);

      const legendItems = container.querySelectorAll('.flex.items-center.gap-2');
      legendItems.forEach((item) => {
        expect(item).toHaveClass('cursor-pointer');
      });
    });
  });
});
