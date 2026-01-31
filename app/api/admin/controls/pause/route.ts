import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { requireAdmin, logAdminAction } from "@/lib/middleware/auth";
import type { PauseTradingRequest } from "@/lib/types";

/**
 * POST /api/admin/controls/pause
 * Pause/unpause trading platform-wide or for specific market (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const session = await requireAdmin(request);
    if (session instanceof NextResponse) {
      return session;
    }

    const adminId = parseInt(session.user.id);
    const body: PauseTradingRequest = await request.json();
    const { paused, reason, market_id } = body;

    if (typeof paused !== 'boolean') {
      return NextResponse.json(
        { error: 'paused (boolean) is required' },
        { status: 400 }
      );
    }

    if (market_id) {
      // Pause/unpause specific market
      const stmt = db.prepare(`
        UPDATE markets
        SET status = ?, updated_at = datetime('now')
        WHERE id = ?
      `);

      const newStatus = paused ? 'paused' : 'active';
      stmt.run(newStatus, market_id);

      // Log action
      const ipAddress = request.headers.get('x-forwarded-for') || 
                       request.headers.get('x-real-ip') || undefined;

      logAdminAction(
        adminId,
        paused ? 'pause_market' : 'unpause_market',
        'market',
        market_id,
        { reason },
        ipAddress
      );

      return NextResponse.json({
        success: true,
        message: `Market ${market_id} ${paused ? 'paused' : 'unpaused'} successfully`,
        market_id,
        status: newStatus,
      });
    } else {
      // Pause/unpause platform-wide
      const stmt = db.prepare(`
        UPDATE platform_controls
        SET trading_paused = ?,
            paused_reason = ?,
            paused_by = ?,
            paused_at = ?,
            updated_at = datetime('now')
        WHERE id = 1
      `);

      stmt.run(
        paused ? 1 : 0,
        paused ? reason || null : null,
        paused ? adminId : null,
        paused ? new Date().toISOString() : null
      );

      // Log action
      const ipAddress = request.headers.get('x-forwarded-for') || 
                       request.headers.get('x-real-ip') || undefined;

      logAdminAction(
        adminId,
        paused ? 'pause_platform' : 'unpause_platform',
        'platform_controls',
        1,
        { reason },
        ipAddress
      );

      return NextResponse.json({
        success: true,
        message: `Platform trading ${paused ? 'paused' : 'resumed'} successfully`,
        paused,
        reason: reason || null,
      });
    }
  } catch (error) {
    console.error('Error updating trading controls:', error);
    return NextResponse.json(
      { error: 'Failed to update trading controls' },
      { status: 500 }
    );
  }
}
