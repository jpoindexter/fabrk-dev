"use client";

import { CommentThread } from "@/components/ui/comment-thread";
import type { Comment } from "@/components/ui/comment-thread";
import { useState } from "react";

const initialComments: Comment[] = [
  {
    id: "1",
    author: {
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    content:
      "This comment system is amazing! I love how it handles nested replies so elegantly. The neobrutalism design really makes it stand out.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    likes: 24,
    isLiked: false,
    isOwn: false,
    replies: [
      {
        id: "1-1",
        author: {
          name: "Michael Chen",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        },
        content: "Totally agree! The optimistic UI updates make it feel super responsive.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5), // 1.5 hours ago
        likes: 8,
        isLiked: true,
        isOwn: false,
      },
    ],
  },
  {
    id: "2",
    author: {
      name: "Alex Rivera",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    content:
      "Has anyone integrated this with a backend yet? I'm using Prisma and wondering about the best schema structure for nested comments.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    likes: 12,
    isLiked: false,
    isOwn: false,
    replies: [
      {
        id: "2-1",
        author: {
          name: "Emma Wilson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        },
        content:
          "Yes! I'm using a self-referential relation in Prisma. Each comment has an optional parentId field that references another comment. Works perfectly!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5), // 2.5 hours ago
        likes: 15,
        isLiked: true,
        isOwn: false,
        replies: [
          {
            id: "2-1-1",
            author: {
              name: "Alex Rivera",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
            },
            content: "That's exactly what I needed! Thanks for sharing.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            likes: 3,
            isLiked: false,
            isOwn: true,
          },
        ],
      },
      {
        id: "2-2",
        author: {
          name: "David Park",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        },
        content:
          "Check out the README file in the component folder - it has a complete Prisma schema example!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.3), // 2.3 hours ago
        likes: 7,
        isLiked: false,
        isOwn: false,
      },
    ],
  },
  {
    id: "3",
    author: {
      name: "You",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    },
    content:
      "Testing out the edit and delete functionality. Hover over this comment to see the options menu! ✏️",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    likes: 5,
    isLiked: true,
    isOwn: true,
  },
];

export default function CommentThreadDemo() {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [replyCount, setReplyCount] = useState(0);

  const handleLike = (commentId: string) => {
    console.log("Liked comment:", commentId);
    // In a real app, you'd call your API here
    // await fetch(`/api/comments/${commentId}/like`, { method: 'POST' });
  };

  const handleReply = (commentId: string, content: string) => {
    console.log("Reply to comment:", commentId, "Content:", content);

    // Create a new reply (in a real app, this would come from your API)
    const newReply: Comment = {
      id: `reply-${Date.now()}-${replyCount}`,
      author: {
        name: "You",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      },
      content,
      timestamp: new Date(),
      likes: 0,
      isLiked: false,
      isOwn: true,
    };

    setReplyCount((prev) => prev + 1);

    // Add reply to the comment (simplified - in production, handle nested replies recursively)
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        }
        // Check nested replies
        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  replies: [...(reply.replies || []), newReply],
                };
              }
              return reply;
            }),
          };
        }
        return comment;
      })
    );

    alert(`Reply submitted!\n\nComment ID: ${commentId}\nContent: ${content}`);
  };

  const handleEdit = (commentId: string, content: string) => {
    console.log("Edit comment:", commentId, "New content:", content);

    // Update comment content (in production, handle nested comments recursively)
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, content };
        }
        return comment;
      })
    );

    alert(`Comment edited!\n\nComment ID: ${commentId}\nNew content: ${content}`);
  };

  const handleDelete = (commentId: string) => {
    console.log("Delete comment:", commentId);

    // Remove comment (in production, handle nested comments recursively)
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));

    alert(`Comment deleted!\n\nComment ID: ${commentId}`);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-foreground mb-4">Comment Thread Demo</h1>
          <p className="text-lg text-muted-foreground">
            A fully interactive comment system with nested replies, likes, editing, and deletion.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border-2 border-brutal rounded-brutal p-4 shadow-brutal">
            <h3 className="font-bold text-foreground mb-2">Try Liking</h3>
            <p className="text-sm text-muted-foreground">
              Click the heart icon to like comments. Notice the optimistic UI update!
            </p>
          </div>
          <div className="bg-card border-2 border-brutal rounded-brutal p-4 shadow-brutal">
            <h3 className="font-bold text-foreground mb-2">Try Replying</h3>
            <p className="text-sm text-muted-foreground">
              Click Reply to start a conversation. Your replies appear instantly.
            </p>
          </div>
          <div className="bg-card border-2 border-brutal rounded-brutal p-4 shadow-brutal">
            <h3 className="font-bold text-foreground mb-2">Try Editing</h3>
            <p className="text-sm text-muted-foreground">
              Hover over "Your" comments to see edit/delete options in the top-right.
            </p>
          </div>
        </div>

        {/* Comment Thread */}
        <CommentThread
          comments={comments}
          onLike={handleLike}
          onReply={handleReply}
          onEdit={handleEdit}
          onDelete={handleDelete}
          maxDepth={4}
          sortBy="newest"
          className="mb-8"
        />

        {/* Instructions */}
        <div className="bg-accent border-2 border-brutal rounded-brutal p-6 shadow-brutal">
          <h3 className="font-bold text-accent-foreground mb-4">How to Use</h3>
          <ul className="space-y-2 text-sm text-accent-foreground">
            <li className="flex items-start gap-2">
              <span className="font-bold">❤️</span>
              <span>
                <strong>Like:</strong> Click the heart icon. The count updates immediately.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">💬</span>
              <span>
                <strong>Reply:</strong> Click "Reply" to open the reply form. Submit with the Reply
                button.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✏️</span>
              <span>
                <strong>Edit:</strong> Hover over your comments (marked as "You") to see the menu
                button.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">🗑️</span>
              <span>
                <strong>Delete:</strong> Use the same menu to delete your comments (requires
                confirmation).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">🔽</span>
              <span>
                <strong>Hide/Show:</strong> Click "Hide X replies" or "Show X replies" to
                collapse/expand threads.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">⬆️</span>
              <span>
                <strong>Sort:</strong> Use the buttons at the top to sort by newest, oldest, or top
                (most liked).
              </span>
            </li>
          </ul>
        </div>

        {/* Console Output Notice */}
        <div className="mt-4 p-4 bg-muted border-2 border-brutal rounded-brutal">
          <p className="text-sm text-muted-foreground">
            📝 <strong>Developer Note:</strong> Open your browser console to see all callback
            actions. Each interaction logs detailed information about the event.
          </p>
        </div>
      </div>
    </div>
  );
}
