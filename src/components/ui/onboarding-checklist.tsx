/**
 * ✅ FABRK COMPONENT - PRO PACK
 * Onboarding Checklist - Track user setup progress
 *
 * Features:
 * - Checklist of onboarding tasks
 * - Progress bar (X/Y complete)
 * - Mark tasks as complete
 * - Expandable "How to" details
 * - Dismiss/minimize widget
 * - Celebration animation on completion
 *
 * Design System Integration:
 * - Terminal aesthetic with mode.radius, mode.font
 * - Design tokens only
 * - 8-point grid spacing
 * - WCAG 2.1 AA compliant
 *
 * @example
 * ```tsx
 * <OnboardingChecklist
 *   tasks={[
 *     { id: '1', title: 'Connect integration', completed: true },
 *     { id: '2', title: 'Invite team', completed: false }
 *   ]}
 * />
 * ```
 */

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Card } from './card';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { Progress } from './progress';
import { ChevronDown, ChevronUp, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface OnboardingTask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  link?: {
    text: string;
    href: string;
  };
}

export interface OnboardingChecklistProps {
  className?: string;
  tasks: OnboardingTask[];
  onTaskToggle?: (taskId: string, completed: boolean) => void | Promise<void>;
  onDismiss?: () => void;
  showCelebration?: boolean;
}

export function OnboardingChecklist({
  className,
  tasks,
  onTaskToggle,
  onDismiss,
  showCelebration = true,
}: OnboardingChecklistProps) {
  const [isMinimized, setIsMinimized] = React.useState(false);
  const [expandedTaskId, setExpandedTaskId] = React.useState<string | null>(null);
  const [showConfetti, setShowConfetti] = React.useState(false);

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progress = (completedCount / totalCount) * 100;
  const isComplete = completedCount === totalCount;

  // Show celebration when all tasks complete
  React.useEffect(() => {
    if (isComplete && showCelebration && completedCount > 0) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isComplete, showCelebration, completedCount]);

  const handleTaskToggle = async (taskId: string, checked: boolean) => {
    if (onTaskToggle) {
      await onTaskToggle(taskId, checked);
    }
  };

  if (isMinimized) {
    return (
      <Card className={cn('flex items-center justify-between gap-4 p-4', mode.radius, className)}>
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsMinimized(false)}
            aria-label="Expand checklist"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
          <div>
            <p className={cn('text-sm font-medium', mode.font)}>[ ONBOARDING PROGRESS ]</p>
            <p className={cn('text-muted-foreground text-xs', mode.font)}>
              {completedCount}/{totalCount} tasks completed
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-24">
            <Progress value={progress} className="h-2" />
          </div>
          {onDismiss && (
            <Button size="sm" variant="ghost" onClick={onDismiss} aria-label="Dismiss">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn('relative overflow-hidden', mode.radius, className)}>
      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-primary/10 pointer-events-none absolute inset-0 z-10"
          >
            <div className="flex h-full items-center justify-center">
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="text-primary h-16 w-16" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="border-border flex items-center justify-between border-b p-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className={cn('text-sm font-semibold tracking-tight', mode.font)}>
              [ GETTING STARTED ]
            </h3>
            {isComplete && <span className="text-success text-xs">✓ COMPLETE</span>}
          </div>
          <p className={cn('text-muted-foreground mt-1 text-xs', mode.font)}>
            {completedCount}/{totalCount} tasks completed
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsMinimized(true)}
            aria-label="Minimize"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          {onDismiss && (
            <Button size="sm" variant="ghost" onClick={onDismiss} aria-label="Dismiss">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="border-border border-b p-4">
        <Progress value={progress} className="h-2" />
        <p className={cn('text-muted-foreground mt-2 text-right text-xs', mode.font)}>
          {Math.round(progress)}% complete
        </p>
      </div>

      {/* Tasks List */}
      <div className="divide-border divide-y">
        {tasks.map((task, index) => (
          <div key={task.id} className="p-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={(checked) => handleTaskToggle(task.id, checked as boolean)}
                className="mt-0.5"
              />

              <div className="flex-1 space-y-1">
                <label
                  htmlFor={`task-${task.id}`}
                  className={cn(
                    'cursor-pointer text-sm',
                    mode.font,
                    task.completed && 'text-muted-foreground line-through opacity-60'
                  )}
                >
                  [{String(index + 1).padStart(2, '0')}]: {task.title}
                </label>

                {task.description && (
                  <div className="space-y-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setExpandedTaskId(expandedTaskId === task.id ? null : task.id)}
                      className={cn('h-auto p-0 text-xs', mode.font)}
                    >
                      {expandedTaskId === task.id ? (
                        <>
                          <ChevronUp className="mr-1 h-3 w-3" />
                          [HIDE_DETAILS]
                        </>
                      ) : (
                        <>
                          <ChevronDown className="mr-1 h-3 w-3" />
                          [SHOW_DETAILS]
                        </>
                      )}
                    </Button>

                    <AnimatePresence>
                      {expandedTaskId === task.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="bg-muted border-border space-y-2 border px-4 py-2">
                            <p className={cn('text-muted-foreground text-xs', mode.font)}>
                              {task.description}
                            </p>

                            {task.link && (
                              <a
                                href={task.link.href}
                                className={cn(
                                  'text-primary inline-block text-xs hover:underline',
                                  mode.font
                                )}
                              >
                                {'> '}
                                {task.link.text}
                              </a>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completion Message */}
      {isComplete && (
        <div className="bg-success/10 border-success border-t p-4">
          <p className={cn('text-success text-sm', mode.font)}>
            🎉 [SETUP_COMPLETE]: You're all set! Start building amazing things.
          </p>
        </div>
      )}
    </Card>
  );
}
