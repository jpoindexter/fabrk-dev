# Chat Message Component

A comprehensive chat message component with support for different message types, statuses, reactions, attachments, and actions. Built with neobrutalism styling and full theme support.

## Features

- **Message Types**: Own messages (right-aligned) and other user messages (left-aligned)
- **Status Indicators**: Sending, sent, delivered, and read statuses
- **Reactions**: Emoji reactions with user tooltips
- **Attachments**: Support for images and files
- **Actions**: Edit and delete actions on hover
- **Message Grouping**: Consecutive messages from the same sender
- **Typing Indicator**: Animated typing indicator component
- **Message Thread**: Auto-grouping message container
- **Theme Responsive**: Uses design tokens for all colors
- **Neobrutalism Styling**: 2px borders, rounded-brutal, hard shadows

## Components

### ChatMessage

Main message component with full feature set.

```tsx
import { ChatMessage } from "@/components/ui/chat-message";

<ChatMessage
  sender={{ name: "Sarah Johnson", avatar: "/avatar.jpg" }}
  content="Hey! How are you doing?"
  timestamp={new Date()}
  isOwn={false}
  status="read"
  reactions={[
    { emoji: "👍", count: 2, users: ["Alice", "Bob"] }
  ]}
  attachments={[
    { type: "image", url: "/screenshot.png", name: "screenshot.png" }
  ]}
  onEdit={() => console.log("Edit")}
  onDelete={() => console.log("Delete")}
  onReact={(emoji) => console.log("Reacted with:", emoji)}
/>
```

### TypingIndicator

Animated typing indicator for when users are composing messages.

```tsx
import { TypingIndicator } from "@/components/ui/chat-message";

<TypingIndicator
  sender={{ name: "Sarah Johnson", avatar: "/avatar.jpg" }}
/>
```

### MessageThread

Container that automatically groups consecutive messages from the same sender.

```tsx
import { MessageThread } from "@/components/ui/chat-message";

<MessageThread
  messages={[
    {
      id: "1",
      sender: { name: "Sarah", avatar: "/sarah.jpg" },
      content: "First message",
      timestamp: new Date(),
    },
    {
      id: "2",
      sender: { name: "Sarah", avatar: "/sarah.jpg" },
      content: "Second message (will be grouped)",
      timestamp: new Date(),
    },
  ]}
/>
```

## Props

### ChatMessageProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| sender | `{ name: string; avatar?: string }` | Required | Message sender information |
| content | `string` | Required | Message text content |
| timestamp | `Date \| string` | Required | Message timestamp |
| isOwn | `boolean` | `false` | Whether message is from current user |
| status | `"sending" \| "sent" \| "delivered" \| "read"` | - | Message delivery status (only shown for own messages) |
| reactions | `Array<{ emoji: string; count: number; users: string[] }>` | - | Emoji reactions |
| attachments | `Array<{ type: "image" \| "file"; url: string; name?: string }>` | - | File/image attachments |
| onEdit | `() => void` | - | Edit button handler |
| onDelete | `() => void` | - | Delete button handler |
| onReact | `(emoji: string) => void` | - | Reaction click handler |
| showAvatar | `boolean` | `true` | Show/hide avatar |
| isGrouped | `boolean` | `false` | Message grouping state |
| className | `string` | - | Additional CSS classes |

### TypingIndicatorProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| sender | `{ name: string; avatar?: string }` | Required | User who is typing |
| className | `string` | - | Additional CSS classes |

### MessageThreadProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| messages | `Array<ChatMessageProps & { id: string }>` | Required | Array of messages to display |
| className | `string` | - | Additional CSS classes |

## Status Indicators

The component displays different icons based on message status (only for own messages):

- **Sending** (🕒): Clock icon with muted color
- **Sent** (✓): Single checkmark with muted color
- **Delivered** (✓✓): Double checkmark with muted color
- **Read** (✓✓): Double checkmark with primary color

## Message Grouping

The `MessageThread` component automatically groups consecutive messages:

1. **First message**: Shows avatar and sender name (for other users)
2. **Grouped messages**: Hide avatar, reduce spacing, no sender name
3. **Different sender**: Starts new group with avatar and name

## Reactions

Reactions are displayed below the message bubble with:

- Emoji and count in a pill-shaped button
- Hover tooltip showing all users who reacted
- Click handler for adding/removing reactions
- Positioned at bottom-left (other users) or bottom-right (own messages)

## Attachments

### Image Attachments

```tsx
attachments: [
  {
    type: "image",
    url: "https://example.com/image.png",
    name: "screenshot.png"
  }
]
```

Displays full image with responsive sizing (max-width: 32rem).

### File Attachments

```tsx
attachments: [
  {
    type: "file",
    url: "https://example.com/document.pdf",
    name: "project-proposal.pdf"
  }
]
```

Displays file icon, name, and download button.

## Actions (Edit/Delete)

Action buttons appear on hover:

- **Edit**: Pencil icon, left of message (own messages)
- **Delete**: Trash icon, red color
- Fade in/out with group hover
- Pass handlers via `onEdit` and `onDelete` props

