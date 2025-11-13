import type { Meta, StoryObj } from "@storybook/react";
import { ActivityTimeline, TimelineEvent } from "./activity-timeline";

const meta = {
  title: "UI/ActivityTimeline",
  component: ActivityTimeline,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    groupByDate: {
      control: "boolean",
      description: "Group events by date sections",
    },
    showFilters: {
      control: "boolean",
      description: "Show event type filters",
    },
    compact: {
      control: "boolean",
      description: "Compact view without expandable details",
    },
  },
} satisfies Meta<typeof ActivityTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

const now = new Date();
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

const basicEvents: TimelineEvent[] = [
  {
    id: "1",
    type: "created",
    user: {
      name: "John Doe",
      avatar: "https://avatar.vercel.sh/john",
    },
    title: "Created new project",
    description: "Initialized the project with default settings",
    timestamp: now,
  },
  {
    id: "2",
    type: "updated",
    user: {
      name: "Jane Smith",
      avatar: "https://avatar.vercel.sh/jane",
    },
    title: "Updated project settings",
    description: "Changed project visibility to public",
    timestamp: new Date(now.getTime() - 30 * 60 * 1000), // 30 mins ago
    metadata: {
      visibility: "public",
      previous_visibility: "private",
    },
  },
  {
    id: "3",
    type: "commented",
    user: {
      name: "Bob Wilson",
      avatar: "https://avatar.vercel.sh/bob",
    },
    title: "Added a comment",
    description: "This looks great! When can we start the next phase?",
    timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
];

export const Default: Story = {
  args: {
    events: basicEvents,
  },
};

export const WithIcons: Story = {
  args: {
    events: [
      {
        id: "1",
        type: "created",
        user: { name: "Alice Johnson", avatar: "https://avatar.vercel.sh/alice" },
        title: "Issue #123 created",
        description: "Bug: Login page not responding on mobile devices",
        timestamp: now,
        metadata: {
          priority: "high",
          assignee: "Dev Team",
        },
      },
      {
        id: "2",
        type: "status_changed",
        user: { name: "Charlie Brown", avatar: "https://avatar.vercel.sh/charlie" },
        title: "Status changed",
        description: "Issue moved from 'Open' to 'In Progress'",
        timestamp: new Date(now.getTime() - 15 * 60 * 1000),
        metadata: {
          from: "Open",
          to: "In Progress",
        },
      },
      {
        id: "3",
        type: "assigned",
        user: { name: "Diana Prince", avatar: "https://avatar.vercel.sh/diana" },
        title: "Assigned to developer",
        timestamp: new Date(now.getTime() - 45 * 60 * 1000),
        metadata: {
          assignee: "John Doe",
        },
      },
      {
        id: "4",
        type: "commented",
        user: { name: "John Doe", avatar: "https://avatar.vercel.sh/john" },
        title: "Left a comment",
        description: "I've identified the issue. Working on a fix now.",
        timestamp: new Date(now.getTime() - 90 * 60 * 1000),
      },
      {
        id: "5",
        type: "updated",
        user: { name: "John Doe", avatar: "https://avatar.vercel.sh/john" },
        title: "Updated issue",
        description: "Added fix and updated timeline",
        timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000),
        metadata: {
          estimated_time: "2 hours",
          complexity: "medium",
        },
      },
    ],
  },
};

