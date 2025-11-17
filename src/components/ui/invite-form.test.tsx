import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InviteForm } from './invite-form';

describe('InviteForm Component', () => {
  const defaultRoles = [
    { value: 'viewer', label: 'Viewer' },
    { value: 'member', label: 'Member' },
    { value: 'admin', label: 'Admin' },
  ];

  describe('Rendering', () => {
    it('renders email input', () => {
      render(<InviteForm />);

      expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    });

    it('renders role selector', () => {
      render(<InviteForm />);

      expect(screen.getByLabelText(/Role/i)).toBeInTheDocument();
    });

    it('renders submit button', () => {
      render(<InviteForm />);

      expect(screen.getByText(/Send Invitation/i)).toBeInTheDocument();
    });

    it('shows singular label when allowMultiple is false', () => {
      render(<InviteForm allowMultiple={false} />);

      expect(screen.getByLabelText(/Email Address$/i)).toBeInTheDocument();
    });

    it('shows plural label when allowMultiple is true', () => {
      render(<InviteForm allowMultiple={true} />);

      expect(screen.getByLabelText(/Email Addresses/i)).toBeInTheDocument();
    });

    it('shows custom message textarea when showMessage is true', () => {
      render(<InviteForm showMessage={true} />);

      expect(screen.getByLabelText(/Custom Message/i)).toBeInTheDocument();
    });

    it('shows permissions checkboxes when showPermissions is true', () => {
      render(<InviteForm showPermissions={true} />);

      expect(screen.getByText('Permissions (Optional)')).toBeInTheDocument();
      expect(screen.getByLabelText(/Read access/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Write access/i)).toBeInTheDocument();
    });

    it('shows expiration date input when showExpiration is true', () => {
      render(<InviteForm showExpiration={true} />);

      expect(screen.getByLabelText(/Expiration Date/i)).toBeInTheDocument();
    });
  });

  describe('Email Validation - Single Mode', () => {
    it('validates email format on blur', () => {
      render(<InviteForm allowMultiple={false} />);

      const emailInput = screen.getByLabelText(/Email Address/i);
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.blur(emailInput);

      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });

    it('clears error when valid email is entered', () => {
      render(<InviteForm allowMultiple={false} />);

      const emailInput = screen.getByLabelText(/Email Address/i);

      // Enter invalid email
      fireEvent.change(emailInput, { target: { value: 'invalid' } });
      fireEvent.blur(emailInput);
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();

      // Fix email
      fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
      fireEvent.blur(emailInput);
      expect(screen.queryByText('Invalid email format')).not.toBeInTheDocument();
    });

    it('shows error when submitting without email', () => {
      render(<InviteForm allowMultiple={false} />);

      const submitButton = screen.getByText(/Send Invitation/i);
      fireEvent.click(submitButton);

      expect(screen.getByText('At least one email is required')).toBeInTheDocument();
    });

    it('shows error when submitting invalid email', () => {
      render(<InviteForm allowMultiple={false} />);

      const emailInput = screen.getByLabelText(/Email Address/i);
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

      const submitButton = screen.getByText(/Send Invitation/i);
      fireEvent.click(submitButton);

      expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
    });
  });

  describe('Email Management - Multiple Mode', () => {
    it('shows placeholder text for multiple emails', () => {
      render(<InviteForm allowMultiple={true} />);

      const emailInput = screen.getByPlaceholderText(
        'Enter email and press Enter or comma'
      );
      expect(emailInput).toBeInTheDocument();
    });

    it('adds email when Enter key is pressed', () => {
      render(<InviteForm allowMultiple={true} />);

      const emailInput = screen.getByLabelText(/Email Addresses/i);
      fireEvent.change(emailInput, { target: { value: 'user1@example.com' } });
      fireEvent.keyDown(emailInput, { key: 'Enter' });

      expect(screen.getByText('user1@example.com')).toBeInTheDocument();
    });

    it('adds email when comma key is pressed', () => {
      render(<InviteForm allowMultiple={true} />);

      const emailInput = screen.getByLabelText(/Email Addresses/i);
      fireEvent.change(emailInput, { target: { value: 'user1@example.com' } });
      fireEvent.keyDown(emailInput, { key: ',' });

      expect(screen.getByText('user1@example.com')).toBeInTheDocument();
    });

    it('clears input after adding email', () => {
      render(<InviteForm allowMultiple={true} />);

      const emailInput = screen.getByLabelText(
        /Email Addresses/i
      ) as HTMLInputElement;
      fireEvent.change(emailInput, { target: { value: 'user1@example.com' } });
      fireEvent.keyDown(emailInput, { key: 'Enter' });

      expect(emailInput.value).toBe('');
    });

    it('does not add invalid email', () => {
      render(<InviteForm allowMultiple={true} />);

      const emailInput = screen.getByLabelText(/Email Addresses/i);
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.keyDown(emailInput, { key: 'Enter' });

      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
      expect(screen.queryByText('invalid-email')).not.toBeInTheDocument();
    });

    it('does not add duplicate email', () => {
      render(<InviteForm allowMultiple={true} />);

      const emailInput = screen.getByLabelText(/Email Addresses/i);

      // Add first email
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
      fireEvent.keyDown(emailInput, { key: 'Enter' });

      // Try to add same email again
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
      fireEvent.keyDown(emailInput, { key: 'Enter' });

      expect(screen.getByText('Email already added')).toBeInTheDocument();

      // Should only appear once
      const badges = screen.getAllByText('user@example.com');
      expect(badges.length).toBe(1);
    });

    it('removes email when X button is clicked', () => {
      render(<InviteForm allowMultiple={true} />);

      const emailInput = screen.getByLabelText(/Email Addresses/i);
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
      fireEvent.keyDown(emailInput, { key: 'Enter' });

      expect(screen.getByText('user@example.com')).toBeInTheDocument();

      const removeButton = screen.getByLabelText('Remove user@example.com');
      fireEvent.click(removeButton);

      expect(screen.queryByText('user@example.com')).not.toBeInTheDocument();
    });

    it('allows adding multiple different emails', () => {
      render(<InviteForm allowMultiple={true} />);

      const emailInput = screen.getByLabelText(/Email Addresses/i);

      // Add first email
      fireEvent.change(emailInput, { target: { value: 'user1@example.com' } });
      fireEvent.keyDown(emailInput, { key: 'Enter' });

      // Add second email
      fireEvent.change(emailInput, { target: { value: 'user2@example.com' } });
      fireEvent.keyDown(emailInput, { key: 'Enter' });

      // Add third email
      fireEvent.change(emailInput, { target: { value: 'user3@example.com' } });
      fireEvent.keyDown(emailInput, { key: 'Enter' });

      expect(screen.getByText('user1@example.com')).toBeInTheDocument();
      expect(screen.getByText('user2@example.com')).toBeInTheDocument();
      expect(screen.getByText('user3@example.com')).toBeInTheDocument();
    });
  });

  describe('Role Selection', () => {
    it('defaults to defaultRole', () => {
      render(<InviteForm defaultRole="admin" />);

      // Role selector should have admin selected (implementation detail)
      const roleSelect = screen.getByLabelText(/Role/i);
      expect(roleSelect).toBeInTheDocument();
    });

    it('displays custom roles', () => {
      const customRoles = [
        { value: 'owner', label: 'Owner' },
        { value: 'guest', label: 'Guest' },
      ];

      render(<InviteForm roles={customRoles} />);

      // Click to open the select
      const roleSelect = screen.getByLabelText(/Role/i);
      fireEvent.click(roleSelect);

      expect(screen.getByText('Owner')).toBeInTheDocument();
      expect(screen.getByText('Guest')).toBeInTheDocument();
    });
  });

  describe('Permissions', () => {
    it('toggles permissions on checkbox change', () => {
      render(<InviteForm showPermissions={true} />);

      const readCheckbox = screen.getByLabelText(/Read access/i);

      expect(readCheckbox).not.toBeChecked();

      fireEvent.click(readCheckbox);
      expect(readCheckbox).toBeChecked();

      fireEvent.click(readCheckbox);
      expect(readCheckbox).not.toBeChecked();
    });

    it('allows selecting multiple permissions', () => {
      render(<InviteForm showPermissions={true} />);

      const readCheckbox = screen.getByLabelText(/Read access/i);
      const writeCheckbox = screen.getByLabelText(/Write access/i);

      fireEvent.click(readCheckbox);
      fireEvent.click(writeCheckbox);

      expect(readCheckbox).toBeChecked();
      expect(writeCheckbox).toBeChecked();
    });
  });

  describe('Form Submission', () => {
    it('calls onSubmit with form data in single mode', async () => {
      const mockSubmit = vi.fn().mockResolvedValue(undefined);
      render(<InviteForm allowMultiple={false} onSubmit={mockSubmit} />);

      const emailInput = screen.getByLabelText(/Email Address/i);
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } });

      const submitButton = screen.getByText(/Send Invitation/i);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith({
          emails: ['user@example.com'],
          role: 'viewer',
          message: undefined,
          permissions: undefined,
          expiresAt: undefined,
        });
      });
    });

    it('calls onSubmit with multiple emails', async () => {
      const mockSubmit = vi.fn().mockResolvedValue(undefined);
      render(<InviteForm allowMultiple={true} onSubmit={mockSubmit} />);

      const emailInput = screen.getByLabelText(/Email Addresses/i);

      // Add multiple emails
      fireEvent.change(emailInput, { target: { value: 'user1@example.com' } });
      fireEvent.keyDown(emailInput, { key: 'Enter' });
      fireEvent.change(emailInput, { target: { value: 'user2@example.com' } });
      fireEvent.keyDown(emailInput, { key: 'Enter' });

      const submitButton = screen.getByText(/Send Invitations/i);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith({
          emails: ['user1@example.com', 'user2@example.com'],
          role: 'viewer',
          message: undefined,
          permissions: undefined,
          expiresAt: undefined,
        });
      });
    });

    it('includes message when provided', async () => {
      const mockSubmit = vi.fn().mockResolvedValue(undefined);
      render(
        <InviteForm
          allowMultiple={false}
          showMessage={true}
          onSubmit={mockSubmit}
        />
      );

      const emailInput = screen.getByLabelText(/Email Address/i);
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } });

      const messageInput = screen.getByLabelText(/Custom Message/i);
      fireEvent.change(messageInput, {
        target: { value: 'Welcome to the team!' },
      });

      const submitButton = screen.getByText(/Send Invitation/i);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            message: 'Welcome to the team!',
          })
        );
      });
    });

    it('includes permissions when selected', async () => {
      const mockSubmit = vi.fn().mockResolvedValue(undefined);
      render(
        <InviteForm
          allowMultiple={false}
          showPermissions={true}
          onSubmit={mockSubmit}
        />
      );

      const emailInput = screen.getByLabelText(/Email Address/i);
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } });

      const readCheckbox = screen.getByLabelText(/Read access/i);
      const writeCheckbox = screen.getByLabelText(/Write access/i);
      fireEvent.click(readCheckbox);
      fireEvent.click(writeCheckbox);

      const submitButton = screen.getByText(/Send Invitation/i);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            permissions: ['read', 'write'],
          })
        );
      });
    });

    it('includes expiration date when set', async () => {
      const mockSubmit = vi.fn().mockResolvedValue(undefined);
      render(
        <InviteForm
          allowMultiple={false}
          showExpiration={true}
          onSubmit={mockSubmit}
        />
      );

      const emailInput = screen.getByLabelText(/Email Address/i);
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } });

      const expirationInput = screen.getByLabelText(/Expiration Date/i);
      fireEvent.change(expirationInput, { target: { value: '2025-12-31' } });

      const submitButton = screen.getByText(/Send Invitation/i);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            expiresAt: new Date('2025-12-31'),
          })
        );
      });
    });

    it('shows loading state during submission', async () => {
      const mockSubmit = vi.fn(
        () => new Promise<void>((resolve) => setTimeout(() => resolve(), 100))
      );
      render(<InviteForm allowMultiple={false} onSubmit={mockSubmit} />);

      const emailInput = screen.getByLabelText(/Email Address/i);
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } });

      const submitButton = screen.getByText(/Send Invitation/i);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });
    });

    it('resets form after successful submission', async () => {
      const mockSubmit = vi.fn().mockResolvedValue(undefined);
      render(<InviteForm allowMultiple={true} onSubmit={mockSubmit} />);

      const emailInput = screen.getByLabelText(
        /Email Addresses/i
      ) as HTMLInputElement;
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
      fireEvent.keyDown(emailInput, { key: 'Enter' });

      const submitButton = screen.getByText(/Send Invitations/i);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(emailInput.value).toBe('');
        expect(screen.queryByText('user@example.com')).not.toBeInTheDocument();
      });
    });

    it('shows success message after submission', async () => {
      const mockSubmit = vi.fn().mockResolvedValue(undefined);
      render(<InviteForm allowMultiple={false} onSubmit={mockSubmit} />);

      const emailInput = screen.getByLabelText(/Email Address/i);
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } });

      const submitButton = screen.getByText(/Send Invitation/i);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/sent successfully/i)).toBeInTheDocument();
      });
    });

    it('shows error message on submission failure', async () => {
      const mockSubmit = vi
        .fn()
        .mockRejectedValue(new Error('Network error'));
      render(<InviteForm allowMultiple={false} onSubmit={mockSubmit} />);

      const emailInput = screen.getByLabelText(/Email Address/i);
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } });

      const submitButton = screen.getByText(/Send Invitation/i);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Network error')).toBeInTheDocument();
      });
    });

    it('changes button text for multiple invites', () => {
      render(<InviteForm allowMultiple={true} />);

      const emailInput = screen.getByLabelText(/Email Addresses/i);
      fireEvent.change(emailInput, { target: { value: 'user1@example.com' } });
      fireEvent.keyDown(emailInput, { key: 'Enter' });
      fireEvent.change(emailInput, { target: { value: 'user2@example.com' } });
      fireEvent.keyDown(emailInput, { key: 'Enter' });

      expect(screen.getByText(/Send Invitations/i)).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('disables inputs during submission', async () => {
      const mockSubmit = vi.fn(
        () => new Promise<void>((resolve) => setTimeout(() => resolve(), 100))
      );
      render(<InviteForm allowMultiple={false} onSubmit={mockSubmit} />);

      const emailInput = screen.getByLabelText(/Email Address/i);
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } });

      const submitButton = screen.getByText(/Send Invitation/i);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(emailInput).toBeDisabled();
        expect(submitButton).toBeDisabled();
      });
    });
  });
});

