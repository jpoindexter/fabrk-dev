import type { Meta, StoryObj } from "@storybook/react";
import { KanbanBoard, KanbanColumn, KanbanCard } from "./kanban-board";
import { useState } from "react";

const meta = {
  title: "Components/KanbanBoard",
  component: KanbanBoard,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof KanbanBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleCards: KanbanCard[] = [
  {
    id: "1",
    title: "Design new landing page",
    description: "Create mockups for the new marketing site",
    assignee: { name: "John Doe", avatar: undefined },
    tags: ["design", "marketing"],
    priority: "high",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    title: "Fix login bug",
    description: "Users can't log in with Google OAuth",
    assignee: { name: "Jane Smith" },
    tags: ["bug", "auth"],
    priority: "high",
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    title: "Update documentation",
    description: "Add API examples to docs",
    assignee: { name: "Bob Johnson" },
    tags: ["docs"],
    priority: "low",
  },
];

const defaultColumns: KanbanColumn[] = [
  {
    id: "todo",
    title: "To Do",
    cards: sampleCards,
    color: "#6366f1",
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [],
    color: "#f59e0b",
  },
  {
    id: "done",
    title: "Done",
    cards: [],
    color: "#10b981",
  },
];

// Interactive wrapper component
function InteractiveKanban({ initialColumns }: { initialColumns: KanbanColumn[] }) {
  const [columns, setColumns] = useState(initialColumns);

  const handleCardMove = (
    cardId: string,
    fromColumn: string,
    toColumn: string,
    toIndex: number
  ) => {
    setColumns((prev) => {
      const newColumns = [...prev];
      const fromCol = newColumns.find((col) => col.id === fromColumn);
      const toCol = newColumns.find((col) => col.id === toColumn);

      if (!fromCol || !toCol) return prev;

      const cardIndex = fromCol.cards.findIndex((card) => card.id === cardId);
      if (cardIndex === -1) return prev;

      const [movedCard] = fromCol.cards.splice(cardIndex, 1);
      toCol.cards.splice(toIndex, 0, movedCard);

      return newColumns;
    });
  };

  const handleCardAdd = (columnId: string) => {
    const newCard: KanbanCard = {
      id: `card-${Date.now()}`,
      title: "New Task",
      description: "Click edit to add details",
      priority: "medium",
    };

    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, cards: [...col.cards, newCard] }
          : col
      )
    );
  };

  const handleCardEdit = (cardId: string, columnId: string) => {
    alert(`Edit card ${cardId} in column ${columnId}`);
  };

  const handleCardDelete = (cardId: string, columnId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter((card) => card.id !== cardId) }
          : col
      )
    );
  };

  const handleColumnAdd = () => {
    const newColumn: KanbanColumn = {
      id: `column-${Date.now()}`,
      title: "New Column",
      cards: [],
      color: "#8b5cf6",
    };
    setColumns((prev) => [...prev, newColumn]);
  };

  const handleColumnToggle = (columnId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, collapsed: !col.collapsed } : col
      )
    );
  };

  return (
    <div className="h-screen bg-background">
      <KanbanBoard
        columns={columns}
        onCardMove={handleCardMove}
        onCardAdd={handleCardAdd}
        onCardEdit={handleCardEdit}
        onCardDelete={handleCardDelete}
        onColumnAdd={handleColumnAdd}
        onColumnToggle={handleColumnToggle}
      />
    </div>
  );
}

// Default board with 3 columns
export const Default: Story = {
  render: () => <InteractiveKanban initialColumns={defaultColumns} />,
};

// Todo/In Progress/Done board
export const TodoBoard: Story = {
  render: () => (
    <InteractiveKanban
      initialColumns={[
        {
          id: "todo",
          title: "To Do",
          cards: [
            {
              id: "1",
              title: "Design homepage",
              description: "Create hero section and feature showcase",
              assignee: { name: "Alice" },
              tags: ["design", "frontend"],
              priority: "high",
            },
            {
              id: "2",
              title: "Set up database",
              description: "Configure Postgres and Prisma schema",
              assignee: { name: "Bob" },
              tags: ["backend", "database"],
              priority: "high",
            },
            {
              id: "3",
              title: "Write tests",
              description: "Add unit tests for auth flow",
              assignee: { name: "Charlie" },
              tags: ["testing"],
              priority: "medium",
            },
          ],
          color: "#6366f1",
        },
        {
          id: "in-progress",
          title: "In Progress",
          cards: [
            {
              id: "4",
              title: "Implement auth",
              description: "NextAuth setup with Google OAuth",
              assignee: { name: "Diana" },
              tags: ["auth", "backend"],
              priority: "high",
              dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            },
          ],
          color: "#f59e0b",
        },
        {
          id: "done",
          title: "Done",
          cards: [
            {
              id: "5",
              title: "Project setup",
              description: "Initialize Next.js app with TypeScript",
              assignee: { name: "Eve" },
              tags: ["setup"],
              priority: "low",
            },
          ],
          color: "#10b981",
        },
      ]}
    />
  ),
};

