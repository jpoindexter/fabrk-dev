import type { Meta, StoryObj } from "@storybook/react";
import { MemberCard, MemberCardSkeleton, type Member } from "./member-card";

const meta: Meta<typeof MemberCard> = {
  title: "UI/MemberCard",
  component: MemberCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MemberCard>;

const sampleMember: Member = {
  id: "1",
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  avatar: "https://i.pravatar.cc/150?img=5",
  role: "Senior Product Designer",
  bio: "Passionate about creating user-centered designs that solve real problems. 8+ years of experience in SaaS products.",
  status: "online",
  skills: ["UI/UX", "Figma", "Design Systems", "User Research"],
  memberSince: new Date("2022-03-15"),
};

export const DefaultCard: Story = {
  args: {
    member: sampleMember,
    onEmail: (member) => console.log("Email:", member.email),
    onMessage: (member) => console.log("Message:", member.name),
    onEdit: (member) => console.log("Edit:", member.name),
    onRemove: (member) => console.log("Remove:", member.name),
    onViewProfile: (member) => console.log("View Profile:", member.name),
  },
};

export const CompactView: Story = {
  args: {
    member: sampleMember,
    variant: "compact",
    onEmail: (member) => console.log("Email:", member.email),
    onEdit: (member) => console.log("Edit:", member.name),
    onRemove: (member) => console.log("Remove:", member.name),
    onViewProfile: (member) => console.log("View Profile:", member.name),
  },
};

export const WithSkills: Story = {
  args: {
    member: {
      ...sampleMember,
      skills: ["React", "TypeScript", "Next.js", "Node.js", "GraphQL", "PostgreSQL"],
    },
    onEmail: (member) => console.log("Email:", member.email),
    onMessage: (member) => console.log("Message:", member.name),
  },
};

export const OnlineStatus: Story = {
  args: {
    member: {
      ...sampleMember,
      status: "online",
    },
    onEmail: (member) => console.log("Email:", member.email),
    onMessage: (member) => console.log("Message:", member.name),
  },
};

export const AwayStatus: Story = {
  args: {
    member: {
      ...sampleMember,
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=12",
      role: "Backend Engineer",
      status: "away",
    },
    onEmail: (member) => console.log("Email:", member.email),
    onMessage: (member) => console.log("Message:", member.name),
  },
};

export const OfflineStatus: Story = {
  args: {
    member: {
      ...sampleMember,
      name: "Emily Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=9",
      role: "Frontend Developer",
      status: "offline",
    },
    onEmail: (member) => console.log("Email:", member.email),
    onMessage: (member) => console.log("Message:", member.name),
  },
};

export const WithoutBio: Story = {
  args: {
    member: {
      id: "2",
      name: "Alex Thompson",
      email: "alex.thompson@example.com",
      avatar: "https://i.pravatar.cc/150?img=8",
      role: "Marketing Manager",
      status: "online",
      skills: ["Content Strategy", "SEO", "Analytics"],
      memberSince: new Date("2023-01-10"),
    },
    onEmail: (member) => console.log("Email:", member.email),
    onMessage: (member) => console.log("Message:", member.name),
  },
};

export const WithoutActions: Story = {
  args: {
    member: sampleMember,
    showActions: false,
    onEmail: (member) => console.log("Email:", member.email),
    onMessage: (member) => console.log("Message:", member.name),
  },
};

export const WithCustomActions: Story = {
  args: {
    member: sampleMember,
    onEmail: (member) => alert(`Sending email to ${member.email}`),
    onMessage: (member) => alert(`Opening chat with ${member.name}`),
    onViewProfile: (member) => alert(`Viewing profile: ${member.name}`),
  },
};

export const LoadingSkeleton: Story = {
  render: () => <MemberCardSkeleton variant="card" />,
};

export const CompactLoadingSkeleton: Story = {
  render: () => <MemberCardSkeleton variant="compact" />,
};

export const GridOfMembers: Story = {
  render: () => {
    const members: Member[] = [
      {
        id: "1",
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        avatar: "https://i.pravatar.cc/150?img=5",
        role: "Senior Product Designer",
        bio: "Passionate about creating user-centered designs.",
        status: "online",
        skills: ["UI/UX", "Figma", "Design Systems"],
        memberSince: new Date("2022-03-15"),
      },
      {
        id: "2",
        name: "Michael Chen",
        email: "michael.chen@example.com",
        avatar: "https://i.pravatar.cc/150?img=12",
        role: "Backend Engineer",
        bio: "Building scalable APIs and distributed systems.",
        status: "away",
        skills: ["Node.js", "PostgreSQL", "Redis"],
        memberSince: new Date("2021-07-22"),
      },
      {
        id: "3",
        name: "Emily Rodriguez",
        email: "emily.rodriguez@example.com",
        avatar: "https://i.pravatar.cc/150?img=9",
        role: "Frontend Developer",
        bio: "Crafting delightful user experiences with modern web tech.",
        status: "offline",
        skills: ["React", "TypeScript", "Tailwind"],
        memberSince: new Date("2023-01-10"),
      },
      {
        id: "4",
        name: "Alex Thompson",
        email: "alex.thompson@example.com",
        avatar: "https://i.pravatar.cc/150?img=8",
        role: "Marketing Manager",
        bio: "Data-driven marketing strategies for growth.",
        status: "online",
        skills: ["SEO", "Analytics", "Content"],
        memberSince: new Date("2022-11-05"),
      },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8 max-w-7xl">
        {members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            onEmail={(m) => console.log("Email:", m.email)}
            onMessage={(m) => console.log("Message:", m.name)}
            onEdit={(m) => console.log("Edit:", m.name)}
            onRemove={(m) => console.log("Remove:", m.name)}
            onViewProfile={(m) => console.log("View Profile:", m.name)}
          />
        ))}
      </div>
    );
  },
};

