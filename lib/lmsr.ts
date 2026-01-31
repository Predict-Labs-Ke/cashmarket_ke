/**
 * Logarithmic Market Scoring Rule (LMSR) Implementation
 * 
 * The LMSR is used to calculate prices and costs for prediction markets.
 * 
 * Key formulas:
 * - Cost function: C(q) = b * ln(e^(q_yes/b) + e^(q_no/b))
 * - Price of YES: P(YES) = e^(q_yes/b) / (e^(q_yes/b) + e^(q_no/b))
 * - Price of NO: P(NO) = e^(q_no/b) / (e^(q_yes/b) + e^(q_no/b))
 * 
 * Where:
 * - b = liquidity parameter (higher b = less price movement per trade)
 * - q_yes = quantity of YES shares outstanding
 * - q_no = quantity of NO shares outstanding
 */

export const DEFAULT_B = 20000; // Default liquidity parameter in KES
export const DEFAULT_INITIAL_PRICE = 0.5; // Start at 50/50

/**
 * Calculate the cost function C(q) = b * ln(e^(q_yes/b) + e^(q_no/b))
 */
export function calculateCost(b: number, q_yes: number, q_no: number): number {
  const exp_yes = Math.exp(q_yes / b);
  const exp_no = Math.exp(q_no / b);
  return b * Math.log(exp_yes + exp_no);
}

/**
 * Calculate the price of YES outcome
 * P(YES) = e^(q_yes/b) / (e^(q_yes/b) + e^(q_no/b))
 */
export function calculateYesPrice(b: number, q_yes: number, q_no: number): number {
  const exp_yes = Math.exp(q_yes / b);
  const exp_no = Math.exp(q_no / b);
  return exp_yes / (exp_yes + exp_no);
}

/**
 * Calculate the price of NO outcome
 * P(NO) = e^(q_no/b) / (e^(q_yes/b) + e^(q_no/b))
 */
export function calculateNoPrice(b: number, q_yes: number, q_no: number): number {
  const exp_yes = Math.exp(q_yes / b);
  const exp_no = Math.exp(q_no / b);
  return exp_no / (exp_yes + exp_no);
}

/**
 * Calculate both YES and NO prices
 */
export function calculatePrices(b: number, q_yes: number, q_no: number): {
  yes_price: number;
  no_price: number;
} {
  const exp_yes = Math.exp(q_yes / b);
  const exp_no = Math.exp(q_no / b);
  const sum = exp_yes + exp_no;
  
  return {
    yes_price: exp_yes / sum,
    no_price: exp_no / sum,
  };
}

/**
 * Calculate the cost to buy shares of a specific outcome
 * 
 * @param b - Liquidity parameter
 * @param q_yes_before - Current YES shares
 * @param q_no_before - Current NO shares
 * @param outcome - Which outcome to buy ('YES' or 'NO')
 * @param shares - Number of shares to buy
 * @returns Cost in KES
 */
export function calculateBuyCost(
  b: number,
  q_yes_before: number,
  q_no_before: number,
  outcome: 'YES' | 'NO',
  shares: number
): number {
  const cost_before = calculateCost(b, q_yes_before, q_no_before);
  
  const q_yes_after = outcome === 'YES' ? q_yes_before + shares : q_yes_before;
  const q_no_after = outcome === 'NO' ? q_no_before + shares : q_no_before;
  
  const cost_after = calculateCost(b, q_yes_after, q_no_after);
  
  return cost_after - cost_before;
}

/**
 * Calculate how many shares can be bought with a given amount of money
 * Uses binary search to find the number of shares
 * 
 * @param b - Liquidity parameter
 * @param q_yes - Current YES shares
 * @param q_no - Current NO shares
 * @param outcome - Which outcome to buy
 * @param budget - Amount of money to spend (KES)
 * @param tolerance - Precision tolerance (default 0.01 KES)
 * @returns Number of shares that can be bought
 */
export function calculateSharesForBudget(
  b: number,
  q_yes: number,
  q_no: number,
  outcome: 'YES' | 'NO',
  budget: number,
  tolerance: number = 0.01
): number {
  let low = 0;
  let high = budget * 10; // Start with upper bound
  let shares = 0;
  
  // Binary search for the right number of shares
  while (high - low > tolerance) {
    const mid = (low + high) / 2;
    const cost = calculateBuyCost(b, q_yes, q_no, outcome, mid);
    
    if (cost < budget) {
      low = mid;
      shares = mid;
    } else if (cost > budget) {
      high = mid;
    } else {
      return mid;
    }
  }
  
  return shares;
}

/**
 * Initialize market quantities for neutral 50/50 pricing
 * Starting with q_yes = q_no = 0 gives exactly 50/50 pricing
 */
export function initializeMarketQuantities(): {
  q_yes: number;
  q_no: number;
} {
  return {
    q_yes: 0,
    q_no: 0,
  };
}

/**
 * Calculate maximum platform exposure for a given b
 * Max exposure = b * ln(2)
 */
export function calculateMaxExposure(b: number): number {
  return b * Math.log(2);
}

/**
 * Calculate the potential payout for a position
 * If the outcome wins, each share pays 1 KES
 */
export function calculatePayout(shares: number): number {
  return shares; // Each share worth 1 KES if outcome wins
}

/**
 * Calculate profit/loss for a position
 */
export function calculateProfitLoss(
  shares: number,
  cost_basis: number,
  outcome_won: boolean
): number {
  if (outcome_won) {
    return shares - cost_basis; // Payout minus cost
  } else {
    return -cost_basis; // Lose entire investment
  }
}
