import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChatInput } from './chat-input';

describe('ChatInput Component', () => {
  const defaultProps = {
    value: '',
    onChange: vi.fn(),
    onSend: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders textarea', () => {
      const { container } = render(<ChatInput {...defaultProps} />);

      const textarea = container.querySelector('textarea');
      expect(textarea).toBeInTheDocument();
    });

    it('renders send button', () => {
      const { container } = render(<ChatInput {...defaultProps} />);

      const sendButton = container.querySelector('[class*="shrink-0"]');
      expect(sendButton).toBeInTheDocument();
    });

    it('renders attachment button', () => {
      render(<ChatInput {...defaultProps} />);

      expect(screen.getByLabelText('Attach file')).toBeInTheDocument();
    });

    it('renders emoji button', () => {
      render(<ChatInput {...defaultProps} />);

      expect(screen.getByLabelText('Add emoji')).toBeInTheDocument();
    });

    it('displays placeholder', () => {
      render(<ChatInput {...defaultProps} placeholder="Type something..." />);

      expect(screen.getByPlaceholderText('Type something...')).toBeInTheDocument();
    });

    it('uses default placeholder', () => {
      render(<ChatInput {...defaultProps} />);

      expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <ChatInput {...defaultProps} className="custom-input" />
      );

      expect(container.querySelector('.custom-input')).toBeInTheDocument();
    });
  });

  describe('Keyboard Shortcuts', () => {
    it('displays keyboard shortcut hint', () => {
      render(<ChatInput {...defaultProps} />);

      expect(
        screen.getByText('Press Enter to send, Shift+Enter for new line')
      ).toBeInTheDocument();
    });

    it('sends message when Enter key is pressed', () => {
      const mockSend = vi.fn();
      const { container } = render(
        <ChatInput {...defaultProps} value="Test message" onSend={mockSend} />
      );

      const textarea = container.querySelector('textarea');
      if (textarea) {
        fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });
        expect(mockSend).toHaveBeenCalledWith('Test message');
      }
    });

    it('does not send message when Shift+Enter is pressed', () => {
      const mockSend = vi.fn();
      const { container } = render(
        <ChatInput {...defaultProps} value="Test message" onSend={mockSend} />
      );

      const textarea = container.querySelector('textarea');
      if (textarea) {
        fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });
        expect(mockSend).not.toHaveBeenCalled();
      }
    });

    it('allows new line with Shift+Enter', () => {
      const mockChange = vi.fn();
      const { container } = render(
        <ChatInput {...defaultProps} onChange={mockChange} />
      );

      const textarea = container.querySelector('textarea');
      if (textarea) {
        fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });
        // Should not prevent default, allowing new line
        expect(mockChange).not.toHaveBeenCalled();
      }
    });
  });

  describe('Value and onChange', () => {
    it('displays current value', () => {
      const { container } = render(
        <ChatInput {...defaultProps} value="Current text" />
      );

      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveValue('Current text');
    });

    it('calls onChange when text is entered', () => {
      const mockChange = vi.fn();
      const { container } = render(
        <ChatInput {...defaultProps} onChange={mockChange} />
      );

      const textarea = container.querySelector('textarea');
      if (textarea) {
        fireEvent.change(textarea, { target: { value: 'New text' } });
        expect(mockChange).toHaveBeenCalledWith('New text');
      }
    });

    it('respects maxLength', () => {
      const { container } = render(
        <ChatInput {...defaultProps} maxLength={10} />
      );

      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveAttribute('maxLength', '10');
    });

    it('uses default maxLength of 1000', () => {
      const { container } = render(<ChatInput {...defaultProps} />);

      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveAttribute('maxLength', '1000');
    });
  });

  describe('Send Functionality', () => {
    it('calls onSend when send button is clicked', () => {
      const mockSend = vi.fn();
      const { container } = render(
        <ChatInput {...defaultProps} value="Test message" onSend={mockSend} />
      );

      const sendButton = screen.getByLabelText('Send message');
      fireEvent.click(sendButton);

      expect(mockSend).toHaveBeenCalledWith('Test message');
    });

    it('does not send empty message', () => {
      const mockSend = vi.fn();
      const { container } = render(
        <ChatInput {...defaultProps} value="" onSend={mockSend} />
      );

      const sendButton = screen.getByLabelText('Send message');
      fireEvent.click(sendButton);

      expect(mockSend).not.toHaveBeenCalled();
    });

    it('does not send whitespace-only message', () => {
      const mockSend = vi.fn();
      const { container } = render(
        <ChatInput {...defaultProps} value="   " onSend={mockSend} />
      );

      const sendButton = screen.getByLabelText('Send message');
      fireEvent.click(sendButton);

      expect(mockSend).not.toHaveBeenCalled();
    });

    it('disables send button when value is empty', () => {
      const { container } = render(<ChatInput {...defaultProps} value="" />);

      const sendButton = screen.getByLabelText('Send message');
      expect(sendButton).toBeDisabled();
    });

    it('enables send button when value is not empty', () => {
      const { container } = render(
        <ChatInput {...defaultProps} value="Message" />
      );

      const sendButton = screen.getByLabelText('Send message');
      expect(sendButton).not.toBeDisabled();
    });

    it('disables send when disabled prop is true', () => {
      const { container } = render(
        <ChatInput {...defaultProps} value="Message" disabled={true} />
      );

      const sendButton = screen.getByLabelText('Send message');
      expect(sendButton).toBeDisabled();
    });

    it('disables send when loading is true', () => {
      const { container } = render(
        <ChatInput {...defaultProps} value="Message" loading={true} />
      );

      const sendButton = screen.getByLabelText('Send message');
      expect(sendButton).toBeDisabled();
    });

    it('shows loading spinner when loading', () => {
      const { container } = render(
        <ChatInput {...defaultProps} value="Message" loading={true} />
      );

      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('File Attachments', () => {
    it('opens file picker when attachment button is clicked', () => {
      const { container } = render(<ChatInput {...defaultProps} />);

      const attachButton = screen.getByLabelText('Attach file');
      const fileInput = container.querySelector('input[type="file"]');

      const clickSpy = vi.spyOn(fileInput as HTMLInputElement, 'click');
      fireEvent.click(attachButton);

      expect(clickSpy).toHaveBeenCalled();
    });

    it('calls onFileAttach when files are selected', () => {
      const mockFileAttach = vi.fn();
      const { container } = render(
        <ChatInput {...defaultProps} onFileAttach={mockFileAttach} />
      );

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });

      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: false,
      });

      fireEvent.change(fileInput);

      expect(mockFileAttach).toHaveBeenCalledWith([file]);
    });

    it('displays attached files', () => {
      const { container, rerender } = render(<ChatInput {...defaultProps} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['content'], 'document.pdf', { type: 'application/pdf' });

      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: false,
      });

      fireEvent.change(fileInput);
      rerender(<ChatInput {...defaultProps} />);

      // File badge should be displayed
      expect(screen.getByText('document.pdf')).toBeInTheDocument();
    });

    it('removes attached file when X button is clicked', () => {
      const { container } = render(<ChatInput {...defaultProps} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });

      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: false,
      });

      fireEvent.change(fileInput);

      expect(screen.getByText('test.pdf')).toBeInTheDocument();

      const removeButton = container.querySelector('.hover\\:bg-destructive');
      if (removeButton) {
        fireEvent.click(removeButton);
        expect(screen.queryByText('test.pdf')).not.toBeInTheDocument();
      }
    });

    it('shows file icon for file attachments', () => {
      const { container } = render(<ChatInput {...defaultProps} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['content'], 'doc.pdf', { type: 'application/pdf' });

      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: false,
      });

      fireEvent.change(fileInput);

      // File icon should be present
      const fileIcon = container.querySelector('.h-4.w-4');
      expect(fileIcon).toBeInTheDocument();
    });

    it('shows image icon for image attachments', () => {
      const { container } = render(<ChatInput {...defaultProps} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['content'], 'photo.jpg', { type: 'image/jpeg' });

      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: false,
      });

      fireEvent.change(fileInput);

      // Image icon should be present
      const imageIcon = container.querySelector('.h-4.w-4');
      expect(imageIcon).toBeInTheDocument();
    });

    it('handles multiple file attachments', () => {
      const { container } = render(<ChatInput {...defaultProps} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file1 = new File(['content1'], 'file1.pdf', { type: 'application/pdf' });
      const file2 = new File(['content2'], 'file2.docx', { type: 'application/msword' });

      Object.defineProperty(fileInput, 'files', {
        value: [file1, file2],
        writable: false,
      });

      fireEvent.change(fileInput);

      expect(screen.getByText('file1.pdf')).toBeInTheDocument();
      expect(screen.getByText('file2.docx')).toBeInTheDocument();
    });

    it('supports multiple file input', () => {
      const { container } = render(<ChatInput {...defaultProps} />);

      const fileInput = container.querySelector('input[type="file"]');
      expect(fileInput).toHaveAttribute('multiple');
    });
  });

  describe('Character Counter', () => {
    it('hides character counter by default', () => {
      render(<ChatInput {...defaultProps} value="Test" />);

      expect(screen.queryByText(/\/1000/)).not.toBeInTheDocument();
    });

    it('shows character counter when showCharCount is true', () => {
      render(
        <ChatInput {...defaultProps} value="Test" showCharCount={true} />
      );

      expect(screen.getByText('4/1000')).toBeInTheDocument();
    });

    it('updates character count as user types', () => {
      const { container, rerender } = render(
        <ChatInput {...defaultProps} value="" showCharCount={true} />
      );

      expect(screen.getByText('0/1000')).toBeInTheDocument();

      rerender(
        <ChatInput {...defaultProps} value="Hello" showCharCount={true} />
      );

      expect(screen.getByText('5/1000')).toBeInTheDocument();
    });

    it('shows custom maxLength in counter', () => {
      render(
        <ChatInput
          {...defaultProps}
          value="Test"
          showCharCount={true}
          maxLength={50}
        />
      );

      expect(screen.getByText('4/50')).toBeInTheDocument();
    });
  });

  describe('Typing Indicator', () => {
    it('hides typing indicator by default', () => {
      render(<ChatInput {...defaultProps} />);

      expect(screen.queryByText(/is typing/)).not.toBeInTheDocument();
    });

    it('shows typing indicator when enabled', () => {
      render(
        <ChatInput
          {...defaultProps}
          showTypingIndicator={true}
          typingUser="Alice"
        />
      );

      expect(screen.getByText('Alice is typing...')).toBeInTheDocument();
    });

    it('shows animated dots in typing indicator', () => {
      const { container } = render(
        <ChatInput
          {...defaultProps}
          showTypingIndicator={true}
          typingUser="Bob"
        />
      );

      const dots = container.querySelectorAll('.animate-bounce');
      expect(dots.length).toBe(3);
    });

    it('does not show typing indicator without typingUser', () => {
      render(
        <ChatInput {...defaultProps} showTypingIndicator={true} />
      );

      expect(screen.queryByText(/is typing/)).not.toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('disables textarea when disabled', () => {
      const { container } = render(
        <ChatInput {...defaultProps} disabled={true} />
      );

      const textarea = container.querySelector('textarea');
      expect(textarea).toBeDisabled();
    });

    it('disables all buttons when disabled', () => {
      render(<ChatInput {...defaultProps} disabled={true} />);

      const attachButton = screen.getByLabelText('Attach file');
      const emojiButton = screen.getByLabelText('Add emoji');
      const sendButton = screen.getByLabelText('Send message');

      expect(attachButton).toBeDisabled();
      expect(emojiButton).toBeDisabled();
      expect(sendButton).toBeDisabled();
    });

    it('disables file input when disabled', () => {
      const { container } = render(
        <ChatInput {...defaultProps} disabled={true} />
      );

      const fileInput = container.querySelector('input[type="file"]');
      expect(fileInput).toBeDisabled();
    });
  });

  describe('Loading State', () => {
    it('disables textarea when loading', () => {
      const { container } = render(
        <ChatInput {...defaultProps} loading={true} />
      );

      const textarea = container.querySelector('textarea');
      expect(textarea).toBeDisabled();
    });

    it('disables buttons when loading', () => {
      render(<ChatInput {...defaultProps} loading={true} />);

      const attachButton = screen.getByLabelText('Attach file');
      const emojiButton = screen.getByLabelText('Add emoji');

      expect(attachButton).toBeDisabled();
      expect(emojiButton).toBeDisabled();
    });

    it('shows spinner instead of send icon when loading', () => {
      const { container } = render(
        <ChatInput {...defaultProps} loading={true} />
      );

      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles very long text', () => {
      const longText = 'a'.repeat(2000);
      const { container } = render(
        <ChatInput {...defaultProps} value={longText} />
      );

      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveValue(longText);
    });

    it('handles special characters', () => {
      const specialChars = '!@#$%^&*()_+-=[]{}|;:\'",.<>?/~`';
      const { container } = render(
        <ChatInput {...defaultProps} value={specialChars} />
      );

      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveValue(specialChars);
    });

    it('handles emoji in text', () => {
      const emojiText = 'Hello 👋 World 🌍';
      const { container } = render(
        <ChatInput {...defaultProps} value={emojiText} />
      );

      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveValue(emojiText);
    });

    it('handles rapid typing', () => {
      const mockChange = vi.fn();
      const { container } = render(
        <ChatInput {...defaultProps} onChange={mockChange} />
      );

      const textarea = container.querySelector('textarea');
      if (textarea) {
        for (let i = 0; i < 10; i++) {
          fireEvent.change(textarea, { target: { value: `Text ${i}` } });
        }
        expect(mockChange).toHaveBeenCalledTimes(10);
      }
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to textarea', () => {
      const ref = { current: null } as React.RefObject<HTMLTextAreaElement>;
      render(<ChatInput {...defaultProps} ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    });
  });
});
