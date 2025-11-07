/**
 * Team/Organization Management
 * Multi-tenancy support for B2B SaaS
 *
 * Features:
 * - Organization creation and management
 * - Team member invitations
 * - Role-based access control (RBAC)
 * - Organization billing
 * - Member management
 */

import { prisma } from "@/lib/prisma";
import * as crypto from "crypto";
import { enqueueJob } from "@/lib/jobs/queue";

export type OrgRole = "OWNER" | "ADMIN" | "MEMBER" | "GUEST";

/**
 * Create a new organization
 */
export async function createOrganization(data: {
  name: string;
  slug: string;
  description?: string;
  ownerId: string;
}): Promise<{
  id: string;
  name: string;
  slug: string;
}> {
  // Check if slug is available
  const existing = await prisma.organization.findUnique({
    where: { slug: data.slug },
  });

  if (existing) {
    throw new Error("Organization slug already taken");
  }

  // Create organization
  const org = await prisma.organization.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      plan: "FREE",
      members: {
        create: {
          userId: data.ownerId,
          role: "OWNER",
        },
      },
    },
  });

  return {
    id: org.id,
    name: org.name,
    slug: org.slug,
  };
}

/**
 * Get organization by slug
 */
export async function getOrganizationBySlug(slug: string) {
  return await prisma.organization.findUnique({
    where: { slug },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
    },
  });
}

/**
 * Get user's organizations
 */
export async function getUserOrganizations(userId: string) {
  const memberships = await prisma.organizationMember.findMany({
    where: { userId },
    include: {
      organization: {
        select: {
          id: true,
          name: true,
          slug: true,
          logo: true,
          plan: true,
        },
      },
    },
    orderBy: { joinedAt: "desc" },
  });

  return memberships.map((m) => ({
    ...m.organization,
    role: m.role,
    joinedAt: m.joinedAt,
  }));
}

/**
 * Check if user is member of organization
 */
export async function isOrganizationMember(
  userId: string,
  organizationId: string
): Promise<boolean> {
  const member = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId,
        userId,
      },
    },
  });

  return !!member;
}

/**
 * Check if user has role in organization
 */
export async function hasOrganizationRole(
  userId: string,
  organizationId: string,
  roles: OrgRole | OrgRole[]
): Promise<boolean> {
  const member = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId,
        userId,
      },
    },
  });

  if (!member) return false;

  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  return allowedRoles.includes(member.role as OrgRole);
}

/**
 * Invite user to organization
 */
export async function inviteToOrganization(data: {
  organizationId: string;
  email: string;
  role: OrgRole;
  invitedBy: string;
}): Promise<{
  id: string;
  token: string;
}> {
  // Check if already a member
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    const isMember = await isOrganizationMember(
      existingUser.id,
      data.organizationId
    );

    if (isMember) {
      throw new Error("User is already a member of this organization");
    }
  }

  // Check for existing pending invite
  const existingInvite = await prisma.organizationInvite.findFirst({
    where: {
      organizationId: data.organizationId,
      email: data.email,
      acceptedAt: null,
      expiresAt: {
        gt: new Date(),
      },
    },
  });

  if (existingInvite) {
    return {
      id: existingInvite.id,
      token: existingInvite.token,
    };
  }

  // Generate invite token
  const token = crypto.randomBytes(32).toString("hex");

  // Create invite
  const invite = await prisma.organizationInvite.create({
    data: {
      organizationId: data.organizationId,
      email: data.email,
      role: data.role,
      invitedBy: data.invitedBy,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
  });

  // Send invite email (via job queue)
  const org = await prisma.organization.findUnique({
    where: { id: data.organizationId },
  });

  const inviter = await prisma.user.findUnique({
    where: { id: data.invitedBy },
  });

  if (org && inviter) {
    await enqueueJob({
      type: "email.send",
      payload: {
        to: data.email,
        subject: `You've been invited to join ${org.name}`,
        html: `
          <h1>You've been invited!</h1>
          <p>${inviter.name || inviter.email} has invited you to join ${org.name}.</p>
          <p>Click the link below to accept the invitation:</p>
          <a href="${process.env.NEXTAUTH_URL}/invite/${token}">Accept Invitation</a>
          <p>This invitation expires in 7 days.</p>
        `,
      },
    });
  }

  return {
    id: invite.id,
    token: invite.token,
  };
}

/**
 * Accept organization invite
 */
