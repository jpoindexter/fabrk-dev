/**
 * Toast Component
 * Display temporary toast notifications
 */

"use client";

import { useToast } from "@/lib/notifications/hooks";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  feature: Info,
  payment: CheckCircle,
  security: AlertTriangle,
  system: Info,
};

const colorMap = {
  success: "border-green-500 bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-100",
  error: "border-red-500 bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-100",
  warning: "border-orange-500 bg-orange-50 text-orange-900 dark:bg-orange-900/20 dark:text-orange-100",
  info: "border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100",
  feature: "border-purple-500 bg-purple-50 text-purple-900 dark:bg-purple-900/20 dark:text-purple-100",
  payment: "border-green-500 bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-100",
  security: "border-orange-500 bg-orange-50 text-orange-900 dark:bg-orange-900/20 dark:text-orange-100",
  system: "border-gray-500 bg-gray-50 text-gray-900 dark:bg-gray-900/20 dark:text-gray-100",
};

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="pointer-events-none fixed bottom-0 right-0 z-50 flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map((toast) => {
        const Icon = iconMap[toast.type];
        const colorClass = colorMap[toast.type];

        return (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto group relative flex w-full items-start gap-3 overflow-hidden rounded-lg border-l-4 p-4 shadow-lg transition-all",
              "animate-in slide-in-from-bottom-5",
              colorClass
            )}
          >
            <Icon className="mt-0.5 h-5 w-5 shrink-0" />

            <div className="flex-1 space-y-1">
              <div className="font-semibold">{toast.title}</div>
              <div className="text-sm opacity-90">{toast.message}</div>

              {toast.actionUrl && toast.actionLabel && (
                <a
                  href={toast.actionUrl}
                  className="mt-2 inline-block text-sm font-medium underline"
                >
                  {toast.actionLabel}
                </a>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
