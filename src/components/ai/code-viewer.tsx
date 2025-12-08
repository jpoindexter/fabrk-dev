"use client";

/**
 * Code Viewer Component
 * Generates and displays copyable React Hook Form + Zod code
 */

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";
import type { GeneratedForm, FormField } from "@/lib/ai/schemas";

interface CodeViewerProps {
  form: GeneratedForm;
  className?: string;
}

// Generate Zod schema code
function generateZodCode(form: GeneratedForm): string {
  const lines: string[] = [
    'import { z } from "zod";',
    "",
    `export const ${form.name.charAt(0).toLowerCase() + form.name.slice(1)}Schema = z.object({`,
  ];

  form.fields.forEach((field) => {
    const zodType = getZodType(field);
    lines.push(`  ${field.name}: ${zodType},`);
  });

  lines.push("});");
  lines.push("");
  lines.push(
    `export type ${form.name}Data = z.infer<typeof ${form.name.charAt(0).toLowerCase() + form.name.slice(1)}Schema>;`
  );

  return lines.join("\n");
}

function getZodType(field: FormField): string {
  const { type, required, validation } = field;
  let zodType = "z.string()";

  switch (type) {
    case "email":
      zodType = 'z.string().email("Invalid email address")';
      break;
    case "number":
      zodType = "z.number()";
      if (validation?.min !== undefined) {
        zodType += `.min(${validation.min})`;
      }
      if (validation?.max !== undefined) {
        zodType += `.max(${validation.max})`;
      }
      break;
    case "checkbox":
      zodType = "z.boolean()";
      break;
    case "url":
      zodType = 'z.string().url("Invalid URL")';
      break;
    case "date":
    case "time":
    case "datetime":
      zodType = "z.string()";
      break;
    case "select":
    case "radio":
      if (field.options && field.options.length > 0) {
        const values = field.options.map((o) => `"${o.value}"`).join(", ");
        zodType = `z.enum([${values}])`;
      }
      break;
    case "password":
      zodType = 'z.string().min(8, "Password must be at least 8 characters")';
      break;
    case "tel":
      zodType = "z.string()";
      break;
    default:
      zodType = "z.string()";
      if (validation?.min !== undefined) {
        zodType += `.min(${validation.min}${validation.message ? `, "${validation.message}"` : ""})`;
      }
      if (validation?.max !== undefined) {
        zodType += `.max(${validation.max})`;
      }
      if (validation?.pattern) {
        zodType += `.regex(/${validation.pattern}/)`;
      }
  }

  if (!required && type !== "checkbox") {
    zodType += ".optional()";
  }

  return zodType;
}

// Generate React component code
function generateComponentCode(form: GeneratedForm): string {
  const schemaName = form.name.charAt(0).toLowerCase() + form.name.slice(1) + "Schema";
  const typeName = form.name + "Data";

  const lines: string[] = [
    '"use client";',
    "",
    'import { useForm } from "react-hook-form";',
    'import { zodResolver } from "@hookform/resolvers/zod";',
    `import { ${schemaName}, type ${typeName} } from \"./schema\";`,
    'import { Button } from "@/components/ui/button";',
    'import { Input } from "@/components/ui/input";',
    'import { Label } from "@/components/ui/label";',
  ];

  // Add imports based on field types
  const fieldTypes = new Set(form.fields.map((f) => f.type));
  if (fieldTypes.has("textarea")) {
    lines.push('import { Textarea } from "@/components/ui/textarea";');
  }
  if (fieldTypes.has("select")) {
    lines.push(
      'import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";'
    );
  }
  if (fieldTypes.has("checkbox")) {
    lines.push('import { Checkbox } from "@/components/ui/checkbox";');
  }

  lines.push("");
  lines.push(`export function ${form.name}() {`);
  lines.push("  const {");
  lines.push("    register,");
  lines.push("    handleSubmit,");
  lines.push("    formState: { errors, isSubmitting },");
  lines.push(`  } = useForm<${typeName}>({`);
  lines.push(`    resolver: zodResolver(${schemaName}),`);
  lines.push("  });");
  lines.push("");
  lines.push(`  const onSubmit = async (data: ${typeName}) => {`);

  lines.push("    " + "console" + ".log(data);");
  lines.push("    // TODO: Handle form submission");
  lines.push("  };");
  lines.push("");
  lines.push("  return (");
  lines.push('    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">');

  form.fields.forEach((field) => {
    lines.push(...generateFieldCode(field));
  });

  lines.push("");
  lines.push('      <Button type="submit" disabled={isSubmitting} className="w-full">');
  lines.push(`        {isSubmitting ? "Submitting..." : "${form.submitLabel}"}`);
  lines.push("      </Button>");
  lines.push("    </form>");
  lines.push("  );");
  lines.push("}");

  return lines.join("\n");
}

