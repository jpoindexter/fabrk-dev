import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export const metadata = {
  title: "Organizations & Teams - Fabrk Docs",
  description: "Multi-tenant SaaS with organizations, team members, roles, and invitations. Full RBAC system included.",
};

export default function OrganizationsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Link href="/docs" className="text-primary hover:underline text-sm">
          ← Back to Documentation
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4">Organizations & Teams</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Multi-tenancy support with role-based access control (RBAC), team invitations, and organization management.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Fabrk includes a complete multi-tenancy system for B2B SaaS applications:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Organization creation and management</li>
              <li>Role-based access control (Owner, Admin, Member, Guest)</li>
              <li>Email-based team invitations</li>
              <li>Organization-scoped data isolation</li>
              <li>Member management and role changes</li>
              <li>Organization settings and branding</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Database Schema</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">Core models in <code className="bg-muted px-2 py-1 rounded">prisma/schema.prisma</code>:</p>
            <CodeBlock language="prisma" code={`enum OrgRole {
  OWNER
  ADMIN
  MEMBER
  GUEST
}

model Organization {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  logo        String?
  website     String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  members     OrganizationMember[]
  invites     OrganizationInvite[]
  // Add your org-scoped models here
  // projects   Project[]
  // apiKeys    ApiKey[]
}

model OrganizationMember {
  id             String       @id @default(cuid())
  userId         String
  organizationId String
  role           OrgRole      @default(MEMBER)
  joinedAt       DateTime     @default(now())

  user           User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  @@unique([userId, organizationId])
  @@index([organizationId])
}

model OrganizationInvite {
  id             String       @id @default(cuid())
  email          String
  organizationId String
  role           OrgRole      @default(MEMBER)
  token          String       @unique
  expiresAt      DateTime
  invitedById    String
  createdAt      DateTime     @default(now())

  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  @@index([email])
  @@index([token])
}`} />
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Role Permissions</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Permission</th>
                    <th className="text-center py-2">Owner</th>
                    <th className="text-center py-2">Admin</th>
                    <th className="text-center py-2">Member</th>
                    <th className="text-center py-2">Guest</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2">View organization</td>
                    <td className="text-center">Yes</td>
                    <td className="text-center">Yes</td>
                    <td className="text-center">Yes</td>
                    <td className="text-center">Yes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Create/edit content</td>
                    <td className="text-center">Yes</td>
                    <td className="text-center">Yes</td>
                    <td className="text-center">Yes</td>
                    <td className="text-center">No</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Invite members</td>
                    <td className="text-center">Yes</td>
                    <td className="text-center">Yes</td>
                    <td className="text-center">No</td>
                    <td className="text-center">No</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Remove members</td>
                    <td className="text-center">Yes</td>
                    <td className="text-center">Yes</td>
                    <td className="text-center">No</td>
                    <td className="text-center">No</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Change member roles</td>
                    <td className="text-center">Yes</td>
                    <td className="text-center">Yes</td>
                    <td className="text-center">No</td>
                    <td className="text-center">No</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Edit org settings</td>
                    <td className="text-center">Yes</td>
                    <td className="text-center">Yes</td>
                    <td className="text-center">No</td>
                    <td className="text-center">No</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Manage billing</td>
                    <td className="text-center">Yes</td>
                    <td className="text-center">Yes</td>
                    <td className="text-center">No</td>
                    <td className="text-center">No</td>
                  </tr>
                  <tr>
                    <td className="py-2">Delete organization</td>
                    <td className="text-center">Yes</td>
                    <td className="text-center">No</td>
                    <td className="text-center">No</td>
                    <td className="text-center">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Code Examples</h2>

        <h3 className="text-xl font-medium mb-3">Create Organization</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">API endpoint to create a new organization:</p>
            <CodeBlock language="typescript" code={`// src/app/api/v1/organizations/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import slugify from "slugify";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await request.json();

  if (!name || name.length < 2) {
    return NextResponse.json(
      { error: "Organization name must be at least 2 characters" },
      { status: 400 }
    );
  }

  // Generate unique slug
  let slug = slugify(name, { lower: true, strict: true });
  const existing = await prisma.organization.findUnique({
    where: { slug },
  });

  if (existing) {
    slug = \`\${slug}-\${Date.now()}\`;
  }

  // Create org with user as owner
  const organization = await prisma.organization.create({
    data: {
      name,
      slug,
      members: {
        create: {
          userId: session.user.id,
          role: "OWNER",
        },
      },
    },
    include: {
      members: {
        include: { user: { select: { id: true, name: true, email: true } } },
      },
    },
  });

  return NextResponse.json(organization, { status: 201 });
}

// GET user's organizations
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const organizations = await prisma.organization.findMany({
    where: {
      members: { some: { userId: session.user.id } },
    },
    include: {
      members: {
        where: { userId: session.user.id },
        select: { role: true },
      },
      _count: { select: { members: true } },
    },
  });

  return NextResponse.json(organizations);
}`} />
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">Invite Members</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Send team invitations:</p>
            <CodeBlock language="typescript" code={`// src/app/api/v1/organizations/invite/route.ts
import { nanoid } from "nanoid";
import { sendInviteEmail } from "@/lib/email";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { organizationId, email, role = "MEMBER" } = await request.json();

  // Check user has permission to invite
  const membership = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId: session.user.id,
        organizationId,
      },
    },
  });

  if (!membership || !["OWNER", "ADMIN"].includes(membership.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Check if user is already a member
  const existingUser = await prisma.user.findUnique({
    where: { email },
    include: {
      organizations: {
        where: { organizationId },
      },
    },
  });

  if (existingUser?.organizations.length) {
    return NextResponse.json(
      { error: "User is already a member" },
      { status: 400 }
    );
  }

  // Create invite
  const token = nanoid(32);
  const invite = await prisma.organizationInvite.create({
    data: {
      email,
      organizationId,
      role,
      token,
      invitedById: session.user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
    include: {
      organization: { select: { name: true } },
    },
  });

  // Send invite email
  await sendInviteEmail({
    to: email,
    organizationName: invite.organization.name,
    inviterName: session.user.name || session.user.email,
    inviteUrl: \`\${config.app.url}/invite/\${token}\`,
    role,
  });

  return NextResponse.json({ success: true, invite });
}`} />
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">Accept Invitation</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Handle invite acceptance:</p>
            <CodeBlock language="typescript" code={`// src/app/api/v1/organizations/invite/accept/route.ts
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { token } = await request.json();

  const invite = await prisma.organizationInvite.findUnique({
    where: { token },
    include: { organization: true },
  });

  if (!invite) {
    return NextResponse.json({ error: "Invalid invite" }, { status: 404 });
  }

  if (invite.email !== session.user.email) {
    return NextResponse.json(
      { error: "This invite was sent to a different email" },
      { status: 403 }
    );
  }

  if (invite.expiresAt < new Date()) {
    return NextResponse.json({ error: "Invite expired" }, { status: 400 });
  }

  // Add user to organization
  await prisma.$transaction([
    prisma.organizationMember.create({
      data: {
        userId: session.user.id,
        organizationId: invite.organizationId,
        role: invite.role,
      },
    }),
    prisma.organizationInvite.delete({
      where: { id: invite.id },
    }),
  ]);

  return NextResponse.json({
    success: true,
    organization: invite.organization,
  });
}`} />
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">Permission Check Middleware</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Reusable permission checking:</p>
            <CodeBlock language="typescript" code={`// src/lib/permissions.ts
import { prisma } from "@/lib/db";

type Permission =
  | "view"
  | "create"
  | "invite"
  | "remove_members"
  | "edit_settings"
  | "manage_billing"
  | "delete_org";

const rolePermissions: Record<string, Permission[]> = {
  OWNER: ["view", "create", "invite", "remove_members", "edit_settings", "manage_billing", "delete_org"],
  ADMIN: ["view", "create", "invite", "remove_members", "edit_settings", "manage_billing"],
  MEMBER: ["view", "create"],
  GUEST: ["view"],
};

export async function checkPermission(
  userId: string,
  organizationId: string,
  permission: Permission
): Promise<boolean> {
  const membership = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: { userId, organizationId },
    },
  });

  if (!membership) return false;

  return rolePermissions[membership.role]?.includes(permission) ?? false;
}

// Usage in API routes
export async function DELETE(request: Request) {
  const session = await auth();
  const { organizationId } = await request.json();

  const hasPermission = await checkPermission(
    session.user.id,
    organizationId,
    "delete_org"
  );

  if (!hasPermission) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Proceed with deletion...
}`} />
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">Organization Context Hook</h3>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">Client-side organization context:</p>
            <CodeBlock language="tsx" code={`// src/hooks/useOrganization.ts
"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface OrgContext {
  organization: Organization | null;
  role: OrgRole | null;
  setOrganization: (org: Organization) => void;
  isLoading: boolean;
}

const OrganizationContext = createContext<OrgContext | null>(null);

export function OrganizationProvider({ children }) {
  const [organization, setOrganization] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load saved org from localStorage or fetch default
    const savedOrgId = localStorage.getItem("currentOrgId");
    if (savedOrgId) {
      fetchOrganization(savedOrgId);
    } else {
      fetchDefaultOrganization();
    }
  }, []);

  const fetchOrganization = async (id: string) => {
    const response = await fetch(\`/api/v1/organizations/\${id}\`);
    const data = await response.json();
    setOrganization(data.organization);
    setRole(data.role);
    setIsLoading(false);
  };

  return (
    <OrganizationContext.Provider
      value={{ organization, role, setOrganization, isLoading }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error("useOrganization must be used within OrganizationProvider");
  }
  return context;
}

// Usage
function TeamPage() {
  const { organization, role } = useOrganization();

  return (
    <div>
      <h1>{organization?.name}</h1>
      {role === "OWNER" && <DeleteOrgButton />}
    </div>
  );
}`} />
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Common Use Cases</h2>

        <div className="grid gap-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Team Workspaces</h3>
              <p className="text-muted-foreground">
                Each organization has its own workspace with projects, files, or data. Members see only their organization's content.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Per-Seat Billing</h3>
              <p className="text-muted-foreground">
                Charge based on organization member count. Track seats in Stripe metadata and update on member changes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Admin Dashboard</h3>
              <p className="text-muted-foreground">
                Give admins a dashboard to manage members, view activity, and configure organization settings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">SSO/SAML Integration</h3>
              <p className="text-muted-foreground">
                Enterprise organizations can configure their own identity provider. Members auto-join on first SSO login.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="list-disc pl-6 space-y-2">
              <li>Always check permissions before any organization action</li>
              <li>Use database transactions for multi-step operations</li>
              <li>Scope all queries by <code className="bg-muted px-1 rounded">organizationId</code></li>
              <li>Send email notifications for important events (invite, role change)</li>
              <li>Allow users to belong to multiple organizations</li>
              <li>Implement organization switching in the UI</li>
              <li>Log audit trail for compliance (member changes, permission changes)</li>
              <li>Handle organization deletion carefully (soft delete recommended)</li>
              <li>Prevent owners from removing themselves without transferring ownership</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
