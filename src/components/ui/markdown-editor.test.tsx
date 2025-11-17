import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MarkdownEditor } from './markdown-editor';

describe('MarkdownEditor Component', () => {
  describe('Rendering', () => {
    it('renders editor and preview by default', () => {
      render(
        <MarkdownEditor value="# Hello" onChange={() => {}} />
      );

      expect(screen.getByText('Editor')).toBeInTheDocument();
      expect(screen.getByText('Preview')).toBeInTheDocument();
    });

    it('renders only editor when editorOnly is true', () => {
      render(
        <MarkdownEditor value="# Hello" onChange={() => {}} editorOnly={true} />
      );

      expect(screen.queryByText('Preview')).not.toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Start writing/i)).toBeInTheDocument();
    });

    it('renders only preview when previewOnly is true', () => {
      render(
        <MarkdownEditor value="# Hello" onChange={() => {}} previewOnly={true} />
      );

      expect(screen.queryByPlaceholderText(/Start writing/i)).not.toBeInTheDocument();
    });

    it('renders toolbar by default', () => {
      const { container } = render(
        <MarkdownEditor value="" onChange={() => {}} />
      );

      const toolbar = container.querySelector('.rounded-brutal.border-brutal.bg-card');
      expect(toolbar).toBeInTheDocument();
    });

    it('does not render toolbar in previewOnly mode', () => {
      const { container } = render(
        <MarkdownEditor value="" onChange={() => {}} previewOnly={true} />
      );

      expect(screen.queryByTitle('Bold')).not.toBeInTheDocument();
    });

    it('does not render toolbar when disabled', () => {
      const { container } = render(
        <MarkdownEditor value="" onChange={() => {}} disabled={true} />
      );

      expect(screen.queryByTitle('Bold')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <MarkdownEditor
          value=""
          onChange={() => {}}
          className="custom-markdown"
        />
      );

      expect(container.querySelector('.custom-markdown')).toBeInTheDocument();
    });
  });

  describe('Markdown Parsing', () => {
    it('parses headings correctly', () => {
      const { container } = render(
        <MarkdownEditor value="# H1\n## H2\n### H3" onChange={() => {}} />
      );

      const preview = container.querySelector('.prose');
      expect(preview?.innerHTML).toContain('<h1');
      expect(preview?.innerHTML).toContain('<h2');
      expect(preview?.innerHTML).toContain('<h3');
    });

    it('parses bold text correctly', () => {
      const { container } = render(
        <MarkdownEditor value="**bold** and __also bold__" onChange={() => {}} />
      );

      const preview = container.querySelector('.prose');
      expect(preview?.innerHTML).toContain('<strong');
      expect(preview?.innerHTML).toContain('bold');
    });

    it('parses italic text correctly', () => {
      const { container } = render(
        <MarkdownEditor value="*italic* and _also italic_" onChange={() => {}} />
      );

      const preview = container.querySelector('.prose');
      expect(preview?.innerHTML).toContain('<em');
      expect(preview?.innerHTML).toContain('italic');
    });

    it('parses links correctly', () => {
      const { container } = render(
        <MarkdownEditor
          value="[link text](https://example.com)"
          onChange={() => {}}
        />
      );

      const preview = container.querySelector('.prose');
      expect(preview?.innerHTML).toContain('<a');
      expect(preview?.innerHTML).toContain('href="https://example.com"');
      expect(preview?.innerHTML).toContain('link text');
    });

    it('parses inline code correctly', () => {
      const { container } = render(
        <MarkdownEditor value="`code`" onChange={() => {}} />
      );

      const preview = container.querySelector('.prose');
      expect(preview?.innerHTML).toContain('<code');
      expect(preview?.innerHTML).toContain('code');
    });

    it('parses code blocks correctly', () => {
      const { container } = render(
        <MarkdownEditor
          value="```javascript\nconst x = 1;\n```"
          onChange={() => {}}
        />
      );

      const preview = container.querySelector('.prose');
      expect(preview?.innerHTML).toContain('<pre');
      expect(preview?.innerHTML).toContain('<code');
      expect(preview?.innerHTML).toContain('const x = 1;');
    });

    it('parses unordered lists correctly', () => {
      const { container } = render(
        <MarkdownEditor value="- Item 1\n- Item 2\n- Item 3" onChange={() => {}} />
      );

      const preview = container.querySelector('.prose');
      expect(preview?.innerHTML).toContain('<ul');
      expect(preview?.innerHTML).toContain('<li');
      expect(preview?.innerHTML).toContain('Item 1');
    });

    it('parses ordered lists correctly', () => {
      const { container } = render(
        <MarkdownEditor
          value="1. First\n2. Second\n3. Third"
          onChange={() => {}}
        />
      );

      const preview = container.querySelector('.prose');
      expect(preview?.innerHTML).toContain('<ol');
      expect(preview?.innerHTML).toContain('<li');
      expect(preview?.innerHTML).toContain('First');
    });

    it('parses paragraphs correctly', () => {
      const { container } = render(
        <MarkdownEditor
          value="This is a paragraph.\n\nThis is another paragraph."
          onChange={() => {}}
        />
      );

      const preview = container.querySelector('.prose');
      expect(preview?.innerHTML).toContain('<p');
      expect(preview?.innerHTML).toContain('This is a paragraph');
    });

    it('handles empty content', () => {
      const { container } = render(
        <MarkdownEditor value="" onChange={() => {}} />
      );

      const preview = container.querySelector('.prose');
      expect(preview?.innerHTML).toContain('No content yet');
    });

    it('parses mixed formatting correctly', () => {
      const { container } = render(
        <MarkdownEditor
          value="# Title\n\nThis is **bold** and *italic* text with `code`."
          onChange={() => {}}
        />
      );

      const preview = container.querySelector('.prose');
      expect(preview?.innerHTML).toContain('<h1');
      expect(preview?.innerHTML).toContain('<strong');
      expect(preview?.innerHTML).toContain('<em');
      expect(preview?.innerHTML).toContain('<code');
    });
  });

  describe('Toolbar Interactions', () => {
    it('inserts bold markdown when bold button is clicked', () => {
      const mockChange = vi.fn();
      render(<MarkdownEditor value="" onChange={mockChange} />);

      const boldButton = screen.getByTitle('Bold');
      fireEvent.click(boldButton);

      expect(mockChange).toHaveBeenCalledWith('****');
    });

    it('inserts italic markdown when italic button is clicked', () => {
      const mockChange = vi.fn();
      render(<MarkdownEditor value="" onChange={mockChange} />);

      const italicButton = screen.getByTitle('Italic');
      fireEvent.click(italicButton);

      expect(mockChange).toHaveBeenCalledWith('**');
    });

    it('inserts heading markdown when heading button is clicked', () => {
      const mockChange = vi.fn();
      render(<MarkdownEditor value="" onChange={mockChange} />);

      const headingButton = screen.getByTitle('Heading');
      fireEvent.click(headingButton);

      expect(mockChange).toHaveBeenCalledWith('# ');
    });

    it('inserts link markdown when link button is clicked', () => {
      const mockChange = vi.fn();
      render(<MarkdownEditor value="" onChange={mockChange} />);

      const linkButton = screen.getByTitle('Link');
      fireEvent.click(linkButton);

      expect(mockChange).toHaveBeenCalledWith('[](url)');
    });

    it('inserts code block markdown when code button is clicked', () => {
      const mockChange = vi.fn();
      render(<MarkdownEditor value="" onChange={mockChange} />);

      const codeButton = screen.getByTitle('Code');
      fireEvent.click(codeButton);

      expect(mockChange).toHaveBeenCalledWith('```\n\n```');
    });

    it('inserts list markdown when list button is clicked', () => {
      const mockChange = vi.fn();
      render(<MarkdownEditor value="" onChange={mockChange} />);

      const listButton = screen.getByTitle('List');
      fireEvent.click(listButton);

      expect(mockChange).toHaveBeenCalledWith('- ');
    });

    it('wraps selected text with markdown syntax', () => {
      const mockChange = vi.fn();
      const { container } = render(
        <MarkdownEditor value="selected text" onChange={mockChange} />
      );

      const textarea = container.querySelector('textarea');
      if (textarea) {
        // Simulate text selection
        textarea.setSelectionRange(0, 13);
        const boldButton = screen.getByTitle('Bold');
        fireEvent.click(boldButton);

        expect(mockChange).toHaveBeenCalledWith('**selected text**');
      }
    });
  });

  describe('Preview Toggle', () => {
    it('shows preview by default', () => {
      render(<MarkdownEditor value="# Test" onChange={() => {}} />);

      expect(screen.getByText('Preview')).toBeInTheDocument();
    });

    it('hides preview when hide preview button is clicked', () => {
      render(<MarkdownEditor value="# Test" onChange={() => {}} />);

      const hideButton = screen.getByText('Hide Preview');
      fireEvent.click(hideButton);

      expect(screen.queryByText('Preview')).not.toBeInTheDocument();
    });

    it('shows preview when show preview button is clicked', () => {
      render(<MarkdownEditor value="# Test" onChange={() => {}} />);

      const hideButton = screen.getByText('Hide Preview');
      fireEvent.click(hideButton);

      const showButton = screen.getByText('Show Preview');
      fireEvent.click(showButton);

      expect(screen.getByText('Preview')).toBeInTheDocument();
    });

    it('does not show preview toggle in editorOnly mode', () => {
      render(
        <MarkdownEditor value="# Test" onChange={() => {}} editorOnly={true} />
      );

      expect(screen.queryByText('Hide Preview')).not.toBeInTheDocument();
      expect(screen.queryByText('Show Preview')).not.toBeInTheDocument();
    });

    it('does not show preview toggle in previewOnly mode', () => {
      render(
        <MarkdownEditor value="# Test" onChange={() => {}} previewOnly={true} />
      );

      expect(screen.queryByText('Hide Preview')).not.toBeInTheDocument();
      expect(screen.queryByText('Show Preview')).not.toBeInTheDocument();
    });
  });

  describe('Content Changes', () => {
    it('calls onChange when textarea content changes', () => {
      const mockChange = vi.fn();
      const { container } = render(
        <MarkdownEditor value="" onChange={mockChange} />
      );

      const textarea = container.querySelector('textarea');
      if (textarea) {
        fireEvent.change(textarea, { target: { value: '# New content' } });
        expect(mockChange).toHaveBeenCalledWith('# New content');
      }
    });

    it('updates preview when content changes', () => {
      const { container, rerender } = render(
        <MarkdownEditor value="# Original" onChange={() => {}} />
      );

      rerender(<MarkdownEditor value="# Updated" onChange={() => {}} />);

      const textarea = container.querySelector('textarea');
      expect(textarea?.value).toBe('# Updated');
    });
  });

  describe('Placeholder', () => {
    it('shows default placeholder', () => {
      render(<MarkdownEditor value="" onChange={() => {}} />);

      expect(
        screen.getByPlaceholderText('Start writing in markdown...')
      ).toBeInTheDocument();
    });

    it('shows custom placeholder', () => {
      render(
        <MarkdownEditor
          value=""
          onChange={() => {}}
          placeholder="Custom placeholder"
        />
      );

      expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
    });
  });

  describe('Height Configuration', () => {
    it('applies custom minHeight to editor', () => {
      const { container } = render(
        <MarkdownEditor value="" onChange={() => {}} minHeight={500} />
      );

      const textarea = container.querySelector('textarea');
      expect(textarea?.style.minHeight).toBe('500px');
    });

    it('applies custom minHeight to preview', () => {
      const { container } = render(
        <MarkdownEditor value="# Test" onChange={() => {}} minHeight={500} />
      );

      const preview = container.querySelector('.prose');
      expect(preview).toHaveStyle({ minHeight: '500px' });
    });

    it('uses default minHeight', () => {
      const { container } = render(
        <MarkdownEditor value="" onChange={() => {}} />
      );

      const textarea = container.querySelector('textarea');
      expect(textarea?.style.minHeight).toBe('400px');
    });
  });

  describe('Disabled State', () => {
    it('disables textarea when disabled is true', () => {
      const { container } = render(
        <MarkdownEditor value="" onChange={() => {}} disabled={true} />
      );

      const textarea = container.querySelector('textarea');
      expect(textarea).toBeDisabled();
    });

    it('does not show toolbar when disabled', () => {
      render(<MarkdownEditor value="" onChange={() => {}} disabled={true} />);

      expect(screen.queryByTitle('Bold')).not.toBeInTheDocument();
    });

    it('allows onChange even when disabled', () => {
      const mockChange = vi.fn();
      const { container } = render(
        <MarkdownEditor value="" onChange={mockChange} disabled={true} />
      );

      const textarea = container.querySelector('textarea');
      if (textarea) {
        // Textarea is disabled, but React can still trigger onChange
        fireEvent.change(textarea, { target: { value: 'New' } });
      }
    });
  });

  describe('Grid Layout', () => {
    it('uses two-column layout when both editor and preview are visible', () => {
      const { container } = render(
        <MarkdownEditor value="# Test" onChange={() => {}} />
      );

      const grid = container.querySelector('.grid-cols-2');
      expect(grid).toBeInTheDocument();
    });

    it('uses single-column layout when only editor is visible', () => {
      const { container } = render(
        <MarkdownEditor value="# Test" onChange={() => {}} editorOnly={true} />
      );

      const grid = container.querySelector('.grid-cols-1');
      expect(grid).toBeInTheDocument();
    });

    it('uses single-column layout when only preview is visible', () => {
      const { container } = render(
        <MarkdownEditor value="# Test" onChange={() => {}} previewOnly={true} />
      );

      const grid = container.querySelector('.grid-cols-1');
      expect(grid).toBeInTheDocument();
    });

    it('switches layout when preview is toggled', () => {
      const { container } = render(
        <MarkdownEditor value="# Test" onChange={() => {}} />
      );

      expect(container.querySelector('.grid-cols-2')).toBeInTheDocument();

      const hideButton = screen.getByText('Hide Preview');
      fireEvent.click(hideButton);

      expect(container.querySelector('.grid-cols-1')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies prose styling to preview', () => {
      const { container } = render(
        <MarkdownEditor value="# Test" onChange={() => {}} />
      );

      const preview = container.querySelector('.prose');
      expect(preview).toHaveClass('prose-sm');
      expect(preview).toHaveClass('max-w-none');
    });

    it('applies neobrutalism styling', () => {
      const { container } = render(
        <MarkdownEditor value="" onChange={() => {}} />
      );

      const toolbar = container.querySelector('.rounded-brutal.border-brutal');
      expect(toolbar).toBeInTheDocument();

      const preview = container.querySelector('.prose');
      expect(preview).toHaveClass('rounded-brutal');
      expect(preview).toHaveClass('border-brutal');
      expect(preview).toHaveClass('shadow-brutal');
    });

    it('applies monospace font to editor', () => {
      const { container } = render(
        <MarkdownEditor value="" onChange={() => {}} />
      );

      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveClass('font-mono');
      expect(textarea).toHaveClass('text-sm');
    });
  });

  describe('Edge Cases', () => {
    it('handles very long markdown content', () => {
      const longContent = '# Title\n\n' + 'Lorem ipsum '.repeat(1000);
      const { container } = render(
        <MarkdownEditor value={longContent} onChange={() => {}} />
      );

      const textarea = container.querySelector('textarea');
      expect(textarea?.value).toContain('Lorem ipsum');
    });

    it('handles markdown with special characters', () => {
      const { container } = render(
        <MarkdownEditor
          value="<script>alert('xss')</script>"
          onChange={() => {}}
        />
      );

      const preview = container.querySelector('.prose');
      expect(preview?.innerHTML).not.toContain('<script>');
    });

    it('handles malformed markdown gracefully', () => {
      const { container } = render(
        <MarkdownEditor value="**incomplete bold" onChange={() => {}} />
      );

      const preview = container.querySelector('.prose');
      expect(preview).toBeInTheDocument();
    });

    it('handles rapid content changes', () => {
      const mockChange = vi.fn();
      const { container } = render(
        <MarkdownEditor value="" onChange={mockChange} />
      );

      const textarea = container.querySelector('textarea');
      if (textarea) {
        for (let i = 0; i < 10; i++) {
          fireEvent.change(textarea, { target: { value: `Content ${i}` } });
        }
        expect(mockChange).toHaveBeenCalledTimes(10);
      }
    });

    it('handles unicode characters', () => {
      const { container } = render(
        <MarkdownEditor value="# 你好世界 🌍" onChange={() => {}} />
      );

      const textarea = container.querySelector('textarea');
      expect(textarea?.value).toBe('# 你好世界 🌍');
    });

    it('handles nested markdown syntax', () => {
      const { container } = render(
        <MarkdownEditor value="**bold *and italic***" onChange={() => {}} />
      );

      const preview = container.querySelector('.prose');
      expect(preview?.innerHTML).toContain('<strong');
      expect(preview?.innerHTML).toContain('<em');
    });
  });

  describe('Accessibility', () => {
    it('has accessible labels for toolbar buttons', () => {
      render(<MarkdownEditor value="" onChange={() => {}} />);

      expect(screen.getByTitle('Bold')).toBeInTheDocument();
      expect(screen.getByTitle('Italic')).toBeInTheDocument();
      expect(screen.getByTitle('Heading')).toBeInTheDocument();
    });

    it('textarea is keyboard accessible', () => {
      const { container } = render(
        <MarkdownEditor value="" onChange={() => {}} />
      );

      const textarea = container.querySelector('textarea');
      expect(textarea).toBeInTheDocument();
    });

    it('preview has semantic HTML structure', () => {
      const { container } = render(
        <MarkdownEditor value="# Heading\n\nParagraph" onChange={() => {}} />
      );

      const preview = container.querySelector('.prose');
      expect(preview?.innerHTML).toContain('<h1');
      expect(preview?.innerHTML).toContain('<p');
    });

    it('links in preview open in new tab', () => {
      const { container } = render(
        <MarkdownEditor
          value="[link](https://example.com)"
          onChange={() => {}}
        />
      );

      const preview = container.querySelector('.prose');
      expect(preview?.innerHTML).toContain('target="_blank"');
      expect(preview?.innerHTML).toContain('rel="noopener noreferrer"');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to container div', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<MarkdownEditor ref={ref} value="" onChange={() => {}} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
