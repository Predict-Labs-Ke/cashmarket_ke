-- Users table (for regular users)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT,
  phone_number TEXT,
  balance REAL DEFAULT 0,
  kyc_status TEXT DEFAULT 'unverified' CHECK(kyc_status IN ('unverified', 'pending', 'verified', 'rejected')),
  kyc_document_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Admin users table (separate for verified admins)
CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK(role IN ('admin', 'moderator', 'oracle')),
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Markets table
CREATE TABLE IF NOT EXISTS markets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  description TEXT,
  category TEXT,
  b REAL DEFAULT 20000, -- Liquidity parameter (KES)
  q_yes REAL DEFAULT 0, -- Quantity of YES shares
  q_no REAL DEFAULT 0, -- Quantity of NO shares
  initial_liquidity REAL DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'paused', 'resolved', 'inactive')),
  resolved_outcome TEXT CHECK(resolved_outcome IN ('YES', 'NO', 'INVALID', NULL)),
  resolution_source TEXT,
  resolution_time DATETIME,
  resolution_evidence TEXT,
  resolved_at DATETIME,
  resolved_by INTEGER,
  created_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (resolved_by) REFERENCES admin_users(id),
  FOREIGN KEY (created_by) REFERENCES admin_users(id)
);

-- Trades table
CREATE TABLE IF NOT EXISTS trades (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  market_id INTEGER NOT NULL,
  outcome TEXT NOT NULL CHECK(outcome IN ('YES', 'NO')),
  shares REAL NOT NULL,
  cost REAL NOT NULL, -- Cost in KES
  price_at_trade REAL NOT NULL, -- Price at time of trade
  q_yes_before REAL NOT NULL,
  q_no_before REAL NOT NULL,
  q_yes_after REAL NOT NULL,
  q_no_after REAL NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (market_id) REFERENCES markets(id)
);

-- User positions (aggregate positions per user per market)
CREATE TABLE IF NOT EXISTS user_positions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  market_id INTEGER NOT NULL,
  yes_shares REAL DEFAULT 0,
  no_shares REAL DEFAULT 0,
  total_invested REAL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (market_id) REFERENCES markets(id),
  UNIQUE(user_id, market_id)
);

-- Liquidity pool (platform-wide insurance pool)
CREATE TABLE IF NOT EXISTS liquidity_pool (
  id INTEGER PRIMARY KEY CHECK(id = 1), -- Single row
  total_liquidity REAL DEFAULT 0,
  locked_liquidity REAL DEFAULT 0,
  available_liquidity REAL DEFAULT 0,
  total_exposure REAL DEFAULT 0,
  fees_collected REAL DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Initialize liquidity pool
INSERT OR IGNORE INTO liquidity_pool (id, total_liquidity, available_liquidity) 
VALUES (1, 1000000, 1000000); -- Start with 1M KES

-- Transactions (deposits, withdrawals, payouts)
CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('deposit', 'withdrawal', 'payout', 'trade')),
  amount REAL NOT NULL,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'completed', 'failed', 'cancelled')),
  otp_verified BOOLEAN DEFAULT 0,
  reference TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- OTP codes (for 2FA on deposits/withdrawals)
CREATE TABLE IF NOT EXISTS otp_codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  code TEXT NOT NULL,
  purpose TEXT NOT NULL CHECK(purpose IN ('deposit', 'withdrawal', 'login')),
  expires_at DATETIME NOT NULL,
  verified BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Sessions (device and session logging)
CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  device_info TEXT,
  ip_address TEXT,
  user_agent TEXT,
  is_suspicious BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Login attempts (rate limiting and brute force protection)
CREATE TABLE IF NOT EXISTS login_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  ip_address TEXT,
  success BOOLEAN DEFAULT 0,
  locked_until DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Audit logs (admin actions)
CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  admin_id INTEGER NOT NULL,
  action_type TEXT NOT NULL,
  resource_type TEXT,
  resource_id INTEGER,
  details TEXT,
  ip_address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES admin_users(id)
);

-- Platform controls (pause/unpause trading)
CREATE TABLE IF NOT EXISTS platform_controls (
  id INTEGER PRIMARY KEY CHECK(id = 1), -- Single row
  trading_paused BOOLEAN DEFAULT 0,
  paused_reason TEXT,
  paused_by INTEGER,
  paused_at DATETIME,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (paused_by) REFERENCES admin_users(id)
);

-- Initialize platform controls
INSERT OR IGNORE INTO platform_controls (id, trading_paused) VALUES (1, 0);

-- Fee configuration
CREATE TABLE IF NOT EXISTS fee_config (
  id INTEGER PRIMARY KEY CHECK(id = 1), -- Single row for global fees
  global_fee_percentage REAL DEFAULT 2.0, -- 2% default fee
  withdrawal_fee_percentage REAL DEFAULT 1.0, -- 1% withdrawal fee
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Initialize fee config
INSERT OR IGNORE INTO fee_config (id) VALUES (1);

-- Market-specific fee overrides
CREATE TABLE IF NOT EXISTS market_fees (
  market_id INTEGER PRIMARY KEY,
  fee_percentage REAL NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (market_id) REFERENCES markets(id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_trades_user_id ON trades(user_id);
CREATE INDEX IF NOT EXISTS idx_trades_market_id ON trades(market_id);
CREATE INDEX IF NOT EXISTS idx_user_positions_user_id ON user_positions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_positions_market_id ON user_positions(market_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_login_attempts_email ON login_attempts(email);
CREATE INDEX IF NOT EXISTS idx_login_attempts_ip ON login_attempts(ip_address);
CREATE INDEX IF NOT EXISTS idx_audit_logs_admin_id ON audit_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action_type ON audit_logs(action_type);
CREATE INDEX IF NOT EXISTS idx_otp_codes_user_id ON otp_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
