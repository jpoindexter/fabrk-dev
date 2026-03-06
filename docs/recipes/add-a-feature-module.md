# Add a Feature Module

How to add a complete feature (page + components + API + service) to your FABRK app.

We will use a "Projects" feature as the running example.

---

## 1. Create the Page

Create `src/app/(platform)/projects/page.tsx`:

```tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ProjectList } from '@/components/projects/project-list';
import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata({
  title: 'Projects',
  description: 'Manage your projects',
  noIndex: true,
});

export default async function ProjectsPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold uppercase">PROJECTS</h1>
      <ProjectList userId={session.user.id} />
    </div>
  );
}
```

## 2. Create Components

Create `src/components/projects/project-list.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, Badge } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Plus } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  status: 'active' | 'archived';
  createdAt: string;
}

export function ProjectList({ userId }: { userId: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.data || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader
        title="projects.db"
        code="0xA1"
        action={
          <Button size="sm" className={cn(mode.radius, mode.font, 'text-xs')}>
            <Plus className="mr-1 size-3" />
            {'> NEW PROJECT'}
          </Button>
        }
      />
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NAME</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>CREATED</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>
                  <Badge
                    code={project.status === 'active' ? '0x01' : '0x00'}
                    label={project.status.toUpperCase()}
                  />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(project.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
```

## 3. Create the API Route

Create `src/app/api/projects/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Replace with your actual data fetching
    const projects = await getProjects(session.user.id);
    return NextResponse.json({ data: projects }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const project = await createProject({ name, userId: session.user.id });
    return NextResponse.json({ data: project }, { status: 201 });
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

## 4. Create the Service Layer

Create `src/lib/projects/index.ts`:

```ts
import { prisma } from '@/lib/prisma';

export async function getProjects(userId: string) {
  return prisma.project.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createProject(data: { name: string; userId: string }) {
  return prisma.project.create({
    data: {
      name: data.name,
      userId: data.userId,
      status: 'active',
    },
  });
}

export async function deleteProject(id: string, userId: string) {
  return prisma.project.delete({
    where: { id, userId },
  });
}
```

## 5. Add the Prisma Model

Add to `prisma/schema.prisma`:

```prisma
model Project {
  id        String   @id @default(cuid())
  name      String
  status    String   @default("active")
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
}
```

Then push the schema:

```bash
npm run db:push
```

## 6. Add to Navigation

Edit `src/components/dashboard/dashboard-header.tsx` and add to the `navigationItems` array:

```ts
import { FolderKanban } from 'lucide-react';

const navigationItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/billing', label: 'Billing', icon: CreditCard },
  { href: '/developer/api-keys', label: 'API Keys', icon: Code },
];
```

## Checklist

- [ ] Page created in `src/app/(platform)/`
- [ ] Components use existing UI primitives (`Card`, `Table`, `Badge`, `Button`)
- [ ] API route uses `auth()` guard
- [ ] Service layer in `src/lib/`
- [ ] Prisma model added and pushed
- [ ] Navigation updated in dashboard header
- [ ] `npm run type-check` passes
- [ ] `npm run build` succeeds
