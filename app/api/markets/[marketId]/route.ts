import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getSession } from "@/lib/middleware/auth";
import { calculatePrices } from "@/lib/lmsr";
import type { Market, UserPosition, MarketDetail } from "@/lib/types";

/**
 * GET /api/markets/[marketId]
 * Fetch detailed market data
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ marketId: string }> }
) {
  try {
    const { marketId: marketIdStr } = await params;
    const marketId = parseInt(marketIdStr);

    if (isNaN(marketId)) {
      return NextResponse.json(
        { error: 'Invalid market ID' },
        { status: 400 }
      );
    }

    // Get market details
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

    // Calculate current prices
    const prices = calculatePrices(market.b, market.q_yes, market.q_no);

    // Get market statistics
    const statsStmt = db.prepare(`
      SELECT 
        COUNT(DISTINCT user_id) as participant_count,
        COUNT(id) as trade_count,
        SUM(cost) as total_volume,
        SUM(CASE WHEN outcome = 'YES' THEN shares ELSE 0 END) as total_yes_shares,
        SUM(CASE WHEN outcome = 'NO' THEN shares ELSE 0 END) as total_no_shares
      FROM trades
      WHERE market_id = ?
    `);
    const stats = statsStmt.get(marketId) as {
      participant_count: number;
      trade_count: number;
      total_volume: number;
      total_yes_shares: number;
      total_no_shares: number;
    };

    // Get recent trades (last 10)
    const recentTradesStmt = db.prepare(`
      SELECT t.*, u.name as user_name
      FROM trades t
      JOIN users u ON t.user_id = u.id
      WHERE t.market_id = ?
      ORDER BY t.created_at DESC
      LIMIT 10
    `);
    const recentTrades = recentTradesStmt.all(marketId);

    // Check if user is logged in and get their position
    const session = await getSession();
    let userPosition: UserPosition | undefined;

    if (session?.user?.id) {
      const userId = parseInt(session.user.id);
      const positionStmt = db.prepare(`
        SELECT * FROM user_positions
        WHERE user_id = ? AND market_id = ?
      `);
      userPosition = positionStmt.get(userId, marketId) as UserPosition | undefined;
    }

    const marketDetail: MarketDetail = {
      ...market,
      yes_price: prices.yes_price,
      no_price: prices.no_price,
      total_volume: stats.total_volume || 0,
      user_position: userPosition,
    };

    return NextResponse.json({
      market: marketDetail,
      stats: {
        participant_count: stats.participant_count || 0,
        trade_count: stats.trade_count || 0,
        total_volume: stats.total_volume || 0,
        total_yes_shares: stats.total_yes_shares || 0,
        total_no_shares: stats.total_no_shares || 0,
      },
      recent_trades: recentTrades,
      user_position: userPosition,
    });
  } catch (error) {
    console.error('Error fetching market details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch market details' },
      { status: 500 }
    );
  }
}
