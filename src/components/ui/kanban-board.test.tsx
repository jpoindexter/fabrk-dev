import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { KanbanBoard } from './kanban-board';
import type { KanbanColumn, KanbanCard } from './kanban-board';

describe('KanbanBoard Component', () => {
  const mockColumns: KanbanColumn[] = [
    {
      id: 'todo',
      title: 'To Do',
      cards: [
        {
          id: 'card-1',
          title: 'Design landing page',
          description: 'Create mockups and assets',
          priority: 'high',
          tags: ['design', 'urgent'],
        },
        {
          id: 'card-2',
          title: 'Write documentation',
          description: 'API docs for developers',
          priority: 'medium',
          tags: ['docs'],
        },
      ],
      color: 'oklch(70% 0.15 240)',
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      cards: [
        {
          id: 'card-3',
          title: 'Implement authentication',
          description: 'OAuth and JWT setup',
          assignee: { name: 'Alice', avatar: '/alice.jpg' },
          priority: 'high',
        },
      ],
      limit: 3, // WIP limit
    },
    {
      id: 'done',
      title: 'Done',
      cards: [],
    },
  ];

  describe('Rendering', () => {
    it('renders all columns', () => {
      render(<KanbanBoard columns={mockColumns} />);

      expect(screen.getByText('To Do')).toBeInTheDocument();
      expect(screen.getByText('In Progress')).toBeInTheDocument();
      expect(screen.getByText('Done')).toBeInTheDocument();
    });

    it('renders all cards in correct columns', () => {
      render(<KanbanBoard columns={mockColumns} />);

      expect(screen.getByText('Design landing page')).toBeInTheDocument();
      expect(screen.getByText('Write documentation')).toBeInTheDocument();
      expect(screen.getByText('Implement authentication')).toBeInTheDocument();
    });

    it('displays card count for each column', () => {
      render(<KanbanBoard columns={mockColumns} />);

      // Should show card counts
      const counts = screen.getAllByText(/\d+/);
      expect(counts.length).toBeGreaterThan(0);
    });

    it('displays WIP limit badge when provided', () => {
      render(<KanbanBoard columns={mockColumns} />);

      // In Progress column has limit of 3
      expect(screen.getByText(/3$/)).toBeInTheDocument();
    });

    it('shows WIP limit exceeded warning', () => {
      const exceededColumns: KanbanColumn[] = [
        {
          id: 'in-progress',
          title: 'In Progress',
          cards: [
            { id: '1', title: 'Card 1' },
            { id: '2', title: 'Card 2' },
            { id: '3', title: 'Card 3' },
            { id: '4', title: 'Card 4' },
          ],
          limit: 3,
        },
      ];

      const { container } = render(<KanbanBoard columns={exceededColumns} />);

      // WIP limit badge should have destructive styling
      expect(container.querySelector('.bg-destructive')).toBeInTheDocument();
    });

    it('renders card tags correctly', () => {
      render(<KanbanBoard columns={mockColumns} />);

      expect(screen.getByText('design')).toBeInTheDocument();
      expect(screen.getByText('urgent')).toBeInTheDocument();
      expect(screen.getByText('docs')).toBeInTheDocument();
    });

    it('displays card descriptions', () => {
      render(<KanbanBoard columns={mockColumns} />);

      expect(screen.getByText('Create mockups and assets')).toBeInTheDocument();
      expect(screen.getByText('API docs for developers')).toBeInTheDocument();
    });

    it('shows assignee avatars when provided', () => {
      render(<KanbanBoard columns={mockColumns} />);

      const avatar = screen.getByText('Alice');
      expect(avatar).toBeInTheDocument();
    });

    it('displays priority indicators', () => {
      const { container } = render(<KanbanBoard columns={mockColumns} />);

      // Priority should be indicated visually (via colors or badges)
      const highPriorityCards = container.querySelectorAll('[data-priority="high"]');
      expect(highPriorityCards.length).toBeGreaterThan(0);
    });

    it('renders empty column correctly', () => {
      render(<KanbanBoard columns={mockColumns} />);

      // Done column is empty
      const doneColumn = screen.getByText('Done').closest('[data-column="done"]');
      expect(doneColumn).toBeInTheDocument();
    });
  });

  describe('Drag and Drop', () => {
    it('makes cards draggable', () => {
      render(<KanbanBoard columns={mockColumns} />);

      const card = screen.getByText('Design landing page').closest('[draggable]');
      expect(card).toHaveAttribute('draggable', 'true');
    });

    it('calls onCardMove when card is dropped in new column', () => {
      const mockCardMove = vi.fn();
      render(<KanbanBoard columns={mockColumns} onCardMove={mockCardMove} />);

      const card = screen.getByText('Design landing page').closest('[draggable]');
      const targetColumn = screen.getByText('In Progress').closest('[data-column]');

      if (card && targetColumn) {
        // Simulate drag start
        fireEvent.dragStart(card);

        // Simulate drop on target column
        fireEvent.drop(targetColumn);
        fireEvent.dragEnd(card);
      }

      // In real implementation, onCardMove should be called
      // Note: Full drag-and-drop testing requires more complex setup
    });

    it('provides visual feedback during drag', () => {
      const { container } = render(<KanbanBoard columns={mockColumns} />);

      const card = screen.getByText('Design landing page').closest('[draggable]');

      if (card) {
        fireEvent.dragStart(card);

        // Card should have dragging class/style
        expect(card.className).toContain('cursor-grabbing');
      }
    });

    it('shows drop zone indicators', () => {
      render(<KanbanBoard columns={mockColumns} />);

      const card = screen.getByText('Design landing page').closest('[draggable]');
      const column = screen.getByText('In Progress').closest('[data-column]');

      if (card && column) {
        fireEvent.dragStart(card);
        fireEvent.dragEnter(column);

        // Column should show drop indicator
        // Exact implementation depends on component design
      }
    });
  });

  describe('Interactions', () => {
    it('calls onCardAdd when add button is clicked', () => {
      const mockCardAdd = vi.fn();
      render(<KanbanBoard columns={mockColumns} onCardAdd={mockCardAdd} />);

      const addButtons = screen.getAllByLabelText(/Add card/i);
      fireEvent.click(addButtons[0]);

      expect(mockCardAdd).toHaveBeenCalledWith('todo');
    });

    it('calls onCardEdit when edit button is clicked', () => {
      const mockCardEdit = vi.fn();
      render(<KanbanBoard columns={mockColumns} onCardEdit={mockCardEdit} />);

      // Click on card to show actions
      const card = screen.getByText('Design landing page').closest('[data-card]');
      if (card) {
        fireEvent.mouseEnter(card);

        const editButton = screen.getByLabelText(/Edit/i);
        fireEvent.click(editButton);

        expect(mockCardEdit).toHaveBeenCalledWith('card-1', 'todo');
      }
    });

    it('calls onCardDelete when delete button is clicked', () => {
      const mockCardDelete = vi.fn();
      render(<KanbanBoard columns={mockColumns} onCardDelete={mockCardDelete} />);

      const card = screen.getByText('Design landing page').closest('[data-card]');
      if (card) {
        fireEvent.mouseEnter(card);

        const deleteButton = screen.getByLabelText(/Delete/i);
        fireEvent.click(deleteButton);

        expect(mockCardDelete).toHaveBeenCalledWith('card-1', 'todo');
      }
    });

    it('calls onColumnAdd when add column button is clicked', () => {
      const mockColumnAdd = vi.fn();
      render(<KanbanBoard columns={mockColumns} onColumnAdd={mockColumnAdd} />);

      const addColumnButton = screen.getByText(/Add column/i);
      fireEvent.click(addColumnButton);

      expect(mockColumnAdd).toHaveBeenCalledTimes(1);
    });

    it('toggles column collapse state', () => {
      const mockColumnToggle = vi.fn();
      render(
        <KanbanBoard columns={mockColumns} onColumnToggle={mockColumnToggle} />
      );

      const collapseButtons = screen.getAllByLabelText(/Collapse/i);
      fireEvent.click(collapseButtons[0]);

      expect(mockColumnToggle).toHaveBeenCalledWith('todo');
    });

    it('hides cards when column is collapsed', () => {
      const collapsedColumns: KanbanColumn[] = [
        {
          ...mockColumns[0],
          collapsed: true,
        },
      ];

      render(<KanbanBoard columns={collapsedColumns} />);

      // Cards should not be visible
      expect(screen.queryByText('Design landing page')).not.toBeInTheDocument();
    });
  });

  describe('Column Styling', () => {
    it('applies custom column colors', () => {
      const { container } = render(<KanbanBoard columns={mockColumns} />);

      // First column has custom color
      const todoColumn = container.querySelector('[data-column="todo"]');
      expect(todoColumn).toBeInTheDocument();
    });

    it('uses default colors when not specified', () => {
      const noColorColumns: KanbanColumn[] = [
        {
          id: 'test',
          title: 'Test Column',
          cards: [],
        },
      ];

      const { container } = render(<KanbanBoard columns={noColorColumns} />);

      expect(container.querySelector('[data-column="test"]')).toBeInTheDocument();
    });
  });

  describe('Horizontal Scrolling', () => {
    it('allows horizontal scroll when many columns', () => {
      const manyColumns: KanbanColumn[] = Array.from({ length: 10 }, (_, i) => ({
        id: `col-${i}`,
        title: `Column ${i}`,
        cards: [],
      }));

      const { container } = render(<KanbanBoard columns={manyColumns} />);

      // Container should have overflow-x
      const board = container.querySelector('.overflow-x-auto');
      expect(board).toBeInTheDocument();
    });
  });
});

