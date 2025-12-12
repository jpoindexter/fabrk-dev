"use client";

/**
 * ✅ FABRK COMPONENT
 * Prompt builder component for AI prompts.
 *
 * @example
 * ```tsx
 * <prompt-builder />
 * ```
 */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { mode, formatLabel } from "@/design-system";
import { Copy, FileText, Hash, Plus, Save, Variable, X } from "lucide-react";
import * as React from "react";
import { PromptBuilderProps, PromptTemplate, usePromptBuilder } from "./prompt-builder-logic";

const PromptBuilder = React.forwardRef<HTMLDivElement, PromptBuilderProps>(
  (
    {
      templates = [],
      onBuild,
      onSaveTemplate,
      onCopyPrompt,
      defaultTemplate,
      showTemplates = true,
      showVariables = true,
      showPreview = true,
      maxVariables = 10,
      placeholder = "Enter your prompt here. Use {{variableName}} for variables.",
      className,
      ...props
    },
    ref
  ) => {
    const {
      promptContent,
      setPromptContent,
      variables,
      selectedTemplate,
      templateName,
      setTemplateName,
      activeTab,
      setActiveTab,
      addVariable,
      updateVariable,
      removeVariable,
      processPrompt,
      handleLoadTemplate,
      handleBuild,
      handleSave,
      handleCopy,
      extractVariables,
    } = usePromptBuilder({
      defaultTemplate,
      maxVariables,
      onBuild,
      onSaveTemplate,
      onCopyPrompt,
    });

    const handleLoadTemplateById = (templateId: string) => {
      const template = templates.find((t) => t.id === templateId);
      if (template) {
        handleLoadTemplate(template);
      }
    };

    return (
      <div
        data-slot="prompt-builder"
        ref={ref}
        className={cn("space-y-6 border p-6", mode.radius, className)}
        {...props}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            {showVariables && <TabsTrigger value="variables">Variables</TabsTrigger>}
            {showPreview && <TabsTrigger value="preview">Preview</TabsTrigger>}
          </TabsList>

          <TabsContent value="editor" className={`space-y-6`}>
            {showTemplates && templates.length > 0 && (
              <div className={`space-y-2`}>
                <Label>{formatLabel("Load Template")}</Label>
                <Select
                  value={selectedTemplate || ""}
                  onValueChange={(value) =>
                    typeof value === "string" && handleLoadTemplateById(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template..." />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template: PromptTemplate) => (
                      <SelectItem key={template.id} value={template.id}>
                        <div className={`flex items-center gap-2`}>
                          <FileText className="size-4" />
                          {template.name}
                          {template.category && (
                            <Badge variant="outline" className="ml-2">
                              {template.category}
                            </Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className={`space-y-2`}>
              <div className="flex items-center justify-between">
                <Label>{formatLabel("Prompt Content")}</Label>
                <Button variant="ghost" size="sm" onClick={extractVariables} className="text-xs">
                  <Variable className="mr-1 size-3" />
                  Extract Variables
                </Button>
              </div>
              <Textarea
                value={promptContent}
                onChange={(e) => setPromptContent(e.target.value)}
                placeholder={placeholder}
                rows={10}
                className={cn("text-sm", mode.font)}
              />
              <p className={`"text-xs" text-muted-foreground`}>
                Tip: Use {"{{variableName}}"} syntax to create variables
              </p>
            </div>

            {onSaveTemplate && (
              <div className={`flex gap-2`}>
                <Input
                  placeholder="Template name..."
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                />
                <Button onClick={handleSave} disabled={!templateName.trim()}>
                  <Save className={`"h-4 w-4" mr-2`} />
                  Save Template
                </Button>
              </div>
            )}
          </TabsContent>

          {showVariables && (
            <TabsContent value="variables" className={`space-y-6`}>
              <div className="flex items-center justify-between">
                <Label>{formatLabel("Variables")}</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addVariable}
                  disabled={variables.length >= maxVariables}
                >
                  <Plus className="mr-1 size-3" />
                  Add Variable
                </Button>
              </div>

              <ScrollArea className="h-96">
                <div className={`space-y-4 pr-4`}>
                  {variables.length === 0 ? (
                    <p className={`"text-sm" text-muted-foreground py-8 text-center`}>
                      No variables defined. Add variables or extract them from your prompt.
                    </p>
                  ) : (
                    variables.map((variable) => (
                      <div key={variable.id} className={cn("space-y-2 border p-4", mode.radius)}>
                        <div className="flex items-center justify-between">
                          <Input
                            placeholder="Variable name"
                            value={variable.name}
                            onChange={(e) => updateVariable(variable.id, { name: e.target.value })}
                            className={cn("w-32 text-sm", mode.font)}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeVariable(variable.id)}
                            aria-label="Remove variable"
                          >
                            <X className="size-4" aria-hidden="true" />
                          </Button>
                        </div>
                        {variable.type === "select" && variable.options ? (
                          <Select
                            value={variable.value}
                            onValueChange={(value) =>
                              typeof value === "string" && updateVariable(variable.id, { value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select value..." />
                            </SelectTrigger>
                            <SelectContent>
                              {variable.options.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            placeholder="Variable value"
                            value={variable.value}
                            onChange={(e) => updateVariable(variable.id, { value: e.target.value })}
                          />
                        )}
                        {variable.description && (
                          <p className={`"text-xs" text-muted-foreground`}>
                            {variable.description}
                          </p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          )}

          {showPreview && (
            <TabsContent value="preview" className={`space-y-6`}>
              <div className={`space-y-2`}>
                <Label>{formatLabel("Processed Prompt")}</Label>
                <ScrollArea className={cn("bg-card h-96 border", mode.radius)}>
                  <pre className={cn("text-sm whitespace-pre-wrap", mode.font)}>
                    {processPrompt()}
                  </pre>
                </ScrollArea>
              </div>

              <div className={`flex gap-2`}>
                <Button onClick={handleCopy} variant="outline">
                  <Copy className={`"h-4 w-4" mr-2`} />
                  Copy Prompt
                </Button>
                {onBuild && (
                  <Button onClick={handleBuild}>
                    <Hash className={`"h-4 w-4" mr-2`} />
                    Build Prompt
                  </Button>
                )}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    );
  }
);
PromptBuilder.displayName = "PromptBuilder";

export { PromptBuilder };
export type { PromptBuilderProps, PromptTemplate };
