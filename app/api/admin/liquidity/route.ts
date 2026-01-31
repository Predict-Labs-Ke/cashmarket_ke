import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { requireAdmin, logAdminAction } from "@/lib/middleware/auth";
import type { LiquidityPool, UpdateLiquidityRequest } from "@/lib/types";

/**
 * GET /api/admin/liquidity
 * Get liquidity pool data (admin only)
 */
export async function GET() {
  try {
    const session = await requireAdmin();
    if (session instanceof NextResponse) {
      return session;
    }

    const stmt = db.prepare(`
      SELECT * FROM liquidity_pool WHERE id = 1
    `);

    const pool = stmt.get() as LiquidityPool;

    return NextResponse.json({
      pool,
    });
  } catch (error) {
    console.error('Error fetching liquidity pool:', error);
    return NextResponse.json(
      { error: 'Failed to fetch liquidity pool' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/liquidity
 * Update liquidity pool (deposit/withdraw) (admin only)
 */
export async function PATCH(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (session instanceof NextResponse) {
      return session;
    }

    const adminId = parseInt(session.user.id);
    const body: UpdateLiquidityRequest = await request.json();
    const { action, amount } = body;

    if (!action || !amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Action (deposit/withdraw) and amount (> 0) are required' },
        { status: 400 }
      );
    }

    if (action !== 'deposit' && action !== 'withdraw') {
      return NextResponse.json(
        { error: 'Action must be deposit or withdraw' },
        { status: 400 }
      );
    }

    // Get current pool state
    const getPoolStmt = db.prepare(`
      SELECT * FROM liquidity_pool WHERE id = 1
    `);
    const pool = getPoolStmt.get() as LiquidityPool;

    if (action === 'withdraw' && pool.available_liquidity < amount) {
      return NextResponse.json(
        {
          error: `Insufficient available liquidity. Available: KES ${pool.available_liquidity}, Requested: KES ${amount}`,
        },
        { status: 400 }
      );
    }

    // Update pool
    const updateStmt = db.prepare(`
      UPDATE liquidity_pool
      SET total_liquidity = total_liquidity + ?,
          available_liquidity = available_liquidity + ?,
          updated_at = datetime('now')
      WHERE id = 1
    `);

    const change = action === 'deposit' ? amount : -amount;
    updateStmt.run(change, change);

    // Get updated pool
    const updatedPool = getPoolStmt.get() as LiquidityPool;

    // Log admin action
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || undefined;

    logAdminAction(
      adminId,
      `liquidity_${action}`,
      'liquidity_pool',
      1,
      { action, amount },
      ipAddress
    );

    return NextResponse.json({
      success: true,
      message: `Successfully ${action}ed KES ${amount}`,
      pool: updatedPool,
    });
  } catch (error) {
    console.error('Error updating liquidity pool:', error);
    return NextResponse.json(
      { error: 'Failed to update liquidity pool' },
      { status: 500 }
    );
  }
}
