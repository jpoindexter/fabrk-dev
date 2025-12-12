# Markdown Editor Component

A lightweight, feature-rich markdown editor with live preview for the Fabrk boilerplate.

## Features

- **Side-by-side editing**: Editor and preview panes in split view
- **Formatting toolbar**: Quick access to common markdown shortcuts
- **Live preview**: Real-time HTML rendering as you type
- **Lightweight**: No heavy dependencies (no react-markdown, remark, etc.)
- **Theme-responsive**: Uses design tokens for automatic theme support
- **Vanilla design**: Consistent with Fabrk design system
- **Flexible modes**: Editor-only, preview-only, or combined view
- **Controlled component**: Standard value/onChange pattern

## Installation

The component is already included in the Fabrk boilerplate. No additional dependencies required.

## Basic Usage

```tsx
import { MarkdownEditor } from "@/components/ui/markdown-editor";
import { useState } from "react";

function MyComponent() {
  const [markdown, setMarkdown] = useState("");

  return (
    <MarkdownEditor
      value={markdown}
      onChange={setMarkdown}
      placeholder="Start writing..."
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | Required | Current markdown content |
| `onChange` | `(value: string) => void` | Required | Callback when content changes |
| `placeholder` | `string` | `"Start writing..."` | Placeholder text for empty editor |
| `minHeight` | `number` | `400` | Minimum height in pixels |
| `editorOnly` | `boolean` | `false` | Show only editor (no preview) |
| `previewOnly` | `boolean` | `false` | Show only preview (no editor) |
| `className` | `string` | - | Custom CSS classes |
| `disabled` | `boolean` | `false` | Disable editing |

## Toolbar Buttons

The toolbar provides quick access to common markdown formatting:

- **Bold** (`**text**`)
- **Italic** (`*text*`)
- **Heading** (`# text`)
- **Link** (`[text](url)`)
- **Code Block** (` ```\ncode\n``` `)
- **List** (`- item`)
- **Toggle Preview** (show/hide preview pane)

## Supported Markdown Features

The component uses a lightweight regex-based parser supporting:

### Headers
```markdown
# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header
```

### Emphasis
```markdown
**bold text**
__bold text__
*italic text*
_italic text_
```

### Links
```markdown
[Link text](https://example.com)
```

### Code
```markdown
Inline `code` here

```language
code block here
```
```

### Lists
```markdown
Unordered:
- Item 1
- Item 2
* Item 3

Ordered:
1. First
2. Second
3. Third
```

## Usage Examples

### Editor Only Mode

Perfect for focused writing without distraction:

```tsx
<MarkdownEditor
  value={content}
  onChange={setContent}
  editorOnly
  placeholder="Write your markdown here..."
/>
```

### Preview Only Mode

Great for displaying markdown content without editing:

```tsx
<MarkdownEditor
  value={content}
  onChange={() => {}} // No-op
  previewOnly
/>
```

### In a Card

Wrapped in a card for structured layouts:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Documentation Editor</CardTitle>
    <CardDescription>Edit your API documentation</CardDescription>
  </CardHeader>
  <CardContent>
    <MarkdownEditor
      value={docs}
      onChange={setDocs}
      minHeight={600}
    />
  </CardContent>
</Card>
```

### Custom Height

Control the minimum height of the editor:

```tsx
<MarkdownEditor
  value={content}
  onChange={setContent}
  minHeight={300}
/>
```

### Disabled State

For read-only content:

```tsx
<MarkdownEditor
  value={content}
  onChange={setContent}
  disabled
