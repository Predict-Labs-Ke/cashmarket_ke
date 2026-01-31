import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { requireAdmin, logAdminAction } from "@/lib/middleware/auth";
import type { UpdateFeesRequest, FeeConfig } from "@/lib/types";

/**
 * PATCH /api/admin/fees
 * Update global or per-market fees (admin only)
 */
export async function PATCH(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (session instanceof NextResponse) {
      return session;
    }

    const adminId = parseInt(session.user.id);
    const body: UpdateFeesRequest = await request.json();
    const { market_id, fee_percentage } = body;

    if (typeof fee_percentage !== 'number' || fee_percentage < 0 || fee_percentage > 100) {
      return NextResponse.json(
        { error: 'fee_percentage must be a number between 0 and 100' },
        { status: 400 }
      );
    }

    if (market_id) {
      // Update market-specific fee
      const stmt = db.prepare(`
        INSERT INTO market_fees (market_id, fee_percentage)
        VALUES (?, ?)
        ON CONFLICT(market_id) DO UPDATE SET
          fee_percentage = excluded.fee_percentage,
          updated_at = datetime('now')
      `);

      stmt.run(market_id, fee_percentage);

      // Log action
      const ipAddress = request.headers.get('x-forwarded-for') || 
                       request.headers.get('x-real-ip') || undefined;

      logAdminAction(
        adminId,
        'update_market_fee',
        'market',
        market_id,
        { fee_percentage },
        ipAddress
      );

      return NextResponse.json({
        success: true,
        message: `Market ${market_id} fee updated to ${fee_percentage}%`,
        market_id,
        fee_percentage,
      });
    } else {
      // Update global fee
      const stmt = db.prepare(`
        UPDATE fee_config
        SET global_fee_percentage = ?, updated_at = datetime('now')
        WHERE id = 1
      `);

      stmt.run(fee_percentage);

      // Get updated config
      const getStmt = db.prepare(`
        SELECT * FROM fee_config WHERE id = 1
      `);
      const config = getStmt.get() as FeeConfig;

      // Log action
      const ipAddress = request.headers.get('x-forwarded-for') || 
                       request.headers.get('x-real-ip') || undefined;

      logAdminAction(
        adminId,
        'update_global_fee',
        'fee_config',
        1,
        { fee_percentage },
        ipAddress
      );

      return NextResponse.json({
        success: true,
        message: `Global fee updated to ${fee_percentage}%`,
        config,
      });
    }
  } catch (error) {
    console.error('Error updating fees:', error);
    return NextResponse.json(
      { error: 'Failed to update fees' },
      { status: 500 }
    );
  }
}
