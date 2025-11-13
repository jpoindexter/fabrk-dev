import type { Meta, StoryObj } from "@storybook/react";
import {
  ChatMessage,
  TypingIndicator,
  MessageThread,
} from "./chat-message";
import { generateDemoDates } from "@/lib/utils/demo-dates";

const meta = {
  title: "UI/ChatMessage",
  component: ChatMessage,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChatMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample user data
const otherUser = {
  name: "Sarah Johnson",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
};

const ownUser = {
  name: "You",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
};

// ✅ Generate demo dates for consistent previews
const { now, minutesAgo } = generateDemoDates();
const timestamp = now();

export const Default: Story = {
  args: {
    sender: otherUser,
    content: "Hey! How are you doing today?",
    timestamp,
    showAvatar: true,
  },
};

export const OwnMessage: Story = {
  args: {
    sender: ownUser,
    content: "I'm doing great! Just finished the new chat component.",
    timestamp,
    isOwn: true,
    showAvatar: true,
  },
};

export const WithAvatar: Story = {
  args: {
    sender: {
      name: "Alex Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    content: "This is a message with an avatar displayed",
    timestamp,
    showAvatar: true,
  },
};

export const WithoutAvatar: Story = {
  args: {
    sender: otherUser,
    content: "This message has no avatar (grouped message)",
    timestamp,
    showAvatar: false,
    isGrouped: true,
  },
};

export const StatusSending: Story = {
  args: {
    sender: ownUser,
    content: "This message is being sent...",
    timestamp,
    isOwn: true,
    status: "sending",
  },
};

export const StatusSent: Story = {
  args: {
    sender: ownUser,
    content: "This message has been sent to the server",
    timestamp,
    isOwn: true,
    status: "sent",
  },
};

export const StatusDelivered: Story = {
  args: {
    sender: ownUser,
    content: "This message has been delivered to the recipient",
    timestamp,
    isOwn: true,
    status: "delivered",
  },
};

export const StatusRead: Story = {
  args: {
    sender: ownUser,
    content: "This message has been read by the recipient",
    timestamp,
    isOwn: true,
    status: "read",
  },
};

export const WithReactions: Story = {
  args: {
    sender: otherUser,
    content: "Just shipped the new feature! 🚀",
    timestamp,
    reactions: [
      { emoji: "🎉", count: 3, users: ["Alice", "Bob", "Charlie"] },
      { emoji: "❤️", count: 5, users: ["David", "Emma", "Frank", "Grace", "Helen"] },
      { emoji: "🔥", count: 2, users: ["Ivan", "Julia"] },
    ],
    onReact: (emoji) => console.log("Reacted with:", emoji),
  },
};

export const WithImageAttachment: Story = {
  args: {
    sender: otherUser,
    content: "Check out this screenshot!",
    timestamp,
    attachments: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop",
        name: "screenshot.png",
      },
    ],
  },
};

export const WithFileAttachment: Story = {
  args: {
    sender: otherUser,
    content: "Here's the document you requested",
    timestamp,
    attachments: [
      {
        type: "file",
        url: "#",
        name: "project-proposal.pdf",
      },
      {
        type: "file",
        url: "#",
        name: "budget-2024.xlsx",
      },
    ],
  },
};

export const WithMultipleAttachments: Story = {
  args: {
    sender: ownUser,
    content: "Sending over the design files and mockups",
    timestamp,
    isOwn: true,
    status: "read",
    attachments: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop",
        name: "hero-mockup.png",
      },
      {
        type: "file",
        url: "#",
        name: "design-system.fig",
      },
    ],
  },
};

export const WithActions: Story = {
  args: {
    sender: ownUser,
    content: "This message can be edited or deleted (hover to see actions)",
    timestamp,
    isOwn: true,
    status: "delivered",
    onEdit: () => console.log("Edit clicked"),
    onDelete: () => console.log("Delete clicked"),
  },
};

export const LongMessage: Story = {
  args: {
    sender: otherUser,
    content:
      "This is a much longer message to demonstrate how the component handles multi-line text. The message bubble should expand to accommodate the content while maintaining a maximum width. Line breaks and word wrapping should work correctly.\n\nIt can even have multiple paragraphs!",
    timestamp,
  },
};

export const CompleteMessage: Story = {
  args: {
    sender: ownUser,
    content: "Here's everything together: message, reactions, attachments, and actions!",
    timestamp,
    isOwn: true,
    status: "read",
    reactions: [
      { emoji: "👍", count: 2, users: ["Alice", "Bob"] },
    ],
    attachments: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop",
        name: "demo.png",
      },
    ],
    onEdit: () => console.log("Edit clicked"),
    onDelete: () => console.log("Delete clicked"),
    onReact: (emoji) => console.log("Reacted with:", emoji),
  },
};

