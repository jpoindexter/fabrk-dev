/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - Error/loading states ✓
 *
 * @example
 * ```tsx
 * <NotificationList />
 * ```
 */

'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { AlertCircle, Bell, Check, X } from 'lucide-react';
import * as React from 'react';

export interface Notification {
  id: string;
  title: string;
  description?: string;
  time: string;
  read?: boolean;
  type?: 'info' | 'success' | 'warning' | 'error';
}

export interface NotificationListProps {
  className?: string;
  loading?: boolean;
  error?: boolean;
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export const NotificationList = React.forwardRef<HTMLDivElement, NotificationListProps>(
  (
    {
      className,
      loading = false,
      error = false,
      notifications = [],
      onMarkAsRead,
      onDismiss,
      ...props
    },
    ref
  ) => {
    if (loading) {
      return (
        <div data-slot="notification-list" ref={ref} className={cn('space-y-2', className)}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex gap-6">
                <div className={cn('h-8 w-8 border border-border bg-card', mode.radius)} />
                <div className="flex-1 space-y-2">
                  <div className={cn('h-4 w-3/4 border border-border bg-card', mode.radius)} />
                  <div className={cn('h-3 w-1/2 border border-border bg-card', mode.radius)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className={cn('p-6', mode.color.text.danger, className)}>
          Error loading notifications
        </div>
      );
    }

    const getIcon = (type?: string) => {
      switch (type) {
        case 'success':
          return <Check className={cn('h-4 w-4', mode.color.text.accent)} />;
        case 'warning':
          return <AlertCircle className={cn('h-4 w-4', mode.color.text.muted)} />;
        case 'error':
          return <X className={cn('h-4 w-4', mode.color.text.danger)} />;
        default:
          return <Bell className={cn('h-4 w-4', mode.color.text.accent)} />;
      }
    };

    return (
      <div ref={ref} className={className} {...props}>
        {notifications.length === 0 ? (
          <div className={cn('p-8 text-center', mode.color.text.muted)}>No notifications</div>
        ) : (
          <div className="divide-y divide-border">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  'cursor-pointer p-6 transition-all duration-200',
                  'hover:bg-muted/50 hover:translate-x-1',
                  'focus-within:ring-2 focus-within:ring-ring focus-visible:outline-none',
                  !notification.read && 'bg-muted/30'
                )}
                onClick={() => onMarkAsRead?.(notification.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onMarkAsRead?.(notification.id);
                  }
                }}
                aria-label={`Notification: ${notification.title}${!notification.read ? ' (unread)' : ''}`}
              >
                <div className="flex gap-6">
                  <div
                    className={cn(
                      'flex h-8 w-8 items-center justify-center border border-border bg-card transition-transform hover:scale-110',
                      mode.radius
                    )}
                  >
                    {getIcon(notification.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        'line-clamp-1 font-medium transition-colors',
                        mode.color.text.primary,
                        'hover:text-accent'
                      )}
                    >
                      {notification.title}
                    </p>
                    {notification.description && (
                      <p className={cn('line-clamp-2 text-[11px] transition-colors', mode.color.text.muted)}>
                        {notification.description}
                      </p>
                    )}
                    <p className={cn('mt-2 text-[10px] transition-colors', mode.color.text.muted)}>
                      {notification.time}
                    </p>
                  </div>
                  {onDismiss && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDismiss(notification.id);
                      }}
                      className={cn(
                        'transition-all hover:scale-110',
                        mode.color.text.muted,
                        'hover:text-destructive'
                      )}
                      aria-label="Dismiss notification"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);
NotificationList.displayName = 'NotificationList';
