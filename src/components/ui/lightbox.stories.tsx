/**
 * ✅ FABRK STORYBOOK
 * Lightbox component stories - Full-screen image/video viewer
 */

"use client";

import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Lightbox, type LightboxItem } from "./lightbox";
import { Button } from "./button";

const meta: Meta<typeof Lightbox> = {
  title: "UI/Lightbox",
  component: Lightbox,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Lightbox>;

// Sample images for stories
const sampleImages: LightboxItem[] = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1200&h=800&fit=crop",
    alt: "Mountain landscape",
    caption: "Beautiful mountain landscape at sunset",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1682687221038-404cb8830901?w=1200&h=800&fit=crop",
    alt: "Ocean waves",
    caption: "Crystal clear ocean waves",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=1200&h=800&fit=crop",
    alt: "Forest path",
    caption: "Peaceful forest path in autumn",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=1200&h=800&fit=crop",
    alt: "Desert dunes",
    caption: "Golden desert dunes at dawn",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1682687220945-922d38d53c22?w=1200&h=800&fit=crop",
    alt: "City skyline",
    caption: "Modern city skyline at night",
  },
];

const portraitImages: LightboxItem[] = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=1200&fit=crop",
    alt: "Portrait photo 1",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1682687221038-404cb8830901?w=800&h=1200&fit=crop",
    alt: "Portrait photo 2",
  },
];

const mixedMediaItems: LightboxItem[] = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1200&h=800&fit=crop",
    alt: "Image example",
    caption: "Sample image in gallery",
  },
  {
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    caption: "Sample video - Big Buck Bunny",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1682687221038-404cb8830901?w=1200&h=800&fit=crop",
    alt: "Another image",
    caption: "Back to images",
  },
];

