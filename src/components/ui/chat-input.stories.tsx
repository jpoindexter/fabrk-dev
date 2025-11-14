/**
 * ✅ FABRK STORYBOOK
 * Chat Input component stories with 8+ examples
 *
 * Stories:
 * 1. Default - Basic chat input
 * 2. WithPlaceholder - Custom placeholder text
 * 3. Disabled - Non-interactive state
 * 4. Loading - Sending state with spinner
 * 5. WithCharCounter - Character count display
 * 6. WithFileAttachment - File upload preview
 * 7. WithTypingIndicator - Shows user typing
 * 8. InChatInterface - Full chat UI example
 * 9. Minimal - Just input and send button
 * 10. LongMessage - Multi-line auto-resize demo
 */

"use client";

import * as React from "react";
import { ChatInput } from "./chat-input";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Avatar } from "./avatar";
import { Badge } from "./badge";

export default {
  title: "Components/ChatInput",
  component: ChatInput,
  parameters: {
    layout: "padded",
  },
};

// Story 1: Default
export const Default = () => {
  const [message, setMessage] = React.useState("");

  const handleSend = (value: string) => {
    console.log("Sending:", value);
    setMessage("");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h2 className="text-xl font-bold">Default Chat Input</h2>
      <p className="text-sm text-muted-foreground">
        Basic chat input with send button. Type and press Enter to send.
      </p>
      <ChatInput value={message} onChange={setMessage} onSend={handleSend} />
    </div>
  );
};

// Story 2: WithPlaceholder
export const WithPlaceholder = () => {
  const [message, setMessage] = React.useState("");

  const handleSend = (value: string) => {
    console.log("Sending:", value);
    setMessage("");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h2 className="text-xl font-bold">Custom Placeholder</h2>
      <p className="text-sm text-muted-foreground">
        Chat input with custom placeholder text.
      </p>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={handleSend}
        placeholder="Ask me anything..."
      />
    </div>
  );
};

// Story 3: Disabled
export const Disabled = () => {
  const [message, setMessage] = React.useState("This input is disabled");

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h2 className="text-xl font-bold">Disabled State</h2>
      <p className="text-sm text-muted-foreground">
        Non-interactive state when chat is unavailable.
      </p>
      <ChatInput
        value={message}
        onChange={() => {}}
        onSend={() => {}}
        disabled={true}
      />
    </div>
  );
};

// Story 4: Loading
export const Loading = () => {
  const [message, setMessage] = React.useState(
    "Sending message to the server..."
  );

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h2 className="text-xl font-bold">Loading State</h2>
      <p className="text-sm text-muted-foreground">
        Shows spinner while message is being sent.
      </p>
      <ChatInput
        value={message}
        onChange={() => {}}
        onSend={() => {}}
        loading={true}
      />
    </div>
  );
};

// Story 5: WithCharCounter
export const WithCharCounter = () => {
  const [message, setMessage] = React.useState("");

  const handleSend = (value: string) => {
    console.log("Sending:", value);
    setMessage("");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h2 className="text-xl font-bold">Character Counter</h2>
      <p className="text-sm text-muted-foreground">
        Displays character count with max length of 200.
      </p>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={handleSend}
        showCharCount={true}
        maxLength={200}
      />
    </div>
  );
};

// Story 6: WithFileAttachment
export const WithFileAttachment = () => {
  const [message, setMessage] = React.useState("Check out these files!");

  const handleSend = (value: string) => {
    console.log("Sending:", value);
    setMessage("");
  };

  const handleFileAttach = (files: File[]) => {
    console.log("Files attached:", files);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h2 className="text-xl font-bold">File Attachment</h2>
      <p className="text-sm text-muted-foreground">
        Click the paperclip icon to attach files. Preview appears above input.
      </p>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={handleSend}
        onFileAttach={handleFileAttach}
      />
      <div className="rounded-md border bg-muted p-4">
        <p className="text-xs text-muted-foreground">
          <strong>💡 Tip:</strong> Click the paperclip icon to test file
          attachment. File previews will appear above the input.
        </p>
      </div>
    </div>
  );
};

// Story 7: WithTypingIndicator
export const WithTypingIndicator = () => {
  const [message, setMessage] = React.useState("");

  const handleSend = (value: string) => {
    console.log("Sending:", value);
    setMessage("");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h2 className="text-xl font-bold">Typing Indicator</h2>
      <p className="text-sm text-muted-foreground">
        Shows animated dots when another user is typing.
      </p>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={handleSend}
        showTypingIndicator={true}
        typingUser="Sarah Chen"
      />
    </div>
  );
};

