import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { requireAuth } from "@/lib/middleware/auth";
import { verifyOTP } from "@/lib/security/otp";
import type { DepositRequest, User } from "@/lib/types";

/**
 * POST /api/user/deposit
 * Deposit funds (requires OTP verification)
 */
export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();
    if (session instanceof NextResponse) {
      return session;
    }

    const userId = parseInt(session.user.id);
    const body: DepositRequest = await request.json();
    const { amount, otp_code } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'amount must be greater than 0' },
        { status: 400 }
      );
    }

    if (!otp_code) {
      return NextResponse.json(
        { error: 'OTP code is required for deposits' },
        { status: 400 }
      );
    }

    // Verify OTP
    const isValidOTP = await verifyOTP(userId, otp_code, 'deposit');
    if (!isValidOTP) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP code' },
        { status: 400 }
      );
    }

    // Process deposit in a transaction
    const depositStmt = db.transaction(() => {
      // Update user balance
      const updateBalanceStmt = db.prepare(`
        UPDATE users
        SET balance = balance + ?, updated_at = datetime('now')
        WHERE id = ?
      `);

      updateBalanceStmt.run(amount, userId);

      // Record transaction
      const txnStmt = db.prepare(`
        INSERT INTO transactions (user_id, type, amount, status, otp_verified, reference, completed_at)
        VALUES (?, 'deposit', ?, 'completed', 1, ?, datetime('now'))
      `);

      const result = txnStmt.run(
        userId,
        amount,
        `DEPOSIT-${Date.now()}-${userId}`
      );

      return result.lastInsertRowid;
    });

    const transactionId = depositStmt();

    // Get updated user balance
    const userStmt = db.prepare(`
      SELECT balance FROM users WHERE id = ?
    `);
    const user = userStmt.get(userId) as Pick<User, 'balance'>;

    return NextResponse.json({
      success: true,
      message: `Successfully deposited KES ${amount}`,
      transaction_id: transactionId,
      amount,
      new_balance: user.balance,
    });
  } catch (error) {
    console.error('Error processing deposit:', error);
    return NextResponse.json(
      { error: 'Failed to process deposit' },
      { status: 500 }
    );
  }
}
