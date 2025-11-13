/**
 * ✅ FABRK COMPONENT
 * Chat Input component with file attachments and emoji support.
 *
 * Features:
 * - Auto-growing textarea (1-5 lines)
 * - Send button (Enter key)
 * - File attachment support
 * - Character counter
 * - Loading and disabled states
 * - Keyboard shortcuts (Enter to send, Shift+Enter for new line)
 * - Theme-responsive neobrutalism styling
 *
 * @example
 * ```tsx
 * <ChatInput
 *   value={message}
 *   onChange={setMessage}
 *   onSend={handleSend}
 *   placeholder="Type a message..."
 * />
 * ```
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Paperclip,
  Smile,
  X,
  Loader2,
  File,
  Image as ImageIcon,
} from "lucide-react";

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (value: string) => void;
  onFileAttach?: (files: File[]) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
  showTypingIndicator?: boolean;
  typingUser?: string;
  className?: string;
}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  (
    {
      value,
      onChange,
      onSend,
      onFileAttach,
      placeholder = "Type a message...",
      disabled = false,
      loading = false,
      showCharCount = false,
      maxLength = 1000,
      showTypingIndicator = false,
      typingUser,
      className,
    },
    ref
  ) => {
    const [attachedFiles, setAttachedFiles] = React.useState<File[]>([]);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    // Merge refs
    React.useImperativeHandle(ref, () => textareaRef.current!);

    // Auto-resize textarea (1-5 lines)
    React.useEffect(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;
      const lineHeight = 24; // approximate line height
      const maxHeight = lineHeight * 5;
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }, [value]);

    // Handle keyboard shortcuts
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };

    // Handle send
    const handleSend = () => {
      if (!value.trim() || disabled || loading) return;
      onSend(value);
      setAttachedFiles([]);
    };

    // Handle file selection
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;

      setAttachedFiles((prev) => [...prev, ...files]);
      if (onFileAttach) {
        onFileAttach(files);
      }

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    // Remove attached file
    const removeFile = (index: number) => {
      setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    // Check if send is enabled
    const canSend = value.trim().length > 0 && !disabled && !loading;

    // Get file icon
    const getFileIcon = (file: File) => {
      if (file.type.startsWith("image/")) {
        return <ImageIcon className="h-4 w-4" />;
      }
      return <File className="h-4 w-4" />;
    };

    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {/* Typing indicator */}
        {showTypingIndicator && typingUser && (
          <div className="flex items-center gap-2 px-3">
            <div className="flex gap-1">
              <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
            </div>
            <span className="text-xs text-muted-foreground">
              {typingUser} is typing...
            </span>
          </div>
        )}

        {/* File attachments preview */}
        {attachedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 px-3">
            {attachedFiles.map((file, index) => (
              <Badge
                key={index}
                variant="neutral"
                className="gap-2 pr-1"
              >
                {getFileIcon(file)}
                <span className="max-w-[150px] truncate text-xs">
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="ml-1 rounded-brutal-sm p-0.5 hover:bg-destructive hover:text-destructive-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Input container */}
        <div className="relative flex items-end gap-2 rounded-brutal border-2 border-brutal bg-card p-2 shadow-brutal transition-brutal focus-within:shadow-brutal-lg">
          {/* Attachment button */}
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            disabled={disabled || loading}
            onClick={() => fileInputRef.current?.click()}
            className="shrink-0"
          >
            <Paperclip className="h-4 w-4" />
            <span className="sr-only">Attach file</span>
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
            disabled={disabled || loading}
          />

          {/* Textarea */}
          <div className="relative flex-1">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled || loading}
              maxLength={maxLength}
              rows={1}
              className={cn(
                "w-full resize-none bg-transparent text-sm leading-6 text-foreground outline-none placeholder:text-muted-foreground",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
              style={{ minHeight: "24px", maxHeight: "120px" }}
            />

            {/* Character counter */}
            {showCharCount && (
              <div className="absolute -bottom-5 right-0 text-xs text-muted-foreground">
                {value.length}/{maxLength}
              </div>
            )}
          </div>

          {/* Emoji button (placeholder - you can integrate emoji-picker-react) */}
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            disabled={disabled || loading}
            className="shrink-0"
          >
            <Smile className="h-4 w-4" />
            <span className="sr-only">Add emoji</span>
          </Button>

          {/* Send button */}
          <Button
            type="button"
            variant="default"
            size="icon-sm"
            onClick={handleSend}
            disabled={!canSend}
            className="shrink-0"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="sr-only">Send message</span>
          </Button>
        </div>

        {/* Keyboard shortcut hint */}
        <div className="flex justify-between px-3 text-xs text-muted-foreground">
          <span>Press Enter to send, Shift+Enter for new line</span>
        </div>
      </div>
    );
  }
);

ChatInput.displayName = "ChatInput";

export { ChatInput };
