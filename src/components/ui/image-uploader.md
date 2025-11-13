# Image Uploader Component

A production-ready image uploader component with drag-and-drop, preview, and validation for the Fabrk boilerplate.

## Features

- ✅ Drag-and-drop zone with visual feedback
- ✅ Click to browse file picker
- ✅ Multiple file upload support (configurable max)
- ✅ Image preview thumbnails with remove button
- ✅ File size validation (configurable max)
- ✅ File type validation (configurable MIME types)
- ✅ Progress indicators during upload
- ✅ Error state with validation messages
- ✅ Disabled state
- ✅ Neobrutalism design (2px borders, hard shadows)
- ✅ Theme-responsive using design tokens
- ✅ Controlled/uncontrolled component support
- ✅ TypeScript interfaces
- ✅ Accessibility features (ARIA labels, keyboard support)

## Installation

The component is already included in the Fabrk boilerplate at:
- Component: `src/components/ui/image-uploader.tsx`
- Stories: `src/components/ui/image-uploader.stories.tsx`

No additional dependencies required (uses existing lucide-react icons).

## Usage

### Basic Example

```tsx
import { ImageUploader } from "@/components/ui/image-uploader";
import { useState } from "react";

function MyComponent() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <ImageUploader
      value={files}
      onChange={setFiles}
      maxFiles={5}
      maxSize={5 * 1024 * 1024} // 5MB
      showPreview
    />
  );
}
```

### With Upload Handler

```tsx
import { ImageUploader } from "@/components/ui/image-uploader";
import { useState } from "react";

function MyComponent() {
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = async (uploadFiles: File[]) => {
    // Upload to your API
    const formData = new FormData();
    uploadFiles.forEach((file) => formData.append("files", file));

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setFiles([]); // Clear after success
    }
  };

  return (
    <ImageUploader
      value={files}
      onChange={setFiles}
      maxFiles={5}
      maxSize={5 * 1024 * 1024}
      showPreview
      onUpload={handleUpload}
    />
  );
}
```

### Specific File Types

```tsx
<ImageUploader
  value={files}
  onChange={setFiles}
  accept="image/png,image/jpeg"
  maxFiles={3}
  maxSize={2 * 1024 * 1024} // 2MB
  showPreview
/>
```

## Props Interface

```typescript
interface ImageUploaderProps {
  value?: File[];              // Current files (controlled)
  onChange?: (files: File[]) => void; // Files change handler
  maxFiles?: number;           // Max files allowed (default: 5)
  maxSize?: number;            // Max file size in bytes (default: 5MB)
  accept?: string;             // MIME types (default: image/jpeg,png,gif,webp)
  disabled?: boolean;          // Disable uploader (default: false)
  showPreview?: boolean;       // Show image previews (default: true)
  onUpload?: (files: File[]) => Promise<void>; // Upload handler
  className?: string;          // Additional CSS classes
}
```

## Validation

The component validates:

1. **File count**: Prevents exceeding `maxFiles` limit
2. **File size**: Rejects files larger than `maxSize`
3. **File type**: Only accepts MIME types in `accept` string

Validation errors are displayed in a red-bordered error box above the previews.

## Design System Integration

The component follows the Fabrk neobrutalism design system:

- **Borders**: 2px solid using `border-brutal` token
- **Shadows**: Hard shadows with `shadow-brutal` utilities
- **Radius**: 8px using `rounded-brutal` class
- **Colors**: Theme-responsive using design tokens:
  - `--primary` for active/hover states
  - `--destructive` for remove buttons and errors
  - `--muted` for backgrounds
  - `--border` for borders
  - `--overlay` for file info overlay

All colors respond to theme changes automatically.

## Keyboard Accessibility

- Drop zone is keyboard accessible (Tab to focus, Enter/Space to open picker)
- Remove buttons are keyboard accessible
- ARIA labels for screen readers
- File input has proper accessibility attributes

## File Preview

