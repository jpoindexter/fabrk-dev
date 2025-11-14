"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Check,
  CheckCheck,
  Clock,
  Edit2,
  File,
  Image as ImageIcon,
  Trash2,
  Download
} from "lucide-react";

interface ChatMessageProps {
  sender: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: Date | string;
  isOwn?: boolean;
  status?: "sending" | "sent" | "delivered" | "read";
  reactions?: Array<{
    emoji: string;
    count: number;
    users: string[];
  }>;
  attachments?: Array<{
    type: "image" | "file";
    url: string;
    name?: string;
  }>;
  onEdit?: () => void;
  onDelete?: () => void;
  onReact?: (emoji: string) => void;
  showAvatar?: boolean;
  isGrouped?: boolean;
  className?: string;
}

export const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  (
    {
      sender,
      content,
      timestamp,
      isOwn = false,
      status,
      reactions,
      attachments,
      onEdit,
      onDelete,
      onReact,
      showAvatar = true,
      isGrouped = false,
      className,
      ...props
    },
    ref
  ) => {
    const [showActions, setShowActions] = React.useState(false);
    const [showReactionTooltip, setShowReactionTooltip] = React.useState<number | null>(null);

    const formatTimestamp = (ts: Date | string) => {
      const date = typeof ts === "string" ? new Date(ts) : ts;
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
      });
    };

    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    const StatusIcon = () => {
      switch (status) {
        case "sending":
          return <Clock className="h-3 w-3 text-muted-foreground" />;
        case "sent":
          return <Check className="h-3 w-3 text-muted-foreground" />;
        case "delivered":
          return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
        case "read":
          return <CheckCheck className="h-3 w-3 text-primary" />;
        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-3 group",
          isOwn ? "flex-row-reverse" : "flex-row",
          isGrouped && "mt-1",
          !isGrouped && "mt-4",
          className
        )}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        {...props}
      >
        {/* Avatar */}
        <div className={cn("flex-shrink-0", isGrouped && !showAvatar && "w-10")}>
          {showAvatar && !isGrouped && (
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={sender.avatar} alt={sender.name} />
              <AvatarFallback className="bg-accent text-accent-foreground font-medium text-xs">
                {getInitials(sender.name)}
              </AvatarFallback>
            </Avatar>
          )}
        </div>

        {/* Message Content */}
        <div
          className={cn(
            "flex flex-col gap-1 max-w-[70%]",
            isOwn ? "items-end" : "items-start"
          )}
        >
          {/* Sender Name (only for other users, not grouped) */}
          {!isOwn && !isGrouped && (
            <span className="text-xs font-semibold text-foreground px-1">
              {sender.name}
            </span>
          )}

          {/* Message Bubble */}
          <div className="relative">
            <div
              className={cn(
                "rounded-md border px-4 py-2.5 shadow-sm",
                "transition-all duration-200",
                isOwn
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-card-foreground"
              )}
            >
              {/* Message Text */}
              <p className="text-sm whitespace-pre-wrap break-words">
                {content}
              </p>

              {/* Attachments */}
              {attachments && attachments.length > 0 && (
                <div className="mt-3 space-y-2">
                  {attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className={cn(
                        "rounded-md border overflow-hidden",
                        isOwn
                          ? "border-primary-foreground/20 bg-primary-foreground/10"
                          : "border-border bg-accent"
                      )}
                    >
                      {attachment.type === "image" ? (
                        <img
                          src={attachment.url}
                          alt={attachment.name || "Attachment"}
                          className="w-full max-w-sm object-cover"
                        />
                      ) : (
                        <div className="flex items-center gap-3 p-3">
                          <File
                            className={cn(
                              "h-5 w-5",
                              isOwn ? "text-primary-foreground" : "text-primary"
                            )}
                          />
                          <div className="flex-1 min-w-0">
                            <p
                              className={cn(
                                "text-sm font-medium truncate",
                                isOwn
                                  ? "text-primary-foreground"
                                  : "text-foreground"
                              )}
                            >
                              {attachment.name || "Untitled"}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className={cn(
                              "h-7 w-7 p-0",
                              isOwn
                                ? "hover:bg-primary-foreground/20 text-primary-foreground"
                                : "hover:bg-accent text-foreground"
                            )}
                          >
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reactions */}
            {reactions && reactions.length > 0 && (
              <div
                className={cn(
                  "absolute -bottom-2 flex gap-1",
                  isOwn ? "right-2" : "left-2"
                )}
              >
                {reactions.map((reaction, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setShowReactionTooltip(index)}
                    onMouseLeave={() => setShowReactionTooltip(null)}
                  >
                    <button
                      onClick={() => onReact?.(reaction.emoji)}
                      className={cn(
                        "flex items-center gap-1 px-2 py-0.5",
                        "rounded-md border",
                        "bg-background shadow-sm hover:shadow-md",
                        "transition-all duration-200"
                      )}
                    >
                      <span className="text-sm">{reaction.emoji}</span>
                      <span className="text-xs font-medium text-foreground">
                        {reaction.count}
                      </span>
                    </button>

                    {/* Reaction Tooltip */}
                    {showReactionTooltip === index && (
                      <div
                        className={cn(
                          "absolute bottom-full mb-2 z-10",
                          "px-3 py-2 rounded-md border",
                          "bg-card text-card-foreground shadow-md",
                          "whitespace-nowrap text-xs"
                        )}
                      >
                        {reaction.users.join(", ")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Timestamp and Status */}
          <div
            className={cn(
              "flex items-center gap-1.5 px-1",
              isOwn ? "flex-row-reverse" : "flex-row"
            )}
          >
            <span className="text-xs text-muted-foreground">
              {formatTimestamp(timestamp)}
            </span>
            {isOwn && status && <StatusIcon />}
          </div>
        </div>

        {/* Action Buttons */}
        {(onEdit || onDelete) && (
          <div
            className={cn(
              "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
              isOwn ? "flex-row" : "flex-row-reverse"
            )}
          >
            {onEdit && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onEdit}
                className="h-7 w-7 p-0 hover:bg-accent"
              >
                <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onDelete}
                className="h-7 w-7 p-0 hover:bg-destructive/10"
              >
                <Trash2 className="h-3.5 w-3.5 text-destructive" />
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
);

ChatMessage.displayName = "ChatMessage";

// Typing Indicator Component
export const TypingIndicator = React.forwardRef<
  HTMLDivElement,
  {
    sender: { name: string; avatar?: string };
    className?: string;
  }
>(({ sender, className, ...props }, ref) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      ref={ref}
      className={cn("flex gap-3 mt-4", className)}
      {...props}
    >
      <Avatar className="h-10 w-10 border">
        <AvatarImage src={sender.avatar} alt={sender.name} />
        <AvatarFallback className="bg-accent text-accent-foreground font-medium text-xs">
          {getInitials(sender.name)}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-1 max-w-[70%]">
        <span className="text-xs font-medium text-foreground px-1">
          {sender.name}
        </span>

        <div className="rounded-md border px-4 py-3 bg-card shadow-sm">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: "0.6s",
                }}
              />
            ))}
          </div>
        </div>

        <span className="text-xs text-muted-foreground px-1">typing...</span>
      </div>
    </div>
  );
});

TypingIndicator.displayName = "TypingIndicator";

// Message Thread Component
export const MessageThread = React.forwardRef<
  HTMLDivElement,
  {
    messages: Array<ChatMessageProps & { id: string }>;
    className?: string;
  }
>(({ messages, className, ...props }, ref) => {
  const groupedMessages = React.useMemo(() => {
    return messages.reduce((groups, message, index) => {
      const prevMessage = messages[index - 1];
      const isGrouped =
        prevMessage &&
        prevMessage.sender.name === message.sender.name &&
        prevMessage.isOwn === message.isOwn;

      groups.push({
        ...message,
        isGrouped,
        showAvatar: !isGrouped,
      });

      return groups;
    }, [] as Array<ChatMessageProps & { id: string; isGrouped: boolean; showAvatar: boolean }>);
  }, [messages]);

  return (
    <div ref={ref} className={cn("space-y-0", className)} {...props}>
      {groupedMessages.map((message) => (
        <ChatMessage key={message.id} {...message} />
      ))}
    </div>
  );
});

MessageThread.displayName = "MessageThread";
