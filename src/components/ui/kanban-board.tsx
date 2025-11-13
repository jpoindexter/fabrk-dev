"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  ChevronUp,
  ChevronDown,
  Calendar,
} from "lucide-react";

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  assignee?: { name: string; avatar?: string };
  tags?: string[];
  priority?: "low" | "medium" | "high";
  dueDate?: Date | string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
  color?: string;
  collapsed?: boolean;
  limit?: number;
}

export interface KanbanBoardProps {
  columns: KanbanColumn[];
  onCardMove?: (
    cardId: string,
    fromColumn: string,
    toColumn: string,
    toIndex: number
  ) => void;
  onCardAdd?: (columnId: string) => void;
  onCardEdit?: (cardId: string, columnId: string) => void;
  onCardDelete?: (cardId: string, columnId: string) => void;
  onColumnAdd?: () => void;
  onColumnToggle?: (columnId: string) => void;
  className?: string;
}

const priorityColors = {
  low: "bg-accent text-accent-foreground",
  medium: "bg-secondary text-secondary-foreground",
  high: "bg-destructive text-destructive-foreground",
};

export function KanbanBoard({
  columns,
  onCardMove,
  onCardAdd,
  onCardEdit,
  onCardDelete,
  onColumnAdd,
  onColumnToggle,
  className,
}: KanbanBoardProps) {
  const [draggedCard, setDraggedCard] = React.useState<{
    cardId: string;
    columnId: string;
  } | null>(null);
  const [draggedOverColumn, setDraggedOverColumn] = React.useState<string | null>(null);

  const handleDragStart = (
    e: React.DragEvent,
    cardId: string,
    columnId: string
  ) => {
    setDraggedCard({ cardId, columnId });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.currentTarget.innerHTML);
    (e.currentTarget as HTMLElement).style.opacity = "0.4";
  };

  const handleDragEnd = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = "1";
    setDraggedCard(null);
    setDraggedOverColumn(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (columnId: string) => {
    setDraggedOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDraggedOverColumn(null);
  };

  const handleDrop = (
    e: React.DragEvent,
    targetColumnId: string,
    targetIndex?: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedCard || !onCardMove) return;

    const { cardId, columnId: fromColumnId } = draggedCard;

    if (fromColumnId === targetColumnId && targetIndex === undefined) {
      return;
    }

    const targetColumn = columns.find((col) => col.id === targetColumnId);
    const finalIndex = targetIndex ?? targetColumn?.cards.length ?? 0;

    onCardMove(cardId, fromColumnId, targetColumnId, finalIndex);
    setDraggedOverColumn(null);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className={cn("flex h-full w-full", className)}>
      <div className="flex gap-4 overflow-x-auto p-4">
        {columns.map((column) => {
          const isOverLimit = column.limit && column.cards.length > column.limit;
          const isDraggedOver = draggedOverColumn === column.id;

          return (
            <div
              key={column.id}
              className={cn(
                "flex min-w-[300px] flex-col rounded-brutal border-2 border-brutal bg-card shadow-brutal transition-all",
                isDraggedOver && "ring-4 ring-primary ring-offset-2"
              )}
              onDragOver={handleDragOver}
              onDragEnter={() => handleDragEnter(column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {/* Column Header */}
              <div
                className={cn(
                  "flex items-center justify-between border-b-2 border-brutal p-4",
                  column.color && `border-l-4`,
                )}
                style={column.color ? { borderLeftColor: column.color } : {}}
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-foreground">{column.title}</h3>
                  <Badge variant="neutral" className="shadow-brutal-sm">
                    {column.cards.length}
                  </Badge>
                  {column.limit && (
                    <Badge
                      variant={isOverLimit ? "default" : "neutral"}
                      className={cn(
                        "shadow-brutal-sm",
                        isOverLimit && "bg-destructive text-destructive-foreground"
                      )}
                    >
                      {column.limit}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {onColumnToggle && (
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onColumnToggle(column.id)}
                      aria-label={column.collapsed ? "Expand" : "Collapse"}
                    >
                      {column.collapsed ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronUp className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {/* Column Content */}
              {!column.collapsed && (
                <>
                  {/* Cards */}
                  <div className="flex-1 space-y-3 overflow-y-auto p-4">
                    {column.cards.map((card, index) => (
                      <div
                        key={card.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, card.id, column.id)}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, column.id, index)}
                        className={cn(
                          "group cursor-move rounded-brutal border-2 border-brutal bg-background p-4 shadow-brutal transition-all hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1",
                          draggedCard?.cardId === card.id && "opacity-40"
                        )}
                      >
                        {/* Card Header */}
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <h4 className="flex-1 font-bold text-foreground">
                            {card.title}
                          </h4>
                          <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                            {onCardEdit && (
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => onCardEdit(card.id, column.id)}
                                aria-label="Edit card"
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                            )}
                            {onCardDelete && (
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => onCardDelete(card.id, column.id)}
                                aria-label="Delete card"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Card Description */}
                        {card.description && (
                          <p className="mb-3 text-sm text-muted-foreground">
                            {card.description}
                          </p>
                        )}

                        {/* Card Footer */}
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Priority */}
                          {card.priority && (
                            <Badge
                              className={cn(
                                "shadow-brutal-sm",
                                priorityColors[card.priority]
                              )}
                            >
                              {card.priority}
                            </Badge>
                          )}

                          {/* Tags */}
                          {card.tags?.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="shadow-brutal-sm"
                            >
                              {tag}
                            </Badge>
                          ))}

                          {/* Due Date */}
                          {card.dueDate && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(card.dueDate)}</span>
                            </div>
                          )}

                          {/* Assignee */}
                          {card.assignee && (
                            <div className="ml-auto">
                              <Avatar className="h-6 w-6">
                                {card.assignee.avatar && (
                                  <AvatarImage
                                    src={card.assignee.avatar}
                                    alt={card.assignee.name}
                                  />
                                )}
                                <AvatarFallback className="text-xs">
                                  {getInitials(card.assignee.name)}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Card Button */}
                  {onCardAdd && (
                    <div className="border-t-2 border-brutal p-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onCardAdd(column.id)}
                        className="w-full justify-start"
                      >
                        <Plus className="h-4 w-4" />
                        Add Card
                      </Button>
                    </div>
                  )}
                </>
              )}

              {/* Collapsed State */}
              {column.collapsed && (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  {column.cards.length} cards
                </div>
              )}
            </div>
          );
        })}

        {/* Add Column Button */}
        {onColumnAdd && (
          <div className="flex min-w-[300px] items-start">
            <Button
              variant="outline"
              size="default"
              onClick={onColumnAdd}
              className="w-full"
            >
              <Plus className="h-4 w-4" />
              Add Column
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
