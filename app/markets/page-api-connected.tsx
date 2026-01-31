"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import MarketCard from "@/components/MarketCard";
import MobileNavigation from "@/components/MobileNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { useMarkets } from "@/lib/hooks/useMarkets";

export default function MarketsPage() {
  const { isLoggedIn } = useAuth();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch markets from API
  const { markets, loading, error } = useMarkets({
    status: activeFilter === 'all' ? undefined : activeFilter,
    category: selectedCategory || undefined,
  });

  const categories = [
    "All",
    "Economy",
    "Politics",
    "Tech",
    "Sports",
    "Events",
    "Environment",
    "Infrastructure",
  ];

  // Filter markets by search query (client-side filtering)
  const filteredMarkets = markets.filter((market) =>
    market.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort markets
  const sortedMarkets = [...filteredMarkets].sort((a, b) => {
    // Sort resolved markets to the end
    if (a.resolved_outcome && !b.resolved_outcome) return 1;
    if (!a.resolved_outcome && b.resolved_outcome) return -1;
    
    // Sort by total volume
    return b.total_volume - a.total_volume;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Prediction Markets
          </h1>
          <p className="text-lg text-muted-foreground">
            Trade on real-world events and earn from your predictions
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search markets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-11 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    category === "All" ? "" : category
                  )
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                  selectedCategory === (category === "All" ? "" : category)
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground hover:bg-muted"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Status Filters */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeFilter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-muted"
              }`}
            >
              All Markets
            </button>
            <button
              onClick={() => setActiveFilter("active")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeFilter === "active"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-muted"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveFilter("resolved")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeFilter === "resolved"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-muted"
              }`}
            >
              Resolved
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading markets...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 mb-6">
            <p className="text-destructive font-medium">Error loading markets</p>
            <p className="text-sm text-destructive/80 mt-1">{error}</p>
          </div>
        )}

        {/* Markets Grid */}
        {!loading && !error && (
          <>
            {sortedMarkets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No markets found matching your criteria
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-muted-foreground">
                  Showing {sortedMarkets.length} market{sortedMarkets.length !== 1 ? 's' : ''}
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {sortedMarkets.map((market) => (
                    <MarketCard
                      key={market.id}
                      id={market.id}
                      title={market.question}
                      category={market.category || 'General'}
                      yesPercentage={market.yes_percentage}
                      volume={`KES ${(market.total_volume / 1000).toFixed(1)}K`}
                      endDate={market.resolution_time || ''}
                      resolutionSource={market.resolution_source}
                      resolved={market.status === 'resolved'}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </main>

      <MobileNavigation />
    </div>
  );
}
