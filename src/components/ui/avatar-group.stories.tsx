/**
 * ✅ FABRK COMPONENT
 * AvatarGroup Stories - Display multiple avatars with overlap and overflow indicators
 *
 * @see Avatar group component documentation
 */

import { AvatarGroup } from "@/components/ui/avatar-group";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof AvatarGroup> = {
  title: "UI/Data Display/AvatarGroup",
  component: AvatarGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    max: {
      control: "number",
    },
    overlap: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

const sampleAvatars = [
  { fallback: "JD", alt: "John Doe" },
  { fallback: "AS", alt: "Alice Smith" },
  { fallback: "BJ", alt: "Bob Johnson" },
  { fallback: "CW", alt: "Carol White" },
  { fallback: "DM", alt: "David Miller" },
];

/**
 * Default avatar group
 */
export const Default: Story = {
  args: {
    avatars: sampleAvatars.slice(0, 3),
  },
};

/**
 * With images
 */
export const WithImages: Story = {
  args: {
    avatars: [
      { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=John", fallback: "JD", alt: "John Doe" },
      { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice", fallback: "AS", alt: "Alice Smith" },
      { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob", fallback: "BJ", alt: "Bob Johnson" },
    ],
  },
};

/**
 * Small size
 */
export const Small: Story = {
  args: {
    avatars: sampleAvatars.slice(0, 4),
    size: "sm",
  },
};

/**
 * Medium size (default)
 */
export const Medium: Story = {
  args: {
    avatars: sampleAvatars.slice(0, 4),
    size: "md",
  },
};

/**
 * Large size
 */
export const Large: Story = {
  args: {
    avatars: sampleAvatars.slice(0, 4),
    size: "lg",
  },
};

/**
 * Without overlap
 */
export const NoOverlap: Story = {
  args: {
    avatars: sampleAvatars.slice(0, 4),
    overlap: false,
  },
};

/**
 * Max display limit with +N indicator
 */
export const WithMaxLimit: Story = {
  args: {
    avatars: [
      ...sampleAvatars,
      { fallback: "EM", alt: "Emma Martin" },
      { fallback: "FG", alt: "Frank Garcia" },
      { fallback: "GR", alt: "Grace Rodriguez" },
    ],
    max: 3,
  },
};

/**
 * Large group showing overflow
 */
export const LargeGroup: Story = {
  args: {
    avatars: [
      { fallback: "JD" },
      { fallback: "AS" },
      { fallback: "BJ" },
      { fallback: "CW" },
      { fallback: "DM" },
      { fallback: "EM" },
      { fallback: "FG" },
      { fallback: "GR" },
      { fallback: "HW" },
      { fallback: "IB" },
    ],
    max: 5,
  },
};

/**
 * Team members
 */
export const TeamMembers: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-medium">Design Team (3 members)</p>
        <AvatarGroup
          avatars={[
            { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice", fallback: "AS", alt: "Alice - Designer" },
            { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob", fallback: "BJ", alt: "Bob - UI Designer" },
            { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol", fallback: "CW", alt: "Carol - UX Designer" },
          ]}
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Engineering Team (8 members)</p>
        <AvatarGroup
          avatars={[
            { fallback: "JD" },
            { fallback: "AS" },
            { fallback: "BJ" },
            { fallback: "CW" },
            { fallback: "DM" },
            { fallback: "EM" },
            { fallback: "FG" },
            { fallback: "GR" },
          ]}
          max={5}
        />
      </div>
    </div>
  ),
};

/**
 * Project collaborators
 */
export const ProjectCollaborators: Story = {
  render: () => (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Website Redesign</h3>
          <p className="text-sm text-muted-foreground">12 collaborators</p>
        </div>
        <AvatarGroup
          avatars={Array.from({ length: 12 }, (_, i) => ({
            fallback: String.fromCharCode(65 + i) + String.fromCharCode(65 + (i + 1) % 26),
          }))}
          max={4}
        />
      </div>
    </div>
  ),
};

/**
 * Viewers/Participants
 */
export const Viewers: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <AvatarGroup
          avatars={[
            { fallback: "JD" },
            { fallback: "AS" },
            { fallback: "BJ" },
          ]}
          size="sm"
        />
        <span className="text-sm text-muted-foreground">Currently viewing</span>
      </div>
    </div>
  ),
};

/**
 * All sizes comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Small</p>
        <AvatarGroup avatars={sampleAvatars.slice(0, 4)} size="sm" />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Medium</p>
        <AvatarGroup avatars={sampleAvatars.slice(0, 4)} size="md" />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Large</p>
        <AvatarGroup avatars={sampleAvatars.slice(0, 4)} size="lg" />
      </div>
    </div>
  ),
};

/**
 * With and without overlap comparison
 */
export const OverlapComparison: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">With overlap (default)</p>
        <AvatarGroup avatars={sampleAvatars.slice(0, 5)} overlap={true} />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Without overlap</p>
        <AvatarGroup avatars={sampleAvatars.slice(0, 5)} overlap={false} />
      </div>
    </div>
  ),
};

/**
 * Single avatar (edge case)
 */
export const SingleAvatar: Story = {
  args: {
    avatars: [{ fallback: "JD", alt: "John Doe" }],
  },
};

/**
 * Two avatars
 */
export const TwoAvatars: Story = {
  args: {
    avatars: sampleAvatars.slice(0, 2),
  },
};