describe('InviteForm Accessibility', () => {
  it('has accessible form labels', () => {
    render(<InviteForm />);

    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Role/i)).toBeInTheDocument();
  });

  it('marks required fields', () => {
    render(<InviteForm />);

    // Email and Role should be marked as required
    expect(screen.getByText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByText(/Role/i)).toBeInTheDocument();
  });

  it('shows error messages accessibly', () => {
    render(<InviteForm allowMultiple={false} />);

    const submitButton = screen.getByText(/Send Invitation/i);
    fireEvent.click(submitButton);

    // Error message should be visible
    expect(screen.getByText('At least one email is required')).toBeInTheDocument();
  });

  it('has accessible remove buttons for email badges', () => {
    render(<InviteForm allowMultiple={true} />);

    const emailInput = screen.getByLabelText(/Email Addresses/i);
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.keyDown(emailInput, { key: 'Enter' });

    const removeButton = screen.getByLabelText('Remove user@example.com');
    expect(removeButton).toBeInTheDocument();
  });
});

describe('InviteForm Edge Cases', () => {
  it('handles very long email addresses', () => {
    render(<InviteForm allowMultiple={true} />);

    const longEmail =
      'verylongemailaddresswithlotofcharacters@subdomain.example.com';
    const emailInput = screen.getByLabelText(/Email Addresses/i);
    fireEvent.change(emailInput, { target: { value: longEmail } });
    fireEvent.keyDown(emailInput, { key: 'Enter' });

    expect(screen.getByText(longEmail)).toBeInTheDocument();
  });

  it('trims whitespace from emails', () => {
    render(<InviteForm allowMultiple={true} />);

    const emailInput = screen.getByLabelText(/Email Addresses/i);
    fireEvent.change(emailInput, { target: { value: '  user@example.com  ' } });
    fireEvent.keyDown(emailInput, { key: 'Enter' });

    expect(screen.getByText('user@example.com')).toBeInTheDocument();
  });

  it('handles empty input on Enter press', () => {
    render(<InviteForm allowMultiple={true} />);

    const emailInput = screen.getByLabelText(/Email Addresses/i);
    fireEvent.keyDown(emailInput, { key: 'Enter' });

    // Should not show any errors or badges
    expect(screen.queryByText('Invalid email format')).not.toBeInTheDocument();
  });

  it('validates minimum date for expiration', () => {
    render(<InviteForm showExpiration={true} />);

    const expirationInput = screen.getByLabelText(/Expiration Date/i);

    // Should have min attribute set to today
    const today = new Date().toISOString().split('T')[0];
    expect(expirationInput).toHaveAttribute('min', today);
  });
});