export const GroupedByDate: Story = {
  args: {
    events: [
      {
        id: "1",
        type: "created",
        user: { name: "Sarah Connor", avatar: "https://avatar.vercel.sh/sarah" },
        title: "Project initialized",
        timestamp: now,
      },
      {
        id: "2",
        type: "commented",
        user: { name: "Kyle Reese", avatar: "https://avatar.vercel.sh/kyle" },
        title: "Added feedback",
        description: "Great start! Let's add authentication next.",
        timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000),
      },
      {
        id: "3",
        type: "updated",
        user: { name: "Sarah Connor", avatar: "https://avatar.vercel.sh/sarah" },
        title: "Updated dependencies",
        timestamp: yesterday,
        metadata: {
          packages_updated: 12,
        },
      },
      {
        id: "4",
        type: "assigned",
        user: { name: "John Connor", avatar: "https://avatar.vercel.sh/john" },
        title: "Assigned new task",
        timestamp: yesterday,
      },
      {
        id: "5",
        type: "status_changed",
        user: { name: "Sarah Connor", avatar: "https://avatar.vercel.sh/sarah" },
        title: "Moved to testing",
        timestamp: twoDaysAgo,
        metadata: {
          from: "Development",
          to: "Testing",
        },
      },
      {
        id: "6",
        type: "created",
        user: { name: "Tech Lead", avatar: "https://avatar.vercel.sh/lead" },
        title: "Sprint started",
        timestamp: lastWeek,
      },
    ],
    groupByDate: true,
  },
};

export const CompactView: Story = {
  args: {
    events: [
      {
        id: "1",
        type: "created",
        user: { name: "Admin", avatar: "https://avatar.vercel.sh/admin" },
        title: "Account created",
        description: "New user registration from sign-up form",
        timestamp: now,
        metadata: { source: "web", ip: "192.168.1.1" },
      },
      {
        id: "2",
        type: "updated",
        user: { name: "User", avatar: "https://avatar.vercel.sh/user" },
        title: "Profile updated",
        description: "Changed email and profile picture",
        timestamp: new Date(now.getTime() - 30 * 60 * 1000),
        metadata: { fields_changed: 2 },
      },
      {
        id: "3",
        type: "status_changed",
        user: { name: "System", avatar: "https://avatar.vercel.sh/system" },
        title: "Email verified",
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
        metadata: { verified: true },
      },
    ],
    compact: true,
  },
};

export const ProjectTimeline: Story = {
  args: {
    events: [
      {
        id: "1",
        type: "created",
        user: { name: "Project Manager", avatar: "https://avatar.vercel.sh/pm" },
        title: "Project kickoff",
        description:
          "Initialized new SaaS project with team of 5 developers. Budget approved and timeline set for 12 weeks.",
        timestamp: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
        metadata: {
          budget: "$50,000",
          duration: "12 weeks",
          team_size: 5,
        },
      },
      {
        id: "2",
        type: "assigned",
        user: { name: "Project Manager", avatar: "https://avatar.vercel.sh/pm" },
        title: "Team assignments",
        description: "Assigned roles and responsibilities to team members",
        timestamp: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000),
        metadata: {
          frontend_devs: 2,
          backend_devs: 2,
          designer: 1,
        },
      },
      {
        id: "3",
        type: "updated",
        user: { name: "Lead Developer", avatar: "https://avatar.vercel.sh/dev1" },
        title: "Tech stack finalized",
        description: "Selected Next.js, PostgreSQL, and Stripe for the stack",
        timestamp: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000),
        metadata: {
          frontend: "Next.js 15",
          database: "PostgreSQL",
          payments: "Stripe",
        },
      },
      {
        id: "4",
        type: "status_changed",
        user: { name: "System", avatar: "https://avatar.vercel.sh/system" },
        title: "Sprint 1 completed",
        description: "Successfully delivered authentication and dashboard",
        timestamp: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
        metadata: {
          sprint: 1,
          features_completed: 8,
          bugs_fixed: 3,
        },
      },
      {
        id: "5",
        type: "commented",
        user: { name: "Client", avatar: "https://avatar.vercel.sh/client" },
        title: "Client feedback",
        description:
          "Love the progress! The dashboard looks amazing. Can we add analytics next?",
        timestamp: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
      },
      {
        id: "6",
        type: "updated",
        user: { name: "Designer", avatar: "https://avatar.vercel.sh/designer" },
        title: "Design system updated",
        description: "Added new color scheme and component variants",
        timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
        metadata: {
          components_added: 5,
          themes: 3,
        },
      },
      {
        id: "7",
        type: "status_changed",
        user: { name: "QA Engineer", avatar: "https://avatar.vercel.sh/qa" },
        title: "Moved to testing",
        description: "Sprint 2 features ready for QA testing",
        timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        metadata: {
          sprint: 2,
          test_cases: 24,
        },
      },
      {
        id: "8",
        type: "commented",
        user: { name: "Lead Developer", avatar: "https://avatar.vercel.sh/dev1" },
        title: "Code review completed",
        description: "All pull requests reviewed and merged. Ready for deployment.",
        timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000),
      },
    ],
    groupByDate: true,
    showFilters: true,
  },
};

