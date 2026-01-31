/**
 * Mock Data for Frontend-Only Application
 * All API calls will use this mock data instead of backend
 */

import { Market, MarketDetail } from '../api/client';

// Mock Markets Data
export const MOCK_MARKETS: Market[] = [
  {
    id: 1,
    question: "Will Kenya Shilling strengthen against USD by Q2 2026?",
    description: "Market resolves YES if KES/USD exchange rate is below 125 by June 30, 2026",
    category: "Economy",
    status: "active",
    yes_price: 0.45,
    no_price: 0.55,
    yes_percentage: 45,
    no_percentage: 55,
    total_volume: 125000,
    participant_count: 234,
    trade_count: 567,
    resolution_source: "Central Bank of Kenya",
    resolution_time: "2026-06-30T23:59:59Z",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: 2,
    question: "Will Nairobi host the 2027 Africa Tech Summit?",
    description: "Market resolves YES if the official Africa Tech Summit 2027 is confirmed to be held in Nairobi",
    category: "Events",
    status: "active",
    yes_price: 0.62,
    no_price: 0.38,
    yes_percentage: 62,
    no_percentage: 38,
    total_volume: 87000,
    participant_count: 156,
    trade_count: 342,
    resolution_source: "Official event organizers",
    resolution_time: "2026-12-31T23:59:59Z",
    created_at: "2026-01-05T00:00:00Z",
  },
  {
    id: 3,
    question: "Will M-Pesa transaction volume exceed 20B in 2026?",
    description: "Market resolves YES if total M-Pesa transaction volume exceeds 20 billion KES in calendar year 2026",
    category: "Tech",
    status: "active",
    yes_price: 0.78,
    no_price: 0.22,
    yes_percentage: 78,
    no_percentage: 22,
    total_volume: 210000,
    participant_count: 445,
    trade_count: 891,
    resolution_source: "Safaricom Annual Report",
    resolution_time: "2027-01-31T23:59:59Z",
    created_at: "2026-01-10T00:00:00Z",
  },
  {
    id: 4,
    question: "Will Ruto win the 2027 Presidential Election?",
    description: "Market resolves YES if William Ruto wins the 2027 Kenyan presidential election",
    category: "Politics",
    status: "active",
    yes_price: 0.51,
    no_price: 0.49,
    yes_percentage: 51,
    no_percentage: 49,
    total_volume: 450000,
    participant_count: 892,
    trade_count: 2145,
    resolution_source: "IEBC Official Results",
    resolution_time: "2027-08-31T23:59:59Z",
    created_at: "2026-01-15T00:00:00Z",
  },
  {
    id: 5,
    question: "Will Harambee Stars qualify for AFCON 2027?",
    description: "Market resolves YES if Kenya's national football team qualifies for the 2027 Africa Cup of Nations",
    category: "Sports",
    status: "active",
    yes_price: 0.35,
    no_price: 0.65,
    yes_percentage: 35,
    no_percentage: 65,
    total_volume: 165000,
    participant_count: 387,
    trade_count: 723,
    resolution_source: "CAF Official Results",
    resolution_time: "2026-11-30T23:59:59Z",
    created_at: "2026-01-20T00:00:00Z",
  },
  {
    id: 6,
    question: "Will Kenya achieve 70% renewable energy by 2026?",
    description: "Market resolves YES if Kenya's renewable energy generation reaches 70% or more by December 31, 2026",
    category: "Environment",
    status: "active",
    yes_price: 0.41,
    no_price: 0.59,
    yes_percentage: 41,
    no_percentage: 59,
    total_volume: 98000,
    participant_count: 213,
    trade_count: 456,
    resolution_source: "Ministry of Energy",
    resolution_time: "2026-12-31T23:59:59Z",
    created_at: "2026-01-25T00:00:00Z",
  },
  {
    id: 7,
    question: "Will SGR expand to Kisumu by end of 2027?",
    description: "Market resolves YES if the Standard Gauge Railway is operational to Kisumu by December 31, 2027",
    category: "Infrastructure",
    status: "active",
    yes_price: 0.58,
    no_price: 0.42,
    yes_percentage: 58,
    no_percentage: 42,
    total_volume: 142000,
    participant_count: 298,
    trade_count: 612,
    resolution_source: "Kenya Railways",
    resolution_time: "2027-12-31T23:59:59Z",
    created_at: "2026-01-28T00:00:00Z",
  },
  {
    id: 8,
    question: "Will Kenya's GDP growth exceed 6% in 2026?",
    description: "Market resolves YES if Kenya's GDP growth rate for 2026 exceeds 6%",
    category: "Economy",
    status: "active",
    yes_price: 0.42,
    no_price: 0.58,
    yes_percentage: 42,
    no_percentage: 58,
    total_volume: 178000,
    participant_count: 356,
    trade_count: 734,
    resolution_source: "Kenya National Bureau of Statistics",
    resolution_time: "2027-03-31T23:59:59Z",
    created_at: "2026-01-30T00:00:00Z",
  },
];

// Mock user data
export const MOCK_USER = {
  id: 1,
  email: "demo@cashmarket.ke",
  name: "Demo User",
  balance: 50000,
  kyc_status: "verified",
};

// Mock portfolio data
export const MOCK_PORTFOLIO = {
  active_positions: 5,
  total_invested: 15000,
  total_shares: 320,
};

// Mock transactions
export const MOCK_TRANSACTIONS = [
  {
    id: 1,
    type: "deposit",
    amount: 10000,
    status: "completed",
    created_at: "2026-01-20T10:30:00Z",
  },
  {
    id: 2,
    type: "trade",
    amount: 2500,
    status: "completed",
    created_at: "2026-01-22T14:15:00Z",
  },
  {
    id: 3,
    type: "trade",
    amount: 1800,
    status: "completed",
    created_at: "2026-01-25T09:45:00Z",
  },
];

// Helper function to get market by id
export function getMockMarketById(id: number): MarketDetail | null {
  const market = MOCK_MARKETS.find(m => m.id === id);
  if (!market) return null;

  return {
    ...market,
    b: 20000,
    q_yes: 1000,
    q_no: 1000,
    initial_liquidity: 40000,
    user_position: {
      yes_shares: 0,
      no_shares: 0,
      total_invested: 0,
    },
  };
}

// Helper function to filter markets
export function filterMockMarkets(params?: {
  status?: string;
  category?: string;
  limit?: number;
  offset?: number;
}): Market[] {
  let filtered = [...MOCK_MARKETS];

  if (params?.status && params.status !== 'all') {
    filtered = filtered.filter(m => m.status === params.status);
  }

  if (params?.category && params.category !== 'All') {
    filtered = filtered.filter(m => m.category === params.category);
  }

  const offset = params?.offset || 0;
  const limit = params?.limit || filtered.length;

  return filtered.slice(offset, offset + limit);
}

// Mock recent trades
export const MOCK_RECENT_TRADES = [
  {
    id: 1,
    user_id: 1,
    outcome: "YES",
    shares: 25,
    cost: 1250,
    price_at_trade: 0.50,
    created_at: "2026-01-30T15:30:00Z",
  },
  {
    id: 2,
    user_id: 2,
    outcome: "NO",
    shares: 18,
    cost: 900,
    price_at_trade: 0.50,
    created_at: "2026-01-30T14:22:00Z",
  },
  {
    id: 3,
    user_id: 3,
    outcome: "YES",
    shares: 30,
    cost: 1500,
    price_at_trade: 0.50,
    created_at: "2026-01-30T12:15:00Z",
  },
];
