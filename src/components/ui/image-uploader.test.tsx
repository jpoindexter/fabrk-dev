import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ImageUploader } from './image-uploader';

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = vi.fn();

describe('ImageUploader Component', () => {
  const defaultProps = {
    onUpload: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders upload area', () => {
      render(<ImageUploader {...defaultProps} />);

      expect(screen.getByText('Drop images here or click to browse')).toBeInTheDocument();
    });

    it('renders upload icon', () => {
      const { container } = render(<ImageUploader {...defaultProps} />);

      // Upload icon should be present
      const icon = container.querySelector('.h-12.w-12');
      expect(icon).toBeInTheDocument();
    });

    it('shows supported formats', () => {
      render(<ImageUploader {...defaultProps} />);

      expect(screen.getByText(/Supported formats:/)).toBeInTheDocument();
      expect(screen.getByText(/JPG, PNG, GIF, WebP/)).toBeInTheDocument();
    });

    it('shows default max size', () => {
      render(<ImageUploader {...defaultProps} />);

      expect(screen.getByText(/Max size: 5MB/)).toBeInTheDocument();
    });

    it('shows custom max size', () => {
      render(<ImageUploader {...defaultProps} maxSize={10} />);

      expect(screen.getByText(/Max size: 10MB/)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <ImageUploader {...defaultProps} className="custom-uploader" />
      );

      expect(container.querySelector('.custom-uploader')).toBeInTheDocument();
    });
  });

  describe('File Selection', () => {
    it('opens file picker when upload area is clicked', () => {
      const { container } = render(<ImageUploader {...defaultProps} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const clickSpy = vi.spyOn(fileInput, 'click');

      const uploadArea = screen.getByText('Drop images here or click to browse').closest('div');
      if (uploadArea) {
        fireEvent.click(uploadArea);
        expect(clickSpy).toHaveBeenCalled();
      }
    });

    it('accepts only image files', () => {
      const { container } = render(<ImageUploader {...defaultProps} />);

      const fileInput = container.querySelector('input[type="file"]');
      expect(fileInput).toHaveAttribute('accept', 'image/*');
    });

    it('allows multiple files by default', () => {
      const { container } = render(<ImageUploader {...defaultProps} />);

      const fileInput = container.querySelector('input[type="file"]');
      expect(fileInput).toHaveAttribute('multiple');
    });

    it('allows single file when multiple is false', () => {
      const { container } = render(
        <ImageUploader {...defaultProps} multiple={false} />
      );

      const fileInput = container.querySelector('input[type="file"]');
      expect(fileInput).not.toHaveAttribute('multiple');
    });

    it('calls onUpload when files are selected', () => {
      const mockUpload = vi.fn();
      const { container } = render(<ImageUploader onUpload={mockUpload} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' });

      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: false,
      });

      fireEvent.change(fileInput);

      expect(mockUpload).toHaveBeenCalledWith([file]);
    });

    it('handles multiple file selection', () => {
      const mockUpload = vi.fn();
      const { container } = render(<ImageUploader onUpload={mockUpload} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file1 = new File(['image1'], 'test1.jpg', { type: 'image/jpeg' });
      const file2 = new File(['image2'], 'test2.png', { type: 'image/png' });

      Object.defineProperty(fileInput, 'files', {
        value: [file1, file2],
        writable: false,
      });

      fireEvent.change(fileInput);

      expect(mockUpload).toHaveBeenCalledWith([file1, file2]);
    });
  });

  describe('Drag and Drop', () => {
    it('highlights drop zone on drag enter', () => {
      const { container } = render(<ImageUploader {...defaultProps} />);

      const dropZone = container.querySelector('.border-2');
      if (dropZone) {
        fireEvent.dragEnter(dropZone);

        // Should add highlight class
        expect(dropZone).toHaveClass('border-primary');
      }
    });

    it('removes highlight on drag leave', () => {
      const { container } = render(<ImageUploader {...defaultProps} />);

      const dropZone = container.querySelector('.border-2');
      if (dropZone) {
        fireEvent.dragEnter(dropZone);
        expect(dropZone).toHaveClass('border-primary');

        fireEvent.dragLeave(dropZone);
        expect(dropZone).not.toHaveClass('border-primary');
      }
    });

    it('prevents default on drag over', () => {
      const { container } = render(<ImageUploader {...defaultProps} />);

      const dropZone = container.querySelector('.border-2');
      if (dropZone) {
        const event = new Event('dragover', { bubbles: true, cancelable: true });
        const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

        dropZone.dispatchEvent(event);

        expect(preventDefaultSpy).toHaveBeenCalled();
      }
    });

    it('handles file drop', () => {
      const mockUpload = vi.fn();
      const { container } = render(<ImageUploader onUpload={mockUpload} />);

      const dropZone = container.querySelector('.border-2');
      if (dropZone) {
        const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' });
        const dataTransfer = {
          files: [file],
          items: [{ kind: 'file', type: 'image/jpeg' }],
          types: ['Files'],
        };

        fireEvent.drop(dropZone, { dataTransfer });

        expect(mockUpload).toHaveBeenCalledWith([file]);
      }
    });

    it('removes highlight after drop', () => {
      const { container } = render(<ImageUploader {...defaultProps} />);

      const dropZone = container.querySelector('.border-2');
      if (dropZone) {
        fireEvent.dragEnter(dropZone);
        expect(dropZone).toHaveClass('border-primary');

        const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' });
        const dataTransfer = { files: [file] };

        fireEvent.drop(dropZone, { dataTransfer });

        expect(dropZone).not.toHaveClass('border-primary');
      }
    });
  });

  describe('File Validation', () => {
    it('validates file size', () => {
      const mockUpload = vi.fn();
      const { container } = render(<ImageUploader onUpload={mockUpload} maxSize={1} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      // Create 2MB file (exceeds 1MB limit)
      const largeFile = new File(['x'.repeat(2 * 1024 * 1024)], 'large.jpg', {
        type: 'image/jpeg',
      });

      Object.defineProperty(fileInput, 'files', {
        value: [largeFile],
        writable: false,
      });

      fireEvent.change(fileInput);

      // Should show error message
      expect(screen.getByText(/exceeds maximum size/i)).toBeInTheDocument();
      expect(mockUpload).not.toHaveBeenCalled();
    });

    it('validates file type', () => {
      const mockUpload = vi.fn();
      const { container } = render(<ImageUploader onUpload={mockUpload} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const invalidFile = new File(['content'], 'test.txt', { type: 'text/plain' });

      Object.defineProperty(fileInput, 'files', {
        value: [invalidFile],
        writable: false,
      });

      fireEvent.change(fileInput);

      // Should show error message
      expect(screen.getByText(/Invalid file type/i)).toBeInTheDocument();
      expect(mockUpload).not.toHaveBeenCalled();
    });

    it('validates max file count', () => {
      const mockUpload = vi.fn();
      const { container } = render(<ImageUploader onUpload={mockUpload} maxFiles={2} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const files = [
        new File(['1'], 'test1.jpg', { type: 'image/jpeg' }),
        new File(['2'], 'test2.jpg', { type: 'image/jpeg' }),
        new File(['3'], 'test3.jpg', { type: 'image/jpeg' }),
      ];

      Object.defineProperty(fileInput, 'files', {
        value: files,
        writable: false,
      });

      fireEvent.change(fileInput);

      // Should show error message
      expect(screen.getByText(/Maximum 2 files allowed/i)).toBeInTheDocument();
      expect(mockUpload).not.toHaveBeenCalled();
    });

    it('accepts valid files', () => {
      const mockUpload = vi.fn();
      const { container } = render(<ImageUploader onUpload={mockUpload} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const validFile = new File(['image'], 'test.jpg', { type: 'image/jpeg' });

      Object.defineProperty(fileInput, 'files', {
        value: [validFile],
        writable: false,
      });

      fireEvent.change(fileInput);

      expect(mockUpload).toHaveBeenCalledWith([validFile]);
      expect(screen.queryByText(/Invalid file/i)).not.toBeInTheDocument();
    });
  });

  describe('Preview Display', () => {
    it('shows preview after file selection', () => {
      const { container } = render(<ImageUploader {...defaultProps} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' });

      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: false,
      });

      fireEvent.change(fileInput);

      // Preview should be displayed
      expect(screen.getByText('test.jpg')).toBeInTheDocument();
    });

    it('generates preview URL for images', () => {
      const { container } = render(<ImageUploader {...defaultProps} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' });

      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: false,
      });

      fireEvent.change(fileInput);

      expect(URL.createObjectURL).toHaveBeenCalledWith(file);
    });

    it('shows file name in preview', () => {
      const { container } = render(<ImageUploader {...defaultProps} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['image'], 'my-photo.jpg', { type: 'image/jpeg' });

      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: false,
      });

      fireEvent.change(fileInput);

      expect(screen.getByText('my-photo.jpg')).toBeInTheDocument();
    });

    it('shows file size in preview', () => {
      const { container } = render(<ImageUploader {...defaultProps} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      // Create 1024 byte file (1 KB)
      const file = new File(['x'.repeat(1024)], 'test.jpg', { type: 'image/jpeg' });

      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: false,
      });

      fireEvent.change(fileInput);

      // Should show file size
      expect(screen.getByText(/1.0 KB/)).toBeInTheDocument();
    });

    it('shows multiple previews for multiple files', () => {
      const { container } = render(<ImageUploader {...defaultProps} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file1 = new File(['1'], 'photo1.jpg', { type: 'image/jpeg' });
      const file2 = new File(['2'], 'photo2.png', { type: 'image/png' });

      Object.defineProperty(fileInput, 'files', {
        value: [file1, file2],
        writable: false,
      });

      fireEvent.change(fileInput);

      expect(screen.getByText('photo1.jpg')).toBeInTheDocument();
      expect(screen.getByText('photo2.png')).toBeInTheDocument();
    });
  });

  describe('File Removal', () => {
    it('shows remove button on preview', () => {
      const { container } = render(<ImageUploader {...defaultProps} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' });

      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: false,
      });

      fireEvent.change(fileInput);

      // Remove button should be present
      const removeButton = container.querySelector('[aria-label="Remove file"]');
      expect(removeButton).toBeInTheDocument();
    });

    it('removes file when remove button is clicked', () => {
      const { container } = render(<ImageUploader {...defaultProps} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' });

      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: false,
      });

      fireEvent.change(fileInput);

      const removeButton = container.querySelector('[aria-label="Remove file"]');
      if (removeButton) {
        fireEvent.click(removeButton);

        // Preview should be removed
        expect(screen.queryByText('test.jpg')).not.toBeInTheDocument();
      }
    });

    it('revokes object URL when file is removed', () => {
      const { container } = render(<ImageUploader {...defaultProps} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' });

      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: false,
      });

      fireEvent.change(fileInput);

      const removeButton = container.querySelector('[aria-label="Remove file"]');
      if (removeButton) {
        fireEvent.click(removeButton);

        expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
      }
    });
  });

  describe('Upload Progress', () => {
    it('shows uploading state when uploading', () => {
      render(<ImageUploader {...defaultProps} uploading={true} />);

      expect(screen.getByText('Uploading...')).toBeInTheDocument();
    });

    it('shows progress bar when uploading', () => {
      const { container } = render(
        <ImageUploader {...defaultProps} uploading={true} progress={50} />
      );

      const progressBar = container.querySelector('[role="progressbar"]');
      expect(progressBar).toBeInTheDocument();
    });

    it('displays correct progress percentage', () => {
      render(<ImageUploader {...defaultProps} uploading={true} progress={75} />);

      expect(screen.getByText('75%')).toBeInTheDocument();
    });

    it('disables input during upload', () => {
      const { container } = render(<ImageUploader {...defaultProps} uploading={true} />);

      const fileInput = container.querySelector('input[type="file"]');
      expect(fileInput).toBeDisabled();
    });

    it('shows spinner during upload', () => {
      const { container } = render(<ImageUploader {...defaultProps} uploading={true} />);

      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('disables file input when disabled', () => {
      const { container } = render(<ImageUploader {...defaultProps} disabled={true} />);

      const fileInput = container.querySelector('input[type="file"]');
      expect(fileInput).toBeDisabled();
    });

    it('applies disabled styling', () => {
      const { container } = render(<ImageUploader {...defaultProps} disabled={true} />);

      const dropZone = container.querySelector('.border-2');
      expect(dropZone).toHaveClass('opacity-50');
      expect(dropZone).toHaveClass('cursor-not-allowed');
    });

    it('does not trigger onUpload when disabled', () => {
      const mockUpload = vi.fn();
      const { container } = render(
        <ImageUploader onUpload={mockUpload} disabled={true} />
      );

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' });

      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: false,
      });

      fireEvent.change(fileInput);

      expect(mockUpload).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('displays error message', () => {
      render(<ImageUploader {...defaultProps} error="Upload failed" />);

      expect(screen.getByText('Upload failed')).toBeInTheDocument();
    });

    it('shows error icon', () => {
      const { container } = render(
        <ImageUploader {...defaultProps} error="Upload failed" />
      );

      const errorIcon = container.querySelector('.text-destructive');
      expect(errorIcon).toBeInTheDocument();
    });

    it('applies error styling to drop zone', () => {
      const { container } = render(
        <ImageUploader {...defaultProps} error="Upload failed" />
      );

      const dropZone = container.querySelector('.border-2');
      expect(dropZone).toHaveClass('border-destructive');
    });

    it('clears error when new file is selected', () => {
      const { container, rerender } = render(
        <ImageUploader {...defaultProps} error="Upload failed" />
      );

      expect(screen.getByText('Upload failed')).toBeInTheDocument();

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' });

      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: false,
      });

      fireEvent.change(fileInput);

      rerender(<ImageUploader {...defaultProps} />);

      expect(screen.queryByText('Upload failed')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles no files selected', () => {
      const mockUpload = vi.fn();
      const { container } = render(<ImageUploader onUpload={mockUpload} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;

      Object.defineProperty(fileInput, 'files', {
        value: [],
        writable: false,
      });

      fireEvent.change(fileInput);

      expect(mockUpload).not.toHaveBeenCalled();
    });

    it('handles very large file names', () => {
      const { container } = render(<ImageUploader {...defaultProps} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const longName = 'a'.repeat(200) + '.jpg';
      const file = new File(['image'], longName, { type: 'image/jpeg' });

      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: false,
      });

      fireEvent.change(fileInput);

      expect(screen.getByText(longName)).toBeInTheDocument();
    });

    it('handles files with special characters in names', () => {
      const { container } = render(<ImageUploader {...defaultProps} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const specialName = 'test@#$%^&*().jpg';
      const file = new File(['image'], specialName, { type: 'image/jpeg' });

      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: false,
      });

      fireEvent.change(fileInput);

      expect(screen.getByText(specialName)).toBeInTheDocument();
    });

    it('handles rapid file selection changes', () => {
      const mockUpload = vi.fn();
      const { container } = render(<ImageUploader onUpload={mockUpload} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;

      for (let i = 0; i < 5; i++) {
        const file = new File(['image'], `test${i}.jpg`, { type: 'image/jpeg' });

        Object.defineProperty(fileInput, 'files', {
          value: [file],
          writable: false,
        });

        fireEvent.change(fileInput);
      }

      expect(mockUpload).toHaveBeenCalledTimes(5);
    });

    it('handles null dataTransfer in drop event', () => {
      const mockUpload = vi.fn();
      const { container } = render(<ImageUploader onUpload={mockUpload} />);

      const dropZone = container.querySelector('.border-2');
      if (dropZone) {
        fireEvent.drop(dropZone, { dataTransfer: null });

        // Should not crash
        expect(mockUpload).not.toHaveBeenCalled();
      }
    });

    it('cleans up object URLs on unmount', () => {
      const { container, unmount } = render(<ImageUploader {...defaultProps} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' });

      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: false,
      });

      fireEvent.change(fileInput);

      unmount();

      expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
    });
  });

  describe('Accessibility', () => {
    it('has accessible file input', () => {
      const { container } = render(<ImageUploader {...defaultProps} />);

      const fileInput = container.querySelector('input[type="file"]');
      expect(fileInput).toBeInTheDocument();
      expect(fileInput).toHaveAttribute('aria-label');
    });

    it('has keyboard-accessible drop zone', () => {
      const { container } = render(<ImageUploader {...defaultProps} />);

      const dropZone = container.querySelector('.border-2');
      expect(dropZone).toHaveAttribute('tabIndex');
    });

    it('has aria-label on remove buttons', () => {
      const { container } = render(<ImageUploader {...defaultProps} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' });

      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: false,
      });

      fireEvent.change(fileInput);

      const removeButton = container.querySelector('[aria-label="Remove file"]');
      expect(removeButton).toBeInTheDocument();
    });

    it('has role="progressbar" on progress element', () => {
      const { container } = render(
        <ImageUploader {...defaultProps} uploading={true} progress={50} />
      );

      const progressBar = container.querySelector('[role="progressbar"]');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    });
  });
});
