"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: TreeNode[];
  disabled?: boolean;
  metadata?: Record<string, any>;
}

export interface TreeViewProps {
  data: TreeNode[];
  selectedIds?: string[];
  expandedIds?: string[];
  onSelect?: (nodeIds: string[]) => void;
  onExpand?: (nodeIds: string[]) => void;
  onNodeClick?: (node: TreeNode) => void;
  multiSelect?: boolean;
  showCheckboxes?: boolean;
  showIcons?: boolean;
  searchTerm?: string;
  defaultExpandAll?: boolean;
  className?: string;
}

interface TreeNodeItemProps {
  node: TreeNode;
  level: number;
  selectedIds: string[];
  expandedIds: string[];
  onToggleExpand: (nodeId: string) => void;
  onToggleSelect: (nodeId: string, shiftKey?: boolean) => void;
  onNodeClick?: (node: TreeNode) => void;
  multiSelect: boolean;
  showCheckboxes: boolean;
  showIcons: boolean;
  searchTerm?: string;
  getNodeCheckState: (nodeId: string) => "checked" | "unchecked" | "indeterminate";
}

// Helper function to collect all node IDs recursively
const collectNodeIds = (nodes: TreeNode[]): string[] => {
  const ids: string[] = [];
  const traverse = (nodes: TreeNode[]) => {
    nodes.forEach((node) => {
      ids.push(node.id);
      if (node.children) {
        traverse(node.children);
      }
    });
  };
  traverse(nodes);
  return ids;
};

// Helper function to get all descendant IDs
const getDescendantIds = (node: TreeNode): string[] => {
  const ids: string[] = [];
  const traverse = (node: TreeNode) => {
    if (node.children) {
      node.children.forEach((child) => {
        ids.push(child.id);
        traverse(child);
      });
    }
  };
  traverse(node);
  return ids;
};

// Helper function to filter tree nodes by search term
const filterTree = (nodes: TreeNode[], searchTerm: string): TreeNode[] => {
  if (!searchTerm) return nodes;

  const lowerSearch = searchTerm.toLowerCase();

  const filterNode = (node: TreeNode): TreeNode | null => {
    const matchesSearch = node.label.toLowerCase().includes(lowerSearch);
    const filteredChildren = node.children
      ? node.children.map(filterNode).filter((n): n is TreeNode => n !== null)
      : [];

    if (matchesSearch || filteredChildren.length > 0) {
      return {
        ...node,
        children: filteredChildren.length > 0 ? filteredChildren : node.children,
      };
    }

    return null;
  };

  return nodes.map(filterNode).filter((n): n is TreeNode => n !== null);
};

