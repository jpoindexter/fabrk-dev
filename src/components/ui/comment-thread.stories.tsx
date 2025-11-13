import type { Meta, StoryObj } from "@storybook/react";
import { CommentThread } from "./comment-thread";
import type { Comment } from "./comment-thread";

const meta: Meta<typeof CommentThread> = {
  title: "UI/CommentThread",
  component: CommentThread,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CommentThread>;

// Sample data
const sampleComments: Comment[] = [
  {
    id: "1",
    author: {
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    content:
      "This is exactly what I've been looking for! The neobrutalism design is so refreshing compared to the usual bland SaaS interfaces.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    likes: 24,
    isLiked: false,
    isOwn: false,
  },
  {
    id: "2",
    author: {
      name: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    content:
      "Great work! However, I noticed a small bug in the billing page. When I try to add a new payment method, the modal doesn't close after successful submission. Anyone else experiencing this?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    likes: 12,
    isLiked: true,
    isOwn: false,
  },
  {
    id: "3",
    author: {
      name: "Alex Rivera",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    content: "The authentication system is rock solid. Love the session management!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    likes: 8,
    isLiked: false,
    isOwn: true,
  },
];

const nestedComments: Comment[] = [
  {
    id: "1",
    author: {
      name: "Emma Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    },
    content:
      "Has anyone integrated this with a headless CMS yet? I'm thinking about using it with Sanity or Contentful for my blog.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    likes: 15,
    isLiked: false,
    isOwn: false,
    replies: [
      {
        id: "1-1",
        author: {
          name: "David Park",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        },
        content:
          "Yes! I integrated it with Sanity last week. Works perfectly. The key is to set up the API routes properly and use Sanity's webhook feature for real-time updates.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5), // 2.5 hours ago
        likes: 8,
        isLiked: true,
        isOwn: false,
        replies: [
          {
            id: "1-1-1",
            author: {
              name: "Emma Wilson",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
            },
            content:
              "That's awesome! Do you have a GitHub repo I can check out? Would love to see how you structured the webhook handlers.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            likes: 3,
            isLiked: false,
            isOwn: true,
          },
        ],
      },
      {
        id: "1-2",
        author: {
          name: "Lisa Martinez",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
        },
        content:
          "I'm using it with Contentful. The GraphQL API makes it super easy to fetch content. Happy to share my setup if you're interested!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        likes: 5,
        isLiked: false,
        isOwn: false,
      },
    ],
  },
  {
    id: "2",
    author: {
      name: "James Thompson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    },
    content:
      "The Stripe integration is incredibly smooth. Took me less than an hour to get payments working. This is what every SaaS starter should aspire to be.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    likes: 28,
    isLiked: true,
    isOwn: false,
    replies: [
      {
        id: "2-1",
        author: {
          name: "Sophie Anderson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
        },
        content: "Agreed! The webhook handling is particularly well done. No duplicate charges!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        likes: 6,
        isLiked: false,
        isOwn: false,
      },
    ],
  },
];

const deepNestedComments: Comment[] = [
  {
    id: "1",
    author: {
      name: "Robert Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    },
    content: "What's the best practice for deploying this to Vercel vs self-hosted?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    likes: 10,
    isLiked: false,
    isOwn: false,
    replies: [
      {
        id: "1-1",
        author: {
          name: "Maria Garcia",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
        },
        content:
          "Vercel is the easiest - just connect your GitHub repo and it handles everything. Database needs to be separate though (I use Supabase).",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3.5), // 3.5 hours ago
        likes: 7,
        isLiked: true,
        isOwn: false,
        replies: [
          {
            id: "1-1-1",
            author: {
              name: "Tom Bradley",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
            },
            content: "Do you run into cold start issues with Vercel's serverless functions?",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
            likes: 4,
            isLiked: false,
            isOwn: false,
            replies: [
              {
                id: "1-1-1-1",
                author: {
                  name: "Maria Garcia",
                  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
                },
                content:
                  "Occasionally, but it's negligible for most use cases. If you need guaranteed performance, self-hosting on Railway or Fly.io is better.",
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5), // 2.5 hours ago
                likes: 5,
                isLiked: false,
                isOwn: false,
                replies: [
                  {
                    id: "1-1-1-1-1",
                    author: {
                      name: "Tom Bradley",
                      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
                    },
                    content:
                      "Thanks! I'll check out Railway. Heard good things about their deployment experience.",
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
                    likes: 2,
                    isLiked: false,
                    isOwn: true,
                  },
                ],
              },
            ],
          },
          {
            id: "1-1-2",
            author: {
              name: "Nina Patel",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nina",
            },
            content: "Supabase + Vercel is my go-to stack. Rock solid combination.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.8), // 2.8 hours ago
            likes: 9,
            isLiked: true,
            isOwn: false,
          },
        ],
      },
      {
        id: "1-2",
        author: {
          name: "Chris Wong",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris",
        },
        content:
          "Self-hosting gives you more control but requires more DevOps knowledge. I use Docker on DigitalOcean and it works great.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        likes: 6,
        isLiked: false,
        isOwn: false,
      },
    ],
  },
];

const blogComments: Comment[] = [
  {
    id: "1",
    author: {
      name: "Jennifer Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
    },
    content:
      "Excellent article! The explanation of JWT session management was particularly helpful. I've been struggling with this concept for weeks and this finally made it click.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    likes: 34,
    isLiked: true,
    isOwn: false,
    replies: [
      {
        id: "1-1",
        author: {
          name: "Author",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Author",
        },
        content:
          "Thanks Jennifer! Glad it helped. If you have any questions about implementation, feel free to ask here or join our Discord community.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7), // 7 hours ago
        likes: 12,
        isLiked: false,
        isOwn: false,
      },
    ],
  },
  {
    id: "2",
    author: {
      name: "Kevin O'Brien",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin",
    },
    content:
      "One thing I'd add: make sure to set proper CORS headers when implementing this in production. Learned that the hard way after a security audit!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10), // 10 hours ago
    likes: 18,
    isLiked: false,
    isOwn: false,
    replies: [
      {
        id: "2-1",
        author: {
          name: "Rachel Adams",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel",
        },
        content:
          "Great point! Can you share what CORS configuration you ended up using? I'm about to deploy to production soon.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 9), // 9 hours ago
        likes: 5,
        isLiked: false,
        isOwn: false,
        replies: [
          {
            id: "2-1-1",
            author: {
              name: "Kevin O'Brien",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin",
            },
            content:
              "Sure! I use helmet.js with these settings:\n\ncors({\n  origin: process.env.ALLOWED_ORIGINS?.split(','),\n  credentials: true,\n  methods: ['GET', 'POST', 'PUT', 'DELETE']\n})\n\nWorks like a charm!",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8.5), // 8.5 hours ago
            likes: 8,
            isLiked: true,
            isOwn: false,
          },
        ],
      },
    ],
  },
  {
    id: "3",
    author: {
      name: "Priya Sharma",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
    content:
      "This is gold! I'm building a multi-tenant SaaS and this architecture is exactly what I needed. Bookmarking this for reference.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    likes: 15,
    isLiked: false,
    isOwn: false,
  },
  {
    id: "4",
    author: {
      name: "Marcus Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    },
    content:
      "Quick question: how do you handle session invalidation when a user changes their password? I want to force logout on all devices.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 14), // 14 hours ago
    likes: 9,
    isLiked: false,
    isOwn: false,
    replies: [
      {
        id: "4-1",
        author: {
          name: "Author",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Author",
        },
        content:
          "Great question! I use session versioning. Each user has a sessionVersion field in the database. When they change their password, I increment it. The JWT payload includes this version, and during validation, I check if it matches the current version in the DB. Mismatched sessions are rejected.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 13), // 13 hours ago
        likes: 22,
        isLiked: true,
        isOwn: false,
        replies: [
          {
            id: "4-1-1",
            author: {
              name: "Marcus Johnson",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
            },
            content: "That's brilliant! Such a simple solution. Thanks for explaining!",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12.5), // 12.5 hours ago
            likes: 4,
            isLiked: false,
            isOwn: true,
          },
        ],
      },
    ],
  },
];

// Stories
export const Default: Story = {
  args: {
    comments: sampleComments,
    onLike: (commentId) => console.log("Liked comment:", commentId),
    onReply: (commentId, content) =>
      console.log("Reply to comment:", commentId, "Content:", content),
    onEdit: (commentId, content) =>
      console.log("Edit comment:", commentId, "New content:", content),
    onDelete: (commentId) => console.log("Delete comment:", commentId),
  },
};

export const WithReplies: Story = {
  args: {
    comments: nestedComments,
    onLike: (commentId) => console.log("Liked comment:", commentId),
    onReply: (commentId, content) =>
      console.log("Reply to comment:", commentId, "Content:", content),
    onEdit: (commentId, content) =>
      console.log("Edit comment:", commentId, "New content:", content),
    onDelete: (commentId) => console.log("Delete comment:", commentId),
  },
};

export const DeepNesting: Story = {
  args: {
    comments: deepNestedComments,
    maxDepth: 5,
    onLike: (commentId) => console.log("Liked comment:", commentId),
    onReply: (commentId, content) =>
      console.log("Reply to comment:", commentId, "Content:", content),
    onEdit: (commentId, content) =>
      console.log("Edit comment:", commentId, "New content:", content),
    onDelete: (commentId) => console.log("Delete comment:", commentId),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates deep nesting with 5 levels. The component handles indentation and maintains readability even at deep levels.",
      },
    },
  },
};

export const WithSorting: Story = {
  args: {
    comments: [
      {
        id: "1",
        author: {
          name: "Oldest Comment",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Old",
        },
        content: "This was posted 10 days ago",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
        likes: 5,
        isLiked: false,
        isOwn: false,
      },
      {
        id: "2",
        author: {
          name: "Most Liked",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Popular",
        },
        content: "This has the most likes!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        likes: 100,
        isLiked: true,
        isOwn: false,
      },
      {
        id: "3",
        author: {
          name: "Newest Comment",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=New",
        },
        content: "This was just posted!",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        likes: 2,
        isLiked: false,
        isOwn: false,
      },
    ],
    sortBy: "top",
    onLike: (commentId) => console.log("Liked comment:", commentId),
    onReply: (commentId, content) =>
      console.log("Reply to comment:", commentId, "Content:", content),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Try switching between newest, oldest, and top sorting. Notice how the comment order changes while maintaining the nested structure.",
      },
    },
  },
};

export const WithLikes: Story = {
  args: {
    comments: [
      {
        id: "1",
        author: {
          name: "Viral Comment",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Viral",
        },
        content:
          "This comment went viral! Click the heart to like/unlike. The count updates optimistically.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        likes: 842,
        isLiked: false,
        isOwn: false,
      },
      {
        id: "2",
        author: {
          name: "Already Liked",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liked",
        },
        content: "This one is already liked by you (notice the filled heart).",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
        likes: 23,
        isLiked: true,
        isOwn: false,
      },
      {
        id: "3",
        author: {
          name: "New Comment",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zero",
        },
        content: "Be the first to like this comment!",
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        likes: 0,
        isLiked: false,
        isOwn: false,
      },
    ],
    onLike: (commentId) => {
      console.log("Liked comment:", commentId);
      alert(`Like toggled for comment ${commentId}! Check the console.`);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates the like functionality with optimistic UI updates. Try liking/unliking comments to see the immediate feedback.",
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    comments: [],
    onLike: (commentId) => console.log("Liked comment:", commentId),
    onReply: (commentId, content) =>
      console.log("Reply to comment:", commentId, "Content:", content),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows the empty state when there are no comments yet. Useful for new blog posts or discussions.",
      },
    },
  },
};

