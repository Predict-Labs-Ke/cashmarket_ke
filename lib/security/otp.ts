import db from '../db';
import type { OTPCode } from '../types';

const OTP_EXPIRY_MINUTES = 10; // OTP expires in 10 minutes

/**
 * Generate a random 6-digit OTP code
 */
function generateOTPCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send OTP code (simulated - would integrate with SMS provider)
 * For now, we just log it and return it for testing
 */
export async function sendOTP(
  userId: number,
  purpose: 'deposit' | 'withdrawal' | 'login'
): Promise<{ code: string; expiresAt: Date }> {
  const code = generateOTPCode();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  // Save OTP to database
  const stmt = db.prepare(`
    INSERT INTO otp_codes (user_id, code, purpose, expires_at)
    VALUES (?, ?, ?, ?)
  `);
  
  stmt.run(userId, code, purpose, expiresAt.toISOString());

  // TODO: Integrate with SMS provider (e.g., Africa's Talking, Twilio)
  // For now, just log it
  console.log(`[SIMULATED SMS] OTP for user ${userId}: ${code} (${purpose})`);

  return { code, expiresAt };
}

/**
 * Verify OTP code
 */
export async function verifyOTP(
  userId: number,
  code: string,
  purpose: 'deposit' | 'withdrawal' | 'login'
): Promise<boolean> {
  const stmt = db.prepare(`
    SELECT * FROM otp_codes
    WHERE user_id = ? AND code = ? AND purpose = ? AND verified = 0
    ORDER BY created_at DESC
    LIMIT 1
  `);

  const otp = stmt.get(userId, code, purpose) as OTPCode | undefined;

  if (!otp) {
    return false;
  }

  // Check if OTP is expired
  const now = new Date();
  const expiresAt = new Date(otp.expires_at);
  
  if (now > expiresAt) {
    return false;
  }

  // Mark OTP as verified
  const updateStmt = db.prepare(`
    UPDATE otp_codes
    SET verified = 1
    WHERE id = ?
  `);
  
  updateStmt.run(otp.id);

  return true;
}

/**
 * Clean up expired OTP codes (should be run periodically)
 */
export function cleanupExpiredOTPs(): void {
  const stmt = db.prepare(`
    DELETE FROM otp_codes
    WHERE expires_at < datetime('now')
  `);
  
  const result = stmt.run();
  console.log(`Cleaned up ${result.changes} expired OTP codes`);
}