// Story 8: InChatInterface
export const InChatInterface = () => {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      user: "Sarah Chen",
      avatar: "SC",
      text: "Hey! How's the new feature coming along?",
      time: "10:23 AM",
      isMe: false,
    },
    {
      id: 2,
      user: "You",
      avatar: "ME",
      text: "Great! Just finishing up the chat component now.",
      time: "10:24 AM",
      isMe: true,
    },
    {
      id: 3,
      user: "Sarah Chen",
      avatar: "SC",
      text: "Awesome! Can't wait to see it. Need any help with testing?",
      time: "10:25 AM",
      isMe: false,
    },
  ]);

  const handleSend = (value: string) => {
    const newMessage = {
      id: messages.length + 1,
      user: "You",
      avatar: "ME",
      text: value,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      isMe: true,
    };
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h2 className="text-xl font-bold">Full Chat Interface</h2>
      <p className="text-sm text-muted-foreground">
        Complete chat UI with messages, avatars, and input.
      </p>

      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Team Chat</CardTitle>
            <Badge variant="accent">3 Online</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Messages area */}
          <div className="h-[400px] space-y-4 overflow-y-auto p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.isMe ? "flex-row-reverse" : ""}`}
              >
                <Avatar className="h-8 w-8 shrink-0 rounded-md border bg-primary text-xs font-semibold text-primary-foreground">
                  {msg.avatar}
                </Avatar>
                <div
                  className={`flex max-w-[70%] flex-col gap-1 ${msg.isMe ? "items-end" : ""}`}
                >
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {!msg.isMe && <span className="font-semibold">{msg.user}</span>}
                    <span>{msg.time}</span>
                  </div>
                  <div
                    className={`rounded-md border px-4 py-2 shadow-sm ${
                      msg.isMe
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-foreground"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat input */}
          <div className="border-t bg-muted p-4">
            <ChatInput
              value={message}
              onChange={setMessage}
              onSend={handleSend}
              placeholder="Type your message..."
              showTypingIndicator={false}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Story 9: Minimal
export const Minimal = () => {
  const [message, setMessage] = React.useState("");

  const handleSend = (value: string) => {
    console.log("Sending:", value);
    setMessage("");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h2 className="text-xl font-bold">Minimal Version</h2>
      <p className="text-sm text-muted-foreground">
        Stripped-down version with just textarea and send button. No
        attachments or emoji picker.
      </p>

      {/* Custom minimal implementation */}
      <div className="relative flex items-end gap-2 rounded-md border bg-card p-2 shadow-sm">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (message.trim()) {
                handleSend(message);
              }
            }
          }}
          placeholder="Type a message..."
          rows={1}
          className="w-full resize-none bg-transparent text-sm leading-6 text-foreground outline-none placeholder:text-muted-foreground"
          style={{ minHeight: "24px", maxHeight: "120px" }}
        />
        <button
          onClick={() => {
            if (message.trim()) {
              handleSend(message);
            }
          }}
          disabled={!message.trim()}
          className="shrink-0 rounded-md border bg-primary p-2 text-primary-foreground shadow-sm transition-all hover:shadow-md disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Story 10: LongMessage
export const LongMessage = () => {
  const [message, setMessage] = React.useState("");

  const handleSend = (value: string) => {
    console.log("Sending:", value);
    setMessage("");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h2 className="text-xl font-bold">Auto-Resize Demo</h2>
      <p className="text-sm text-muted-foreground">
        Textarea automatically grows from 1 to 5 lines as you type. Try pasting
        multiple lines of text.
      </p>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={handleSend}
        placeholder="Type or paste multiple lines of text to see auto-resize..."
        showCharCount={true}
        maxLength={500}
      />
      <div className="rounded-md border bg-muted p-4">
        <p className="text-xs text-muted-foreground">
          <strong>💡 Try this:</strong> Paste this text to see auto-resize in
          action:
          <br />
          <code className="mt-2 block rounded bg-card p-2 text-xs">
            Line 1: Hello!
            <br />
            Line 2: This is a test
            <br />
            Line 3: Of the auto-resize
            <br />
            Line 4: Feature in action
            <br />
            Line 5: Pretty cool!
          </code>
        </p>
      </div>
    </div>
  );
};

// Story 11: All Features Combined
export const AllFeatures = () => {
  const [message, setMessage] = React.useState("");

  const handleSend = (value: string) => {
    console.log("Sending:", value);
    setMessage("");
  };

  const handleFileAttach = (files: File[]) => {
    console.log("Files attached:", files);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h2 className="text-xl font-bold">All Features Combined</h2>
      <p className="text-sm text-muted-foreground">
        Chat input with typing indicator, character counter, and file
        attachments enabled.
      </p>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={handleSend}
        onFileAttach={handleFileAttach}
        placeholder="Type your message..."
        showCharCount={true}
        maxLength={500}
        showTypingIndicator={true}
        typingUser="Alex Johnson"
      />
    </div>
  );
};

// Story 12: Dark Mode Compatible
export const DarkModeDemo = () => {
  const [message, setMessage] = React.useState("");

  const handleSend = (value: string) => {
    console.log("Sending:", value);
    setMessage("");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h2 className="text-xl font-bold">Dark Mode Compatible</h2>
      <p className="text-sm text-muted-foreground">
        All colors use design tokens for automatic dark mode support. Toggle
        your theme to see it in action.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            Light Theme
          </p>
          <div className="rounded-md border bg-background p-4">
            <ChatInput
              value={message}
              onChange={setMessage}
              onSend={handleSend}
              placeholder="Try typing here..."
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            With Background
          </p>
          <div className="rounded-md border bg-muted p-4">
            <ChatInput
              value={message}
              onChange={setMessage}
              onSend={handleSend}
              placeholder="Try typing here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