export const IssueHistory: Story = {
  args: {
    events: [
      {
        id: "1",
        type: "created",
        user: { name: "Bug Reporter", avatar: "https://avatar.vercel.sh/reporter" },
        title: "Issue #456 created",
        description: "Payment form validation not working correctly for international cards",
        timestamp: new Date(now.getTime() - 48 * 60 * 60 * 1000),
        metadata: {
          priority: "critical",
          severity: "high",
          affected_users: 127,
        },
      },
      {
        id: "2",
        type: "assigned",
        user: { name: "Team Lead", avatar: "https://avatar.vercel.sh/lead" },
        title: "Assigned to developer",
        description: "Assigned to payment team for investigation",
        timestamp: new Date(now.getTime() - 47 * 60 * 60 * 1000),
        metadata: {
          assignee: "Payment Team",
          estimated_time: "4 hours",
        },
      },
      {
        id: "3",
        type: "commented",
        user: { name: "Developer", avatar: "https://avatar.vercel.sh/dev" },
        title: "Investigation started",
        description:
          "Found the issue - Stripe validation regex doesn't support all international formats. Working on fix.",
        timestamp: new Date(now.getTime() - 46 * 60 * 60 * 1000),
      },
      {
        id: "4",
        type: "status_changed",
        user: { name: "Developer", avatar: "https://avatar.vercel.sh/dev" },
        title: "Status updated",
        description: "Moved to 'In Progress' after identifying root cause",
        timestamp: new Date(now.getTime() - 45 * 60 * 60 * 1000),
        metadata: {
          from: "Open",
          to: "In Progress",
        },
      },
      {
        id: "5",
        type: "updated",
        user: { name: "Developer", avatar: "https://avatar.vercel.sh/dev" },
        title: "Code fix committed",
        description: "Updated validation logic to support all card formats",
        timestamp: new Date(now.getTime() - 42 * 60 * 60 * 1000),
        metadata: {
          commit: "abc123f",
          files_changed: 3,
        },
      },
      {
        id: "6",
        type: "commented",
        user: { name: "QA Engineer", avatar: "https://avatar.vercel.sh/qa" },
        title: "Testing completed",
        description: "Tested with 20+ international card formats. All working correctly!",
        timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      },
      {
        id: "7",
        type: "status_changed",
        user: { name: "Team Lead", avatar: "https://avatar.vercel.sh/lead" },
        title: "Issue resolved",
        description: "Fix deployed to production. Monitoring for 24 hours.",
        timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000),
        metadata: {
          from: "In Progress",
          to: "Resolved",
          resolution_time: "36 hours",
        },
      },
    ],
    showFilters: false,
  },
};