When `showPreview={true}`:

- Images display in a responsive grid (2-4 columns)
- Hover shows file info overlay (name + size)
- Remove button appears on hover
- Preview URLs are automatically cleaned up on unmount

## Upload Flow

1. User selects/drops files
2. Component validates each file
3. Valid files are added to state
4. If `onUpload` is provided, "Upload" button appears
5. User clicks "Upload" button
6. `onUpload` handler is called with files array
7. Loading state shows during upload
8. Clear files after successful upload (in your handler)

## Storybook Examples

The component includes 15+ Storybook stories:

- Default (single file)
- Multiple files (up to 5)
- Without preview
- Large/small file limits
- Specific file types (PNG only)
- Disabled state
- With upload handler
- Grid layout (12 files)
- Controlled component
- With existing images
- With progress simulation
- Max files error
- File type error
- Compact single file
- Complete example

View stories: `npm run storybook`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Supports drag-and-drop API
- Fallback to click-to-browse on all browsers

## Performance

- Preview URLs use `URL.createObjectURL()` for instant preview
- Automatic cleanup of object URLs on unmount
- No image processing (displays original files)
- Lightweight (~250 lines of code)

## Error Handling

Displays user-friendly error messages for:

- "Maximum N files allowed. You can add N more."
- "File 'name.jpg' exceeds max size of 5.0MB"
- "File 'name.txt' has invalid type. Allowed: image/jpeg,image/png,..."
- Custom errors from `onUpload` handler

## TypeScript

Fully typed with TypeScript:

- `ImageUploaderProps` interface exported
- `FileWithPreview` internal type for preview URLs
- Type-safe `onChange` and `onUpload` handlers

## Testing

Test coverage:

- File selection
- Drag and drop
- File validation (size, type, count)
- Remove files
- Upload handler
- Error states
- Disabled state
- Accessibility

## Customization

### Custom Styling

```tsx
<ImageUploader
  className="custom-class"
  value={files}
  onChange={setFiles}
/>
```

### Custom Max Values

```tsx
<ImageUploader
  maxFiles={10}
  maxSize={10 * 1024 * 1024} // 10MB
  value={files}
  onChange={setFiles}
/>
```

### No Preview Grid

```tsx
<ImageUploader
  showPreview={false}
  value={files}
  onChange={setFiles}
/>
```

## Integration Examples

### Profile Picture Upload

```tsx
<ImageUploader
  value={avatarFile}
  onChange={(files) => setAvatarFile(files)}
  maxFiles={1}
  maxSize={2 * 1024 * 1024} // 2MB
  accept="image/jpeg,image/png"
  showPreview
  onUpload={uploadAvatar}
/>
```

### Product Gallery Upload

```tsx
<ImageUploader
  value={productImages}
  onChange={setProductImages}
  maxFiles={10}
  maxSize={5 * 1024 * 1024}
  showPreview
  onUpload={uploadProductImages}
/>
```

### Document Scan Upload

```tsx
<ImageUploader
  value={scans}
  onChange={setScans}
  maxFiles={20}
  maxSize={10 * 1024 * 1024}
  accept="image/jpeg,image/png,application/pdf"
  showPreview
  onUpload={uploadDocuments}
/>
```

## Notes

- File objects contain browser File API data
- Preview grid is responsive (2 cols mobile, 3 tablet, 4 desktop)
- Remove buttons only visible on hover (better UX)
- Upload button only appears if `onUpload` prop is provided
- Component is uncontrolled by default (manages own state)
- Use `value` + `onChange` for controlled behavior
- Memory-efficient (cleans up preview URLs automatically)

## Future Enhancements

Possible additions (not implemented):

- Image cropping/editing
- Image compression before upload
- Progress bars per file
- Retry failed uploads
- Reorder files via drag-and-drop
- Webcam capture
- Paste from clipboard
- Bulk operations (remove all, retry all)

The component is designed to be extended with these features if needed.
