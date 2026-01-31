import db from '../db';
import type { Session } from '../types';

const SESSION_EXPIRY_DAYS = 30; // Sessions expire in 30 days

/**
 * Create a new session for a user
 */
export function createSession(
  userId: number,
  deviceInfo?: string,
  ipAddress?: string,
  userAgent?: string
): Session {
  const expiresAt = new Date(Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
  
  // Check for suspicious activity (e.g., new device from different location)
  const isSuspicious = checkSuspiciousActivity(userId, ipAddress, userAgent);

  const stmt = db.prepare(`
    INSERT INTO sessions (user_id, device_info, ip_address, user_agent, is_suspicious, expires_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    userId,
    deviceInfo || null,
    ipAddress || null,
    userAgent || null,
    isSuspicious ? 1 : 0,
    expiresAt.toISOString()
  );

  const session: Session = {
    id: result.lastInsertRowid as number,
    user_id: userId,
    device_info: deviceInfo,
    ip_address: ipAddress,
    user_agent: userAgent,
    is_suspicious: isSuspicious,
    created_at: new Date().toISOString(),
    expires_at: expiresAt.toISOString(),
  };

  // Notify user of new device login if suspicious
  if (isSuspicious) {
    notifyNewDeviceLogin(userId, deviceInfo, ipAddress);
  }

  return session;
}

/**
 * Check if login activity is suspicious
 */
function checkSuspiciousActivity(
  userId: number,
  ipAddress?: string,
  userAgent?: string
): boolean {
  // Get recent sessions for this user
  const stmt = db.prepare(`
    SELECT * FROM sessions
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 5
  `);

  const recentSessions = stmt.all(userId) as Session[];

  if (recentSessions.length === 0) {
    // First login, not suspicious
    return false;
  }

  // Check if IP address or user agent is significantly different
  const ipAddresses = recentSessions
    .map(s => s.ip_address)
    .filter(Boolean) as string[];
  const userAgents = recentSessions
    .map(s => s.user_agent)
    .filter(Boolean) as string[];

  const newIp = ipAddress && !ipAddresses.includes(ipAddress);
  const newUserAgent = userAgent && !userAgents.includes(userAgent);

  // Mark as suspicious if both IP and user agent are new
  return Boolean(newIp && newUserAgent);
}

/**
 * Notify user of new device login (simulated - would send email/SMS)
 */
function notifyNewDeviceLogin(
  userId: number,
  deviceInfo?: string,
  ipAddress?: string
): void {
  // TODO: Integrate with email/SMS provider
  console.log(
    `[SECURITY ALERT] New device login for user ${userId} from ${ipAddress || 'unknown IP'} (${deviceInfo || 'unknown device'})`
  );
}

/**
 * Get active sessions for a user
 */
export function getUserSessions(userId: number): Session[] {
  const stmt = db.prepare(`
    SELECT * FROM sessions
    WHERE user_id = ? AND expires_at > datetime('now')
    ORDER BY created_at DESC
  `);

  return stmt.all(userId) as Session[];
}

/**
 * Get all suspicious sessions (for admin panel)
 */
export function getSuspiciousSessions(): Session[] {
  const stmt = db.prepare(`
    SELECT s.*, u.email, u.name
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.is_suspicious = 1
    ORDER BY s.created_at DESC
    LIMIT 100
  `);

  return stmt.all() as Session[];
}

/**
 * Clean up expired sessions (should be run periodically)
 */
export function cleanupExpiredSessions(): void {
  const stmt = db.prepare(`
    DELETE FROM sessions
    WHERE expires_at < datetime('now')
  `);

  const result = stmt.run();
  console.log(`Cleaned up ${result.changes} expired sessions`);
}
