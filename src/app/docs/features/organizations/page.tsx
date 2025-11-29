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
        <Link href="/docs" className="text-primary hover:underline font-mono text-xs">
          ← Back to Documentation
        </Link>
      </div>

      <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
        <span className="font-mono text-sm text-muted-foreground">[ FEATURES ] ORGANIZATIONS</span>
      </div>
      <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl mb-4">ORGANIZATIONS_AND_TEAMS</h1>
      <p className="font-mono text-sm text-muted-foreground mb-8">
        &gt; Multi-tenancy support with role-based access control (RBAC), team invitations, and organization management.
      </p>

      <section className="mb-12">
        <h2 className="font-mono text-lg font-bold text-primary mb-4">OVERVIEW</h2>
        <Card className="rounded-none">
          <CardContent className="p-6">
            <p className="font-mono text-sm text-muted-foreground mb-4">
              Fabrk includes a complete multi-tenancy system for B2B SaaS applications:
            </p>
            <div className="font-mono text-sm text-muted-foreground space-y-1">
              <div>├─ Organization creation and management</div>
              <div>├─ Role-based access control (Owner, Admin, Member, Guest)</div>
              <div>├─ Email-based team invitations</div>
              <div>├─ Organization-scoped data isolation</div>
              <div>├─ Member management and role changes</div>
              <div>└─ Organization settings and branding</div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-lg font-bold text-primary mb-4">DATABASE_SCHEMA</h2>
        <div className="space-y-4">
          <div>
            <p className="font-mono text-sm text-muted-foreground">Core models in <code className="bg-muted px-1 font-mono text-xs">prisma/schema.prisma</code>:</p>
          </div>
          <div className="[&>div]:rounded-none">
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
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-lg font-bold text-primary mb-4">ROLE_PERMISSIONS</h2>
        <Card className="rounded-none">
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-xs">
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
        <h2 className="font-mono text-lg font-bold text-primary mb-4">CODE_EXAMPLES</h2>

        <h3 className="font-mono text-base font-semibold text-foreground mb-3">CREATE_ORGANIZATION</h3>
        <div className="space-y-4 mb-6">
          <div>
            <p className="font-mono text-sm text-muted-foreground">API endpoint to create a new organization:</p>
          </div>
          <div className="[&>div]:rounded-none">
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
          </div>
        </div>

        <h3 className="font-mono text-base font-semibold text-foreground mb-3">INVITE_MEMBERS</h3>
        <div className="space-y-4 mb-6">
          <div>
            <p className="font-mono text-sm text-muted-foreground">Send team invitations:</p>
          </div>
          <div className="[&>div]:rounded-none">
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
          </div>
        </div>

        <h3 className="font-mono text-base font-semibold text-foreground mb-3">ACCEPT_INVITATION</h3>
        <div className="space-y-4 mb-6">
          <div>
            <p className="font-mono text-sm text-muted-foreground">Handle invite acceptance:</p>
          </div>
          <div className="[&>div]:rounded-none">
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
          </div>
        </div>

        <h3 className="font-mono text-base font-semibold text-foreground mb-3">PERMISSION_CHECK_MIDDLEWARE</h3>
        <div className="space-y-4 mb-6">
          <div>
            <p className="font-mono text-sm text-muted-foreground">Reusable permission checking:</p>
          </div>
          <div className="[&>div]:rounded-none">
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
          </div>
        </div>

        <h3 className="font-mono text-base font-semibold text-foreground mb-3">ORGANIZATION_CONTEXT_HOOK</h3>
        <div className="space-y-4">
          <div>
            <p className="font-mono text-sm text-muted-foreground">Client-side organization context:</p>
          </div>
          <div className="[&>div]:rounded-none">
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
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-lg font-bold text-primary mb-4">COMMON_USE_CASES</h2>

        <div className="grid gap-4">
          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono text-base font-semibold text-foreground mb-2">TEAM_WORKSPACES</h3>
              <p className="font-mono text-sm text-muted-foreground">
                Each organization has its own workspace with projects, files, or data. Members see only their organization's content.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono text-base font-semibold text-foreground mb-2">PER_SEAT_BILLING</h3>
              <p className="font-mono text-sm text-muted-foreground">
                Charge based on organization member count. Track seats in Stripe metadata and update on member changes.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono text-base font-semibold text-foreground mb-2">ADMIN_DASHBOARD</h3>
              <p className="font-mono text-sm text-muted-foreground">
                Give admins a dashboard to manage members, view activity, and configure organization settings.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono text-base font-semibold text-foreground mb-2">SSO_SAML_INTEGRATION</h3>
              <p className="font-mono text-sm text-muted-foreground">
                Enterprise organizations can configure their own identity provider. Members auto-join on first SSO login.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="font-mono text-lg font-bold text-primary mb-4">BEST_PRACTICES</h2>
        <Card className="rounded-none">
          <CardContent className="p-6">
            <div className="font-mono text-sm text-muted-foreground space-y-1">
              <div>├─ Always check permissions before any organization action</div>
              <div>├─ Use database transactions for multi-step operations</div>
              <div>├─ Scope all queries by <code className="bg-muted px-1 font-mono text-xs">organizationId</code></div>
              <div>├─ Send email notifications for important events (invite, role change)</div>
              <div>├─ Allow users to belong to multiple organizations</div>
              <div>├─ Implement organization switching in the UI</div>
              <div>├─ Log audit trail for compliance (member changes, permission changes)</div>
              <div>├─ Handle organization deletion carefully (soft delete recommended)</div>
              <div>└─ Prevent owners from removing themselves without transferring ownership</div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
