import type { Meta, StoryObj } from "@storybook/react";
import { RichTextEditor } from "./rich-text-editor";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { useState } from "react";
import {
  Bold,
  Italic,
  List,
  Link as LinkIcon,
  Send,
  Save,
} from "lucide-react";

const meta = {
  title: "UI/RichTextEditor",
  component: RichTextEditor,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RichTextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

// Controlled wrapper component for stories
function ControlledEditor(props: any) {
  const [value, setValue] = useState(props.value || "");
  return <RichTextEditor {...props} value={value} onChange={setValue} />;
}

export const Default: Story = {
  render: () => <ControlledEditor placeholder="Start typing..." />,
};

export const WithInitialContent: Story = {
  render: () => (
    <ControlledEditor
      value={`
        <h1>Welcome to the Rich Text Editor</h1>
        <p>This editor supports <strong>bold</strong>, <em>italic</em>, and <u>underline</u> formatting.</p>
        <h2>Features Include:</h2>
        <ul>
          <li>Multiple heading levels</li>
          <li>Text alignment options</li>
          <li>Ordered and unordered lists</li>
          <li><a href="https://example.com">Hyperlinks</a></li>
        </ul>
        <p style="text-align: center;">Try editing this content!</p>
      `}
    />
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <RichTextEditor
      value={`
        <h2>Read-Only Mode</h2>
        <p>This editor is in <strong>read-only</strong> mode. You cannot edit the content or access the toolbar.</p>
        <p>Perfect for displaying formatted content without allowing modifications.</p>
      `}
      readOnly
    />
  ),
};

export const MinimalToolbar: Story = {
  render: () => (
    <ControlledEditor
      toolbar="minimal"
      placeholder="Simple editor with essential tools only..."
      value="<p>This editor has a minimal toolbar with just <strong>bold</strong>, <em>italic</em>, <u>underline</u>, lists, and links.</p>"
    />
  ),
};

export const CustomToolbar: Story = {
  render: () => (
    <ControlledEditor
      customTools={[
        { command: "bold", icon: <Bold className="h-4 w-4" />, label: "Bold" },
        {
          command: "italic",
          icon: <Italic className="h-4 w-4" />,
          label: "Italic",
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
      ]}
      placeholder="Custom toolbar with only 4 tools..."
    />
  ),
};

export const FullFeatured: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="rounded-md border bg-accent p-4 shadow-sm">
        <h3 className="mb-2 font-semibold text-foreground">
          Full-Featured Editor
        </h3>
        <p className="text-sm text-muted-foreground">
          Complete toolbar with all formatting options including headings,
          alignment, lists, and links.
        </p>
      </div>
      <ControlledEditor
        toolbar="full"
        minHeight="300px"
        maxHeight="800px"
        placeholder="Start writing with full formatting capabilities..."
      />
    </div>
  ),
};

export const BlogEditor: Story = {
  render: () => {
    const [content, setContent] = useState(`
      <h1>My First Blog Post</h1>
      <p>Welcome to my blog! This is where I share my thoughts and experiences.</p>
      <h2>Introduction</h2>
      <p>Today I want to talk about building modern web applications...</p>
    `);
    const [savedMessage, setSavedMessage] = useState("");

    const handleSave = () => {
      setSavedMessage("Draft saved at " + new Date().toLocaleTimeString());
      setTimeout(() => setSavedMessage(""), 3000);
    };

    return (
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Write New Blog Post</CardTitle>
            <div className="flex gap-2">
              {savedMessage && (
                <span className="text-sm text-muted-foreground">
                  {savedMessage}
                </span>
              )}
              <Button onClick={handleSave} size="sm">
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button variant="default" size="sm">
                <Send className="mr-2 h-4 w-4" />
                Publish
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <RichTextEditor
            value={content}
            onChange={setContent}
            minHeight="400px"
            placeholder="Write your blog post here..."
          />
        </CardContent>
      </Card>
    );
  },
};

export const EmailComposer: Story = {
  render: () => {
    const [emailBody, setEmailBody] = useState("");

    return (
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Compose Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">To:</label>
            <input
              type="email"
              placeholder="recipient@example.com"
              className="w-full rounded-md border bg-background px-3 py-2 text-foreground shadow-sm outline-none focus:shadow-md"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Subject:
            </label>
            <input
              type="text"
              placeholder="Email subject"
              className="w-full rounded-md border bg-background px-3 py-2 text-foreground shadow-sm outline-none focus:shadow-md"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Message:
            </label>
            <RichTextEditor
              value={emailBody}
              onChange={setEmailBody}
              toolbar="minimal"
              minHeight="250px"
              placeholder="Compose your email..."
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Save as Draft</Button>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Send Email
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  },
};

export const NoteTaking: Story = {
  render: () => {
    const [notes, setNotes] = useState(`
      <h2>Meeting Notes - 2024</h2>
      <p><strong>Date:</strong> Today</p>
      <p><strong>Attendees:</strong> Team members</p>
      <h3>Agenda</h3>
      <ol>
        <li>Project updates</li>
        <li>Q&A session</li>
        <li>Next steps</li>
      </ol>
      <h3>Action Items</h3>
      <ul>
        <li>Follow up with stakeholders</li>
        <li>Update documentation</li>
      </ul>
    `);

    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <RichTextEditor
              value={notes}
              onChange={setNotes}
              minHeight="350px"
              placeholder="Take notes during meetings..."
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <RichTextEditor
              value={notes}
              readOnly
              minHeight="350px"
              placeholder="Preview appears here..."
            />
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const CompactSize: Story = {
  render: () => (
    <div className="max-w-md">
      <ControlledEditor
        toolbar="minimal"
        minHeight="120px"
        maxHeight="200px"
        placeholder="Compact editor for comments..."
      />
    </div>
  ),
};

export const LargeEditor: Story = {
  render: () => (
    <ControlledEditor
      toolbar="full"
      minHeight="500px"
      maxHeight="1000px"
      placeholder="Large editor for long-form content..."
    />
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <ControlledEditor
        className="border-4 border-primary"
        toolbar="minimal"
        placeholder="Custom styled editor..."
      />
    </div>
  ),
};

export const MultipleEditors: Story = {
  render: () => {
    const [title, setTitle] = useState("<p>Article Title</p>");
    const [subtitle, setSubtitle] = useState("<p>Engaging subtitle</p>");
    const [body, setBody] = useState("<p>Article content goes here...</p>");

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Title:</label>
          <RichTextEditor
            value={title}
            onChange={setTitle}
            customTools={[
              {
                command: "bold",
                icon: <Bold className="h-4 w-4" />,
                label: "Bold",
              },
              {
                command: "italic",
                icon: <Italic className="h-4 w-4" />,
                label: "Italic",
              },
            ]}
            minHeight="60px"
            maxHeight="100px"
            placeholder="Enter title..."
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Subtitle:
          </label>
          <RichTextEditor
            value={subtitle}
            onChange={setSubtitle}
            customTools={[
              {
                command: "bold",
                icon: <Bold className="h-4 w-4" />,
                label: "Bold",
              },
              {
                command: "italic",
                icon: <Italic className="h-4 w-4" />,
                label: "Italic",
              },
            ]}
            minHeight="60px"
            maxHeight="100px"
            placeholder="Enter subtitle..."
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Body:</label>
          <RichTextEditor
            value={body}
            onChange={setBody}
            toolbar="full"
            minHeight="300px"
            placeholder="Write your article..."
          />
        </div>
      </div>
    );
  },
};
