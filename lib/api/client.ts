/**
 * API Client for CashMarket (Frontend-Only Version)
 * Uses mock data instead of backend API calls
 */

import { 
  MOCK_MARKETS, 
  MOCK_USER, 
  MOCK_PORTFOLIO, 
  MOCK_TRANSACTIONS, 
  MOCK_RECENT_TRADES,
  getMockMarketById,
  filterMockMarkets
} from '../data/mockData';

/**
 * Simulate network delay for realistic feel
 */
async function simulateDelay(ms: number = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
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
  await simulateDelay();
  
  const markets = filterMockMarkets(params);
  
  return {
    markets,
    total: MOCK_MARKETS.length,
    limit: params?.limit || MOCK_MARKETS.length,
    offset: params?.offset || 0,
  };
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
  recent_trades: {
    id: number;
    user_id: number;
    outcome: string;
    shares: number;
    cost: number;
    price_at_trade: number;
    created_at: string;
  }[];
  user_position?: {
    yes_shares: number;
    no_shares: number;
    total_invested: number;
  };
}> {
  await simulateDelay();
  
  const market = getMockMarketById(marketId);
  if (!market) {
    throw new Error('Market not found');
  }

  return {
    market,
    stats: {
      participant_count: market.participant_count,
      trade_count: market.trade_count,
      total_volume: market.total_volume,
    },
    recent_trades: MOCK_RECENT_TRADES,
    user_position: {
      yes_shares: 0,
      no_shares: 0,
      total_invested: 0,
    },
  };
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
  await simulateDelay();
  
  // Simple mock calculation
  const fee = data.stake * 0.02; // 2% fee
  const cost = data.stake;
  const shares = data.stake / 50; // Simplified share calculation
  
  return {
    cost,
    shares,
    new_price_yes: 0.52,
    new_price_no: 0.48,
    potential_payout: data.stake * 2,
    expected_return: data.stake,
    roi_percentage: 100,
    fee,
  };
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
  await simulateDelay(500);
  
  const fee = data.stake * 0.02;
  const shares = data.stake / 50;
  
  return {
    success: true,
    trade_id: Math.floor(Math.random() * 10000),
    shares,
    cost: data.stake,
    fee,
    new_balance: MOCK_USER.balance - data.stake,
  };
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
  recent_transactions: {
    id: number;
    type: string;
    amount: number;
    status: string;
    created_at: string;
  }[];
}> {
  await simulateDelay();
  
  return {
    user: MOCK_USER,
    portfolio: MOCK_PORTFOLIO,
    recent_transactions: MOCK_TRANSACTIONS,
  };
}

/**
 * Send OTP code
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function sendOTP(_purpose: 'deposit' | 'withdrawal' | 'login'): Promise<{
  success: boolean;
  message: string;
  _test_code?: string;
  expires_at: string;
}> {
  await simulateDelay();
  
  return {
    success: true,
    message: 'OTP sent successfully (mock)',
    _test_code: '123456',
    expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
  };
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
  await simulateDelay(500);
  
  return {
    success: true,
    transaction_id: Math.floor(Math.random() * 10000),
    amount: data.amount,
    new_balance: MOCK_USER.balance + data.amount,
  };
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
  await simulateDelay(500);
  
  const fee = data.amount * 0.01; // 1% withdrawal fee
  
  return {
    success: true,
    transaction_id: Math.floor(Math.random() * 10000),
    amount: data.amount,
    fee,
    new_balance: MOCK_USER.balance - data.amount - fee,
  };
}