export async function acceptInvite(
  token: string,
  userId: string
): Promise<{
  organizationId: string;
  role: OrgRole;
}> {
  // Find invite
  const invite = await prisma.organizationInvite.findUnique({
    where: { token },
    include: {
      organization: true,
    },
  });

  if (!invite) {
    throw new Error("Invite not found");
  }

  if (invite.acceptedAt) {
    throw new Error("Invite already accepted");
  }

  if (invite.expiresAt < new Date()) {
    throw new Error("Invite expired");
  }

  // Verify email matches user
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.email !== invite.email) {
    throw new Error("Invite email does not match user");
  }

  // Add user to organization
  await prisma.organizationMember.create({
    data: {
      organizationId: invite.organizationId,
      userId,
      role: invite.role,
    },
  });

  // Mark invite as accepted
  await prisma.organizationInvite.update({
    where: { id: invite.id },
    data: {
      acceptedAt: new Date(),
    },
  });

  return {
    organizationId: invite.organizationId,
    role: invite.role as OrgRole,
  };
}

/**
 * Remove member from organization
 */
export async function removeMember(
  organizationId: string,
  userId: string,
  removedBy: string
): Promise<void> {
  // Can't remove owner
  const member = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId,
        userId,
      },
    },
  });

  if (member?.role === "OWNER") {
    throw new Error("Cannot remove organization owner");
  }

  // Check if remover has permission
  const hasPermission = await hasOrganizationRole(removedBy, organizationId, [
    "OWNER",
    "ADMIN",
  ]);

  if (!hasPermission) {
    throw new Error("Insufficient permissions");
  }

  // Remove member
  await prisma.organizationMember.delete({
    where: {
      organizationId_userId: {
        organizationId,
        userId,
      },
    },
  });
}

/**
 * Update member role
 */
export async function updateMemberRole(
  organizationId: string,
  userId: string,
  newRole: OrgRole,
  updatedBy: string
): Promise<void> {
  // Can't change owner role
  const member = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId,
        userId,
      },
    },
  });

  if (member?.role === "OWNER") {
    throw new Error("Cannot change owner role");
  }

  // Check if updater has permission
  const hasPermission = await hasOrganizationRole(updatedBy, organizationId, [
    "OWNER",
    "ADMIN",
  ]);

  if (!hasPermission) {
    throw new Error("Insufficient permissions");
  }

  // Update role
  await prisma.organizationMember.update({
    where: {
      organizationId_userId: {
        organizationId,
        userId,
      },
    },
    data: {
      role: newRole,
    },
  });
}

/**
 * Transfer organization ownership
 */
export async function transferOwnership(
  organizationId: string,
  newOwnerId: string,
  currentOwnerId: string
): Promise<void> {
  // Verify current owner
  const currentOwner = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId,
        userId: currentOwnerId,
      },
    },
  });

  if (currentOwner?.role !== "OWNER") {
    throw new Error("Only owner can transfer ownership");
  }

  // Verify new owner is a member
  const newOwner = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId,
        userId: newOwnerId,
      },
    },
  });

  if (!newOwner) {
    throw new Error("New owner must be a member of the organization");
  }

  // Update both roles in a transaction
  await prisma.$transaction([
    // Demote current owner to admin
    prisma.organizationMember.update({
      where: {
        organizationId_userId: {
          organizationId,
          userId: currentOwnerId,
        },
      },
      data: { role: "ADMIN" },
    }),
    // Promote new owner
    prisma.organizationMember.update({
      where: {
        organizationId_userId: {
          organizationId,
          userId: newOwnerId,
        },
      },
      data: { role: "OWNER" },
    }),
  ]);
}

/**
 * Delete organization
 */
export async function deleteOrganization(
  organizationId: string,
  userId: string
): Promise<void> {
  // Verify user is owner
  const isOwner = await hasOrganizationRole(userId, organizationId, "OWNER");

  if (!isOwner) {
    throw new Error("Only owner can delete organization");
  }

  // Delete organization (cascade will delete members)
  await prisma.organization.delete({
    where: { id: organizationId },
  });
}

/**
 * Get organization settings
 */
export async function getOrganizationSettings(organizationId: string) {
  const org = await prisma.organization.findUnique({
    where: { id: organizationId },
    select: {
      settings: true,
    },
  });

  return org?.settings || {};
}

/**
 * Update organization settings
 */
export async function updateOrganizationSettings(
  organizationId: string,
  userId: string,
  settings: Record<string, any>
): Promise<void> {
  // Verify user has permission
  const hasPermission = await hasOrganizationRole(userId, organizationId, [
    "OWNER",
    "ADMIN",
  ]);

  if (!hasPermission) {
    throw new Error("Insufficient permissions");
  }

  await prisma.organization.update({
    where: { id: organizationId },
    data: { settings: settings as any },
  });
}
