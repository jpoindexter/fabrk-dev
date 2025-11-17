import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { withCsrfProtection } from "@/lib/security/csrf";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

/**
 * DELETE /api/api-keys/[id]
 * Revoke (delete) an API key
 * Requires ADMIN/OWNER role or being the key creator
 */
export const DELETE = withCsrfProtection(async (req: NextRequest, context: RouteContext) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    // Find the API key
    const apiKey = await prisma.apiKey.findUnique({
      where: { id },
      include: {
        organization: {
          include: {
            members: {
              where: { userId: session.user.id },
            },
          },
        },
      },
    });

    if (!apiKey) {
      return NextResponse.json({ error: "API key not found" }, { status: 404 });
    }

    // Check permissions: must be ADMIN/OWNER or key creator
    const membership = apiKey.organization.members[0];
    const isAdminOrOwner = membership && (membership.role === "ADMIN" || membership.role === "OWNER");
    const isCreator = apiKey.userId === session.user.id;

    if (!isAdminOrOwner && !isCreator) {
      return NextResponse.json(
        { error: "Forbidden. Requires ADMIN/OWNER role or being the key creator." },
        { status: 403 }
      );
    }

    // Delete the API key
    await prisma.apiKey.delete({
      where: { id },
    });

    // Log audit event
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "api_key.revoked",
        resource: "api_key",
        resourceId: id,
        metadata: {
          organizationId: apiKey.organizationId,
          name: apiKey.name,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error revoking API key:", error);
    return NextResponse.json(
      { error: "Failed to revoke API key" },
      { status: 500 }
    );
  }
});

/**
 * PATCH /api/api-keys/[id]
 * Update an API key (name or permissions)
 * Requires ADMIN/OWNER role
 */
export const PATCH = withCsrfProtection(async (req: NextRequest, context: RouteContext) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await req.json();
    const { name, permissions } = body;

    // Find the API key
    const apiKey = await prisma.apiKey.findUnique({
      where: { id },
      include: {
        organization: {
          include: {
            members: {
              where: { userId: session.user.id },
            },
          },
        },
      },
    });

    if (!apiKey) {
      return NextResponse.json({ error: "API key not found" }, { status: 404 });
    }

    // Check permissions: must be ADMIN/OWNER
    const membership = apiKey.organization.members[0];
    const isAdminOrOwner = membership && (membership.role === "ADMIN" || membership.role === "OWNER");

    if (!isAdminOrOwner) {
      return NextResponse.json(
        { error: "Forbidden. Requires ADMIN/OWNER role." },
        { status: 403 }
      );
    }

    // Validate permissions if provided
    if (permissions) {
      const validPermissions = ["read", "write", "admin"];
      if (!Array.isArray(permissions) || !permissions.every((p) => validPermissions.includes(p))) {
        return NextResponse.json(
          { error: "Invalid permissions. Must be array of: read, write, admin" },
          { status: 400 }
        );
      }
    }

    // Update the API key
    const updated = await prisma.apiKey.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(permissions && { permissions }),
      },
      select: {
        id: true,
        name: true,
        keyPrefix: true,
        permissions: true,
        lastUsedAt: true,
        expiresAt: true,
        createdAt: true,
      },
    });

    // Log audit event
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "api_key.updated",
        resource: "api_key",
        resourceId: id,
        metadata: {
          organizationId: apiKey.organizationId,
          changes: { name, permissions },
        },
      },
    });

    return NextResponse.json(updated);
  } catch (error: unknown) {
    console.error("Error updating API key:", error);
    return NextResponse.json(
      { error: "Failed to update API key" },
      { status: 500 }
    );
  }
});
