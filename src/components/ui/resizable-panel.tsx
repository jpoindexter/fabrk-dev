"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GripVertical, GripHorizontal } from "lucide-react";

export type ResizeDirection = "horizontal" | "vertical";

interface ResizablePanelProps {
  children: [React.ReactNode, React.ReactNode];
  direction?: ResizeDirection;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  onResize?: (size: number) => void;
  className?: string;
  showHandle?: boolean;
}

export function ResizablePanel({
  children,
  direction = "horizontal",
  defaultSize = 50,
  minSize = 10,
  maxSize = 90,
  onResize,
  className,
  showHandle = true,
}: ResizablePanelProps) {
  const [size, setSize] = React.useState(defaultSize);
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const isHorizontal = direction === "horizontal";

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  React.useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      let clientPos: number;
      if (e instanceof MouseEvent) {
        clientPos = isHorizontal ? e.clientX : e.clientY;
      } else {
        const touch = e.touches[0];
        clientPos = isHorizontal ? touch.clientX : touch.clientY;
      }

      const containerStart = isHorizontal ? rect.left : rect.top;
      const containerSize = isHorizontal ? rect.width : rect.height;
      const position = clientPos - containerStart;

      let newSize = (position / containerSize) * 100;
      newSize = Math.max(minSize, Math.min(maxSize, newSize));

      setSize(newSize);
      onResize?.(newSize);
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("touchend", handleEnd);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, isHorizontal, minSize, maxSize, onResize]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex",
        isHorizontal ? "flex-row" : "flex-col",
        className
      )}
      style={{ width: "100%", height: "100%" }}
    >
      <div
        className="overflow-auto"
        style={{
          [isHorizontal ? "width" : "height"]: `${size}%`,
        }}
      >
        {children[0]}
      </div>

      <div
        className={cn(
          "group flex items-center justify-center bg-border transition-colors",
          isHorizontal ? "w-1 hover:w-2 cursor-col-resize" : "h-1 hover:h-2 cursor-row-resize",
          isDragging && "bg-primary",
          showHandle && (isHorizontal ? "hover:bg-primary/50" : "hover:bg-primary/50")
        )}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        role="separator"
        aria-orientation={direction}
        aria-valuenow={size}
        aria-valuemin={minSize}
        aria-valuemax={maxSize}
      >
        {showHandle && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            {isHorizontal ? (
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            ) : (
              <GripHorizontal className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        )}
      </div>

      <div
        className="flex-1 overflow-auto"
        style={{
          [isHorizontal ? "width" : "height"]: `${100 - size}%`,
        }}
      >
        {children[1]}
      </div>
    </div>
  );
}

interface ResizableThreePanelProps {
  children: [React.ReactNode, React.ReactNode, React.ReactNode];
  direction?: ResizeDirection;
  defaultSizes?: [number, number];
  minSize?: number;
  maxSize?: number;
  className?: string;
  showHandles?: boolean;
}

export function ResizableThreePanel({
  children,
  direction = "horizontal",
  defaultSizes = [33, 33],
  minSize = 10,
  maxSize = 80,
  className,
  showHandles = true,
}: ResizableThreePanelProps) {
  const [size1, setSize1] = React.useState(defaultSizes[0]);
  const [size2, setSize2] = React.useState(defaultSizes[1]);

  const size3 = 100 - size1 - size2;

  return (
    <div
      className={cn(
        "flex",
        direction === "horizontal" ? "flex-row" : "flex-col",
        className
      )}
      style={{ width: "100%", height: "100%" }}
    >
      <ResizablePanel
        direction={direction}
        defaultSize={size1}
        minSize={minSize}
        maxSize={maxSize}
        onResize={setSize1}
        showHandle={showHandles}
      >
        <div className="w-full h-full">{children[0]}</div>
        <div className="w-full h-full">
          <ResizablePanel
            direction={direction}
            defaultSize={(size2 / (size2 + size3)) * 100}
            minSize={minSize}
            maxSize={maxSize}
            onResize={(newSize) => {
              const totalRemaining = 100 - size1;
              setSize2((newSize * totalRemaining) / 100);
            }}
            showHandle={showHandles}
          >
            <div className="w-full h-full">{children[1]}</div>
            <div className="w-full h-full">{children[2]}</div>
          </ResizablePanel>
        </div>
      </ResizablePanel>
    </div>
  );
}
