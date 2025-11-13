/**
 * Video Player Stories
 * Showcases all video player features and variations.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { VideoPlayer } from "./video-player";

const meta = {
  title: "UI/VideoPlayer",
  component: VideoPlayer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    aspectRatio: {
      control: "select",
      options: ["16:9", "4:3", "1:1"],
    },
    autoplay: {
      control: "boolean",
    },
    loop: {
      control: "boolean",
    },
    muted: {
      control: "boolean",
    },
    controls: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof VideoPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Big Buck Bunny - Free test video
const BIG_BUCK_BUNNY_MP4 =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const BIG_BUCK_BUNNY_POSTER =
  "https://upload.wikimedia.org/wikipedia/commons/7/70/Big.Buck.Bunny.-.Opening.Screen.png";

// Sintel - Another free test video
const SINTEL_MP4 =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4";
const SINTEL_POSTER =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Sintel_poster.jpg/440px-Sintel_poster.jpg";

// Elephant's Dream - WebM format
const ELEPHANTS_DREAM_WEBM =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

export const Default: Story = {
  args: {
    src: BIG_BUCK_BUNNY_MP4,
    poster: BIG_BUCK_BUNNY_POSTER,
    aspectRatio: "16:9",
  },
  render: (args) => (
    <div className="w-[800px]">
      <VideoPlayer {...args} />
    </div>
  ),
};

export const AutoplayWithMuted: Story = {
  args: {
    src: BIG_BUCK_BUNNY_MP4,
    poster: BIG_BUCK_BUNNY_POSTER,
    autoplay: true,
    muted: true,
    aspectRatio: "16:9",
  },
  render: (args) => (
    <div className="w-[800px]">
      <VideoPlayer {...args} />
      <p className="mt-4 text-sm text-muted-foreground">
        Autoplays with audio muted (required for autoplay in most browsers)
      </p>
    </div>
  ),
};

export const LoopingVideo: Story = {
  args: {
    src: BIG_BUCK_BUNNY_MP4,
    poster: BIG_BUCK_BUNNY_POSTER,
    loop: true,
    aspectRatio: "16:9",
  },
  render: (args) => (
    <div className="w-[800px]">
      <VideoPlayer {...args} />
      <p className="mt-4 text-sm text-muted-foreground">
        Video will loop continuously when it reaches the end
      </p>
    </div>
  ),
};

export const AspectRatio4x3: Story = {
  args: {
    src: SINTEL_MP4,
    poster: SINTEL_POSTER,
    aspectRatio: "4:3",
  },
  render: (args) => (
    <div className="w-[800px]">
      <VideoPlayer {...args} />
      <p className="mt-4 text-sm text-muted-foreground">
        4:3 aspect ratio (classic TV format)
      </p>
    </div>
  ),
};

export const AspectRatio1x1: Story = {
  args: {
    src: BIG_BUCK_BUNNY_MP4,
    poster: BIG_BUCK_BUNNY_POSTER,
    aspectRatio: "1:1",
  },
  render: (args) => (
    <div className="w-[600px]">
      <VideoPlayer {...args} />
      <p className="mt-4 text-sm text-muted-foreground">
        Square 1:1 aspect ratio (social media format)
      </p>
    </div>
  ),
};

export const WithPosterImage: Story = {
  args: {
    src: BIG_BUCK_BUNNY_MP4,
    poster: BIG_BUCK_BUNNY_POSTER,
    aspectRatio: "16:9",
  },
  render: (args) => (
    <div className="w-[800px]">
      <VideoPlayer {...args} />
      <p className="mt-4 text-sm text-muted-foreground">
        Displays a poster image before the video starts playing
      </p>
    </div>
  ),
};

export const WithoutCustomControls: Story = {
  args: {
    src: BIG_BUCK_BUNNY_MP4,
    controls: false,
    aspectRatio: "16:9",
  },
  render: (args) => (
    <div className="w-[800px]">
      <VideoPlayer {...args} />
      <p className="mt-4 text-sm text-muted-foreground">
        No custom controls - click on the video to play/pause
      </p>
    </div>
  ),
};

export const MultipleSources: Story = {
  args: {
    src: [BIG_BUCK_BUNNY_MP4, ELEPHANTS_DREAM_WEBM],
    poster: BIG_BUCK_BUNNY_POSTER,
    aspectRatio: "16:9",
  },
  render: (args) => (
    <div className="w-[800px]">
      <VideoPlayer {...args} />
      <p className="mt-4 text-sm text-muted-foreground">
        Multiple video sources (browser will choose the best supported format)
      </p>
    </div>
  ),
};

export const PlaybackSpeedControl: Story = {
  args: {
    src: BIG_BUCK_BUNNY_MP4,
    poster: BIG_BUCK_BUNNY_POSTER,
    aspectRatio: "16:9",
  },
  render: (args) => (
    <div className="w-[800px]">
      <VideoPlayer {...args} />
      <div className="mt-4 rounded-brutal border-2 border-brutal bg-card p-4 shadow-brutal">
        <h3 className="mb-2 font-bold">Playback Speed Control</h3>
        <p className="text-sm text-muted-foreground">
          Click the Settings button (gear icon) in the controls to change playback
          speed:
        </p>
        <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
          <li>0.5x - Slow motion</li>
          <li>1x - Normal speed</li>
          <li>1.5x - Faster</li>
          <li>2x - Double speed</li>
        </ul>
      </div>
    </div>
  ),
};

export const KeyboardShortcuts: Story = {
  args: {
    src: SINTEL_MP4,
    poster: SINTEL_POSTER,
    aspectRatio: "16:9",
  },
  render: (args) => (
    <div className="w-[800px]">
      <VideoPlayer {...args} />
      <div className="mt-4 rounded-brutal border-2 border-brutal bg-card p-4 shadow-brutal">
        <h3 className="mb-2 font-bold">Keyboard Shortcuts</h3>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>
            <kbd className="rounded bg-muted px-2 py-1 font-mono text-xs">
              Space
            </kbd>{" "}
            - Play/Pause
          </li>
          <li>
            <kbd className="rounded bg-muted px-2 py-1 font-mono text-xs">F</kbd> -
            Fullscreen
          </li>
          <li>
            <kbd className="rounded bg-muted px-2 py-1 font-mono text-xs">M</kbd> -
            Mute/Unmute
          </li>
          <li>
            <kbd className="rounded bg-muted px-2 py-1 font-mono text-xs">←</kbd> -
            Seek backward 5s
          </li>
          <li>
            <kbd className="rounded bg-muted px-2 py-1 font-mono text-xs">→</kbd> -
            Seek forward 5s
          </li>
        </ul>
      </div>
    </div>
  ),
};

export const ResponsiveSizing: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-2 font-bold">Large (800px)</h3>
        <div className="w-[800px]">
          <VideoPlayer
            src={BIG_BUCK_BUNNY_MP4}
            poster={BIG_BUCK_BUNNY_POSTER}
            aspectRatio="16:9"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-bold">Medium (600px)</h3>
        <div className="w-[600px]">
          <VideoPlayer
            src={BIG_BUCK_BUNNY_MP4}
            poster={BIG_BUCK_BUNNY_POSTER}
            aspectRatio="16:9"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-bold">Small (400px)</h3>
        <div className="w-[400px]">
          <VideoPlayer
            src={BIG_BUCK_BUNNY_MP4}
            poster={BIG_BUCK_BUNNY_POSTER}
            aspectRatio="16:9"
          />
        </div>
      </div>
    </div>
  ),
};

export const WithCallbacks: Story = {
  args: {
    src: BIG_BUCK_BUNNY_MP4,
    poster: BIG_BUCK_BUNNY_POSTER,
    aspectRatio: "16:9",
    onPlay: () => console.log("Video started playing"),
    onPause: () => console.log("Video paused"),
    onEnded: () => console.log("Video ended"),
  },
  render: (args) => (
    <div className="w-[800px]">
      <VideoPlayer {...args} />
      <div className="mt-4 rounded-brutal border-2 border-brutal bg-card p-4 shadow-brutal">
        <h3 className="mb-2 font-bold">Event Callbacks</h3>
        <p className="text-sm text-muted-foreground">
          Open the browser console to see event logs when you play, pause, or finish
          the video.
        </p>
      </div>
    </div>
  ),
};

export const AllAspectRatios: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8">
      <div>
        <h3 className="mb-2 text-center font-bold">16:9 (Widescreen)</h3>
        <VideoPlayer
          src={BIG_BUCK_BUNNY_MP4}
          poster={BIG_BUCK_BUNNY_POSTER}
          aspectRatio="16:9"
        />
      </div>

      <div>
        <h3 className="mb-2 text-center font-bold">4:3 (Classic)</h3>
        <VideoPlayer
          src={BIG_BUCK_BUNNY_MP4}
          poster={BIG_BUCK_BUNNY_POSTER}
          aspectRatio="4:3"
        />
      </div>

      <div>
        <h3 className="mb-2 text-center font-bold">1:1 (Square)</h3>
        <VideoPlayer
          src={BIG_BUCK_BUNNY_MP4}
          poster={BIG_BUCK_BUNNY_POSTER}
          aspectRatio="1:1"
        />
      </div>
    </div>
  ),
};
