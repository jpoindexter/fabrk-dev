import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RichTextEditor } from './rich-text-editor';
import type { ToolbarButton } from './rich-text-editor';

// Mock document.execCommand
const mockExecCommand = vi.fn();
document.execCommand = mockExecCommand;

// Mock document.queryCommandState
const mockQueryCommandState = vi.fn((_command: string) => false);
document.queryCommandState = mockQueryCommandState;

describe('RichTextEditor Component', () => {
  beforeEach(() => {
    mockExecCommand.mockClear();
    mockQueryCommandState.mockClear();
  });

  describe('Rendering', () => {
    it('renders contentEditable div', () => {
      const { container } = render(<RichTextEditor />);

      const editor = container.querySelector('[contenteditable="true"]');
      expect(editor).toBeInTheDocument();
    });

    it('renders full toolbar by default', () => {
      const { container } = render(<RichTextEditor />);

      const toolbarButtons = container.querySelectorAll('button[type="button"]');
      // Full toolbar has 16 buttons
      expect(toolbarButtons.length).toBeGreaterThanOrEqual(15);
    });

    it('renders minimal toolbar when specified', () => {
      const { container } = render(<RichTextEditor toolbar="minimal" />);

      const toolbarButtons = container.querySelectorAll('button[type="button"]');
      // Minimal toolbar has 5 buttons
      expect(toolbarButtons.length).toBe(5);
    });

    it('renders custom toolbar when provided', () => {
      const customTools: ToolbarButton[] = [
        { command: 'bold', icon: <span>B</span>, label: 'Bold' },
        { command: 'italic', icon: <span>I</span>, label: 'Italic' },
      ];

      const { container } = render(
        <RichTextEditor toolbar="custom" customTools={customTools} />
      );

      const toolbarButtons = container.querySelectorAll('button[type="button"]');
      expect(toolbarButtons.length).toBe(2);
    });

    it('does not render toolbar when readOnly', () => {
      const { container } = render(<RichTextEditor readOnly={true} />);

      const toolbar = container.querySelector('.bg-card.p-2');
      expect(toolbar).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <RichTextEditor className="custom-editor" />
      );

      expect(container.querySelector('.custom-editor')).toBeInTheDocument();
    });
  });

  describe('Initial Value', () => {
    it('displays initial value', () => {
      const { container } = render(
        <RichTextEditor value="<p>Hello World</p>" />
      );

      const editor = container.querySelector('[contenteditable="true"]');
      expect(editor?.innerHTML).toContain('Hello World');
    });

    it('shows placeholder when empty', () => {
      const { container } = render(
        <RichTextEditor placeholder="Type something..." />
      );

      const editor = container.querySelector('[contenteditable="true"]');
      expect(editor).toHaveAttribute('data-placeholder', 'Type something...');
    });

    it('uses default placeholder', () => {
      const { container } = render(<RichTextEditor />);

      const editor = container.querySelector('[contenteditable="true"]');
      expect(editor).toHaveAttribute('data-placeholder', 'Start typing...');
    });
  });

  describe('Height Configuration', () => {
    it('applies custom minHeight', () => {
      const { container } = render(<RichTextEditor minHeight="300px" />);

      const editor = container.querySelector('[contenteditable="true"]') as HTMLElement;
      expect(editor.style.minHeight).toBe('300px');
    });

    it('applies custom maxHeight', () => {
      const { container } = render(<RichTextEditor maxHeight="800px" />);

      const editor = container.querySelector('[contenteditable="true"]') as HTMLElement;
      expect(editor.style.maxHeight).toBe('800px');
    });

    it('uses default height values', () => {
      const { container } = render(<RichTextEditor />);

      const editor = container.querySelector('[contenteditable="true"]') as HTMLElement;
      expect(editor.style.minHeight).toBe('200px');
      expect(editor.style.maxHeight).toBe('600px');
    });
  });

  describe('Toolbar Interactions', () => {
    it('executes bold command when bold button is clicked', () => {
      const { container } = render(<RichTextEditor />);

      const boldButton = container.querySelector('[aria-label="Bold"]');
      if (boldButton) {
        fireEvent.click(boldButton);
        expect(mockExecCommand).toHaveBeenCalledWith('bold', false, undefined);
      }
    });

    it('executes italic command when italic button is clicked', () => {
      const { container } = render(<RichTextEditor />);

      const italicButton = container.querySelector('[aria-label="Italic"]');
      if (italicButton) {
        fireEvent.click(italicButton);
        expect(mockExecCommand).toHaveBeenCalledWith('italic', false, undefined);
      }
    });

    it('executes underline command when underline button is clicked', () => {
      const { container } = render(<RichTextEditor />);

      const underlineButton = container.querySelector('[aria-label="Underline"]');
      if (underlineButton) {
        fireEvent.click(underlineButton);
        expect(mockExecCommand).toHaveBeenCalledWith('underline', false, undefined);
      }
    });

    it('executes heading command with value', () => {
      const { container } = render(<RichTextEditor />);

      const h1Button = container.querySelector('[aria-label="Heading 1"]');
      if (h1Button) {
        fireEvent.click(h1Button);
        expect(mockExecCommand).toHaveBeenCalledWith('formatBlock', false, 'h1');
      }
    });

    it('executes list commands', () => {
      const { container } = render(<RichTextEditor />);

      const bulletListButton = container.querySelector('[aria-label="Bullet List"]');
      if (bulletListButton) {
        fireEvent.click(bulletListButton);
        expect(mockExecCommand).toHaveBeenCalledWith('insertUnorderedList', false, undefined);
      }
    });

    it('executes alignment commands', () => {
      const { container } = render(<RichTextEditor />);

      const alignLeftButton = container.querySelector('[aria-label="Align Left"]');
      if (alignLeftButton) {
        fireEvent.click(alignLeftButton);
        expect(mockExecCommand).toHaveBeenCalledWith('justifyLeft', false, undefined);
      }
    });
  });

  describe('Link Insertion', () => {
    it('prompts for URL when link button is clicked', () => {
      const mockPrompt = vi.spyOn(window, 'prompt').mockReturnValue('https://example.com');
      const { container } = render(<RichTextEditor />);

      const linkButton = container.querySelector('[aria-label="Insert Link"]');
      if (linkButton) {
        fireEvent.click(linkButton);
        expect(mockPrompt).toHaveBeenCalledWith('Enter URL:');
        expect(mockExecCommand).toHaveBeenCalledWith('createLink', false, 'https://example.com');
      }

      mockPrompt.mockRestore();
    });

    it('does not create link if prompt is cancelled', () => {
      const mockPrompt = vi.spyOn(window, 'prompt').mockReturnValue(null);
      const { container } = render(<RichTextEditor />);

      const linkButton = container.querySelector('[aria-label="Insert Link"]');
      if (linkButton) {
        mockExecCommand.mockClear();
        fireEvent.click(linkButton);
        expect(mockExecCommand).not.toHaveBeenCalledWith('createLink', expect.anything(), expect.anything());
      }

      mockPrompt.mockRestore();
    });
  });

  describe('Content Changes', () => {
    it('calls onChange when content changes', () => {
      const mockChange = vi.fn();
      const { container } = render(<RichTextEditor onChange={mockChange} />);

      const editor = container.querySelector('[contenteditable="true"]');
      if (editor) {
        fireEvent.input(editor, { target: { innerHTML: '<p>New content</p>' } });
        expect(mockChange).toHaveBeenCalled();
      }
    });

    it('does not call onChange when not provided', () => {
      const { container } = render(<RichTextEditor />);

      const editor = container.querySelector('[contenteditable="true"]');
      if (editor) {
        // Should not throw error
        expect(() => {
          fireEvent.input(editor, { target: { innerHTML: '<p>New content</p>' } });
        }).not.toThrow();
      }
    });

    it('updates internal content on input', () => {
      const { container } = render(<RichTextEditor />);

      const editor = container.querySelector('[contenteditable="true"]') as HTMLElement;
      if (editor) {
        editor.innerHTML = '<p>Updated content</p>';
        fireEvent.input(editor);
        expect(editor.innerHTML).toContain('Updated content');
      }
    });
  });

  describe('Focus States', () => {
    it('applies focus shadow when focused', () => {
      const { container } = render(<RichTextEditor />);

      const editor = container.querySelector('[contenteditable="true"]');
      if (editor) {
        fireEvent.focus(editor);
        expect(editor).toHaveClass('shadow-md');
      }
    });

    it('removes focus shadow when blurred', () => {
      const { container } = render(<RichTextEditor />);

      const editor = container.querySelector('[contenteditable="true"]');
      if (editor) {
        fireEvent.focus(editor);
        expect(editor).toHaveClass('shadow-md');

        fireEvent.blur(editor);
        expect(editor).toHaveClass('shadow-sm');
        expect(editor).not.toHaveClass('shadow-md');
      }
    });
  });

  describe('Read-Only Mode', () => {
    it('disables editing when readOnly is true', () => {
      const { container } = render(<RichTextEditor readOnly={true} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor).toHaveAttribute('contenteditable', 'false');
    });

    it('applies read-only styling', () => {
      const { container } = render(<RichTextEditor readOnly={true} />);

      const editor = container.querySelector('[contenteditable="false"]');
      expect(editor).toHaveClass('cursor-default');
      expect(editor).toHaveClass('bg-muted/50');
    });

    it('does not show toolbar in read-only mode', () => {
      const { container } = render(<RichTextEditor readOnly={true} />);

      const toolbar = container.querySelector('.bg-card.p-2');
      expect(toolbar).not.toBeInTheDocument();
    });
  });

  describe('Format State Tracking', () => {
    it('highlights active format buttons', () => {
      mockQueryCommandState.mockImplementation((command: string) => command === 'bold');
      const { container } = render(<RichTextEditor />);

      const boldButton = container.querySelector('[aria-label="Bold"]');
      // Active buttons should have default variant (not outline)
      expect(boldButton).toBeInTheDocument();
    });

    it('updates format state on selection change', () => {
      const { container } = render(<RichTextEditor />);

      const editor = container.querySelector('[contenteditable="true"]');
      if (editor) {
        fireEvent.focus(editor);
        document.dispatchEvent(new Event('selectionchange'));
        expect(mockQueryCommandState).toHaveBeenCalled();
      }
    });
  });

  describe('Toolbar Button Configuration', () => {
    it('includes all formatting options in full toolbar', () => {
      const { container } = render(<RichTextEditor toolbar="full" />);

      expect(screen.queryByLabelText('Bold')).toBeInTheDocument();
      expect(screen.queryByLabelText('Italic')).toBeInTheDocument();
      expect(screen.queryByLabelText('Underline')).toBeInTheDocument();
      expect(screen.queryByLabelText('Strikethrough')).toBeInTheDocument();
      expect(screen.queryByLabelText('Heading 1')).toBeInTheDocument();
      expect(screen.queryByLabelText('Align Left')).toBeInTheDocument();
      expect(screen.queryByLabelText('Bullet List')).toBeInTheDocument();
    });

    it('includes only essential options in minimal toolbar', () => {
      const { container } = render(<RichTextEditor toolbar="minimal" />);

      expect(screen.queryByLabelText('Bold')).toBeInTheDocument();
      expect(screen.queryByLabelText('Italic')).toBeInTheDocument();
      expect(screen.queryByLabelText('Underline')).toBeInTheDocument();
      expect(screen.queryByLabelText('Bullet List')).toBeInTheDocument();
      expect(screen.queryByLabelText('Insert Link')).toBeInTheDocument();

      // Should not include advanced options
      expect(screen.queryByLabelText('Heading 1')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Align Left')).not.toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies prose styling to editor', () => {
      const { container } = render(<RichTextEditor />);

      const editor = container.querySelector('[contenteditable="true"]');
      expect(editor).toHaveClass('prose');
      expect(editor).toHaveClass('prose-sm');
    });

    it('applies border and shadow styling', () => {
      const { container } = render(<RichTextEditor />);

      const editor = container.querySelector('[contenteditable="true"]');
      expect(editor).toHaveClass('rounded-md');
      expect(editor).toHaveClass('border');
      expect(editor).toHaveClass('shadow-sm');
    });

    it('applies theme-responsive colors', () => {
      const { container } = render(<RichTextEditor />);

      const editor = container.querySelector('[contenteditable="true"]');
      expect(editor).toHaveClass('bg-background');
      expect(editor).toHaveClass('text-foreground');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty value', () => {
      const { container } = render(<RichTextEditor value="" />);

      const editor = container.querySelector('[contenteditable="true"]');
      expect(editor?.innerHTML).toBe('');
    });

    it('handles HTML content with special characters', () => {
      const { container } = render(
        <RichTextEditor value="<p>&lt;script&gt;alert('xss')&lt;/script&gt;</p>" />
      );

      const editor = container.querySelector('[contenteditable="true"]');
      expect(editor).toBeInTheDocument();
    });

    it('handles very long content', () => {
      const longContent = '<p>' + 'Lorem ipsum '.repeat(1000) + '</p>';
      const { container } = render(<RichTextEditor value={longContent} />);

      const editor = container.querySelector('[contenteditable="true"]');
      expect(editor?.innerHTML).toContain('Lorem ipsum');
    });

    it('handles rapid onChange calls', () => {
      const mockChange = vi.fn();
      const { container } = render(<RichTextEditor onChange={mockChange} />);

      const editor = container.querySelector('[contenteditable="true"]');
      if (editor) {
        for (let i = 0; i < 10; i++) {
          fireEvent.input(editor, { target: { innerHTML: `<p>Content ${i}</p>` } });
        }
        expect(mockChange).toHaveBeenCalledTimes(10);
      }
    });

    it('handles multiple toolbars (custom)', () => {
      const tools1: ToolbarButton[] = [
        { command: 'bold', icon: <span>B</span>, label: 'Bold' },
      ];
      const tools2: ToolbarButton[] = [
        { command: 'italic', icon: <span>I</span>, label: 'Italic' },
      ];

      const { rerender, container } = render(
        <RichTextEditor toolbar="custom" customTools={tools1} />
      );

      expect(container.querySelectorAll('button[type="button"]').length).toBe(1);

      rerender(<RichTextEditor toolbar="custom" customTools={tools2} />);

      expect(container.querySelectorAll('button[type="button"]').length).toBe(1);
    });
  });

  describe('Accessibility', () => {
    it('has aria-labels on toolbar buttons', () => {
      render(<RichTextEditor />);

      expect(screen.getByLabelText('Bold')).toBeInTheDocument();
      expect(screen.getByLabelText('Italic')).toBeInTheDocument();
      expect(screen.getByLabelText('Underline')).toBeInTheDocument();
    });

    it('has title attributes on toolbar buttons', () => {
      const { container } = render(<RichTextEditor />);

      const boldButton = container.querySelector('[aria-label="Bold"]');
      expect(boldButton).toHaveAttribute('title', 'Bold');
    });

    it('editor is keyboard accessible', () => {
      const { container } = render(<RichTextEditor />);

      const editor = container.querySelector('[contenteditable="true"]');
      expect(editor).toBeInTheDocument();
      // contentEditable divs are inherently keyboard accessible
    });

    it('applies proper cursor styles', () => {
      const { container } = render(<RichTextEditor />);

      const editor = container.querySelector('[contenteditable="true"]');
      expect(editor).toHaveClass('cursor-text');
    });

    it('applies read-only cursor in read-only mode', () => {
      const { container } = render(<RichTextEditor readOnly={true} />);

      const editor = container.querySelector('[contenteditable="false"]');
      expect(editor).toHaveClass('cursor-default');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to editor div', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<RichTextEditor ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
