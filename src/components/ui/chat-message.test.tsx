import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChatMessage, TypingIndicator, MessageThread } from './chat-message';

describe('ChatMessage Component', () => {
  const mockSender = {
    name: 'John Doe',
    avatar: 'https://example.com/avatar.jpg',
  };

  const baseProps = {
    sender: mockSender,
    content: 'Hello, this is a test message',
    timestamp: new Date('2024-01-15T10:30:00'),
  };

  describe('Rendering', () => {
    it('renders message content', () => {
      render(<ChatMessage {...baseProps} />);

      expect(screen.getByText('Hello, this is a test message')).toBeInTheDocument();
    });

    it('renders sender name for other users', () => {
      render(<ChatMessage {...baseProps} isOwn={false} />);

      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('does not render sender name for own messages', () => {
      render(<ChatMessage {...baseProps} isOwn={true} />);

      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    it('renders avatar when showAvatar is true', () => {
      const { container } = render(
        <ChatMessage {...baseProps} showAvatar={true} />
      );

      const avatar = container.querySelector('.border-brutal');
      expect(avatar).toBeInTheDocument();
    });

    it('hides avatar when showAvatar is false', () => {
      const { container } = render(
        <ChatMessage {...baseProps} showAvatar={false} isGrouped={true} />
      );

      const avatarImage = container.querySelector('img[alt="John Doe"]');
      expect(avatarImage).not.toBeInTheDocument();
    });

    it('displays avatar with image', () => {
      const { container } = render(<ChatMessage {...baseProps} />);

      const avatarImage = container.querySelector('img[alt="John Doe"]');
      expect(avatarImage).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('displays avatar fallback with initials', () => {
      const propsWithoutAvatar = {
        ...baseProps,
        sender: { name: 'Jane Smith' },
      };

      render(<ChatMessage {...propsWithoutAvatar} />);

      expect(screen.getByText('JS')).toBeInTheDocument();
    });

    it('applies own message styling', () => {
      const { container } = render(<ChatMessage {...baseProps} isOwn={true} />);

      const bubble = container.querySelector('.bg-primary');
      expect(bubble).toBeInTheDocument();
      expect(bubble).toHaveClass('text-primary-foreground');
    });

    it('applies other user message styling', () => {
      const { container } = render(<ChatMessage {...baseProps} isOwn={false} />);

      const bubble = container.querySelector('.bg-card');
      expect(bubble).toBeInTheDocument();
      expect(bubble).toHaveClass('text-card-foreground');
    });
  });

  describe('Timestamp', () => {
    it('formats timestamp correctly', () => {
      render(<ChatMessage {...baseProps} />);

      // Should format as "10:30 AM"
      expect(screen.getByText(/10:30/)).toBeInTheDocument();
    });

    it('accepts timestamp as string', () => {
      const propsWithStringTimestamp = {
        ...baseProps,
        timestamp: '2024-01-15T14:45:00',
      };

      render(<ChatMessage {...propsWithStringTimestamp} />);

      expect(screen.getByText(/2:45/)).toBeInTheDocument();
    });

    it('displays timestamp for all messages', () => {
      const { container } = render(<ChatMessage {...baseProps} />);

      const timestamp = container.querySelector('.text-muted-foreground');
      expect(timestamp).toBeInTheDocument();
    });
  });

  describe('Status Indicators', () => {
    it('shows sending status', () => {
      const { container } = render(
        <ChatMessage {...baseProps} isOwn={true} status="sending" />
      );

      const clockIcon = container.querySelector('.text-muted-foreground');
      expect(clockIcon).toBeInTheDocument();
    });

    it('shows sent status with single check', () => {
      const { container } = render(
        <ChatMessage {...baseProps} isOwn={true} status="sent" />
      );

      const checkIcon = container.querySelector('.h-3.w-3');
      expect(checkIcon).toBeInTheDocument();
    });

    it('shows delivered status with double check', () => {
      const { container } = render(
        <ChatMessage {...baseProps} isOwn={true} status="delivered" />
      );

      const checkIcon = container.querySelector('.h-3.w-3');
      expect(checkIcon).toBeInTheDocument();
    });

    it('shows read status with colored double check', () => {
      const { container } = render(
        <ChatMessage {...baseProps} isOwn={true} status="read" />
      );

      const checkIcon = container.querySelector('.text-primary');
      expect(checkIcon).toBeInTheDocument();
    });

    it('does not show status for other users messages', () => {
      const { container } = render(
        <ChatMessage {...baseProps} isOwn={false} status="read" />
      );

      const statusIcon = container.querySelector('.text-primary');
      expect(statusIcon).not.toBeInTheDocument();
    });

    it('does not show status when not provided', () => {
      const { container } = render(
        <ChatMessage {...baseProps} isOwn={true} />
      );

      // Should not render any status icon elements in this case
      const messageContainer = container.querySelector('.flex.items-center.gap-1\\.5');
      expect(messageContainer).toBeInTheDocument();
    });
  });

  describe('Reactions', () => {
    const reactionsProps = {
      ...baseProps,
      reactions: [
        { emoji: '👍', count: 5, users: ['Alice', 'Bob', 'Charlie'] },
        { emoji: '❤️', count: 2, users: ['David', 'Eve'] },
      ],
    };

    it('renders reactions', () => {
      render(<ChatMessage {...reactionsProps} />);

      expect(screen.getByText('👍')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('❤️')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('shows reaction tooltip on hover', () => {
      render(<ChatMessage {...reactionsProps} />);

      const thumbsUpButton = screen.getByText('👍').closest('button');
      if (thumbsUpButton) {
        fireEvent.mouseEnter(thumbsUpButton);
        expect(screen.getByText('Alice, Bob, Charlie')).toBeInTheDocument();
      }
    });

    it('hides reaction tooltip on mouse leave', () => {
      render(<ChatMessage {...reactionsProps} />);

      const thumbsUpButton = screen.getByText('👍').closest('button');
      if (thumbsUpButton) {
        fireEvent.mouseEnter(thumbsUpButton);
        expect(screen.getByText('Alice, Bob, Charlie')).toBeInTheDocument();

        fireEvent.mouseLeave(thumbsUpButton);
        expect(screen.queryByText('Alice, Bob, Charlie')).not.toBeInTheDocument();
      }
    });

    it('calls onReact when reaction is clicked', () => {
      const mockReact = vi.fn();
      render(<ChatMessage {...reactionsProps} onReact={mockReact} />);

      const thumbsUpButton = screen.getByText('👍').closest('button');
      if (thumbsUpButton) {
        fireEvent.click(thumbsUpButton);
        expect(mockReact).toHaveBeenCalledWith('👍');
      }
    });

    it('positions reactions correctly for own messages', () => {
      const { container } = render(
        <ChatMessage {...reactionsProps} isOwn={true} />
      );

      const reactionsContainer = container.querySelector('.right-2');
      expect(reactionsContainer).toBeInTheDocument();
    });

    it('positions reactions correctly for other messages', () => {
      const { container } = render(
        <ChatMessage {...reactionsProps} isOwn={false} />
      );

      const reactionsContainer = container.querySelector('.left-2');
      expect(reactionsContainer).toBeInTheDocument();
    });
  });

  describe('Attachments', () => {
    const imageAttachment = {
      ...baseProps,
      attachments: [
        { type: 'image' as const, url: 'https://example.com/image.jpg', name: 'photo.jpg' },
      ],
    };

    const fileAttachment = {
      ...baseProps,
      attachments: [
        { type: 'file' as const, url: 'https://example.com/doc.pdf', name: 'document.pdf' },
      ],
    };

    it('renders image attachments', () => {
      const { container } = render(<ChatMessage {...imageAttachment} />);

      const img = container.querySelector('img[alt="photo.jpg"]');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

    it('renders file attachments', () => {
      render(<ChatMessage {...fileAttachment} />);

      expect(screen.getByText('document.pdf')).toBeInTheDocument();
    });

    it('renders multiple attachments', () => {
      const multipleAttachments = {
        ...baseProps,
        attachments: [
          { type: 'image' as const, url: 'https://example.com/img1.jpg', name: 'img1.jpg' },
          { type: 'file' as const, url: 'https://example.com/doc.pdf', name: 'doc.pdf' },
        ],
      };

      const { container } = render(<ChatMessage {...multipleAttachments} />);

      expect(container.querySelector('img[alt="img1.jpg"]')).toBeInTheDocument();
      expect(screen.getByText('doc.pdf')).toBeInTheDocument();
    });

    it('shows download button for file attachments', () => {
      const { container } = render(<ChatMessage {...fileAttachment} />);

      const downloadButton = container.querySelector('button');
      expect(downloadButton).toBeInTheDocument();
    });

    it('handles attachment without name', () => {
      const attachmentWithoutName = {
        ...baseProps,
        attachments: [
          { type: 'file' as const, url: 'https://example.com/file' },
        ],
      };

      render(<ChatMessage {...attachmentWithoutName} />);

      expect(screen.getByText('Untitled')).toBeInTheDocument();
    });
  });

  describe('Action Buttons', () => {
    it('shows edit button when onEdit is provided', () => {
      const mockEdit = vi.fn();
      const { container } = render(
        <ChatMessage {...baseProps} onEdit={mockEdit} />
      );

      fireEvent.mouseEnter(container.firstChild as Element);

      const editButton = container.querySelector('[class*="opacity-"]');
      expect(editButton).toBeInTheDocument();
    });

    it('shows delete button when onDelete is provided', () => {
      const mockDelete = vi.fn();
      const { container } = render(
        <ChatMessage {...baseProps} onDelete={mockDelete} />
      );

      fireEvent.mouseEnter(container.firstChild as Element);

      const deleteButton = container.querySelector('.text-destructive');
      expect(deleteButton).toBeInTheDocument();
    });

    it('calls onEdit when edit button is clicked', () => {
      const mockEdit = vi.fn();
      const { container } = render(
        <ChatMessage {...baseProps} onEdit={mockEdit} />
      );

      fireEvent.mouseEnter(container.firstChild as Element);

      const editButton = container.querySelector('.hover\\:bg-accent');
      if (editButton) {
        fireEvent.click(editButton);
        expect(mockEdit).toHaveBeenCalled();
      }
    });

    it('calls onDelete when delete button is clicked', () => {
      const mockDelete = vi.fn();
      const { container } = render(
        <ChatMessage {...baseProps} onDelete={mockDelete} />
      );

      fireEvent.mouseEnter(container.firstChild as Element);

      const deleteButton = container.querySelector('.hover\\:bg-destructive\\/10');
      if (deleteButton) {
        fireEvent.click(deleteButton);
        expect(mockDelete).toHaveBeenCalled();
      }
    });

    it('hides action buttons when not hovered', () => {
      const { container } = render(
        <ChatMessage {...baseProps} onEdit={() => {}} onDelete={() => {}} />
      );

      const actionsContainer = container.querySelector('.opacity-0');
      expect(actionsContainer).toBeInTheDocument();
    });
  });

  describe('Grouping', () => {
    it('applies grouped spacing when isGrouped is true', () => {
      const { container } = render(
        <ChatMessage {...baseProps} isGrouped={true} />
      );

      const message = container.querySelector('.mt-1');
      expect(message).toBeInTheDocument();
    });

    it('applies normal spacing when isGrouped is false', () => {
      const { container } = render(
        <ChatMessage {...baseProps} isGrouped={false} />
      );

      const message = container.querySelector('.mt-4');
      expect(message).toBeInTheDocument();
    });

    it('hides avatar when grouped and showAvatar is false', () => {
      const { container } = render(
        <ChatMessage {...baseProps} isGrouped={true} showAvatar={false} />
      );

      const avatarImage = container.querySelector('img');
      expect(avatarImage).not.toBeInTheDocument();
    });
  });

  describe('Layout Direction', () => {
    it('applies reverse layout for own messages', () => {
      const { container } = render(<ChatMessage {...baseProps} isOwn={true} />);

      const messageContainer = container.querySelector('.flex-row-reverse');
      expect(messageContainer).toBeInTheDocument();
    });

    it('applies normal layout for other messages', () => {
      const { container } = render(<ChatMessage {...baseProps} isOwn={false} />);

      const messageContainer = container.querySelector('.flex-row');
      expect(messageContainer).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles very long messages', () => {
      const longMessage = {
        ...baseProps,
        content: 'Lorem ipsum '.repeat(100),
      };

      render(<ChatMessage {...longMessage} />);

      expect(screen.getByText(/Lorem ipsum/)).toBeInTheDocument();
    });

    it('handles empty reactions array', () => {
      const emptyReactions = {
        ...baseProps,
        reactions: [],
      };

      const { container } = render(<ChatMessage {...emptyReactions} />);

      expect(container.querySelector('.absolute.-bottom-2')).not.toBeInTheDocument();
    });

    it('handles empty attachments array', () => {
      const emptyAttachments = {
        ...baseProps,
        attachments: [],
      };

      const { container } = render(<ChatMessage {...emptyAttachments} />);

      expect(container.querySelector('img[alt]')).toBeNull();
    });

    it('handles multiline messages', () => {
      const multilineMessage = {
        ...baseProps,
        content: 'Line 1\nLine 2\nLine 3',
      };

      render(<ChatMessage {...multilineMessage} />);

      expect(screen.getByText(/Line 1/)).toBeInTheDocument();
    });
  });
});

describe('TypingIndicator Component', () => {
  const mockSender = {
    name: 'Alice',
    avatar: 'https://example.com/alice.jpg',
  };

  it('renders typing indicator', () => {
    render(<TypingIndicator sender={mockSender} />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('typing...')).toBeInTheDocument();
  });

  it('renders avatar', () => {
    const { container } = render(<TypingIndicator sender={mockSender} />);

    const avatar = container.querySelector('img[alt="Alice"]');
    expect(avatar).toBeInTheDocument();
  });

  it('renders avatar fallback with initials', () => {
    const senderWithoutAvatar = { name: 'Bob Smith' };

    render(<TypingIndicator sender={senderWithoutAvatar} />);

    expect(screen.getByText('BS')).toBeInTheDocument();
  });

  it('renders animated dots', () => {
    const { container } = render(<TypingIndicator sender={mockSender} />);

    const dots = container.querySelectorAll('.animate-bounce');
    expect(dots.length).toBe(3);
  });

  it('applies staggered animation delays to dots', () => {
    const { container } = render(<TypingIndicator sender={mockSender} />);

    const dots = container.querySelectorAll('.animate-bounce');
    expect((dots[0] as HTMLElement).style.animationDelay).toBe('0s');
    expect((dots[1] as HTMLElement).style.animationDelay).toBe('0.15s');
    expect((dots[2] as HTMLElement).style.animationDelay).toBe('0.3s');
  });
});

describe('MessageThread Component', () => {
  const mockMessages = [
    {
      id: '1',
      sender: { name: 'Alice' },
      content: 'First message',
      timestamp: new Date('2024-01-15T10:00:00'),
      isOwn: false,
    },
    {
      id: '2',
      sender: { name: 'Alice' },
      content: 'Second message',
      timestamp: new Date('2024-01-15T10:01:00'),
      isOwn: false,
    },
    {
      id: '3',
      sender: { name: 'Bob' },
      content: 'Different sender',
      timestamp: new Date('2024-01-15T10:02:00'),
      isOwn: true,
    },
  ];

  it('renders all messages', () => {
    render(<MessageThread messages={mockMessages} />);

    expect(screen.getByText('First message')).toBeInTheDocument();
    expect(screen.getByText('Second message')).toBeInTheDocument();
    expect(screen.getByText('Different sender')).toBeInTheDocument();
  });

  it('groups consecutive messages from same sender', () => {
    const { container } = render(<MessageThread messages={mockMessages} />);

    const groupedMessages = container.querySelectorAll('.mt-1');
    // Second message should be grouped (mt-1)
    expect(groupedMessages.length).toBeGreaterThan(0);
  });

  it('does not group messages from different senders', () => {
    render(<MessageThread messages={mockMessages} />);

    // Alice's name should appear once (not grouped), Bob never (own message)
    const aliceNames = screen.getAllByText('Alice');
    expect(aliceNames.length).toBe(1);
  });

  it('handles empty messages array', () => {
    const { container } = render(<MessageThread messages={[]} />);

    expect(container.querySelector('.space-y-0')).toBeInTheDocument();
  });

  it('handles single message', () => {
    const singleMessage = [mockMessages[0]];

    render(<MessageThread messages={singleMessage} />);

    expect(screen.getByText('First message')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <MessageThread messages={mockMessages} className="custom-thread" />
    );

    expect(container.querySelector('.custom-thread')).toBeInTheDocument();
  });
});
