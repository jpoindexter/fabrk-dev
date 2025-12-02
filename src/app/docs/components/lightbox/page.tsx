"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Lightbox, type LightboxItem } from "@/components/ui/lightbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LightboxPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [withThumbnails, setWithThumbnails] = useState(false);
  const [withoutZoom, setWithoutZoom] = useState(false);

  const sampleImages: LightboxItem[] = [
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=800&fit=crop",
      alt: "Mountain landscape",
      caption: "Beautiful mountain landscape at sunset",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop",
      alt: "Forest path",
      caption: "Serene forest path through tall trees",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=800&fit=crop",
      alt: "Lake sunset",
      caption: "Peaceful lake at golden hour",
    },
  ];

  return (
    <ComponentShowcaseTemplate
      code="[UI.88]"
      category="Components"
      title="Lightbox"
      description="Full-screen image and video viewer with navigation, zoom, and keyboard controls."
      importCode={`import { Lightbox, type LightboxItem } from "@/components/ui/lightbox"`}
      mainPreview={{
        preview: (
          <>
            <Button onClick={() => setIsOpen(true)}>
              Open Lightbox Gallery
            </Button>
            <Lightbox
              items={sampleImages}
              currentIndex={currentIndex}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              onNavigate={setCurrentIndex}
            />
          </>
        ),
        code: `const [isOpen, setIsOpen] = useState(false);
const [currentIndex, setCurrentIndex] = useState(0);

const items: LightboxItem[] = [
  {
    type: "image",
    src: "/image1.jpg",
    alt: "Image 1",
    caption: "First image caption",
  },
  {
    type: "image",
    src: "/image2.jpg",
    alt: "Image 2",
    caption: "Second image caption",
  },
];

<Button onClick={() => setIsOpen(true)}>
  Open Gallery
</Button>

<Lightbox
  items={items}
  currentIndex={currentIndex}
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onNavigate={setCurrentIndex}
/>`,
      }}
      variants={[
        {
          title: "Single Image",
          description: "Lightbox displaying a single image.",
          preview: (
            <Button onClick={() => { setCurrentIndex(0); setIsOpen(true); }}>
              View Single Image
            </Button>
          ),
          code: `const singleImage: LightboxItem[] = [
  {
    type: "image",
    src: "/image.jpg",
    alt: "Image",
  },
];

<Lightbox
  items={singleImage}
  currentIndex={0}
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
/>`,
        },
        {
          title: "With Thumbnails",
          description: "Lightbox with thumbnail navigation strip.",
          preview: (
            <>
              <Button onClick={() => { setWithThumbnails(true); setIsOpen(true); }}>
                Open with Thumbnails
              </Button>
              <Lightbox
                items={sampleImages}
                currentIndex={currentIndex}
                isOpen={isOpen && withThumbnails}
                onClose={() => { setIsOpen(false); setWithThumbnails(false); }}
                onNavigate={setCurrentIndex}
                showThumbnails
              />
            </>
          ),
          code: `<Lightbox
  items={items}
  currentIndex={currentIndex}
  isOpen={isOpen}
  onClose={onClose}
  onNavigate={setCurrentIndex}
  showThumbnails
/>`,
        },
        {
          title: "Without Zoom",
          description: "Lightbox with zoom controls disabled.",
          preview: (
            <>
              <Button onClick={() => { setWithoutZoom(true); setIsOpen(true); }}>
                Open without Zoom
              </Button>
              <Lightbox
                items={sampleImages}
                currentIndex={currentIndex}
                isOpen={isOpen && withoutZoom}
                onClose={() => { setIsOpen(false); setWithoutZoom(false); }}
                onNavigate={setCurrentIndex}
                enableZoom={false}
              />
            </>
          ),
          code: `<Lightbox
  items={items}
  currentIndex={currentIndex}
  isOpen={isOpen}
  onClose={onClose}
  onNavigate={setCurrentIndex}
  enableZoom={false}
/>`,
        },
        {
          title: "With Video",
          description: "Lightbox supporting video playback.",
          preview: (
            <div className="font-mono text-xs text-muted-foreground">
              Video support with auto-play
            </div>
          ),
          code: `const mediaItems: LightboxItem[] = [
  {
    type: "image",
    src: "/image.jpg",
    alt: "Image",
  },
  {
    type: "video",
    src: "/video.mp4",
    caption: "Video caption",
  },
];

<Lightbox
  items={mediaItems}
  currentIndex={currentIndex}
  isOpen={isOpen}
  onClose={onClose}
  onNavigate={setCurrentIndex}
/>`,
        },
      ]}
      props={[
        {
          name: "items",
          type: "LightboxItem[]",
          description: "Array of images/videos to display in the lightbox.",
          required: true,
        },
        {
          name: "currentIndex",
          type: "number",
          description: "Index of the currently displayed item.",
          required: true,
        },
        {
          name: "isOpen",
          type: "boolean",
          description: "Whether the lightbox is open.",
          required: true,
        },
        {
          name: "onClose",
          type: "() => void",
          description: "Callback fired when lightbox is closed.",
          required: true,
        },
        {
          name: "onNavigate",
          type: "(index: number) => void",
          description: "Callback fired when navigating between items.",
        },
        {
          name: "showThumbnails",
          type: "boolean",
          default: "false",
          description: "Show thumbnail navigation strip at bottom.",
        },
        {
          name: "enableZoom",
          type: "boolean",
          default: "true",
          description: "Enable zoom controls for images.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
        },
      ]}
      accessibility={[
        "Full keyboard navigation support (Arrow keys, Escape, +/-)",
        "ARIA dialog role with modal=true",
        "Focus trap keeps focus within lightbox when open",
        "Descriptive ARIA labels for all controls",
        "Screen reader announces current image number",
        "Video controls are keyboard accessible",
        "Close on Escape key press",
        "Body scroll locked when lightbox is open",
      ]}
      previous={{ title: "Loading", href: "/docs/components/loading" }}
      next={{ title: "Member Card", href: "/docs/components/member-card" }}
    />
  );
}