/>
```

## Storybook Examples

The component includes 12 comprehensive Storybook stories:

1. **Default** - Basic editor with no content
2. **WithInitialContent** - Pre-populated with markdown
3. **EditorOnly** - No preview pane
4. **PreviewOnly** - No editor pane
5. **DocumentationEditor** - In a card for API docs
6. **BlogPostEditor** - Full blog post authoring interface
7. **ReadmeEditor** - Project README editing
8. **CodeDocumentation** - Component documentation
9. **CustomHeight** - Custom minimum height
10. **Disabled** - Read-only mode
11. **EmptyState** - Empty with custom placeholder
12. **AllMarkdownFeatures** - Showcase of all supported markdown

Run Storybook to view all examples:

```bash
npm run storybook
```

## Implementation Details

### Markdown Parser

The component uses a simple regex-based parser (`parseMarkdown` function) that:
- Processes markdown in a specific order (code blocks first to prevent nested parsing)
- Converts markdown syntax to semantic HTML with CSS classes
- Applies theme-responsive design tokens
- Handles edge cases like nested formatting

### Performance

- Lightweight: No external markdown libraries (~50KB saved)
- Fast parsing: Regex-based, processes in milliseconds
- Efficient re-renders: Only updates on value change
- Minimal DOM operations: Uses `dangerouslySetInnerHTML` for preview

### Accessibility

- Toolbar buttons have `title` attributes for tooltips
- Preview HTML uses semantic elements (`h1`, `ul`, `code`, etc.)
- Focus management in textarea
- Keyboard shortcuts work naturally in textarea

### Styling

All colors use design tokens:
- `--primary` for links and accents
- `--muted` for code backgrounds
- `--border` for borders
- Standard shadows via `shadow-sm`, `shadow`

This ensures the component automatically adapts to theme changes.

## Common Patterns

### Save Draft Functionality

```tsx
function BlogEditor() {
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const saveDraft = async () => {
    setIsSaving(true);
    await fetch("/api/drafts", {
      method: "POST",
      body: JSON.stringify({ content }),
    });
    setIsSaving(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2>Blog Post</h2>
        <Button onClick={saveDraft} loading={isSaving}>
          Save Draft
        </Button>
      </div>
      <MarkdownEditor value={content} onChange={setContent} />
    </div>
  );
}
```

### With Form Validation

```tsx
function DocumentationForm() {
  const [markdown, setMarkdown] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (markdown.length < 100) {
      setError("Documentation must be at least 100 characters");
      return;
    }
    // Submit...
  };

  return (
    <form onSubmit={handleSubmit}>
      <MarkdownEditor value={markdown} onChange={setMarkdown} />
      {error && <p className="text-destructive mt-2">{error}</p>}
      <Button type="submit" className="mt-4">Submit</Button>
    </form>
  );
}
```

### Auto-save with Debounce

```tsx
import { useDebounce } from "@/hooks/use-debounce";

function AutoSaveEditor() {
  const [content, setContent] = useState("");
  const debouncedContent = useDebounce(content, 1000);

  useEffect(() => {
    if (debouncedContent) {
      // Auto-save
      fetch("/api/save", {
        method: "POST",
        body: JSON.stringify({ content: debouncedContent }),
      });
    }
  }, [debouncedContent]);

  return <MarkdownEditor value={content} onChange={setContent} />;
}
```

## Extending the Parser

To add support for additional markdown features, modify the `parseMarkdown` function:

```typescript
// Example: Add strikethrough support
html = html.replace(/~~(.+?)~~/g, '<del class="line-through">$1</del>');

// Example: Add blockquotes
html = html.replace(/^>\s+(.+)$/gm, '<blockquote class="border-l-4 border-primary pl-4 italic">$1</blockquote>');

// Example: Add horizontal rules
html = html.replace(/^---$/gm, '<hr class="my-8 border-t-2 border-border" />');
```

## Limitations

This is a lightweight implementation with some intentional limitations:

1. **No nested lists** - Lists are single-level only
2. **No tables** - Table syntax not supported
3. **No image embedding** - Only link syntax supported
4. **No task lists** - `[ ]` checkbox syntax not supported
5. **No HTML passthrough** - Raw HTML is treated as text

For advanced markdown parsing, consider adding `react-markdown` or `remark`:

```bash
npm install react-markdown remark-gfm
```

## Design System Compliance

The component follows Fabrk vanilla design patterns:

- **1px borders** with `border border-border` token
- **Subtle shadows** using `shadow-sm`, `shadow` utilities
- **Standard border radius** via `rounded-md`
- **Theme tokens** for all colors (no hardcoded values)
- **Typography scale** matches global design system
- **Standard transitions** (150ms)

## Browser Support

Works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

The component uses standard Web APIs:
- `textarea` element
- `dangerouslySetInnerHTML` for preview
- CSS Grid for layout
- Standard event handlers

## Performance Tips

1. **Debounce onChange** for auto-save to reduce API calls
2. **Memoize parsed HTML** if content doesn't change frequently
3. **Use editorOnly mode** for large documents to reduce rendering
4. **Lazy load** the component if not immediately visible

## Troubleshooting

### Preview not updating
Ensure `value` prop is being updated in parent component state.

### Toolbar buttons not working
Check that `disabled` prop is not set to `true`.

### Styles not applying
Verify design tokens are defined in `globals.css`.

### Cursor position lost after formatting
This is handled automatically by the component. If issues persist, check React version compatibility.

## Contributing

To improve the markdown parser:

1. Add regex pattern to `parseMarkdown` function
2. Test with various markdown inputs
3. Ensure CSS classes use design tokens
4. Update this documentation
5. Add Storybook example

## Related Components

- **Textarea** - Base input component
- **Card** - Container for editor layouts
- **Button** - Toolbar button component
- **Badge** - Status indicators

## License

Part of the Fabrk boilerplate. See LICENSE for details.
