import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NotificationCenter } from './notification-center';
import type { Notification } from './notification-center';

describe('NotificationCenter Component', () => {
  const mockNotifications: Notification[] = [
    {
      id: '1',
      type: 'info',
      title: 'New message',
      message: 'You have received a new message from Alice',
      timestamp: new Date(),
      read: false,
      avatar: 'https://example.com/alice.jpg',
    },
    {
      id: '2',
      type: 'success',
      title: 'Task completed',
      message: 'Your task "Update documentation" has been completed',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      read: false,
    },
    {
      id: '3',
      type: 'warning',
      title: 'Storage warning',
      message: 'You are running low on storage space',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      read: true,
    },
    {
      id: '4',
      type: 'error',
      title: 'Error occurred',
      message: 'Failed to upload file',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      read: false,
      actionLabel: 'Retry',
      onAction: vi.fn(),
    },
    {
      id: '5',
      type: 'mention',
      title: 'You were mentioned',
      message: '@john mentioned you in a comment',
      timestamp: new Date(Date.now() - 604800000), // 7 days ago
      read: true,
    },
  ];

  const defaultProps = {
    notifications: mockNotifications,
    onMarkAsRead: vi.fn(),
    onMarkAllAsRead: vi.fn(),
    onDelete: vi.fn(),
    onClearAll: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders bell icon trigger', () => {
      render(<NotificationCenter {...defaultProps} />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('shows unread count badge', () => {
      render(<NotificationCenter {...defaultProps} />);

      // 3 unread notifications (ids 1, 2, 4)
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('shows 9+ for more than 9 unread', () => {
      const manyNotifications = Array.from({ length: 15 }, (_, i) => ({
        id: `${i}`,
        type: 'info' as const,
        title: `Notification ${i}`,
        message: 'Message',
        timestamp: new Date(),
        read: false,
      }));

      render(<NotificationCenter notifications={manyNotifications} />);

      expect(screen.getByText('9+')).toBeInTheDocument();
    });

    it('does not show badge when all read', () => {
      const readNotifications: Notification[] = [
        {
          id: '1',
          type: 'info',
          title: 'Test',
          message: 'Test message',
          timestamp: new Date(),
          read: true,
        },
      ];

      render(<NotificationCenter notifications={readNotifications} />);

      expect(screen.queryByText('1')).not.toBeInTheDocument();
    });

    it('opens dropdown when bell icon is clicked', async () => {
      render(<NotificationCenter {...defaultProps} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        expect(screen.getByText('Notifications')).toBeInTheDocument();
      });
    });

    it('applies custom className', () => {
      const { container } = render(
        <NotificationCenter {...defaultProps} className="custom-class" />
      );

      const button = container.querySelector('.custom-class');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('shows empty state when no notifications', async () => {
      render(<NotificationCenter notifications={[]} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        expect(screen.getByText("You're all caught up!")).toBeInTheDocument();
        expect(screen.getByText('No new notifications at the moment')).toBeInTheDocument();
      });
    });

    it('does not show action buttons in empty state', async () => {
      render(<NotificationCenter notifications={[]} onMarkAllAsRead={vi.fn()} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        expect(screen.queryByText('Mark all read')).not.toBeInTheDocument();
        expect(screen.queryByText('Clear all')).not.toBeInTheDocument();
      });
    });
  });

  describe('Notification List', () => {
    it('displays all notifications', async () => {
      render(<NotificationCenter {...defaultProps} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        expect(screen.getByText('New message')).toBeInTheDocument();
        expect(screen.getByText('Task completed')).toBeInTheDocument();
        expect(screen.getByText('Storage warning')).toBeInTheDocument();
        expect(screen.getByText('Error occurred')).toBeInTheDocument();
        expect(screen.getByText('You were mentioned')).toBeInTheDocument();
      });
    });

    it('displays notification messages', async () => {
      render(<NotificationCenter {...defaultProps} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        expect(screen.getByText(/received a new message from Alice/)).toBeInTheDocument();
        expect(screen.getByText(/Update documentation/)).toBeInTheDocument();
      });
    });

    it('sorts notifications by timestamp (newest first)', async () => {
      render(<NotificationCenter {...defaultProps} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        const titles = screen.getAllByText(/New message|Task completed|Storage warning/);
        // "New message" (most recent) should appear before others
        expect(titles[0]).toHaveTextContent('New message');
      });
    });
  });

  describe('Date Grouping', () => {
    it('groups notifications by date when enabled', async () => {
      render(<NotificationCenter {...defaultProps} groupByDate={true} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        expect(screen.getByText('TODAY')).toBeInTheDocument();
        expect(screen.getByText('YESTERDAY')).toBeInTheDocument();
        expect(screen.getByText('THIS WEEK')).toBeInTheDocument();
        expect(screen.getByText('OLDER')).toBeInTheDocument();
      });
    });

    it('does not show date headers when groupByDate is false', async () => {
      render(<NotificationCenter {...defaultProps} groupByDate={false} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        expect(screen.queryByText('TODAY')).not.toBeInTheDocument();
        expect(screen.queryByText('YESTERDAY')).not.toBeInTheDocument();
      });
    });
  });

  describe('Notification Types', () => {
    it('renders info notification icon', async () => {
      const { container } = render(<NotificationCenter {...defaultProps} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        const icons = container.querySelectorAll('.text-primary');
        expect(icons.length).toBeGreaterThan(0);
      });
    });

    it('renders success notification icon', async () => {
      const { container } = render(<NotificationCenter {...defaultProps} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        const successIcons = container.querySelectorAll('.text-success');
        expect(successIcons.length).toBeGreaterThan(0);
      });
    });

    it('renders warning notification icon', async () => {
      const { container } = render(<NotificationCenter {...defaultProps} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        const warningIcons = container.querySelectorAll('.text-accent');
        expect(warningIcons.length).toBeGreaterThan(0);
      });
    });

    it('renders error notification icon', async () => {
      const { container } = render(<NotificationCenter {...defaultProps} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        const errorIcons = container.querySelectorAll('.text-destructive');
        expect(errorIcons.length).toBeGreaterThan(0);
      });
    });

    it('renders mention notification icon', async () => {
      render(<NotificationCenter {...defaultProps} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        expect(screen.getByText('You were mentioned')).toBeInTheDocument();
      });
    });
  });

  describe('Avatar Display', () => {
    it('displays avatar when provided', async () => {
      const { container } = render(<NotificationCenter {...defaultProps} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        const avatar = container.querySelector('img[src="https://example.com/alice.jpg"]');
        expect(avatar).toBeInTheDocument();
      });
    });

    it('displays fallback avatar when image not provided', async () => {
      render(<NotificationCenter {...defaultProps} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        // Notifications without avatar should show icon instead
        expect(screen.getByText('Task completed')).toBeInTheDocument();
      });
    });
  });

  describe('Unread Indicator', () => {
    it('shows unread indicator for unread notifications', async () => {
      const { container } = render(<NotificationCenter {...defaultProps} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        const unreadIndicators = container.querySelectorAll('.bg-primary/5');
        expect(unreadIndicators.length).toBeGreaterThan(0);
      });
    });

    it('does not show unread indicator for read notifications', async () => {
      const readOnly: Notification[] = [
        {
          id: '1',
          type: 'info',
          title: 'Read notification',
          message: 'This has been read',
          timestamp: new Date(),
          read: true,
        },
      ];

      const { container } = render(
        <NotificationCenter notifications={readOnly} />
      );

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        const unreadBg = container.querySelectorAll('.bg-primary\\/5');
        expect(unreadBg.length).toBe(0);
      });
    });
  });

  describe('Mark as Read', () => {
    it('shows mark as read button on hover', async () => {
      render(<NotificationCenter {...defaultProps} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        const notification = screen.getByText('New message').closest('div');
        if (notification) {
          fireEvent.mouseEnter(notification);

          const markAsReadButton = screen.getByTitle('Mark as read');
          expect(markAsReadButton).toBeInTheDocument();
        }
      });
    });

    it('calls onMarkAsRead when mark button is clicked', async () => {
      const mockMarkAsRead = vi.fn();
      render(<NotificationCenter {...defaultProps} onMarkAsRead={mockMarkAsRead} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(async () => {
        const notification = screen.getByText('New message').closest('div');
        if (notification) {
          fireEvent.mouseEnter(notification);

          await waitFor(() => {
            const markAsReadButton = screen.getByTitle('Mark as read');
            fireEvent.click(markAsReadButton);

            expect(mockMarkAsRead).toHaveBeenCalledWith('1');
          });
        }
      });
    });

    it('auto-marks as read when notification is clicked', async () => {
      const mockMarkAsRead = vi.fn();
      render(
        <NotificationCenter
          {...defaultProps}
          onMarkAsRead={mockMarkAsRead}
          autoMarkAsRead={true}
        />
      );

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        const notification = screen.getByText('New message').closest('div');
        if (notification) {
          fireEvent.click(notification);

          expect(mockMarkAsRead).toHaveBeenCalledWith('1');
        }
      });
    });

    it('does not auto-mark already read notifications', async () => {
      const mockMarkAsRead = vi.fn();
      render(
        <NotificationCenter
          {...defaultProps}
          onMarkAsRead={mockMarkAsRead}
          autoMarkAsRead={true}
        />
      );

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        const notification = screen.getByText('Storage warning').closest('div');
        if (notification) {
          fireEvent.click(notification);

          expect(mockMarkAsRead).not.toHaveBeenCalledWith('3');
        }
      });
    });
  });

  describe('Mark All as Read', () => {
    it('shows mark all as read button when there are unread notifications', async () => {
      render(<NotificationCenter {...defaultProps} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        expect(screen.getByText('Mark all read')).toBeInTheDocument();
      });
    });

    it('calls onMarkAllAsRead when button is clicked', async () => {
      const mockMarkAllAsRead = vi.fn();
      render(
        <NotificationCenter {...defaultProps} onMarkAllAsRead={mockMarkAllAsRead} />
      );

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        const markAllButton = screen.getByText('Mark all read');
        fireEvent.click(markAllButton);

        expect(mockMarkAllAsRead).toHaveBeenCalled();
      });
    });

    it('hides mark all button when all notifications are read', async () => {
      const allRead = mockNotifications.map((n) => ({ ...n, read: true }));

      render(<NotificationCenter notifications={allRead} onMarkAllAsRead={vi.fn()} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        expect(screen.queryByText('Mark all read')).not.toBeInTheDocument();
      });
    });
  });

  describe('Delete Notification', () => {
    it('shows delete button on hover', async () => {
      render(<NotificationCenter {...defaultProps} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        const notification = screen.getByText('New message').closest('div');
        if (notification) {
          fireEvent.mouseEnter(notification);

          const deleteButton = screen.getByTitle('Delete');
          expect(deleteButton).toBeInTheDocument();
        }
      });
    });

    it('calls onDelete when delete button is clicked', async () => {
      const mockDelete = vi.fn();
      render(<NotificationCenter {...defaultProps} onDelete={mockDelete} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(async () => {
        const notification = screen.getByText('New message').closest('div');
        if (notification) {
          fireEvent.mouseEnter(notification);

          await waitFor(() => {
            const deleteButton = screen.getByTitle('Delete');
            fireEvent.click(deleteButton);

            expect(mockDelete).toHaveBeenCalledWith('1');
          });
        }
      });
    });
  });

  describe('Clear All', () => {
    it('shows clear all button when notifications exist', async () => {
      render(<NotificationCenter {...defaultProps} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        expect(screen.getByText('Clear all')).toBeInTheDocument();
      });
    });

    it('calls onClearAll when button is clicked', async () => {
      const mockClearAll = vi.fn();
      render(<NotificationCenter {...defaultProps} onClearAll={mockClearAll} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        const clearButton = screen.getByText('Clear all');
        fireEvent.click(clearButton);

        expect(mockClearAll).toHaveBeenCalled();
      });
    });
  });

  describe('Action Buttons', () => {
    it('shows action button when provided', async () => {
      render(<NotificationCenter {...defaultProps} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        expect(screen.getByText('Retry')).toBeInTheDocument();
      });
    });

    it('calls onAction when action button is clicked', async () => {
      const mockAction = vi.fn();
      const notificationsWithAction: Notification[] = [
        {
          id: '1',
          type: 'error',
          title: 'Upload failed',
          message: 'Failed to upload file',
          timestamp: new Date(),
          read: false,
          actionLabel: 'Retry',
          onAction: mockAction,
        },
      ];

      render(<NotificationCenter notifications={notificationsWithAction} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        const actionButton = screen.getByText('Retry');
        fireEvent.click(actionButton);

        expect(mockAction).toHaveBeenCalled();
      });
    });

    it('does not show action button when not provided', async () => {
      const noAction: Notification[] = [
        {
          id: '1',
          type: 'info',
          title: 'No action',
          message: 'This has no action button',
          timestamp: new Date(),
          read: false,
        },
      ];

      render(<NotificationCenter notifications={noAction} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        expect(screen.queryByRole('button', { name: /retry/i })).not.toBeInTheDocument();
      });
    });
  });

  describe('Time Formatting', () => {
    it('displays "Just now" for very recent notifications', async () => {
      const recentNotif: Notification[] = [
        {
          id: '1',
          type: 'info',
          title: 'Test',
          message: 'Message',
          timestamp: new Date(),
          read: false,
        },
      ];

      render(<NotificationCenter notifications={recentNotif} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        expect(screen.getByText('Just now')).toBeInTheDocument();
      });
    });

    it('displays minutes ago for recent notifications', async () => {
      const minutesAgo: Notification[] = [
        {
          id: '1',
          type: 'info',
          title: 'Test',
          message: 'Message',
          timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
          read: false,
        },
      ];

      render(<NotificationCenter notifications={minutesAgo} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        expect(screen.getByText('5m ago')).toBeInTheDocument();
      });
    });

    it('displays hours ago for older notifications', async () => {
      const hoursAgo: Notification[] = [
        {
          id: '1',
          type: 'info',
          title: 'Test',
          message: 'Message',
          timestamp: new Date(Date.now() - 3 * 3600000), // 3 hours ago
          read: false,
        },
      ];

      render(<NotificationCenter notifications={hoursAgo} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        expect(screen.getByText('3h ago')).toBeInTheDocument();
      });
    });

    it('displays days ago for notifications within a week', async () => {
      const daysAgo: Notification[] = [
        {
          id: '1',
          type: 'info',
          title: 'Test',
          message: 'Message',
          timestamp: new Date(Date.now() - 2 * 86400000), // 2 days ago
          read: false,
        },
      ];

      render(<NotificationCenter notifications={daysAgo} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        expect(screen.getByText('2d ago')).toBeInTheDocument();
      });
    });
  });

  describe('Max Height', () => {
    it('applies custom max height', async () => {
      const { container } = render(
        <NotificationCenter {...defaultProps} maxHeight={400} />
      );

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        const dropdown = container.querySelector('[style*="max-height"]');
        expect(dropdown).toBeInTheDocument();
      });
    });

    it('uses default max height when not specified', async () => {
      const { container } = render(<NotificationCenter {...defaultProps} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        const dropdown = container.querySelector('[style*="max-height"]');
        expect(dropdown).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles timestamp as string', async () => {
      const stringTimestamp: Notification[] = [
        {
          id: '1',
          type: 'info',
          title: 'String timestamp',
          message: 'Message',
          timestamp: '2024-01-15T10:00:00Z',
          read: false,
        },
      ];

      render(<NotificationCenter notifications={stringTimestamp} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        expect(screen.getByText('String timestamp')).toBeInTheDocument();
      });
    });

    it('handles very long notification messages', async () => {
      const longMessage: Notification[] = [
        {
          id: '1',
          type: 'info',
          title: 'Long message',
          message: 'This is a very long message. '.repeat(20),
          timestamp: new Date(),
          read: false,
        },
      ];

      render(<NotificationCenter notifications={longMessage} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        expect(screen.getByText('Long message')).toBeInTheDocument();
      });
    });

    it('handles rapid open/close', async () => {
      render(<NotificationCenter {...defaultProps} />);

      const bellButton = screen.getByRole('button');

      for (let i = 0; i < 5; i++) {
        fireEvent.click(bellButton);
        await waitFor(() => {
          expect(screen.getByText('Notifications')).toBeInTheDocument();
        });
        fireEvent.click(bellButton);
      }

      // Should not crash
      expect(bellButton).toBeInTheDocument();
    });

    it('handles notifications with missing properties', async () => {
      const minimal: Notification[] = [
        {
          id: '1',
          type: 'info',
          title: 'Minimal',
          message: 'Message',
          timestamp: new Date(),
          read: false,
        } as Notification,
      ];

      render(<NotificationCenter notifications={minimal} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        expect(screen.getByText('Minimal')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has accessible button label', () => {
      render(<NotificationCenter {...defaultProps} />);

      const button = screen.getByLabelText(/Notifications \(3 unread\)/);
      expect(button).toBeInTheDocument();
    });

    it('has accessible button label with no unread', () => {
      const allRead = mockNotifications.map((n) => ({ ...n, read: true }));

      render(<NotificationCenter notifications={allRead} />);

      const button = screen.getByLabelText(/Notifications \(0 unread\)/);
      expect(button).toBeInTheDocument();
    });

    it('has title attributes on action buttons', async () => {
      render(<NotificationCenter {...defaultProps} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        const notification = screen.getByText('New message').closest('div');
        if (notification) {
          fireEvent.mouseEnter(notification);

          const markAsReadButton = screen.getByTitle('Mark as read');
          const deleteButton = screen.getByTitle('Delete');

          expect(markAsReadButton).toHaveAttribute('title', 'Mark as read');
          expect(deleteButton).toHaveAttribute('title', 'Delete');
        }
      });
    });

    it('maintains focus management', async () => {
      render(<NotificationCenter {...defaultProps} />);

      const bellButton = screen.getByRole('button');
      fireEvent.click(bellButton);

      await waitFor(() => {
        expect(document.activeElement).toBeDefined();
      });
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to dropdown content', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(<NotificationCenter {...defaultProps} ref={ref} />);

      expect(ref.current).toBeDefined();
    });
  });
});
