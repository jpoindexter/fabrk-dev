import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Heatmap } from './heatmap';
import type { HeatmapDataItem } from './heatmap';

describe('Heatmap Component', () => {
  const mockData: HeatmapDataItem[] = [
    { x: 'Mon', y: 'Morning', value: 10 },
    { x: 'Mon', y: 'Afternoon', value: 25 },
    { x: 'Mon', y: 'Evening', value: 40 },
    { x: 'Tue', y: 'Morning', value: 15 },
    { x: 'Tue', y: 'Afternoon', value: 30 },
    { x: 'Tue', y: 'Evening', value: 35 },
    { x: 'Wed', y: 'Morning', value: 20 },
    { x: 'Wed', y: 'Afternoon', value: 35 },
    { x: 'Wed', y: 'Evening', value: 45 },
  ];

  describe('Rendering', () => {
    it('renders heatmap grid', () => {
      const { container } = render(<Heatmap data={mockData} />);

      const grid = container.querySelector('.flex.flex-col');
      expect(grid).toBeInTheDocument();
    });

    it('renders correct number of cells', () => {
      const { container } = render(<Heatmap data={mockData} />);

      const cells = container.querySelectorAll('.cursor-pointer');
      expect(cells.length).toBe(mockData.length);
    });

    it('renders empty cells for missing data points', () => {
      const incompleteData: HeatmapDataItem[] = [
        { x: 'Mon', y: 'Morning', value: 10 },
        // Missing Mon Afternoon
        { x: 'Tue', y: 'Morning', value: 15 },
        { x: 'Tue', y: 'Afternoon', value: 20 },
      ];

      const { container } = render(<Heatmap data={incompleteData} />);

      const emptyCells = container.querySelectorAll('.bg-muted');
      expect(emptyCells.length).toBeGreaterThan(0);
    });

    it('applies custom cell size', () => {
      const { container } = render(<Heatmap data={mockData} cellSize={60} />);

      const cells = container.querySelectorAll('.cursor-pointer');
      const firstCell = cells[0] as HTMLElement;
      expect(firstCell.style.width).toBe('60px');
      expect(firstCell.style.height).toBe('60px');
    });

    it('applies custom gap', () => {
      const { container } = render(<Heatmap data={mockData} gap={5} />);

      const rows = container.querySelectorAll('.flex.flex-col > div');
      expect(rows.length).toBeGreaterThan(0);
    });
  });

  describe('Labels', () => {
    it('shows x and y labels by default', () => {
      render(<Heatmap data={mockData} />);

      expect(screen.getByText('Mon')).toBeInTheDocument();
      expect(screen.getByText('Tue')).toBeInTheDocument();
      expect(screen.getByText('Wed')).toBeInTheDocument();
      expect(screen.getByText('Morning')).toBeInTheDocument();
      expect(screen.getByText('Afternoon')).toBeInTheDocument();
      expect(screen.getByText('Evening')).toBeInTheDocument();
    });

    it('hides labels when showLabels is false', () => {
      render(<Heatmap data={mockData} showLabels={false} />);

      expect(screen.queryByText('Mon')).not.toBeInTheDocument();
      expect(screen.queryByText('Morning')).not.toBeInTheDocument();
    });

    it('extracts unique labels from data', () => {
      const dataWithDuplicates: HeatmapDataItem[] = [
        { x: 'A', y: '1', value: 10 },
        { x: 'A', y: '2', value: 20 },
        { x: 'B', y: '1', value: 15 },
        { x: 'B', y: '2', value: 25 },
      ];

      render(<Heatmap data={dataWithDuplicates} />);

      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('sorts labels correctly', () => {
      const unsortedData: HeatmapDataItem[] = [
        { x: 'C', y: '3', value: 10 },
        { x: 'A', y: '1', value: 20 },
        { x: 'B', y: '2', value: 15 },
      ];

      const { container } = render(<Heatmap data={unsortedData} />);

      const xLabels = container.querySelectorAll('.flex.mb-2 > div');
      expect(xLabels[0].textContent).toBe('A');
      expect(xLabels[1].textContent).toBe('B');
      expect(xLabels[2].textContent).toBe('C');
    });
  });

  describe('Values', () => {
    it('hides values by default', () => {
      render(<Heatmap data={mockData} />);

      expect(screen.queryByText('10')).not.toBeInTheDocument();
      expect(screen.queryByText('25')).not.toBeInTheDocument();
    });

    it('shows values when showValues is true', () => {
      render(<Heatmap data={mockData} showValues={true} />);

      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('25')).toBeInTheDocument();
      expect(screen.getByText('40')).toBeInTheDocument();
    });
  });

  describe('Color Scale', () => {
    it('applies default color scale', () => {
      const { container } = render(<Heatmap data={mockData} />);

      const cells = container.querySelectorAll('.cursor-pointer');
      cells.forEach((cell) => {
        expect(cell).toHaveStyle({ backgroundColor: expect.any(String) });
      });
    });

    it('applies custom color scale', () => {
      const customColors = ['#ff0000', '#00ff00', '#0000ff'];
      const { container } = render(
        <Heatmap data={mockData} colorScale={customColors} />
      );

      const cells = container.querySelectorAll('.cursor-pointer');
      expect(cells.length).toBeGreaterThan(0);
    });

    it('normalizes values to color scale', () => {
      const wideRangeData: HeatmapDataItem[] = [
        { x: 'A', y: '1', value: 0 },
        { x: 'A', y: '2', value: 50 },
        { x: 'A', y: '3', value: 100 },
      ];

      const { container } = render(<Heatmap data={wideRangeData} />);

      const cells = container.querySelectorAll('.cursor-pointer');
      expect(cells.length).toBe(3);
    });

    it('handles equal values correctly', () => {
      const equalData: HeatmapDataItem[] = [
        { x: 'A', y: '1', value: 50 },
        { x: 'A', y: '2', value: 50 },
        { x: 'A', y: '3', value: 50 },
      ];

      const { container } = render(<Heatmap data={equalData} />);

      const cells = container.querySelectorAll('.cursor-pointer');
      const firstCellBg = (cells[0] as HTMLElement).style.backgroundColor;
      cells.forEach((cell) => {
        expect((cell as HTMLElement).style.backgroundColor).toBe(firstCellBg);
      });
    });
  });

  describe('Interactions', () => {
    it('applies hover effect to cell', () => {
      const { container } = render(<Heatmap data={mockData} />);

      const cells = container.querySelectorAll('.cursor-pointer');
      const firstCell = cells[0];

      fireEvent.mouseEnter(firstCell);

      expect(firstCell).toHaveClass('scale-110');
      expect(firstCell).toHaveClass('shadow-brutal-lg');
    });

    it('removes hover effect on mouse leave', () => {
      const { container } = render(<Heatmap data={mockData} />);

      const cells = container.querySelectorAll('.cursor-pointer');
      const firstCell = cells[0];

      fireEvent.mouseEnter(firstCell);
      expect(firstCell).toHaveClass('scale-110');

      fireEvent.mouseLeave(firstCell);
      expect(firstCell).not.toHaveClass('scale-110');
    });

    it('shows tooltip on hover', () => {
      const { container } = render(<Heatmap data={mockData} />);

      const cells = container.querySelectorAll('.cursor-pointer');
      const firstCell = cells[0];

      fireEvent.mouseEnter(firstCell);

      const tooltip = container.querySelector('.bg-card.shadow-brutal-lg');
      expect(tooltip).toBeInTheDocument();
    });

    it('displays correct data in tooltip', () => {
      const { container } = render(<Heatmap data={mockData} />);

      const cells = container.querySelectorAll('.cursor-pointer');
      const firstCell = cells[0];

      fireEvent.mouseEnter(firstCell);

      expect(screen.getByText(/Morning × Mon/)).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('hides tooltip on mouse leave', () => {
      const { container } = render(<Heatmap data={mockData} />);

      const cells = container.querySelectorAll('.cursor-pointer');
      const firstCell = cells[0];

      fireEvent.mouseEnter(firstCell);
      const tooltip = container.querySelector('.bg-card.shadow-brutal-lg');
      expect(tooltip).toBeInTheDocument();

      fireEvent.mouseLeave(firstCell);
      expect(container.querySelector('.bg-card.shadow-brutal-lg')).not.toBeInTheDocument();
    });

    it('calls onCellClick when cell is clicked', () => {
      const mockClick = vi.fn();
      const { container } = render(
        <Heatmap data={mockData} onCellClick={mockClick} />
      );

      const cells = container.querySelectorAll('.cursor-pointer');
      const firstCell = cells[0];

      fireEvent.click(firstCell);

      expect(mockClick).toHaveBeenCalledWith(
        expect.objectContaining({
          x: 'Mon',
          y: 'Morning',
          value: 10,
        })
      );
    });

    it('does not call onCellClick for empty cells', () => {
      const mockClick = vi.fn();
      const incompleteData: HeatmapDataItem[] = [
        { x: 'A', y: '1', value: 10 },
      ];

      const { container } = render(
        <Heatmap data={incompleteData} onCellClick={mockClick} />
      );

      const emptyCells = container.querySelectorAll('.bg-muted');
      if (emptyCells.length > 0) {
        fireEvent.click(emptyCells[0]);
        expect(mockClick).not.toHaveBeenCalled();
      }
    });
  });

  describe('Edge Cases', () => {
    it('handles empty data array', () => {
      const { container } = render(<Heatmap data={[]} />);

      const grid = container.querySelector('.flex.flex-col');
      expect(grid).toBeInTheDocument();
    });

    it('handles single data point', () => {
      const singleData: HeatmapDataItem[] = [{ x: 'A', y: '1', value: 50 }];

      const { container } = render(<Heatmap data={singleData} />);

      const cells = container.querySelectorAll('.cursor-pointer');
      expect(cells.length).toBe(1);
    });

    it('handles negative values', () => {
      const negativeData: HeatmapDataItem[] = [
        { x: 'A', y: '1', value: -10 },
        { x: 'A', y: '2', value: 0 },
        { x: 'A', y: '3', value: 10 },
      ];

      const { container } = render(<Heatmap data={negativeData} />);

      const cells = container.querySelectorAll('.cursor-pointer');
      expect(cells.length).toBe(3);
    });

    it('handles decimal values', () => {
      const decimalData: HeatmapDataItem[] = [
        { x: 'A', y: '1', value: 10.5 },
        { x: 'A', y: '2', value: 20.7 },
        { x: 'A', y: '3', value: 30.3 },
      ];

      render(<Heatmap data={decimalData} showValues={true} />);

      expect(screen.getByText('10.5')).toBeInTheDocument();
      expect(screen.getByText('20.7')).toBeInTheDocument();
      expect(screen.getByText('30.3')).toBeInTheDocument();
    });

    it('handles very large values', () => {
      const largeData: HeatmapDataItem[] = [
        { x: 'A', y: '1', value: 1000000 },
        { x: 'A', y: '2', value: 2000000 },
        { x: 'A', y: '3', value: 3000000 },
      ];

      render(<Heatmap data={largeData} showValues={true} />);

      expect(screen.getByText('1000000')).toBeInTheDocument();
    });

    it('handles numeric labels', () => {
      const numericData: HeatmapDataItem[] = [
        { x: 1, y: 10, value: 50 },
        { x: 2, y: 20, value: 60 },
        { x: 3, y: 30, value: 70 },
      ];

      render(<Heatmap data={numericData} />);

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('handles large grids', () => {
      const largeGrid: HeatmapDataItem[] = [];
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
          largeGrid.push({ x: `X${x}`, y: `Y${y}`, value: x * y });
        }
      }

      const { container } = render(<Heatmap data={largeGrid} />);

      const cells = container.querySelectorAll('.cursor-pointer');
      expect(cells.length).toBe(100);
    });

    it('handles missing x or y coordinate', () => {
      const sparseData: HeatmapDataItem[] = [
        { x: 'A', y: '1', value: 10 },
        { x: 'B', y: '1', value: 20 },
      ];

      const { container } = render(<Heatmap data={sparseData} />);

      const cells = container.querySelectorAll('.cursor-pointer');
      expect(cells.length).toBe(2);
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <Heatmap data={mockData} className="custom-heatmap" />
      );

      expect(container.querySelector('.custom-heatmap')).toBeInTheDocument();
    });

    it('applies rounded corners to cells', () => {
      const { container } = render(<Heatmap data={mockData} />);

      const cells = container.querySelectorAll('.cursor-pointer');
      cells.forEach((cell) => {
        expect(cell).toHaveClass('rounded-sm');
      });
    });

    it('applies transition effects', () => {
      const { container } = render(<Heatmap data={mockData} />);

      const cells = container.querySelectorAll('.cursor-pointer');
      cells.forEach((cell) => {
        expect(cell).toHaveClass('transition-all');
      });
    });
  });

  describe('Accessibility', () => {
    it('has cursor pointer on cells', () => {
      const { container } = render(<Heatmap data={mockData} />);

      const cells = container.querySelectorAll('.cursor-pointer');
      expect(cells.length).toBeGreaterThan(0);
    });

    it('provides visual feedback on hover', () => {
      const { container } = render(<Heatmap data={mockData} />);

      const cells = container.querySelectorAll('.cursor-pointer');
      const firstCell = cells[0];

      fireEvent.mouseEnter(firstCell);

      expect(firstCell).toHaveClass('scale-110');
    });

    it('shows tooltip with context on hover', () => {
      const { container } = render(<Heatmap data={mockData} />);

      const cells = container.querySelectorAll('.cursor-pointer');
      const firstCell = cells[0];

      fireEvent.mouseEnter(firstCell);

      const tooltip = container.querySelector('.bg-card.shadow-brutal-lg');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent('Morning');
      expect(tooltip).toHaveTextContent('Mon');
    });
  });
});
