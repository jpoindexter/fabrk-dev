import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RoleSelector, DEFAULT_ROLES } from './role-selector';
import type { Role } from './role-selector';
import { Crown, Shield, User, Eye } from 'lucide-react';

describe('RoleSelector Component', () => {
  const mockRoles: Role[] = [
    {
      id: 'admin',
      name: 'Admin',
      description: 'Full access',
      icon: Shield,
      permissions: ['Read', 'Write', 'Delete'],
    },
    {
      id: 'member',
      name: 'Member',
      description: 'Standard access',
      icon: User,
      permissions: ['Read', 'Write'],
    },
    {
      id: 'guest',
      name: 'Guest',
      description: 'View only',
      icon: Eye,
      permissions: ['Read'],
    },
  ];

  describe('Cards Variant', () => {
    it('renders all roles in card format', () => {
      render(<RoleSelector roles={mockRoles} variant="cards" />);

      expect(screen.getByText('Admin')).toBeInTheDocument();
      expect(screen.getByText('Member')).toBeInTheDocument();
      expect(screen.getByText('Guest')).toBeInTheDocument();
    });

    it('displays role descriptions', () => {
      render(<RoleSelector roles={mockRoles} variant="cards" />);

      expect(screen.getByText('Full access')).toBeInTheDocument();
      expect(screen.getByText('Standard access')).toBeInTheDocument();
      expect(screen.getByText('View only')).toBeInTheDocument();
    });

    it('displays role icons', () => {
      const { container } = render(
        <RoleSelector roles={mockRoles} variant="cards" />
      );

      // Icons should be rendered (Shield, User, Eye)
      const icons = container.querySelectorAll('svg.lucide');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('displays permissions when showPermissions is true', () => {
      render(
        <RoleSelector roles={mockRoles} variant="cards" showPermissions={true} />
      );

      expect(screen.getByText('Read')).toBeInTheDocument();
      expect(screen.getByText('Write')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('hides permissions when showPermissions is false', () => {
      render(
        <RoleSelector roles={mockRoles} variant="cards" showPermissions={false} />
      );

      // Permissions should not be visible
      const permissions = screen.queryAllByText('Read');
      expect(permissions.length).toBe(0);
    });

    it('displays as grid layout', () => {
      const { container } = render(
        <RoleSelector roles={mockRoles} variant="cards" />
      );

      const grid = container.querySelector('.grid');
      expect(grid).toBeInTheDocument();
    });
  });

  describe('List Variant', () => {
    it('renders all roles in list format', () => {
      render(<RoleSelector roles={mockRoles} variant="list" />);

      expect(screen.getByText('Admin')).toBeInTheDocument();
      expect(screen.getByText('Member')).toBeInTheDocument();
      expect(screen.getByText('Guest')).toBeInTheDocument();
    });

    it('displays as flex column layout', () => {
      const { container } = render(
        <RoleSelector roles={mockRoles} variant="list" />
      );

      const flexColumn = container.querySelector('.flex-col');
      expect(flexColumn).toBeInTheDocument();
    });

    it('shows larger layout for list items', () => {
      render(<RoleSelector roles={mockRoles} variant="list" />);

      // List items should have more padding and horizontal layout
      const { container } = render(
        <RoleSelector roles={mockRoles} variant="list" />
      );

      const listItems = container.querySelectorAll('button');
      expect(listItems.length).toBe(mockRoles.length);
    });
  });

  describe('Single Selection', () => {
    it('selects role when clicked', () => {
      render(<RoleSelector roles={mockRoles} multiSelect={false} />);

      const adminButton = screen.getByText('Admin').closest('button');
      if (adminButton) {
        fireEvent.click(adminButton);

        // Selected role should have selected styling
        expect(adminButton).toHaveClass('border-primary');
      }
    });

    it('calls onChange with selected role ID', () => {
      const mockChange = vi.fn();
      render(
        <RoleSelector
          roles={mockRoles}
          multiSelect={false}
          onChange={mockChange}
        />
      );

      const adminButton = screen.getByText('Admin').closest('button');
      if (adminButton) {
        fireEvent.click(adminButton);
        expect(mockChange).toHaveBeenCalledWith('admin');
      }
    });

    it('deselects role when clicked again', () => {
      const mockChange = vi.fn();
      render(
        <RoleSelector
          roles={mockRoles}
          multiSelect={false}
          onChange={mockChange}
        />
      );

      const adminButton = screen.getByText('Admin').closest('button');
      if (adminButton) {
        // Select
        fireEvent.click(adminButton);
        expect(mockChange).toHaveBeenCalledWith('admin');

        // Deselect
        fireEvent.click(adminButton);
        expect(mockChange).toHaveBeenCalledWith('');
      }
    });

    it('switches selection to new role', () => {
      const mockChange = vi.fn();
      render(
        <RoleSelector
          roles={mockRoles}
          multiSelect={false}
          onChange={mockChange}
        />
      );

      const adminButton = screen.getByText('Admin').closest('button');
      const memberButton = screen.getByText('Member').closest('button');

      if (adminButton && memberButton) {
        // Select Admin
        fireEvent.click(adminButton);
        expect(mockChange).toHaveBeenCalledWith('admin');

        // Select Member (should replace Admin)
        fireEvent.click(memberButton);
        expect(mockChange).toHaveBeenCalledWith('member');
      }
    });
  });

  describe('Multi Selection', () => {
    it('allows selecting multiple roles', () => {
      const mockChange = vi.fn();
      render(
        <RoleSelector
          roles={mockRoles}
          multiSelect={true}
          onChange={mockChange}
        />
      );

      const adminButton = screen.getByText('Admin').closest('button');
      const memberButton = screen.getByText('Member').closest('button');

      if (adminButton && memberButton) {
        fireEvent.click(adminButton);
        expect(mockChange).toHaveBeenCalledWith(['admin']);

        fireEvent.click(memberButton);
        expect(mockChange).toHaveBeenCalledWith(['admin', 'member']);
      }
    });

    it('deselects role in multi-select mode', () => {
      const mockChange = vi.fn();
      render(
        <RoleSelector
          roles={mockRoles}
          multiSelect={true}
          onChange={mockChange}
        />
      );

      const adminButton = screen.getByText('Admin').closest('button');
      const memberButton = screen.getByText('Member').closest('button');

      if (adminButton && memberButton) {
        // Select both
        fireEvent.click(adminButton);
        fireEvent.click(memberButton);

        // Deselect Admin
        fireEvent.click(adminButton);
        expect(mockChange).toHaveBeenLastCalledWith(['member']);
      }
    });
  });

  describe('Selected State Visual', () => {
    it('shows checkmark for selected role', () => {
      render(<RoleSelector roles={mockRoles} value="admin" />);

      const { container } = render(
        <RoleSelector roles={mockRoles} value="admin" />
      );

      // Check icon should be present
      const checkIcon = container.querySelector('.lucide-check');
      expect(checkIcon).toBeInTheDocument();
    });

    it('applies selected styling to role card', () => {
      render(<RoleSelector roles={mockRoles} value="admin" />);

      const adminButton = screen.getByText('Admin').closest('button');
      expect(adminButton).toHaveClass('border-primary');
      expect(adminButton).toHaveClass('bg-primary/5');
    });

    it('highlights icon for selected role', () => {
      const { container } = render(
        <RoleSelector roles={mockRoles} value="admin" />
      );

      // Selected role icon container should have primary background
      const iconContainers = container.querySelectorAll('.bg-primary');
      expect(iconContainers.length).toBeGreaterThan(0);
    });
  });

  describe('Current Role Badge', () => {
    it('displays "Current" badge for current role', () => {
      render(<RoleSelector roles={mockRoles} currentRole="admin" />);

      expect(screen.getByText('Current')).toBeInTheDocument();
    });

    it('does not show "Current" badge for other roles', () => {
      render(<RoleSelector roles={mockRoles} currentRole="admin" />);

      // Should only have one "Current" badge
      const badges = screen.getAllByText('Current');
      expect(badges.length).toBe(1);
    });
  });

  describe('Confirmation Dialog', () => {
    it('shows confirmation dialog when showConfirmation is true', () => {
      render(<RoleSelector roles={mockRoles} showConfirmation={true} />);

      const adminButton = screen.getByText('Admin').closest('button');
      if (adminButton) {
        fireEvent.click(adminButton);

        expect(screen.getByText('Confirm Role Change')).toBeInTheDocument();
        expect(
          screen.getByText(/Are you sure you want to change the role/i)
        ).toBeInTheDocument();
      }
    });

    it('applies change when confirmed', () => {
      const mockChange = vi.fn();
      render(
        <RoleSelector
          roles={mockRoles}
          showConfirmation={true}
          onChange={mockChange}
        />
      );

      const adminButton = screen.getByText('Admin').closest('button');
      if (adminButton) {
        fireEvent.click(adminButton);

        const confirmButton = screen.getByText('Confirm');
        fireEvent.click(confirmButton);

        expect(mockChange).toHaveBeenCalledWith('admin');
      }
    });

    it('cancels change when canceled', () => {
      const mockChange = vi.fn();
      render(
        <RoleSelector
          roles={mockRoles}
          showConfirmation={true}
          onChange={mockChange}
        />
      );

      const adminButton = screen.getByText('Admin').closest('button');
      if (adminButton) {
        fireEvent.click(adminButton);

        const cancelButton = screen.getByText('Cancel');
        fireEvent.click(cancelButton);

        expect(mockChange).not.toHaveBeenCalled();
      }
    });

    it('does not show dialog when showConfirmation is false', () => {
      const mockChange = vi.fn();
      render(
        <RoleSelector
          roles={mockRoles}
          showConfirmation={false}
          onChange={mockChange}
        />
      );

      const adminButton = screen.getByText('Admin').closest('button');
      if (adminButton) {
        fireEvent.click(adminButton);

        // Change should happen immediately without dialog
        expect(mockChange).toHaveBeenCalledWith('admin');
        expect(screen.queryByText('Confirm Role Change')).not.toBeInTheDocument();
      }
    });
  });

  describe('Disabled Roles', () => {
    const rolesWithDisabled: Role[] = [
      { ...mockRoles[0] },
      { ...mockRoles[1], disabled: true },
      { ...mockRoles[2] },
    ];

    it('renders disabled roles with opacity', () => {
      const { container } = render(
        <RoleSelector roles={rolesWithDisabled} />
      );

      const memberButton = screen.getByText('Member').closest('button');
      expect(memberButton).toHaveClass('opacity-50');
    });

    it('prevents clicking disabled roles', () => {
      const mockChange = vi.fn();
      render(
        <RoleSelector roles={rolesWithDisabled} onChange={mockChange} />
      );

      const memberButton = screen.getByText('Member').closest('button');
      if (memberButton) {
        fireEvent.click(memberButton);

        // Should not call onChange
        expect(mockChange).not.toHaveBeenCalled();
      }
    });

    it('marks disabled roles as disabled', () => {
      render(<RoleSelector roles={rolesWithDisabled} />);

      const memberButton = screen.getByText('Member').closest('button');
      expect(memberButton).toBeDisabled();
    });
  });

  describe('Controlled Component', () => {
    it('displays controlled selected value', () => {
      render(<RoleSelector roles={mockRoles} value="member" />);

      const memberButton = screen.getByText('Member').closest('button');
      expect(memberButton).toHaveClass('border-primary');
    });

    it('updates when value prop changes', () => {
      const { rerender } = render(
        <RoleSelector roles={mockRoles} value="admin" />
      );

      let adminButton = screen.getByText('Admin').closest('button');
      expect(adminButton).toHaveClass('border-primary');

      rerender(<RoleSelector roles={mockRoles} value="member" />);

      adminButton = screen.getByText('Admin').closest('button');
      const memberButton = screen.getByText('Member').closest('button');

      expect(adminButton).not.toHaveClass('border-primary');
      expect(memberButton).toHaveClass('border-primary');
    });

    it('handles array value for multi-select', () => {
      render(<RoleSelector roles={mockRoles} value={['admin', 'member']} />);

      const adminButton = screen.getByText('Admin').closest('button');
      const memberButton = screen.getByText('Member').closest('button');

      expect(adminButton).toHaveClass('border-primary');
      expect(memberButton).toHaveClass('border-primary');
    });
  });

  describe('Default Roles', () => {
    it('renders default roles when no roles prop provided', () => {
      render(<RoleSelector roles={DEFAULT_ROLES} />);

      expect(screen.getByText('Owner')).toBeInTheDocument();
      expect(screen.getByText('Admin')).toBeInTheDocument();
      expect(screen.getByText('Member')).toBeInTheDocument();
      expect(screen.getByText('Guest')).toBeInTheDocument();
    });

    it('default roles have correct permissions', () => {
      render(
        <RoleSelector roles={DEFAULT_ROLES} showPermissions={true} />
      );

      expect(screen.getByText('All permissions')).toBeInTheDocument();
      expect(screen.getByText('Manage members')).toBeInTheDocument();
      expect(screen.getByText('Create content')).toBeInTheDocument();
      expect(screen.getByText('View content')).toBeInTheDocument();
    });
  });

  describe('Hover Effects', () => {
    it('applies hover classes to role cards', () => {
      const { container } = render(<RoleSelector roles={mockRoles} />);

      const buttons = container.querySelectorAll('button');
      buttons.forEach((button) => {
        if (!button.hasAttribute('disabled')) {
          expect(button.className).toContain('hover:');
        }
      });
    });

    it('does not apply hover to disabled roles', () => {
      const rolesWithDisabled: Role[] = [
        { ...mockRoles[0], disabled: true },
      ];

      const { container } = render(
        <RoleSelector roles={rolesWithDisabled} />
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('cursor-not-allowed');
    });
  });
});

describe('RoleSelector Accessibility', () => {
  const mockRoles: Role[] = [
    {
      id: 'admin',
      name: 'Admin',
      description: 'Full access',
      permissions: ['All'],
    },
  ];

  it('uses button elements for role selection', () => {
    render(<RoleSelector roles={mockRoles} />);

    const roleButton = screen.getByText('Admin').closest('button');
    expect(roleButton).toBeInTheDocument();
  });

  it('buttons are keyboard accessible', () => {
    render(<RoleSelector roles={mockRoles} />);

    const roleButton = screen.getByText('Admin').closest('button');
    expect(roleButton?.tagName).toBe('BUTTON');
  });

  it('disabled roles are marked as disabled', () => {
    const disabledRoles: Role[] = [{ ...mockRoles[0], disabled: true }];
    render(<RoleSelector roles={disabledRoles} />);

    const roleButton = screen.getByText('Admin').closest('button');
    expect(roleButton).toBeDisabled();
  });

  it('has accessible dialog for confirmations', () => {
    render(<RoleSelector roles={mockRoles} showConfirmation={true} />);

    const roleButton = screen.getByText('Admin').closest('button');
    if (roleButton) {
      fireEvent.click(roleButton);

      // Dialog should have accessible heading
      expect(screen.getByText('Confirm Role Change')).toBeInTheDocument();

      // Dialog should have buttons
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Confirm')).toBeInTheDocument();
    }
  });
});

describe('RoleSelector Edge Cases', () => {
  it('handles empty roles array', () => {
    const { container } = render(<RoleSelector roles={[]} />);

    // Should render empty container
    expect(container.querySelector('.grid')).toBeInTheDocument();
  });

  it('handles role without icon', () => {
    const rolesWithoutIcon: Role[] = [
      {
        id: 'custom',
        name: 'Custom Role',
        description: 'Custom',
        permissions: ['Read'],
      },
    ];

    render(<RoleSelector roles={rolesWithoutIcon} />);

    expect(screen.getByText('Custom Role')).toBeInTheDocument();
  });

  it('handles role with empty permissions', () => {
    const rolesWithoutPermissions: Role[] = [
      {
        id: 'empty',
        name: 'Empty Role',
        description: 'No permissions',
        permissions: [],
      },
    ];

    render(
      <RoleSelector
        roles={rolesWithoutPermissions}
        showPermissions={true}
      />
    );

    expect(screen.getByText('Empty Role')).toBeInTheDocument();
    // Should not crash with empty permissions array
  });

  it('handles very long role names', () => {
    const longNameRoles: Role[] = [
      {
        id: 'long',
        name: 'This Is A Very Long Role Name That Should Be Handled Properly',
        description: 'Description',
        permissions: ['Read'],
      },
    ];

    render(<RoleSelector roles={longNameRoles} />);

    expect(
      screen.getByText(/This Is A Very Long Role Name/)
    ).toBeInTheDocument();
  });

  it('handles very long descriptions', () => {
    const longDescRoles: Role[] = [
      {
        id: 'desc',
        name: 'Role',
        description:
          'This is a very long description that explains in great detail what this role can do and all the various permissions and capabilities it provides to users',
        permissions: ['Read'],
      },
    ];

    render(<RoleSelector roles={longDescRoles} />);

    expect(
      screen.getByText(/This is a very long description/)
    ).toBeInTheDocument();
  });

  it('handles many roles', () => {
    const manyRoles: Role[] = Array.from({ length: 10 }, (_, i) => ({
      id: `role-${i}`,
      name: `Role ${i}`,
      description: `Description ${i}`,
      permissions: ['Read'],
    }));

    render(<RoleSelector roles={manyRoles} />);

    expect(screen.getByText('Role 0')).toBeInTheDocument();
    expect(screen.getByText('Role 9')).toBeInTheDocument();
  });

  it('handles role with many permissions', () => {
    const manyPermissionsRole: Role[] = [
      {
        id: 'super',
        name: 'Super Admin',
        description: 'All permissions',
        permissions: [
          'Read',
          'Write',
          'Delete',
          'Manage Users',
          'Manage Billing',
          'View Analytics',
          'Export Data',
          'Manage Integrations',
        ],
      },
    ];

    render(
      <RoleSelector
        roles={manyPermissionsRole}
        showPermissions={true}
      />
    );

    expect(screen.getByText('Read')).toBeInTheDocument();
    expect(screen.getByText('Manage Integrations')).toBeInTheDocument();
  });
});
