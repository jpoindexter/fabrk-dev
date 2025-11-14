"use client";

import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageSquare, MoreVertical, Edit2, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: Date | string;
  likes: number;
  isLiked?: boolean;
  isOwn?: boolean;
  replies?: Comment[];
}

export interface CommentThreadProps {
  comments: Comment[];
  onLike?: (commentId: string) => void;
  onReply?: (commentId: string, content: string) => void;
  onEdit?: (commentId: string, content: string) => void;
  onDelete?: (commentId: string) => void;
  maxDepth?: number;
  sortBy?: "newest" | "oldest" | "top";
  className?: string;
}

interface SingleCommentProps {
  comment: Comment;
  onLike?: (commentId: string) => void;
  onReply?: (commentId: string, content: string) => void;
  onEdit?: (commentId: string, content: string) => void;
  onDelete?: (commentId: string) => void;
  depth?: number;
  maxDepth: number;
}

const SingleComment: React.FC<SingleCommentProps> = ({
  comment,
  onLike,
  onReply,
  onEdit,
  onDelete,
  depth = 0,
  maxDepth,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [editContent, setEditContent] = useState(comment.content);
  const [showReplies, setShowReplies] = useState(true);
  const [localLikes, setLocalLikes] = useState(comment.likes);
  const [localIsLiked, setLocalIsLiked] = useState(comment.isLiked || false);

  const canNest = depth < maxDepth;
  const hasReplies = comment.replies && comment.replies.length > 0;

  const handleLike = () => {
    const newIsLiked = !localIsLiked;
    setLocalIsLiked(newIsLiked);
    setLocalLikes((prev) => (newIsLiked ? prev + 1 : prev - 1));
    onLike?.(comment.id);
  };

  const handleReplySubmit = () => {
    if (replyContent.trim() && onReply) {
      onReply(comment.id, replyContent);
      setReplyContent("");
      setIsReplying(false);
    }
  };

  const handleEditSubmit = () => {
    if (editContent.trim() && onEdit) {
      onEdit(comment.id, editContent);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this comment?")) {
      onDelete?.(comment.id);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTimestamp = (timestamp: Date | string) => {
    const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div className={cn("group", depth > 0 && "ml-8 mt-4")}>
      <div className="flex gap-3">
        <Avatar className="h-10 w-10 border shadow-sm">
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback className="bg-secondary text-secondary-foreground font-medium">
            {getInitials(comment.author.name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="bg-card border rounded-md p-4 shadow-sm">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="font-semibold text-foreground">{comment.author.name}</div>
                <div className="text-xs text-muted-foreground">
                  {formatTimestamp(comment.timestamp)}
                </div>
              </div>

              {comment.isOwn && !isEditing && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="border shadow-md">
                    <DropdownMenuItem
                      onClick={() => setIsEditing(true)}
                      className="cursor-pointer"
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleDelete}
                      className="cursor-pointer text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Content */}
            {isEditing ? (
              <div className="space-y-2">
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="min-h-[80px]"
                  placeholder="Edit your comment..."
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleEditSubmit}>
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setEditContent(comment.content);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-foreground whitespace-pre-wrap break-words">
                {comment.content}
              </div>
            )}
          </div>

          {/* Actions */}
          {!isEditing && (
            <div className="flex items-center gap-4 mt-2 ml-1">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 px-2 gap-1 hover:bg-transparent",
                  localIsLiked && "text-destructive"
                )}
                onClick={handleLike}
              >
                <Heart
                  className={cn("h-4 w-4", localIsLiked && "fill-current")}
                />
                <span className="text-sm">{localLikes}</span>
              </Button>

              {canNest && onReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 gap-1 hover:bg-transparent"
                  onClick={() => setIsReplying(!isReplying)}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm">Reply</span>
                </Button>
              )}

              {hasReplies && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 hover:bg-transparent"
                  onClick={() => setShowReplies(!showReplies)}
                >
                  <span className="text-sm">
                    {showReplies ? "Hide" : "Show"} {comment.replies!.length}{" "}
                    {comment.replies!.length === 1 ? "reply" : "replies"}
                  </span>
                </Button>
              )}
            </div>
          )}

          {/* Reply Form */}
          {isReplying && (
            <div className="mt-4 space-y-2">
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="min-h-[80px]"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleReplySubmit}>
                  Reply
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setIsReplying(false);
                    setReplyContent("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Nested Replies */}
          {hasReplies && showReplies && (
            <div className="mt-4 space-y-4">
              {comment.replies!.map((reply) => (
                <SingleComment
                  key={reply.id}
                  comment={reply}
                  onLike={onLike}
                  onReply={onReply}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  depth={depth + 1}
                  maxDepth={maxDepth}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const CommentThread: React.FC<CommentThreadProps> = ({
  comments,
  onLike,
  onReply,
  onEdit,
  onDelete,
  maxDepth = 3,
  sortBy = "newest",
  className,
}) => {
  const [sorting, setSorting] = useState<"newest" | "oldest" | "top">(sortBy);

  const sortComments = (commentsToSort: Comment[]): Comment[] => {
    const sorted = [...commentsToSort];

    switch (sorting) {
      case "newest":
        sorted.sort((a, b) => {
          const dateA = typeof a.timestamp === "string" ? new Date(a.timestamp) : a.timestamp;
          const dateB = typeof b.timestamp === "string" ? new Date(b.timestamp) : b.timestamp;
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case "oldest":
        sorted.sort((a, b) => {
          const dateA = typeof a.timestamp === "string" ? new Date(a.timestamp) : a.timestamp;
          const dateB = typeof b.timestamp === "string" ? new Date(b.timestamp) : b.timestamp;
          return dateA.getTime() - dateB.getTime();
        });
        break;
      case "top":
        sorted.sort((a, b) => b.likes - a.likes);
        break;
    }

    return sorted.map((comment) => ({
      ...comment,
      replies: comment.replies ? sortComments(comment.replies) : undefined,
    }));
  };

  const sortedComments = sortComments(comments);

  if (comments.length === 0) {
    return (
      <div
        className={cn(
          "bg-card border rounded-md p-12 text-center shadow-sm",
          className
        )}
      >
        <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No comments yet</h3>
        <p className="text-muted-foreground">Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Sorting Controls */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <div className="flex gap-2">
          {(["newest", "oldest", "top"] as const).map((sort) => (
            <Button
              key={sort}
              variant={sorting === sort ? "default" : "outline"}
              size="sm"
              onClick={() => setSorting(sort)}
              className="capitalize"
            >
              {sort}
            </Button>
          ))}
        </div>
      </div>

      {/* Comments */}
      <div className="space-y-6">
        {sortedComments.map((comment) => (
          <SingleComment
            key={comment.id}
            comment={comment}
            onLike={onLike}
            onReply={onReply}
            onEdit={onEdit}
            onDelete={onDelete}
            maxDepth={maxDepth}
          />
        ))}
      </div>
    </div>
  );
};
