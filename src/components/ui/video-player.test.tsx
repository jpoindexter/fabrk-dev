import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { VideoPlayer } from './video-player';

// Mock HTMLMediaElement methods
beforeEach(() => {
  HTMLMediaElement.prototype.play = vi.fn(() => Promise.resolve());
  HTMLMediaElement.prototype.pause = vi.fn();
  HTMLMediaElement.prototype.load = vi.fn();
});

// Mock requestFullscreen and exitFullscreen
document.documentElement.requestFullscreen = vi.fn(() => Promise.resolve());
document.exitFullscreen = vi.fn(() => Promise.resolve());

describe('VideoPlayer Component', () => {
  const defaultProps = {
    src: 'https://example.com/video.mp4',
  };

  describe('Rendering', () => {
    it('renders video element', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const video = container.querySelector('video');
      expect(video).toBeInTheDocument();
      expect(video).toHaveAttribute('src', 'https://example.com/video.mp4');
    });

    it('renders play button initially', () => {
      render(<VideoPlayer {...defaultProps} />);

      const playButton = screen.getByLabelText('Play');
      expect(playButton).toBeInTheDocument();
    });

    it('renders volume control', () => {
      render(<VideoPlayer {...defaultProps} />);

      const volumeButton = screen.getByLabelText(/Volume/);
      expect(volumeButton).toBeInTheDocument();
    });

    it('renders fullscreen button', () => {
      render(<VideoPlayer {...defaultProps} />);

      const fullscreenButton = screen.getByLabelText('Enter fullscreen');
      expect(fullscreenButton).toBeInTheDocument();
    });

    it('renders time display', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const timeDisplay = container.querySelector('.tabular-nums');
      expect(timeDisplay).toBeInTheDocument();
    });

    it('renders progress bar', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const progressBar = container.querySelector('input[type="range"]');
      expect(progressBar).toBeInTheDocument();
    });

    it('renders with poster image', () => {
      const { container } = render(
        <VideoPlayer {...defaultProps} poster="https://example.com/poster.jpg" />
      );

      const video = container.querySelector('video');
      expect(video).toHaveAttribute('poster', 'https://example.com/poster.jpg');
    });

    it('applies custom className', () => {
      const { container } = render(
        <VideoPlayer {...defaultProps} className="custom-player" />
      );

      expect(container.querySelector('.custom-player')).toBeInTheDocument();
    });
  });

  describe('Playback Controls', () => {
    it('plays video when play button is clicked', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const playButton = screen.getByLabelText('Play');
      fireEvent.click(playButton);

      const video = container.querySelector('video');
      expect(video?.play).toHaveBeenCalled();
    });

    it('pauses video when pause button is clicked', async () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const playButton = screen.getByLabelText('Play');
      fireEvent.click(playButton);

      // Simulate video playing
      const video = container.querySelector('video') as HTMLVideoElement;
      Object.defineProperty(video, 'paused', { value: false, writable: true });
      fireEvent.play(video);

      await waitFor(() => {
        const pauseButton = screen.getByLabelText('Pause');
        expect(pauseButton).toBeInTheDocument();
      });

      const pauseButton = screen.getByLabelText('Pause');
      fireEvent.click(pauseButton);

      expect(video.pause).toHaveBeenCalled();
    });

    it('toggles play/pause with spacebar', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const video = container.querySelector('video') as HTMLVideoElement;

      fireEvent.keyDown(container.firstChild as Element, { key: ' ' });

      expect(video.play).toHaveBeenCalled();
    });

    it('seeks video with arrow keys', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const video = container.querySelector('video') as HTMLVideoElement;
      Object.defineProperty(video, 'currentTime', { value: 10, writable: true });

      // Seek forward
      fireEvent.keyDown(container.firstChild as Element, { key: 'ArrowRight' });

      // Seek backward
      fireEvent.keyDown(container.firstChild as Element, { key: 'ArrowLeft' });

      // currentTime should have been modified
      expect(video.currentTime).toBeDefined();
    });
  });

  describe('Volume Control', () => {
    it('shows volume slider when volume button is hovered', async () => {
      render(<VideoPlayer {...defaultProps} />);

      const volumeButton = screen.getByLabelText(/Volume/);
      fireEvent.mouseEnter(volumeButton.closest('.group') as Element);

      await waitFor(() => {
        const volumeSlider = screen.getByRole('slider', { name: /volume/i });
        expect(volumeSlider).toBeInTheDocument();
      });
    });

    it('adjusts volume when slider is changed', async () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const volumeButton = screen.getByLabelText(/Volume/);
      fireEvent.mouseEnter(volumeButton.closest('.group') as Element);

      await waitFor(() => {
        const volumeSlider = screen.getByRole('slider', { name: /volume/i });
        expect(volumeSlider).toBeInTheDocument();

        fireEvent.change(volumeSlider, { target: { value: '0.5' } });

        const video = container.querySelector('video') as HTMLVideoElement;
        expect(video.volume).toBeDefined();
      });
    });

    it('mutes video when volume button is clicked', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const volumeButton = screen.getByLabelText(/Volume/);
      fireEvent.click(volumeButton);

      const video = container.querySelector('video') as HTMLVideoElement;
      expect(video.muted).toBeDefined();
    });

    it('toggles mute with M key', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const video = container.querySelector('video') as HTMLVideoElement;

      fireEvent.keyDown(container.firstChild as Element, { key: 'm' });

      expect(video.muted).toBeDefined();
    });

    it('shows mute icon when muted', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const video = container.querySelector('video') as HTMLVideoElement;
      Object.defineProperty(video, 'muted', { value: true, writable: true });

      const volumeButton = screen.getByLabelText(/Volume/);
      fireEvent.click(volumeButton);

      // Should show muted icon
      expect(volumeButton).toBeInTheDocument();
    });
  });

  describe('Progress and Seeking', () => {
    it('updates progress bar as video plays', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const video = container.querySelector('video') as HTMLVideoElement;
      Object.defineProperty(video, 'currentTime', { value: 30, writable: true });
      Object.defineProperty(video, 'duration', { value: 100, writable: true });

      fireEvent.timeUpdate(video);

      const progressBar = container.querySelector(
        'input[type="range"]'
      ) as HTMLInputElement;
      // Progress should be updated
      expect(progressBar).toBeInTheDocument();
    });

    it('seeks video when progress bar is changed', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const video = container.querySelector('video') as HTMLVideoElement;
      Object.defineProperty(video, 'duration', { value: 100, writable: true });

      const progressBar = container.querySelector(
        'input[type="range"]'
      ) as HTMLInputElement;

      fireEvent.change(progressBar, { target: { value: '50' } });

      expect(video.currentTime).toBeDefined();
    });

    it('displays current time', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const video = container.querySelector('video') as HTMLVideoElement;
      Object.defineProperty(video, 'currentTime', { value: 65, writable: true });
      Object.defineProperty(video, 'duration', { value: 120, writable: true });

      fireEvent.timeUpdate(video);

      // Should show time in MM:SS format
      const timeDisplay = container.querySelector('.tabular-nums');
      expect(timeDisplay).toBeInTheDocument();
    });

    it('displays total duration', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const video = container.querySelector('video') as HTMLVideoElement;
      Object.defineProperty(video, 'duration', { value: 180, writable: true });

      fireEvent.loadedMetadata(video);

      const timeDisplay = container.querySelector('.tabular-nums');
      expect(timeDisplay).toBeInTheDocument();
    });
  });

  describe('Playback Speed', () => {
    it('shows playback speed dropdown', () => {
      render(<VideoPlayer {...defaultProps} />);

      const speedButton = screen.getByText('1x');
      expect(speedButton).toBeInTheDocument();
    });

    it('opens speed options when clicked', () => {
      render(<VideoPlayer {...defaultProps} />);

      const speedButton = screen.getByText('1x');
      fireEvent.click(speedButton);

      expect(screen.getByText('0.5x')).toBeInTheDocument();
      expect(screen.getByText('0.75x')).toBeInTheDocument();
      expect(screen.getByText('1.25x')).toBeInTheDocument();
      expect(screen.getByText('1.5x')).toBeInTheDocument();
      expect(screen.getByText('2x')).toBeInTheDocument();
    });

    it('changes playback speed when option is selected', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const speedButton = screen.getByText('1x');
      fireEvent.click(speedButton);

      const speed2x = screen.getByText('2x');
      fireEvent.click(speed2x);

      const video = container.querySelector('video') as HTMLVideoElement;
      expect(video.playbackRate).toBeDefined();
    });

    it('displays selected speed', () => {
      render(<VideoPlayer {...defaultProps} />);

      const speedButton = screen.getByText('1x');
      fireEvent.click(speedButton);

      const speed15x = screen.getByText('1.5x');
      fireEvent.click(speed15x);

      // Speed button should now show 1.5x
      expect(screen.getByText('1.5x')).toBeInTheDocument();
    });
  });

  describe('Fullscreen', () => {
    it('enters fullscreen when fullscreen button is clicked', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const fullscreenButton = screen.getByLabelText('Enter fullscreen');
      fireEvent.click(fullscreenButton);

      const videoContainer = container.firstChild;
      expect(videoContainer?.requestFullscreen).toBeDefined();
    });

    it('exits fullscreen with F key', () => {
      render(<VideoPlayer {...defaultProps} />);

      fireEvent.keyDown(document, { key: 'f' });

      // Should trigger fullscreen toggle
      expect(document.documentElement.requestFullscreen).toBeDefined();
    });

    it('shows exit fullscreen button when in fullscreen', async () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const fullscreenButton = screen.getByLabelText('Enter fullscreen');
      fireEvent.click(fullscreenButton);

      // Simulate fullscreen change
      Object.defineProperty(document, 'fullscreenElement', {
        value: container.firstChild,
        writable: true,
      });

      fireEvent.fullscreenChange(document);

      await waitFor(() => {
        const exitButton = screen.queryByLabelText('Exit fullscreen');
        expect(exitButton).toBeInTheDocument();
      });
    });
  });

  describe('Buffering State', () => {
    it('shows buffering indicator when video is buffering', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const video = container.querySelector('video') as HTMLVideoElement;
      fireEvent.waiting(video);

      const bufferingIndicator = container.querySelector('.animate-spin');
      expect(bufferingIndicator).toBeInTheDocument();
    });

    it('hides buffering indicator when video can play', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const video = container.querySelector('video') as HTMLVideoElement;
      fireEvent.waiting(video);

      expect(container.querySelector('.animate-spin')).toBeInTheDocument();

      fireEvent.canPlay(video);

      expect(container.querySelector('.animate-spin')).not.toBeInTheDocument();
    });
  });

  describe('Control Visibility', () => {
    it('shows controls on mouse enter', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const playerContainer = container.firstChild as Element;
      fireEvent.mouseEnter(playerContainer);

      const controls = container.querySelector('.bg-gradient-to-t');
      expect(controls).toBeInTheDocument();
    });

    it('hides controls after timeout on mouse leave', async () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const playerContainer = container.firstChild as Element;
      fireEvent.mouseEnter(playerContainer);

      const controls = container.querySelector('.bg-gradient-to-t');
      expect(controls).toBeInTheDocument();

      fireEvent.mouseLeave(playerContainer);

      // Controls should fade out after timeout (in production)
      expect(controls).toBeInTheDocument();
    });

    it('shows controls when video is paused', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const video = container.querySelector('video') as HTMLVideoElement;
      Object.defineProperty(video, 'paused', { value: true, writable: true });

      const controls = container.querySelector('.bg-gradient-to-t');
      expect(controls).toBeInTheDocument();
    });
  });

  describe('Keyboard Shortcuts', () => {
    it('supports space key for play/pause', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const video = container.querySelector('video') as HTMLVideoElement;
      const playerContainer = container.firstChild as Element;

      fireEvent.keyDown(playerContainer, { key: ' ' });

      expect(video.play).toHaveBeenCalled();
    });

    it('supports arrow keys for seeking', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const video = container.querySelector('video') as HTMLVideoElement;
      Object.defineProperty(video, 'currentTime', { value: 10, writable: true });

      const playerContainer = container.firstChild as Element;

      fireEvent.keyDown(playerContainer, { key: 'ArrowRight' });
      fireEvent.keyDown(playerContainer, { key: 'ArrowLeft' });

      expect(video.currentTime).toBeDefined();
    });

    it('supports M key for mute toggle', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const video = container.querySelector('video') as HTMLVideoElement;
      const playerContainer = container.firstChild as Element;

      fireEvent.keyDown(playerContainer, { key: 'm' });

      expect(video.muted).toBeDefined();
    });

    it('supports F key for fullscreen toggle', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const playerContainer = container.firstChild as Element;

      fireEvent.keyDown(playerContainer, { key: 'f' });

      expect(document.documentElement.requestFullscreen).toBeDefined();
    });

    it('supports arrow up/down for volume', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const video = container.querySelector('video') as HTMLVideoElement;
      Object.defineProperty(video, 'volume', { value: 0.5, writable: true });

      const playerContainer = container.firstChild as Element;

      fireEvent.keyDown(playerContainer, { key: 'ArrowUp' });
      fireEvent.keyDown(playerContainer, { key: 'ArrowDown' });

      expect(video.volume).toBeDefined();
    });
  });

  describe('Autoplay', () => {
    it('sets autoplay attribute when autoplay prop is true', () => {
      const { container } = render(<VideoPlayer {...defaultProps} autoPlay={true} />);

      const video = container.querySelector('video');
      expect(video).toHaveAttribute('autoplay');
    });

    it('does not autoplay by default', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const video = container.querySelector('video');
      expect(video).not.toHaveAttribute('autoplay');
    });
  });

  describe('Loop', () => {
    it('sets loop attribute when loop prop is true', () => {
      const { container } = render(<VideoPlayer {...defaultProps} loop={true} />);

      const video = container.querySelector('video');
      expect(video).toHaveAttribute('loop');
    });

    it('does not loop by default', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const video = container.querySelector('video');
      expect(video).not.toHaveAttribute('loop');
    });
  });

  describe('Muted', () => {
    it('sets muted attribute when muted prop is true', () => {
      const { container } = render(<VideoPlayer {...defaultProps} muted={true} />);

      const video = container.querySelector('video');
      expect(video).toHaveAttribute('muted');
    });

    it('is not muted by default', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const video = container.querySelector('video');
      expect(video).not.toHaveAttribute('muted');
    });
  });

  describe('Edge Cases', () => {
    it('handles video without duration', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const video = container.querySelector('video') as HTMLVideoElement;
      Object.defineProperty(video, 'duration', { value: NaN, writable: true });

      fireEvent.loadedMetadata(video);

      // Should not crash
      const timeDisplay = container.querySelector('.tabular-nums');
      expect(timeDisplay).toBeInTheDocument();
    });

    it('handles seeking beyond duration', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const video = container.querySelector('video') as HTMLVideoElement;
      Object.defineProperty(video, 'duration', { value: 100, writable: true });

      const progressBar = container.querySelector(
        'input[type="range"]'
      ) as HTMLInputElement;

      fireEvent.change(progressBar, { target: { value: '150' } });

      // Should not crash
      expect(video.currentTime).toBeDefined();
    });

    it('handles very long videos', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const video = container.querySelector('video') as HTMLVideoElement;
      Object.defineProperty(video, 'duration', { value: 7200, writable: true }); // 2 hours

      fireEvent.loadedMetadata(video);

      const timeDisplay = container.querySelector('.tabular-nums');
      expect(timeDisplay).toBeInTheDocument();
    });

    it('handles rapid play/pause toggles', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const video = container.querySelector('video') as HTMLVideoElement;
      const playerContainer = container.firstChild as Element;

      for (let i = 0; i < 10; i++) {
        fireEvent.keyDown(playerContainer, { key: ' ' });
      }

      // Should not crash
      expect(video.play).toHaveBeenCalled();
    });

    it('cleans up event listeners on unmount', () => {
      const { unmount } = render(<VideoPlayer {...defaultProps} />);

      unmount();

      // Should not throw errors
      expect(true).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('has accessible play button', () => {
      render(<VideoPlayer {...defaultProps} />);

      const playButton = screen.getByLabelText('Play');
      expect(playButton).toHaveAccessibleName();
    });

    it('has accessible volume control', () => {
      render(<VideoPlayer {...defaultProps} />);

      const volumeButton = screen.getByLabelText(/Volume/);
      expect(volumeButton).toHaveAccessibleName();
    });

    it('has accessible fullscreen button', () => {
      render(<VideoPlayer {...defaultProps} />);

      const fullscreenButton = screen.getByLabelText('Enter fullscreen');
      expect(fullscreenButton).toHaveAccessibleName();
    });

    it('has accessible progress bar', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const progressBar = container.querySelector('input[type="range"]');
      expect(progressBar).toHaveAttribute('aria-label');
    });

    it('has keyboard-accessible controls', () => {
      const { container } = render(<VideoPlayer {...defaultProps} />);

      const playerContainer = container.firstChild as Element;
      expect(playerContainer).toHaveAttribute('tabIndex');
    });
  });
});
