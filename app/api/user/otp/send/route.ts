import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/middleware/auth";
import { sendOTP } from "@/lib/security/otp";
import type { SendOTPRequest } from "@/lib/types";

/**
 * POST /api/user/otp/send
 * Send OTP code to user (for deposit/withdrawal)
 */
export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();
    if (session instanceof NextResponse) {
      return session;
    }

    const userId = parseInt(session.user.id);
    const body: SendOTPRequest = await request.json();
    const { purpose } = body;

    if (!purpose || !['deposit', 'withdrawal', 'login'].includes(purpose)) {
      return NextResponse.json(
        { error: 'purpose must be deposit, withdrawal, or login' },
        { status: 400 }
      );
    }

    // Send OTP
    const { code, expiresAt } = await sendOTP(userId, purpose);

    // In production, don't return the code!
    // For testing/simulation, we return it
    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      // REMOVE THIS IN PRODUCTION - only for testing
      _test_code: code,
      expires_at: expiresAt,
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}
