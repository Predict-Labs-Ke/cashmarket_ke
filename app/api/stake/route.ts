import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import {
  calculateSharesForBudget,
  calculateBuyCost,
  calculatePrices,
  calculatePayout,
} from "@/lib/lmsr";
import type { Market, StakeCalculationRequest, FeeConfig } from "@/lib/types";

/**
 * POST /api/stake
 * Calculate cost and potential payout for a given stake
 */
export async function POST(request: NextRequest) {
  try {
    const body: StakeCalculationRequest = await request.json();
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
        { error: `Market is ${market.status}, cannot calculate stake` },
        { status: 400 }
      );
    }

    // Get fee configuration
    const feeStmt = db.prepare(`
      SELECT * FROM fee_config WHERE id = 1
    `);
    const feeConfig = feeStmt.get() as FeeConfig;

    // Check for market-specific fee override
    const marketFeeStmt = db.prepare(`
      SELECT fee_percentage FROM market_fees WHERE market_id = ?
    `);
    const marketFee = marketFeeStmt.get(market_id) as { fee_percentage: number } | undefined;

    const feePercentage = marketFee?.fee_percentage || feeConfig.global_fee_percentage;
    const feeMultiplier = feePercentage / 100;

    // Calculate shares that can be bought with the stake (after fee)
    const stakeAfterFee = stake * (1 - feeMultiplier);
    const shares = calculateSharesForBudget(
      market.b,
      market.q_yes,
      market.q_no,
      outcome,
      stakeAfterFee
    );

    // Calculate actual cost (should be close to stakeAfterFee)
    const actualCost = calculateBuyCost(
      market.b,
      market.q_yes,
      market.q_no,
      outcome,
      shares
    );

    // Calculate new market state
    const q_yes_after = outcome === 'YES' ? market.q_yes + shares : market.q_yes;
    const q_no_after = outcome === 'NO' ? market.q_no + shares : market.q_no;
    const newPrices = calculatePrices(market.b, q_yes_after, q_no_after);

    // Calculate potential payout (if outcome wins)
    const potentialPayout = calculatePayout(shares);

    // Calculate expected return
    const currentPrice = outcome === 'YES' ? newPrices.yes_price : newPrices.no_price;
    const expectedReturn = potentialPayout - stake;
    const roi = (expectedReturn / stake) * 100;

    return NextResponse.json({
      market_id,
      outcome,
      stake,
      fee: stake * feeMultiplier,
      fee_percentage: feePercentage,
      cost: actualCost,
      shares,
      new_price_yes: newPrices.yes_price,
      new_price_no: newPrices.no_price,
      current_price: currentPrice,
      potential_payout: potentialPayout,
      expected_return: expectedReturn,
      roi_percentage: roi,
      break_even_price: stake / shares,
    });
  } catch (error) {
    console.error('Error calculating stake:', error);
    return NextResponse.json(
      { error: 'Failed to calculate stake' },
      { status: 500 }
    );
  }
}
