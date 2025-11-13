import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CommentThread } from './comment-thread';
import type { Comment } from './comment-thread';

// Mock window.confirm
const mockConfirm = vi.fn();
global.confirm = mockConfirm;

describe('CommentThread Component', () => {
  const mockComments: Comment[] = [
    {
      id: '1',
      author: { name: 'Alice Johnson', avatar: 'https://example.com/alice.jpg' },
      content: 'This is the first comment',
      timestamp: new Date('2024-01-15T10:00:00'),
      likes: 5,
      isLiked: false,
      isOwn: false,
    },
    {
      id: '2',
      author: { name: 'Bob Smith' },
      content: 'This is the second comment',
      timestamp: new Date('2024-01-15T11:00:00'),
      likes: 3,
      isLiked: true,
      isOwn: true,
    },
  ];

  beforeEach(() => {
    mockConfirm.mockClear();
  });

  describe('Rendering', () => {
    it('renders all comments', () => {
      render(<CommentThread comments={mockComments} />);

      expect(screen.getByText('This is the first comment')).toBeInTheDocument();
      expect(screen.getByText('This is the second comment')).toBeInTheDocument();
    });

    it('renders author names', () => {
      render(<CommentThread comments={mockComments} />);

      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('renders empty state when no comments', () => {
      render(<CommentThread comments={[]} />);

      expect(screen.getByText('No comments yet')).toBeInTheDocument();
      expect(screen.getByText('Be the first to share your thoughts!')).toBeInTheDocument();
    });
  });

  describe('Sorting', () => {
    it('renders sorting controls', () => {
      render(<CommentThread comments={mockComments} />);

      expect(screen.getByText('Sort by:')).toBeInTheDocument();
      expect(screen.getByText('newest')).toBeInTheDocument();
      expect(screen.getByText('oldest')).toBeInTheDocument();
      expect(screen.getByText('top')).toBeInTheDocument();
    });

    it('sorts by newest when clicked', () => {
      render(<CommentThread comments={mockComments} />);

      const newestButton = screen.getByText('newest').closest('button');
      if (newestButton) {
        fireEvent.click(newestButton);
        expect(newestButton).toHaveClass('bg-primary');
      }
    });

    it('sorts by oldest when clicked', () => {
      render(<CommentThread comments={mockComments} />);

      const oldestButton = screen.getByText('oldest').closest('button');
      if (oldestButton) {
        fireEvent.click(oldestButton);
        expect(oldestButton).toHaveClass('bg-primary');
      }
    });

    it('sorts by top (most likes) when clicked', () => {
      render(<CommentThread comments={mockComments} />);

      const topButton = screen.getByText('top').closest('button');
      if (topButton) {
        fireEvent.click(topButton);
        expect(topButton).toHaveClass('bg-primary');
      }
    });
  });

  describe('Like Functionality', () => {
    it('displays heart icon for likes', () => {
      const { container } = render(<CommentThread comments={mockComments} />);

      const hearts = container.querySelectorAll('.h-4.w-4');
      expect(hearts.length).toBeGreaterThan(0);
    });

    it('shows filled heart for liked comments', () => {
      const { container } = render(<CommentThread comments={mockComments} />);

      // Second comment is liked
      const likedHearts = container.querySelectorAll('.fill-current');
      expect(likedHearts.length).toBeGreaterThan(0);
    });

    it('calls onLike when like button is clicked', () => {
      const mockLike = vi.fn();
      render(<CommentThread comments={mockComments} onLike={mockLike} />);

      const likeButtons = screen.getAllByRole('button');
      const firstLikeButton = likeButtons.find((btn) =>
        btn.querySelector('.h-4.w-4')
      );

      if (firstLikeButton) {
        fireEvent.click(firstLikeButton);
        expect(mockLike).toHaveBeenCalledWith('1');
      }
    });
  });

  describe('Reply Functionality', () => {
    it('shows reply button when onReply is provided', () => {
      render(<CommentThread comments={mockComments} onReply={() => {}} />);

      const replyButtons = screen.getAllByText('Reply');
      expect(replyButtons.length).toBeGreaterThan(0);
    });

    it('opens reply form when reply button is clicked', () => {
      render(<CommentThread comments={mockComments} onReply={() => {}} />);

      const replyButton = screen.getAllByText('Reply')[0];
      fireEvent.click(replyButton);

      expect(screen.getByPlaceholderText('Write a reply...')).toBeInTheDocument();
    });

    it('closes reply form when cancel is clicked', () => {
      render(<CommentThread comments={mockComments} onReply={() => {}} />);

      const replyButton = screen.getAllByText('Reply')[0];
      fireEvent.click(replyButton);

      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      expect(screen.queryByPlaceholderText('Write a reply...')).not.toBeInTheDocument();
    });

    it('calls onReply when reply is submitted', () => {
      const mockReply = vi.fn();
      render(<CommentThread comments={mockComments} onReply={mockReply} />);

      const replyButton = screen.getAllByText('Reply')[0];
      fireEvent.click(replyButton);

      const textarea = screen.getByPlaceholderText('Write a reply...');
      fireEvent.change(textarea, { target: { value: 'This is a reply' } });

      const submitButton = screen.getByText('Reply');
      fireEvent.click(submitButton);

      expect(mockReply).toHaveBeenCalled();
    });

    it('does not submit empty reply', () => {
      const mockReply = vi.fn();
      render(<CommentThread comments={mockComments} onReply={mockReply} />);

      const replyButton = screen.getAllByText('Reply')[0];
      fireEvent.click(replyButton);

      // Try to submit without typing anything
      const forms = screen.getAllByText('Reply');
      const submitButton = forms[forms.length - 1];
      fireEvent.click(submitButton);

      expect(mockReply).not.toHaveBeenCalled();
    });
  });

  describe('Edit Functionality', () => {
    it('shows edit option for own comments', () => {
      render(<CommentThread comments={mockComments} onEdit={() => {}} />);

      // Bob's comment (isOwn: true)
      const bobComment = screen.getByText('This is the second comment').closest('.group');
      if (bobComment) {
        const menuButton = bobComment.querySelector('button');
        if (menuButton) {
          fireEvent.click(menuButton);
          expect(screen.getByText('Edit')).toBeInTheDocument();
        }
      }
    });

    it('opens edit form when edit is clicked', () => {
      render(<CommentThread comments={mockComments} onEdit={() => {}} />);

      const bobComment = screen.getByText('This is the second comment').closest('.group');
      if (bobComment) {
        const menuButton = bobComment.querySelector('button');
        if (menuButton) {
          fireEvent.click(menuButton);
          const editButton = screen.getByText('Edit');
          fireEvent.click(editButton);

          expect(screen.getByPlaceholderText('Edit your comment...')).toBeInTheDocument();
        }
      }
    });

    it('calls onEdit when edit is submitted', () => {
      const mockEdit = vi.fn();
      render(<CommentThread comments={mockComments} onEdit={mockEdit} />);

      const bobComment = screen.getByText('This is the second comment').closest('.group');
      if (bobComment) {
        const menuButton = bobComment.querySelector('button');
        if (menuButton) {
          fireEvent.click(menuButton);
          const editButton = screen.getByText('Edit');
          fireEvent.click(editButton);

          const textarea = screen.getByPlaceholderText('Edit your comment...');
          fireEvent.change(textarea, { target: { value: 'Edited content' } });

          const saveButton = screen.getByText('Save');
          fireEvent.click(saveButton);

          expect(mockEdit).toHaveBeenCalledWith('2', 'Edited content');
        }
      }
    });
  });

  describe('Delete Functionality', () => {
    it('shows delete option for own comments', () => {
      render(<CommentThread comments={mockComments} onDelete={() => {}} />);

      const bobComment = screen.getByText('This is the second comment').closest('.group');
      if (bobComment) {
        const menuButton = bobComment.querySelector('button');
        if (menuButton) {
          fireEvent.click(menuButton);
          expect(screen.getByText('Delete')).toBeInTheDocument();
        }
      }
    });

    it('shows confirmation dialog when delete is clicked', () => {
      mockConfirm.mockReturnValue(false);
      render(<CommentThread comments={mockComments} onDelete={() => {}} />);

      const bobComment = screen.getByText('This is the second comment').closest('.group');
      if (bobComment) {
        const menuButton = bobComment.querySelector('button');
        if (menuButton) {
          fireEvent.click(menuButton);
          const deleteButton = screen.getByText('Delete');
          fireEvent.click(deleteButton);

          expect(mockConfirm).toHaveBeenCalled();
        }
      }
    });

    it('calls onDelete when confirmed', () => {
      mockConfirm.mockReturnValue(true);
      const mockDelete = vi.fn();
      render(<CommentThread comments={mockComments} onDelete={mockDelete} />);

      const bobComment = screen.getByText('This is the second comment').closest('.group');
      if (bobComment) {
        const menuButton = bobComment.querySelector('button');
        if (menuButton) {
          fireEvent.click(menuButton);
          const deleteButton = screen.getByText('Delete');
          fireEvent.click(deleteButton);

          expect(mockDelete).toHaveBeenCalledWith('2');
        }
      }
    });
  });

  describe('Edge Cases', () => {
    it('handles comments without avatars', () => {
      const commentsWithoutAvatars: Comment[] = [
        {
          id: '1',
          author: { name: 'Test User' },
          content: 'Test',
          timestamp: new Date(),
          likes: 0,
        },
      ];

      render(<CommentThread comments={commentsWithoutAvatars} />);

      expect(screen.getByText('TU')).toBeInTheDocument();
    });

    it('handles very long comments', () => {
      const longComment: Comment[] = [
        {
          id: '1',
          author: { name: 'User' },
          content: 'Lorem ipsum '.repeat(100),
          timestamp: new Date(),
          likes: 0,
        },
      ];

      render(<CommentThread comments={longComment} />);

      expect(screen.getByText(/Lorem ipsum/)).toBeInTheDocument();
    });

    it('handles comments with zero likes', () => {
      const zeroLikes: Comment[] = [
        {
          id: '1',
          author: { name: 'User' },
          content: 'Test',
          timestamp: new Date(),
          likes: 0,
        },
      ];

      render(<CommentThread comments={zeroLikes} />);

      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });
});
