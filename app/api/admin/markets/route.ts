import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { requireAdmin, logAdminAction } from "@/lib/middleware/auth";
import { DEFAULT_B, initializeMarketQuantities } from "@/lib/lmsr";
import type { CreateMarketRequest } from "@/lib/types";

/**
 * POST /api/admin/markets
 * Create a new market (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const session = await requireAdmin();
    if (session instanceof NextResponse) {
      return session; // Return error response
    }

    const adminId = parseInt(session.user.id);
    const body: CreateMarketRequest = await request.json();
    const {
      question,
      description,
      category,
      b,
      initial_liquidity,
      resolution_source,
      resolution_time,
    } = body;

    // Validate input
    if (!question || !initial_liquidity || initial_liquidity <= 0) {
      return NextResponse.json(
        { error: 'Question and initial_liquidity (> 0) are required' },
        { status: 400 }
      );
    }

    // Use default b if not provided, or validate custom b
    const liquidityParam = b || DEFAULT_B;
    if (liquidityParam <= 0) {
      return NextResponse.json(
        { error: 'Liquidity parameter b must be positive' },
        { status: 400 }
      );
    }

    // Initialize market with neutral 50/50 pricing
    const { q_yes, q_no } = initializeMarketQuantities();

    // Create market
    const stmt = db.prepare(`
      INSERT INTO markets (
        question, description, category, b, q_yes, q_no,
        initial_liquidity, status, resolution_source, resolution_time, created_by
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, 'active', ?, ?, ?)
    `);

    const result = stmt.run(
      question,
      description || null,
      category || null,
      liquidityParam,
      q_yes,
      q_no,
      initial_liquidity,
      resolution_source || null,
      resolution_time || null,
      adminId
    );

    const marketId = result.lastInsertRowid as number;

    // Lock liquidity in the pool
    const updateLiquidityStmt = db.prepare(`
      UPDATE liquidity_pool
      SET locked_liquidity = locked_liquidity + ?,
          available_liquidity = available_liquidity - ?,
          updated_at = datetime('now')
      WHERE id = 1
    `);

    updateLiquidityStmt.run(initial_liquidity, initial_liquidity);

    // Log admin action
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || undefined;

    logAdminAction(
      adminId,
      'create_market',
      'market',
      marketId,
      { question, b: liquidityParam, initial_liquidity },
      ipAddress
    );

    return NextResponse.json({
      success: true,
      market_id: marketId,
      message: 'Market created successfully',
      market: {
        id: marketId,
        question,
        description,
        category,
        b: liquidityParam,
        q_yes,
        q_no,
        initial_liquidity,
        status: 'active',
        resolution_source,
        resolution_time,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating market:', error);
    return NextResponse.json(
      { error: 'Failed to create market' },
      { status: 500 }
    );
  }
}
