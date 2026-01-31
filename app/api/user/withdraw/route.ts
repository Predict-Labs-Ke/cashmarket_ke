import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { requireAuth } from "@/lib/middleware/auth";
import { verifyOTP } from "@/lib/security/otp";
import { canUserWithdraw } from "@/lib/security/kyc";
import type { WithdrawRequest, User, FeeConfig } from "@/lib/types";

/**
 * POST /api/user/withdraw
 * Withdraw funds (requires OTP verification and KYC)
 */
export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();
    if (session instanceof NextResponse) {
      return session;
    }

    const userId = parseInt(session.user.id);
    const body: WithdrawRequest = await request.json();
    const { amount, otp_code } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'amount must be greater than 0' },
        { status: 400 }
      );
    }

    if (!otp_code) {
      return NextResponse.json(
        { error: 'OTP code is required for withdrawals' },
        { status: 400 }
      );
    }

    // Check KYC status
    const hasKYC = canUserWithdraw(userId);
    if (!hasKYC) {
      return NextResponse.json(
        { error: 'KYC verification required for withdrawals. Please complete KYC verification first.' },
        { status: 403 }
      );
    }

    // Verify OTP
    const isValidOTP = await verifyOTP(userId, otp_code, 'withdrawal');
    if (!isValidOTP) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP code' },
        { status: 400 }
      );
    }

    // Get user balance
    const userStmt = db.prepare(`
      SELECT balance FROM users WHERE id = ?
    `);
    const user = userStmt.get(userId) as Pick<User, 'balance'>;

    // Get withdrawal fee
    const feeStmt = db.prepare(`
      SELECT withdrawal_fee_percentage FROM fee_config WHERE id = 1
    `);
    const feeConfig = feeStmt.get() as Pick<FeeConfig, 'withdrawal_fee_percentage'>;

    const fee = amount * (feeConfig.withdrawal_fee_percentage / 100);
    const totalDeduction = amount + fee;

    if (user.balance < totalDeduction) {
      return NextResponse.json(
        {
          error: `Insufficient balance. You have KES ${user.balance}, but need KES ${totalDeduction} (amount + fee)`,
        },
        { status: 400 }
      );
    }

    // Process withdrawal in a transaction
    const withdrawalStmt = db.transaction(() => {
      // Update user balance
      const updateBalanceStmt = db.prepare(`
        UPDATE users
        SET balance = balance - ?, updated_at = datetime('now')
        WHERE id = ?
      `);

      updateBalanceStmt.run(totalDeduction, userId);

      // Record transaction
      const txnStmt = db.prepare(`
        INSERT INTO transactions (user_id, type, amount, status, otp_verified, reference, completed_at)
        VALUES (?, 'withdrawal', ?, 'completed', 1, ?, datetime('now'))
      `);

      const result = txnStmt.run(
        userId,
        amount,
        `WITHDRAWAL-${Date.now()}-${userId}`
      );

      // Add fee to liquidity pool
      const updateFeesStmt = db.prepare(`
        UPDATE liquidity_pool
        SET fees_collected = fees_collected + ?, updated_at = datetime('now')
        WHERE id = 1
      `);

      updateFeesStmt.run(fee);

      return result.lastInsertRowid;
    });

    const transactionId = withdrawalStmt();

    // Get updated user balance
    const updatedUser = userStmt.get(userId) as Pick<User, 'balance'>;

    return NextResponse.json({
      success: true,
      message: `Successfully withdrew KES ${amount}`,
      transaction_id: transactionId,
      amount,
      fee,
      total_deducted: totalDeduction,
      new_balance: updatedUser.balance,
    });
  } catch (error) {
    console.error('Error processing withdrawal:', error);
    return NextResponse.json(
      { error: 'Failed to process withdrawal' },
      { status: 500 }
    );
  }
}