// Interactive wrapper for stories
function LightboxStory({
  items,
  showThumbnails = false,
  enableZoom = true,
  defaultIndex = 0,
}: {
  items: LightboxItem[];
  showThumbnails?: boolean;
  enableZoom?: boolean;
  defaultIndex?: number;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(defaultIndex);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-8">
      <div className="space-y-4 text-center">
        <h3 className="text-2xl font-bold">Lightbox Demo</h3>
        <p className="text-muted-foreground">
          Click the button below to open the lightbox
        </p>
        <Button onClick={() => setIsOpen(true)}>Open Lightbox</Button>

        {items.length > 1 && (
          <div className="mt-8 grid grid-cols-3 gap-4 md:grid-cols-5">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsOpen(true);
                }}
                className="overflow-hidden rounded-brutal border-brutal shadow-brutal transition-all hover:shadow-brutal-lg"
              >
                {item.type === "image" ? (
                  <img
                    src={item.thumbnail || item.src}
                    alt={item.alt || `Thumbnail ${index + 1}`}
                    className="h-24 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-24 w-full items-center justify-center bg-muted">
                    <span className="text-xs font-bold">VIDEO</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        <Lightbox
          items={items}
          currentIndex={currentIndex}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onNavigate={setCurrentIndex}
          showThumbnails={showThumbnails}
          enableZoom={enableZoom}
        />
      </div>
    </div>
  );
}

export const SingleImage: Story = {
  render: () => <LightboxStory items={[sampleImages[0]]} />,
};

export const ImageGallery: Story = {
  render: () => <LightboxStory items={sampleImages} />,
};

export const WithCaptions: Story = {
  render: () => (
    <LightboxStory
      items={sampleImages.map((item) => ({
        ...item,
        caption: item.caption || "Sample caption for this image",
      }))}
    />
  ),
};

export const WithThumbnails: Story = {
  render: () => <LightboxStory items={sampleImages} showThumbnails={true} />,
};

export const MixedMedia: Story = {
  render: () => <LightboxStory items={mixedMediaItems} showThumbnails={true} />,
};

export const PortraitImages: Story = {
  render: () => <LightboxStory items={portraitImages} />,
};

export const WithZoomControls: Story = {
  render: () => (
    <LightboxStory items={sampleImages.slice(0, 3)} enableZoom={true} />
  ),
};

export const WithoutZoom: Story = {
  render: () => (
    <LightboxStory items={sampleImages.slice(0, 3)} enableZoom={false} />
  ),
};

export const KeyboardNavigation: Story = {
  render: () => (
    <div className="flex min-h-screen items-center justify-center bg-muted p-8">
      <div className="max-w-2xl space-y-4 text-center">
        <h3 className="text-2xl font-bold">Keyboard Navigation Demo</h3>
        <div className="space-y-2 rounded-brutal border-brutal bg-card p-6 text-left shadow-brutal">
          <p className="font-bold">Available keyboard shortcuts:</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>
              <kbd className="rounded border border-brutal bg-muted px-2 py-1 font-mono text-xs">
                Esc
              </kbd>{" "}
              - Close lightbox
            </li>
            <li>
              <kbd className="rounded border border-brutal bg-muted px-2 py-1 font-mono text-xs">
                ←
              </kbd>{" "}
              - Previous image
            </li>
            <li>
              <kbd className="rounded border border-brutal bg-muted px-2 py-1 font-mono text-xs">
                →
              </kbd>{" "}
              - Next image
            </li>
            <li>
              <kbd className="rounded border border-brutal bg-muted px-2 py-1 font-mono text-xs">
                +
              </kbd>{" "}
              - Zoom in
            </li>
            <li>
              <kbd className="rounded border border-brutal bg-muted px-2 py-1 font-mono text-xs">
                -
              </kbd>{" "}
              - Zoom out
            </li>
          </ul>
        </div>
        <LightboxStory items={sampleImages} />
      </div>
    </div>
  ),
};

export const ControlledExample: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [currentIndex, setCurrentIndex] = React.useState(0);

    return (
      <div className="flex min-h-screen items-center justify-center bg-muted p-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Controlled Component Example</h3>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Button onClick={() => setIsOpen(true)}>Open at Current</Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentIndex(0);
                  setIsOpen(true);
                }}
              >
                Open at First
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentIndex(sampleImages.length - 1);
                  setIsOpen(true);
                }}
              >
                Open at Last
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() =>
                  setCurrentIndex((prev) => Math.max(0, prev - 1))
                }
                disabled={currentIndex === 0}
              >
                Previous
              </Button>
              <span className="flex items-center px-4 font-mono text-sm">
                {currentIndex + 1} / {sampleImages.length}
              </span>
              <Button
                variant="secondary"
                onClick={() =>
                  setCurrentIndex((prev) =>
                    Math.min(sampleImages.length - 1, prev + 1)
                  )
                }
                disabled={currentIndex === sampleImages.length - 1}
              >
                Next
              </Button>
            </div>
          </div>

          <Lightbox
            items={sampleImages}
            currentIndex={currentIndex}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onNavigate={setCurrentIndex}
          />
        </div>
      </div>
    );
  },
};

export const OpeningFromGrid: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [currentIndex, setCurrentIndex] = React.useState(0);

    return (
      <div className="min-h-screen bg-muted p-8">
        <div className="mx-auto max-w-6xl space-y-4">
          <h3 className="text-2xl font-bold">Click any image to view</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {sampleImages.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsOpen(true);
                }}
                className="group overflow-hidden rounded-brutal border-brutal shadow-brutal transition-all hover:shadow-brutal-lg hover:-translate-y-1"
              >
                <div className="relative aspect-square">
                  <img
                    src={item.src}
                    alt={item.alt || `Image ${index + 1}`}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                </div>
                {item.caption && (
                  <div className="bg-card p-2 text-xs font-bold">
                    {item.caption}
                  </div>
                )}
              </button>
            ))}
          </div>

          <Lightbox
            items={sampleImages}
            currentIndex={currentIndex}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onNavigate={setCurrentIndex}
            showThumbnails={true}
            enableZoom={true}
          />
        </div>
      </div>
    );
  },
};
