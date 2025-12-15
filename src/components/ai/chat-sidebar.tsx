'use client';

/**
 * AI Chat Sidebar
 * Conversation history sidebar with search and management
 */

import { useState } from 'react';
import {
  MessageSquare,
  Plus,
  Trash2,
  Edit2,
  Settings,
  LogOut,
  UserCircle,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface Conversation {
  id: string;
  title: string;
  lastMessage?: string;
  updatedAt: Date;
}

interface AIChatSidebarProps {
  /** List of conversations */
  conversations: Conversation[];
  /** Currently active conversation ID */
  activeConversationId?: string;
  /** Callback when a conversation is selected */
  onSelectConversation?: (id: string) => void;
  /** Callback when new chat is clicked */
  onNewChat?: () => void;
  /** Callback when a conversation is deleted */
  onDeleteConversation?: (id: string) => void;
  /** Callback when a conversation is renamed */
  onRenameConversation?: (id: string, newTitle: string) => void;
  /** User name to display */
  userName?: string;
  /** User email to display */
  userEmail?: string;
  /** Whether sidebar is collapsed */
  isCollapsed?: boolean;
  /** Callback when sidebar toggle is clicked */
  onToggleSidebar?: () => void;
  /** Custom class name */
  className?: string;
}

export function AIChatSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  onRenameConversation,
  userName = 'User',
  userEmail,
  isCollapsed = false,
  onToggleSidebar,
  className,
}: AIChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filter conversations by search query
  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRename = (id: string, title: string) => {
    setEditingId(id);
    setEditTitle(title);
  };

  const handleSaveRename = (id: string) => {
    if (editTitle.trim()) {
      onRenameConversation?.(id, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle('');
  };

  const handleDelete = (id: string) => {
    onDeleteConversation?.(id);
    setExpandedId(null);
  };

  if (isCollapsed) {
    return null;
  }

  return (
    <div
      className={cn(
        'border-border bg-background flex w-64 flex-col border-r transition-all',
        className
      )}
    >
      {/* Header with New Chat Button */}
      <div className="flex items-center gap-1 p-2">
        <Button
          size="sm"
          variant="outline"
          onClick={onNewChat}
          className={cn(
            'flex-1 justify-start gap-1.5 px-2 py-1.5 text-xs uppercase',
            mode.radius,
            mode.font
          )}
        >
          <Plus className="size-3.5" />
          New Chat
        </Button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 space-y-0.5 overflow-y-auto px-1.5 py-1">
        {conversations.length === 0 ? (
          <div className="p-3 text-center">
            <p className={cn('text-muted-foreground text-xs', mode.font)}>No conversations yet</p>
          </div>
        ) : (
          conversations.map((conv) => (
            <div key={conv.id} className="relative">
              {editingId === conv.id ? (
                // Edit mode
                <div className="px-2 py-1">
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveRename(conv.id);
                      if (e.key === 'Escape') setEditingId(null);
                    }}
                    onBlur={() => handleSaveRename(conv.id)}
                    autoFocus
                    className={cn('h-7 text-xs', mode.radius, mode.font)}
                  />
                </div>
              ) : (
                // Normal mode
                <button
                  onClick={() => onSelectConversation?.(conv.id)}
                  onMouseEnter={() => setExpandedId(conv.id)}
                  onMouseLeave={() => setExpandedId(null)}
                  className={cn(
                    'group flex w-full items-center justify-between px-2 py-1.5 text-left text-xs transition-colors',
                    mode.radius,
                    mode.font,
                    activeConversationId === conv.id ? 'bg-muted' : 'hover:bg-muted/50'
                  )}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <MessageSquare className="size-3.5 shrink-0" />
                    <span className="truncate">{conv.title}</span>
                  </div>

                  {/* Action buttons (show on hover or when active) */}
                  {(expandedId === conv.id || activeConversationId === conv.id) && (
                    <div className="flex items-center gap-0.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRename(conv.id, conv.title);
                        }}
                        className="hover:bg-muted rounded p-0.5 transition-colors"
                        aria-label="Rename conversation"
                      >
                        <Edit2 className="size-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(conv.id);
                        }}
                        className="text-destructive hover:bg-destructive/10 rounded p-0.5 transition-colors"
                        aria-label="Delete conversation"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    </div>
                  )}
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* User Info with Menu */}
      <div className="border-border border-t p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                'hover:bg-muted flex w-full items-center gap-2 p-1.5 transition-colors',
                mode.radius,
                mode.font
              )}
            >
              <div
                className={cn(
                  'bg-primary text-primary-foreground flex size-7 shrink-0 items-center justify-center text-xs font-bold',
                  mode.radius
                )}
              >
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className={cn('truncate text-xs font-medium', mode.font)}>{userName}</p>
                {userEmail && (
                  <p className={cn('truncate text-[10px]', mode.font, mode.color.text.muted)}>
                    {userEmail}
                  </p>
                )}
              </div>
              <ChevronDown className={cn('size-3.5 shrink-0', mode.color.text.muted)} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className={cn('w-48', mode.radius, mode.font)}>
            <DropdownMenuItem className={cn('text-xs', mode.font)}>
              <UserCircle className="mr-1.5 size-3.5" />
              PROFILE
            </DropdownMenuItem>
            <DropdownMenuItem className={cn('text-xs', mode.font)}>
              <Settings className="mr-1.5 size-3.5" />
              SETTINGS
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={cn('text-xs', mode.font)}>
              <LogOut className="mr-1.5 size-3.5" />
              LOG OUT
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