export const InteractiveThread: Story = {
  args: {
    comments: [
      {
        id: "1",
        author: {
          name: "Discussion Starter",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Starter",
        },
        content:
          "Click the Reply button below to start a conversation! This story demonstrates the full interactive experience.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        likes: 5,
        isLiked: false,
        isOwn: false,
      },
      {
        id: "2",
        author: {
          name: "Your Comment",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
        },
        content:
          "This is your own comment - notice the edit and delete options in the top-right corner (hover to see them).",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        likes: 12,
        isLiked: true,
        isOwn: true,
        replies: [
          {
            id: "2-1",
            author: {
              name: "Another User",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Another",
            },
            content:
              "Great point! You can reply to this comment too. Try clicking Reply below.",
            timestamp: new Date(Date.now() - 1000 * 60 * 20),
            likes: 3,
            isLiked: false,
            isOwn: false,
          },
        ],
      },
    ],
    maxDepth: 3,
    onLike: (commentId) => {
      console.log("Liked comment:", commentId);
      alert(`Liked comment ${commentId}!`);
    },
    onReply: (commentId, content) => {
      console.log("Reply to comment:", commentId, "Content:", content);
      alert(`Reply to ${commentId}:\n\n${content}`);
    },
    onEdit: (commentId, content) => {
      console.log("Edit comment:", commentId, "New content:", content);
      alert(`Edited comment ${commentId}:\n\n${content}`);
    },
    onDelete: (commentId) => {
      console.log("Delete comment:", commentId);
      alert(`Deleted comment ${commentId}!`);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Fully interactive example with alerts showing callback data. Try liking, replying, editing, and deleting comments to see how the callbacks work.",
      },
    },
  },
};