function generateFieldCode(field: FormField): string[] {
  const { name, label, type, placeholder, required } = field;
  const lines: string[] = [""];
  lines.push('      <div className="space-y-2">');

  if (type !== "checkbox") {
    lines.push(`        <Label htmlFor="${name}">`);
    lines.push(
      `          ${label}${required ? ' <span className="text-destructive">*</span>' : ""}`
    );
    lines.push("        </Label>");
  }

  switch (type) {
    case "textarea":
      lines.push(`        <Textarea`);
      lines.push(`          id="${name}"`);
      lines.push(`          {...register("${name}")}`);
      if (placeholder) lines.push(`          placeholder="${placeholder}"`);
      lines.push("        />");
      break;
    case "checkbox":
      lines.push('        <div className="flex items-center space-x-2">');
      lines.push(`          <Checkbox id="${name}" {...register("${name}")} />`);
      lines.push(`          <Label htmlFor="${name}">${label}</Label>`);
      lines.push("        </div>");
      break;
    case "select":
      lines.push(`        <Select>`);
      lines.push(`          <SelectTrigger>`);
      lines.push(
        `            <SelectValue placeholder="${placeholder || `Select ${label}...`}" />`
      );
      lines.push("          </SelectTrigger>");
      lines.push("          <SelectContent>");
      field.options?.forEach((opt) => {
        lines.push(`            <SelectItem value="${opt.value}">${opt.label}</SelectItem>`);
      });
      lines.push("          </SelectContent>");
      lines.push("        </Select>");
      break;
    default:
      lines.push(`        <Input`);
      lines.push(`          id="${name}"`);
      lines.push(`          type="${type}"`);
      lines.push(
        `          {...register("${name}"${type === "number" ? ", { valueAsNumber: true }" : ""})}`
      );
      if (placeholder) lines.push(`          placeholder="${placeholder}"`);
      lines.push("        />");
  }

  lines.push(`        {errors.${name} && (`);
  lines.push('          <p className="text-sm text-destructive">{errors.' + name + ".message}</p>");
  lines.push("        )}");
  lines.push("      </div>");

  return lines;
}

export function CodeViewer({ form, className }: CodeViewerProps) {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const zodCode = generateZodCode(form);
  const componentCode = generateComponentCode(form);

  const handleCopy = async (code: string, tab: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedTab(tab);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  return (
    <div className={cn("border-border bg-card border", mode.radius, className)}>
      {/* Terminal Header */}
      <div className="border-border bg-muted/50 border-b px-4 py-2">
        <span className={cn("text-muted-foreground text-xs", mode.font)}>
          [ [0x02] GENERATED_CODE ]
        </span>
      </div>

      <Tabs defaultValue="schema" className="w-full">
        <div className="border-border border-b px-4">
          <TabsList className={cn("h-auto w-auto gap-0 border-0 bg-transparent p-0", mode.radius)}>
            <TabsTrigger
              value="schema"
              className={cn(
                "data-[state=active]:border-primary border-b-2 border-transparent px-4 py-2 text-xs",
                mode.radius,
                mode.font
              )}
            >
              [SCHEMA]
            </TabsTrigger>
            <TabsTrigger
              value="component"
              className={cn(
                "data-[state=active]:border-primary border-b-2 border-transparent px-4 py-2 text-xs",
                mode.radius,
                mode.font
              )}
            >
              [COMPONENT]
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="schema" className="mt-0">
          <div className="relative">
            <Button
              size="sm"
              variant="ghost"
              className={cn("absolute top-2 right-2 text-xs", mode.radius, mode.font)}
              onClick={() => handleCopy(zodCode, "schema")}
            >
              {copiedTab === "schema" ? (
                <>
                  <Check className="mr-1 size-3" /> COPIED
                </>
              ) : (
                <>
                  <Copy className="mr-1 size-3" /> COPY
                </>
              )}
            </Button>
            <pre className={cn("overflow-x-auto p-4 text-xs", mode.font)}>
              <code>{zodCode}</code>
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="component" className="mt-0">
          <div className="relative">
            <Button
              size="sm"
              variant="ghost"
              className={cn("absolute top-2 right-2 text-xs", mode.radius, mode.font)}
              onClick={() => handleCopy(componentCode, "component")}
            >
              {copiedTab === "component" ? (
                <>
                  <Check className="mr-1 size-3" /> COPIED
                </>
              ) : (
                <>
                  <Copy className="mr-1 size-3" /> COPY
                </>
              )}
            </Button>
            <pre className={cn("overflow-x-auto p-4 text-xs", mode.font)}>
              <code>{componentCode}</code>
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
