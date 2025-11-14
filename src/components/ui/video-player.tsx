/**
 * Video Player Component
 * HTML5 video with custom neobrutalism controls.
 *
 * @example
 * ```tsx
 * <VideoPlayer src="/video.mp4" poster="/poster.jpg" />
 * ```
 */

"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Maximize,
  Pause,
  Play,
  Settings,
  Volume2,
  VolumeX,
  Loader2,
} from "lucide-react";
import * as React from "react";

export interface VideoPlayerProps {
  src: string | string[];
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  aspectRatio?: "16:9" | "4:3" | "1:1";
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  className?: string;
}

export const VideoPlayer = React.forwardRef<HTMLDivElement, VideoPlayerProps>(
  (
    {
      src,
      poster,
      autoplay = false,
      loop = false,
      muted = false,
      controls = true,
      aspectRatio = "16:9",
      onPlay,
      onPause,
      onEnded,
      className,
    },
    ref
  ) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const controlsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isMuted, setIsMuted] = React.useState(muted);
    const [volume, setVolume] = React.useState(1);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [buffered, setBuffered] = React.useState(0);
    const [isFullscreen, setIsFullscreen] = React.useState(false);
    const [playbackRate, setPlaybackRate] = React.useState(1);
    const [showControls, setShowControls] = React.useState(true);
    const [showSpeedMenu, setShowSpeedMenu] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const aspectRatioClass = {
      "16:9": "aspect-video",
      "4:3": "aspect-[4/3]",
      "1:1": "aspect-square",
    }[aspectRatio];

    // Format time as MM:SS
    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    // Play/Pause toggle
    const togglePlay = () => {
      if (!videoRef.current) return;

      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    };

    // Mute toggle
    const toggleMute = () => {
      if (!videoRef.current) return;
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    };

    // Volume change
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!videoRef.current) return;
      const newVolume = parseFloat(e.target.value);
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    };

    // Seek
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!videoRef.current) return;
      const newTime = parseFloat(e.target.value);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    };

    // Fullscreen toggle
    const toggleFullscreen = () => {
      if (!containerRef.current) return;

      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    };

    // Playback speed
    const handleSpeedChange = (speed: number) => {
      if (!videoRef.current) return;
      videoRef.current.playbackRate = speed;
      setPlaybackRate(speed);
      setShowSpeedMenu(false);
    };

    // Controls visibility timeout
    const resetControlsTimeout = () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }

      setShowControls(true);

      if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };

    // Video event handlers
    const handlePlay = () => {
      setIsPlaying(true);
      onPlay?.();
    };

    const handlePause = () => {
      setIsPlaying(false);
      onPause?.();
    };

    const handleTimeUpdate = () => {
      if (!videoRef.current) return;
      setCurrentTime(videoRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (!videoRef.current) return;
      setDuration(videoRef.current.duration);
      setIsLoading(false);
    };

    const handleProgress = () => {
      if (!videoRef.current || videoRef.current.buffered.length === 0) return;
      const bufferedEnd = videoRef.current.buffered.end(
        videoRef.current.buffered.length - 1
      );
      const bufferedPercent = (bufferedEnd / videoRef.current.duration) * 100;
      setBuffered(bufferedPercent);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    // Keyboard shortcuts
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!videoRef.current) return;

        switch (e.key.toLowerCase()) {
          case " ":
            e.preventDefault();
            togglePlay();
            break;
          case "f":
            e.preventDefault();
            toggleFullscreen();
            break;
          case "m":
            e.preventDefault();
            toggleMute();
            break;
          case "arrowleft":
            e.preventDefault();
            videoRef.current.currentTime = Math.max(
              0,
              videoRef.current.currentTime - 5
            );
            break;
          case "arrowright":
            e.preventDefault();
            videoRef.current.currentTime = Math.min(
              videoRef.current.duration,
              videoRef.current.currentTime + 5
            );
            break;
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Fullscreen change listener
    React.useEffect(() => {
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };

      document.addEventListener("fullscreenchange", handleFullscreenChange);
      return () =>
        document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    // Cleanup timeout
    React.useEffect(() => {
      return () => {
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }
      };
    }, []);

    const sources = Array.isArray(src) ? src : [src];

    return (
      <div
        ref={(node) => {
          // @ts-ignore - Handle both refs
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
          // @ts-ignore
          containerRef.current = node;
        }}
        className={cn(
          "relative overflow-hidden rounded-md border bg-black shadow-md",
          aspectRatioClass,
          className
        )}
        onMouseMove={resetControlsTimeout}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster={poster}
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
          playsInline
          onPlay={handlePlay}
          onPause={handlePause}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onProgress={handleProgress}
          onEnded={handleEnded}
          onWaiting={handleWaiting}
          onCanPlay={handleCanPlay}
        >
          {sources.map((source, index) => (
            <source key={index} src={source} />
          ))}
          Your browser does not support the video tag.
        </video>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        )}

        {/* Custom Controls */}
        {controls && (
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 bg-black/80 p-4 transition-all duration-300",
              showControls ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            )}
          >
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted/30">
                {/* Buffered Progress */}
                <div
                  className="absolute h-full bg-muted/50 transition-all"
                  style={{ width: `${buffered}%` }}
                />
                {/* Played Progress */}
                <div
                  className="absolute h-full bg-primary transition-all"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
                {/* Seek Input */}
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </div>
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between">
              {/* Left Controls */}
              <div className="flex items-center gap-2">
                {/* Play/Pause */}
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={togglePlay}
                  className="text-white hover:text-primary"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>

                {/* Volume */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={toggleMute}
                    className="text-white hover:text-primary"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </Button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-muted/30 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                  />
                </div>

                {/* Time Display */}
                <div className="text-sm text-white">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-2">
                {/* Playback Speed */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="text-white hover:text-primary"
                  >
                    <Settings className="mr-1 h-4 w-4" />
                    {playbackRate}x
                  </Button>
                  {showSpeedMenu && (
                    <div className="absolute bottom-full right-0 mb-2 rounded-md border bg-card shadow-md">
                      {[0.5, 1, 1.5, 2].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => handleSpeedChange(speed)}
                          className={cn(
                            "block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-primary hover:text-primary-foreground",
                            playbackRate === speed && "bg-muted"
                          )}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Fullscreen */}
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={toggleFullscreen}
                  className="text-white hover:text-primary"
                >
                  <Maximize className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";
