# Chat Input Component

A feature-rich chat input component for the Fabrk boilerplate with auto-growing textarea, file attachments, emoji support, and typing indicators.

## Features

- ✅ **Auto-growing textarea** - Expands from 1 to 5 lines as you type
- ✅ **Send button** - Disabled when empty, enabled with text
- ✅ **File attachments** - Upload files with preview chips
- ✅ **Emoji picker button** - Placeholder for emoji integration
- ✅ **Character counter** - Optional display with max length
- ✅ **Typing indicator** - Animated dots showing user activity
- ✅ **Keyboard shortcuts** - Enter to send, Shift+Enter for new line
- ✅ **Loading state** - Spinner while sending message
- ✅ **Disabled state** - Non-interactive when chat unavailable
- ✅ **Neobrutalism styling** - 2px borders, hard shadows, theme-responsive
- ✅ **Dark mode support** - All colors use design tokens

## Installation

The component is already included in the Fabrk boilerplate at:
```
src/components/ui/chat-input.tsx
src/components/ui/chat-input.stories.tsx
```

No additional dependencies required (uses existing `lucide-react` icons).

## Basic Usage

```tsx
import { ChatInput } from "@/components/ui/chat-input";

function MyChat() {
  const [message, setMessage] = useState("");

  const handleSend = (value: string) => {
    console.log("Sending:", value);
    // Send to your backend API
    setMessage(""); // Clear input after sending
  };

  return (
    <ChatInput
      value={message}
      onChange={setMessage}
      onSend={handleSend}
      placeholder="Type a message..."
    />
  );
}
```

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | Required | Current input value (controlled) |
| `onChange` | `(value: string) => void` | Required | Called when text changes |
| `onSend` | `(value: string) => void` | Required | Called when message is sent |
| `onFileAttach` | `(files: File[]) => void` | Optional | Called when files are attached |
| `placeholder` | `string` | `"Type a message..."` | Placeholder text |
| `disabled` | `boolean` | `false` | Disable all interactions |
| `loading` | `boolean` | `false` | Show loading spinner |
| `showCharCount` | `boolean` | `false` | Display character counter |
| `maxLength` | `number` | `1000` | Maximum character length |
| `showTypingIndicator` | `boolean` | `false` | Show typing dots animation |
| `typingUser` | `string` | `undefined` | Name of user who is typing |
| `className` | `string` | `undefined` | Additional CSS classes |

## Advanced Examples

### With File Attachments

```tsx
function ChatWithFiles() {
  const [message, setMessage] = useState("");

  const handleFileAttach = (files: File[]) => {
    console.log("Files attached:", files);
    // Upload files to your backend
    files.forEach(file => {
      const formData = new FormData();
      formData.append("file", file);
      // fetch("/api/upload", { method: "POST", body: formData })
    });
  };

  return (
    <ChatInput
      value={message}
      onChange={setMessage}
      onSend={(msg) => console.log(msg)}
      onFileAttach={handleFileAttach}
    />
  );
}
```

### With Character Counter

```tsx
<ChatInput
  value={message}
  onChange={setMessage}
  onSend={handleSend}
  showCharCount={true}
  maxLength={500}
/>
```

### With Typing Indicator

```tsx
function ChatWithTyping() {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");

  // Listen to typing events from your WebSocket/backend
  useEffect(() => {
    socket.on("user-typing", (username) => {
      setIsTyping(true);
      setTypingUser(username);
    });

    socket.on("user-stopped-typing", () => {
      setIsTyping(false);
    });
  }, []);

  return (
    <ChatInput
      value={message}
      onChange={setMessage}
      onSend={handleSend}
      showTypingIndicator={isTyping}
      typingUser={typingUser}
    />
  );
}
```

### Loading State While Sending

```tsx
function ChatWithLoading() {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (value: string) => {
    setIsSending(true);
    try {
      await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({ text: value }),
      });
      setMessage("");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <ChatInput
      value={message}
      onChange={setMessage}
      onSend={handleSend}
      loading={isSending}
    />
  );
}
```

### Full Chat Interface

