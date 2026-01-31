import db from '../db';
import type { User } from '../types';

export type KYCStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

/**
 * Submit KYC documents for verification
 */
export function submitKYC(
  userId: number,
  documentUrl: string
): void {
  const stmt = db.prepare(`
    UPDATE users
    SET kyc_status = 'pending', kyc_document_url = ?, updated_at = datetime('now')
    WHERE id = ?
  `);

  stmt.run(documentUrl, userId);
  console.log(`KYC submitted for user ${userId}`);
}

/**
 * Update KYC status (admin only)
 */
export function updateKYCStatus(
  userId: number,
  status: KYCStatus,
  adminId: number
): void {
  const stmt = db.prepare(`
    UPDATE users
    SET kyc_status = ?, updated_at = datetime('now')
    WHERE id = ?
  `);

  stmt.run(status, userId);

  // Log admin action
  const logStmt = db.prepare(`
    INSERT INTO audit_logs (admin_id, action_type, resource_type, resource_id, details)
    VALUES (?, 'kyc_status_update', 'user', ?, ?)
  `);

  logStmt.run(adminId, userId, JSON.stringify({ status }));
  console.log(`KYC status updated to ${status} for user ${userId} by admin ${adminId}`);
}

/**
 * Check if user can withdraw (requires KYC verification)
 */
export function canUserWithdraw(userId: number): boolean {
  const stmt = db.prepare(`
    SELECT kyc_status FROM users WHERE id = ?
  `);

  const user = stmt.get(userId) as Pick<User, 'kyc_status'> | undefined;
  return user?.kyc_status === 'verified';
}

/**
 * Get KYC status for a user
 */
export function getKYCStatus(userId: number): KYCStatus | null {
  const stmt = db.prepare(`
    SELECT kyc_status FROM users WHERE id = ?
  `);

  const user = stmt.get(userId) as Pick<User, 'kyc_status'> | undefined;
  return user?.kyc_status || null;
}

/**
 * Get pending KYC submissions (for admin review)
 */
export function getPendingKYCSubmissions(): User[] {
  const stmt = db.prepare(`
    SELECT * FROM users
    WHERE kyc_status = 'pending'
    ORDER BY updated_at DESC
  `);

  return stmt.all() as User[];
}
