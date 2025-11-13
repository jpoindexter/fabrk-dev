"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
  onEndReached?: () => void;
  endReachedThreshold?: number;
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
}

export function VirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 3,
  className,
  onEndReached,
  endReachedThreshold = 0.8,
  loading = false,
  loadingComponent,
  emptyComponent,
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);
  const offsetY = startIndex * itemHeight;

  const handleScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      const newScrollTop = target.scrollTop;
      setScrollTop(newScrollTop);

      // Check if we've reached the threshold for loading more
      if (onEndReached) {
        const scrollPercentage =
          (newScrollTop + containerHeight) / totalHeight;
        if (scrollPercentage >= endReachedThreshold && !loading) {
          onEndReached();
        }
      }
    },
    [containerHeight, totalHeight, onEndReached, endReachedThreshold, loading]
  );

  if (items.length === 0 && !loading) {
    return (
      <div
        className={cn("flex items-center justify-center", className)}
        style={{ height: containerHeight }}
      >
        {emptyComponent || (
          <p className="text-sm text-muted-foreground">No items to display</p>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("overflow-auto", className)}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div key={startIndex + index} style={{ height: itemHeight }}>
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
      {loading && (
        <div className="flex items-center justify-center p-4">
          {loadingComponent || (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
              <span>Loading...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface DynamicVirtualListProps<T> {
  items: T[];
  containerHeight: number;
  estimatedItemHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
  onEndReached?: () => void;
  endReachedThreshold?: number;
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
}

export function DynamicVirtualList<T>({
  items,
  containerHeight,
  estimatedItemHeight,
  renderItem,
  overscan = 3,
  className,
  onEndReached,
  endReachedThreshold = 0.8,
  loading = false,
  loadingComponent,
  emptyComponent,
}: DynamicVirtualListProps<T>) {
  const [scrollTop, setScrollTop] = React.useState(0);
  const [heights, setHeights] = React.useState<Map<number, number>>(new Map());
  const containerRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<Map<number, HTMLDivElement>>(new Map());

  React.useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const newHeights = new Map(heights);
      let changed = false;

      entries.forEach((entry) => {
        const index = Number(entry.target.getAttribute("data-index"));
        const height = entry.contentRect.height;
        if (heights.get(index) !== height) {
          newHeights.set(index, height);
          changed = true;
        }
      });

      if (changed) {
        setHeights(newHeights);
      }
    });

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [items.length]);

  const getItemOffset = (index: number): number => {
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += heights.get(i) || estimatedItemHeight;
    }
    return offset;
  };

  const getTotalHeight = (): number => {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += heights.get(i) || estimatedItemHeight;
    }
    return total;
  };

  const getVisibleRange = (): [number, number] => {
    let startIndex = 0;
    let currentOffset = 0;

    for (let i = 0; i < items.length; i++) {
      const itemHeight = heights.get(i) || estimatedItemHeight;
      if (currentOffset + itemHeight > scrollTop) {
        startIndex = Math.max(0, i - overscan);
        break;
      }
      currentOffset += itemHeight;
    }

    let endIndex = startIndex;
    currentOffset = getItemOffset(startIndex);

    for (let i = startIndex; i < items.length; i++) {
      const itemHeight = heights.get(i) || estimatedItemHeight;
      if (currentOffset > scrollTop + containerHeight) {
        endIndex = Math.min(items.length - 1, i + overscan);
        break;
      }
      currentOffset += itemHeight;
      endIndex = i;
    }

    return [startIndex, endIndex];
  };

  const [startIndex, endIndex] = getVisibleRange();
  const visibleItems = items.slice(startIndex, endIndex + 1);
  const offsetY = getItemOffset(startIndex);
  const totalHeight = getTotalHeight();

  const handleScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      const newScrollTop = target.scrollTop;
      setScrollTop(newScrollTop);

      if (onEndReached) {
        const scrollPercentage =
          (newScrollTop + containerHeight) / totalHeight;
        if (scrollPercentage >= endReachedThreshold && !loading) {
          onEndReached();
        }
      }
    },
    [containerHeight, totalHeight, onEndReached, endReachedThreshold, loading]
  );

  if (items.length === 0 && !loading) {
    return (
      <div
        className={cn("flex items-center justify-center", className)}
        style={{ height: containerHeight }}
      >
        {emptyComponent || (
          <p className="text-sm text-muted-foreground">No items to display</p>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("overflow-auto", className)}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => {
            const actualIndex = startIndex + index;
            return (
              <div
                key={actualIndex}
                ref={(el) => {
                  if (el) {
                    itemRefs.current.set(actualIndex, el);
                  } else {
                    itemRefs.current.delete(actualIndex);
                  }
                }}
                data-index={actualIndex}
              >
                {renderItem(item, actualIndex)}
              </div>
            );
          })}
        </div>
      </div>
      {loading && (
        <div className="flex items-center justify-center p-4">
          {loadingComponent || (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
              <span>Loading...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface GridVirtualListProps<T> {
  items: T[];
  containerHeight: number;
  containerWidth: number;
  itemHeight: number;
  itemWidth: number;
  columns: number;
  gap?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
  onEndReached?: () => void;
  endReachedThreshold?: number;
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
}

export function GridVirtualList<T>({
  items,
  containerHeight,
  containerWidth,
  itemHeight,
  itemWidth,
  columns,
  gap = 0,
  renderItem,
  overscan = 1,
  className,
  onEndReached,
  endReachedThreshold = 0.8,
  loading = false,
  loadingComponent,
  emptyComponent,
}: GridVirtualListProps<T>) {
  const [scrollTop, setScrollTop] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const rows = Math.ceil(items.length / columns);
  const rowHeight = itemHeight + gap;
  const totalHeight = rows * rowHeight;

  const startRow = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const endRow = Math.min(
    rows - 1,
    Math.ceil((scrollTop + containerHeight) / rowHeight) + overscan
  );

  const startIndex = startRow * columns;
  const endIndex = Math.min(items.length - 1, (endRow + 1) * columns - 1);

  const visibleItems = items.slice(startIndex, endIndex + 1);
  const offsetY = startRow * rowHeight;

  const handleScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      const newScrollTop = target.scrollTop;
      setScrollTop(newScrollTop);

      if (onEndReached) {
        const scrollPercentage =
          (newScrollTop + containerHeight) / totalHeight;
        if (scrollPercentage >= endReachedThreshold && !loading) {
          onEndReached();
        }
      }
    },
    [containerHeight, totalHeight, onEndReached, endReachedThreshold, loading]
  );

  if (items.length === 0 && !loading) {
    return (
      <div
        className={cn("flex items-center justify-center", className)}
        style={{ height: containerHeight }}
      >
        {emptyComponent || (
          <p className="text-sm text-muted-foreground">No items to display</p>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("overflow-auto", className)}
      style={{ height: containerHeight, width: containerWidth }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, ${itemWidth}px)`,
            gap: `${gap}px`,
          }}
        >
          {visibleItems.map((item, index) => {
            const actualIndex = startIndex + index;
            return (
              <div
                key={actualIndex}
                style={{ height: itemHeight, width: itemWidth }}
              >
                {renderItem(item, actualIndex)}
              </div>
            );
          })}
        </div>
      </div>
      {loading && (
        <div className="flex items-center justify-center p-4">
          {loadingComponent || (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
              <span>Loading...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
