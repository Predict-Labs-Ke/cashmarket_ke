import db from '../db';
import type { LoginAttempt } from '../types';

const MAX_LOGIN_ATTEMPTS = 5; // Maximum login attempts before lockout
const LOCKOUT_DURATION_MINUTES = 30; // Lockout duration in minutes
const ATTEMPT_WINDOW_MINUTES = 15; // Time window to count attempts

/**
 * Record a login attempt
 */
export function recordLoginAttempt(
  email: string,
  ipAddress: string | undefined,
  success: boolean
): void {
  const stmt = db.prepare(`
    INSERT INTO login_attempts (email, ip_address, success)
    VALUES (?, ?, ?)
  `);

  stmt.run(email, ipAddress || null, success ? 1 : 0);
}

/**
 * Check if an email or IP is currently locked out
 */
export function isLockedOut(
  email: string,
  ipAddress?: string
): { locked: boolean; lockedUntil?: Date } {
  const now = new Date();

  // Check if there's an active lockout
  const stmt = db.prepare(`
    SELECT locked_until FROM login_attempts
    WHERE (email = ? OR ip_address = ?)
      AND locked_until IS NOT NULL
      AND locked_until > datetime('now')
    ORDER BY locked_until DESC
    LIMIT 1
  `);

  const result = stmt.get(email, ipAddress || null) as Pick<LoginAttempt, 'locked_until'> | undefined;

  if (result?.locked_until) {
    return {
      locked: true,
      lockedUntil: new Date(result.locked_until),
    };
  }

  // Check recent failed attempts
  const windowStart = new Date(now.getTime() - ATTEMPT_WINDOW_MINUTES * 60 * 1000);

  const countStmt = db.prepare(`
    SELECT COUNT(*) as count FROM login_attempts
    WHERE (email = ? OR ip_address = ?)
      AND success = 0
      AND created_at > ?
  `);

  const countResult = countStmt.get(
    email,
    ipAddress || null,
    windowStart.toISOString()
  ) as { count: number };

  if (countResult.count >= MAX_LOGIN_ATTEMPTS) {
    // Lock out the account
    const lockedUntil = new Date(now.getTime() + LOCKOUT_DURATION_MINUTES * 60 * 1000);

    const lockStmt = db.prepare(`
      INSERT INTO login_attempts (email, ip_address, success, locked_until)
      VALUES (?, ?, 0, ?)
    `);

    lockStmt.run(email, ipAddress || null, lockedUntil.toISOString());

    return {
      locked: true,
      lockedUntil,
    };
  }

  return { locked: false };
}

/**
 * Get remaining login attempts before lockout
 */
export function getRemainingAttempts(
  email: string,
  ipAddress?: string
): number {
  const now = new Date();
  const windowStart = new Date(now.getTime() - ATTEMPT_WINDOW_MINUTES * 60 * 1000);

  const stmt = db.prepare(`
    SELECT COUNT(*) as count FROM login_attempts
    WHERE (email = ? OR ip_address = ?)
      AND success = 0
      AND created_at > ?
  `);

  const result = stmt.get(
    email,
    ipAddress || null,
    windowStart.toISOString()
  ) as { count: number };

  return Math.max(0, MAX_LOGIN_ATTEMPTS - result.count);
}

/**
 * Clear login attempts after successful login
 */
export function clearLoginAttempts(email: string): void {
  const stmt = db.prepare(`
    DELETE FROM login_attempts
    WHERE email = ? AND success = 0
  `);

  stmt.run(email);
}

/**
 * Clean up old login attempts (should be run periodically)
 */
export function cleanupOldLoginAttempts(): void {
  const cutoffDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago

  const stmt = db.prepare(`
    DELETE FROM login_attempts
    WHERE created_at < ?
  `);

  const result = stmt.run(cutoffDate.toISOString());
  console.log(`Cleaned up ${result.changes} old login attempts`);
}
