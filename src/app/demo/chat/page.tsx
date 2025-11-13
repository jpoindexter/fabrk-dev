"use client";

import { useState } from "react";
import {
  ChatMessage,
  TypingIndicator,
  MessageThread,
} from "@/components/ui/chat-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Smile } from "lucide-react";

interface Message {
  id: string;
  sender: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: Date;
  isOwn?: boolean;
  status?: "sending" | "sent" | "delivered" | "read";
  reactions?: Array<{
    emoji: string;
    count: number;
    users: string[];
  }>;
  attachments?: Array<{
    type: "image" | "file";
    url: string;
    name?: string;
  }>;
}

const otherUser = {
  name: "Sarah Johnson",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
};

const ownUser = {
  name: "You",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
};

const initialMessages: Message[] = [
  {
    id: "1",
    sender: otherUser,
    content: "Hey! How's the new chat component coming along?",
    timestamp: new Date(Date.now() - 600000),
  },
  {
    id: "2",
    sender: ownUser,
    content: "Going great! Just finished implementing all the features.",
    timestamp: new Date(Date.now() - 540000),
    isOwn: true,
    status: "read",
  },
  {
    id: "3",
    sender: ownUser,
    content: "It supports messages, reactions, attachments, and more!",
    timestamp: new Date(Date.now() - 530000),
    isOwn: true,
    status: "read",
  },
  {
    id: "4",
    sender: otherUser,
    content: "That's awesome! Can you show me some examples? 🎉",
    timestamp: new Date(Date.now() - 480000),
    reactions: [
      { emoji: "🚀", count: 1, users: ["You"] },
      { emoji: "❤️", count: 1, users: ["You"] },
    ],
  },
  {
    id: "5",
    sender: ownUser,
    content: "Sure! Here's a screenshot of the component in action:",
    timestamp: new Date(Date.now() - 420000),
    isOwn: true,
    status: "delivered",
    attachments: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop",
        name: "chat-component.png",
      },
    ],
  },
  {
    id: "6",
    sender: otherUser,
    content: "Looks fantastic! I love the neobrutalism styling 🔥",
    timestamp: new Date(Date.now() - 360000),
    reactions: [
      { emoji: "👍", count: 1, users: ["You"] },
    ],
  },
  {
    id: "7",
    sender: ownUser,
    content: "Thanks! And here are the technical specs:",
    timestamp: new Date(Date.now() - 300000),
    isOwn: true,
    status: "read",
    attachments: [
      {
        type: "file",
        url: "#",
        name: "chat-component-specs.pdf",
      },
    ],
  },
];

export default function ChatDemoPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      sender: ownUser,
      content: newMessage,
      timestamp: new Date(),
      isOwn: true,
      status: "sending",
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Simulate message being sent
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === message.id ? { ...m, status: "sent" as const } : m
        )
      );
    }, 500);

    // Simulate delivery
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === message.id ? { ...m, status: "delivered" as const } : m
        )
      );
    }, 1000);

    // Simulate read
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === message.id ? { ...m, status: "read" as const } : m
        )
      );
    }, 1500);

    // Simulate typing indicator and response
    setTimeout(() => {
      setIsTyping(true);
    }, 2000);

    setTimeout(() => {
      setIsTyping(false);
      const response: Message = {
        id: `msg-${Date.now()}-response`,
        sender: otherUser,
        content: "Got it! That makes sense.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
    }, 4000);
  };

  const handleReact = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === messageId) {
          const reactions = m.reactions || [];
          const existingReaction = reactions.find((r) => r.emoji === emoji);

          if (existingReaction) {
            // Toggle reaction
            return {
              ...m,
              reactions: reactions.filter((r) => r.emoji !== emoji),
            };
          } else {
            // Add reaction
            return {
              ...m,
              reactions: [
                ...reactions,
                { emoji, count: 1, users: ["You"] },
              ],
            };
          }
        }
        return m;
      })
    );
  };

  const handleDelete = (messageId: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== messageId));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2">Chat Message Component</h1>
        <p className="text-muted-foreground text-lg">
          A comprehensive chat component with reactions, attachments, and status indicators
        </p>
      </div>

      <Tabs defaultValue="demo" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="demo">Live Demo</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        <TabsContent value="demo">
          <Card className="max-w-3xl mx-auto">
            <CardHeader className="border-b-2 border-brutal">
              <CardTitle className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
                Chat with Sarah Johnson
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* Messages */}
              <div className="h-[600px] overflow-y-auto mb-4 pr-2">
                <MessageThread
                  messages={messages.map((m) => ({
                    ...m,
                    onReact: (emoji) => handleReact(m.id, emoji),
                    onDelete: m.isOwn ? () => handleDelete(m.id) : undefined,
                  }))}
                />

                {isTyping && <TypingIndicator sender={otherUser} />}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  disabled={!newMessage.trim()}
                  className="gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-2">
                Press Enter to send, Shift+Enter for new line
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples">
          <div className="grid gap-6 max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Message Alignment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ChatMessage
                  sender={otherUser}
                  content="Messages from others appear on the left"
                  timestamp={new Date()}
                />
                <ChatMessage
                  sender={ownUser}
                  content="Your messages appear on the right"
                  timestamp={new Date()}
                  isOwn={true}
                  status="read"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Indicators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ChatMessage
                  sender={ownUser}
                  content="Sending..."
                  timestamp={new Date()}
                  isOwn={true}
                  status="sending"
                />
                <ChatMessage
                  sender={ownUser}
                  content="Sent to server"
                  timestamp={new Date()}
                  isOwn={true}
                  status="sent"
                />
                <ChatMessage
                  sender={ownUser}
                  content="Delivered to recipient"
                  timestamp={new Date()}
                  isOwn={true}
                  status="delivered"
                />
                <ChatMessage
                  sender={ownUser}
                  content="Read by recipient"
                  timestamp={new Date()}
                  isOwn={true}
                  status="read"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reactions & Attachments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ChatMessage
                  sender={otherUser}
                  content="Check out this amazing design!"
                  timestamp={new Date()}
                  reactions={[
                    { emoji: "🎉", count: 3, users: ["Alice", "Bob", "Charlie"] },
                    { emoji: "❤️", count: 2, users: ["David", "Emma"] },
                  ]}
                  attachments={[
                    {
                      type: "image",
                      url: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop",
                      name: "design-mockup.png",
                    },
                  ]}
                  onReact={(emoji) => console.log("Reacted with:", emoji)}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Typing Indicator</CardTitle>
              </CardHeader>
              <CardContent>
                <TypingIndicator sender={otherUser} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Core Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Own vs other message alignment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Avatar display with fallback initials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Timestamp formatting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Message grouping for consecutive messages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Responsive design (mobile-friendly)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status System</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Sending - Clock icon</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Sent - Single checkmark</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Delivered - Double checkmark (gray)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Read - Double checkmark (primary color)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reactions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Emoji reactions with count</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Hover tooltip showing all reactors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Click to add/remove reactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Positioned below message bubble</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attachments</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Image attachments with preview</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>File attachments with download button</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Multiple attachments support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Theme-responsive styling</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Edit message (hover to reveal)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Delete message (hover to reveal)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Smooth fade in/out transitions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Available for own messages only</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Design System</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Neobrutalism styling (2px borders)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Hard shadows (shadow-brutal)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Theme-responsive colors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Works with all 6 color schemes</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