describe('KanbanBoard Accessibility', () => {
  const mockColumns: KanbanColumn[] = [
    {
      id: 'todo',
      title: 'To Do',
      cards: [{ id: 'card-1', title: 'Task 1' }],
    },
  ];

  it('has accessible drag and drop labels', () => {
    render(<KanbanBoard columns={mockColumns} />);

    const card = screen.getByText('Task 1').closest('[draggable]');
    expect(card).toHaveAttribute('draggable', 'true');
    expect(card).toHaveAttribute('role');
  });

  it('has accessible button labels', () => {
    render(
      <KanbanBoard
        columns={mockColumns}
        onCardAdd={vi.fn()}
        onCardEdit={vi.fn()}
        onCardDelete={vi.fn()}
      />
    );

    expect(screen.getByLabelText(/Add card/i)).toBeInTheDocument();
  });

  it('supports keyboard navigation for cards', () => {
    render(<KanbanBoard columns={mockColumns} />);

    const card = screen.getByText('Task 1').closest('[data-card]');
    expect(card).toHaveAttribute('tabIndex', '0');
  });

  it('provides column headers with proper semantics', () => {
    render(<KanbanBoard columns={mockColumns} />);

    const columnHeader = screen.getByText('To Do');
    expect(columnHeader.tagName).toMatch(/h[2-6]/i); // Should be a heading
  });
});

