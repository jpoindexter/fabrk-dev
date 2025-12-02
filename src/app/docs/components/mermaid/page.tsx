"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Mermaid } from "@/components/ui/mermaid";

export default function MermaidPage() {
  const flowchartExample = `graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    C --> E[End]`;

  const sequenceExample = `sequenceDiagram
    participant User
    participant API
    participant DB
    User->>API: Request data
    API->>DB: Query
    DB-->>API: Results
    API-->>User: Response`;

  const classExample = `classDiagram
    class User {
      +String name
      +String email
      +login()
      +logout()
    }
    class Admin {
      +String permissions
      +manageUsers()
    }
    User <|-- Admin`;

  const ganttExample = `gantt
    title Project Timeline
    dateFormat YYYY-MM-DD
    section Design
    Wireframes: 2024-01-01, 7d
    UI Design: 2024-01-08, 14d
    section Development
    Frontend: 2024-01-15, 21d
    Backend: 2024-01-22, 21d`;

  const pieExample = `pie title Project Completion
    "Completed" : 65
    "In Progress" : 25
    "Not Started" : 10`;

  return (
    <ComponentShowcaseTemplate
      code="[UI.89]"
      category="Components"
      title="Mermaid"
      description="Render Mermaid.js diagrams including flowcharts, sequence diagrams, class diagrams, and more."
      importCode={`import { Mermaid } from "@/components/ui/mermaid"`}
      mainPreview={{
        preview: (
          <>
            <div className="mb-2 font-mono text-xs text-muted-foreground">
              [DIAGRAM]: Flowchart Example
            </div>
            <Mermaid chart={flowchartExample} />
          </>
        ),
        code: `const flowchart = \`graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    C --> E[End]\`;

<Mermaid chart={flowchart} />`,
      }}
      variants={[
        {
          title: "Sequence Diagram",
          description: "Visualize interactions between different participants.",
          preview: (
            <>
              <div className="mb-2 font-mono text-xs text-muted-foreground">
                [DIAGRAM]: API Communication Flow
              </div>
              <Mermaid chart={sequenceExample} />
            </>
          ),
          code: `const sequence = \`sequenceDiagram
    participant User
    participant API
    participant DB
    User->>API: Request data
    API->>DB: Query
    DB-->>API: Results
    API-->>User: Response\`;

<Mermaid chart={sequence} />`,
        },
        {
          title: "Class Diagram",
          description: "Show class structure and relationships.",
          preview: (
            <>
              <div className="mb-2 font-mono text-xs text-muted-foreground">
                [DIAGRAM]: User Class Hierarchy
              </div>
              <Mermaid chart={classExample} />
            </>
          ),
          code: `const classDiagram = \`classDiagram
    class User {
      +String name
      +String email
      +login()
      +logout()
    }
    class Admin {
      +String permissions
      +manageUsers()
    }
    User <|-- Admin\`;

<Mermaid chart={classDiagram} />`,
        },
        {
          title: "Gantt Chart",
          description: "Display project timelines and schedules.",
          preview: (
            <>
              <div className="mb-2 font-mono text-xs text-muted-foreground">
                [DIAGRAM]: Project Timeline
              </div>
              <Mermaid chart={ganttExample} />
            </>
          ),
          code: `const gantt = \`gantt
    title Project Timeline
    dateFormat YYYY-MM-DD
    section Design
    Wireframes: 2024-01-01, 7d
    UI Design: 2024-01-08, 14d
    section Development
    Frontend: 2024-01-15, 21d
    Backend: 2024-01-22, 21d\`;

<Mermaid chart={gantt} />`,
        },
        {
          title: "Pie Chart",
          description: "Display proportional data with pie charts.",
          preview: (
            <>
              <div className="mb-2 font-mono text-xs text-muted-foreground">
                [DIAGRAM]: Project Completion Status
              </div>
              <Mermaid chart={pieExample} />
            </>
          ),
          code: `const pie = \`pie title Project Completion
    "Completed" : 65
    "In Progress" : 25
    "Not Started" : 10\`;

<Mermaid chart={pie} />`,
        },
        {
          title: "State Diagram",
          description: "Show state transitions and workflows.",
          preview: (
            <>
              <div className="mb-2 font-mono text-xs text-muted-foreground">
                [DIAGRAM]: Order State Machine
              </div>
              <Mermaid
                chart={`stateDiagram-v2
    [*] --> Pending
    Pending --> Processing
    Processing --> Shipped
    Shipped --> Delivered
    Delivered --> [*]
    Processing --> Cancelled
    Cancelled --> [*]`}
              />
            </>
          ),
          code: `const state = \`stateDiagram-v2
    [*] --> Pending
    Pending --> Processing
    Processing --> Shipped
    Shipped --> Delivered
    Delivered --> [*]
    Processing --> Cancelled
    Cancelled --> [*]\`;

<Mermaid chart={state} />`,
        },
        {
          title: "Entity Relationship",
          description: "Database entity relationships and schemas.",
          preview: (
            <>
              <div className="mb-2 font-mono text-xs text-muted-foreground">
                [DIAGRAM]: Database Schema
              </div>
              <Mermaid
                chart={`erDiagram
    USER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    USER {
        string id
        string name
        string email
    }
    ORDER {
        string id
        date orderDate
        string status
    }
    LINE-ITEM {
        string productId
        int quantity
        float price
    }`}
              />
            </>
          ),
          code: `const er = \`erDiagram
    USER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    USER {
        string id
        string name
        string email
    }
    ORDER {
        string id
        date orderDate
        string status
    }
    LINE-ITEM {
        string productId
        int quantity
        float price
    }\`;

<Mermaid chart={er} />`,
        },
      ]}
      props={[
        {
          name: "chart",
          type: "string",
          description: "Mermaid diagram definition string.",
          required: true,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes for the container.",
        },
      ]}
      accessibility={[
        "Diagrams are rendered as SVG for scalability",
        "Container has appropriate ARIA roles",
        "Text within diagrams is selectable",
        "Supports theme switching with design tokens",
        "Error messages displayed when diagram fails to render",
        "Scrollable container for large diagrams",
      ]}
      previous={{ title: "Menubar", href: "/docs/components/menubar" }}
      next={{ title: "Multi Select", href: "/docs/components/multi-select" }}
    />
  );
}