export const TeamList: Story = {
  render: () => {
    const members: Member[] = [
      {
        id: "1",
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        avatar: "https://i.pravatar.cc/150?img=5",
        role: "Senior Product Designer",
        status: "online",
      },
      {
        id: "2",
        name: "Michael Chen",
        email: "michael.chen@example.com",
        avatar: "https://i.pravatar.cc/150?img=12",
        role: "Backend Engineer",
        status: "away",
      },
      {
        id: "3",
        name: "Emily Rodriguez",
        email: "emily.rodriguez@example.com",
        avatar: "https://i.pravatar.cc/150?img=9",
        role: "Frontend Developer",
        status: "offline",
      },
      {
        id: "4",
        name: "Alex Thompson",
        email: "alex.thompson@example.com",
        avatar: "https://i.pravatar.cc/150?img=8",
        role: "Marketing Manager",
        status: "online",
      },
      {
        id: "5",
        name: "Jordan Lee",
        email: "jordan.lee@example.com",
        avatar: "https://i.pravatar.cc/150?img=15",
        role: "DevOps Engineer",
        status: "online",
      },
      {
        id: "6",
        name: "Taylor Swift",
        email: "taylor.swift@example.com",
        avatar: "https://i.pravatar.cc/150?img=20",
        role: "Product Manager",
        status: "away",
      },
    ];

    return (
      <div className="space-y-3 p-8 max-w-2xl">
        <h2 className="text-2xl font-black mb-4">Team Members</h2>
        {members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            variant="compact"
            onEmail={(m) => console.log("Email:", m.email)}
            onEdit={(m) => console.log("Edit:", m.name)}
            onRemove={(m) => console.log("Remove:", m.name)}
            onViewProfile={(m) => console.log("View Profile:", m.name)}
          />
        ))}
      </div>
    );
  },
};

export const NoAvatar: Story = {
  args: {
    member: {
      id: "7",
      name: "Jamie Wilson",
      email: "jamie.wilson@example.com",
      role: "Data Analyst",
      status: "online",
      skills: ["Python", "SQL", "Tableau"],
      memberSince: new Date("2023-06-01"),
    },
    onEmail: (member) => console.log("Email:", member.email),
    onMessage: (member) => console.log("Message:", member.name),
  },
};

export const LongName: Story = {
  args: {
    member: {
      id: "8",
      name: "Dr. Alexander Montgomery-Williams III",
      email: "alexander.montgomery-williams@example.com",
      avatar: "https://i.pravatar.cc/150?img=13",
      role: "Chief Technology Officer & Head of Engineering",
      bio: "Leading technology innovation and building high-performing engineering teams across multiple continents.",
      status: "online",
      skills: ["Leadership", "Strategy", "Architecture", "Innovation", "Team Building"],
      memberSince: new Date("2020-01-15"),
    },
    onEmail: (member) => console.log("Email:", member.email),
    onMessage: (member) => console.log("Message:", member.name),
  },
};

export const CompactLongName: Story = {
  args: {
    member: {
      id: "8",
      name: "Dr. Alexander Montgomery-Williams III",
      email: "alexander.montgomery-williams@example.com",
      avatar: "https://i.pravatar.cc/150?img=13",
      role: "Chief Technology Officer & Head of Engineering",
      status: "online",
    },
    variant: "compact",
    onEmail: (member) => console.log("Email:", member.email),
    onEdit: (member) => console.log("Edit:", member.name),
    onRemove: (member) => console.log("Remove:", member.name),
  },
};