## Styling Patterns

### Color Tokens Used

```css
/* Other User Messages */
bg-card                  /* Message background */
text-card-foreground     /* Message text */
border-brutal            /* Border color */

/* Own Messages */
bg-primary               /* Message background */
text-primary-foreground  /* Message text */

/* Status Indicators */
text-muted-foreground    /* Sending, sent, delivered */
text-primary             /* Read status */

/* Reactions */
bg-background            /* Reaction pill background */
text-foreground          /* Reaction count */
```

### Neo-Brutalism Classes

```css
rounded-brutal          /* 8px border radius */
border-2 border-brutal  /* 2px solid border */
shadow-brutal           /* 2px offset shadow */
shadow-brutal-lg        /* 4px offset shadow (hover) */
```

## Usage Examples

### Basic Chat

```tsx
function Chat() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: { name: "Sarah", avatar: "/sarah.jpg" },
      content: "Hey! How's it going?",
      timestamp: new Date(),
    },
  ]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <MessageThread messages={messages} />
    </div>
  );
}
```

### With Typing Indicator

```tsx
function ChatWithTyping() {
  const [isTyping, setIsTyping] = useState(true);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <MessageThread messages={messages} />
      {isTyping && (
        <TypingIndicator
          sender={{ name: "Sarah", avatar: "/sarah.jpg" }}
        />
      )}
    </div>
  );
}
```

### With Actions

```tsx
function ChatWithActions() {
  const handleEdit = (messageId: string) => {
    console.log("Edit message:", messageId);
  };

  const handleDelete = (messageId: string) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
  };

  return (
    <ChatMessage
      sender={{ name: "You" }}
      content="Message content"
      timestamp={new Date()}
      isOwn={true}
      onEdit={() => handleEdit(message.id)}
      onDelete={() => handleDelete(message.id)}
    />
  );
}
```

### With Reactions

```tsx
function ChatWithReactions() {
  const handleReact = (messageId: string, emoji: string) => {
    // Add or remove reaction logic
    console.log("React to", messageId, "with", emoji);
  };

  return (
    <ChatMessage
      sender={{ name: "Sarah" }}
      content="Great work!"
      timestamp={new Date()}
      reactions={[
        { emoji: "👍", count: 2, users: ["Alice", "Bob"] },
        { emoji: "🎉", count: 1, users: ["Charlie"] },
      ]}
      onReact={(emoji) => handleReact(message.id, emoji)}
    />
  );
}
```

## Accessibility

- Semantic HTML structure
- Keyboard navigation support for action buttons
- Screen reader friendly timestamps
- Alt text for avatars
- Clear visual status indicators

## Theme Support

The component is fully theme-responsive and works with all 6 color schemes:

- Purple (default)
- Ocean Blue
- Forest Green
- Sunset Orange
- Hot Pink
- Ruby Red

All colors use OKLCH design tokens for perceptually uniform theming.

## Best Practices

1. **Always provide unique IDs** when using `MessageThread`
2. **Use timestamps** for proper message ordering
3. **Group messages** with `MessageThread` for better UX
4. **Show typing indicator** when user is composing
5. **Implement optimistic updates** for better perceived performance
6. **Handle errors gracefully** for failed sends
7. **Show status indicators** for own messages only
8. **Limit reaction types** to maintain clean UI
9. **Compress images** before sending as attachments
10. **Implement infinite scroll** for long conversations

## Integration with Real-Time Systems

### WebSocket Example

```tsx
function RealtimeChat() {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "message") {
        setMessages(prev => [...prev, data.message]);
      }

      if (data.type === "typing") {
        setTyping(prev => [...prev, data.user]);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <MessageThread messages={messages} />
      {typing.map(user => (
        <TypingIndicator key={user.id} sender={user} />
      ))}
    </div>
  );
}
```

### Optimistic Updates

```tsx
function ChatWithOptimistic() {
  const sendMessage = async (content: string) => {
    const tempId = `temp-${Date.now()}`;

    // Add optimistic message
    setMessages(prev => [...prev, {
      id: tempId,
      sender: { name: "You" },
      content,
      timestamp: new Date(),
      isOwn: true,
      status: "sending"
    }]);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({ content })
      });

      const { id } = await response.json();

      // Update with real ID and status
      setMessages(prev => prev.map(m =>
        m.id === tempId
          ? { ...m, id, status: "sent" }
          : m
      ));
    } catch (error) {
      // Handle error, maybe remove message or show error state
      setMessages(prev => prev.filter(m => m.id !== tempId));
    }
  };

  return <ChatInterface onSend={sendMessage} />;
}
```

## Future Enhancements

Potential additions for more advanced use cases:

- **Voice messages** with audio player
- **Link previews** with metadata
- **Mentions** with autocomplete
- **Threads/Replies** for nested conversations
- **Message search** with highlighting
- **Read receipts** showing all readers
- **Forward message** functionality
- **Pin messages** to top
- **Message translations**
- **Giphy integration**
- **Code blocks** with syntax highlighting
- **Polls** and interactive messages
