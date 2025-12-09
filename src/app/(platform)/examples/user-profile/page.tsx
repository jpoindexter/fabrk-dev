import { Metadata } from 'next';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
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
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'User Profile - Fabrk Dashboard',
  description: 'View and manage user profile',
};

// Mock user data - replace with real data from your database
const mockUserProfile = {
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  role: 'Pro Member',
  joinedDate: 'January 2024',
  location: 'San Francisco, CA',
  website: 'alexjohnson.dev',
  bio: 'Full-stack developer and indie hacker. Building SaaS products that solve real problems. Currently working on my third startup.',
  social: {
    twitter: '@alexjohnson',
    github: 'alexjohnson',
    linkedin: 'alexjohnson',
  },
  stats: {
    projects: 12,
    followers: 234,
    following: 89,
  },
  recentProjects: [
    {
      name: 'TaskFlow Pro',
      description: 'Project management for small teams',
      status: 'Live',
      tech: ['Next.js', 'PostgreSQL', 'Stripe'],
    },
    {
      name: 'EmailKit',
      description: 'Transactional email templates',
      status: 'In Development',
      tech: ['React', 'Tailwind', 'Resend'],
    },
    {
      name: 'AuthHub',
      description: 'Authentication microservice',
      status: 'Planning',
      tech: ['Node.js', 'Redis', 'JWT'],
    },
  ],
  activity: [
    { action: 'Created new project', item: 'TaskFlow Pro', time: '2 days ago' },
    { action: 'Updated profile', item: 'Added bio', time: '1 week ago' },
    { action: 'Joined Fabrk', item: 'Pro Member', time: '2 weeks ago' },
  ],
};

export default async function UserProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="space-y-8 p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-foreground text-4xl font-semibold tracking-tight">User Profile</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
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
          <Card>
            <CardHeader code="0x00" title="PROFILE_INFO" />
            <CardContent>
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative">
                  <div
                    className={cn('border-border h-32 w-32 overflow-hidden border', mode.radius)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={mockUserProfile.avatar}
                      alt={mockUserProfile.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div
                    className={cn(
                      'border-background bg-success absolute right-0 bottom-0 border-2 p-1',
                      mode.radius
                    )}
                  >
                    <div className={cn('bg-success h-3 w-3', mode.radius)}></div>
                  </div>
                </div>

                {/* Name & Role */}
                <h2 className="text-foreground mt-4 text-2xl font-semibold">
                  {mockUserProfile.name}
                </h2>
                <span
                  className={cn(
                    'border-border bg-primary text-primary-foreground mt-1 inline-block border px-4 py-1 text-xs font-semibold',
                    mode.radius
                  )}
                >
                  {mockUserProfile.role}
                </span>

                {/* Bio */}
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                  {mockUserProfile.bio}
                </p>

                {/* Stats */}
                <div className="border-border mt-6 grid w-full grid-cols-3 gap-4 border-t pt-6">
                  <div>
                    <p className="text-foreground text-2xl font-semibold">
                      {mockUserProfile.stats.projects}
                    </p>
                    <p className="text-muted-foreground text-xs">Projects</p>
                  </div>
                  <div className="border-border border-x">
                    <p className="text-foreground text-2xl font-semibold">
                      {mockUserProfile.stats.followers}
                    </p>
                    <p className="text-muted-foreground text-xs">Followers</p>
                  </div>
                  <div>
                    <p className="text-foreground text-2xl font-semibold">
                      {mockUserProfile.stats.following}
                    </p>
                    <p className="text-muted-foreground text-xs">Following</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader code="0x01" title="CONTACT_INFO" />
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground text-sm">{mockUserProfile.email}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Calendar className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground text-sm">
                    Joined {mockUserProfile.joinedDate}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground text-sm">{mockUserProfile.location}</span>
                </div>
                <div className="flex items-center gap-4">
                  <LinkIcon className="text-muted-foreground h-4 w-4" />
                  <a
                    href={`https://${mockUserProfile.website}`}
                    className="text-primary text-sm hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {mockUserProfile.website}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader code="0x02" title="SOCIAL_LINKS" />
            <CardContent>
              <div className="space-y-4">
                <a
                  href={`https://twitter.com/${mockUserProfile.social.twitter.slice(1)}`}
                  className="border-border bg-muted hover:bg-primary/5 flex items-center gap-4 rounded border p-4 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="text-info h-5 w-5" />
                  <span className="text-foreground text-sm font-semibold">
                    {mockUserProfile.social.twitter}
                  </span>
                </a>
                <a
                  href={`https://github.com/${mockUserProfile.social.github}`}
                  className="border-border bg-muted hover:bg-primary/5 flex items-center gap-4 rounded border p-4 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="text-foreground h-5 w-5" />
                  <span className="text-foreground text-sm font-semibold">
                    {mockUserProfile.social.github}
                  </span>
                </a>
                <a
                  href={`https://linkedin.com/in/${mockUserProfile.social.linkedin}`}
                  className="border-border bg-muted hover:bg-primary/5 flex items-center gap-4 rounded border p-4 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="text-info h-5 w-5" />
                  <span className="text-foreground text-sm font-semibold">
                    {mockUserProfile.social.linkedin}
                  </span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Projects & Activity */}
        <div className="space-y-6 lg:col-span-2">
          {/* Recent Projects */}
          <Card>
            <CardHeader code="0x03" title="RECENT_PROJECTS" />
            <CardContent>
              <div className="mb-4 flex justify-end">
                <Button size="sm" variant="outline">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {mockUserProfile.recentProjects.map((project, index) => (
                  <div
                    key={index}
                    className="border-border bg-card rounded border p-4 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-foreground text-lg font-semibold">{project.name}</h4>
                          <span
                            className={cn(
                              `inline-block`,
                              mode.radius,
                              `px-2 py-0.5 text-xs font-semibold ${
                                project.status === 'Live'
                                  ? 'bg-success/20 text-success'
                                  : project.status === 'In Development'
                                    ? 'bg-info/20 text-info'
                                    : 'bg-warning/20 text-warning'
                              }`
                            )}
                          >
                            {project.status}
                          </span>
                        </div>
                        <p className="text-muted-foreground mt-1 text-sm">{project.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="border-border bg-muted text-foreground rounded border px-2 py-1 text-xs font-semibold"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="hover:bg-muted ml-2 rounded p-1">
                        <MoreVertical className="text-muted-foreground h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader code="0x04" title="RECENT_ACTIVITY" />
            <CardContent>
              <div className="space-y-4">
                {mockUserProfile.activity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div
                      className={cn(
                        'border-border bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center border',
                        mode.radius
                      )}
                    >
                      <User className="text-primary h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground text-sm">
                        <span className="font-semibold">{activity.action}</span>{' '}
                        <span className="text-muted-foreground">{activity.item}</span>
                      </p>
                      <p className="text-muted-foreground/80 text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Implementation Note */}
      <div className={cn('border-primary bg-primary/5 border-2 p-4', mode.radius)}>
        <p className="text-muted-foreground text-sm">
          <span className="text-foreground font-semibold">👤 Implementation Note:</span> This is a
          demo user profile page with mock data. Replace{' '}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">mockUserProfile</code> with real
          user data from your database. Add edit functionality with forms and image upload for
          avatars.
        </p>
      </div>
    </div>
  );
}
