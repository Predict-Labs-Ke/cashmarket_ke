/**
 * Simulation Data Module
 * 
 * This module provides sample/demo data for pre-launch testing.
 * All data here is SIMULATED and should not be used in production.
 * 
 * Usage:
 * - Development: Enable simulation mode for testing
 * - Pre-launch: Use for demos and testing
 * - Production: Disable simulation mode (use real data)
 */

// Simulation mode flag - controlled by environment variable
export const SIMULATION_MODE = process.env.NEXT_PUBLIC_SIMULATION_MODE === 'true' || 
                               process.env.NODE_ENV === 'development';

export const SIMULATION_CONFIG = {
  enabled: SIMULATION_MODE,
  showBanner: true,
  allowRealTransactions: false,
  dataSource: SIMULATION_MODE ? 'SIMULATED' : 'PRODUCTION',
};

/**
 * Sample Markets for Simulation
 * These are realistic market scenarios for Kenya
 */
export const SIMULATION_MARKETS = [
  {
    question: "Will Kenya Shilling strengthen against USD by Q2 2026?",
    description: "Market resolves YES if KES/USD exchange rate is below 125 by June 30, 2026",
    category: "Economy",
    b: 20000,
    initial_liquidity: 50000,
    resolution_source: "Central Bank of Kenya",
    resolution_time: "2026-06-30T23:59:59Z",
  },
  {
    question: "Will Nairobi host the 2027 Africa Tech Summit?",
    description: "Market resolves YES if the official Africa Tech Summit 2027 is confirmed to be held in Nairobi",
    category: "Events",
    b: 20000,
    initial_liquidity: 30000,
    resolution_source: "Official event organizers",
    resolution_time: "2026-12-31T23:59:59Z",
  },
  {
    question: "Will M-Pesa transaction volume exceed 20B in 2026?",
    description: "Market resolves YES if total M-Pesa transaction volume exceeds 20 billion KES in calendar year 2026",
    category: "Tech",
    b: 20000,
    initial_liquidity: 40000,
    resolution_source: "Safaricom Annual Report",
    resolution_time: "2027-01-31T23:59:59Z",
  },
  {
    question: "Will Ruto win the 2027 Presidential Election?",
    description: "Market resolves YES if William Ruto wins the 2027 Kenyan presidential election",
    category: "Politics",
    b: 50000, // Higher liquidity for high-profile market
    initial_liquidity: 100000,
    resolution_source: "IEBC Official Results",
    resolution_time: "2027-08-31T23:59:59Z",
  },
  {
    question: "Will Harambee Stars qualify for AFCON 2027?",
    description: "Market resolves YES if Kenya's national football team qualifies for the 2027 Africa Cup of Nations",
    category: "Sports",
    b: 20000,
    initial_liquidity: 35000,
    resolution_source: "CAF Official Results",
    resolution_time: "2026-11-30T23:59:59Z",
  },
  {
    question: "Will Kenya achieve 70% renewable energy by 2026?",
    description: "Market resolves YES if Kenya's renewable energy generation reaches 70% or more by December 31, 2026",
    category: "Environment",
    b: 20000,
    initial_liquidity: 25000,
    resolution_source: "Ministry of Energy",
    resolution_time: "2026-12-31T23:59:59Z",
  },
  {
    question: "Will SGR expand to Kisumu by end of 2027?",
    description: "Market resolves YES if the Standard Gauge Railway is operational to Kisumu by December 31, 2027",
    category: "Infrastructure",
    b: 20000,
    initial_liquidity: 45000,
    resolution_source: "Kenya Railways",
    resolution_time: "2027-12-31T23:59:59Z",
  },
  {
    question: "Will Kenya's GDP growth exceed 6% in 2026?",
    description: "Market resolves YES if Kenya's GDP growth rate for 2026 exceeds 6%",
    category: "Economy",
    b: 20000,
    initial_liquidity: 40000,
    resolution_source: "Kenya National Bureau of Statistics",
    resolution_time: "2027-03-31T23:59:59Z",
  },
];

/**
 * Sample Users for Simulation
 */
export const SIMULATION_USERS = [
  {
    email: 'demo.user1@cashmarket.ke',
    name: 'Demo User 1',
    password: 'demo123',
    phone_number: '+254700000001',
    balance: 10000,
    kyc_status: 'verified' as const,
  },
  {
    email: 'demo.user2@cashmarket.ke',
    name: 'Demo User 2',
    password: 'demo123',
    phone_number: '+254700000002',
    balance: 15000,
    kyc_status: 'verified' as const,
  },
  {
    email: 'demo.user3@cashmarket.ke',
    name: 'Demo User 3',
    password: 'demo123',
    phone_number: '+254700000003',
    balance: 5000,
    kyc_status: 'unverified' as const,
  },
];

/**
 * Sample Admin Users for Simulation
 */
export const SIMULATION_ADMINS = [
  {
    email: 'demo.admin@cashmarket.ke',
    name: 'Demo Admin',
    password: 'admin123',
    role: 'admin' as const,
  },
  {
    email: 'demo.oracle@cashmarket.ke',
    name: 'Demo Oracle',
    password: 'oracle123',
    role: 'oracle' as const,
  },
];

/**
 * Simulation Mode Banner Message
 */
export const SIMULATION_BANNER = {
  title: "🧪 SIMULATION MODE",
  message: "You are using sample data. All transactions are simulated and no real money is involved.",
  color: "warning" as const,
};

/**
 * Helper function to get simulation mode status
 */
export function isSimulationMode(): boolean {
  return SIMULATION_CONFIG.enabled;
}

/**
 * Helper function to get data source label
 */
export function getDataSourceLabel(): string {
  return SIMULATION_CONFIG.dataSource;
}

/**
 * Helper to format simulation notice
 */
export function getSimulationNotice(): string {
  if (!isSimulationMode()) return '';
  return '⚠️ SIMULATION MODE: All data is simulated for testing purposes';
}

/**
 * Create simulation trades for realistic market activity
 */
export const SIMULATION_TRADES = [
  // These can be used to seed initial trading activity
  { market_id: 1, user_index: 0, outcome: 'YES', stake: 1000 },
  { market_id: 1, user_index: 1, outcome: 'NO', stake: 800 },
  { market_id: 2, user_index: 0, outcome: 'YES', stake: 1500 },
  { market_id: 3, user_index: 1, outcome: 'YES', stake: 2000 },
  { market_id: 4, user_index: 2, outcome: 'NO', stake: 500 },
];

/**
 * Simulation OTP codes (for testing - these are constant)
 */
export const SIMULATION_OTP = {
  DEPOSIT: '123456',
  WITHDRAWAL: '654321',
  LOGIN: '111111',
};

/**
 * Export all simulation data
 */
export const SIMULATION_DATA = {
  markets: SIMULATION_MARKETS,
  users: SIMULATION_USERS,
  admins: SIMULATION_ADMINS,
  trades: SIMULATION_TRADES,
  otp: SIMULATION_OTP,
  config: SIMULATION_CONFIG,
  banner: SIMULATION_BANNER,
};

export default SIMULATION_DATA;
