/**
 * ✅ FABRK COMPONENT
 * Video Embed - YouTube/Vimeo video player with fallback
 * Production-ready ✓
 *
 * EASY UPDATE: Change VIDEO_CONFIG below to point to your video
 */

"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

/**
 * VIDEO CONFIGURATION - Easy to update!
 *
 * To add your video:
 * 1. Upload to YouTube or Vimeo
 * 2. Update the videoId below
 * 3. Update title and description
 *
 * Supported platforms:
 * - YouTube: videoId = "dQw4w9WgXcQ" (from youtube.com/watch?v=...)
 * - Vimeo: videoId = "123456789" (from vimeo.com/...)
 */
const VIDEO_CONFIG = {
  platform: "youtube", // "youtube" or "vimeo"
  videoId: "dQw4w9WgXcQ", // Replace with your video ID
  title: "Fabrk 60-Second Demo",
  description: "See how Fabrk accelerates your SaaS launch with 100+ production-ready components",
};

interface VideoEmbedProps {
  className?: string;
  showTitle?: boolean;
}

export function VideoEmbed({ className, showTitle = true }: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Generate embed URL based on platform
  const embedUrl =
    VIDEO_CONFIG.platform === "youtube"
      ? `https://www.youtube.com/embed/${VIDEO_CONFIG.videoId}?autoplay=1&rel=0`
      : `https://player.vimeo.com/video/${VIDEO_CONFIG.videoId}?autoplay=1`;

  // Thumbnail URL for YouTube preview
  const thumbnailUrl =
    VIDEO_CONFIG.platform === "youtube"
      ? `https://img.youtube.com/vi/${VIDEO_CONFIG.videoId}/maxresdefault.jpg`
      : "https://via.placeholder.com/1280x720";

  return (
    <div className={className}>
      {showTitle && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {VIDEO_CONFIG.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {VIDEO_CONFIG.description}
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-lg border border-border shadow-lg"
      >
        {!isPlaying ? (
          // Thumbnail with play button
          <div
            className="group relative aspect-video w-full cursor-pointer overflow-hidden bg-black"
            onClick={() => setIsPlaying(true)}
            role="button"
            tabIndex={0}
            aria-label="Play video"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIsPlaying(true);
              }
            }}
          >
            <img
              src={thumbnailUrl}
              alt={VIDEO_CONFIG.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all duration-300 group-hover:bg-black/40">
              <div className="rounded-full bg-primary p-4 transition-transform duration-300 group-hover:scale-110">
                <Play className="size-8 fill-foreground text-foreground" />
              </div>
            </div>

            {/* Video duration (optional) */}
            <div className="absolute bottom-4 right-4 rounded bg-black/80 px-2 py-1 text-xs font-semibold text-foreground">
              1:00
            </div>
          </div>
        ) : (
          // Embedded video player
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src={embedUrl}
              title={VIDEO_CONFIG.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        )}
      </motion.div>

      {/* Fallback message if video not loaded */}
      {!isPlaying && (
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Click to play video • 60 seconds • No audio required
        </div>
      )}
    </div>
  );
}

/**
 * Section wrapper for video embed
 * Use this component to add video to your landing pages
 */
export function VideoSection() {
  return (
    <section className="border-t border-border bg-background py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <VideoEmbed />
      </div>
    </section>
  );
}
