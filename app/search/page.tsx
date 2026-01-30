"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import MobileNavigation from "@/components/MobileNavigation";

// Sample prediction markets data - same as markets page
const predictionMarkets = [
  {
    id: 1,
    title: "Will Kenya Shilling strengthen against USD by Q2 2026?",
    category: "Economy",
    yesPercentage: 42,
    volume: "KES 2.4M",
    endDate: "Apr 30, 2026",
    trending: true,
  },
  {
    id: 2,
    title: "Will Nairobi host the 2027 Africa Tech Summit?",
    category: "Events",
    yesPercentage: 67,
    volume: "KES 890K",
    endDate: "Dec 31, 2026",
    trending: true,
  },
  {
    id: 3,
    title: "Will M-Pesa transaction volume exceed 20B in 2026?",
    category: "Tech",
    yesPercentage: 78,
    volume: "KES 1.8M",
    endDate: "Dec 31, 2026",
    trending: false,
  },
  {
    id: 4,
    title: "Will Harambee Stars qualify for AFCON 2027?",
    category: "Sports",
    yesPercentage: 35,
    volume: "KES 5.2M",
    endDate: "Nov 15, 2026",
    trending: true,
  },
  {
    id: 5,
    title: "Will Kenya achieve 70% renewable energy by 2026?",
    category: "Environment",
    yesPercentage: 54,
    volume: "KES 620K",
    endDate: "Dec 31, 2026",
    trending: false,
  },
  {
    id: 6,
    title: "Will SGR expand to Kisumu by end of 2027?",
    category: "Infrastructure",
    yesPercentage: 28,
    volume: "KES 3.1M",
    endDate: "Dec 31, 2027",
    trending: false,
  },
  {
    id: 7,
    title: "Will Kenya's GDP growth exceed 6% in 2026?",
    category: "Economy",
    yesPercentage: 45,
    volume: "KES 1.2M",
    endDate: "Dec 31, 2026",
    trending: false,
  },
  {
    id: 8,
    title: "Will Gor Mahia win the KPL 2026 season?",
    category: "Sports",
    yesPercentage: 62,
    volume: "KES 4.8M",
    endDate: "Nov 30, 2026",
    trending: true,
  },
  {
    id: 9,
    title: "Will Nairobi receive above-average rainfall in March 2026?",
    category: "Weather",
    yesPercentage: 58,
    volume: "KES 420K",
    endDate: "Mar 31, 2026",
    trending: false,
  },
  {
    id: 10,
    title: "Will temperatures in Mombasa exceed 35°C in February 2026?",
    category: "Weather",
    yesPercentage: 71,
    volume: "KES 310K",
    endDate: "Feb 28, 2026",
    trending: false,
  },
  {
    id: 11,
    title: "Will Kenya experience El Niño conditions in 2026?",
    category: "Weather",
    yesPercentage: 44,
    volume: "KES 580K",
    endDate: "Dec 31, 2026",
    trending: true,
  },
  {
    id: 12,
    title: "Will Mount Kenya receive snowfall in July 2026?",
    category: "Weather",
    yesPercentage: 82,
    volume: "KES 275K",
    endDate: "Jul 31, 2026",
    trending: false,
  },
];

const categories = [
  "All",
  "Economy",
  "Sports",
  "Tech",
  "Events",
  "Environment",
  "Infrastructure",
  "Weather"
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredMarkets = predictionMarkets.filter((market) => {
    const matchesCategory = selectedCategory === "All" || market.category === selectedCategory;
    const matchesSearch = market.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         market.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 lg:pb-8">
      {/* Header */}
      <Navigation showPortfolioBalance={true} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 pb-24 lg:pb-8">
        {/* Page Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h1 className="text-3xl font-bold">Search Markets</h1>
          </div>
          <p className="text-muted-foreground">
            Find the markets you&apos;re looking for
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by market name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-input border border-input-border rounded-2xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-input-focus focus:ring-2 focus:ring-ring transition text-lg"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground transition"
                aria-label="Clear search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="mb-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-card-hover border border-card-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {searchQuery ? (
              <>
                Found <span className="font-semibold text-foreground">{filteredMarkets.length}</span> {filteredMarkets.length === 1 ? 'market' : 'markets'} 
                {selectedCategory !== "All" && <> in <span className="font-semibold text-foreground">{selectedCategory}</span></>}
              </>
            ) : (
              <>Showing <span className="font-semibold text-foreground">{filteredMarkets.length}</span> {filteredMarkets.length === 1 ? 'market' : 'markets'}</>
            )}
          </p>
        </div>

        {/* Markets Grid */}
        {filteredMarkets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4">
            {filteredMarkets.map((market) => (
              <div
                key={market.id}
                className="bg-card border border-card-border rounded-2xl p-4 lg:p-5 active:scale-[0.98] transition cursor-pointer hover:bg-card-hover hover:border-border-secondary"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-muted rounded-full text-xs text-muted-foreground">
                        {market.category}
                      </span>
                      {market.trending && (
                        <span className="text-warning text-xs">🔥</span>
                      )}
                    </div>
                    <h3 className="font-medium text-[15px] leading-snug">{market.title}</h3>
                  </div>
                </div>

                {/* Probability Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-primary font-medium">Yes {market.yesPercentage}%</span>
                    <span className="text-destructive font-medium">No {100 - market.yesPercentage}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-hover to-primary rounded-full"
                      style={{ width: `${market.yesPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                  <span>Vol: {market.volume}</span>
                  <span>Ends {market.endDate}</span>
                </div>

                {/* Trade Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button className="py-2.5 bg-primary-muted hover:bg-primary/20 active:bg-primary/30 border border-primary/50 text-primary rounded-xl font-medium transition">
                    Buy Yes
                  </button>
                  <button className="py-2.5 bg-destructive-muted hover:bg-destructive/20 active:bg-destructive/30 border border-destructive/50 text-destructive rounded-xl font-medium transition">
                    Buy No
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto mb-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-lg font-medium mb-2">No markets found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? (
                <>We couldn&apos;t find any markets matching &quot;{searchQuery}&quot;</>
              ) : (
                <>Try adjusting your filters</>
              )}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary-hover transition"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation currentPage="search" />
    </div>
  );
}
