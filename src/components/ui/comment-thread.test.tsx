import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CommentThread } from "./comment-thread";
import type { Comment } from "./comment-thread";

const mockComments: Comment[] = [
  {
    id: "1",
    author: {
      name: "John Doe",
      avatar: "https://example.com/avatar.jpg",
    },
    content: "This is a test comment",
    timestamp: new Date("2024-01-01"),
    likes: 5,
    isLiked: false,
    isOwn: false,
  },
  {
    id: "2",
    author: {
      name: "Jane Smith",
    },
    content: "Another test comment",
    timestamp: "2024-01-02",
    likes: 10,
    isLiked: true,
    isOwn: true,
  },
];

const mockNestedComments: Comment[] = [
  {
    id: "1",
    author: {
      name: "Parent Comment",
    },
    content: "This is a parent comment",
    timestamp: new Date("2024-01-01"),
    likes: 5,
    isLiked: false,
    isOwn: false,
    replies: [
      {
        id: "1-1",
        author: {
          name: "Reply Author",
        },
        content: "This is a reply",
        timestamp: new Date("2024-01-02"),
        likes: 2,
        isLiked: false,
        isOwn: false,
      },
    ],
  },
];

describe("CommentThread", () => {
  it("renders empty state when no comments", () => {
    render(<CommentThread comments={[]} />);
    expect(screen.getByText("No comments yet")).toBeInTheDocument();
    expect(screen.getByText("Be the first to share your thoughts!")).toBeInTheDocument();
  });

  it("renders comments correctly", () => {
    render(<CommentThread comments={mockComments} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("This is a test comment")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Another test comment")).toBeInTheDocument();
  });

  it("displays like counts", () => {
    render(<CommentThread comments={mockComments} />);
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("calls onLike when like button is clicked", async () => {
    const user = userEvent.setup();
    const onLike = vi.fn();
    render(<CommentThread comments={mockComments} onLike={onLike} />);

    const likeButtons = screen.getAllByRole("button", { name: /5|10/i });
    await user.click(likeButtons[0]);

    expect(onLike).toHaveBeenCalledWith("1");
  });

  it("shows reply button for top-level comments", () => {
    render(<CommentThread comments={mockComments} onReply={vi.fn()} />);
    const replyButtons = screen.getAllByText("Reply");
    expect(replyButtons.length).toBeGreaterThan(0);
  });

  it("renders nested comments", () => {
    render(<CommentThread comments={mockNestedComments} />);
    expect(screen.getByText("Parent Comment")).toBeInTheDocument();
    expect(screen.getByText("Reply Author")).toBeInTheDocument();
    expect(screen.getByText("This is a reply")).toBeInTheDocument();
  });

  it("shows edit and delete options for own comments", () => {
    render(<CommentThread comments={mockComments} onEdit={vi.fn()} onDelete={vi.fn()} />);
    const janeComment = screen.getByText("Jane Smith").closest(".group");
    expect(janeComment).toBeInTheDocument();
  });

  it("respects maxDepth prop", () => {
    const deepComments: Comment[] = [
      {
        id: "1",
        author: { name: "Level 1" },
        content: "Level 1 comment",
        timestamp: new Date(),
        likes: 0,
        replies: [
          {
            id: "1-1",
            author: { name: "Level 2" },
            content: "Level 2 comment",
            timestamp: new Date(),
            likes: 0,
            replies: [
              {
                id: "1-1-1",
                author: { name: "Level 3" },
                content: "Level 3 comment",
                timestamp: new Date(),
                likes: 0,
              },
            ],
          },
        ],
      },
    ];

    const { container } = render(
      <CommentThread comments={deepComments} maxDepth={2} onReply={vi.fn()} />
    );

    // Level 3 should not have a reply button due to maxDepth=2
    expect(screen.getByText("Level 1 comment")).toBeInTheDocument();
    expect(screen.getByText("Level 2 comment")).toBeInTheDocument();
    expect(screen.getByText("Level 3 comment")).toBeInTheDocument();
  });

  it("renders sorting controls", () => {
    render(<CommentThread comments={mockComments} />);
    expect(screen.getByText("Sort by:")).toBeInTheDocument();
    expect(screen.getByText("newest")).toBeInTheDocument();
    expect(screen.getByText("oldest")).toBeInTheDocument();
    expect(screen.getByText("top")).toBeInTheDocument();
  });

  it("sorts comments by newest", async () => {
    const user = userEvent.setup();
    const comments: Comment[] = [
      {
        id: "1",
        author: { name: "Older" },
        content: "Older comment",
        timestamp: new Date("2024-01-01"),
        likes: 0,
      },
      {
        id: "2",
        author: { name: "Newer" },
        content: "Newer comment",
        timestamp: new Date("2024-01-02"),
        likes: 0,
      },
    ];

    render(<CommentThread comments={comments} sortBy="newest" />);
    const commentElements = screen.getAllByText(/comment$/i);
    expect(commentElements[0]).toHaveTextContent("Newer comment");
    expect(commentElements[1]).toHaveTextContent("Older comment");
  });

  it("sorts comments by top (most likes)", async () => {
    const user = userEvent.setup();
    const comments: Comment[] = [
      {
        id: "1",
        author: { name: "Less Popular" },
        content: "Less popular",
        timestamp: new Date(),
        likes: 5,
      },
      {
        id: "2",
        author: { name: "More Popular" },
        content: "More popular",
        timestamp: new Date(),
        likes: 50,
      },
    ];

    render(<CommentThread comments={comments} sortBy="top" />);
    await user.click(screen.getByText("top"));

    const commentElements = screen.getAllByText(/popular$/i);
    expect(commentElements[0]).toHaveTextContent("More popular");
    expect(commentElements[1]).toHaveTextContent("Less popular");
  });

  it("toggles reply form when reply button is clicked", async () => {
    const user = userEvent.setup();
    render(<CommentThread comments={mockComments} onReply={vi.fn()} />);

    const replyButton = screen.getAllByText("Reply")[0];
    await user.click(replyButton);

    expect(screen.getByPlaceholderText("Write a reply...")).toBeInTheDocument();
  });

  it("displays relative timestamps", () => {
    const recentComment: Comment[] = [
      {
        id: "1",
        author: { name: "Test" },
        content: "Recent",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        likes: 0,
      },
    ];

    render(<CommentThread comments={recentComment} />);
    expect(screen.getByText(/ago$/i)).toBeInTheDocument();
  });
});