export const BlogComments: Story = {
  args: {
    comments: blogComments,
    maxDepth: 4,
    sortBy: "top",
    onLike: (commentId) => console.log("Liked comment:", commentId),
    onReply: (commentId, content) =>
      console.log("Reply to comment:", commentId, "Content:", content),
    onEdit: (commentId, content) =>
      console.log("Edit comment:", commentId, "New content:", content),
    onDelete: (commentId) => console.log("Delete comment:", commentId),
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Real-world example showing how comments might appear on a technical blog post. Includes authentic conversations, code snippets in comments, and helpful replies from the author.",
      },
    },
  },
};

export const LimitedDepth: Story = {
  args: {
    comments: deepNestedComments,
    maxDepth: 2,
    onLike: (commentId) => console.log("Liked comment:", commentId),
    onReply: (commentId, content) =>
      console.log("Reply to comment:", commentId, "Content:", content),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates depth limiting. With maxDepth=2, only 2 levels of nesting are allowed. The Reply button disappears after reaching the limit.",
      },
    },
  },
};

export const SingleThread: Story = {
  args: {
    comments: [
      {
        id: "1",
        author: {
          name: "Thread Creator",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Creator",
        },
        content: "What's everyone's favorite feature of this boilerplate?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
        likes: 18,
        isLiked: true,
        isOwn: true,
        replies: [
          {
            id: "1-1",
            author: {
              name: "Fan #1",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fan1",
            },
            content: "The authentication system! So clean and well-documented.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
            likes: 7,
            isLiked: false,
            isOwn: false,
          },
          {
            id: "1-2",
            author: {
              name: "Fan #2",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fan2",
            },
            content: "Stripe integration for sure. Saved me days of work!",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4.5),
            likes: 9,
            isLiked: true,
            isOwn: false,
          },
          {
            id: "1-3",
            author: {
              name: "Fan #3",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fan3",
            },
            content: "The UI components! Neobrutalism design is 🔥",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
            likes: 12,
            isLiked: false,
            isOwn: false,
          },
          {
            id: "1-4",
            author: {
              name: "Fan #4",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fan4",
            },
            content:
              "Email system is my favorite. Simple but effective, no over-engineering.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
            likes: 5,
            isLiked: false,
            isOwn: false,
          },
        ],
      },
    ],
    maxDepth: 3,
    sortBy: "newest",
    onLike: (commentId) => console.log("Liked comment:", commentId),
    onReply: (commentId, content) =>
      console.log("Reply to comment:", commentId, "Content:", content),
    onEdit: (commentId, content) =>
      console.log("Edit comment:", commentId, "New content:", content),
    onDelete: (commentId) => console.log("Delete comment:", commentId),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows a single top-level comment with multiple direct replies. Good example of a focused discussion thread.",
      },
    },
  },
};
