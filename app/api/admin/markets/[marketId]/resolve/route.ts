import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { requireRole, logAdminAction } from "@/lib/middleware/auth";
import type { Market, UserPosition, ResolveMarketRequest } from "@/lib/types";

/**
 * POST /api/admin/markets/[marketId]/resolve
 * Resolve a market and trigger payouts (admin/oracle only)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ marketId: string }> }
) {
  try {
    // Check authentication - only admins and oracles can resolve markets
    const session = await requireRole(['admin', 'oracle'], request);
    if (session instanceof NextResponse) {
      return session;
    }

    const adminId = parseInt(session.user.id);
    const { marketId: marketIdStr } = await params;
    const marketId = parseInt(marketIdStr);

    if (isNaN(marketId)) {
      return NextResponse.json(
        { error: 'Invalid market ID' },
        { status: 400 }
      );
    }

    const body: ResolveMarketRequest = await request.json();
    const { resolved_outcome, resolution_evidence } = body;

    // Validate outcome
    if (!resolved_outcome || !['YES', 'NO', 'INVALID'].includes(resolved_outcome)) {
      return NextResponse.json(
        { error: 'resolved_outcome must be YES, NO, or INVALID' },
        { status: 400 }
      );
    }

    // Get market
    const marketStmt = db.prepare(`
      SELECT * FROM markets WHERE id = ?
    `);
    const market = marketStmt.get(marketId) as Market | undefined;

    if (!market) {
      return NextResponse.json(
        { error: 'Market not found' },
        { status: 404 }
      );
    }

    if (market.status === 'resolved') {
      return NextResponse.json(
        { error: 'Market already resolved' },
        { status: 400 }
      );
    }

    // Resolve market in a transaction
    const resolveStmt = db.transaction(() => {
      // Update market status
      const updateMarketStmt = db.prepare(`
        UPDATE markets
        SET status = 'resolved',
            resolved_outcome = ?,
            resolution_evidence = ?,
            resolved_at = datetime('now'),
            resolved_by = ?,
            updated_at = datetime('now')
        WHERE id = ?
      `);

      updateMarketStmt.run(
        resolved_outcome,
        resolution_evidence || null,
        adminId,
        marketId
      );

      // Get all user positions for this market
      const positionsStmt = db.prepare(`
        SELECT * FROM user_positions WHERE market_id = ?
      `);
      const positions = positionsStmt.all(marketId) as UserPosition[];

      let totalPayouts = 0;

      // Process payouts
      for (const position of positions) {
        let payout = 0;

        if (resolved_outcome === 'YES') {
          // YES won - pay YES shareholders
          payout = position.yes_shares;
        } else if (resolved_outcome === 'NO') {
          // NO won - pay NO shareholders
          payout = position.no_shares;
        } else if (resolved_outcome === 'INVALID') {
          // Invalid market - refund total invested
          payout = position.total_invested;
        }

        if (payout > 0) {
          // Update user balance
          const updateBalanceStmt = db.prepare(`
            UPDATE users
            SET balance = balance + ?, updated_at = datetime('now')
            WHERE id = ?
          `);

          updateBalanceStmt.run(payout, position.user_id);

          // Record payout transaction
          const txnStmt = db.prepare(`
            INSERT INTO transactions (user_id, type, amount, status, reference, completed_at)
            VALUES (?, 'payout', ?, 'completed', ?, datetime('now'))
          `);

          txnStmt.run(
            position.user_id,
            payout,
            `PAYOUT-${marketId}-${resolved_outcome}`
          );

          totalPayouts += payout;
        }
      }

      // Update liquidity pool - release locked liquidity and subtract payouts
      const updateLiquidityStmt = db.prepare(`
        UPDATE liquidity_pool
        SET locked_liquidity = locked_liquidity - ?,
            available_liquidity = available_liquidity + ? - ?,
            updated_at = datetime('now')
        WHERE id = 1
      `);

      updateLiquidityStmt.run(
        market.initial_liquidity,
        market.initial_liquidity,
        totalPayouts
      );

      return { positions: positions.length, totalPayouts };
    });

    const result = resolveStmt();

    // Log admin action
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || undefined;

    logAdminAction(
      adminId,
      'resolve_market',
      'market',
      marketId,
      {
        resolved_outcome,
        resolution_evidence,
        positions_count: result.positions,
        total_payouts: result.totalPayouts,
      },
      ipAddress
    );

    return NextResponse.json({
      success: true,
      message: 'Market resolved successfully',
      market_id: marketId,
      resolved_outcome,
      positions_processed: result.positions,
      total_payouts: result.totalPayouts,
    });
  } catch (error) {
    console.error('Error resolving market:', error);
    return NextResponse.json(
      { error: 'Failed to resolve market' },
      { status: 500 }
    );
  }
}
