import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Twitter,
  Github,
  Linkedin,
  Edit,
  Share2,
  MoreVertical,
} from "lucide-react";

export const metadata: Metadata = {
  title: "User Profile - Fabrk Dashboard",
  description: "View and manage user profile",
};

// Mock user data - replace with real data from your database
const mockUserProfile = {
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  role: "Pro Member",
  joinedDate: "January 2024",
  location: "San Francisco, CA",
  website: "alexjohnson.dev",
  bio: "Full-stack developer and indie hacker. Building SaaS products that solve real problems. Currently working on my third startup.",
  social: {
    twitter: "@alexjohnson",
    github: "alexjohnson",
    linkedin: "alexjohnson",
  },
  stats: {
    projects: 12,
    followers: 234,
    following: 89,
  },
  recentProjects: [
    {
      name: "TaskFlow Pro",
      description: "Project management for small teams",
      status: "Live",
      tech: ["Next.js", "PostgreSQL", "Stripe"],
    },
    {
      name: "EmailKit",
      description: "Transactional email templates",
      status: "In Development",
      tech: ["React", "Tailwind", "Resend"],
    },
    {
      name: "AuthHub",
      description: "Authentication microservice",
      status: "Planning",
      tech: ["Node.js", "Redis", "JWT"],
    },
  ],
  activity: [
    { action: "Created new project", item: "TaskFlow Pro", time: "2 days ago" },
    { action: "Updated profile", item: "Added bio", time: "1 week ago" },
    { action: "Joined Fabrk", item: "Pro Member", time: "2 weeks ago" },
  ],
};

export default async function UserProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="space-y-8 p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          User Profile
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Profile Card */}
        <div className="space-y-6 lg:col-span-1">
          {/* Profile Info */}
          <Card className="border border-border p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="relative">
                <div className="h-32 w-32 overflow-hidden rounded-none border border-border shadow-sm">
                  <img
                    src={mockUserProfile.avatar}
                    alt={mockUserProfile.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 rounded-none border-2 border-background bg-success p-1">
                  <div className="h-3 w-3 rounded-none bg-success"></div>
                </div>
              </div>

              {/* Name & Role */}
              <h2 className="mt-4 text-2xl font-bold text-foreground">
                {mockUserProfile.name}
              </h2>
              <span className="mt-1 inline-block rounded-none border border-border bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                {mockUserProfile.role}
              </span>

              {/* Bio */}
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {mockUserProfile.bio}
              </p>

              {/* Stats */}
              <div className="mt-6 grid w-full grid-cols-3 gap-4 border-t border-border pt-6">
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {mockUserProfile.stats.projects}
                  </p>
                  <p className="text-xs text-muted-foreground">Projects</p>
                </div>
                <div className="border-x border-border">
                  <p className="text-2xl font-bold text-foreground">
                    {mockUserProfile.stats.followers}
                  </p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {mockUserProfile.stats.following}
                  </p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Info */}
          <Card className="border border-border p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-foreground">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {mockUserProfile.email}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Joined {mockUserProfile.joinedDate}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {mockUserProfile.location}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <LinkIcon className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`https://${mockUserProfile.website}`}
                  className="text-sm text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {mockUserProfile.website}
                </a>
              </div>
            </div>
          </Card>

          {/* Social Links */}
          <Card className="border border-border p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-foreground">Social Links</h3>
            <div className="space-y-3">
              <a
                href={`https://twitter.com/${mockUserProfile.social.twitter.slice(1)}`}
                className="flex items-center gap-3 rounded border border-border bg-muted p-3 transition-colors hover:bg-primary/5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5 text-info" />
                <span className="text-sm font-semibold text-foreground">
                  {mockUserProfile.social.twitter}
                </span>
              </a>
              <a
                href={`https://github.com/${mockUserProfile.social.github}`}
                className="flex items-center gap-3 rounded border border-border bg-muted p-3 transition-colors hover:bg-primary/5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5 text-foreground" />
                <span className="text-sm font-semibold text-foreground">
                  {mockUserProfile.social.github}
                </span>
              </a>
              <a
                href={`https://linkedin.com/in/${mockUserProfile.social.linkedin}`}
                className="flex items-center gap-3 rounded border border-border bg-muted p-3 transition-colors hover:bg-primary/5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5 text-info" />
                <span className="text-sm font-semibold text-foreground">
                  {mockUserProfile.social.linkedin}
                </span>
              </a>
            </div>
          </Card>
        </div>

        {/* Right Column - Projects & Activity */}
        <div className="space-y-6 lg:col-span-2">
          {/* Recent Projects */}
          <Card className="border border-border p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-xl font-bold text-foreground">Recent Projects</h3>
              <Button
                size="sm"
                variant="outline"
              >
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {mockUserProfile.recentProjects.map((project, index) => (
                <div
                  key={index}
                  className="rounded border border-border bg-card p-4 shadow-sm transition-all hover:shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-bold text-foreground">
                          {project.name}
                        </h4>
                        <span
                          className={`inline-block rounded-none px-2 py-0.5 text-xs font-semibold ${
                            project.status === "Live"
                              ? "bg-success/20 text-success"
                              : project.status === "In Development"
                                ? "bg-info/20 text-info"
                                : "bg-warning/20 text-warning"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {project.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded border border-border bg-muted px-2 py-1 text-xs font-semibold text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="ml-2 rounded p-1 hover:bg-muted">
                      <MoreVertical className="h-5 w-5 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="border border-border p-6 shadow-sm">
            <div className="mb-4 border-b border-border pb-4">
              <h3 className="text-xl font-bold text-foreground">Recent Activity</h3>
            </div>
            <div className="space-y-4">
              {mockUserProfile.activity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-none border border-border bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">
                      <span className="font-semibold">{activity.action}</span>{" "}
                      <span className="text-muted-foreground">{activity.item}</span>
                    </p>
                    <p className="text-xs text-muted-foreground/80">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Implementation Note */}
      <div className="rounded-none border-2 border-primary bg-primary/5 p-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">👤 Implementation Note:</span>{" "}
          This is a demo user profile page with mock data. Replace{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            mockUserProfile
          </code>{" "}
          with real user data from your database. Add edit functionality with
          forms and image upload for avatars.
        </p>
      </div>
    </div>
  );
}
