"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Type,
  Eraser,
} from "lucide-react";

export interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  minHeight?: string;
  maxHeight?: string;
  toolbar?: "full" | "minimal" | "custom";
  customTools?: ToolbarButton[];
  className?: string;
}

export interface ToolbarButton {
  command: string;
  icon: React.ReactNode;
  value?: string;
  label: string;
}

const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
  (
    {
      value = "",
      onChange,
      placeholder = "Start typing...",
      readOnly = false,
      minHeight = "200px",
      maxHeight = "600px",
      toolbar = "full",
      customTools,
      className = "",
    },
    ref
  ) => {
    const editorRef = React.useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = React.useState(false);
    const [currentFormat, setCurrentFormat] = React.useState<
      Record<string, boolean>
    >({});

    // Merge refs
    React.useImperativeHandle(ref, () => editorRef.current as HTMLDivElement);

    // Set initial content
    React.useEffect(() => {
      if (editorRef.current && value !== editorRef.current.innerHTML) {
        editorRef.current.innerHTML = value;
      }
    }, [value]);

    // Handle content changes
    const handleInput = () => {
      if (editorRef.current && onChange) {
        onChange(editorRef.current.innerHTML);
      }
    };

    // Execute formatting command
    const executeCommand = (command: string, value?: string) => {
      document.execCommand(command, false, value);
      editorRef.current?.focus();
      updateFormatState();
    };

    // Insert link
    const insertLink = () => {
      const url = prompt("Enter URL:");
      if (url) {
        executeCommand("createLink", url);
      }
    };

    // Update format state based on current selection
    const updateFormatState = () => {
      const formats: Record<string, boolean> = {
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        strikeThrough: document.queryCommandState("strikeThrough"),
        insertUnorderedList: document.queryCommandState("insertUnorderedList"),
        insertOrderedList: document.queryCommandState("insertOrderedList"),
      };
      setCurrentFormat(formats);
    };

    // Handle selection change
    const handleSelectionChange = () => {
      if (document.activeElement === editorRef.current) {
        updateFormatState();
      }
    };

    React.useEffect(() => {
      document.addEventListener("selectionchange", handleSelectionChange);
      return () => {
        document.removeEventListener("selectionchange", handleSelectionChange);
      };
    }, []);

    // Toolbar configurations
    const fullToolbar: ToolbarButton[] = [
      { command: "bold", icon: <Bold className="h-4 w-4" />, label: "Bold" },
      {
        command: "italic",
        icon: <Italic className="h-4 w-4" />,
        label: "Italic",
      },
      {
        command: "underline",
        icon: <Underline className="h-4 w-4" />,
        label: "Underline",
      },
      {
        command: "strikeThrough",
        icon: <Strikethrough className="h-4 w-4" />,
        label: "Strikethrough",
      },
      {
        command: "formatBlock",
        value: "h1",
        icon: <Heading1 className="h-4 w-4" />,
        label: "Heading 1",
      },
      {
        command: "formatBlock",
        value: "h2",
        icon: <Heading2 className="h-4 w-4" />,
        label: "Heading 2",
      },
      {
        command: "formatBlock",
        value: "h3",
        icon: <Heading3 className="h-4 w-4" />,
        label: "Heading 3",
      },
      {
        command: "formatBlock",
        value: "p",
        icon: <Type className="h-4 w-4" />,
        label: "Paragraph",
      },
      {
        command: "justifyLeft",
        icon: <AlignLeft className="h-4 w-4" />,
        label: "Align Left",
      },
      {
        command: "justifyCenter",
        icon: <AlignCenter className="h-4 w-4" />,
        label: "Align Center",
      },
      {
        command: "justifyRight",
        icon: <AlignRight className="h-4 w-4" />,
        label: "Align Right",
      },
      {
        command: "justifyFull",
        icon: <AlignJustify className="h-4 w-4" />,
        label: "Justify",
      },
      {
        command: "insertUnorderedList",
        icon: <List className="h-4 w-4" />,
        label: "Bullet List",
      },
      {
        command: "insertOrderedList",
        icon: <ListOrdered className="h-4 w-4" />,
        label: "Numbered List",
      },
      {
        command: "createLink",
        icon: <LinkIcon className="h-4 w-4" />,
        label: "Insert Link",
      },
      {
        command: "removeFormat",
        icon: <Eraser className="h-4 w-4" />,
        label: "Clear Formatting",
      },
    ];

    const minimalToolbar: ToolbarButton[] = [
      { command: "bold", icon: <Bold className="h-4 w-4" />, label: "Bold" },
      {
        command: "italic",
        icon: <Italic className="h-4 w-4" />,
        label: "Italic",
      },
      {
        command: "underline",
        icon: <Underline className="h-4 w-4" />,
        label: "Underline",
      },
      {
        command: "insertUnorderedList",
        icon: <List className="h-4 w-4" />,
        label: "Bullet List",
      },
      {
        command: "createLink",
        icon: <LinkIcon className="h-4 w-4" />,
        label: "Insert Link",
      },
    ];

    const getToolbar = () => {
      if (customTools) return customTools;
      if (toolbar === "minimal") return minimalToolbar;
      return fullToolbar;
    };

    const toolbarButtons = getToolbar();

    return (
      <div className={`w-full ${className}`}>
        {/* Toolbar */}
        {!readOnly && (
          <div className="mb-2 flex flex-wrap gap-1 rounded-brutal border-2 border-brutal bg-card p-2 shadow-brutal">
            {toolbarButtons.map((tool, index) => (
              <Button
                key={index}
                type="button"
                variant={currentFormat[tool.command] ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  if (tool.command === "createLink") {
                    insertLink();
                  } else {
                    executeCommand(tool.command, tool.value);
                  }
                }}
                className="h-8 w-8 p-0"
                aria-label={tool.label}
                title={tool.label}
              >
                {tool.icon}
              </Button>
            ))}
          </div>
        )}

        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable={!readOnly}
          onInput={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full overflow-y-auto rounded-brutal border-2 border-brutal bg-background p-4 text-foreground
            outline-none transition-all
            ${isFocused ? "shadow-brutal-lg" : "shadow-brutal"}
            ${readOnly ? "cursor-default bg-muted/50" : "cursor-text"}
            prose prose-sm max-w-none
            prose-headings:font-black prose-headings:text-foreground
            prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
            prose-p:text-foreground prose-p:leading-relaxed
            prose-a:text-primary prose-a:underline
            prose-strong:font-bold prose-strong:text-foreground
            prose-em:italic prose-em:text-foreground
            prose-ul:list-disc prose-ul:pl-6
            prose-ol:list-decimal prose-ol:pl-6
            prose-li:text-foreground
          `}
          style={{
            minHeight,
            maxHeight,
          }}
          data-placeholder={placeholder}
          suppressContentEditableWarning
        />

        <style jsx>{`
          [contenteditable]:empty:before {
            content: attr(data-placeholder);
            color: hsl(var(--muted-foreground));
            pointer-events: none;
          }
        `}</style>
      </div>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor };
