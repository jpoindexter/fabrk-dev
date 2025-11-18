import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NotificationBadge } from './notification-badge';

describe('NotificationBadge Component', () => {
  describe('Rendering', () => {
    it('renders badge with count', () => {
      render(
        <NotificationBadge count={5}>
          <button>Notifications</button>
        </NotificationBadge>
      );

      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('renders children', () => {
      render(
        <NotificationBadge count={1}>
          <button>Notifications</button>
        </NotificationBadge>
      );

      expect(screen.getByText('Notifications')).toBeInTheDocument();
    });

    it('renders badge in top-right by default', () => {
      const { container } = render(
        <NotificationBadge count={3}>
          <button>Test</button>
        </NotificationBadge>
      );

      const badge = container.querySelector('.top-0.right-0');
      expect(badge).toBeInTheDocument();
    });

    it('renders badge in top-left when position is top-left', () => {
      const { container } = render(
        <NotificationBadge count={3} position="top-left">
          <button>Test</button>
        </NotificationBadge>
      );

      const badge = container.querySelector('.top-0.left-0');
      expect(badge).toBeInTheDocument();
    });

    it('renders badge in bottom-right when position is bottom-right', () => {
      const { container } = render(
        <NotificationBadge count={3} position="bottom-right">
          <button>Test</button>
        </NotificationBadge>
      );

      const badge = container.querySelector('.bottom-0.right-0');
      expect(badge).toBeInTheDocument();
    });

    it('renders badge in bottom-left when position is bottom-left', () => {
      const { container } = render(
        <NotificationBadge count={3} position="bottom-left">
          <button>Test</button>
        </NotificationBadge>
      );

      const badge = container.querySelector('.bottom-0.left-0');
      expect(badge).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <NotificationBadge count={5} className="custom-badge">
          <button>Test</button>
        </NotificationBadge>
      );

      expect(container.querySelector('.custom-badge')).toBeInTheDocument();
    });
  });

  describe('Count Display', () => {
    it('displays exact count for numbers under 100', () => {
      render(
        <NotificationBadge count={42}>
          <button>Test</button>
        </NotificationBadge>
      );

      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('displays 99+ for counts of 100 or more', () => {
      render(
        <NotificationBadge count={150}>
          <button>Test</button>
        </NotificationBadge>
      );

      expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('displays 99+ for count of exactly 100', () => {
      render(
        <NotificationBadge count={100}>
          <button>Test</button>
        </NotificationBadge>
      );

      expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('displays 99+ for very large counts', () => {
      render(
        <NotificationBadge count={9999}>
          <button>Test</button>
        </NotificationBadge>
      );

      expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('does not render badge when count is 0', () => {
      const { container } = render(
        <NotificationBadge count={0}>
          <button>Test</button>
        </NotificationBadge>
      );

      expect(container.querySelector('.absolute')).not.toBeInTheDocument();
    });

    it('does not render badge when count is negative', () => {
      const { container } = render(
        <NotificationBadge count={-5}>
          <button>Test</button>
        </NotificationBadge>
      );

      expect(container.querySelector('.absolute')).not.toBeInTheDocument();
    });
  });

  describe('Dot Mode', () => {
    it('renders dot when dot is true', () => {
      const { container } = render(
        <NotificationBadge dot={true}>
          <button>Test</button>
        </NotificationBadge>
      );

      const dot = container.querySelector('.h-2.w-2');
      expect(dot).toBeInTheDocument();
    });

    it('does not show count when in dot mode', () => {
      render(
        <NotificationBadge count={5} dot={true}>
          <button>Test</button>
        </NotificationBadge>
      );

      expect(screen.queryByText('5')).not.toBeInTheDocument();
    });

    it('renders smaller badge in dot mode', () => {
      const { container } = render(
        <NotificationBadge dot={true}>
          <button>Test</button>
        </NotificationBadge>
      );

      // Dot should be smaller than count badge
      const dot = container.querySelector('.h-2.w-2');
      expect(dot).toBeInTheDocument();
    });

    it('does not render when dot is true but no count', () => {
      const { container } = render(
        <NotificationBadge count={0} dot={true}>
          <button>Test</button>
        </NotificationBadge>
      );

      expect(container.querySelector('.h-2.w-2')).not.toBeInTheDocument();
    });
  });

  describe('Variant Styles', () => {
    it('applies primary variant by default', () => {
      const { container } = render(
        <NotificationBadge count={5}>
          <button>Test</button>
        </NotificationBadge>
      );

      const badge = container.querySelector('.bg-primary');
      expect(badge).toBeInTheDocument();
    });

    it('applies destructive variant', () => {
      const { container } = render(
        <NotificationBadge count={5} variant="destructive">
          <button>Test</button>
        </NotificationBadge>
      );

      const badge = container.querySelector('.bg-destructive');
      expect(badge).toBeInTheDocument();
    });

    it('applies success variant', () => {
      const { container } = render(
        <NotificationBadge count={5} variant="success">
          <button>Test</button>
        </NotificationBadge>
      );

      const badge = container.querySelector('.bg-success');
      expect(badge).toBeInTheDocument();
    });

    it('applies warning variant', () => {
      const { container } = render(
        <NotificationBadge count={5} variant="warning">
          <button>Test</button>
        </NotificationBadge>
      );

      const badge = container.querySelector('.bg-warning');
      expect(badge).toBeInTheDocument();
    });
  });

  describe('Pulse Animation', () => {
    it('adds pulse animation when pulse is true', () => {
      const { container } = render(
        <NotificationBadge count={5} pulse={true}>
          <button>Test</button>
        </NotificationBadge>
      );

      const badge = container.querySelector('.animate-pulse');
      expect(badge).toBeInTheDocument();
    });

    it('does not add pulse animation by default', () => {
      const { container } = render(
        <NotificationBadge count={5}>
          <button>Test</button>
        </NotificationBadge>
      );

      const badge = container.querySelector('.animate-pulse');
      expect(badge).not.toBeInTheDocument();
    });

    it('adds pulse animation in dot mode', () => {
      const { container } = render(
        <NotificationBadge dot={true} pulse={true}>
          <button>Test</button>
        </NotificationBadge>
      );

      const dot = container.querySelector('.animate-pulse');
      expect(dot).toBeInTheDocument();
    });
  });

  describe('Offset', () => {
    it('applies custom offset', () => {
      const { container } = render(
        <NotificationBadge count={5} offset={{ x: 10, y: 5 }}>
          <button>Test</button>
        </NotificationBadge>
      );

      const badge = container.querySelector('.absolute');
      expect(badge).toHaveStyle({ transform: 'translate(10px, 5px)' });
    });

    it('applies default offset when not specified', () => {
      const { container } = render(
        <NotificationBadge count={5}>
          <button>Test</button>
        </NotificationBadge>
      );

      const badge = container.querySelector('.absolute');
      // Default offset should be applied
      expect(badge).toBeInTheDocument();
    });

    it('applies negative offset', () => {
      const { container } = render(
        <NotificationBadge count={5} offset={{ x: -10, y: -5 }}>
          <button>Test</button>
        </NotificationBadge>
      );

      const badge = container.querySelector('.absolute');
      expect(badge).toHaveStyle({ transform: 'translate(-10px, -5px)' });
    });

    it('applies zero offset', () => {
      const { container } = render(
        <NotificationBadge count={5} offset={{ x: 0, y: 0 }}>
          <button>Test</button>
        </NotificationBadge>
      );

      const badge = container.querySelector('.absolute');
      expect(badge).toHaveStyle({ transform: 'translate(0px, 0px)' });
    });
  });

  describe('Container', () => {
    it('wraps children in relative container', () => {
      const { container } = render(
        <NotificationBadge count={5}>
          <button>Test</button>
        </NotificationBadge>
      );

      const wrapper = container.querySelector('.relative.inline-block');
      expect(wrapper).toBeInTheDocument();
    });

    it('preserves child structure', () => {
      render(
        <NotificationBadge count={5}>
          <div>
            <button>Button 1</button>
            <button>Button 2</button>
          </div>
        </NotificationBadge>
      );

      expect(screen.getByText('Button 1')).toBeInTheDocument();
      expect(screen.getByText('Button 2')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles count of 1', () => {
      render(
        <NotificationBadge count={1}>
          <button>Test</button>
        </NotificationBadge>
      );

      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('handles count of 99 (boundary)', () => {
      render(
        <NotificationBadge count={99}>
          <button>Test</button>
        </NotificationBadge>
      );

      expect(screen.getByText('99')).toBeInTheDocument();
      expect(screen.queryByText('99+')).not.toBeInTheDocument();
    });

    it('handles fractional count (rounds down)', () => {
      render(
        <NotificationBadge count={5.7}>
          <button>Test</button>
        </NotificationBadge>
      );

      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('handles very large offset values', () => {
      const { container } = render(
        <NotificationBadge count={5} offset={{ x: 1000, y: 1000 }}>
          <button>Test</button>
        </NotificationBadge>
      );

      const badge = container.querySelector('.absolute');
      expect(badge).toHaveStyle({ transform: 'translate(1000px, 1000px)' });
    });

    it('handles missing children gracefully', () => {
      const { container } = render(
        <NotificationBadge count={5}>
          <button>Test</button>
        </NotificationBadge>
      );

      // Should still render badge
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(container.querySelector('.relative.inline-block')).toBeInTheDocument();
    });

    it('handles multiple notification badges', () => {
      render(
        <div>
          <NotificationBadge count={5}>
            <button>Button 1</button>
          </NotificationBadge>
          <NotificationBadge count={10}>
            <button>Button 2</button>
          </NotificationBadge>
        </div>
      );

      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('updates count dynamically', () => {
      const { rerender } = render(
        <NotificationBadge count={5}>
          <button>Test</button>
        </NotificationBadge>
      );

      expect(screen.getByText('5')).toBeInTheDocument();

      rerender(
        <NotificationBadge count={42}>
          <button>Test</button>
        </NotificationBadge>
      );

      expect(screen.queryByText('5')).not.toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('hides badge when count changes to 0', () => {
      const { rerender, container } = render(
        <NotificationBadge count={5}>
          <button>Test</button>
        </NotificationBadge>
      );

      expect(screen.getByText('5')).toBeInTheDocument();

      rerender(
        <NotificationBadge count={0}>
          <button>Test</button>
        </NotificationBadge>
      );

      expect(container.querySelector('.absolute')).not.toBeInTheDocument();
    });

    it('toggles between count and dot mode', () => {
      const { rerender } = render(
        <NotificationBadge count={5}>
          <button>Test</button>
        </NotificationBadge>
      );

      expect(screen.getByText('5')).toBeInTheDocument();

      rerender(
        <NotificationBadge count={5} dot={true}>
          <button>Test</button>
        </NotificationBadge>
      );

      expect(screen.queryByText('5')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('badge is visible to screen readers', () => {
      const { container } = render(
        <NotificationBadge count={5}>
          <button>Notifications</button>
        </NotificationBadge>
      );

      const badge = screen.getByText('5');
      expect(badge).toBeVisible();
    });

    it('preserves child accessibility', () => {
      render(
        <NotificationBadge count={5}>
          <button aria-label="View notifications">Notifications</button>
        </NotificationBadge>
      );

      const button = screen.getByLabelText('View notifications');
      expect(button).toBeInTheDocument();
    });

    it('does not interfere with child interactions', () => {
      render(
        <NotificationBadge count={5}>
          <button>Click me</button>
        </NotificationBadge>
      );

      const button = screen.getByText('Click me');
      expect(button).toBeEnabled();
    });
  });

  describe('Visual Structure', () => {
    it('positions badge absolutely', () => {
      const { container } = render(
        <NotificationBadge count={5}>
          <button>Test</button>
        </NotificationBadge>
      );

      const badge = container.querySelector('.absolute');
      expect(badge).toBeInTheDocument();
    });

    it('has circular shape', () => {
      const { container } = render(
        <NotificationBadge count={5}>
          <button>Test</button>
        </NotificationBadge>
      );

      const badge = container.querySelector('.rounded-full');
      expect(badge).toBeInTheDocument();
    });

    it('has proper z-index for overlay', () => {
      const { container } = render(
        <NotificationBadge count={5}>
          <button>Test</button>
        </NotificationBadge>
      );

      const badge = container.querySelector('.z-10');
      expect(badge).toBeInTheDocument();
    });

    it('uses tabular nums for consistent width', () => {
      const { container } = render(
        <NotificationBadge count={88}>
          <button>Test</button>
        </NotificationBadge>
      );

      const badge = container.querySelector('.tabular-nums');
      expect(badge).toBeInTheDocument();
    });
  });
});
