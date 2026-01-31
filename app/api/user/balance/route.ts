import { NextResponse } from "next/server";
import db from "@/lib/db";
import { requireAuth } from "@/lib/middleware/auth";
import type { User } from "@/lib/types";

/**
 * GET /api/user/balance
 * Get user balance and account info
 */
export async function GET() {
  try {
    const session = await requireAuth();
    if (session instanceof NextResponse) {
      return session;
    }

    const userId = parseInt(session.user.id);

    // Get user info
    const userStmt = db.prepare(`
      SELECT id, email, name, balance, kyc_status, created_at
      FROM users WHERE id = ?
    `);
    const user = userStmt.get(userId) as Omit<User, 'password_hash'>;

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get user positions summary
    const positionsStmt = db.prepare(`
      SELECT 
        COUNT(*) as active_positions,
        SUM(total_invested) as total_invested,
        SUM(yes_shares + no_shares) as total_shares
      FROM user_positions
      WHERE user_id = ? AND (yes_shares > 0 OR no_shares > 0)
    `);
    const positions = positionsStmt.get(userId) as {
      active_positions: number;
      total_invested: number;
      total_shares: number;
    };

    // Get recent transactions
    const txnStmt = db.prepare(`
      SELECT * FROM transactions
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 10
    `);
    const recentTransactions = txnStmt.all(userId);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        balance: user.balance,
        kyc_status: user.kyc_status,
        created_at: user.created_at,
      },
      portfolio: {
        active_positions: positions.active_positions || 0,
        total_invested: positions.total_invested || 0,
        total_shares: positions.total_shares || 0,
      },
      recent_transactions: recentTransactions,
    });
  } catch (error) {
    console.error('Error fetching user balance:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user balance' },
      { status: 500 }
    );
  }
}
