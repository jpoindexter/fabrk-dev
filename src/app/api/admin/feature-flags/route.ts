/**
 * Admin Feature Flags API
 * CRUD operations for feature flags
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import {
  getAllDbFlags,
  createDbFlag,
  updateDbFlag,
  deleteDbFlag,
} from '@/lib/feature-flags/db-flags';
import { logFeatureFlagChange } from '@/lib/audit/logger';

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const flags = await getAllDbFlags();
    return NextResponse.json({ flags });
  } catch (error: unknown) {
    console.error('Failed to fetch feature flags:', error);
    return NextResponse.json({ error: 'Failed to fetch flags' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { name, description, enabled, rolloutPercentage } = await req.json();

    if (!name) {
      return NextResponse.json({ error: 'Flag name is required' }, { status: 400 });
    }

    const flag = await createDbFlag({
      name,
      description,
      enabled,
      rolloutPercentage,
    });

    // Log the action
    await logFeatureFlagChange(session.user.id, flag.id, 'created', {
      flagName: flag.name,
    });

    return NextResponse.json({ flag });
  } catch (error: unknown) {
    console.error('Failed to create feature flag:', error);
    return NextResponse.json({ error: 'Failed to create flag' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id, description, enabled, rolloutPercentage } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Flag ID is required' }, { status: 400 });
    }

    const flag = await updateDbFlag(id, {
      description,
      enabled,
      rolloutPercentage,
    });

    // Log the action
    await logFeatureFlagChange(session.user.id, flag.id, 'updated', {
      flagName: flag.name,
      changes: { enabled, rolloutPercentage },
    });

    return NextResponse.json({ flag });
  } catch (error: unknown) {
    console.error('Failed to update feature flag:', error);
    return NextResponse.json({ error: 'Failed to update flag' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Flag ID is required' }, { status: 400 });
    }

    await deleteDbFlag(id);

    // Log the action
    await logFeatureFlagChange(session.user.id, id, 'deleted', {});

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Failed to delete feature flag:', error);
    return NextResponse.json({ error: 'Failed to delete flag' }, { status: 500 });
  }
}