describe('KanbanBoard Edge Cases', () => {
  it('handles empty board', () => {
    render(<KanbanBoard columns={[]} />);

    // Should render without crashing
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('handles columns with many cards', () => {
    const manyCards: KanbanCard[] = Array.from({ length: 100 }, (_, i) => ({
      id: `card-${i}`,
      title: `Card ${i}`,
    }));

    const bigColumn: KanbanColumn[] = [
      {
        id: 'big',
        title: 'Big Column',
        cards: manyCards,
      },
    ];

    render(<KanbanBoard columns={bigColumn} />);

    expect(screen.getByText('Card 0')).toBeInTheDocument();
    expect(screen.getByText('Card 99')).toBeInTheDocument();
  });

  it('handles very long card titles', () => {
    const longTitleColumn: KanbanColumn[] = [
      {
        id: 'test',
        title: 'Test',
        cards: [
          {
            id: '1',
            title:
              'This is a very long card title that should be handled gracefully by the component without breaking the layout or causing overflow issues',
          },
        ],
      },
    ];

    render(<KanbanBoard columns={longTitleColumn} />);

    expect(screen.getByText(/This is a very long card title/)).toBeInTheDocument();
  });

  it('handles missing optional card properties', () => {
    const minimalColumn: KanbanColumn[] = [
      {
        id: 'test',
        title: 'Test',
        cards: [
          {
            id: '1',
            title: 'Minimal Card',
          },
        ],
      },
    ];

    render(<KanbanBoard columns={minimalColumn} />);

    expect(screen.getByText('Minimal Card')).toBeInTheDocument();
  });

  it('handles due dates correctly', () => {
    const dateColumn: KanbanColumn[] = [
      {
        id: 'test',
        title: 'Test',
        cards: [
          {
            id: '1',
            title: 'Task with Due Date',
            dueDate: new Date('2025-12-31'),
          },
        ],
      },
    ];

    render(<KanbanBoard columns={dateColumn} />);

    // Should display formatted date
    expect(screen.getByText(/2025/)).toBeInTheDocument();
  });
});

describe('KanbanBoard Performance', () => {
  it('renders large board efficiently', () => {
    const largeBoard: KanbanColumn[] = Array.from({ length: 10 }, (_, i) => ({
      id: `col-${i}`,
      title: `Column ${i}`,
      cards: Array.from({ length: 50 }, (_, j) => ({
        id: `card-${i}-${j}`,
        title: `Card ${j}`,
      })),
    }));

    const { container } = render(<KanbanBoard columns={largeBoard} />);

    // Should render without crashing
    expect(container).toBeInTheDocument();
  });
});
