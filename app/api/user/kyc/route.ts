import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/middleware/auth";
import { submitKYC, getKYCStatus } from "@/lib/security/kyc";

/**
 * POST /api/user/kyc
 * Submit KYC documents for verification
 */
export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();
    if (session instanceof NextResponse) {
      return session;
    }

    const userId = parseInt(session.user.id);
    const body = await request.json();
    const { document_url } = body;

    if (!document_url) {
      return NextResponse.json(
        { error: 'document_url is required' },
        { status: 400 }
      );
    }

    // Submit KYC
    submitKYC(userId, document_url);

    return NextResponse.json({
      success: true,
      message: 'KYC documents submitted successfully. Your submission is pending review.',
      status: 'pending',
    });
  } catch (error) {
    console.error('Error submitting KYC:', error);
    return NextResponse.json(
      { error: 'Failed to submit KYC documents' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/user/kyc
 * Get KYC status
 */
export async function GET() {
  try {
    const session = await requireAuth();
    if (session instanceof NextResponse) {
      return session;
    }

    const userId = parseInt(session.user.id);
    const status = getKYCStatus(userId);

    return NextResponse.json({
      user_id: userId,
      kyc_status: status,
    });
  } catch (error) {
    console.error('Error fetching KYC status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch KYC status' },
      { status: 500 }
    );
  }
}
