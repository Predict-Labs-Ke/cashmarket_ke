import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/middleware/auth";
import { verifyOTP } from "@/lib/security/otp";
import type { VerifyOTPRequest } from "@/lib/types";

/**
 * POST /api/user/otp/verify
 * Verify OTP code
 */
export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(request);
    if (session instanceof NextResponse) {
      return session;
    }

    const userId = parseInt(session.user.id);
    const body: VerifyOTPRequest = await request.json();
    const { code, purpose } = body;

    if (!code || !purpose) {
      return NextResponse.json(
        { error: 'code and purpose are required' },
        { status: 400 }
      );
    }

    const isValid = await verifyOTP(userId, code, purpose);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP code' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'OTP verified successfully',
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}