// Typing Indicator Stories
export const TypingIndicatorStory: Story = {
  render: () => (
    <TypingIndicator
      sender={{
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      }}
    />
  ),
};

// Message Thread Stories
export const MessageThreadStory: Story = {
  render: () => (
    <MessageThread
      messages={[
        {
          id: "1",
          sender: otherUser,
          content: "Hey! How's the project going?",
          timestamp: new Date(Date.now() - 300000),
        },
        {
          id: "2",
          sender: ownUser,
          content: "Going great! Just finished the chat component.",
          timestamp: new Date(Date.now() - 240000),
          isOwn: true,
          status: "read",
        },
        {
          id: "3",
          sender: ownUser,
          content: "Want to see a demo?",
          timestamp: new Date(Date.now() - 230000),
          isOwn: true,
          status: "read",
        },
        {
          id: "4",
          sender: otherUser,
          content: "Absolutely! That sounds amazing 🎉",
          timestamp: new Date(Date.now() - 180000),
          reactions: [
            { emoji: "🚀", count: 1, users: ["You"] },
          ],
        },
        {
          id: "5",
          sender: ownUser,
          content: "Here it is!",
          timestamp: new Date(Date.now() - 120000),
          isOwn: true,
          status: "delivered",
          attachments: [
            {
              type: "image",
              url: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop",
              name: "chat-demo.png",
            },
          ],
        },
      ]}
    />
  ),
};

export const GroupedMessages: Story = {
  render: () => (
    <MessageThread
      messages={[
        {
          id: "1",
          sender: otherUser,
          content: "First message from Sarah",
          timestamp: new Date(Date.now() - 300000),
        },
        {
          id: "2",
          sender: otherUser,
          content: "Second message from Sarah (should be grouped)",
          timestamp: new Date(Date.now() - 290000),
        },
        {
          id: "3",
          sender: otherUser,
          content: "Third message from Sarah (still grouped)",
          timestamp: new Date(Date.now() - 280000),
        },
        {
          id: "4",
          sender: ownUser,
          content: "My first reply",
          timestamp: new Date(Date.now() - 240000),
          isOwn: true,
          status: "read",
        },
        {
          id: "5",
          sender: ownUser,
          content: "My second reply (grouped)",
          timestamp: new Date(Date.now() - 230000),
          isOwn: true,
          status: "read",
        },
        {
          id: "6",
          sender: otherUser,
          content: "Sarah's response",
          timestamp: new Date(Date.now() - 180000),
        },
      ]}
    />
  ),
};

export const ConversationWithTyping: Story = {
  render: () => (
    <div className="space-y-0">
      <ChatMessage
        sender={otherUser}
        content="What do you think about the new design?"
        timestamp={new Date(Date.now() - 300000)}
      />
      <ChatMessage
        sender={ownUser}
        content="I love it! The neobrutalism style is perfect."
        timestamp={new Date(Date.now() - 240000)}
        isOwn={true}
        status="read"
      />
      <ChatMessage
        sender={otherUser}
        content="Glad you like it! Let me send you some more examples..."
        timestamp={new Date(Date.now() - 180000)}
      />
      <TypingIndicator sender={otherUser} />
    </div>
  ),
};

export const AllStatuses: Story = {
  render: () => (
    <div className="space-y-4">
      <ChatMessage
        sender={ownUser}
        content="Sending..."
        timestamp={timestamp}
        isOwn={true}
        status="sending"
      />
      <ChatMessage
        sender={ownUser}
        content="Sent to server"
        timestamp={timestamp}
        isOwn={true}
        status="sent"
      />
      <ChatMessage
        sender={ownUser}
        content="Delivered to recipient"
        timestamp={timestamp}
        isOwn={true}
        status="delivered"
      />
      <ChatMessage
        sender={ownUser}
        content="Read by recipient"
        timestamp={timestamp}
        isOwn={true}
        status="read"
      />
    </div>
  ),
};

export const DarkModeExample: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: () => (
    <div className="dark p-8 bg-background">
      <MessageThread
        messages={[
          {
            id: "1",
            sender: otherUser,
            content: "Dark mode looks great!",
            timestamp: new Date(Date.now() - 300000),
            reactions: [
              { emoji: "🌙", count: 2, users: ["Alice", "Bob"] },
            ],
          },
          {
            id: "2",
            sender: ownUser,
            content: "Thanks! The theme system makes it easy.",
            timestamp: new Date(Date.now() - 240000),
            isOwn: true,
            status: "read",
          },
        ]}
      />
    </div>
  ),
};
