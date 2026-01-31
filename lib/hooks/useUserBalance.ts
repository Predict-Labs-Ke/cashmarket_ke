/**
 * React Hook for fetching user balance and portfolio data
 */

import { useState, useEffect } from 'react';
import { getUserBalance } from '@/lib/api/client';

interface PortfolioData {
  balance: number;
  total_invested: number;
  active_positions: number;
  total_shares: number;
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
        total_invested: result.portfolio.total_invested || 0,
        active_positions: result.portfolio.active_positions || 0,
        total_shares: result.portfolio.total_shares || 0,
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