// Agile board with 5 columns
export const AgileBoard: Story = {
  render: () => (
    <InteractiveKanban
      initialColumns={[
        {
          id: "backlog",
          title: "Backlog",
          cards: [
            {
              id: "1",
              title: "Add dark mode",
              tags: ["enhancement"],
              priority: "low",
            },
            {
              id: "2",
              title: "Analytics dashboard",
              tags: ["feature"],
              priority: "medium",
            },
          ],
          color: "#9ca3af",
        },
        {
          id: "todo",
          title: "To Do",
          cards: [
            {
              id: "3",
              title: "User profile page",
              assignee: { name: "Alex" },
              tags: ["frontend"],
              priority: "high",
            },
          ],
          color: "#6366f1",
        },
        {
          id: "in-progress",
          title: "In Progress",
          cards: [
            {
              id: "4",
              title: "Payment integration",
              assignee: { name: "Bailey" },
              tags: ["backend", "stripe"],
              priority: "high",
              dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            },
          ],
          color: "#f59e0b",
          limit: 3,
        },
        {
          id: "review",
          title: "In Review",
          cards: [],
          color: "#8b5cf6",
        },
        {
          id: "done",
          title: "Done",
          cards: [
            {
              id: "5",
              title: "Setup CI/CD",
              assignee: { name: "Casey" },
              tags: ["devops"],
              priority: "medium",
            },
          ],
          color: "#10b981",
        },
      ]}
    />
  ),
};

// Empty board
export const EmptyBoard: Story = {
  render: () => (
    <InteractiveKanban
      initialColumns={[
        {
          id: "todo",
          title: "To Do",
          cards: [],
          color: "#6366f1",
        },
        {
          id: "in-progress",
          title: "In Progress",
          cards: [],
          color: "#f59e0b",
        },
        {
          id: "done",
          title: "Done",
          cards: [],
          color: "#10b981",
        },
      ]}
    />
  ),
};

// Single column
export const SingleColumn: Story = {
  render: () => (
    <InteractiveKanban
      initialColumns={[
        {
          id: "tasks",
          title: "All Tasks",
          cards: sampleCards,
          color: "#6366f1",
        },
      ]}
    />
  ),
};

// Many columns with horizontal scroll
export const ManyColumns: Story = {
  render: () => (
    <InteractiveKanban
      initialColumns={[
        {
          id: "backlog",
          title: "Backlog",
          cards: [{ id: "1", title: "Task 1" }],
          color: "#9ca3af",
        },
        {
          id: "todo",
          title: "To Do",
          cards: [{ id: "2", title: "Task 2" }],
          color: "#6366f1",
        },
        {
          id: "in-progress",
          title: "In Progress",
          cards: [{ id: "3", title: "Task 3" }],
          color: "#f59e0b",
        },
        {
          id: "review",
          title: "In Review",
          cards: [{ id: "4", title: "Task 4" }],
          color: "#8b5cf6",
        },
        {
          id: "testing",
          title: "Testing",
          cards: [{ id: "5", title: "Task 5" }],
          color: "#ec4899",
        },
        {
          id: "done",
          title: "Done",
          cards: [{ id: "6", title: "Task 6" }],
          color: "#10b981",
        },
        {
          id: "archived",
          title: "Archived",
          cards: [{ id: "7", title: "Task 7" }],
          color: "#6b7280",
        },
      ]}
    />
  ),
};

// With WIP limits
export const WithWIPLimits: Story = {
  render: () => (
    <InteractiveKanban
      initialColumns={[
        {
          id: "todo",
          title: "To Do",
          cards: [
            { id: "1", title: "Task 1" },
            { id: "2", title: "Task 2" },
            { id: "3", title: "Task 3" },
            { id: "4", title: "Task 4" },
          ],
          color: "#6366f1",
        },
        {
          id: "in-progress",
          title: "In Progress",
          cards: [
            { id: "5", title: "Task 5", priority: "high" },
            { id: "6", title: "Task 6", priority: "high" },
            { id: "7", title: "Task 7", priority: "medium" },
            { id: "8", title: "Task 8", priority: "low" },
          ],
          color: "#f59e0b",
          limit: 3,
        },
        {
          id: "done",
          title: "Done",
          cards: [{ id: "9", title: "Task 9" }],
          color: "#10b981",
          limit: 10,
        },
      ]}
    />
  ),
};

// With priorities
export const WithPriorities: Story = {
  render: () => (
    <InteractiveKanban
      initialColumns={[
        {
          id: "todo",
          title: "To Do",
          cards: [
            {
              id: "1",
              title: "Critical bug fix",
              description: "Production is down",
              priority: "high",
              tags: ["bug", "critical"],
            },
            {
              id: "2",
              title: "Feature enhancement",
              description: "Add sorting to table",
              priority: "medium",
              tags: ["enhancement"],
            },
            {
              id: "3",
              title: "Update README",
              description: "Fix typos",
              priority: "low",
              tags: ["docs"],
            },
          ],
          color: "#6366f1",
        },
        {
          id: "in-progress",
          title: "In Progress",
          cards: [],
          color: "#f59e0b",
        },
        {
          id: "done",
          title: "Done",
          cards: [],
          color: "#10b981",
        },
      ]}
    />
  ),
};

