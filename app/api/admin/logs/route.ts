import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { requireAdmin } from "@/lib/middleware/auth";
import type { AuditLog } from "@/lib/types";

/**
 * GET /api/admin/logs
 * Query admin audit trail (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    const session = await requireAdmin(request);
    if (session instanceof NextResponse) {
      return session;
    }

    const { searchParams } = new URL(request.url);
    const actionType = searchParams.get('action_type');
    const adminId = searchParams.get('admin_id');
    const resourceType = searchParams.get('resource_type');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = `
      SELECT l.*, a.name as admin_name, a.email as admin_email
      FROM audit_logs l
      JOIN admin_users a ON l.admin_id = a.id
      WHERE 1=1
    `;

    const params: any[] = [];

    if (actionType) {
      query += ' AND l.action_type = ?';
      params.push(actionType);
    }

    if (adminId) {
      query += ' AND l.admin_id = ?';
      params.push(parseInt(adminId));
    }

    if (resourceType) {
      query += ' AND l.resource_type = ?';
      params.push(resourceType);
    }

    if (startDate) {
      query += ' AND l.created_at >= ?';
      params.push(startDate);
    }

    if (endDate) {
      query += ' AND l.created_at <= ?';
      params.push(endDate);
    }

    query += ' ORDER BY l.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const stmt = db.prepare(query);
    const logs = stmt.all(...params) as (AuditLog & {
      admin_name: string;
      admin_email: string;
    })[];

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM audit_logs WHERE 1=1';
    const countParams: any[] = [];

    if (actionType) {
      countQuery += ' AND action_type = ?';
      countParams.push(actionType);
    }

    if (adminId) {
      countQuery += ' AND admin_id = ?';
      countParams.push(parseInt(adminId));
    }

    if (resourceType) {
      countQuery += ' AND resource_type = ?';
      countParams.push(resourceType);
    }

    if (startDate) {
      countQuery += ' AND created_at >= ?';
      countParams.push(startDate);
    }

    if (endDate) {
      countQuery += ' AND created_at <= ?';
      countParams.push(endDate);
    }

    const countStmt = db.prepare(countQuery);
    const { total } = countStmt.get(...countParams) as { total: number };

    return NextResponse.json({
      logs,
      total,
      limit,
      offset,
      filters: {
        action_type: actionType,
        admin_id: adminId,
        resource_type: resourceType,
        start_date: startDate,
        end_date: endDate,
      },
    });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audit logs' },
      { status: 500 }
    );
  }
}
