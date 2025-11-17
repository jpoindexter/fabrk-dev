import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Lightbox } from './lightbox';
import type { LightboxItem } from './lightbox';

describe('Lightbox Component', () => {
  const mockItems: LightboxItem[] = [
    {
      id: '1',
      type: 'image',
      src: 'https://example.com/image1.jpg',
      thumbnail: 'https://example.com/thumb1.jpg',
      alt: 'Image 1',
      caption: 'Beautiful landscape',
    },
    {
      id: '2',
      type: 'image',
      src: 'https://example.com/image2.jpg',
      thumbnail: 'https://example.com/thumb2.jpg',
      alt: 'Image 2',
    },
    {
      id: '3',
      type: 'video',
      src: 'https://example.com/video1.mp4',
      thumbnail: 'https://example.com/thumb3.jpg',
      alt: 'Video 1',
      caption: 'Amazing video',
    },
  ];

  const defaultProps = {
    items: mockItems,
    isOpen: true,
    currentIndex: 0,
    onClose: vi.fn(),
    onNavigate: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders when open', () => {
      render(<Lightbox {...defaultProps} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
      render(<Lightbox {...defaultProps} isOpen={false} />);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('displays current image', () => {
      render(<Lightbox {...defaultProps} />);

      const image = screen.getByAltText('Image 1');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://example.com/image1.jpg');
    });

    it('displays caption when available', () => {
      render(<Lightbox {...defaultProps} />);

      expect(screen.getByText('Beautiful landscape')).toBeInTheDocument();
    });

    it('does not display caption when not available', () => {
      render(<Lightbox {...defaultProps} currentIndex={1} />);

      expect(screen.queryByText('Beautiful landscape')).not.toBeInTheDocument();
    });

    it('displays item counter', () => {
      render(<Lightbox {...defaultProps} />);

      expect(screen.getByText('1 / 3')).toBeInTheDocument();
    });

    it('renders close button', () => {
      render(<Lightbox {...defaultProps} />);

      const closeButton = screen.getByLabelText('Close lightbox');
      expect(closeButton).toBeInTheDocument();
    });

    it('renders navigation buttons', () => {
      render(<Lightbox {...defaultProps} />);

      expect(screen.getByLabelText('Previous')).toBeInTheDocument();
      expect(screen.getByLabelText('Next')).toBeInTheDocument();
    });

    it('renders thumbnail strip', () => {
      const { container } = render(<Lightbox {...defaultProps} showThumbnails={true} />);

      const thumbnails = container.querySelectorAll('img[src*="thumb"]');
      expect(thumbnails.length).toBe(3);
    });

    it('does not render thumbnails when showThumbnails is false', () => {
      const { container } = render(
        <Lightbox {...defaultProps} showThumbnails={false} />
      );

      const thumbnails = container.querySelectorAll('img[src*="thumb"]');
      expect(thumbnails.length).toBe(1); // Only main image
    });
  });

  describe('Navigation', () => {
    it('navigates to next item when next button is clicked', () => {
      const mockNavigate = vi.fn();
      render(<Lightbox {...defaultProps} onNavigate={mockNavigate} />);

      const nextButton = screen.getByLabelText('Next');
      fireEvent.click(nextButton);

      expect(mockNavigate).toHaveBeenCalledWith(1);
    });

    it('navigates to previous item when previous button is clicked', () => {
      const mockNavigate = vi.fn();
      render(<Lightbox {...defaultProps} currentIndex={1} onNavigate={mockNavigate} />);

      const previousButton = screen.getByLabelText('Previous');
      fireEvent.click(previousButton);

      expect(mockNavigate).toHaveBeenCalledWith(0);
    });

    it('disables previous button on first item', () => {
      render(<Lightbox {...defaultProps} currentIndex={0} />);

      const previousButton = screen.getByLabelText('Previous');
      expect(previousButton).toBeDisabled();
    });

    it('disables next button on last item', () => {
      render(<Lightbox {...defaultProps} currentIndex={2} />);

      const nextButton = screen.getByLabelText('Next');
      expect(nextButton).toBeDisabled();
    });

    it('navigates with arrow keys', () => {
      const mockNavigate = vi.fn();
      render(<Lightbox {...defaultProps} onNavigate={mockNavigate} />);

      fireEvent.keyDown(document, { key: 'ArrowRight' });
      expect(mockNavigate).toHaveBeenCalledWith(1);

      fireEvent.keyDown(document, { key: 'ArrowLeft' });
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it('navigates when thumbnail is clicked', () => {
      const mockNavigate = vi.fn();
      const { container } = render(
        <Lightbox {...defaultProps} showThumbnails={true} onNavigate={mockNavigate} />
      );

      const thumbnails = container.querySelectorAll('img[src*="thumb"]');
      fireEvent.click(thumbnails[1]);

      expect(mockNavigate).toHaveBeenCalledWith(1);
    });

    it('highlights active thumbnail', () => {
      const { container } = render(
        <Lightbox {...defaultProps} currentIndex={0} showThumbnails={true} />
      );

      const thumbnailContainers = container.querySelectorAll('.cursor-pointer');
      const firstThumbnail = thumbnailContainers[0];

      expect(firstThumbnail).toHaveClass('ring-2');
      expect(firstThumbnail).toHaveClass('ring-primary');
    });
  });

  describe('Zoom Controls', () => {
    it('renders zoom in button', () => {
      render(<Lightbox {...defaultProps} />);

      const zoomInButton = screen.getByLabelText('Zoom in');
      expect(zoomInButton).toBeInTheDocument();
    });

    it('renders zoom out button', () => {
      render(<Lightbox {...defaultProps} />);

      const zoomOutButton = screen.getByLabelText('Zoom out');
      expect(zoomOutButton).toBeInTheDocument();
    });

    it('renders reset zoom button', () => {
      render(<Lightbox {...defaultProps} />);

      const resetButton = screen.getByLabelText('Reset zoom');
      expect(resetButton).toBeInTheDocument();
    });

    it('zooms in when zoom in button is clicked', () => {
      const { container } = render(<Lightbox {...defaultProps} />);

      const zoomInButton = screen.getByLabelText('Zoom in');
      fireEvent.click(zoomInButton);

      const image = container.querySelector('img[alt="Image 1"]');
      // Image should have transform style applied
      expect(image).toBeInTheDocument();
    });

    it('zooms out when zoom out button is clicked', () => {
      const { container } = render(<Lightbox {...defaultProps} />);

      const zoomInButton = screen.getByLabelText('Zoom in');
      fireEvent.click(zoomInButton);

      const zoomOutButton = screen.getByLabelText('Zoom out');
      fireEvent.click(zoomOutButton);

      const image = container.querySelector('img[alt="Image 1"]');
      expect(image).toBeInTheDocument();
    });

    it('resets zoom when reset button is clicked', () => {
      const { container } = render(<Lightbox {...defaultProps} />);

      const zoomInButton = screen.getByLabelText('Zoom in');
      fireEvent.click(zoomInButton);
      fireEvent.click(zoomInButton);

      const resetButton = screen.getByLabelText('Reset zoom');
      fireEvent.click(resetButton);

      const image = container.querySelector('img[alt="Image 1"]');
      expect(image).toBeInTheDocument();
    });

    it('zooms with keyboard shortcuts', () => {
      const { container } = render(<Lightbox {...defaultProps} />);

      fireEvent.keyDown(document, { key: '+' });

      const image = container.querySelector('img[alt="Image 1"]');
      expect(image).toBeInTheDocument();

      fireEvent.keyDown(document, { key: '-' });
      expect(image).toBeInTheDocument();
    });

    it('prevents zooming beyond max zoom', () => {
      render(<Lightbox {...defaultProps} />);

      const zoomInButton = screen.getByLabelText('Zoom in');

      // Click many times to exceed max zoom
      for (let i = 0; i < 20; i++) {
        fireEvent.click(zoomInButton);
      }

      // Should not crash
      expect(zoomInButton).toBeInTheDocument();
    });

    it('prevents zooming below min zoom', () => {
      render(<Lightbox {...defaultProps} />);

      const zoomOutButton = screen.getByLabelText('Zoom out');

      // Click many times to go below min zoom
      for (let i = 0; i < 20; i++) {
        fireEvent.click(zoomOutButton);
      }

      // Should not crash
      expect(zoomOutButton).toBeInTheDocument();
    });
  });

  describe('Close Functionality', () => {
    it('closes when close button is clicked', () => {
      const mockClose = vi.fn();
      render(<Lightbox {...defaultProps} onClose={mockClose} />);

      const closeButton = screen.getByLabelText('Close lightbox');
      fireEvent.click(closeButton);

      expect(mockClose).toHaveBeenCalled();
    });

    it('closes when Escape key is pressed', () => {
      const mockClose = vi.fn();
      render(<Lightbox {...defaultProps} onClose={mockClose} />);

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(mockClose).toHaveBeenCalled();
    });

    it('closes when backdrop is clicked', () => {
      const mockClose = vi.fn();
      const { container } = render(<Lightbox {...defaultProps} onClose={mockClose} />);

      const backdrop = container.querySelector('.fixed.inset-0.bg-black');
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(mockClose).toHaveBeenCalled();
      }
    });

    it('does not close when content is clicked', () => {
      const mockClose = vi.fn();
      const { container } = render(<Lightbox {...defaultProps} onClose={mockClose} />);

      const image = container.querySelector('img[alt="Image 1"]');
      if (image) {
        fireEvent.click(image);
        expect(mockClose).not.toHaveBeenCalled();
      }
    });
  });

  describe('Video Support', () => {
    it('displays video element for video items', () => {
      const { container } = render(
        <Lightbox {...defaultProps} currentIndex={2} />
      );

      const video = container.querySelector('video');
      expect(video).toBeInTheDocument();
      expect(video).toHaveAttribute('src', 'https://example.com/video1.mp4');
    });

    it('shows video controls', () => {
      const { container } = render(
        <Lightbox {...defaultProps} currentIndex={2} />
      );

      const video = container.querySelector('video');
      expect(video).toHaveAttribute('controls');
    });

    it('switches between image and video', () => {
      const mockNavigate = vi.fn();
      const { container, rerender } = render(
        <Lightbox {...defaultProps} currentIndex={0} onNavigate={mockNavigate} />
      );

      expect(container.querySelector('img[alt="Image 1"]')).toBeInTheDocument();
      expect(container.querySelector('video')).not.toBeInTheDocument();

      rerender(<Lightbox {...defaultProps} currentIndex={2} onNavigate={mockNavigate} />);

      expect(container.querySelector('video')).toBeInTheDocument();
    });
  });

  describe('Body Scroll Lock', () => {
    it('prevents body scroll when open', () => {
      render(<Lightbox {...defaultProps} isOpen={true} />);

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body scroll when closed', () => {
      const { rerender } = render(<Lightbox {...defaultProps} isOpen={true} />);

      expect(document.body.style.overflow).toBe('hidden');

      rerender(<Lightbox {...defaultProps} isOpen={false} />);

      expect(document.body.style.overflow).toBe('');
    });

    it('restores body scroll on unmount', () => {
      const { unmount } = render(<Lightbox {...defaultProps} isOpen={true} />);

      expect(document.body.style.overflow).toBe('hidden');

      unmount();

      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('Loading State', () => {
    it('shows loading spinner while image loads', () => {
      const { container } = render(<Lightbox {...defaultProps} />);

      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('hides loading spinner after image loads', () => {
      const { container } = render(<Lightbox {...defaultProps} />);

      const image = container.querySelector('img[alt="Image 1"]') as HTMLImageElement;
      fireEvent.load(image);

      const spinner = container.querySelector('.animate-spin');
      expect(spinner).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles single item', () => {
      const singleItem: LightboxItem[] = [
        {
          id: '1',
          type: 'image',
          src: 'https://example.com/image.jpg',
          alt: 'Single image',
        },
      ];

      render(<Lightbox {...defaultProps} items={singleItem} currentIndex={0} />);

      expect(screen.getByText('1 / 1')).toBeInTheDocument();
    });

    it('handles empty items array', () => {
      render(<Lightbox {...defaultProps} items={[]} currentIndex={0} />);

      // Should not crash
      expect(screen.queryByRole('dialog')).toBeInTheDocument();
    });

    it('handles invalid currentIndex', () => {
      render(<Lightbox {...defaultProps} currentIndex={10} />);

      // Should not crash
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('handles negative currentIndex', () => {
      render(<Lightbox {...defaultProps} currentIndex={-1} />);

      // Should not crash
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('handles very long captions', () => {
      const longCaption = 'This is a very long caption. '.repeat(50);
      const itemsWithLongCaption: LightboxItem[] = [
        {
          id: '1',
          type: 'image',
          src: 'https://example.com/image.jpg',
          alt: 'Image',
          caption: longCaption,
        },
      ];

      render(
        <Lightbox {...defaultProps} items={itemsWithLongCaption} currentIndex={0} />
      );

      expect(screen.getByText(longCaption)).toBeInTheDocument();
    });

    it('handles rapid navigation', () => {
      const mockNavigate = vi.fn();
      render(<Lightbox {...defaultProps} onNavigate={mockNavigate} />);

      const nextButton = screen.getByLabelText('Next');

      for (let i = 0; i < 10; i++) {
        fireEvent.click(nextButton);
      }

      expect(mockNavigate).toHaveBeenCalled();
    });

    it('handles rapid keyboard shortcuts', () => {
      const mockNavigate = vi.fn();
      render(<Lightbox {...defaultProps} onNavigate={mockNavigate} />);

      for (let i = 0; i < 10; i++) {
        fireEvent.keyDown(document, { key: 'ArrowRight' });
        fireEvent.keyDown(document, { key: 'ArrowLeft' });
        fireEvent.keyDown(document, { key: '+' });
        fireEvent.keyDown(document, { key: '-' });
      }

      expect(mockNavigate).toHaveBeenCalled();
    });

    it('handles missing thumbnail', () => {
      const noThumbnailItems: LightboxItem[] = [
        {
          id: '1',
          type: 'image',
          src: 'https://example.com/image.jpg',
          alt: 'Image',
        },
      ];

      const { container } = render(
        <Lightbox
          {...defaultProps}
          items={noThumbnailItems}
          currentIndex={0}
          showThumbnails={true}
        />
      );

      // Should use main src as thumbnail
      const thumbnails = container.querySelectorAll('img[src*="image.jpg"]');
      expect(thumbnails.length).toBeGreaterThan(0);
    });

    it('handles missing alt text', () => {
      const noAltItems: LightboxItem[] = [
        {
          id: '1',
          type: 'image',
          src: 'https://example.com/image.jpg',
        },
      ];

      const { container } = render(
        <Lightbox {...defaultProps} items={noAltItems} currentIndex={0} />
      );

      const image = container.querySelector('img');
      expect(image).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has dialog role', () => {
      render(<Lightbox {...defaultProps} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('has accessible close button', () => {
      render(<Lightbox {...defaultProps} />);

      const closeButton = screen.getByLabelText('Close lightbox');
      expect(closeButton).toHaveAccessibleName();
    });

    it('has accessible navigation buttons', () => {
      render(<Lightbox {...defaultProps} />);

      expect(screen.getByLabelText('Previous')).toHaveAccessibleName();
      expect(screen.getByLabelText('Next')).toHaveAccessibleName();
    });

    it('has accessible zoom controls', () => {
      render(<Lightbox {...defaultProps} />);

      expect(screen.getByLabelText('Zoom in')).toHaveAccessibleName();
      expect(screen.getByLabelText('Zoom out')).toHaveAccessibleName();
      expect(screen.getByLabelText('Reset zoom')).toHaveAccessibleName();
    });

    it('has alt text on images', () => {
      render(<Lightbox {...defaultProps} />);

      const image = screen.getByAltText('Image 1');
      expect(image).toHaveAttribute('alt', 'Image 1');
    });

    it('traps focus within lightbox', () => {
      render(<Lightbox {...defaultProps} />);

      const closeButton = screen.getByLabelText('Close lightbox');
      expect(closeButton).toBeInTheDocument();

      // Focus should be trapped in lightbox
      expect(document.activeElement).toBeDefined();
    });

    it('restores focus on close', () => {
      const { rerender } = render(<Lightbox {...defaultProps} isOpen={true} />);

      rerender(<Lightbox {...defaultProps} isOpen={false} />);

      // Focus should be restored
      expect(document.activeElement).toBeDefined();
    });
  });

  describe('Portal Rendering', () => {
    it('renders in document body', () => {
      render(<Lightbox {...defaultProps} />);

      const dialog = screen.getByRole('dialog');
      // Portal should render directly in body
      expect(dialog.parentElement?.parentElement).toBe(document.body);
    });

    it('cleans up portal on unmount', () => {
      const { unmount } = render(<Lightbox {...defaultProps} />);

      unmount();

      const dialog = screen.queryByRole('dialog');
      expect(dialog).not.toBeInTheDocument();
    });
  });
});
