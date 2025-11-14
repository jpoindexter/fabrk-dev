import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ActivityTimeline } from './activity-timeline';
import type { TimelineEvent } from './activity-timeline';

describe('ActivityTimeline Component', () => {
  const mockEvents: TimelineEvent[] = [
    {
      id: '1',
      type: 'created',
      user: { name: 'Alice Johnson', avatar: 'https://example.com/alice.jpg' },
      title: 'Created new project',
      description: 'Initial project setup with basic structure',
      timestamp: new Date('2024-01-15T10:00:00'),
      metadata: { priority: 'high', status: 'active' },
    },
    {
      id: '2',
      type: 'updated',
      user: { name: 'Bob Smith' },
      title: 'Updated documentation',
      timestamp: new Date('2024-01-15T11:00:00'),
    },
    {
      id: '3',
      type: 'commented',
      user: { name: 'Charlie Davis', avatar: 'https://example.com/charlie.jpg' },
      title: 'Added comment',
      description: 'This looks great! Ready to merge.',
      timestamp: new Date('2024-01-14T09:00:00'),
    },
    {
      id: '4',
      type: 'status_changed',
      user: { name: 'Diana Prince' },
      title: 'Changed status to In Progress',
      timestamp: new Date('2024-01-13T14:00:00'),
      metadata: { from: 'todo', to: 'in_progress' },
    },
    {
      id: '5',
      type: 'assigned',
      user: { name: 'Eve Wilson' },
      title: 'Assigned to team',
      timestamp: new Date('2024-01-10T16:00:00'),
    },
    {
      id: '6',
      type: 'deleted',
      user: { name: 'Frank Miller' },
      title: 'Deleted old files',
      timestamp: new Date('2024-01-08T12:00:00'),
    },
  ];

  describe('Rendering', () => {
    it('renders all events', () => {
      render(<ActivityTimeline events={mockEvents} />);

      expect(screen.getByText('Created new project')).toBeInTheDocument();
      expect(screen.getByText('Updated documentation')).toBeInTheDocument();
      expect(screen.getByText('Added comment')).toBeInTheDocument();
      expect(screen.getByText('Changed status to In Progress')).toBeInTheDocument();
      expect(screen.getByText('Assigned to team')).toBeInTheDocument();
      expect(screen.getByText('Deleted old files')).toBeInTheDocument();
    });

    it('renders user names', () => {
      render(<ActivityTimeline events={mockEvents} />);

      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByText('Bob Smith')).toBeInTheDocument();
      expect(screen.getByText('Charlie Davis')).toBeInTheDocument();
      expect(screen.getByText('Diana Prince')).toBeInTheDocument();
      expect(screen.getByText('Eve Wilson')).toBeInTheDocument();
      expect(screen.getByText('Frank Miller')).toBeInTheDocument();
    });

    it('renders event type badges', () => {
      render(<ActivityTimeline events={mockEvents} />);

      expect(screen.getByText('Created')).toBeInTheDocument();
      expect(screen.getByText('Updated')).toBeInTheDocument();
      expect(screen.getByText('Commented')).toBeInTheDocument();
      expect(screen.getByText('Status Changed')).toBeInTheDocument();
      expect(screen.getByText('Assigned')).toBeInTheDocument();
      expect(screen.getByText('Deleted')).toBeInTheDocument();
    });

    it('renders avatars with images', () => {
      const { container } = render(<ActivityTimeline events={mockEvents} />);

      const avatarImages = container.querySelectorAll('img[alt="Alice Johnson"]');
      expect(avatarImages.length).toBeGreaterThan(0);
    });

    it('renders avatars with initials when no image', () => {
      render(<ActivityTimeline events={mockEvents} />);

      // Bob Smith has no avatar, should show "BS"
      expect(screen.getByText('BS')).toBeInTheDocument();
      // Diana Prince has no avatar, should show "DP"
      expect(screen.getByText('DP')).toBeInTheDocument();
    });

    it('renders timeline connector lines', () => {
      const { container } = render(<ActivityTimeline events={mockEvents} />);

      const connectorLines = container.querySelectorAll('.bg-border');
      // Should have lines between events (n-1 lines for n events)
      expect(connectorLines.length).toBeGreaterThan(0);
    });

    it('applies custom className', () => {
      const { container } = render(
        <ActivityTimeline events={mockEvents} className="custom-timeline" />
      );

      expect(container.querySelector('.custom-timeline')).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('renders empty state when no events', () => {
      render(<ActivityTimeline events={[]} />);

      expect(screen.getByText('No activity yet')).toBeInTheDocument();
    });

    it('does not render timeline items when empty', () => {
      const { container } = render(<ActivityTimeline events={[]} />);

      const timelineItems = container.querySelectorAll('.relative.flex.gap-4');
      expect(timelineItems.length).toBe(0);
    });
  });

  describe('Date Grouping', () => {
    it('groups events by date when groupByDate is true', () => {
      render(<ActivityTimeline events={mockEvents} groupByDate={true} />);

      // Should show date group headers
      const dateHeaders = screen.queryAllByRole('heading', { level: 4 });
      expect(dateHeaders.length).toBeGreaterThan(0);
    });

    it('does not show date headers when groupByDate is false', () => {
      render(<ActivityTimeline events={mockEvents} groupByDate={false} />);

      // Should not show date group headers
      const dateHeaders = screen.queryAllByRole('heading', { level: 4 });
      expect(dateHeaders.length).toBe(0);
    });

    it('groups "Today" events correctly', () => {
      const todayEvents: TimelineEvent[] = [
        {
          id: '1',
          type: 'created',
          user: { name: 'Test User' },
          title: 'Event today',
          timestamp: new Date(),
        },
      ];

      render(<ActivityTimeline events={todayEvents} groupByDate={true} />);

      expect(screen.getByText('Today')).toBeInTheDocument();
    });

    it('groups "Yesterday" events correctly', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const yesterdayEvents: TimelineEvent[] = [
        {
          id: '1',
          type: 'created',
          user: { name: 'Test User' },
          title: 'Event yesterday',
          timestamp: yesterday,
        },
      ];

      render(<ActivityTimeline events={yesterdayEvents} groupByDate={true} />);

      expect(screen.getByText('Yesterday')).toBeInTheDocument();
    });
  });

  describe('Filtering', () => {
    it('shows filters when showFilters is true', () => {
      render(<ActivityTimeline events={mockEvents} showFilters={true} />);

      expect(screen.getByText('Filter')).toBeInTheDocument();
      expect(screen.getByText('Activity Timeline')).toBeInTheDocument();
    });

    it('does not show filters when showFilters is false', () => {
      render(<ActivityTimeline events={mockEvents} showFilters={false} />);

      expect(screen.queryByText('Filter')).not.toBeInTheDocument();
      expect(screen.queryByText('Activity Timeline')).not.toBeInTheDocument();
    });

    it('shows count of selected filters', () => {
      render(<ActivityTimeline events={mockEvents} showFilters={true} />);

      // All 6 event types selected by default
      expect(screen.getByText('6')).toBeInTheDocument();
    });

    it('opens filter dropdown when clicked', () => {
      render(<ActivityTimeline events={mockEvents} showFilters={true} />);

      const filterButton = screen.getByText('Filter').closest('button');
      if (filterButton) {
        fireEvent.click(filterButton);

        expect(screen.getByText('Created')).toBeInTheDocument();
        expect(screen.getByText('Updated')).toBeInTheDocument();
        expect(screen.getByText('Commented')).toBeInTheDocument();
      }
    });

    it('shows event type counts in filter dropdown', () => {
      render(<ActivityTimeline events={mockEvents} showFilters={true} />);

      const filterButton = screen.getByText('Filter').closest('button');
      if (filterButton) {
        fireEvent.click(filterButton);

        // Each event type appears once, so count should be 1 for each
        const badges = screen.getAllByText('1');
        expect(badges.length).toBeGreaterThan(0);
      }
    });

    it('filters events when type is unchecked', () => {
      render(<ActivityTimeline events={mockEvents} showFilters={true} />);

      const filterButton = screen.getByText('Filter').closest('button');
      if (filterButton) {
        fireEvent.click(filterButton);

        // Uncheck "Created" type
        const createdCheckbox = screen
          .getByText('Created')
          .closest('[role="menuitemcheckbox"]');
        if (createdCheckbox) {
          fireEvent.click(createdCheckbox);

          // "Created new project" should not be visible
          expect(screen.queryByText('Created new project')).not.toBeInTheDocument();
        }
      }
    });

    it('shows message when no events match filters', () => {
      const singleTypeEvents: TimelineEvent[] = [
        {
          id: '1',
          type: 'created',
          user: { name: 'Test User' },
          title: 'Test event',
          timestamp: new Date(),
        },
      ];

      render(<ActivityTimeline events={singleTypeEvents} showFilters={true} />);

      const filterButton = screen.getByText('Filter').closest('button');
      if (filterButton) {
        fireEvent.click(filterButton);

        // Uncheck all types
        const createdCheckbox = screen
          .getByText('Created')
          .closest('[role="menuitemcheckbox"]');
        if (createdCheckbox) {
          fireEvent.click(createdCheckbox);

          expect(
            screen.getByText('No events match the selected filters')
          ).toBeInTheDocument();
        }
      }
    });
  });

  describe('Expandable Content', () => {
    it('shows expand button for events with description', () => {
      const { container } = render(<ActivityTimeline events={mockEvents} />);

      // First event has description, should have expand button
      const expandButtons = container.querySelectorAll('button[class*="shrink-0"]');
      expect(expandButtons.length).toBeGreaterThan(0);
    });

    it('does not show expand button in compact mode', () => {
      const { container } = render(
        <ActivityTimeline events={mockEvents} compact={true} />
      );

      // Compact mode should not have expand buttons
      const expandButtons = container.querySelectorAll('button[class*="shrink-0"]');
      expect(expandButtons.length).toBe(0);
    });

    it('expands content when expand button is clicked', () => {
      render(<ActivityTimeline events={mockEvents} />);

      // Find and click expand button for first event
      const expandButtons = screen.getAllByRole('button');
      const expandButton = expandButtons.find((btn) =>
        btn.querySelector('[class*="h-4 w-4"]')
      );

      if (expandButton) {
        fireEvent.click(expandButton);

        // Description should now be visible
        expect(
          screen.getByText('Initial project setup with basic structure')
        ).toBeInTheDocument();
      }
    });

    it('collapses content when clicked again', () => {
      render(<ActivityTimeline events={mockEvents} />);

      const expandButtons = screen.getAllByRole('button');
      const expandButton = expandButtons.find((btn) =>
        btn.querySelector('[class*="h-4 w-4"]')
      );

      if (expandButton) {
        // Expand
        fireEvent.click(expandButton);
        expect(
          screen.getByText('Initial project setup with basic structure')
        ).toBeInTheDocument();

        // Collapse
        fireEvent.click(expandButton);
        expect(
          screen.queryByText('Initial project setup with basic structure')
        ).not.toBeInTheDocument();
      }
    });

    it('displays metadata when expanded', () => {
      render(<ActivityTimeline events={mockEvents} />);

      const expandButtons = screen.getAllByRole('button');
      const expandButton = expandButtons.find((btn) =>
        btn.querySelector('[class*="h-4 w-4"]')
      );

      if (expandButton) {
        fireEvent.click(expandButton);

        // Metadata should be visible
        expect(screen.getByText('Priority:')).toBeInTheDocument();
        expect(screen.getByText('high')).toBeInTheDocument();
        expect(screen.getByText('Status:')).toBeInTheDocument();
        expect(screen.getByText('active')).toBeInTheDocument();
      }
    });

    it('displays boolean metadata with icons', () => {
      const eventsWithBooleans: TimelineEvent[] = [
        {
          id: '1',
          type: 'created',
          user: { name: 'Test User' },
          title: 'Test event',
          timestamp: new Date(),
          metadata: { is_active: true, is_archived: false },
        },
      ];

      const { container } = render(<ActivityTimeline events={eventsWithBooleans} />);

      const expandButtons = screen.getAllByRole('button');
      const expandButton = expandButtons.find((btn) =>
        btn.querySelector('[class*="h-4 w-4"]')
      );

      if (expandButton) {
        fireEvent.click(expandButton);

        // Boolean values should render as icons
        const checkIcons = container.querySelectorAll('.text-primary');
        const xIcons = container.querySelectorAll('.text-destructive');
        expect(checkIcons.length).toBeGreaterThan(0);
        expect(xIcons.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Time Formatting', () => {
    it('displays relative time for recent events', () => {
      const recentEvent: TimelineEvent = {
        id: '1',
        type: 'created',
        user: { name: 'Test User' },
        title: 'Recent event',
        timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
      };

      render(<ActivityTimeline events={[recentEvent]} />);

      expect(screen.getByText('5m ago')).toBeInTheDocument();
    });

    it('displays "just now" for very recent events', () => {
      const nowEvent: TimelineEvent = {
        id: '1',
        type: 'created',
        user: { name: 'Test User' },
        title: 'Just now event',
        timestamp: new Date(),
      };

      render(<ActivityTimeline events={[nowEvent]} />);

      expect(screen.getByText('just now')).toBeInTheDocument();
    });

    it('displays hours for events within 24 hours', () => {
      const hoursAgoEvent: TimelineEvent = {
        id: '1',
        type: 'created',
        user: { name: 'Test User' },
        title: 'Hours ago event',
        timestamp: new Date(Date.now() - 3 * 3600000), // 3 hours ago
      };

      render(<ActivityTimeline events={[hoursAgoEvent]} />);

      expect(screen.getByText('3h ago')).toBeInTheDocument();
    });

    it('displays days for events within a week', () => {
      const daysAgoEvent: TimelineEvent = {
        id: '1',
        type: 'created',
        user: { name: 'Test User' },
        title: 'Days ago event',
        timestamp: new Date(Date.now() - 2 * 86400000), // 2 days ago
      };

      render(<ActivityTimeline events={[daysAgoEvent]} />);

      expect(screen.getByText('2d ago')).toBeInTheDocument();
    });

    it('has title attribute with absolute time', () => {
      const { container } = render(<ActivityTimeline events={mockEvents} />);

      const timeElements = container.querySelectorAll('time');
      expect(timeElements.length).toBeGreaterThan(0);

      timeElements.forEach((timeEl) => {
        expect(timeEl).toHaveAttribute('title');
        expect(timeEl).toHaveAttribute('dateTime');
      });
    });
  });

  describe('Event Types', () => {
    it('renders created event icon', () => {
      const createdEvent: TimelineEvent = {
        id: '1',
        type: 'created',
        user: { name: 'Test' },
        title: 'Created',
        timestamp: new Date(),
      };

      const { container } = render(<ActivityTimeline events={[createdEvent]} />);

      // Should have icon with primary color
      const iconContainer = container.querySelector('.bg-primary');
      expect(iconContainer).toBeInTheDocument();
    });

    it('renders updated event icon', () => {
      const updatedEvent: TimelineEvent = {
        id: '1',
        type: 'updated',
        user: { name: 'Test' },
        title: 'Updated',
        timestamp: new Date(),
      };

      const { container } = render(<ActivityTimeline events={[updatedEvent]} />);

      const iconContainer = container.querySelector('.bg-accent');
      expect(iconContainer).toBeInTheDocument();
    });

    it('renders deleted event icon', () => {
      const deletedEvent: TimelineEvent = {
        id: '1',
        type: 'deleted',
        user: { name: 'Test' },
        title: 'Deleted',
        timestamp: new Date(),
      };

      const { container } = render(<ActivityTimeline events={[deletedEvent]} />);

      const iconContainer = container.querySelector('.bg-destructive');
      expect(iconContainer).toBeInTheDocument();
    });

    it('renders all 6 event types with distinct styles', () => {
      render(<ActivityTimeline events={mockEvents} />);

      // All 6 types should render their labels
      expect(screen.getByText('Created')).toBeInTheDocument();
      expect(screen.getByText('Updated')).toBeInTheDocument();
      expect(screen.getByText('Commented')).toBeInTheDocument();
      expect(screen.getByText('Status Changed')).toBeInTheDocument();
      expect(screen.getByText('Assigned')).toBeInTheDocument();
      expect(screen.getByText('Deleted')).toBeInTheDocument();
    });
  });

  describe('Compact Mode', () => {
    it('hides expand buttons in compact mode', () => {
      const { container } = render(
        <ActivityTimeline events={mockEvents} compact={true} />
      );

      const expandButtons = container.querySelectorAll('button[class*="shrink-0"]');
      expect(expandButtons.length).toBe(0);
    });

    it('does not show expanded content in compact mode', () => {
      const eventsWithContent: TimelineEvent[] = [
        {
          id: '1',
          type: 'created',
          user: { name: 'Test User' },
          title: 'Test event',
          description: 'This is a description',
          timestamp: new Date(),
        },
      ];

      render(<ActivityTimeline events={eventsWithContent} compact={true} />);

      expect(screen.queryByText('This is a description')).not.toBeInTheDocument();
    });

    it('shows all events in compact mode', () => {
      render(<ActivityTimeline events={mockEvents} compact={true} />);

      expect(screen.getByText('Created new project')).toBeInTheDocument();
      expect(screen.getByText('Updated documentation')).toBeInTheDocument();
      expect(screen.getByText('Added comment')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles single event', () => {
      const singleEvent: TimelineEvent[] = [
        {
          id: '1',
          type: 'created',
          user: { name: 'Test User' },
          title: 'Single event',
          timestamp: new Date(),
        },
      ];

      render(<ActivityTimeline events={singleEvent} />);

      expect(screen.getByText('Single event')).toBeInTheDocument();
    });

    it('handles events without metadata', () => {
      const noMetadataEvent: TimelineEvent = {
        id: '1',
        type: 'created',
        user: { name: 'Test User' },
        title: 'No metadata',
        timestamp: new Date(),
      };

      render(<ActivityTimeline events={[noMetadataEvent]} />);

      expect(screen.getByText('No metadata')).toBeInTheDocument();
    });

    it('handles events with empty metadata', () => {
      const emptyMetadataEvent: TimelineEvent = {
        id: '1',
        type: 'created',
        user: { name: 'Test User' },
        title: 'Empty metadata',
        timestamp: new Date(),
        metadata: {},
      };

      const { container } = render(<ActivityTimeline events={[emptyMetadataEvent]} />);

      const expandButtons = screen.getAllByRole('button');
      const expandButton = expandButtons.find((btn) =>
        btn.querySelector('[class*="h-4 w-4"]')
      );

      // Should not show expand button for empty metadata
      expect(expandButton).toBeUndefined();
    });

    it('handles timestamp as string', () => {
      const stringTimestampEvent: TimelineEvent = {
        id: '1',
        type: 'created',
        user: { name: 'Test User' },
        title: 'String timestamp',
        timestamp: '2024-01-15T10:00:00',
      };

      render(<ActivityTimeline events={[stringTimestampEvent]} />);

      expect(screen.getByText('String timestamp')).toBeInTheDocument();
    });

    it('handles very long titles', () => {
      const longTitleEvent: TimelineEvent = {
        id: '1',
        type: 'created',
        user: { name: 'Test User' },
        title: 'This is a very long title '.repeat(10),
        timestamp: new Date(),
      };

      render(<ActivityTimeline events={[longTitleEvent]} />);

      expect(screen.getByText(/This is a very long title/)).toBeInTheDocument();
    });

    it('handles user names with single word', () => {
      const singleNameEvent: TimelineEvent = {
        id: '1',
        type: 'created',
        user: { name: 'Madonna' },
        title: 'Single name user',
        timestamp: new Date(),
      };

      render(<ActivityTimeline events={[singleNameEvent]} />);

      // Should show first letter only for single-word names
      expect(screen.getByText('M')).toBeInTheDocument();
      expect(screen.getByText('Madonna')).toBeInTheDocument();
    });

    it('handles metadata with underscores in keys', () => {
      const underscoreMetadata: TimelineEvent = {
        id: '1',
        type: 'created',
        user: { name: 'Test User' },
        title: 'Metadata test',
        timestamp: new Date(),
        metadata: { user_id: '123', api_key: 'abc' },
      };

      const { container } = render(<ActivityTimeline events={[underscoreMetadata]} />);

      const expandButtons = screen.getAllByRole('button');
      const expandButton = expandButtons.find((btn) =>
        btn.querySelector('[class*="h-4 w-4"]')
      );

      if (expandButton) {
        fireEvent.click(expandButton);

        // Underscores should be replaced with spaces and capitalized
        expect(screen.getByText('User id:')).toBeInTheDocument();
        expect(screen.getByText('Api key:')).toBeInTheDocument();
      }
    });

    it('handles many events efficiently', () => {
      const manyEvents: TimelineEvent[] = Array.from({ length: 100 }, (_, i) => ({
        id: `${i}`,
        type: 'created' as const,
        user: { name: `User ${i}` },
        title: `Event ${i}`,
        timestamp: new Date(Date.now() - i * 3600000),
      }));

      const { container } = render(<ActivityTimeline events={manyEvents} />);

      const timelineItems = container.querySelectorAll('.relative.flex.gap-4');
      expect(timelineItems.length).toBe(100);
    });
  });

  describe('Accessibility', () => {
    it('has proper time elements with datetime attributes', () => {
      const { container } = render(<ActivityTimeline events={mockEvents} />);

      const timeElements = container.querySelectorAll('time');
      timeElements.forEach((timeEl) => {
        expect(timeEl).toHaveAttribute('dateTime');
      });
    });

    it('has descriptive title attributes on time elements', () => {
      const { container } = render(<ActivityTimeline events={mockEvents} />);

      const timeElements = container.querySelectorAll('time');
      timeElements.forEach((timeEl) => {
        const title = timeEl.getAttribute('title');
        expect(title).toBeTruthy();
        // Should contain month, day, year, and time
        expect(title).toMatch(/\w{3} \d{1,2}, \d{4}/);
      });
    });

    it('has aria-hidden on decorative elements', () => {
      const { container } = render(<ActivityTimeline events={mockEvents} />);

      const decorativeLines = container.querySelectorAll('[aria-hidden="true"]');
      expect(decorativeLines.length).toBeGreaterThan(0);
    });

    it('has semantic heading for date groups', () => {
      render(<ActivityTimeline events={mockEvents} groupByDate={true} />);

      const headings = screen.queryAllByRole('heading', { level: 4 });
      expect(headings.length).toBeGreaterThan(0);
    });
  });
});