const TreeNodeItem: React.FC<TreeNodeItemProps> = ({
  node,
  level,
  selectedIds,
  expandedIds,
  onToggleExpand,
  onToggleSelect,
  onNodeClick,
  multiSelect,
  showCheckboxes,
  showIcons,
  searchTerm,
  getNodeCheckState,
}) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.includes(node.id);
  const isSelected = selectedIds.includes(node.id);
  const checkState = getNodeCheckState(node.id);
  const Icon = node.icon;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.disabled) return;

    if (hasChildren) {
      onToggleExpand(node.id);
    }

    if (!showCheckboxes) {
      onToggleSelect(node.id, e.shiftKey);
    }

    if (onNodeClick) {
      onNodeClick(node);
    }
  };

  const handleCheckboxChange = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.disabled) return;
    onToggleSelect(node.id, false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (node.disabled) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (showCheckboxes) {
          onToggleSelect(node.id, false);
        } else {
          onToggleSelect(node.id, e.shiftKey);
        }
        if (onNodeClick) {
          onNodeClick(node);
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        if (hasChildren && !isExpanded) {
          onToggleExpand(node.id);
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (hasChildren && isExpanded) {
          onToggleExpand(node.id);
        }
        break;
    }
  };

  return (
    <div className="select-none">
      <div
        className={cn(
          "group flex items-center gap-2 py-1.5 px-2 cursor-pointer transition-colors rounded-brutal",
          "hover:bg-muted/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          isSelected && !showCheckboxes && "bg-primary/10 border border-primary/20",
          node.disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          level > 0 && "border-l-2 border-muted ml-2"
        )}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={node.disabled ? -1 : 0}
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-selected={isSelected}
        aria-disabled={node.disabled}
      >
        {/* Expand/Collapse Icon */}
        <div className="flex-shrink-0 w-4 h-4">
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )
          ) : null}
        </div>

        {/* Checkbox */}
        {showCheckboxes && (
          <div onClick={handleCheckboxChange}>
            <Checkbox
              checked={
                checkState === "checked"
                  ? true
                  : checkState === "indeterminate"
                    ? "indeterminate"
                    : false
              }
              disabled={node.disabled}
              className="h-4 w-4"
            />
          </div>
        )}

        {/* Node Icon */}
        {showIcons && Icon && (
          <Icon className="h-4 w-4 text-primary flex-shrink-0" />
        )}

        {/* Label */}
        <span
          className={cn(
            "text-sm font-medium text-foreground flex-1 truncate",
            node.disabled && "text-muted-foreground"
          )}
        >
          {node.label}
        </span>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div role="group">
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              level={level + 1}
              selectedIds={selectedIds}
              expandedIds={expandedIds}
              onToggleExpand={onToggleExpand}
              onToggleSelect={onToggleSelect}
              onNodeClick={onNodeClick}
              multiSelect={multiSelect}
              showCheckboxes={showCheckboxes}
              showIcons={showIcons}
              searchTerm={searchTerm}
              getNodeCheckState={getNodeCheckState}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const TreeView: React.FC<TreeViewProps> = ({
  data,
  selectedIds: controlledSelectedIds,
  expandedIds: controlledExpandedIds,
  onSelect,
  onExpand,
  onNodeClick,
  multiSelect = false,
  showCheckboxes = false,
  showIcons = true,
  searchTerm,
  defaultExpandAll = false,
  className,
}) => {
  // Internal state for uncontrolled mode
  const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>([]);
  const [internalExpandedIds, setInternalExpandedIds] = useState<string[]>([]);

  // Use controlled or internal state
  const selectedIds = controlledSelectedIds ?? internalSelectedIds;
  const expandedIds = controlledExpandedIds ?? internalExpandedIds;

  // Filter tree based on search term
  const filteredData = useMemo(() => {
    return filterTree(data, searchTerm || "");
  }, [data, searchTerm]);

  // Auto-expand all nodes if defaultExpandAll is true
  useEffect(() => {
    if (defaultExpandAll && !controlledExpandedIds) {
      const allIds = collectNodeIds(filteredData);
      setInternalExpandedIds(allIds);
    }
  }, [defaultExpandAll, filteredData, controlledExpandedIds]);

  // Auto-expand matched nodes when searching
  useEffect(() => {
    if (searchTerm && !controlledExpandedIds) {
      const allIds = collectNodeIds(filteredData);
      setInternalExpandedIds(allIds);
    }
  }, [searchTerm, filteredData, controlledExpandedIds]);

  // Get node by ID
  const findNode = useCallback(
    (nodeId: string): TreeNode | null => {
      const search = (nodes: TreeNode[]): TreeNode | null => {
        for (const node of nodes) {
          if (node.id === nodeId) return node;
          if (node.children) {
            const found = search(node.children);
            if (found) return found;
          }
        }
        return null;
      };
      return search(data);
    },
    [data]
  );

  // Calculate checkbox state (checked, unchecked, indeterminate)
  const getNodeCheckState = useCallback(
    (nodeId: string): "checked" | "unchecked" | "indeterminate" => {
      const node = findNode(nodeId);
      if (!node || !showCheckboxes) return "unchecked";

      const isNodeSelected = selectedIds.includes(nodeId);

      if (!node.children || node.children.length === 0) {
        return isNodeSelected ? "checked" : "unchecked";
      }

      const descendantIds = getDescendantIds(node);
      const selectedDescendants = descendantIds.filter((id) =>
        selectedIds.includes(id)
      );

      if (selectedDescendants.length === 0 && !isNodeSelected) {
        return "unchecked";
      }

      if (
        selectedDescendants.length === descendantIds.length &&
        isNodeSelected
      ) {
        return "checked";
      }

      return "indeterminate";
    },
    [selectedIds, findNode, showCheckboxes]
  );

  // Toggle expand/collapse
  const handleToggleExpand = useCallback(
    (nodeId: string) => {
      const newExpandedIds = expandedIds.includes(nodeId)
        ? expandedIds.filter((id) => id !== nodeId)
        : [...expandedIds, nodeId];

      if (onExpand) {
        onExpand(newExpandedIds);
      } else {
        setInternalExpandedIds(newExpandedIds);
      }
    },
    [expandedIds, onExpand]
  );

  // Toggle select
  const handleToggleSelect = useCallback(
    (nodeId: string, shiftKey?: boolean) => {
      const node = findNode(nodeId);
      if (!node) return;

      let newSelectedIds: string[];

      if (showCheckboxes) {
        // Checkbox mode: toggle node and all descendants
        const descendantIds = getDescendantIds(node);
        const allIds = [nodeId, ...descendantIds];
        const isCurrentlySelected = selectedIds.includes(nodeId);

        if (isCurrentlySelected) {
          // Unselect node and descendants
          newSelectedIds = selectedIds.filter((id) => !allIds.includes(id));
        } else {
          // Select node and descendants
          newSelectedIds = [...selectedIds, ...allIds.filter((id) => !selectedIds.includes(id))];
        }
      } else {
        // Non-checkbox mode: single or multi-select
        if (multiSelect && shiftKey) {
          // Add to selection
          newSelectedIds = selectedIds.includes(nodeId)
            ? selectedIds.filter((id) => id !== nodeId)
            : [...selectedIds, nodeId];
        } else if (multiSelect) {
          // Toggle in multi-select mode
          newSelectedIds = selectedIds.includes(nodeId)
            ? selectedIds.filter((id) => id !== nodeId)
            : [...selectedIds, nodeId];
        } else {
          // Single select mode
          newSelectedIds = selectedIds.includes(nodeId) ? [] : [nodeId];
        }
      }

      if (onSelect) {
        onSelect(newSelectedIds);
      } else {
        setInternalSelectedIds(newSelectedIds);
      }
    },
    [selectedIds, findNode, multiSelect, showCheckboxes, onSelect]
  );

  return (
    <div
      className={cn(
        "rounded-brutal border-2 border-brutal bg-card p-4 shadow-brutal",
        className
      )}
      role="tree"
      aria-multiselectable={multiSelect}
    >
      {filteredData.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          {searchTerm ? "No matching nodes found" : "No data available"}
        </div>
      ) : (
        <div className="space-y-1">
          {filteredData.map((node) => (
            <TreeNodeItem
              key={node.id}
              node={node}
              level={0}
              selectedIds={selectedIds}
              expandedIds={expandedIds}
              onToggleExpand={handleToggleExpand}
              onToggleSelect={handleToggleSelect}
              onNodeClick={onNodeClick}
              multiSelect={multiSelect}
              showCheckboxes={showCheckboxes}
              showIcons={showIcons}
              searchTerm={searchTerm}
              getNodeCheckState={getNodeCheckState}
            />
          ))}
        </div>
      )}
    </div>
  );
};
