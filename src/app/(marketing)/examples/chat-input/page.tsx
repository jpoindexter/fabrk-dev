/**
 * Chat Input Component Example Page
 * Showcases the ChatInput component with interactive demos
 */

"use client";

import * as React from "react";
import { ChatInput } from "@/components/ui/chat-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ChatInputExamplePage() {
  // Example 1: Basic chat
  const [basicMessage, setBasicMessage] = React.useState("");

  // Example 2: Full chat interface
  const [chatMessage, setChatMessage] = React.useState("");
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      user: "Sarah Chen",
      avatar: "SC",
      text: "Hey! I just finished the new dashboard design. Want to take a look?",
      time: "10:23 AM",
      isMe: false,
    },
    {
      id: 2,
      user: "You",
      avatar: "ME",
      text: "Absolutely! Send it over.",
      time: "10:24 AM",
      isMe: true,
    },
    {
      id: 3,
      user: "Sarah Chen",
      avatar: "SC",
      text: "Here you go! Let me know what you think about the color scheme.",
      time: "10:25 AM",
      isMe: false,
    },
    {
      id: 4,
      user: "You",
      avatar: "ME",
      text: "Love the neobrutalism aesthetic! The hard shadows are perfect.",
      time: "10:26 AM",
      isMe: true,
    },
  ]);
  const [isTyping, setIsTyping] = React.useState(false);

  // Example 3: With character counter
  const [counterMessage, setCounterMessage] = React.useState("");

  // Example 4: Loading state
  const [loadingMessage, setLoadingMessage] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);

  // Handlers
  const handleBasicSend = (value: string) => {
    console.log("Basic send:", value);
    setBasicMessage("");
  };

  const handleChatSend = (value: string) => {
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
    setChatMessage("");

    // Simulate typing indicator
    setTimeout(() => setIsTyping(true), 1000);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          user: "Sarah Chen",
          avatar: "SC",
          text: "Thanks for the feedback! I'll make those changes.",
          time: new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          }),
          isMe: false,
        },
      ]);
    }, 3000);
  };

  const handleCounterSend = (value: string) => {
    console.log("Counter send:", value);
    setCounterMessage("");
  };

  const handleLoadingSend = async (value: string) => {
    setIsSending(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Loading send:", value);
    setLoadingMessage("");
    setIsSending(false);
  };

  const handleFileAttach = (files: File[]) => {
    console.log("Files attached:", files);
  };

  return (
    <div className="container mx-auto max-w-6xl space-y-12 py-12">
      {/* Header */}
      <div className="space-y-4 text-center">
        <Badge variant="accent" className="mb-2">
          UI Component
        </Badge>
        <h1 className="text-4xl font-bold md:text-5xl">Chat Input Component</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          A feature-rich chat input with auto-resize, file attachments, typing
          indicators, and keyboard shortcuts. Built with neobrutalism styling
          and full dark mode support.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Auto-Resize",
            description: "Grows from 1-5 lines automatically",
          },
          {
            title: "File Attachments",
            description: "Upload files with preview chips",
          },
          {
            title: "Typing Indicator",
            description: "Animated dots for user activity",
          },
          {
            title: "Keyboard Shortcuts",
            description: "Enter to send, Shift+Enter for new line",
          },
          {
            title: "Character Counter",
            description: "Optional max length tracking",
          },
          {
            title: "Theme Responsive",
            description: "Works in light and dark mode",
          },
        ].map((feature, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <h3 className="mb-2 font-bold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Example 1: Basic Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Usage</CardTitle>
          <p className="text-sm text-muted-foreground">
            Simple chat input with send button. Type and press Enter to send.
          </p>
        </CardHeader>
        <CardContent>
          <ChatInput
            value={basicMessage}
            onChange={setBasicMessage}
            onSend={handleBasicSend}
            placeholder="Type your message..."
          />
        </CardContent>
      </Card>

      {/* Example 2: Full Chat Interface */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b-2 border-brutal">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Full Chat Interface</CardTitle>
              <p className="text-sm text-muted-foreground">
                Complete example with messages, avatars, and typing indicator
              </p>
            </div>
            <Badge variant="accent">2 Online</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Messages */}
          <div className="h-[400px] space-y-4 overflow-y-auto p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.isMe ? "flex-row-reverse" : ""}`}
              >
                <Avatar className="h-8 w-8 shrink-0 rounded-brutal border-2 border-brutal bg-primary text-xs font-bold text-primary-foreground">
                  {msg.avatar}
                </Avatar>
                <div
                  className={`flex max-w-[70%] flex-col gap-1 ${msg.isMe ? "items-end" : ""}`}
                >
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {!msg.isMe && <span className="font-bold">{msg.user}</span>}
                    <span>{msg.time}</span>
                  </div>
                  <div
                    className={`rounded-brutal border-2 border-brutal px-4 py-2 shadow-brutal ${
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

          {/* Input */}
          <div className="border-t-2 border-brutal bg-muted p-4">
            <ChatInput
              value={chatMessage}
              onChange={setChatMessage}
              onSend={handleChatSend}
              placeholder="Type your message..."
              showTypingIndicator={isTyping}
              typingUser="Sarah Chen"
            />
          </div>
        </CardContent>
      </Card>

      {/* Example 3: With Character Counter */}
      <Card>
        <CardHeader>
          <CardTitle>Character Counter</CardTitle>
          <p className="text-sm text-muted-foreground">
            Shows character count with maximum length of 200 characters
          </p>
        </CardHeader>
        <CardContent>
          <ChatInput
            value={counterMessage}
            onChange={setCounterMessage}
            onSend={handleCounterSend}
            placeholder="Type a message (max 200 characters)..."
            showCharCount={true}
            maxLength={200}
          />
        </CardContent>
      </Card>

      {/* Example 4: Loading State */}
      <Card>
        <CardHeader>
          <CardTitle>Loading State</CardTitle>
          <p className="text-sm text-muted-foreground">
            Shows spinner while message is being sent (2 second delay)
          </p>
        </CardHeader>
        <CardContent>
          <ChatInput
            value={loadingMessage}
            onChange={setLoadingMessage}
            onSend={handleLoadingSend}
            loading={isSending}
            placeholder="Type and send to see loading state..."
          />
        </CardContent>
      </Card>

      {/* Example 5: File Attachments */}
      <Card>
        <CardHeader>
          <CardTitle>File Attachments</CardTitle>
          <p className="text-sm text-muted-foreground">
            Click the paperclip icon to attach files. Preview appears above
            input.
          </p>
        </CardHeader>
        <CardContent>
          <ChatInput
            value={basicMessage}
            onChange={setBasicMessage}
            onSend={handleBasicSend}
            onFileAttach={handleFileAttach}
            placeholder="Attach files using the paperclip icon..."
          />
        </CardContent>
      </Card>

      {/* Code Example */}
      <Card>
        <CardHeader>
          <CardTitle>Code Example</CardTitle>
          <p className="text-sm text-muted-foreground">
            Basic implementation of the ChatInput component
          </p>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-brutal border-2 border-brutal bg-muted p-4 text-sm">
            <code>{`import { ChatInput } from "@/components/ui/chat-input";

function MyChat() {
  const [message, setMessage] = useState("");

  const handleSend = (value: string) => {
    console.log("Sending:", value);
    setMessage("");
  };

  return (
    <ChatInput
      value={message}
      onChange={setMessage}
      onSend={handleSend}
      placeholder="Type a message..."
      showCharCount={true}
      maxLength={500}
    />
  );
}`}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Props Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Props Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-brutal">
                  <th className="pb-2 text-left font-bold">Prop</th>
                  <th className="pb-2 text-left font-bold">Type</th>
                  <th className="pb-2 text-left font-bold">Default</th>
                  <th className="pb-2 text-left font-bold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-border">
                <tr>
                  <td className="py-2 font-mono">value</td>
                  <td className="py-2 text-muted-foreground">string</td>
                  <td className="py-2 text-muted-foreground">Required</td>
                  <td className="py-2">Current input value</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono">onChange</td>
                  <td className="py-2 text-muted-foreground">function</td>
                  <td className="py-2 text-muted-foreground">Required</td>
                  <td className="py-2">Called when text changes</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono">onSend</td>
                  <td className="py-2 text-muted-foreground">function</td>
                  <td className="py-2 text-muted-foreground">Required</td>
                  <td className="py-2">Called when message is sent</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono">placeholder</td>
                  <td className="py-2 text-muted-foreground">string</td>
                  <td className="py-2 text-muted-foreground">
                    "Type a message..."
                  </td>
                  <td className="py-2">Placeholder text</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono">showCharCount</td>
                  <td className="py-2 text-muted-foreground">boolean</td>
                  <td className="py-2 text-muted-foreground">false</td>
                  <td className="py-2">Display character counter</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono">maxLength</td>
                  <td className="py-2 text-muted-foreground">number</td>
                  <td className="py-2 text-muted-foreground">1000</td>
                  <td className="py-2">Maximum character length</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono">loading</td>
                  <td className="py-2 text-muted-foreground">boolean</td>
                  <td className="py-2 text-muted-foreground">false</td>
                  <td className="py-2">Show loading spinner</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono">disabled</td>
                  <td className="py-2 text-muted-foreground">boolean</td>
                  <td className="py-2 text-muted-foreground">false</td>
                  <td className="py-2">Disable all interactions</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Part of the Fabrk Boilerplate UI Component Library
        </p>
      </div>
    </div>
  );
}
