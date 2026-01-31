/**
 * API Client for CashMarket
 * Provides typed functions for all backend API endpoints
 */

// Base configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Generic fetch wrapper with error handling
 */
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// ==================== Public Market APIs ====================

export interface Market {
  id: number;
  question: string;
  description?: string;
  category?: string;
  status: string;
  yes_price: number;
  no_price: number;
  yes_percentage: number;
  no_percentage: number;
  total_volume: number;
  participant_count: number;
  trade_count: number;
  resolution_source?: string;
  resolution_time?: string;
  resolved_outcome?: string;
  created_at: string;
}

export interface MarketDetail extends Market {
  b: number;
  q_yes: number;
  q_no: number;
  initial_liquidity: number;
  user_position?: {
    yes_shares: number;
    no_shares: number;
    total_invested: number;
  };
}

export interface MarketsResponse {
  markets: Market[];
  total: number;
  limit: number;
  offset: number;
}

/**
 * Get all markets with optional filters
 */
export async function getMarkets(params?: {
  status?: string;
  category?: string;
  limit?: number;
  offset?: number;
}): Promise<MarketsResponse> {
  const searchParams = new URLSearchParams();
  if (params?.status) searchParams.set('status', params.status);
  if (params?.category) searchParams.set('category', params.category);
  if (params?.limit) searchParams.set('limit', params.limit.toString());
  if (params?.offset) searchParams.set('offset', params.offset.toString());

  const query = searchParams.toString();
  return apiFetch<MarketsResponse>(
    `/api/markets${query ? `?${query}` : ''}`
  );
}

/**
 * Get details for a specific market
 */
export async function getMarket(marketId: number): Promise<{
  market: MarketDetail;
  stats: {
    participant_count: number;
    trade_count: number;
    total_volume: number;
  };
  recent_trades: any[];
  user_position?: any;
}> {
  return apiFetch(`/api/markets/${marketId}`);
}

/**
 * Calculate stake cost and potential payout
 */
export async function calculateStake(data: {
  market_id: number;
  outcome: 'YES' | 'NO';
  stake: number;
}): Promise<{
  cost: number;
  shares: number;
  new_price_yes: number;
  new_price_no: number;
  potential_payout: number;
  expected_return: number;
  roi_percentage: number;
  fee: number;
}> {
  return apiFetch('/api/stake', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Execute a trade
 */
export async function executeTrade(data: {
  market_id: number;
  outcome: 'YES' | 'NO';
  stake: number;
}): Promise<{
  success: boolean;
  trade_id: number;
  shares: number;
  cost: number;
  fee: number;
  new_balance: number;
}> {
  return apiFetch('/api/trades', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Get user balance and portfolio
 */
export async function getUserBalance(): Promise<{
  user: {
    id: number;
    email: string;
    name: string;
    balance: number;
    kyc_status: string;
  };
  portfolio: {
    active_positions: number;
    total_invested: number;
    total_shares: number;
  };
  recent_transactions: any[];
}> {
  return apiFetch('/api/user/balance');
}

/**
 * Send OTP code
 */
export async function sendOTP(purpose: 'deposit' | 'withdrawal' | 'login'): Promise<{
  success: boolean;
  message: string;
  _test_code?: string;
  expires_at: string;
}> {
  return apiFetch('/api/user/otp/send', {
    method: 'POST',
    body: JSON.stringify({ purpose }),
  });
}

/**
 * Deposit funds (requires OTP)
 */
export async function deposit(data: {
  amount: number;
  otp_code: string;
}): Promise<{
  success: boolean;
  transaction_id: number;
  amount: number;
  new_balance: number;
}> {
  return apiFetch('/api/user/deposit', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Withdraw funds (requires OTP and KYC)
 */
export async function withdraw(data: {
  amount: number;
  otp_code: string;
}): Promise<{
  success: boolean;
  transaction_id: number;
  amount: number;
  fee: number;
  new_balance: number;
}> {
  return apiFetch('/api/user/withdraw', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