// With tags
export const WithTags: Story = {
  render: () => (
    <InteractiveKanban
      initialColumns={[
        {
          id: "todo",
          title: "To Do",
          cards: [
            {
              id: "1",
              title: "Build user dashboard",
              tags: ["frontend", "react", "typescript"],
              priority: "high",
            },
            {
              id: "2",
              title: "API endpoint for users",
              tags: ["backend", "api", "database"],
              priority: "high",
            },
            {
              id: "3",
              title: "Design system setup",
              tags: ["design", "figma", "tokens"],
              priority: "medium",
            },
          ],
          color: "#6366f1",
        },
        {
          id: "in-progress",
          title: "In Progress",
          cards: [],
          color: "#f59e0b",
        },
        {
          id: "done",
          title: "Done",
          cards: [],
          color: "#10b981",
        },
      ]}
    />
  ),
};

// With assignees
export const WithAssignees: Story = {
  render: () => (
    <InteractiveKanban
      initialColumns={[
        {
          id: "todo",
          title: "To Do",
          cards: [
            {
              id: "1",
              title: "Homepage design",
              assignee: { name: "Alice Anderson" },
              tags: ["design"],
            },
            {
              id: "2",
              title: "Database migration",
              assignee: { name: "Bob Brown" },
              tags: ["backend"],
            },
            {
              id: "3",
              title: "Write tests",
              assignee: { name: "Charlie Chen" },
              tags: ["testing"],
            },
          ],
          color: "#6366f1",
        },
        {
          id: "in-progress",
          title: "In Progress",
          cards: [
            {
              id: "4",
              title: "Auth implementation",
              assignee: { name: "Diana Davis" },
              tags: ["auth", "backend"],
              priority: "high",
            },
          ],
          color: "#f59e0b",
        },
        {
          id: "done",
          title: "Done",
          cards: [],
          color: "#10b981",
        },
      ]}
    />
  ),
};

// Collapsed columns
export const CollapsedColumns: Story = {
  render: () => (
    <InteractiveKanban
      initialColumns={[
        {
          id: "todo",
          title: "To Do",
          cards: sampleCards,
          color: "#6366f1",
        },
        {
          id: "in-progress",
          title: "In Progress",
          cards: [
            {
              id: "4",
              title: "Task in progress",
              priority: "high",
            },
          ],
          color: "#f59e0b",
          collapsed: true,
        },
        {
          id: "done",
          title: "Done",
          cards: [
            {
              id: "5",
              title: "Completed task 1",
            },
            {
              id: "6",
              title: "Completed task 2",
            },
          ],
          color: "#10b981",
          collapsed: true,
        },
      ]}
    />
  ),
};

// Cards with due dates
export const WithDueDates: Story = {
  render: () => (
    <InteractiveKanban
      initialColumns={[
        {
          id: "todo",
          title: "To Do",
          cards: [
            {
              id: "1",
              title: "Urgent task",
              description: "Due tomorrow",
              priority: "high",
              dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
              assignee: { name: "John Doe" },
            },
            {
              id: "2",
              title: "Medium priority task",
              description: "Due next week",
              priority: "medium",
              dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              assignee: { name: "Jane Smith" },
            },
            {
              id: "3",
              title: "Long-term task",
              description: "Due next month",
              priority: "low",
              dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
          ],
          color: "#6366f1",
        },
        {
          id: "in-progress",
          title: "In Progress",
          cards: [],
          color: "#f59e0b",
        },
        {
          id: "done",
          title: "Done",
          cards: [],
          color: "#10b981",
        },
      ]}
    />
  ),
};

// Interactive drag-and-drop demo
export const InteractiveDragDrop: Story = {
  render: () => {
    const columns: KanbanColumn[] = [
      {
        id: "column-1",
        title: "Column 1",
        cards: [
          {
            id: "card-1",
            title: "Drag me to Column 2",
            description: "Click and hold to drag this card",
            priority: "high",
            tags: ["demo"],
          },
          {
            id: "card-2",
            title: "I can be dragged too",
            description: "Try reordering cards within a column",
            priority: "medium",
            tags: ["demo"],
          },
        ],
        color: "#6366f1",
      },
      {
        id: "column-2",
        title: "Column 2",
        cards: [
          {
            id: "card-3",
            title: "Drop zone",
            description: "Drop cards here",
            priority: "low",
            tags: ["demo"],
          },
        ],
        color: "#f59e0b",
      },
      {
        id: "column-3",
        title: "Column 3",
        cards: [],
        color: "#10b981",
      },
    ];

    return (
      <div className="h-screen bg-background p-4">
        <div className="mb-4 rounded-brutal border-2 border-brutal bg-card p-4 shadow-brutal">
          <h2 className="mb-2 font-black text-foreground">
            Interactive Drag & Drop Demo
          </h2>
          <p className="text-sm text-muted-foreground">
            Try dragging cards between columns or reordering them within a column.
            Click the "Add Card" button to create new cards, or use the action menu
            to edit/delete cards.
          </p>
        </div>
        <InteractiveKanban initialColumns={columns} />
      </div>
    );
  },
};
