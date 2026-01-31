// Core type definitions for the CashMarket platform

export interface User {
  id: number;
  email: string;
  name: string;
  password_hash?: string;
  phone_number?: string;
  balance: number;
  kyc_status: 'unverified' | 'pending' | 'verified' | 'rejected';
  kyc_document_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  password_hash: string;
  role: 'admin' | 'moderator' | 'oracle';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Market {
  id: number;
  question: string;
  description?: string;
  category?: string;
  b: number; // Liquidity parameter
  q_yes: number; // Quantity of YES shares
  q_no: number; // Quantity of NO shares
  initial_liquidity: number;
  status: 'active' | 'paused' | 'resolved' | 'inactive';
  resolved_outcome?: 'YES' | 'NO' | 'INVALID';
  resolution_source?: string;
  resolution_time?: string;
  resolution_evidence?: string;
  resolved_at?: string;
  resolved_by?: number;
  created_by?: number;
  created_at: string;
  updated_at: string;
}

export interface Trade {
  id: number;
  user_id: number;
  market_id: number;
  outcome: 'YES' | 'NO';
  shares: number;
  cost: number; // Cost in KES
  price_at_trade: number;
  q_yes_before: number;
  q_no_before: number;
  q_yes_after: number;
  q_no_after: number;
  created_at: string;
}

export interface UserPosition {
  id: number;
  user_id: number;
  market_id: number;
  yes_shares: number;
  no_shares: number;
  total_invested: number;
  created_at: string;
  updated_at: string;
}

export interface LiquidityPool {
  id: number;
  total_liquidity: number;
  locked_liquidity: number;
  available_liquidity: number;
  total_exposure: number;
  fees_collected: number;
  updated_at: string;
}

export interface Transaction {
  id: number;
  user_id: number;
  type: 'deposit' | 'withdrawal' | 'payout' | 'trade';
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  otp_verified: boolean;
  reference?: string;
  created_at: string;
  completed_at?: string;
}

export interface OTPCode {
  id: number;
  user_id: number;
  code: string;
  purpose: 'deposit' | 'withdrawal' | 'login';
  expires_at: string;
  verified: boolean;
  created_at: string;
}

export interface Session {
  id: number;
  user_id: number;
  device_info?: string;
  ip_address?: string;
  user_agent?: string;
  is_suspicious: boolean;
  created_at: string;
  expires_at?: string;
}

export interface LoginAttempt {
  id: number;
  email: string;
  ip_address?: string;
  success: boolean;
  locked_until?: string;
  created_at: string;
}

export interface AuditLog {
  id: number;
  admin_id: number;
  action_type: string;
  resource_type?: string;
  resource_id?: number;
  details?: string;
  ip_address?: string;
  created_at: string;
}

export interface PlatformControls {
  id: number;
  trading_paused: boolean;
  paused_reason?: string;
  paused_by?: number;
  paused_at?: string;
  updated_at: string;
}

export interface FeeConfig {
  id: number;
  global_fee_percentage: number;
  withdrawal_fee_percentage: number;
  updated_at: string;
}

export interface MarketFee {
  market_id: number;
  fee_percentage: number;
  updated_at: string;
}

// API Request/Response types

export interface CreateMarketRequest {
  question: string;
  description?: string;
  category?: string;
  b?: number; // Optional override of default liquidity parameter
  initial_liquidity: number;
  resolution_source?: string;
  resolution_time?: string;
}

export interface ResolveMarketRequest {
  resolved_outcome: 'YES' | 'NO' | 'INVALID';
  resolution_evidence?: string;
}

export interface TradeRequest {
  market_id: number;
  outcome: 'YES' | 'NO';
  stake: number; // Amount in KES to spend
}

export interface StakeCalculationRequest {
  market_id: number;
  outcome: 'YES' | 'NO';
  stake: number; // Amount in KES
}

export interface StakeCalculationResponse {
  cost: number; // Actual cost in KES
  shares: number; // Shares to be received
  new_price: number; // New price after trade
  potential_payout: number; // Payout if outcome wins
  fee: number; // Trading fee
}

export interface DepositRequest {
  amount: number;
  otp_code: string;
}

export interface WithdrawRequest {
  amount: number;
  otp_code: string;
}

export interface SendOTPRequest {
  purpose: 'deposit' | 'withdrawal' | 'login';
}

export interface VerifyOTPRequest {
  code: string;
  purpose: 'deposit' | 'withdrawal' | 'login';
}

export interface UpdateLiquidityRequest {
  action: 'deposit' | 'withdraw';
  amount: number;
}

export interface UpdateFeesRequest {
  market_id?: number; // If provided, updates specific market fee
  fee_percentage: number;
}

export interface PauseTradingRequest {
  paused: boolean;
  reason?: string;
  market_id?: number; // If provided, pauses specific market
}

// Extended market info for detailed view
export interface MarketDetail extends Market {
  yes_price: number; // Current YES price in KES
  no_price: number; // Current NO price in KES
  total_volume: number; // Total trading volume
  user_position?: UserPosition; // Current user's position (if logged in)
}