export const UserActivity: Story = {
  args: {
    events: [
      {
        id: "1",
        type: "created",
        user: { name: "Emma Watson", avatar: "https://avatar.vercel.sh/emma" },
        title: "Account created",
        description: "Signed up via Google OAuth",
        timestamp: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
        metadata: {
          provider: "google",
          plan: "free",
        },
      },
      {
        id: "2",
        type: "updated",
        user: { name: "Emma Watson", avatar: "https://avatar.vercel.sh/emma" },
        title: "Profile completed",
        description: "Added profile picture and bio",
        timestamp: new Date(now.getTime() - 29 * 24 * 60 * 60 * 1000),
        metadata: {
          bio_length: 120,
          avatar_uploaded: true,
        },
      },
      {
        id: "3",
        type: "status_changed",
        user: { name: "Emma Watson", avatar: "https://avatar.vercel.sh/emma" },
        title: "Upgraded to Pro",
        description: "Subscribed to Pro plan ($29/month)",
        timestamp: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000),
        metadata: {
          from_plan: "free",
          to_plan: "pro",
          amount: "$29",
        },
      },
      {
        id: "4",
        type: "created",
        user: { name: "Emma Watson", avatar: "https://avatar.vercel.sh/emma" },
        title: "First project created",
        description: "Created 'E-commerce Redesign' project",
        timestamp: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
      },
      {
        id: "5",
        type: "assigned",
        user: { name: "Emma Watson", avatar: "https://avatar.vercel.sh/emma" },
        title: "Team member invited",
        description: "Invited 3 team members to collaborate",
        timestamp: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
        metadata: {
          invites_sent: 3,
        },
      },
      {
        id: "6",
        type: "commented",
        user: { name: "Emma Watson", avatar: "https://avatar.vercel.sh/emma" },
        title: "Left feedback",
        description: "Commented on design mockup #23",
        timestamp: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        id: "7",
        type: "updated",
        user: { name: "Emma Watson", avatar: "https://avatar.vercel.sh/emma" },
        title: "Settings updated",
        description: "Enabled 2FA and email notifications",
        timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        metadata: {
          two_factor: true,
          notifications: true,
        },
      },
    ],
    groupByDate: true,
    showFilters: true,
  },
};

export const WithFilters: Story = {
  args: {
    events: [
      {
        id: "1",
        type: "created",
        user: { name: "System", avatar: "https://avatar.vercel.sh/system" },
        title: "Database backup created",
        timestamp: now,
        metadata: { size: "2.3 GB" },
      },
      {
        id: "2",
        type: "updated",
        user: { name: "Admin", avatar: "https://avatar.vercel.sh/admin" },
        title: "Server configuration updated",
        description: "Increased memory allocation to 16GB",
        timestamp: new Date(now.getTime() - 30 * 60 * 1000),
        metadata: { memory: "16GB", previous: "8GB" },
      },
      {
        id: "3",
        type: "deleted",
        user: { name: "Admin", avatar: "https://avatar.vercel.sh/admin" },
        title: "Old logs deleted",
        description: "Removed logs older than 90 days",
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
        metadata: { files_deleted: 1240, space_freed: "5.7 GB" },
      },
      {
        id: "4",
        type: "status_changed",
        user: { name: "System", avatar: "https://avatar.vercel.sh/system" },
        title: "Deployment status",
        description: "Application deployed to production",
        timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000),
        metadata: { environment: "production", build: "v2.1.4" },
      },
      {
        id: "5",
        type: "commented",
        user: { name: "DevOps", avatar: "https://avatar.vercel.sh/devops" },
        title: "Deployment notes",
        description: "No issues detected. Monitoring metrics look healthy.",
        timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000),
      },
      {
        id: "6",
        type: "assigned",
        user: { name: "Manager", avatar: "https://avatar.vercel.sh/manager" },
        title: "On-call rotation",
        description: "Assigned weekend on-call duty",
        timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000),
        metadata: { assignee: "DevOps Team", duration: "48 hours" },
      },
      {
        id: "7",
        type: "created",
        user: { name: "System", avatar: "https://avatar.vercel.sh/system" },
        title: "SSL certificate renewed",
        timestamp: yesterday,
        metadata: { expires: "2025-11-13", provider: "Let's Encrypt" },
      },
      {
        id: "8",
        type: "updated",
        user: { name: "Security Team", avatar: "https://avatar.vercel.sh/security" },
        title: "Security patch applied",
        description: "Applied critical security updates to all dependencies",
        timestamp: yesterday,
        metadata: { packages_updated: 8, severity: "critical" },
      },
    ],
    showFilters: true,
  },
};

export const EmptyState: Story = {
  args: {
    events: [],
  },
};
