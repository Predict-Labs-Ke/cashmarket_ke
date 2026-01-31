import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { calculatePrices } from "@/lib/lmsr";
import type { Market } from "@/lib/types";

/**
 * GET /api/markets
 * Fetch list of markets with details
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = `
      SELECT m.*, 
             COUNT(DISTINCT t.user_id) as participant_count,
             COUNT(t.id) as trade_count,
             SUM(t.cost) as total_volume
      FROM markets m
      LEFT JOIN trades t ON m.id = t.market_id
    `;

    const conditions: string[] = [];
    const params: any[] = [];

    if (status) {
      conditions.push('m.status = ?');
      params.push(status);
    }

    if (category) {
      conditions.push('m.category = ?');
      params.push(category);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += `
      GROUP BY m.id
      ORDER BY m.created_at DESC
      LIMIT ? OFFSET ?
    `;

    params.push(limit, offset);

    const stmt = db.prepare(query);
    const markets = stmt.all(...params) as (Market & {
      participant_count: number;
      trade_count: number;
      total_volume: number;
    })[];

    // Calculate current prices for each market
    const marketsWithPrices = markets.map(market => {
      const prices = calculatePrices(market.b, market.q_yes, market.q_no);
      
      return {
        id: market.id,
        question: market.question,
        description: market.description,
        category: market.category,
        status: market.status,
        yes_price: prices.yes_price,
        no_price: prices.no_price,
        yes_percentage: Math.round(prices.yes_price * 100),
        no_percentage: Math.round(prices.no_price * 100),
        total_volume: market.total_volume || 0,
        participant_count: market.participant_count || 0,
        trade_count: market.trade_count || 0,
        resolution_source: market.resolution_source,
        resolution_time: market.resolution_time,
        resolved_outcome: market.resolved_outcome,
        created_at: market.created_at,
      };
    });

    return NextResponse.json({
      markets: marketsWithPrices,
      total: marketsWithPrices.length,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching markets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch markets' },
      { status: 500 }
    );
  }
}
