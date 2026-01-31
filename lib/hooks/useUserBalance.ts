/**
 * React Hook for fetching user balance and portfolio data
 */

import { useState, useEffect } from 'react';
import { getUserBalance } from '@/lib/api/client';

interface PortfolioData {
  balance: number;
  portfolio_value: number;
  total_value: number;
  positions: Array<{
    market_id: number;
    market_question: string;
    yes_shares: number;
    no_shares: number;
    total_invested: number;
    current_value: number;
  }>;
}

export function useUserBalance() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getUserBalance();
      setData({
        balance: result.user.balance,
        portfolio_value: result.portfolio.total_portfolio_value,
        total_value: result.portfolio.total_value,
        positions: result.portfolio.positions,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch balance');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return { data, loading, error, refetch: fetchBalance };
}
