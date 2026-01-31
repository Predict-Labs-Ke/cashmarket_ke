import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { requireAuth, checkTradingStatus } from "@/lib/middleware/auth";
import {
  calculateSharesForBudget,
  calculateBuyCost,
  calculatePrices,
} from "@/lib/lmsr";
import type { Market, User, TradeRequest, FeeConfig } from "@/lib/types";

/**
 * POST /api/trades
 * Execute a trade (buy shares)
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await requireAuth();
    if (session instanceof NextResponse) {
      return session; // Return error response
    }

    // Check if trading is paused
    const tradingStatus = checkTradingStatus();
    if (tradingStatus) {
      return tradingStatus;
    }

    const userId = parseInt(session.user.id);
    const body: TradeRequest = await request.json();
    const { market_id, outcome, stake } = body;

    // Validate input
    if (!market_id || !outcome || !stake || stake <= 0) {
      return NextResponse.json(
        { error: 'Invalid request. Provide market_id, outcome, and stake > 0' },
        { status: 400 }
      );
    }

    if (outcome !== 'YES' && outcome !== 'NO') {
      return NextResponse.json(
        { error: 'Outcome must be YES or NO' },
        { status: 400 }
      );
    }

    // Get user
    const userStmt = db.prepare(`
      SELECT * FROM users WHERE id = ?
    `);
    const user = userStmt.get(userId) as User | undefined;

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check user balance
    if (user.balance < stake) {
      return NextResponse.json(
        { error: `Insufficient balance. You have KES ${user.balance}, but tried to stake KES ${stake}` },
        { status: 400 }
      );
    }

    // Get market
    const marketStmt = db.prepare(`
      SELECT * FROM markets WHERE id = ?
    `);
    const market = marketStmt.get(market_id) as Market | undefined;

    if (!market) {
      return NextResponse.json(
        { error: 'Market not found' },
        { status: 404 }
      );
    }

    if (market.status !== 'active') {
      return NextResponse.json(
        { error: `Market is ${market.status}, cannot trade` },
        { status: 400 }
      );
    }

    // Get fee configuration
    const feeStmt = db.prepare(`
      SELECT * FROM fee_config WHERE id = 1
    `);
    const feeConfig = feeStmt.get() as FeeConfig;

    const marketFeeStmt = db.prepare(`
      SELECT fee_percentage FROM market_fees WHERE market_id = ?
    `);
    const marketFee = marketFeeStmt.get(market_id) as { fee_percentage: number } | undefined;

    const feePercentage = marketFee?.fee_percentage || feeConfig.global_fee_percentage;
    const fee = stake * (feePercentage / 100);
    const stakeAfterFee = stake - fee;

    // Calculate shares
    const shares = calculateSharesForBudget(
      market.b,
      market.q_yes,
      market.q_no,
      outcome,
      stakeAfterFee
    );

    if (shares <= 0) {
      return NextResponse.json(
        { error: 'Invalid stake amount, cannot calculate shares' },
        { status: 400 }
      );
    }

    // Calculate actual cost
    const cost = calculateBuyCost(
      market.b,
      market.q_yes,
      market.q_no,
      outcome,
      shares
    );

    // Calculate new market state
    const q_yes_after = outcome === 'YES' ? market.q_yes + shares : market.q_yes;
    const q_no_after = outcome === 'NO' ? market.q_no + shares : market.q_no;
    const pricesAfter = calculatePrices(market.b, q_yes_after, q_no_after);
    const pricesBefore = calculatePrices(market.b, market.q_yes, market.q_no);

    // Execute trade in a transaction
    const executeStmt = db.transaction(() => {
      // Record trade
      const tradeStmt = db.prepare(`
        INSERT INTO trades (
          user_id, market_id, outcome, shares, cost, price_at_trade,
          q_yes_before, q_no_before, q_yes_after, q_no_after
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const tradeResult = tradeStmt.run(
        userId,
        market_id,
        outcome,
        shares,
        stake,
        outcome === 'YES' ? pricesBefore.yes_price : pricesBefore.no_price,
        market.q_yes,
        market.q_no,
        q_yes_after,
        q_no_after
      );

      // Update market quantities
      const updateMarketStmt = db.prepare(`
        UPDATE markets
        SET q_yes = ?, q_no = ?, updated_at = datetime('now')
        WHERE id = ?
      `);

      updateMarketStmt.run(q_yes_after, q_no_after, market_id);

      // Update or create user position
      const positionStmt = db.prepare(`
        INSERT INTO user_positions (user_id, market_id, yes_shares, no_shares, total_invested)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(user_id, market_id) DO UPDATE SET
          yes_shares = yes_shares + excluded.yes_shares,
          no_shares = no_shares + excluded.no_shares,
          total_invested = total_invested + excluded.total_invested,
          updated_at = datetime('now')
      `);

      positionStmt.run(
        userId,
        market_id,
        outcome === 'YES' ? shares : 0,
        outcome === 'NO' ? shares : 0,
        stake
      );

      // Update user balance
      const updateBalanceStmt = db.prepare(`
        UPDATE users
        SET balance = balance - ?, updated_at = datetime('now')
        WHERE id = ?
      `);

      updateBalanceStmt.run(stake, userId);

      // Update liquidity pool fees
      const updateFeesStmt = db.prepare(`
        UPDATE liquidity_pool
        SET fees_collected = fees_collected + ?, updated_at = datetime('now')
        WHERE id = 1
      `);

      updateFeesStmt.run(fee);

      // Create transaction record
      const txnStmt = db.prepare(`
        INSERT INTO transactions (user_id, type, amount, status, reference)
        VALUES (?, 'trade', ?, 'completed', ?)
      `);

      txnStmt.run(userId, stake, `TRADE-${tradeResult.lastInsertRowid}`);

      return tradeResult.lastInsertRowid;
    });

    const tradeId = executeStmt();

    return NextResponse.json({
      success: true,
      trade_id: tradeId,
      market_id,
      outcome,
      shares,
      cost: stake,
      fee,
      actual_cost: cost,
      new_yes_price: pricesAfter.yes_price,
      new_no_price: pricesAfter.no_price,
      new_balance: user.balance - stake,
      message: `Successfully bought ${shares.toFixed(2)} ${outcome} shares for KES ${stake}`,
    });
  } catch (error) {
    console.error('Error executing trade:', error);
    return NextResponse.json(
      { error: 'Failed to execute trade' },
      { status: 500 }
    );
  }
}
