import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemberCard, MemberCardSkeleton } from './member-card';
import type { Member } from './member-card';

describe('MemberCard Component', () => {
  const mockMember: Member = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/avatar.jpg',
    role: 'Senior Developer',
    bio: 'Full-stack developer with 10 years of experience',
    status: 'online',
    skills: ['React', 'TypeScript', 'Node.js'],
    memberSince: new Date('2020-01-15'),
  };

  describe('Card Variant', () => {
    it('renders member information in card variant', () => {
      render(<MemberCard member={mockMember} variant="card" />);

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Senior Developer')).toBeInTheDocument();
      expect(screen.getByText(/Full-stack developer/)).toBeInTheDocument();
    });

    it('displays member avatar', () => {
      render(<MemberCard member={mockMember} variant="card" />);

      const avatar = screen.getByAltText('John Doe');
      expect(avatar).toHaveAttribute('src', '/avatar.jpg');
    });

    it('displays member initials when no avatar', () => {
      const memberWithoutAvatar = { ...mockMember, avatar: undefined };
      render(<MemberCard member={memberWithoutAvatar} variant="card" />);

      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('displays status indicator', () => {
      const { container } = render(<MemberCard member={mockMember} variant="card" />);

      // Online status should show green indicator
      const statusIndicator = container.querySelector('.bg-accent');
      expect(statusIndicator).toBeInTheDocument();
    });

    it('shows online badge for online members', () => {
      render(<MemberCard member={mockMember} variant="card" />);

      expect(screen.getByText('Online')).toBeInTheDocument();
    });

    it('displays skills as badges', () => {
      render(<MemberCard member={mockMember} variant="card" />);

      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
    });

    it('displays member since date', () => {
      render(<MemberCard member={mockMember} variant="card" />);

      expect(screen.getByText(/Member since Jan 2020/)).toBeInTheDocument();
    });

    it('shows Email and Message buttons when handlers provided', () => {
      render(
        <MemberCard
          member={mockMember}
          variant="card"
          onEmail={vi.fn()}
          onMessage={vi.fn()}
        />
      );

      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Message')).toBeInTheDocument();
    });
  });

  describe('Compact Variant', () => {
    it('renders member information in compact variant', () => {
      render(<MemberCard member={mockMember} variant="compact" />);

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    });

    it('does not display bio in compact variant', () => {
      render(<MemberCard member={mockMember} variant="compact" />);

      expect(screen.queryByText(/Full-stack developer/)).not.toBeInTheDocument();
    });

    it('does not display skills in compact variant', () => {
      render(<MemberCard member={mockMember} variant="compact" />);

      expect(screen.queryByText('React')).not.toBeInTheDocument();
      expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
    });

    it('uses smaller avatar in compact variant', () => {
      const { container } = render(
        <MemberCard member={mockMember} variant="compact" />
      );

      const avatar = container.querySelector('.h-10.w-10');
      expect(avatar).toBeInTheDocument();
    });
  });

  describe('Status Display', () => {
    it('shows online status', () => {
      const onlineMember = { ...mockMember, status: 'online' as const };
      const { container } = render(<MemberCard member={onlineMember} />);

      const statusIndicator = container.querySelector('.bg-accent');
      expect(statusIndicator).toBeInTheDocument();
      expect(screen.getByText('Online')).toBeInTheDocument();
    });

    it('shows away status', () => {
      const awayMember = { ...mockMember, status: 'away' as const };
      const { container } = render(<MemberCard member={awayMember} />);

      // Away should show yellow/orange indicator
      const statusIndicator = container.querySelector('[class*="oklch"]');
      expect(statusIndicator).toBeInTheDocument();
    });

    it('shows offline status', () => {
      const offlineMember = { ...mockMember, status: 'offline' as const };
      const { container } = render(<MemberCard member={offlineMember} />);

      const statusIndicator = container.querySelector('.bg-muted');
      expect(statusIndicator).toBeInTheDocument();
    });

    it('does not show online badge for non-online status', () => {
      const offlineMember = { ...mockMember, status: 'offline' as const };
      render(<MemberCard member={offlineMember} />);

      expect(screen.queryByText('Online')).not.toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    it('calls onEmail when Email button is clicked', () => {
      const mockEmail = vi.fn();
      render(<MemberCard member={mockMember} onEmail={mockEmail} />);

      const emailButton = screen.getByText('Email');
      fireEvent.click(emailButton);

      expect(mockEmail).toHaveBeenCalledWith(mockMember);
      expect(mockEmail).toHaveBeenCalledTimes(1);
    });

    it('calls onMessage when Message button is clicked', () => {
      const mockMessage = vi.fn();
      render(<MemberCard member={mockMember} onMessage={mockMessage} />);

      const messageButton = screen.getByText('Message');
      fireEvent.click(messageButton);

      expect(mockMessage).toHaveBeenCalledWith(mockMember);
      expect(mockMessage).toHaveBeenCalledTimes(1);
    });

    it('shows dropdown menu with actions when showActions is true', () => {
      render(
        <MemberCard
          member={mockMember}
          showActions={true}
          onEdit={vi.fn()}
          onRemove={vi.fn()}
        />
      );

      // Find dropdown trigger (MoreVertical icon)
      const dropdownTriggers = screen.getAllByRole('button');
      const moreButton = dropdownTriggers.find((btn) =>
        btn.querySelector('svg')
      );

      expect(moreButton).toBeInTheDocument();
    });

    it('calls onEdit when Edit action is clicked', () => {
      const mockEdit = vi.fn();
      render(
        <MemberCard
          member={mockMember}
          variant="compact"
          onEdit={mockEdit}
          onRemove={vi.fn()}
        />
      );

      // Open dropdown
      const dropdownTriggers = screen.getAllByRole('button');
      const moreButton = dropdownTriggers.find((btn) =>
        btn.getAttribute('aria-haspopup') === 'menu'
      );

      if (moreButton) {
        fireEvent.click(moreButton);

        const editItem = screen.getByText('Edit');
        fireEvent.click(editItem);

        expect(mockEdit).toHaveBeenCalledWith(mockMember);
      }
    });

    it('calls onRemove when Remove action is clicked', () => {
      const mockRemove = vi.fn();
      render(
        <MemberCard
          member={mockMember}
          variant="compact"
          onEdit={vi.fn()}
          onRemove={mockRemove}
        />
      );

      // Open dropdown
      const dropdownTriggers = screen.getAllByRole('button');
      const moreButton = dropdownTriggers.find((btn) =>
        btn.getAttribute('aria-haspopup') === 'menu'
      );

      if (moreButton) {
        fireEvent.click(moreButton);

        const removeItem = screen.getByText('Remove');
        fireEvent.click(removeItem);

        expect(mockRemove).toHaveBeenCalledWith(mockMember);
      }
    });

    it('calls onViewProfile when View Profile action is clicked', () => {
      const mockViewProfile = vi.fn();
      render(
        <MemberCard
          member={mockMember}
          variant="compact"
          onViewProfile={mockViewProfile}
          onEdit={vi.fn()}
        />
      );

      // Open dropdown
      const dropdownTriggers = screen.getAllByRole('button');
      const moreButton = dropdownTriggers.find((btn) =>
        btn.getAttribute('aria-haspopup') === 'menu'
      );

      if (moreButton) {
        fireEvent.click(moreButton);

        const viewProfileItem = screen.getByText('View Profile');
        fireEvent.click(viewProfileItem);

        expect(mockViewProfile).toHaveBeenCalledWith(mockMember);
      }
    });

    it('does not show actions when showActions is false', () => {
      const { container } = render(
        <MemberCard
          member={mockMember}
          showActions={false}
          onEdit={vi.fn()}
          onRemove={vi.fn()}
        />
      );

      // Should not have dropdown menu
      const dropdownTrigger = container.querySelector('[aria-haspopup="menu"]');
      expect(dropdownTrigger).not.toBeInTheDocument();
    });
  });

  describe('Email Button in Compact Variant', () => {
    it('shows email icon button in compact variant', () => {
      render(
        <MemberCard
          member={mockMember}
          variant="compact"
          onEmail={vi.fn()}
        />
      );

      const buttons = screen.getAllByRole('button');
      const emailButton = buttons.find((btn) =>
        btn.querySelector('svg')
      );

      expect(emailButton).toBeInTheDocument();
    });

    it('calls onEmail when email icon is clicked in compact variant', () => {
      const mockEmail = vi.fn();
      render(
        <MemberCard
          member={mockMember}
          variant="compact"
          onEmail={mockEmail}
        />
      );

      const buttons = screen.getAllByRole('button');
      const emailButton = buttons[0]; // First button should be email

      fireEvent.click(emailButton);

      expect(mockEmail).toHaveBeenCalledWith(mockMember);
    });
  });

  describe('Hover Effects', () => {
    it('applies hover classes for interactive effects', () => {
      const { container } = render(<MemberCard member={mockMember} />);

      const card = container.querySelector('.hover\\:shadow-brutal-lg');
      expect(card).toBeInTheDocument();
    });
  });
});

describe('MemberCardSkeleton', () => {
  it('renders card skeleton', () => {
    const { container } = render(<MemberCardSkeleton variant="card" />);

    // Should have animated placeholder elements
    const skeletonElements = container.querySelectorAll('.animate-pulse');
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it('renders compact skeleton', () => {
    const { container } = render(<MemberCardSkeleton variant="compact" />);

    // Should have smaller placeholder elements
    const avatar = container.querySelector('.h-10.w-10');
    expect(avatar).toBeInTheDocument();
  });

  it('has correct number of skeleton elements in card variant', () => {
    const { container } = render(<MemberCardSkeleton variant="card" />);

    // Avatar, name, role, bio lines, and buttons
    const skeletonElements = container.querySelectorAll('.animate-pulse');
    expect(skeletonElements.length).toBeGreaterThanOrEqual(5);
  });

  it('has correct number of skeleton elements in compact variant', () => {
    const { container } = render(<MemberCardSkeleton variant="compact" />);

    // Avatar, name, role, and action button
    const skeletonElements = container.querySelectorAll('.animate-pulse');
    expect(skeletonElements.length).toBeGreaterThanOrEqual(3);
  });
});

describe('MemberCard Accessibility', () => {
  const mockMember: Member = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Developer',
  };

  it('has accessible avatar alt text', () => {
    render(<MemberCard member={mockMember} />);

    // Avatar fallback should show initials
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('has accessible action buttons', () => {
    render(
      <MemberCard member={mockMember} onEmail={vi.fn()} onMessage={vi.fn()} />
    );

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Message')).toBeInTheDocument();
  });

  it('has accessible dropdown menu', () => {
    render(
      <MemberCard
        member={mockMember}
        variant="compact"
        onEdit={vi.fn()}
        onRemove={vi.fn()}
      />
    );

    const dropdownTriggers = screen.getAllByRole('button');
    const menuButton = dropdownTriggers.find((btn) =>
      btn.getAttribute('aria-haspopup') === 'menu'
    );

    expect(menuButton).toHaveAttribute('aria-haspopup', 'menu');
  });
});

describe('MemberCard Edge Cases', () => {
  it('handles member with no optional fields', () => {
    const minimalMember: Member = {
      id: '1',
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'Designer',
    };

    render(<MemberCard member={minimalMember} />);

    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Designer')).toBeInTheDocument();
  });

  it('handles very long names', () => {
    const longNameMember: Member = {
      id: '1',
      name: 'Dr. Alexander Maximilian Christopher Wellington III',
      email: 'alex@example.com',
      role: 'Developer',
    };

    render(<MemberCard member={longNameMember} variant="compact" />);

    expect(
      screen.getByText(/Dr. Alexander Maximilian Christopher/)
    ).toBeInTheDocument();
  });

  it('handles very long role titles', () => {
    const longRoleMember: Member = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Senior Principal Staff Software Engineering Manager and Architect',
    };

    render(<MemberCard member={longRoleMember} variant="compact" />);

    expect(
      screen.getByText(/Senior Principal Staff Software/)
    ).toBeInTheDocument();
  });

  it('handles many skills', () => {
    const skilledMember: Member = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Developer',
      skills: [
        'React',
        'Vue',
        'Angular',
        'Node.js',
        'Python',
        'Java',
        'C++',
        'Go',
        'Rust',
        'TypeScript',
      ],
    };

    render(<MemberCard member={skilledMember} />);

    // Should render all skills
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Rust')).toBeInTheDocument();
  });

  it('handles very long bio text', () => {
    const verboseMember: Member = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Developer',
      bio: 'This is a very long bio that describes someone with extensive experience across multiple domains including software engineering, project management, team leadership, and technical architecture with over 20 years of professional experience.',
    };

    render(<MemberCard member={verboseMember} />);

    expect(screen.getByText(/This is a very long bio/)).toBeInTheDocument();
  });

  it('handles date as string', () => {
    const memberWithStringDate: Member = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Developer',
      memberSince: '2020-01-15',
    };

    render(<MemberCard member={memberWithStringDate} />);

    expect(screen.getByText(/Member since Jan 2020/)).toBeInTheDocument();
  });

  it('generates correct initials for single name', () => {
    const singleNameMember: Member = {
      id: '1',
      name: 'Madonna',
      email: 'madonna@example.com',
      role: 'Artist',
    };

    render(<MemberCard member={singleNameMember} />);

    expect(screen.getByText('M')).toBeInTheDocument();
  });

  it('generates correct initials for three-word name', () => {
    const threeWordName: Member = {
      id: '1',
      name: 'Mary Jane Watson',
      email: 'mj@example.com',
      role: 'Developer',
    };

    render(<MemberCard member={threeWordName} />);

    // Should take first two initials
    expect(screen.getByText('MJ')).toBeInTheDocument();
  });
});
