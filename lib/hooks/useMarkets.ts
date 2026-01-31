import { useState, useEffect, useMemo } from 'react';
import { getMarkets, getMarket, type Market, type MarketDetail } from '../api/client';

/**
 * Hook to fetch all markets
 */
export function useMarkets(params?: {
  status?: string;
  category?: string;
  limit?: number;
  offset?: number;
}) {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize params to avoid unnecessary re-renders
  const memoizedParams = useMemo(() => ({
    status: params?.status,
    category: params?.category,
    limit: params?.limit,
    offset: params?.offset,
  }), [
    params?.status,
    params?.category,
    params?.limit,
    params?.offset,
  ]);

  useEffect(() => {
    let mounted = true;

    async function fetchMarkets() {
      try {
        setLoading(true);
        setError(null);
        const data = await getMarkets(memoizedParams);
        if (mounted) {
          setMarkets(data.markets);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch markets');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchMarkets();

    return () => {
      mounted = false;
    };
  }, [memoizedParams]);

  return { markets, loading, error };
}

/**
 * Hook to fetch a single market
 */
export function useMarket(marketId: number | null) {
  const [market, setMarket] = useState<MarketDetail | null>(null);
  const [stats, setStats] = useState<{
    participant_count: number;
    trade_count: number;
    total_volume: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!marketId) {
      setLoading(false);
      return;
    }

    let mounted = true;

    async function fetchMarket() {
      try {
        setLoading(true);
        setError(null);
        // marketId is guaranteed to be a number here due to the check above
        const data = await getMarket(marketId as number);
        if (mounted) {
          setMarket(data.market);
          setStats(data.stats);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch market');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchMarket();

    return () => {
      mounted = false;
    };
  }, [marketId]);

  return { market, stats, loading, error };
}
