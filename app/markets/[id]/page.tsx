"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import MobileNavigation from "@/components/MobileNavigation";
import { getMarket, calculateStake, executeTrade, type MarketDetail } from "@/lib/api/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from "@/contexts/AuthContext";

// Type definitions for the component
interface MarketStats {
  participant_count: number;
  trade_count: number;
  total_volume: number;
  total_yes_shares?: number;
  total_no_shares?: number;
}

interface Trade {
  id: number;
  user_id: number;
  market_id: number;
  outcome: 'YES' | 'NO';
  shares: number;
  cost: number;
  price_at_trade: number;
  created_at: string;
  user_name?: string;
}

interface TradePreview {
  cost: number;
  shares: number;
  new_price_yes: number;
  new_price_no: number;
  potential_payout: number;
  expected_return: number;
  roi_percentage: number;
  fee: number;
}

export default function MarketDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const marketId = parseInt(params.id as string);

  const [market, setMarket] = useState<MarketDetail | null>(null);
  const [stats, setStats] = useState<MarketStats | null>(null);
  const [recentTrades, setRecentTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Trading state
  const [selectedOutcome, setSelectedOutcome] = useState<'YES' | 'NO'>('YES');
  const [stakeAmount, setStakeAmount] = useState<string>('');
  const [tradePreview, setTradePreview] = useState<TradePreview | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [executing, setExecuting] = useState(false);

  // Price history for chart (simulated based on current state)
  const [priceHistory, setPriceHistory] = useState<any[]>([]);

  // Fetch market data
  const fetchMarketData = async () => {
    try {
      setLoading(true);
      const data = await getMarket(marketId);
      setMarket(data.market);
      setStats(data.stats);
      setRecentTrades(data.recent_trades || []);
      
      // Generate initial price history (simulated - in production this would come from historical data)
      const history = generatePriceHistory(data.market.yes_price);
      setPriceHistory(history);
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load market');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (marketId) {
      fetchMarketData();
      
      // Poll for updates every 10 seconds
      const interval = setInterval(fetchMarketData, 10000);
      return () => clearInterval(interval);
    }
  }, [marketId]);

  // Generate simulated price history
  // NOTE: This generates mock historical data for demonstration.
  // In production, this should be replaced with actual historical price data from the database.
  const generatePriceHistory = (currentPrice: number) => {
    const history = [];
    const points = 20;
    let price = Math.max(0.3, Math.min(0.7, currentPrice - 0.15 + Math.random() * 0.1));
    
    for (let i = 0; i < points; i++) {
      const variation = (Math.random() - 0.5) * 0.05;
      price = Math.max(0.05, Math.min(0.95, price + variation));
      
      if (i === points - 1) {
        price = currentPrice; // Last point is current price
      }
      
      history.push({
        time: `T-${points - i}`,
        yes: parseFloat((price * 100).toFixed(1)),
        no: parseFloat(((1 - price) * 100).toFixed(1)),
      });
    }
    
    return history;
  };

  // Calculate trade preview
  useEffect(() => {
    const calculatePreview = async () => {
      const amount = parseFloat(stakeAmount);
      if (!amount || amount <= 0 || !market) {
        setTradePreview(null);
        return;
      }

      try {
        setPreviewLoading(true);
        const preview = await calculateStake({
          market_id: marketId,
          outcome: selectedOutcome,
          stake: amount,
        });
        setTradePreview(preview);
      } catch (err) {
        console.error('Failed to calculate preview:', err);
        setTradePreview(null);
      } finally {
        setPreviewLoading(false);
      }
    };

    const debounce = setTimeout(calculatePreview, 500);
    return () => clearTimeout(debounce);
  }, [stakeAmount, selectedOutcome, marketId, market]);

  // Execute trade
  const handleExecuteTrade = async () => {
    if (!isLoggedIn) {
      alert('Please sign in to trade');
      return;
    }

    const amount = parseFloat(stakeAmount);
    if (!amount || amount <= 0) {
      alert('Please enter a valid stake amount');
      return;
    }

    try {
      setExecuting(true);
      await executeTrade({
        market_id: marketId,
        outcome: selectedOutcome,
        stake: amount,
      });
      
      // Refresh market data
      await fetchMarketData();
      
      // Clear form
      setStakeAmount('');
      setTradePreview(null);
      
      alert('Trade executed successfully!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to execute trade');
    } finally {
      setExecuting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading market details...</p>
          </div>
        </div>
        <MobileNavigation />
      </div>
    );
  }

  if (error || !market) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-destructive mb-2">Error</h2>
            <p className="text-destructive/80">{error || 'Market not found'}</p>
            <button
              onClick={() => router.push('/markets')}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition"
            >
              Back to Markets
            </button>
          </div>
        </div>
        <MobileNavigation />
      </div>
    );
  }

  const isResolved = market.status === 'resolved';
  const timeRemaining = market.resolution_time ? getTimeRemaining(market.resolution_time) : 'Unknown';

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">
        {/* Back Button */}
        <button
          onClick={() => router.push('/markets')}
          className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-primary transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Markets
        </button>

        {/* Market Information Section */}
        <div className="bg-card border border-card-border rounded-2xl p-6 mb-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/30 rounded-full text-xs font-medium">
                  {market.category || 'General'}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isResolved 
                    ? 'bg-muted text-muted-foreground' 
                    : 'bg-success/10 text-success border border-success/30'
                }`}>
                  {isResolved ? 'Resolved' : 'Active'}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-3">
                {market.question}
              </h1>
              {market.description && (
                <p className="text-muted-foreground text-lg">
                  {market.description}
                </p>
              )}
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-muted rounded-xl p-4">
              <div className="text-xs text-muted-foreground mb-1">Current Probability</div>
              <div className="text-2xl font-bold text-primary">
                {(market.yes_price * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">YES</div>
            </div>
            <div className="bg-muted rounded-xl p-4">
              <div className="text-xs text-muted-foreground mb-1">Trading Volume</div>
              <div className="text-2xl font-bold text-foreground">
                KES {((stats?.total_volume || 0) / 1000).toFixed(1)}K
              </div>
              <div className="text-xs text-muted-foreground">{stats?.trade_count || 0} trades</div>
            </div>
            <div className="bg-muted rounded-xl p-4">
              <div className="text-xs text-muted-foreground mb-1">Participants</div>
              <div className="text-2xl font-bold text-foreground">
                {stats?.participant_count || 0}
              </div>
              <div className="text-xs text-muted-foreground">traders</div>
            </div>
            <div className="bg-muted rounded-xl p-4">
              <div className="text-xs text-muted-foreground mb-1">Time Remaining</div>
              <div className="text-2xl font-bold text-foreground">
                {timeRemaining === 'Closed' ? '—' : timeRemaining}
              </div>
              <div className="text-xs text-muted-foreground">
                {timeRemaining === 'Closed' ? 'Market closed' : 'until resolution'}
              </div>
            </div>
          </div>

          {/* Resolution Info */}
          {market.resolution_source && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                Resolution source: <span className="font-medium text-foreground">{market.resolution_source}</span>
              </div>
              {market.resolution_time && (
                <div className="text-sm text-muted-foreground mt-1">
                  Resolution date: <span className="font-medium text-foreground">
                    {new Date(market.resolution_time).toLocaleDateString('en-KE', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Chart and Orders */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price Movement Chart */}
            <div className="bg-card border border-card-border rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Price Movement</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#888"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="#888"
                      style={{ fontSize: '12px' }}
                      domain={[0, 100]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a1a', 
                        border: '1px solid #333',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="yes" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="YES %"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="no" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      name="NO %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#10b981] rounded-full"></div>
                  <span className="text-muted-foreground">YES Probability</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#ef4444] rounded-full"></div>
                  <span className="text-muted-foreground">NO Probability</span>
                </div>
              </div>
            </div>

            {/* Recent Trades Table */}
            <div className="bg-card border border-card-border rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Recent Trades</h2>
              {recentTrades.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No trades yet. Be the first to trade!
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-border">
                        <th className="pb-3 text-sm font-medium text-muted-foreground">Date</th>
                        <th className="pb-3 text-sm font-medium text-muted-foreground">User</th>
                        <th className="pb-3 text-sm font-medium text-muted-foreground">Action</th>
                        <th className="pb-3 text-sm font-medium text-muted-foreground">Stake</th>
                        <th className="pb-3 text-sm font-medium text-muted-foreground">Shares</th>
                        <th className="pb-3 text-sm font-medium text-muted-foreground">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTrades.map((trade, index) => (
                        <tr key={trade.id || index} className="border-b border-border/50">
                          <td className="py-3 text-sm">
                            {new Date(trade.created_at).toLocaleDateString('en-KE', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </td>
                          <td className="py-3 text-sm font-medium">
                            {anonymizeUsername(trade.user_name)}
                          </td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              trade.outcome === 'YES' 
                                ? 'bg-success/10 text-success' 
                                : 'bg-destructive/10 text-destructive'
                            }`}>
                              {trade.outcome}
                            </span>
                          </td>
                          <td className="py-3 text-sm">
                            KES {trade.cost.toFixed(0)}
                          </td>
                          <td className="py-3 text-sm">
                            {trade.shares.toFixed(2)}
                          </td>
                          <td className="py-3 text-sm">
                            {(trade.price_at_trade * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Trading Interface */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-card-border rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Trade</h2>
              
              {isResolved ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-2">This market has been resolved</p>
                  {market.resolved_outcome && (
                    <div className={`inline-block px-4 py-2 rounded-lg font-bold text-lg ${
                      market.resolved_outcome === 'YES' 
                        ? 'bg-success/20 text-success' 
                        : market.resolved_outcome === 'NO'
                        ? 'bg-destructive/20 text-destructive'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      Outcome: {market.resolved_outcome}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* Outcome Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Select Outcome
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedOutcome('YES')}
                        className={`py-3 rounded-xl font-medium transition ${
                          selectedOutcome === 'YES'
                            ? 'bg-success text-white'
                            : 'bg-success/10 text-success hover:bg-success/20'
                        }`}
                      >
                        YES
                      </button>
                      <button
                        onClick={() => setSelectedOutcome('NO')}
                        className={`py-3 rounded-xl font-medium transition ${
                          selectedOutcome === 'NO'
                            ? 'bg-destructive text-white'
                            : 'bg-destructive/10 text-destructive hover:bg-destructive/20'
                        }`}
                      >
                        NO
                      </button>
                    </div>
                  </div>

                  {/* Stake Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Stake Amount (KES)
                    </label>
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder="Enter amount"
                      min="0"
                      step="10"
                      className="w-full px-4 py-3 bg-input border border-input-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                    />
                  </div>

                  {/* Trade Preview */}
                  {tradePreview && !previewLoading && (
                    <div className="mb-4 p-4 bg-muted rounded-xl space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shares you'll receive:</span>
                        <span className="font-medium">{tradePreview.shares.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Cost (inc. fees):</span>
                        <span className="font-medium">KES {tradePreview.cost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Potential payout:</span>
                        <span className="font-medium text-success">
                          KES {tradePreview.potential_payout.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">ROI:</span>
                        <span className={`font-medium ${
                          tradePreview.roi_percentage > 0 ? 'text-success' : 'text-destructive'
                        }`}>
                          {tradePreview.roi_percentage > 0 ? '+' : ''}
                          {tradePreview.roi_percentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">New price:</span>
                        <span className="font-medium">
                          {selectedOutcome === 'YES' 
                            ? (tradePreview.new_price_yes * 100).toFixed(1)
                            : (tradePreview.new_price_no * 100).toFixed(1)
                          }%
                        </span>
                      </div>
                    </div>
                  )}

                  {previewLoading && (
                    <div className="mb-4 p-4 bg-muted rounded-xl text-center">
                      <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                    </div>
                  )}

                  {/* Execute Trade Button */}
                  <button
                    onClick={handleExecuteTrade}
                    disabled={!tradePreview || executing || !isLoggedIn}
                    className={`w-full py-3 rounded-xl font-semibold transition ${
                      !tradePreview || executing || !isLoggedIn
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : selectedOutcome === 'YES'
                        ? 'bg-success hover:bg-success/90 text-white'
                        : 'bg-destructive hover:bg-destructive/90 text-white'
                    }`}
                  >
                    {executing ? 'Processing...' : !isLoggedIn ? 'Sign in to trade' : `Buy ${selectedOutcome}`}
                  </button>

                  {/* User Position */}
                  {market.user_position && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Your Position</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">YES shares:</span>
                          <span className="font-medium">{market.user_position.yes_shares.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">NO shares:</span>
                          <span className="font-medium">{market.user_position.no_shares.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total invested:</span>
                          <span className="font-medium">KES {market.user_position.total_invested.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <MobileNavigation />
    </div>
  );
}

// Helper function to get time remaining
function getTimeRemaining(endDateStr: string): string {
  const end = new Date(endDateStr);
  const now = new Date();
  const diff = end.getTime() - now.getTime();

  if (diff < 0) return "Closed";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) {
    return `${days}d ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${minutes}m`;
  }
}

// Helper function to anonymize usernames
function anonymizeUsername(username: string | undefined): string {
  if (!username) return 'Anonymous';
  if (username.length <= 3) return username[0] + '***';
  return username.substring(0, 2) + '***' + username.substring(username.length - 1);
}