```tsx
function FullChatExample() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, user: "Sarah", text: "Hey there!", isMe: false },
    { id: 2, user: "You", text: "Hi Sarah!", isMe: true },
  ]);

  const handleSend = (value: string) => {
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        user: "You",
        text: value,
        isMe: true,
      },
    ]);
    setMessage("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Chat</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Messages */}
        <div className="h-[400px] overflow-y-auto space-y-4 p-4">
          {messages.map((msg) => (
            <div key={msg.id} className={msg.isMe ? "text-right" : ""}>
              <div className="inline-block rounded-brutal border-2 border-brutal px-4 py-2 shadow-brutal">
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t-2 border-brutal p-4">
          <ChatInput
            value={message}
            onChange={setMessage}
            onSend={handleSend}
          />
        </div>
      </CardContent>
    </Card>
  );
}
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Send message (if not empty) |
| `Shift + Enter` | Insert new line |

## Styling Customization

The component uses Fabrk design tokens and can be customized via the `className` prop:

```tsx
<ChatInput
  value={message}
  onChange={setMessage}
  onSend={handleSend}
  className="max-w-4xl mx-auto"
/>
```

### Theme Colors

All colors are theme-responsive using CSS variables:
- `bg-card` - Input background
- `border-brutal` - Border color
- `text-foreground` - Text color
- `text-muted-foreground` - Placeholder and hints
- `bg-primary` - Send button background
- `shadow-brutal` - Neobrutalism shadows

## Accessibility

The component includes proper ARIA attributes:
- `aria-label` on icon buttons (Send, Attach, Emoji)
- `aria-disabled` when disabled
- `aria-invalid` for error states
- Keyboard navigation support
- Screen reader announcements

## Integration Guide

### 1. WebSocket Integration (Real-time Chat)

```tsx
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function RealtimeChat() {
  const [message, setMessage] = useState("");
  const socket = io("http://localhost:3001");

  const handleSend = (value: string) => {
    socket.emit("message", value);
    setMessage("");
  };

  useEffect(() => {
    socket.on("message", (msg) => {
      // Handle incoming messages
      console.log("Received:", msg);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <ChatInput
      value={message}
      onChange={setMessage}
      onSend={handleSend}
    />
  );
}
```

### 2. API Integration (HTTP)

```tsx
function ApiChat() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (value: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: value }),
      });

      if (response.ok) {
        setMessage("");
      }
    } catch (error) {
      console.error("Failed to send:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatInput
      value={message}
      onChange={setMessage}
      onSend={handleSend}
      loading={loading}
    />
  );
}
```

### 3. Emoji Picker Integration

To add emoji support, install `emoji-picker-react`:

```bash
npm install emoji-picker-react
```

Then modify the emoji button:

```tsx
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

// Inside your component:
const [showEmojiPicker, setShowEmojiPicker] = useState(false);

// In the emoji button click handler:
<Button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
  <Smile className="h-4 w-4" />
</Button>

{showEmojiPicker && (
  <div className="absolute bottom-full right-0 mb-2">
    <EmojiPicker
      onEmojiClick={(emoji) => {
        setMessage(message + emoji.emoji);
        setShowEmojiPicker(false);
      }}
    />
  </div>
)}
```

## Storybook Examples

View all examples in Storybook:

```bash
npm run storybook
```

Navigate to **Components → ChatInput** to see:
1. Default
2. WithPlaceholder
3. Disabled
4. Loading
5. WithCharCounter
6. WithFileAttachment
7. WithTypingIndicator
8. InChatInterface
9. Minimal
10. LongMessage
11. AllFeatures
12. DarkModeDemo

## Browser Support

Works in all modern browsers:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Performance Notes

- Auto-resize uses efficient `useEffect` with `scrollHeight` detection
- File attachments stored in component state (not uploaded until you implement `onFileAttach`)
- Typing indicator uses CSS animations (no JavaScript timers)
- Character counter only renders when `showCharCount={true}`

## Common Issues

### Textarea not auto-resizing
- Ensure parent container has defined width
- Check that `overflow: hidden` isn't applied to parent

### Send button always disabled
- Verify `value` prop is being updated via `onChange`
- Check that `value.trim()` has content

### File attachments not working
- Ensure `onFileAttach` prop is provided
- Check browser console for file input errors

## License

Part of the Fabrk Boilerplate. See main LICENSE file.
