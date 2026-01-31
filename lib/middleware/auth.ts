import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import type { AdminUser } from "@/lib/types";

/**
 * Get the current session
 */
export async function getSession() {
  return await getServerSession(authOptions);
}

/**
 * Require authentication for a route
 */
export async function requireAuth(request?: NextRequest) {
  const session = await getSession();

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized - Please login" },
      { status: 401 }
    );
  }

  return session;
}

/**
 * Require admin role for a route
 */
export async function requireAdmin(request?: NextRequest) {
  const session = await getSession();

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized - Please login" },
      { status: 401 }
    );
  }

  const role = session.user.role;

  if (role !== 'admin' && role !== 'moderator' && role !== 'oracle') {
    return NextResponse.json(
      { error: "Forbidden - Admin access required" },
      { status: 403 }
    );
  }

  return session;
}

/**
 * Require specific admin role
 */
export async function requireRole(
  allowedRoles: ('admin' | 'moderator' | 'oracle')[],
  request?: NextRequest
) {
  const session = await getSession();

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized - Please login" },
      { status: 401 }
    );
  }

  const role = session.user.role;

  if (!allowedRoles.includes(role as any)) {
    return NextResponse.json(
      { error: `Forbidden - One of these roles required: ${allowedRoles.join(', ')}` },
      { status: 403 }
    );
  }

  return session;
}

/**
 * Log admin action to audit trail
 */
export function logAdminAction(
  adminId: number,
  actionType: string,
  resourceType?: string,
  resourceId?: number,
  details?: any,
  ipAddress?: string
): void {
  const stmt = db.prepare(`
    INSERT INTO audit_logs (admin_id, action_type, resource_type, resource_id, details, ip_address)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    adminId,
    actionType,
    resourceType || null,
    resourceId || null,
    details ? JSON.stringify(details) : null,
    ipAddress || null
  );
}

/**
 * Get admin user info
 */
export function getAdminUser(adminId: number): AdminUser | null {
  const stmt = db.prepare(`
    SELECT * FROM admin_users WHERE id = ?
  `);

  return stmt.get(adminId) as AdminUser | null;
}

/**
 * Check if trading is currently paused
 */
export function isTradingPaused(): boolean {
  const stmt = db.prepare(`
    SELECT trading_paused FROM platform_controls WHERE id = 1
  `);

  const result = stmt.get() as { trading_paused: number } | undefined;
  return result?.trading_paused === 1;
}

/**
 * Middleware to check if trading is paused (for trade endpoints)
 */
export function checkTradingStatus() {
  if (isTradingPaused()) {
    return NextResponse.json(
      { error: "Trading is currently paused" },
      { status: 503 }
    );
  }
  return null;
}
