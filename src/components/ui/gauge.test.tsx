import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Gauge, ScoreGauge } from './gauge';

describe('Gauge Component', () => {
  describe('Rendering', () => {
    it('renders SVG element', () => {
      const { container } = render(<Gauge value={50} />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom size', () => {
      const { container } = render(<Gauge value={50} size={300} />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '300');
      expect(svg).toHaveAttribute('height', '300');
    });

    it('renders with default size when not specified', () => {
      const { container } = render(<Gauge value={50} />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '200');
      expect(svg).toHaveAttribute('height', '200');
    });

    it('renders background arc', () => {
      const { container} = render(<Gauge value={50} />);

      const backgroundArc = container.querySelector('.gauge-background');
      expect(backgroundArc).toBeInTheDocument();
    });

    it('renders value arc', () => {
      const { container } = render(<Gauge value={50} />);

      const valueArc = container.querySelector('.gauge-value');
      expect(valueArc).toBeInTheDocument();
    });

    it('renders needle', () => {
      const { container } = render(<Gauge value={50} />);

      const needle = container.querySelector('.gauge-needle');
      expect(needle).toBeInTheDocument();
    });

    it('renders center dot', () => {
      const { container } = render(<Gauge value={50} />);

      const centerDot = container.querySelector('.gauge-center');
      expect(centerDot).toBeInTheDocument();
    });
  });

  describe('Value Display', () => {
    it('shows value when showValue is true', () => {
      render(<Gauge value={75} showValue={true} />);

      expect(screen.getByText('75')).toBeInTheDocument();
    });

    it('hides value when showValue is false', () => {
      render(<Gauge value={75} showValue={false} />);

      expect(screen.queryByText('75')).not.toBeInTheDocument();
    });

    it('displays unit when provided', () => {
      render(<Gauge value={75} unit="%" showValue={true} />);

      expect(screen.getByText('75')).toBeInTheDocument();
      expect(screen.getByText('%')).toBeInTheDocument();
    });

    it('displays label when provided', () => {
      render(<Gauge value={75} label="Performance" showValue={true} />);

      expect(screen.getByText('Performance')).toBeInTheDocument();
    });

    it('rounds value to integer', () => {
      render(<Gauge value={75.7} showValue={true} />);

      expect(screen.getByText('76')).toBeInTheDocument();
    });
  });

  describe('Min/Max Labels', () => {
    it('shows min/max labels when showMinMax is true', () => {
      render(<Gauge value={50} min={0} max={100} showMinMax={true} />);

      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('hides min/max labels when showMinMax is false', () => {
      const { container } = render(
        <Gauge value={50} min={0} max={100} showMinMax={false} />
      );

      // Should not have min/max text in SVG
      const svgTexts = container.querySelectorAll('svg text');
      expect(svgTexts.length).toBe(0);
    });

    it('displays custom min/max values', () => {
      render(<Gauge value={50} min={20} max={80} showMinMax={true} />);

      expect(screen.getByText('20')).toBeInTheDocument();
      expect(screen.getByText('80')).toBeInTheDocument();
    });
  });

  describe('Value Clamping', () => {
    it('clamps value to max', () => {
      render(<Gauge value={150} min={0} max={100} showValue={true} />);

      // Value should be clamped to 100
      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('clamps value to min', () => {
      render(<Gauge value={-10} min={0} max={100} showValue={true} />);

      // Value should be clamped to 0
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('handles value within range', () => {
      render(<Gauge value={50} min={0} max={100} showValue={true} />);

      expect(screen.getByText('50')).toBeInTheDocument();
    });
  });

  describe('Customization', () => {
    it('applies custom thickness', () => {
      const { container } = render(<Gauge value={50} thickness={30} />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom angles', () => {
      const { container } = render(
        <Gauge value={50} startAngle={-180} endAngle={180} />
      );

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom color', () => {
      const { container } = render(<Gauge value={50} color="red" />);

      const valueArc = container.querySelector('.gauge-value');
      expect(valueArc).toHaveAttribute('fill', 'red');
    });

    it('applies custom background color', () => {
      const { container } = render(
        <Gauge value={50} backgroundColor="lightgray" />
      );

      const backgroundArc = container.querySelector('.gauge-background');
      expect(backgroundArc).toHaveAttribute('fill', 'lightgray');
    });
  });

  describe('Segments', () => {
    const segments = [
      { value: 33, color: 'green', label: 'Low' },
      { value: 33, color: 'yellow', label: 'Medium' },
      { value: 34, color: 'red', label: 'High' },
    ];

    it('renders segments when provided', () => {
      const { container } = render(<Gauge value={50} segments={segments} />);

      const segmentPaths = container.querySelectorAll('.gauge-segment');
      expect(segmentPaths.length).toBe(3);
    });

    it('applies segment colors', () => {
      const { container } = render(<Gauge value={50} segments={segments} />);

      const segmentPaths = container.querySelectorAll('.gauge-segment');
      expect(segmentPaths[0]).toHaveAttribute('fill', 'green');
      expect(segmentPaths[1]).toHaveAttribute('fill', 'yellow');
      expect(segmentPaths[2]).toHaveAttribute('fill', 'red');
    });

    it('does not render value arc when segments are provided', () => {
      const { container } = render(<Gauge value={50} segments={segments} />);

      const valueArc = container.querySelector('.gauge-value');
      expect(valueArc).not.toBeInTheDocument();
    });
  });

  describe('Animation', () => {
    it('applies transition classes', () => {
      const { container } = render(<Gauge value={50} />);

      const valueArc = container.querySelector('.gauge-value');
      expect(valueArc).toHaveClass('transition-all');

      const needle = container.querySelector('.gauge-needle');
      expect(needle).toHaveClass('transition-all');
    });
  });

  describe('Edge Cases', () => {
    it('handles zero value', () => {
      render(<Gauge value={0} min={0} max={100} showValue={true} />);

      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('handles max value', () => {
      render(<Gauge value={100} min={0} max={100} showValue={true} />);

      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('handles negative range', () => {
      render(<Gauge value={0} min={-50} max={50} showValue={true} />);

      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('handles decimal values', () => {
      render(<Gauge value={75.5} showValue={true} />);

      // Should round to 76
      expect(screen.getByText('76')).toBeInTheDocument();
    });

    it('handles very small range', () => {
      render(<Gauge value={5} min={0} max={10} showValue={true} />);

      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('handles very large range', () => {
      render(<Gauge value={5000} min={0} max={10000} showValue={true} />);

      expect(screen.getByText('5000')).toBeInTheDocument();
    });

    it('handles equal min and max', () => {
      render(<Gauge value={50} min={50} max={50} showValue={true} />);

      expect(screen.getByText('50')).toBeInTheDocument();
    });
  });

  describe('Custom Class', () => {
    it('applies custom className', () => {
      const { container } = render(
        <Gauge value={50} className="custom-gauge" />
      );

      expect(container.querySelector('.custom-gauge')).toBeInTheDocument();
    });
  });
});

describe('ScoreGauge Component', () => {
  describe('Rendering', () => {
    it('renders gauge with score', () => {
      render(<ScoreGauge score={75} />);

      expect(screen.getByText('75')).toBeInTheDocument();
    });

    it('applies custom max score', () => {
      render(<ScoreGauge score={40} maxScore={50} />);

      expect(screen.getByText('40')).toBeInTheDocument();
    });

    it('displays label when provided', () => {
      render(<ScoreGauge score={75} label="Overall Score" />);

      expect(screen.getByText('Overall Score')).toBeInTheDocument();
    });

    it('applies custom size', () => {
      const { container } = render(<ScoreGauge score={75} size={250} />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '250');
    });
  });

  describe('Color Coding', () => {
    it('uses green for high scores (80%+)', () => {
      const { container } = render(<ScoreGauge score={85} maxScore={100} />);

      const valueArc = container.querySelector('.gauge-value');
      // Green color: oklch(70% 0.15 160)
      expect(valueArc).toHaveAttribute('fill', 'oklch(70% 0.15 160)');
    });

    it('uses yellow for good scores (60-79%)', () => {
      const { container } = render(<ScoreGauge score={65} maxScore={100} />);

      const valueArc = container.querySelector('.gauge-value');
      // Yellow color: oklch(70% 0.15 60)
      expect(valueArc).toHaveAttribute('fill', 'oklch(70% 0.15 60)');
    });

    it('uses orange for medium scores (40-59%)', () => {
      const { container } = render(<ScoreGauge score={45} maxScore={100} />);

      const valueArc = container.querySelector('.gauge-value');
      // Orange color: oklch(70% 0.15 30)
      expect(valueArc).toHaveAttribute('fill', 'oklch(70% 0.15 30)');
    });

    it('uses red for low scores (<40%)', () => {
      const { container } = render(<ScoreGauge score={30} maxScore={100} />);

      const valueArc = container.querySelector('.gauge-value');
      // Red color: oklch(60% 0.20 25)
      expect(valueArc).toHaveAttribute('fill', 'oklch(60% 0.20 25)');
    });

    it('handles edge case at 80%', () => {
      const { container } = render(<ScoreGauge score={80} maxScore={100} />);

      const valueArc = container.querySelector('.gauge-value');
      expect(valueArc).toHaveAttribute('fill', 'oklch(70% 0.15 160)');
    });

    it('handles edge case at 60%', () => {
      const { container } = render(<ScoreGauge score={60} maxScore={100} />);

      const valueArc = container.querySelector('.gauge-value');
      expect(valueArc).toHaveAttribute('fill', 'oklch(70% 0.15 60)');
    });

    it('handles edge case at 40%', () => {
      const { container } = render(<ScoreGauge score={40} maxScore={100} />);

      const valueArc = container.querySelector('.gauge-value');
      expect(valueArc).toHaveAttribute('fill', 'oklch(70% 0.15 30)');
    });
  });

  describe('Different Max Scores', () => {
    it('calculates percentage correctly for score out of 50', () => {
      const { container } = render(<ScoreGauge score={40} maxScore={50} />);

      // 40/50 = 80%, should be green
      const valueArc = container.querySelector('.gauge-value');
      expect(valueArc).toHaveAttribute('fill', 'oklch(70% 0.15 160)');
    });

    it('calculates percentage correctly for score out of 10', () => {
      const { container } = render(<ScoreGauge score={7} maxScore={10} />);

      // 7/10 = 70%, should be yellow
      const valueArc = container.querySelector('.gauge-value');
      expect(valueArc).toHaveAttribute('fill', 'oklch(70% 0.15 60)');
    });

    it('calculates percentage correctly for score out of 5', () => {
      const { container } = render(<ScoreGauge score={2} maxScore={5} />);

      // 2/5 = 40%, should be orange
      const valueArc = container.querySelector('.gauge-value');
      expect(valueArc).toHaveAttribute('fill', 'oklch(70% 0.15 30)');
    });
  });

  describe('Edge Cases', () => {
    it('handles zero score', () => {
      render(<ScoreGauge score={0} />);

      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('handles max score', () => {
      render(<ScoreGauge score={100} maxScore={100} />);

      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('handles decimal scores', () => {
      render(<ScoreGauge score={75.7} />);

      // Should round to 76
      expect(screen.getByText('76')).toBeInTheDocument();
    });
  });

  describe('Custom Class', () => {
    it('applies custom className', () => {
      const { container } = render(
        <ScoreGauge score={75} className="custom-score-gauge" />
      );

      expect(container.querySelector('.custom-score-gauge')).toBeInTheDocument();
    });
  });
});
